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

export function deepSearchByKey(object, originalKey, matches = []) {

    if(object != null) {
        if(Array.isArray(object)) {
            for(let arrayItem of object) {
                deepSearchByKey(arrayItem, originalKey, matches);
            }
        } else if(typeof object == 'object') {

            for(let key of Object.keys(object)) {
                if(key == originalKey) {
                    matches.push(object);
                } else {
                    deepSearchByKey(object[key], originalKey, matches);
                }

            }

        }
    }
    return matches[0];
}

export function deepSearchByPair(object, originalKey, originalValue,matches = []) {

    if(object != null) {
        if(Array.isArray(object)) {
            for(let arrayItem of object) {
                deepSearchByPair(arrayItem, originalKey,originalValue, matches);
            }
        } else if(typeof object == 'object') {

            for(let key of Object.keys(object)) {
                if(key == originalKey && object[key] == originalValue) {
                    matches.push(object);
                } else {
                    deepSearchByPair(object[key], originalKey,originalValue, matches);
                }

            }

        }
    }
    return matches;
}