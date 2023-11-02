const popups = document.querySelectorAll(".popup");
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
const image = document.querySelector(".popup__image");
const titleText = document.querySelector(".popup__paragraph");
const popupImage = document.querySelector(".popup-image");
const cardCreator = document.querySelector(".popup__author");

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) closePopup(evt.target);
  });
});

popupCloseButtons.forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    closePopup(evt.target.closest(".popup"));
  });
});

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

export function openImagePopup(title, imagePath, cardAuthor) {
  image.src = imagePath;
  image.alt = title;
  cardCreator.textContent = cardAuthor;
  titleText.textContent = title;
  openPopup(popupImage);
}
