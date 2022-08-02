import './reset.css';
import './fonts/stylesheet.css';
import './styles/index.scss';


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
window.onload = () => {
    const megamenu_button = document.querySelector('button.megamenu-button');
    megamenu_button.onclick = cat_onClick;
    document.onclick = button_onClick;
}