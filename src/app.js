import React from 'react';
import ReactDOM from 'react-dom';
import { PythonCodeContextProvider } from './PythonCodeContext';
import './app.css';
import Main from './components/Main';


// Load the H5P library
H5P = H5P || {};

H5P.PytH5P = (function ($, Question) {
    function PytH5P(params, contentId, extras = {}) {
        Question.call(this, 'pyth5p');

        // Initialize event inheritance
        H5P.EventDispatcher.call(this);

        this.wrapper = null;
        this.id = contentId;
        this.params = params;
        this.params.l10n = {
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
        };
    }

    // Inherit prototype properties
    PytH5P.prototype = Object.create(Question.prototype);
    PytH5P.prototype.constructor = PytH5P;

    return PytH5P;
})(H5P.jQuery, H5P.Question);
