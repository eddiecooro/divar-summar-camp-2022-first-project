import "./reset.css";
import "./fonts/stylesheet.css";
import "./styles/index.scss";

function handleMegaMenuButtonClick() {
  const megaMenuElement = document.getElementsByClassName("megamenu")[0];

  const isHidden = megaMenuElement.classList.toggle("megamenu--hidden");

  if (!isHidden) {
    const el = document.createElement("div");
    el.classList.add("overlay");
    el.addEventListener("click", () => {
      handleMegaMenuButtonClick();
    });
    document.getElementsByTagName("body")[0].appendChild(el);
  } else {
    const el = document.getElementsByClassName("overlay")[0];
    document.getElementsByTagName("body")[0].removeChild(el);
  }
}

function createPostNode(data) {
  const element = document.createElement("a");
  element.classList.add("post");
  element.classList.add("no-link-style");
  element.setAttribute("href", "#post");
  const divEl = document.createElement("div");
  divEl.classList.add("post__body");
  const postHeader = document.createElement("h3");
  postHeader.classList.add("post__title");
  postHeader.innerText = data["title"];
  const priceNode = document.createElement("p");
  priceNode.classList.add("post__price");
  priceNode.innerText = data["middle_description_text"];
  const AuthorNode = document.createElement("p");
  AuthorNode.classList.add("post__author");
  AuthorNode.innerText = data["top_description_text"];
  const pictureNode = document.createElement("picture");
  pictureNode.classList.add("post__picture");
  const sourceNode = document.createElement("source");
  const imageAddress = data["image_url"]?.[0]?.["src"];
  const imgNode = document.createElement("img");
  imgNode.classList.add("post__img");
  imgNode.setAttribute("height", "100px");
  imgNode.setAttribute("width", "180px");
  if (imageAddress) {
    sourceNode.setAttribute("srcset", data["image_url"][0]["src"]);
    imgNode.setAttribute("src", data["image_url"][0]["src"]);
  }
  pictureNode.appendChild(imgNode);
  pictureNode.appendChild(sourceNode);
  divEl.appendChild(postHeader);
  divEl.appendChild(priceNode);
  divEl.appendChild(AuthorNode);
  element.appendChild(divEl);
  element.appendChild(pictureNode);
  return element;
}

function load() {
  fetch("http://localhost:9000/api/v8/web-search/1/ROOT", {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9,fa-IR;q=0.8,fa;q=0.7",
      "content-type": "application/json",
      "sec-ch-ua":
        '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Linux"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
    },
    referrer: "https://divar.ir/",
    referrerPolicy: "origin",
    body: '{"json_schema":{"category":{"value":"ROOT"},"cities":["1"]},"last-post-date":1659354297324362}',
    method: "POST",
    mode: "cors",
    credentials: "include",
  })
    .then((data) => data.json())
    .then((response) => {
        const browse = document.getElementsByClassName("browse__posts")[0];
      const itemNodes = response["web_widgets"]["post_list"]
        .map((item) => {
          return item["data"];
        })
        .map((item) => {
          return createPostNode(item);
        }).forEach((item) => {
        browse.appendChild(item);
      });
    });
}

document
  .getElementsByClassName("megamenu-button")[0]
  .addEventListener("click", () => {
    handleMegaMenuButtonClick();
  });
load();
