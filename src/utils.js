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

function profileClickHandler(event){
    const profile = document.querySelector('.header-navbar__profile-container');
    profile.style.visibility = profile.style.visibility==='visible'? 'hidden':'visible';
    event.stopPropagation()
}
document.querySelector("#profile-button").addEventListener('click', profileClickHandler);

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
export function safeParseJson(json) {
    try {
        return JSON.parse(json);
    } catch (e) {
        return {};
    }
}