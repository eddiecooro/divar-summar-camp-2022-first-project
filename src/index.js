"use strict";
import './reset.css';
import './fonts/stylesheet.css';
import './styles/index.scss';



// To be imported

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

    console.log('Hello');

    const post_container = document.getElementById('browse_posts');

    const post_fetch = fetch("http://localhost:9000/api/v8/web-search/1/ROOT", {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,la;q=0.8",
          "content-type": "application/json",
          "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "cookie": "did=8229b2b4-c106-496b-9f7b-931f333647ff; _gcl_au=1.1.1326831491.1655534318; multi-city=tehran%7C; city=tehran; _gid=GA1.2.2117717562.1659341024; smart-banner-closed=true; _gat_gtag_UA_32884252_2=1; _ga=GA1.2.1643694590.1655534319; _gat_UA-32884252-2=1; _ga_SXEW31VJGJ=GS1.1.1659354580.22.1.1659356246.0",
          "Referer": "https://divar.ir/",
          "Referrer-Policy": "origin"
        },
        "body": "{\"json_schema\":{\"category\":{\"value\":\"ROOT\"},\"cities\":[\"1\"]},\"last-post-date\":1659356195621216}",
        "method": "POST"
      });

      const postdata = post_fetch.then((result) => {return result.json()})
      .then((result) => {
        return result.web_widgets.post_list;
      });

      postdata.then(
        (posts) => {
            console.log(posts);
            posts.forEach(post => {
                post = post.data;
                const element = `<a href="/spost.html" class="post no-link-style">
                                    <div class="post__body">
                                    <h3 class="post__title">
                                        ${post.title}
                                    </h3>
                                    <p class="post__price">${post.middle_description_text}</p>
                                    <p class="post__author">${post.bottom_description_text}</p>
                                    </div>
                    
                                    <picture class="post__picture">
                                    <source srcset="${(post.image_url.length !== 0) ? post.image_url[0].src : null}" />
                                    <img width="180px" height="100px" src="${(post.image_url[0].src) ? post.image_url[0].src : null}" class="post__img" />
                                    </picture>
                                </a>`;

                post_container.insertAdjacentHTML( 'beforeend', element );
            });
        }
      );
}

