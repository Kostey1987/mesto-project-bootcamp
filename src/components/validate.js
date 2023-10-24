export function enableSubmit(button) {
  button.disabled = false;
}

export function desableSubmit(button) {
  button.disabled = true;
}

function showError(inputField, errorMesage, errorInputClass) {
  const spanId = "error-" + inputField.id;
  const errorElement = document.getElementById(spanId);
  inputField.classList.add(errorInputClass);
  errorElement.textContent = errorMesage;
}

function hideError(inputField, errorInputClass) {
  const spanId = "error-" + inputField.id;
  const errorElement = document.getElementById(spanId);
  inputField.classList.remove(errorInputClass);
  errorElement.textContent = "";
}

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

export function checkForm(form, button) {
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
