import './reset.css';
import './fonts/stylesheet.css';
import './styles/index.scss';


function handleMegaMenuButtonClick() { 

    const megaMenuElement = document.getElementsByClassName('megamenu')[0];

    const isHidden =  megaMenuElement.classList.toggle('megamenu--hidden');

    if(!isHidden) {
        const el = document.createElement('div');
        el.classList.add('overlay');
        el.addEventListener('click', () => {
            handleMegaMenuButtonClick();
        });
        document.getElementsByTagName('body')[0].appendChild(el);
    }
    else {
        const el = document.getElementsByClassName('overlay')[0];
        document.getElementsByTagName('body')[0].removeChild(el);
    }
}


document.getElementsByClassName('megamenu-button')[0].addEventListener('click', () => {
        handleMegaMenuButtonClick();
        console.log('D');
});