import { deepSearchByKey, deepSearchByPair } from "./utils.js";
let url = window.location.href;
if (url.includes("post.html")) {
  let url_split = url.split("=");
  let category = url_split[url_split.length - 1];

  fetch(`http://localhost:9000/api/v8/posts-v2/web/${category}`, {
    headers: {
      accept: "application/json-filled",
      "accept-language": "en-US,en;q=0.9,fa;q=0.8",
      "sec-ch-ua":
        '" Not;A Brand";v="99", "Microsoft Edge";v="103", "Chromium";v="103"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Linux"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
    },
    referrer: "https://divar.ir/",
    referrerPolicy: "origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "omit",
  })
    .then((r) => r.json())
    .then((b) => {
      console.log(b);
      let data = b.sections;
      let title = deepSearchByKey(data, "title")["title"];
      let author = deepSearchByKey(data, "subtitle")["subtitle"];
      let chips = deepSearchByKey(data, "chips")["chips"];
      let infobox = null;
      try {
        infobox = deepSearchByPair(data, "widget_type", "GROUP_INFO_ROW")[0][
          "data"
        ]["items"];
      } catch (error) {}

      let rows = deepSearchByPair(data, "widget_type", "UNEXPANDABLE_ROW");
      let description = deepSearchByPair(
        data,
        "widget_type",
        "DESCRIPTION_ROW"
      )[0]["data"]["text"];
      description = description.replaceAll("\n", "<br/>");
      let images = deepSearchByPair(data, "widget_type", "IMAGE_CAROUSEL")[0][
        "data"
      ]["items"];

      console.log(images);

      let container = document.querySelector(".single-post-container");
      container.innerHTML = `
      <main class="single-post">
        <nav class="single-post__breadcrumb">
          <span class="single-post__arrowed-text">
            املاک <img class="single-post__arrow"src="${
              require("./icons/svgs/chevron-left.svg").default
            }"/>
          </span>
          <span class="single-post__arrowed-text">
            فروش مسکونی <img class="single-post__arrow"src="${
              require("./icons/svgs/chevron-left.svg").default
            }"/>
          </span>
          <span class="single-post__arrowed-text">
            آپارتمان <img class="single-post__arrow"src="${
              require("./icons/svgs/chevron-left.svg").default
            }"/>
          </span>
        </nav>
        <article class="single-post__main-content">
        <section class="single-post__right-box">
          <h1 class="single-post__title">
            ${title}
          </h1>
          <section class="single-post__author">
            ${author}
          </section>
          <section class="single-post__actions">
            <button class="single-post__action-button button button--primary">
              <span class="button__title"> اطلاعات تماس </span>
            </button>
            <button class="single-post__action-button button button--secondary">
              <span class="button__title"> چت </span>
            </button>
            <button class="single-post__action-bookmark  button button--icon">
              <img src="${require("./icons/svgs/bookmark-o.svg").default}"/>
            </button>
            <button class="single-post__action-share button button--icon">
              <img src="${
                require("./icons/svgs/share-variant-o.svg").default
              }"/>
            </button>
          </section>
          ${
            infobox !== null
              ? `<section class="single-post__info-box-container">
          ${infobox
            .map(
              (item) => `
          <section class="single-post__info-box">
            <span class="single-post__info-box-title"> ${item.title} </span>
            <span class="single-post__info-box-value"> ${item.value} </span>
          </section>`
            )
            .join(" ")}
          </section>`
              : ""
          }
          <hr class="single-post__info-row-separator"/>
          <section class="single-post__info-row-container">
          ${rows
            .map(
              (item) => `
          <section class="single-post__info-row">
            <span class="single-post__info-row-title">${item.data.title}</span>
            <span class="single-post__info-row-value"
              >${item.data.value}</span
            >
          </section>
          <hr class="single-post__info-row-separator"/>`
            )
            .join(" ")}
          </section>
          <section class="single-post__description">
            <section class="single-post__description-title">توضیحات</section>

            <section class="single-post__description-text">${description.replace(
              "\\n",
              "<br/>"
            )}</section>
          </section>
          <section class="single-post__tag-box">
          ${chips
            .map(
              (chip) => `<button class="single-post__tag">${chip.text}</button>`
            )
            .join(" ")}
            
          </section>
        </section>
        <section class="single-post__left-box">
          <section class="single-post__image-container">
            <img
              class="single-post__image"
              src="${images[0].image.url}"
            />
          </section>
          <section class="single-post__thumbnail-container">
            ${images
              .map(
                (image) => `
            <div class="single-post__thumbnail">
              <img
                class="single-post__thumbnail-image"
                src="${image.image.url}"
              />
            </div>`
              )
              .join(" ")}
          </section>
          <section class="single-post__note-container">
            <textarea id="note" class="single-post__note" type="textbox" placeholder="یادداشت">
            </textarea>
            <section class="single-post__note-warning">

            </section>
          </section>
          <button class="single-post__safe-buy">

          </button>
          <button class="single-post__report">

          </button>
        </section>
      </article>
      </main>`;

      let res = document.querySelectorAll(".single-post__thumbnail");
      console.log(res);
      res.forEach((element) => {
        element.onclick = function (event) {
          const image = document.querySelector(".single-post__image");
          const newImage = event.target.src;
          console.log(newImage);
          image.src = newImage;
        };
      });
    });
}