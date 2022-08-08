import './reset.css';
import './fonts/stylesheet.css';
import './styles/index.scss';
import './styles/single-post.scss';

function megamenuClicked() {
  const megamenu = document.getElementById("megamenu")
  if (megamenu.classList.contains("megamenu--hidden")) {
    const overlay = document.createElement("div");
    overlay.style.width = "100vw"
    overlay.style.height = "100vh"
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)"
    overlay.style.top = "0"
    overlay.style.left = "0"
    overlay.style.position = "fixed"
    overlay.style.zIndex = "2";
    overlay.id = "menuOverlay"
    document.body.appendChild(overlay);
  } else {
    document.getElementById("menuOverlay").remove();
  }
  document.getElementById("megamenu").classList.toggle("megamenu--hidden");

}
document.getElementById("megamenu-button").addEventListener("click", megamenuClicked);

// document.addEventListener('click', function (elem) {
//     console.log(elem.classList)
//     if(elem.id=="megamenu-button"){
//         megamenuClicked();
//     }
//     else{
//     if (document.getElementById("menuOverlay")) {
//         while (elem.parentNode) {
//             elem = elem.parentNode;
//             if (elem.id == "megamenu-wrapper") {
//                 return
//             }
//         }
//         document.getElementById("menuOverlay").remove();
//         document.getElementById("megamenu").classList.toggle("megamenu--hidden");
//     }
//     }

// });
fetch("http://localhost:9000/api/v8/web-search/2/ROOT", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Linux\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site"
    },
    "referrer": "https://divar.ir/",
    "referrerPolicy": "origin",
    "body": "{\"json_schema\":{\"category\":{\"value\":\"ROOT\"},\"cities\":[\"1\"]},\"last-post-date\":1659356459689926}",
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
  }).then((response) => response.json())
  .then((data) => {
    data = data["web_widgets"]["post_list"];
    console.log(data);
    data.forEach(element => {
      // const post=document.createElement('a');
      // post.classList.add("post");
      // post.classList.add("no-link-style");
      // const title= document.createElement("h3");
      // title.innerText=element["data"]["title"];
      // title.classList.add("post__title");
      // const price=document.createElement("p");
      // price.classList.add("post__price");
      // price.innerText=element["data"]["top_description_text"]
      // const author= document.createElement("p");
      // author.classList.add("post_author");
      // author.innerText=element["data"]["bottom_description_text"];
      // const post_body= document.createElement("div");
      // post_body.classList.add("post__body");
      // post_body.appendChild(title);
      // post_body.appendChild(price);
      // post_body.appendChild(author);
      // const photo= document.createElement("img");
      // // console.log(element["data"]["image_url"])
      // photo.src=element["data"]["image_url"][1]["src"];
      // photo.classList.add("post__picture");
      // post.appendChild(post_body);
      // post.appendChild(photo);
      let src1 = "";
      let src2 = "";
      const images = element["data"]["image_url"]
      // console.log("images", images)
      if (typeof images != 'string') {
        src1 = images[0]["src"];
        src2 = images[1]["src"];
        document.getElementById("browse").innerHTML += ` <a href="single-post.html?token=${element["data"]["token"]}" class="post no-link-style">
                <div class="post__body">
                  <h3 class="post__title">${element["data"]["title"]}</h3>
                  <p class="post__price">${element["data"]["top_description_text"]}</p>
                  <p class="post__author">${element["data"]["bottom_description_text"]}/p>
                </div>
    
                <picture class="post__picture">
                  <source srcset="${src1}" />
                  <img width="180px" height="100px" src="${src2}" class="post__img" />
                </picture>
              </a>`;
      } else {
        document.getElementById("browse").innerHTML += ` <a href="single-post.html" class="post no-link-style">
                <div class="post__body">
                  <h3 class="post__title">${element["data"]["title"]}</h3>
                  <p class="post__price">${element["data"]["top_description_text"]}</p>
                  <p class="post__author">${element["data"]["bottom_description_text"]}/p>
                </div>
    
                <picture class="post__picture">
              
                  <img width="180px" height="100px" class="post__img" />
                </picture>
              </a>`;
      }


    });




  });;
// fetch("http://localhost:9000/api/v8/web-search/1/ROOT").then((response) => console.log(response))
//     .then((data) => console.log(data));
// document..addEventListener("click", element => {
//   const url = window.location.href; // 'https://stacksnippets.net/js'
//   const params = url.split('/'); // ['https', '', 'stacksnippets.net', 'js']
//   const parameter = params[params.length-1]; // 'js'

//   const page2 = "https://www.example.com/" +parameter; // 'https://www.example.com/js'
//   alert("Going to new page: " +page2);
//   window.location.href = page2 // Go to page2 url
// });
