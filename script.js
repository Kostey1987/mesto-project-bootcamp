const initialCards = [
    {
      name: "Архыз",
      link: "./images/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "./images/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "./images/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "./images/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "./images/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "./images/baikal.jpg",
    },
  ];
  
  const cardSection = document.querySelector(".cards");
  const popupImage = document.querySelector(".popup-image");
  const popups = document.querySelectorAll(".popup");
  const popupCloseButtons = document.querySelectorAll(".popup__close-button");
  const popupFullImage = document.querySelector(".popup-image");
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
  const formInputImage = document.querySelector('.popup__input_image');

  //функция закрытия попапа по клавише
  document.addEventListener('keydown', evt => {
    const popupOpened = document.querySelector('.popup_opened');
    if (popupOpened !== null && evt.key == 'Escape') {
      closePopup(popupOpened);
    }
  });

  //функция закрытия попапа по оверлею
  popups.forEach(popup => {
     popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) closePopup(evt.target);
    });
  });


  //перебор коллекции кнопок закрытия и добавления события (при переборе коллекции в каждой итерации на элемент коллекции вешается событие по клику - вызов функции закрывающей родителя кнопки(родитель -параметр функции))
  popupCloseButtons.forEach((btn) => {
    btn.addEventListener("click", (evt) => {      
      closePopup(evt.target.closest(".popup"));
    });
  });
  
  // шаблон карточки
  const cardTemplate = document.querySelector("#create-item").content;
  
  // функция добавления карточки с её функционалом
  function createItem(cardParam) {
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
  function addCard(element) {
    cardSection.prepend(element);
  }

  initialCards.forEach((item) => {
   addCard(createItem(item));
  });
  
  //функция открывает popup
  function openPopup(popup) {
    popup.classList.add("popup_opened");
  }

  //функция закрывает popup
  function closePopup(popup) {
    popup.classList.remove("popup_opened");
  }
  
  //функция выбора полноразмерной картинки
  function fillPopup(title, imagePath) {
    const image = popupFullImage.querySelector(".popup__image");
    const titleText = popupFullImage.querySelector(".popup__paragraph");
    image.src = imagePath;
    image.alt = title;
    titleText.textContent = title;
  }
  
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
    // evt.target.querySelector('.popup__submit');    
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
      link: formInputImage.value
    }
    addCard(createItem(obj));
    evt.target.reset();
    closePopup(popupCard);
  }
  
  formCard.addEventListener("submit", handleSubmitFormCard);

  //валидация форм

  //функция активирует кнопку сабмит
  function enableSubmit(button) {
    button.disabled = false;
  }
//функция деактивирует кнопку сабмит
    function desableSubmit(button) {
    button.disabled = true;
  }
  
  //функция показывает ошибку в поле ввода
  function showError(inputField, errorMesage, errorInputClass) {
    const spanId = 'error-' + inputField.id;
    const errorElement = document.getElementById(spanId);
    inputField.classList.add(errorInputClass);
    errorElement.textContent = errorMesage;
    
  }

  //функция прячет ошибку в поле ввода
  function hideError(inputField, errorInputClass) {
    const spanId = 'error-' + inputField.id;
    const errorElement = document.getElementById(spanId);
    inputField.classList.remove(errorInputClass);
    errorElement.textContent = '';
  }

  //фунцкия валидации формы
  function validateForm(inputField, settings) {
    if (inputField.validity.valid) {
      hideError(inputField, settings.errorInputClass);
    } else {
      showError(inputField, inputField.validationMessage, settings.errorInputClass);
    }
  }

  function checkForm(form, button) {
    if (form.checkValidity()){
      enableSubmit(button);
    } else {
     desableSubmit(button);
    }
  }

  const validationSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  formSelector: '.popup__form',
  errorInputClass: 'popup__input_error',
  }

  function enableValidation(settings) {
  const forms = document.querySelectorAll(settings.formSelector);
  forms.forEach(form => {
    const submitButton = form.querySelector(settings.submitButtonSelector);
    const inputFields = form.querySelectorAll(settings.inputSelector);
    checkForm(form, submitButton);
    inputFields.forEach(item => {
    item.addEventListener('input', ()=> {
      checkForm(form, submitButton);
      validateForm(item, settings);
       });
    });
  });
  
  }

  enableValidation(validationSettings);
 



  


