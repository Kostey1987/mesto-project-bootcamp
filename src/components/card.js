import { deleteCard } from "./api.js";
import { setLike } from "./api.js";
import { openImagePopup } from "./modal.js";

const cardSection = document.querySelector(".cards");
const cardTemplate = document.querySelector("#create-item").content;

function handleDeleteCard(item, Id) {
  deleteCard(Id)
    .then(() => {
      item.remove();
    })
    .catch((err) => console.log(err.status, err.mesage));
}

const checkLike = (likes, userId) => {
  return likes.some((item) => item._id === userId);
};

function updateLike(likeElement, counterElement, likeArray, userId) {
  likeElement.classList.toggle(
    "card__like_active",
    checkLike(likeArray, userId)
  );
  counterElement.textContent = likeArray.length;
}

export function createItem(cardParam, userId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardElement.id = cardParam._id;
  cardImage.src = cardParam.link;
  cardImage.alt = cardParam.name;
  const imageName = cardElement.querySelector(".card__paragraph");
  imageName.textContent = cardParam.name;

  const deleteButton = cardElement.querySelector(".card__trash");
  if (userId !== cardParam.owner._id) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () =>
      handleDeleteCard(cardElement, cardParam._id)
    );
  }

  const cardLikeСount = cardElement.querySelector(".card__likeСount");
  const likeButton = cardElement.querySelector(".card__like");

  updateLike(likeButton, cardLikeСount, cardParam.likes, userId);

  likeButton.addEventListener("click", (evt) => {
    setLike(cardParam._id, checkLike(cardParam.likes, userId))
      .then((res) => {
        cardParam.likes = res.likes;
        updateLike(likeButton, cardLikeСount, cardParam.likes, userId);
      })
      .catch((err) => console.log(err.status, err.message));
  });

  cardImage.addEventListener("click", () => {
    openImagePopup(cardParam.name, cardParam.link, cardParam.owner.name);
  });

  return cardElement;
}

export function addCard(element) {
  cardSection.prepend(element);
}
