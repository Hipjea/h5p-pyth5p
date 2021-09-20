export function decodeHtmlEntities(html: string) : string {
    let txt = document.createElement('textarea') as HTMLTextAreaElement;
    txt.innerHTML = html;
    return txt.value;
}

export function createMarkup(text: string, replace?: boolean): { __html: string } {
    if (replace === true) {
        return {__html: text ? text.replace(/\r\n|\r|\n/g, '</br>') : ''};
    } else {
        return {__html: text ? text : ''};
    }
}

export function createPreservedMarkup(text: string) : string {
    return text ? text.trimEnd().replace(/\r\n|\r|\n/g, '</br>')
                            .replace(/ /g, '&nbsp;')
                            .replace(/&quot;/g, '\"')
                            .replace(/&#039;/g, '\'')
                : '';
}
