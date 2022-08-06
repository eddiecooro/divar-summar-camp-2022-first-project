import { deepSearchByKey, deepSearchByPair } from "./utils.js";
let url = window.location.href;
if (url.includes("post.html")) {
  let url_split = url.split("=");
  let postID = url_split[url_split.length - 1];

  fetch(`http://localhost:9000/api/v8/posts-v2/web/${postID}`, {
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
      let bookmarks = JSON.parse(window.localStorage.getItem("bookmarks"));
      let notes = JSON.parse(window.localStorage.getItem("notes"));

      let bookmarked = false;
      if (bookmarks) {
        for (let i = 0; i < bookmarks.length; i++) {
          if (bookmarks[i].url == url) {
            bookmarked = true;
          }
        }
      }

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
      let hasImage = deepSearchByPair(data, "widget_type", "IMAGE_CAROUSEL").length>0;
      let images = hasImage?deepSearchByPair(data, "widget_type", "IMAGE_CAROUSEL")[0][
        "data"
      ]["items"]:[];

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
            <button id="contact-info" class="single-post__action-button button button--primary">
              <span class="button__title"> اطلاعات تماس </span>
            </button>
            <button class="single-post__action-button button button--secondary">
              <span class="button__title"> چت </span>
            </button>
            <button class="single-post__action-bookmark ${
              bookmarked ? "bookmarked " : ""
            }button button--icon">
              <img class="single-post__bookmark-icon" src="${
                bookmarked
                  ? require("./icons/svgs/bookmarked.svg").default
                  : require("./icons/svgs/bookmark-o.svg").default
              }"/>
            </button>
            <button class="single-post__action-share button button--icon">
              <img class="single-post__share-icon" src="${
                require("./icons/svgs/share-variant-o.svg").default
              }"/>
            </button>
          </section>
          <section class="single-post__contact-info-container height-0">
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
          <hr class="single-post__row-separator"/>
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
          <hr class="single-post__row-separator"/>`
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
          <section class="single-post__image-container square-image-container ${!hasImage?"hidden":""}">
          <section class="square-image-container__wrapper">
            <img
              class="square-image-container__image single-post__image"
              src="${hasImage?images[0].image.url:""}"
            />
          </section>
          </section>
          <section class="single-post__thumbnail-container ${!hasImage?"hidden":""}">
            ${images
              .map(
                (image) => `
            <section class="single-post__thumbnail square-image-container">
            <div class="square-image-container__wrapper">
              <img
                class="square-image-container__image"
                src="${image.image.url}"
              />
            </div>
            </section>`
              )
              .join(" ")}
          </section>
          <section class="single-post__note-container">
            <textarea id="note" class="single-post__note" type="textbox" placeholder="یادداشت">${
              notes ? (notes[postID] ? notes[postID] : "") : ""
            }</textarea>
            <section class="single-post__note-warning">یادداشت تنها برای شما قابل دیدن است و پس از حذف آگهی، پاک خواهد شد.
            </section>
          </section>
          <a class="single-post__safe-buy iconed-link" href="https://support.divar.ir/b/support-users/fa/kb/articles/article-46">
                <img class="iconed-link__icon" src="${
                  require("./icons/svgs/check-circle-o.svg").default
                }" />
                <span class="iconed-link__text">راهنمای خرید امن</span>
          </a>
          <hr class="single-post__row-separator"/>
          <a class="single-post__report iconed-link" href="https://support.divar.ir/b/support-users/fa/kb/articles/article-46">
                <img class="iconed-link__icon" src="${
                  require("./icons/svgs/info-circle-o.svg").default
                }" />
                <span class="iconed-link__text">ثبت تخلف و مشکل آگهی</span>
          </a>
          <hr class="single-post__row-separator"/>
        </section>
      </article>
      </main>`.concat(container.innerHTML);

      //carousol handler
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

      //bookmark handler
      document.querySelector(".single-post__action-bookmark").onclick =
        function () {
          let bookmarks = JSON.parse(window.localStorage.getItem("bookmarks"));
          let icon = document.querySelector(".single-post__bookmark-icon");
          let bookmarked = false;

          if (bookmarks) {
            for (let i = 0; i < bookmarks.length; i++) {
              if (bookmarks[i].url == url) {
                bookmarked = true;
              }
            }
          }

          if (!icon.classList.contains("bookmarked")) {
            icon.src = require("./icons/svgs/bookmarked.svg").default;
            icon.classList.toggle("bookmarked");
            if (!bookmarked) {
              if (Array.isArray(bookmarks)) {
                bookmarks.push({ title: title, url: url });
              } else {
                bookmarks = [{ title: title, url: url }];
              }
            }
          } else {
            icon.src = require("./icons/svgs/bookmark-o.svg").default;
            icon.classList.toggle("bookmarked");
            if (Array.isArray(bookmarks) && bookmarked) {
              bookmarks = bookmarks.filter((item) => item.url !== url);
            }
          }
          window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        };

      //note handler
      document.querySelector(".single-post__note").onchange = function (event) {
        let notes = JSON.parse(window.localStorage.getItem("notes"));
        let note = document.querySelector(".single-post__note").value;
        if (!notes) {
          notes = {};
        }
        notes[postID] = note;
        window.localStorage.setItem("notes", JSON.stringify(notes));
      };

      //share handler
      document.querySelector(".single-post__action-share").onclick =
        copyHandler(document.querySelector(".single-post__action-share"), url);

      //contact handler
      document.querySelector("#contact-info").onclick = function () {
        console.log("contact");
        fetch(`https://api.divar.ir/v5/posts/${postID}/contact/`, {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9,fa;q=0.8",
            authorization:
              "Basic eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMDkzOTUzOTc2ODgiLCJpc3MiOiJhdXRoIiwidmVyaWZpZWRfdGltZSI6MTY1OTc1NTIwOSwiaWF0IjoxNjU5NzU1MjA5LCJleHAiOjE2NjEwNTEyMDksInVzZXItdHlwZSI6InBlcnNvbmFsIiwidXNlci10eXBlLWZhIjoiXHUwNjdlXHUwNjQ2XHUwNjQ0IFx1MDYzNFx1MDYyZVx1MDYzNVx1MDZjYyIsInNpZCI6IjdhNjFmYTE5LWZiZWQtNDA3MS1iNzk2LWZiMzU5N2M1YjNlYSJ9.arFV4Uc7Yt6V-WrE9Y0IFaqh-rM4iVhxE8NE7Q6E1jA",
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
          credentials: "include",
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            let phone = data.widgets.contact.phone;
            let container = document.querySelector(
              ".single-post__contact-info-container"
            );
            container.innerHTML = `
        <section class="single-post__contact-info">
          <span class="single-post__contact-info-title">شماره موبایل</span>
          <a class="single-post__contact-info-value" herf="tel:${phone}">${phone.replace(
              /\d/g,
              (d) => "۰۱۲۳۴۵۶۷۸۹"[d]
            )}</a>
          <button class="single-post__contact-copy-button button button--icon ">
            <img class="single-post__bookmark-icon" src="${
              require("./icons/svgs/content-copy-o.svg").default
            }"/>
          </button>
        </section>
        <section class="single-post__contact-warning">
          <strong class="single-post__contact-warning-title">
          هشدار پلیس
          </strong>
          <p class="single-post__contact-warning-text">
          لطفاً پیش از انجام معامله و هر نوع پرداخت وجه، از صحت کالا یا خدمات ارائه‌شده، به‌صورت حضوری اطمینان حاصل نمایید.
          </p>
        </section>
        `.concat(container.innerHTML);
            let contactButton = document.querySelector("#contact-info");
            contactButton.disabled = true;
            contactButton.classList.add("button--disabled");
            let copyButton = document.querySelector(
              ".single-post__contact-copy-button"
            );
            copyButton.onclick = copyHandler(copyButton, phone);
            container.classList.remove("height-0");
          });
      };

      //copy handler helper function
      function copyHandler(element, text) {
        return function () {
          navigator.clipboard.writeText(text).then(
            function () {
              element.animate(
                [
                  { transform: "scale(1)" },
                  { transform: "scale(0.5)" },
                  { transform: "scale(1)" },
                ],
                {
                  duration: 400,
                  iterations: 1,
                }
              );
            },
            function () {}
          );
        };
      }
    });
}