import { enableValidation } from "./validate.js";
import { openPopup } from "./modal.js";
import { closePopup } from "./modal.js";
import { createItem } from "./card.js";
import { addCard } from "./card.js";
import './pages/index.css';


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

import kusto from "./images/avatar.jpg";
import arkhyz from "./images/arkhyz.jpg";
import chelyabinsk from "./images/chelyabinsk-oblast.jpg";
import ivanovo from "./images/ivanovo.jpg";
import kamchatka from "./images/kamchatka.jpg";
import kholmog from "./images/kholmogorsky-rayon.jpg";
import baikal from "./images/baikal.jpg";
import editBtn from "./images/edit-button/EditButton.svg";
import addBtnProfile from "./images/addbutton/AddButton.svg";
import closePopupBtn from "./images/close-button/CloseIcon.svg";
import logo from "./images/logo.svg";
import likeActive from "./images/group/active.svg";
import like from "./images/group/disable.svg";
import trash from "./images/Trash.svg";
import miniAdd from "./images/addbutton/Vector.svg";



const initialCard = [
  { name: "Архыз", link: arkhyz },
  { name: "Челябинская область", link: chelyabinsk },
  { name: "Иваново", link: ivanovo },
  { name: "Камчатка", link: kamchatka },
  { name: "Холмогорский район", link: kholmog },
  { name: "Байкал", link: baikal },
  { name: "Кусто", link: kusto },
];


const cardInfo = document.querySelector(".profile__add-button");
const popupCard = document.querySelector(".popup-card");
const profile = document.querySelector(".profile__edit-button");
const popupInfo = document.querySelector(".popup-profile");
const formCard = document.querySelector(".popup__form_card");
const formProfile = document.querySelector(".popup__form_profile");
const formInputName = document.querySelector(".popup__input_name");
const formInputAbout = document.querySelector(".popup__input_job-title");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const formInputPlace = document.querySelector(".popup__input_place");
const formInputImage = document.querySelector(".popup__input_image");

initialCards.forEach((item) => {
  addCard(createItem(item));
});

profile.addEventListener("click", () => {
  formInputName.value = profileName.textContent;
  formInputAbout.value = profileAbout.textContent;
  openPopup(popupInfo);
});

cardInfo.addEventListener("click", () => {
  openPopup(popupCard);
});

//функция редактирования профиля
function handleSubmitFormInfo(evt) {
  evt.preventDefault();
  profileName.textContent = formInputName.value;
  profileAbout.textContent = formInputAbout.value;
  evt.target.reset();
  closePopup(popupInfo);
}

formProfile.addEventListener("submit", handleSubmitFormInfo); //слушатель на форме профиля

//функция редактировия карточки
function handleSubmitFormCard(evt) {
  evt.preventDefault();
  const obj = {
    name: formInputPlace.value,
    link: formInputImage.value,
  };
  addCard(createItem(obj));
  evt.target.reset();
  closePopup(popupCard);
}

formCard.addEventListener("submit", handleSubmitFormCard);

const validationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  formSelector: ".popup__form",
  errorInputClass: "popup__input_error",
};

enableValidation(validationSettings);
