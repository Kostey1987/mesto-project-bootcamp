const initialCards = [
    {
      name: 'Архыз',
      link: './images/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: './images/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: './images/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: './images/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: './images/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: './images/baikal.jpg'
    }
  ];

const cardSection = document.querySelector('.elements');// элемент в который добавляется карточка
const popupImage = document.querySelector('.popup-image');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const popupFullImage = document.querySelector('.popup-image');
const cardInfo = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup-card');
const profile = document.querySelector('.profile__edit-button');
const popupInfo = document.querySelector('.popup-profile');
const formCard = document.querySelector('.popup__form_card');
const formProfile = document.querySelector('.popup__form_profile');
const formInputName = document.querySelector('.popup__input_name');
const formInputAbout = document.querySelector('.popup__input_job-title');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const formInputPlace = document.querySelector('.popup__input_place');
const formInputImage = document.querySelector('.popup__input_image');


//перебор коллекции кнопок закрытия и добавления события (при переборе коллекции в каждой итерации на элемент коллекции вешается событие по клику - вызов функции закрывающей родителя кнопки(родитель -параметр функции))
popupCloseButtons.forEach( (btn) => {    
    btn.addEventListener('click', (evt) => {
        closePopup(evt.target.closest('.popup'));
    });
});

// шаблон карточки
const cardTemplate = document.querySelector('#create-item').content;

// функция добавления карточки с её функционалом
function createItem(cardName, link) {
    const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true); //копируем нужный элемент
    const cardImage = cardElement.querySelector('.elements__image'); //объявлем перменную содержащую изображение
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
    
    cardImage.addEventListener('click', (evt) => {      
        fillPopup(cardName, link);
        openPopup(popupImage);
    });

    return cardElement; //возвращает эелемент - карточка
}

//функция добавления карточки
function addCard(element) {
    cardSection.append(element);
}

initialCards.forEach((item) =>{
    addCard(createItem(item.name, item.link));
});

//функция открывает popup
function openPopup (popup) {
    popup.classList.add('popup_opened');
}
//функция закрывает popup
function closePopup (popup) {
    popup.classList.remove('popup_opened');
}

//функция выбора полноразмерной картинки
function fillPopup (title, imagePath) {
    const image = popupFullImage.querySelector('.popup__image');
    const titleText = popupFullImage.querySelector('.popup__paragraph');
    image.src = imagePath;
    image.alt = title;
    titleText.textContent = title;
}

profile.addEventListener('click', (evt) => {
    openPopup(popupInfo);
});

cardInfo.addEventListener('click', (evt) => {
    openPopup(popupCard);
});
//функция редактирования профиля
function handleSubmitFormInfo (evt) {
    evt.preventDefault();
    profileName.textContent = formInputName.value;
    profileAbout.textContent = formInputAbout.value;
    evt.target.reset();
}

formProfile.addEventListener('submit', handleSubmitFormInfo);
//функция редактировия карточки
function handleSubmitFormCard (evt) {
    evt.preventDefault();
    addCard(createItem(formInputPlace.value, formInputImage.value ));
    evt.target.reset();
}

formCard.addEventListener('submit', handleSubmitFormCard);





