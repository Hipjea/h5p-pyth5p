export function decodeHtmlEntities(html) {
    let txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

export function createMarkup(text) {
    return {__html: text ? text.replace(/\r\n|\r|\n/g, '</br>') : ''};
}

export function createPreservedMarkup(text) {
    return {
        __html: text ? text.replace(/\r\n|\r|\n/g, '</br>')
                    .replace(/ /g, '&nbsp;')
                : ''
    };
}