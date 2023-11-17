import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const container = document.querySelector(".gallery");

container.insertAdjacentHTML("beforeend", createMarkup(galleryItems));
container.addEventListener("click", onClick);

function createMarkup(arr) {
  return arr
    .map(
      ({ preview, original, description }) => `
   <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
    `
    )
    .join("");
}

function onClick(evt) {
  evt.preventDefault();
  if (evt.target === evt.currentTarget) {
    return;
  }

  const instance = basicLightbox.create(
    `<img src="${evt.target.dataset.source}" alt="${evt.target.alt}" />`,
    {
      onShow: () => {
        document.addEventListener("keydown", onImg);
      },

      onClose: () => {
        document.removeEventListener("keydown", onImg);
      },
    }
  );

  function onImg(evt) {
    if (evt.key === "Escape") {
      instance.close();
    }
  }

  instance.show();
}
