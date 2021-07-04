export function decodeHtmlEntities(html) {
    let txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

export function createMarkup(text, replace) {
    if (replace === true) {
        return {__html: text ? text.replace(/\r\n|\r|\n/g, '</br>') : ''};
    } else {
        return {__html: text ? text : ''};
    }
}

export function createPreservedMarkup(text) {
    return text ? text.replace(/\r\n|\r|\n/g, '</br>')
                            .replace(/ /g, '&nbsp;')
                            .replace(/&quot;/g, '\"')
                            .replace(/&#039;/g, '\'')
                : '';
}

export function decodeHTML(html) {
	var txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
}