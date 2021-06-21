export function decodeHtmlEntities(html) {
    let txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}