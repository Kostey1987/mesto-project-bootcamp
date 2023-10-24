import { openPopup } from "./modal.js";
import { fillPopup } from "./modal.js";
import { deleteCard } from "./api.js";
import { setLike } from "./api.js";
import { unsetLike } from "./api.js";
import { getCurrentUserId } from "./utils.js";

const cardSection = document.querySelector(".cards");
const popupImage = document.querySelector(".popup-image");
const cardTemplate = document.querySelector("#create-item").content;

function handleDeleteCard(item, Id) {
  deleteCard(Id)
    .then(() => {
      item.remove();
    })
    .catch((err) => console.log(err.status, err.mesage));
}

const checkLike = (likes, userId) => {
  return likes.some((item) => {
    if (item._id === userId) console.log(item);
    return item._id === userId;
  });
};

function setLikeCount(element, count) {
  element.textContent = count;
}

export function createItem(cardParam) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardElement.id = cardParam._id;
  cardImage.src = cardParam.link;
  cardImage.alt = cardParam.name;
  const imageName = cardElement.querySelector(".card__paragraph");
  imageName.textContent = cardParam.name;

  const deleteButton = cardElement.querySelector(".card__trash");
  if (getCurrentUserId() !== cardParam.owner._id) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () =>
      handleDeleteCard(cardElement, cardParam._id)
    );
  }

  const cardLikeСount = cardElement.querySelector(".card__likeСount");
  cardLikeСount.textContent = cardParam.likes.length;
  let likes = cardParam.likes.length;
  const likeButton = cardElement.querySelector(".card__like");

  if (checkLike(cardParam.likes, getCurrentUserId())) {
    likeButton.classList.add("card__like_active");
  }

  likeButton.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("card__like_active")) {
      unsetLike(cardParam._id)
        .then((res) => {
          evt.target.classList.toggle("card__like_active");
          likes = res.likes.length;
          setLikeCount(cardLikeСount, likes);
        })
        .catch((err) => console.log(err.status, err.message));
    } else {
      setLike(cardParam._id)
        .then((res) => {
          evt.target.classList.toggle("card__like_active");
          likes = res.likes.length;
          setLikeCount(cardLikeСount, likes);
        })
        .catch((err) => console.log(err.status, err.message));
    }
  });

  cardImage.addEventListener("click", () => {
    fillPopup(cardParam.name, cardParam.link);
    openPopup(popupImage);
  });

  return cardElement;
}

export function addCard(element) {
  cardSection.prepend(element);
}
