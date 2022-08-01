const overlay = document.querySelector(".overlay");
const root = document.querySelector("#root");
const megamenuWrapper = document.querySelector(".megamenu-wrapper");
const megamenu = document.querySelector(".megamenu");
megamenuWrapper.addEventListener("click", () => {
  megamenu.classList.toggle("megamenu__visible");
  overlay.classList.toggle("overlay__active");
});
root.addEventListener(
  "click",
  (e) => {
    if (!e.target.classList.contains(".megamenu")) {
      megamenu.classList.remove("megamenu__visible");
      overlay.classList.remove("overlay__active");
    }
  },
  true
);
