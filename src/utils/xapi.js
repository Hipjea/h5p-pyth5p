export default class xAPILib {

  constructor(context, event, attributes, score, userAnswer) {
    this.context = context;
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
  }

  setAttribute = (obj, key, value, required) => {
    if (typeof value !== 'undefined') {
      obj[key] = value;
    }
    else if (required) {
      console.error("xApiEventBuilder: No value for [" + key + "] in", obj);
    }
  }

  getXAPIData = () => {
    var xAPIEvent = this.context.createXAPIEventTemplate(this.event);
    this.addQuestionToXAPI(xAPIEvent);
    this.addResponseToXAPI(xAPIEvent);
    return {
      statement: xAPIEvent.data.statement
    };
  }

  addQuestionToXAPI = (xAPIEvent) => {
    const definition = xAPIEvent.getVerifiedStatementValue(['object', 'definition']);
    this.definition = { ...definition, definition: this.getXAPIDefinition() };
  }

  addResponseToXAPI = (xAPIEvent) => {
    const maxScore = 1;
    const success = this.score == maxScore ? true : false;
    xAPIEvent.setScoredResult(this.score, maxScore, this, true, success);
    xAPIEvent.data.statement.result.response = this.userAnswer;
  }

  getXAPIDefinition = () => {
    const definition = {};
    definition.description = {
      'en-US': 'Python code'
    };
    definition.type = 'http://adlnet.gov/expapi/activities/cmi.interaction';
    definition.interactionType = 'fill-in';  
    definition.correctResponsesPattern = [];
    for (i = 0; i < this.attributes.correctResponses.length; i++) {
      definition.correctResponsesPattern.push(this.attributes.correctResponses[i]);
    }
  
    return definition;
  };

}