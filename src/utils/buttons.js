const UI = H5P.JoubelUI;

function createButton(callback, icon, name) {
    return UI.createButton({
        title: 'Submit',
        click: function(_) {
            callback();
        },
        keypress: function(event) {
            // either space / enter key activates buttons created
            if (event.which === 13 || event.which === 32) {
                event.preventDefault();
                callback();
            }
        },
        html: '<span><i class="fa ' + icon +
            '" aria-hidden="true"></i></span>&nbsp;' + name
    });
};

export function showCheckButton(cb, icon, text) {
    return createButton(cb, icon, text);
};
