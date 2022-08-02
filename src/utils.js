function megamenuClickHandler(event){
    const megamenu = document.querySelector('.megamenu');
    megamenu.classList.toggle('hidden');
    const shade = document.querySelector('.megamenu-shade');
    shade.classList.toggle('hidden');
    event.stopPropagation()
}
document.querySelector('.megamenu-button').addEventListener('click', megamenuClickHandler);
document.addEventListener('click', function(event){
    const megamenu = document.querySelector('.megamenu');
    const shade = document.querySelector('.megamenu-shade');
    if(!megamenu.contains(event.target) && !megamenu.classList.contains('hidden')){
        megamenu.classList.toggle('hidden');
        shade.classList.toggle('hidden');
    }
})