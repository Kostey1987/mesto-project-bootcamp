const popups = document.querySelectorAll(".popup");
const popupCloseButtons = document.querySelectorAll(".popup__close-button");

//функция закрытия попапа по клавише
document.addEventListener("keydown", (evt) => {
  const popupOpened = document.querySelector(".popup_opened");
  if (popupOpened !== null && evt.key == "Escape") {
    closePopup(popupOpened);
  }
});

//функция закрытия попапа по оверлею
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) closePopup(evt.target);
  });
});

//перебор коллекции кнопок закрытия и добавления события (при переборе коллекции в каждой итерации на элемент коллекции вешается событие по клику - вызов функции закрывающей родителя кнопки(родитель -параметр функции))
popupCloseButtons.forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    closePopup(evt.target.closest(".popup"));
  });
});

//функция открывает popup
export function openPopup(popup) {
  popup.classList.add("popup_opened");
}

//функция закрывает popup
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

const popupFullImage = document.querySelector(".popup-image");

//функция выбора полноразмерной картинки в попапе
export function fillPopup(title, imagePath) {
  const image = popupFullImage.querySelector(".popup__image");
  const titleText = popupFullImage.querySelector(".popup__paragraph");
  image.src = imagePath;
  image.alt = title;
  titleText.textContent = title;
}
