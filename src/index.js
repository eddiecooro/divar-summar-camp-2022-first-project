import './reset.css';
import './fonts/stylesheet.css';
import './styles/index.scss';



// To be imported

function onClick(e) {
    e.stopPropagation();
    const menu = document.querySelector('section.megamenu');
    const container = document.querySelector('div#overlay');
    menu.classList.toggle('megamenu-clicked');
    container.classList.toggle('not-clickable');
}
window.onload = () => {
    const megamenu_button = document.querySelector('button.megamenu-button');
    megamenu_button.onclick = onClick;
    document.onclick = onClick;
}

