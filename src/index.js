import './reset.css';
import './fonts/stylesheet.css';
import './styles/index.scss';

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
fetch("http://api.divar.ir/v8/web-search/1/ROOT", {
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
});
// fetch("http://localhost:9000/api/v8/web-search/1/ROOT").then((response) => console.log(response))
//     .then((data) => console.log(data));