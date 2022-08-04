import './reset.css';
import './fonts/stylesheet.css';
import './styles/index.scss';


const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const api_url = `http://localhost:9000/api/v8/posts-v2/web/${params.token}`;

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
    let slideIndex = 1;
    showSlides(slideIndex);
    load_post_for_this_post(params.token);
    const megamenu_button = document.querySelector('button.megamenu-button');
    megamenu_button.onclick = cat_onClick;
    document.onclick = button_onClick;
}

const page_layout = fetch(api_url, {
    "headers": {
        "accept": "application/json-filled",
        "accept-language": "en-US,en;q=0.9,la;q=0.8",
        "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "Referer": "https://divar.ir/",
        "Referrer-Policy": "origin"
    },
    "body": null,
    "method": "GET"
})
.then(
    (response) => {
        return response.json();
})
.then(
    (data) => {

        const layout = {
            title: null,
            subtitle: null,
            desc: null,
            list_data: null,
            breadcrumb: null,
            breadcrumb_curr: null,
            image: null,
            tags: null,
            seo_title: null,
            seo_desc: null
        }

        const sections = data.sections;
        const seo      = data.seo;

        sections.forEach(section => {
            // console.log(element);
            const section_name = section.section_name;
            if(section_name == "TITLE") {
                layout.title = section.widgets[0].data.title;
                layout.subtitle = section.widgets[0].data.subtitle;
            }else if(section_name == "IMAGE") {
                layout.image = section.widgets[0].data.items;
            }else if(section_name == "DESCRIPTION") {
                layout.desc = section.widgets;
            }else if(section_name == "TAGS") {
                layout.tags = section.widgets[0].data.chip_list;
            }else if(section_name == "BREADCRUMB") {
                layout.breadcrumb = section.widgets[0].data.parent_items;
                layout.breadcrumb_curr = section.widgets[0].data.current_page_title;
            }else if(section_name == "LIST_DATA") {
                layout.list_data = section.widgets;
            }
        });
        
        layout.seo_title = seo.title;
        layout.seo_desc  = seo.description;

        console.log(layout);

        // Breadcrumb
        if(layout.breadcrumb) {
            const breadcrumb_container = document.getElementById('layout__page-breadcrumb');

            const breadcrumb_texts = layout.breadcrumb.map(el => {return el.title});

            for(let i = 0; i < breadcrumb_texts.length; ++i) {
                let el = `<li class="post-breadcrumbs__item flex flex--row flex--cvcenter">
                                <a href="#" class="post-breadcrumbs__link no-link-style">${breadcrumb_texts[i]}</a>`;

                if(i !== breadcrumb_texts.length - 1) {
                    el += `<img class="post-breadcrumbs__icon icon--small" src="${ require( "./icons/svgs/arrow-left.svg"  ).default }"/></li>`;
                }else {
                    el += '</li>';
                }

                
                breadcrumb_container.insertAdjacentHTML('beforeend', el);
            }


        }
        
        // Title
        document.getElementById('layout__page-title').innerHTML = layout.title;
        document.getElementById('layout__page-subtitle').innerHTML = layout.subtitle;

        // grouping section
        let group_info_row = []
        let group_unexp_row = []
        let group_feature_row = []
        let group_section_title = null;

        layout.list_data.forEach(el => {
            let type = el.widget_type;
            switch(type) {
                case "GROUP_INFO_ROW": {
                    group_info_row.push(el);
                    break;
                }
                case "UNEXPANDABLE_ROW": {
                    group_unexp_row.push(el);
                    break;
                }
                case "SECTION_TITLE_ROW": {
                    group_section_title = el;
                    break;
                }
                case "GROUP_FEATURE_ROW": {
                    group_feature_row.push(el);
                    break;
                }
            }
        });


        if(group_info_row.length > 0) {
            const items = group_info_row[0].data.items;
            const row_container = document.getElementById('layout__page-group-row');
            items.forEach(row => {
                const template = `<div class="post-main__group-item group--col">
                                    <span class="post-main__group-item__title">${row.title}</span>
                                    <span class="post-main__group-item__value">${row.value}</span>
                                  </div>`;

                row_container.insertAdjacentHTML( 'beforeend', template);
            });
        }

        if(group_unexp_row.length > 0) {
            const col_container = document.getElementById('layout__page-group-col');
            group_unexp_row.map(el => {
                return {title: el.data.title, value: el.data.value};
            }).forEach(set => {
                const template = `<div class="post-main__group-item flex flex--row group--row">
                                    <span class="post-main__group-item__title">${set.title}</span>
                                    <span class="post-main__group-item__value">${set.value}</span>
                                  </div>`;

                col_container.insertAdjacentHTML('beforeend', template);
            });
        }

        if(group_section_title) {
            document.getElementById('layout__page-feature-title').innerHTML = group_section_title.data.title;

            const items = group_feature_row[0].data.items;
            const feature_container = document.getElementById('layout__page-group-feature');
            items.forEach(row => {
                const template = `<div class="post-main__group-item group--col">
                                    <span class="post-main__group-item__title">
                                        <picture class="">
                                            <source srcset="${row.icon.image_url_light}" />
                                            <img src="${row.icon.image_url_light}" alt="ICON_${row.icon.icon_name}" class="icon--normal" />
                                        </picture>
                                    </span>
                                    <span class="post-main__group-item__value">${row.title}</span>
                                  </div>`;

                feature_container.insertAdjacentHTML( 'beforeend', template);
            });
        }




        // Description
        if(layout.desc) {
            document.getElementById('layout__page-desc-title').innerHTML = layout.desc[0].data.title;
            document.getElementById('layout__page-desc-body').innerHTML = layout.desc[1].data.text;
        }


        // Tags
        if(layout.tags) {
            const tag_container = document.getElementById('layout__page-tags');
            layout.tags.chips.map(el => {return el.text}).forEach(tag_text => {
                const button = `<button class="button button--tag">
                                    <span>${tag_text}</span>
                                </button>`;

                tag_container.insertAdjacentHTML('beforeend', button);
            });
        }

        // Images
        if(layout.image) {
            const main_image = document.getElementById('layout__page-slider');
            const thumbnails = document.getElementById('layout__page-thumbnail');


            const images = layout.image.map(el => {
                return el.image;
            });

            images.forEach((image, i) => {
                const slider_element = `<picture class="extra-info__slider-image slider">
                                        <source srcset="${image.url}" />
                                        <img src="${image.url}" alt="${image.alt}" class="extra-info__slider-image" />
                                    </picture>`;

                const thumbnail_element = `<div class="extra-info__thumbnail" onclick="currentSlide(${i + 1})">
                                                <picture>
                                                    <source srcset="${image.url}" />
                                                    <img src="${image.url}" alt="${image.alt}" />
                                                </picture>
                                            </div>`;

                
                main_image.insertAdjacentHTML('beforeend', slider_element);
                thumbnails.insertAdjacentHTML('beforeend', thumbnail_element);

            });
        }
        
        
    
});