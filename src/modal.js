const popups = document.querySelectorAll(".popup");
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
const image = document.querySelector(".popup__image");
const titleText = document.querySelector(".popup__paragraph");

//функция закрытия попапа по клавише
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector(".popup_opened"));
  }
}

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
  document.addEventListener('keydown', closeByEscape);
}

//функция закрывает popup
export function closePopup(popup) {
  console.log(popup);
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEscape);
}

//функция выбора полноразмерной картинки в попапе
export function fillPopup(title, imagePath) {
  image.src = imagePath;
  image.alt = title;
  titleText.textContent = title;
}
