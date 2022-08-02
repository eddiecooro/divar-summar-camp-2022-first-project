
function cat_onClick(e) {
    e.stopPropagation();
    const menu = document.querySelector('section.megamenu');
    const container = document.querySelector('div#overlay');
    menu.classList.toggle('megamenu-clicked');
    container.classList.toggle('not-clickable');
}

function button_onClick(e) {
    e.stopPropagation();
    const menu = document.querySelector('section.megamenu');
    const container = document.querySelector('div#overlay');
    container.classList.remove('not-clickable');
    menu.classList.remove('megamenu-clicked');
}