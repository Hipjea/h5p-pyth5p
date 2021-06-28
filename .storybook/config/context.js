import l10n from '../../src/localization';

export const defaultContext = {
    l10n: l10n,
    code: 'print("Hello world !")',
    contentType: {
        isExercise: true,
        correction: {
            correctionCode: "print(\"Correction filler\")",
            answers: [
                {
                    text: "Answer 1",
                    bestAnswer: false,
                    tipsAndFeedback: {
                        tip: "<p>Tip answer 1</p>"
                    }
                },
                {
                    text: "Answer 2",
                    bestAnswer: true,
                    tipsAndFeedback: {
                        tip: "<p>Tip answer 2</p>"
                    }
                },
                {
                    text: "Answer 3",
                    bestAnswer: false,
                    tipsAndFeedback: {
                        tip: "<p>Tip answer 3</p>"
                    }
                }
            ]
        }
    },
    displaySettings: {
        codeWidth: '100',
        codeWidthUnit: '%'
    }
}
