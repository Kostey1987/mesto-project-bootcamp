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
  const submitButton = document.querySelector('.popup__submit');
  const inputFields = document.querySelectorAll('.popup__input');//валидация

  //функция закрытия по клавише
  document.addEventListener('keydown', evt => {
    const popupOpened = document.querySelector('.popup_opened');
    if (popupOpened !== null && evt.key == 'Escape') {
      closePopup(popupOpened);
    }
  });



  // убер закрывалка
  // document.querySelectorAll('.popup__container').forEach(e => {
  //   e.addEventListener('click', e => {
  //     e.stopPropagation();
  //   })
  // })
  // popups.forEach(e => {
  //   console.log(e)
  //   e.addEventListener('click', ee => {      
  //     const popupOpened = document.querySelector('.popup_opened');
  //     if (popupOpened !== null ) {
  //       closePopup(popupOpened);
  //     }
  //   })
  // })

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

    //функция активирует кнопку сабмит
  function enableSubmit(button) {
    button.classList.remove('popup__submit_desable');
    button.disabled = false;
  }
  //функция деактивирует кнопку сабмит
  function desableSubmit(button) {
    button.classList.add('popup__submit_desable');
    button.disabled = true;
  }


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
    addCard(createItem(formInputPlace.value, formInputImage.value));
    evt.target.reset();
    closePopup(popupCard);
  }
  
  formCard.addEventListener("submit", handleSubmitFormCard);

  //валидация форм
  
  //функция показывает ошибку в поле ввода
  function showError(inputField, errorMesage) {
    const spanId = 'error-' + inputField.id;
    const errorElement = document.getElementById(spanId);
    errorElement.textContent = inputField.validationMessage;
  }

  //функция прячет ошибку в поле ввода
  function hideError(inputField) {
    const spanId = 'error-' + inputField.id;
    const errorElement = document.getElementById(spanId);
    errorElement.textContent = '';
  }

  //фунцкия валидации формы
  function validateForm(inputField) {
    
    // let result = false;

    if (inputField.validity.valid) {
      hideError(inputField);
    } else {
      showError(inputField, inputField.validationMessage);
    }

    // result = inputField.validity.valid;

    // return result;
  }


  //перебор полей ввода
  inputFields.forEach(item => {
    const form = item.closest('.popup__form');
    const button = form.querySelector('.popup__submit');

  item.addEventListener('input', ()=> {
    checkForm(form, button);
    validateForm(item);
     })
  });


  function checkForm(form, button) {
    if (form.checkValidity()){
      enableSubmit(button);
    } else {
     desableSubmit(button);
    }
  }



  


