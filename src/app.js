import React from 'react';
import ReactDOM from 'react-dom';
import { PythonCodeContextProvider } from './PythonCodeContext';
import './app.css';
import Main from './components/Main';
import l10n from './localization';


// Load the H5P library
H5P = H5P || {};

H5P.PytH5P = (function (EventDispatcher, $, UI) {
    function PytH5P(params, contentId, extras = {}) {
        var self = this;

        // Initialize event inheritance
        EventDispatcher.call(this);

        const root = document.documentElement;
        const codeWidthVal = params.displaySettings.codeWidth;
        const codeWidthUnit = params.displaySettings.codeWidthUnit;

        const customSettings = {
            codeWidth: `${codeWidthVal}${codeWidthUnit}`,
            codeFont: params.displaySettings.codeFont
        };

        this.wrapper = null;
        this.id = contentId;
        this.params = {
            l10n: l10n,
            editorOptions: {
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                tabSize: 4,
                fontSize: 13,
                showGutter: true,
                readOnly: params.isEditable ? true : false,
                behavioursEnabled: true,
                wrapBehavioursEnabled: true,
                maxLines: "Infinity",
                minLines: 5,
                fontFamily: customSettings.codeFont
            },
            ...params
        }
        this.error = null;

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
            root.style.setProperty('--code-width', customSettings.codeWidth);
            // Append elements to DOM
            container[0].appendChild(this.wrapper);
            container[0].classList.add('h5p-pyth5p');
        };

    }

    // Inherit prototype properties
    PytH5P.prototype = Object.create(H5P.EventDispatcher.prototype);
    PytH5P.prototype.constructor = PytH5P;

    return PytH5P;
})(H5P.EventDispatcher, H5P.jQuery, H5P.JoubelUI);
