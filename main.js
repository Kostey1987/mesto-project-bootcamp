(()=>{"use strict";var e={};function t(e){e.disabled=!0}function n(e,n){e.checkValidity()?function(e){e.disabled=!1}(n):t(n)}e.p="";var o=document.querySelectorAll(".popup"),r=document.querySelectorAll(".popup__close-button"),c=document.querySelector(".popup__image"),u=document.querySelector(".popup__paragraph");function p(e){"Escape"===e.key&&d(document.querySelector(".popup_opened"))}function a(e){e.classList.add("popup_opened"),document.addEventListener("keydown",p)}function d(e){console.log(e),e.classList.remove("popup_opened"),document.removeEventListener("keydown",p)}o.forEach((function(e){e.addEventListener("mousedown",(function(e){e.target.classList.contains("popup")&&d(e.target)}))})),r.forEach((function(e){e.addEventListener("click",(function(e){d(e.target.closest(".popup"))}))}));var l=document.querySelector(".cards"),i=document.querySelector(".popup-image"),s=document.querySelector("#create-item").content;function m(e){var t=s.querySelector(".card").cloneNode(!0),n=t.querySelector(".card__image");return n.src=e.link,n.alt=e.name,t.querySelector(".card__paragraph").textContent=e.name,t.querySelector(".card__trash").addEventListener("click",(function(){return t.remove()})),t.querySelector(".card__like").addEventListener("click",(function(e){e.target.classList.toggle("card__like_active")})),n.addEventListener("click",(function(){var t,n;t=e.name,n=e.link,c.src=n,c.alt=t,u.textContent=t,a(i)})),t}function _(e){l.prepend(e)}e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p;var f,y=document.querySelector(".profile__add-button"),v=document.querySelector(".popup-card"),S=document.querySelector(".profile__edit-button"),g=document.querySelector(".popup-profile"),k=document.querySelector(".popup__form_card"),q=document.querySelector(".popup__form_profile"),E=document.querySelector(".popup__input_name"),h=document.querySelector(".popup__input_job-title"),L=document.querySelector(".profile__name"),b=document.querySelector(".profile__about"),x=document.querySelector(".popup__input_place"),C=document.querySelector(".popup__input_image"),j=document.getElementById("submitCard"),I=document.getElementById("submitProfile");console.log(v),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){_(m(e))})),S.addEventListener("click",(function(){E.value=L.textContent,h.value=b.textContent,a(g),t(I)})),y.addEventListener("click",(function(){a(v),t(j)})),q.addEventListener("submit",(function(e){e.preventDefault(),L.textContent=E.value,b.textContent=h.value,e.target.reset(),d(g)})),k.addEventListener("submit",(function(e){e.preventDefault(),_(m({name:x.value,link:C.value})),e.target.reset(),d(v)})),f={inputSelector:".popup__input",submitButtonSelector:".popup__submit",formSelector:".popup__form",errorInputClass:"popup__input_error"},document.querySelectorAll(f.formSelector).forEach((function(e){var t=e.querySelector(f.submitButtonSelector),o=e.querySelectorAll(f.inputSelector);n(e,t),o.forEach((function(o){o.addEventListener("input",(function(){n(e,t),function(e,t){e.validity.valid?function(e,t){var n="error-"+e.id,o=document.getElementById(n);e.classList.remove(t),o.textContent=""}(e,t.errorInputClass):function(e,t,n){var o="error-"+e.id,r=document.getElementById(o);e.classList.add(n),r.textContent=t}(e,e.validationMessage,t.errorInputClass)}(o,f)}))}))}))})();