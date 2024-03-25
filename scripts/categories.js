"use strict";

document.addEventListener("DOMContentLoaded", () => {
  let options = {
    rootMargin: "0px",
    threshold: 0.5,
  };

  let appearance = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        // entry.target.style.paddingTop = 0;
      }
    });
  };

  const observer = new IntersectionObserver(appearance, options);
  const targets = document.querySelectorAll(".changes__item_js");

  targets.forEach((item) => {
    observer.observe(item);
  });

  //hide menu on scroll

  // const { log } = require("async");

  // function hideUnhideMenuOnScroll() {
  //   // const serviceCenter = document.querySelector('.service-center');
  //   let scrollPosition = document.documentElement.scrollTop;
  //   let header = document.querySelector('.header');

  // window.onscroll = function() {
  //   let currentScrollPosition = document.documentElement.scrollTop;

  //   if (scrollPosition < currentScrollPosition ) {
  //       header.classList.add('header__hide_js');
  //   } else {
  //     header.classList.remove('header__hide_js');
  //   }
  //   scrollPosition = currentScrollPosition;
  //   }
  // }

  // hideUnhideMenuOnScroll();

  let lastScroll = 0;
  const defaultOffset = 200;
  const header = document.querySelector(".header");

  const scrollPosition = () =>
    window.pageYOffset || document.documentElement.scrollTop;
  const containHideHeader = () => header.classList.contains("hide-header");

  window.addEventListener("scroll", () => {
    if (scrollPosition() < lastScroll && !containHideHeader()) {
      //scroll down
      header.classList.add("hide-header");
    } else if (scrollPosition() > lastScroll || scrollPosition() == 0) {
      //scroll up
      header.classList.remove("hide-header");
    }

    lastScroll = scrollPosition();
  });

  class ValidationForm {
    constructor(form) {
      this.form = form;
      this.inputWrappers = this.form.querySelectorAll("div");
      this.button = this.form.querySelector("button");
      this.inputs = this.form.querySelectorAll(".__js__input");
      this.modalThanks = document.querySelector(".modal-thanks__overlay");
      this.modalCloseButton = document.querySelector(".modal-thanks__close");
      this.inputs.forEach((element) => {
        if (element.name == "name") {
          this.name = element;
        } else if (element.name == "tel") {
          this.tel = element;
        } else if (element.name == "email") {
          this.email = element;
        } else if (element.name == "message") {
          this.message = element;
        }
      });
    }

    initForm() {
      const phoneOptions = {
        mask: "+{7} (000) 000-00-00",
      };

      new IMask(this.tel, phoneOptions);

      this.inputWrappers.forEach((wrapper) => {
        const input = wrapper.querySelector("input");
        const errText = wrapper.querySelector("p");
        input.addEventListener("input", (event) =>
          this.handleInputChanges(event, input, errText)
        );
        input.addEventListener("blur", (event) =>
          this.handleInputBlur(event, input, errText)
        );
      });

      this.button.addEventListener("click", (event) => {
        event.preventDefault();
        let isValid = this.form.checkValidity();
        if (isValid) {
          this.sendForm(event);
        }
      });
    }

    setBtnDisabled() {
      this.button.disabled = true;
      this.button.classList.add("_disabled");
    }

    setBtnActive() {
      this.button.disabled = false;
      this.button.classList.remove("_disabled");
    }

    handleInputChanges = (event, input, errText) => {
      this.form.checkValidity() ? this.setBtnActive() : this.setBtnDisabled();

      if (input.validity.valid && errText.classList.contains("_unhide")) {
        errText.classList.remove("_unhide");
      }
    };

    handleInputBlur = (event, input, errText) => {
      if (!input.validity.valid) {
        errText.classList.add("_unhide");
      }
    };

    sendForm(event) {
      let formData = new FormData(this.form);

      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: formData,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => {
          res.json();
          this.showModal();
          this.form.reset();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    hideModal() {
      this.modalThanks.addEventListener("click", (e) => {
        if (
          e.target === e.currentTarget ||
          e.target.classList.contains("modal-thanks__close")
        ) {
          this.modalThanks.classList.remove("modal-thanks__overlay_active");
        }
      });
    }

    showModal() {
      this.modalThanks.classList.add("modal-thanks__overlay_active");
      this.hideModal();
    }
  }

  new ValidationForm(document.querySelector(".contacts__form")).initForm();
});

//Скролл к контактам
document.querySelectorAll(".scrollButton").forEach((e) => {
  e.addEventListener("click", () => {
    document.getElementById("contacts").scrollIntoView({
      behavior: "smooth",
    });
  });
});
