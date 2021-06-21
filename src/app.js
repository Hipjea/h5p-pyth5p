import React from 'react';
import ReactDOM from 'react-dom';
import { PythonCodeContextProvider } from './PythonCodeContext';
import './app.css';
import Main from './components/Main';
import { showCheckButton } from './utils/buttons'

// Load the H5P library
H5P = H5P || {};

H5P.PytH5P = (function (EventDispatcher, $, UI) {
    function PytH5P(params, contentId, extras = {}) {
        var self = this;

        // Initialize event inheritance
        EventDispatcher.call(this);

        this.wrapper = null;
        this.id = contentId;
        this.params = params;
        this.params.l10n = {
            score: 'Score',
            showSolutionButton: 'Show solution'
        }
        this.error = null;

        const root = document.documentElement;
        const codeWidthVal = this.params.displaySettings.codeWidth;
        const codeWidthUnit = this.params.displaySettings.codeWidthUnit;

        this.customSettings = {
            codeWidth: `${codeWidthVal}${codeWidthUnit}`,
            codeFont: this.params.displaySettings.codeFont
        };

        self.$footer = $('<div class="footer-container"/>');

        const createElements = () => {
            const wrapper = document.createElement('div');
            wrapper.classList.add('h5p-pyth5p-wrapper');
            this.wrapper = wrapper;
      
            ReactDOM.render(
                <PythonCodeContextProvider value={this}>
                    <Main
                        id={contentId}
                        error={this.error}
                        customSettings={this.customSettings}
                        {...this.params}
                    />
                </PythonCodeContextProvider>,
                this.wrapper
            );
        };

        this.attach = (container) => {
            if (!this.wrapper) {
                createElements();
            }
            root.style.setProperty('--code-width', this.customSettings.codeWidth);
            // Append elements to DOM
            container[0].appendChild(this.wrapper);
            container[0].classList.add('h5p-pyth5p');
            
            self.$footer.appendTo(container[0]);
            self.$checkButton = showCheckButton(displayResult, 'fa-check', "Check Answer");
            self.$checkButton.appendTo(self.$footer);
        };

        const displayResult = () => {
            let result = 10;

            const answer = $('#pyth5p-pre').html();
            
            self.$checkButton.remove();
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
                //set the value if retry is enabled
                self.$retryButton = createButton(self.retry, 'fa-repeat',
                    params.l10n.tryAgain);
                self.$retryButton.appendTo(self.$footer);
            }

            var completedEvent = self.createXAPIEventTemplate('completed');
            completedEvent.setScoredResult(result, 1, self, true,
                result === 1);
            self.trigger(completedEvent);
            console.log(completedEvent);
            // set focus on the first button in the footer
            self.$footer.children('button').first().focus();
            self.trigger('resize');
        };

    }

    // Inherit prototype properties
    PytH5P.prototype = Object.create(H5P.EventDispatcher.prototype);
    PytH5P.prototype.constructor = PytH5P;

    return PytH5P;
})(H5P.EventDispatcher, H5P.jQuery, H5P.JoubelUI);
