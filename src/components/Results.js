import React from 'react';

jQuery = H5P.jQuery;

export const Results = React.forwardRef((props, ref) => {
 
    self.$feedbacks = $('<div class="feedback-container" />');
    let scoreText = params.l10n.score;
    scoreText = scoreText.replace('@score', result).replace('@total',
        1);
    self.$feedbacks.html('<div class="feedback-text">' + scoreText +
        '</div>');
    self.$progressBar = UI.createScoreBar(1, 'scoreBarLabel');
    self.$progressBar.setScore(result);
    self.$progressBar.appendTo(self.$feedbacks);
    self.$feedbacks.appendTo(self.$footer);

    if (params.behaviour) {
        // Set the value if retry is enabled
        self.$retryButton = createButton(self.retry, 'fa-repeat',
            params.l10n.tryAgain);
        self.$retryButton.appendTo(self.$footer);
    }

    var completedEvent = self.createXAPIEventTemplate('completed');
    completedEvent.setScoredResult(result, 1, self, true,
        result === 1);
    self.trigger(completedEvent);
    console.log(completedEvent);
    // Set focus on the first button in the footer
    self.$footer.children('button').first().focus();
    self.trigger('resize');
});