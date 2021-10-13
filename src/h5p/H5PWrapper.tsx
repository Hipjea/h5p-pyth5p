import * as React from "react";
import * as ReactDOM from "react-dom";
import { IH5PWrapper } from "../../H5P";
import App from "../components/App";
import { Params } from "../types/H5P/Params";
import { H5P } from "./H5P.util";
import l10n from '../localization'; 

export class H5PWrapper extends H5P.EventDispatcher implements IH5PWrapper {
  private wrapper: HTMLElement;

  constructor(params: Params, contentId: string) {
    super();
    this.wrapper = H5PWrapper.createWrapperElement();

    ReactDOM.render(
      <App 
        contentId={contentId} 
        params={{l10n, ...params}} 
        fn={H5PWrapper.prototype}
      />,
      this.wrapper,
    );
  }

  attach([containerElement]: JQuery<HTMLElement>): void {
    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-pyth5p");
  }

  private static createWrapperElement(): HTMLDivElement {
    return document.createElement("div");
  }
}