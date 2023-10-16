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
  const spanId = "error-" + inputField.id;
  const errorElement = document.getElementById(spanId);
  inputField.classList.add(errorInputClass);
  errorElement.textContent = errorMesage;
}

//функция прячет ошибку в поле ввода
function hideError(inputField, errorInputClass) {
  const spanId = "error-" + inputField.id;
  const errorElement = document.getElementById(spanId);
  inputField.classList.remove(errorInputClass);
  errorElement.textContent = "";
}

//фунцкия валидации формы
function validateForm(inputField, settings) {
  if (inputField.validity.valid) {
    hideError(inputField, settings.errorInputClass);
  } else {
    showError(
      inputField,
      inputField.validationMessage,
      settings.errorInputClass
    );
  }
}

function checkForm(form, button) {
  if (form.checkValidity()) {
    enableSubmit(button);
  } else {
    desableSubmit(button);
  }
}

export function enableValidation(settings) {
  const forms = document.querySelectorAll(settings.formSelector);
  forms.forEach((form) => {
    const submitButton = form.querySelector(settings.submitButtonSelector);
    const inputFields = form.querySelectorAll(settings.inputSelector);
    checkForm(form, submitButton);
    inputFields.forEach((item) => {
      item.addEventListener("input", () => {
        checkForm(form, submitButton);
        validateForm(item, settings);
      });
    });
  });
}
