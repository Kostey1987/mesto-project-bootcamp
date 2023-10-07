// const likebutton = document.querySelector('.elements__group');

// likebutton.addEventListener('click', (evt) => {
//     evt.target.classList.toggle('elements__group_active');
// });

// console.log(document.querySelector('#create-item'));

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

// шаблон карточки
const cardTemplate = document.querySelector('#create-item').content;

// функция добавления карточки с её функционалом
function createItem(cardName, link) {
    const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
    const cardImage = cardElement.querySelector('.elements__image');
    cardImage.src = link;
    cardImage.alt = cardName;
    const imageName =cardElement.querySelector('.elements__paragraph');
    imageName.textContent = cardName;

    const deleteButton = cardElement.querySelector('.elements__trash');
    deleteButton.addEventListener('click', (evt) => {
        cardElement.remove();
    });

    const likeButton = cardElement.querySelector('.elements__group');
    likeButton.addEventListener('click', (evt) => {
        evt.target.classList.toggle('elements__group_active');
    });
    
    document.querySelector('.elements').append(cardElement);
}

createItem('jygfj', "./images/arkhyz.jpg");
createItem('jygfj', "./images/arkhyz.jpg");
createItem('jygfj', "./images/arkhyz.jpg");
createItem('jygfj', "./images/arkhyz.jpg");
createItem('jygfj', "./images/arkhyz.jpg");



