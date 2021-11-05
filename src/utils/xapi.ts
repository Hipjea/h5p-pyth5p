export default class xAPILib {
  createXAPIEventTemplate: any;
  event: any;
  attributes: any;
  score: number;
  userAnswer: string;
  definition: {};

  constructor(event: any, attributes: any, score: number, userAnswer: string) {
    this.createXAPIEventTemplate = H5P.PytH5P.prototype.createXAPIEventTemplate;
    this.event = event;
    this.attributes = attributes;
    this.score = score;
    this.userAnswer = userAnswer;
    this.definition = {};
  }

  build = () => {
    this.setAttribute(this.definition, 'name', this.attributes.name);
    this.setAttribute(this.definition, 'description', this.attributes.description);
    this.setAttribute(this.definition, 'interactionType', this.attributes.interactionType);
    this.setAttribute(this.definition, 'correctResponsesPattern', this.attributes.correctResponsesPattern);
    this.setAttribute(this.definition, 'type', 'http://adlnet.gov/expapi/activities/cmi.interaction');
    return this.getXAPIData();
  }

  setAttribute = (obj: any, key: string, value: string, required?: boolean) => {
    if (typeof value !== 'undefined') {
      obj[key] = value;
    }
    else if (required) {
      console.error("xApiEventBuilder: No value for [" + key + "] in", obj);
    }
  }

  getXAPIData = () => {
    if (this.createXAPIEventTemplate) {
      var xAPIEvent = this.createXAPIEventTemplate(this.event);
      this.addQuestionToXAPI(xAPIEvent);
      this.addResponseToXAPI(xAPIEvent);
    } else {
      return null
    }
    return xAPIEvent;
  }

  addQuestionToXAPI = (xAPIEvent: any) => {
    const definition = xAPIEvent.getVerifiedStatementValue(['object', 'definition']);
    this.definition = { ...definition, definition: this.getXAPIDefinition() };
  }

  addResponseToXAPI = (xAPIEvent: any) => {
    const maxScore = 1;
    const success = this.score == maxScore ? true : false;
    xAPIEvent.setScoredResult(this.score, maxScore, this, true, success);
    xAPIEvent.data.statement.result.response = this.userAnswer;
  }

  getXAPIDefinition = () => {
    const definition = {} as any;
    definition.description = {
      'en-US': 'Python code'
    };
    definition.type = 'http://adlnet.gov/expapi/activities/cmi.interaction';
    definition.interactionType = 'fill-in';  
    definition.correctResponses = [];
    let i = 0;
    for (i = 0; i < this.attributes.correctResponsesPattern.length; i++) {
      definition.correctResponses.push(this.attributes.correctResponsesPattern[i]);
    }
    return definition;
  };
}