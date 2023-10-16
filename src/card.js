import { openPopup } from "./modal.js";
import { fillPopup } from "./modal.js";
const cardSection = document.querySelector(".cards");
const popupImage = document.querySelector(".popup-image");

// шаблон карточки
const cardTemplate = document.querySelector("#create-item").content;

// функция добавления карточки с её функционалом
export function createItem(cardParam) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true); //копируем нужный элемент
  const cardImage = cardElement.querySelector(".card__image"); //объявлем перменную содержащую изображение
  cardImage.src = cardParam.link;
  cardImage.alt = cardParam.name;
  const imageName = cardElement.querySelector(".card__paragraph");
  imageName.textContent = cardParam.name;

  const deleteButton = cardElement.querySelector(".card__trash");
  deleteButton.addEventListener("click", () => cardElement.remove());

  const likeButton = cardElement.querySelector(".card__like");
  likeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like_active");
  });

  cardImage.addEventListener("click", () => {
    fillPopup(cardParam.name, cardParam.link);
    openPopup(popupImage);
  });

  return cardElement; //возвращает эелемент - карточка
}

//функция добавления карточки
export function addCard(element) {
  cardSection.prepend(element);
}
