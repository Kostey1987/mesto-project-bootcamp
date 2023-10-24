import { enableValidation } from "./validate.js";
import { openPopup } from "./modal.js";
import { closePopup } from "./modal.js";
import { createItem } from "./card.js";
import { addCard } from "./card.js";
import { desableSubmit } from "./validate.js";
import { getCards } from "./api.js";
import { saveCard } from "./api.js";
import { saveInfo } from "./api.js";
import { getInfo } from "./api.js";
import { changeAvatar } from "./api.js";
import { getAvatar } from "./api.js";
import { setCurrentUserId } from "./utils.js";
import "./pages/index.css";

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
import avatarBtn from "./images/avatarbutton/avatarButton.svg";

const initialCard = [
  { name: "Архыз", link: arkhyz },
  { name: "Челябинская область", link: chelyabinsk },
  { name: "Иваново", link: ivanovo },
  { name: "Камчатка", link: kamchatka },
  { name: "Холмогорский район", link: kholmog },
  { name: "Байкал", link: baikal },
];

const validationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  formSelector: ".popup__form",
  errorInputClass: "popup__input_error",
};

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
const submitButtonCard = document.getElementById("submitCard");
const submitButtonProfile = document.getElementById("submitProfile");
const submitAvatar = document.getElementById("submitAvatar");
const formAvatar = document.querySelector(".popup-avatar");
const profileAvatar = document.querySelector(".profile__avatar");
const avatarButton = document.querySelector(".profile__avatar-button");
const formInputAvatar = document.querySelector(".popup__input_avatar");

Promise.all([getInfo(), getCards()])
  .then(([info, cards]) => {
    setCurrentUserId(info._id);
    changeInfo(info);
    avatar(info);
    cards.reverse().forEach((item) => {
      addCard(createItem(item));
    });
  })
  .catch((err) => {
    console.log(err);
  });

avatarButton.addEventListener("click", () => {
  openPopup(formAvatar);
});

const avatar = (avatarLink) => {
  profileAvatar.src = avatarLink.avatar;
};

function handleSubmitFormAvatar(evt) {
  evt.preventDefault();
  submitAvatar.textContent = "Сохранение...";
  changeAvatar(formInputAvatar.value)
    .then((res) => {
      avatar(res);
      evt.target.reset();
      desableSubmit(submitAvatar);
      closePopup(formAvatar);
    })
    .catch((err) => console.log(err.status, err.mesage))
    .finally(() => {
      submitAvatar.textContent = "Сохранить";
    });
}

formAvatar.addEventListener("submit", handleSubmitFormAvatar);

profile.addEventListener("click", () => {
  formInputName.value = profileName.textContent;
  formInputAbout.value = profileAbout.textContent;
  openPopup(popupInfo);
  desableSubmit(submitButtonProfile);
});

cardInfo.addEventListener("click", () => {
  openPopup(popupCard);
  desableSubmit(submitButtonCard);
});

const changeInfo = (profileInfo) => {
  profileName.textContent = profileInfo.name;
  profileAbout.textContent = profileInfo.about;
};

function handleSubmitFormInfo(evt) {
  evt.preventDefault();
  submitButtonProfile.textContent = "Сохранение...";
  saveInfo(formInputName.value, formInputAbout.value)
    .then((res) => {
      changeInfo(res);
      closePopup(popupInfo);
    })
    .catch((err) => console.log(err.status, err.mesage))
    .finally(() => {
      submitButtonProfile.textContent = "Сохранить";
    });
}

formProfile.addEventListener("submit", handleSubmitFormInfo); //слушатель на форме профиля

function handleSubmitFormCard(evt) {
  evt.preventDefault();
  submitButtonCard.textContent = "Сохранение...";
  saveCard(formInputPlace.value, formInputImage.value)
    .then((res) => {
      addCard(createItem(res));
      evt.target.reset();
      closePopup(popupCard);
    })
    .catch((err) => console.log(err.status, err.mesage))
    .finally(() => {
      submitButtonCard.textContent = "Создать";
    });
}

formCard.addEventListener("submit", handleSubmitFormCard);

enableValidation(validationSettings);
