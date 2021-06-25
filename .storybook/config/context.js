import l10n from '../../src/localization';

export const defaultContext = {
    l10n: l10n,
    contentType: {
        isExercise: true,
        correction: {
            correctionCode: "Correction filler",
            answers: [
                {
                    answer: {
                        text: "Answer 1",
                        bestAnswer: false,
                        tipsAndFeedback: {
                            tip: "<p>Tip answer 1</p>"
                        }
                    }
                },
                {
                    answer: {
                        text: "Answer 2",
                        bestAnswer: true,
                        tipsAndFeedback: {
                            tip: "<p>Tip answer 2</p>"
                        }
                    }
                },
                {
                    answer: {
                        text: "Answer 3",
                        bestAnswer: false,
                        tipsAndFeedback: {
                            tip: "<p>Tip answer 3</p>"
                        }
                    }
                }
            ]
        }
    }
}