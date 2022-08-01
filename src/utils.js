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

fetch("https://api.divar.ir/v8/web-search/1/ROOT", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9,fa;q=0.8",
    "content-type": "application/json",
    "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Microsoft Edge\";v=\"103\", \"Chromium\";v=\"103\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site"
  },
  "referrer": "https://divar.ir/",
  "referrerPolicy": "origin",
  "body": "{\"json_schema\":{\"category\":{\"value\":\"ROOT\"},\"cities\":[\"1\"]},\"last-post-date\":1659354219341831}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
}).then((res)=>res.json()).then((c)=>c.web_widgets.post_list).then((posts)=>{
    posts.map((el,i)=>{
        let data = el.data
        container = document.querySelector(".browse__posts")
        container.innerHTML += `<a href="#post" class="post no-link-style">
        <div class="post__body">
          <h3 class="post__title">
          ${data.title}
          </h3>
          <p class="post__price">${data.middle_description_text}</p>
          <p class="post__author">${data.bottom_description_text}</p>
        </div>

        <picture class="post__picture">
          <source srcset="${data.image_url[0].src}" />
          <img width="180px" height="100px" src="${data.image_url[0].src}" class="post__img" />
        </picture>
      </a>`
      return null
    })
});