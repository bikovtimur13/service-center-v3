// console.log(title.innerHTML);

document.addEventListener('DOMContentLoaded', () => {
    const SELECTED_CITY = document.querySelector('.header__selected-city');
    const SELECTED_CITY_MOB = document.querySelector('.header__selected-city-mob');

    let currentCity = SELECTED_CITY.textContent;
    const CITY_LIST = document.querySelector('.header__city-suggest');
    const CITY_BLOCK = document.querySelector('.header__city-choice');
    let wrapper = document.querySelector('.header__wrapper');
    let header = document.querySelector('.header');
    let cityTitle = document.querySelector('.service-center__city-choice__title');
    let cityHeader = document.querySelector('.service-center__city-choice__header');
    let contactsBtn = document.querySelector('.contacts__button');
    let serviceBtn = document.querySelector('.application-form__button');
    let thanksModal = document.querySelector('.modal-thanks');
    let closeModalBtn = document.querySelector('.modal-thanks__close');
    let body = document.body;
    const IS_MOBILE = window.matchMedia('(max-width: 767px)').matches;

    class CityList{
        listCities
        cityItem
        arrCitiesElements = []
        constructor(
            listSelector,
            itemSelector,
            arrCities,
            handlerClickItemCity,
            selectedCity
        ){
            this.listSelector = listSelector;
            this.itemSelector = itemSelector;
            this.arrCities = arrCities;
            this.handlerClickItemCity = handlerClickItemCity;
            this.selectedCity = selectedCity;
            this.overlay = document.createElement('div')
        }

        createList() {
            this.listCities = document.createElement('ul');
            this.listCities.classList.add(this.listSelector);
            this.arrCities.forEach(item => {
                this.createItemCity(item);
                this.listCities.appendChild(this.cityItem);
            })
            this.listCities.classList.add('hide');
        }

        createItemCity(city) {
            this.cityItem = document.createElement('li');
            this.cityItem.classList.add(this.itemSelector);
            this.cityItem.append(city);
            this.cityItem.dataset.city = city;
            this.arrCitiesElements.push(this.cityItem);
            this.cityItem.addEventListener('click', (e) => this.handlerClickItem(e.target));
        }

        getItemCity(){
            return this.cityItem;
        }

        getListCities() {
            return this.listCities;
        }

        handlerClickItem(element){
            this.handlerClickItemCity(element);
            this.closeCityList();
        }

        handlerClickOverlay(element){
            debugger
            if(!element.classList.contains(this.itemSelector) && !this.selectedCity) this.closeCityList();
        }

        displayCityList(){
            this.listCities.classList.remove('hide');
            this.listCities.classList.add('show');
            document.addEventListener('click', (e) => this.handlerClickOverlay(e.target))
        }
        
        closeCityList(){
            this.listCities.classList.remove('show');
            this.listCities.classList.add('hide');
            document.removeEventListener('click', this.handlerClickOverlay)
        }
    }
    
    function handlerClickItem(elementCity){
        SELECTED_CITY.textContent = elementCity.dataset.city;
        localStorage.setItem('city', elementCity.dataset.city);
    }

    // function handleClickOverLay(event) {
    //     if (event.target.classList.contains('header__list-item') || event.target === SELECTED_CITY) return;
    //     closeCityList();
    // }

    const CITY_ARR = [
        'Аксай',
        'Анапа',
        'Ангарск',
        'Армавир',
        'Архангельск',
        'Астрахань',
        'Барнаул',
        'Белгород',
        'Владивосток',
        'Геленджик',
        'Дзержинск',
        'Евпатория',
        'Иваново',
        'Йошкар-Ола',
        'Казань',
        'Липецк',
        'Москва',
        'Набережные Челны',
        'Одесса',
        'Пенза',
        'Ростов-на-Дону',
        'Санкт-Петербург',
        'Таганрог'
    ]; 

    const MODAL_CITY_LIST = new CityList(
        'list-cities',
        'list-cities__item',
        CITY_ARR,
        handlerClickItem,
        SELECTED_CITY,
    );

    MODAL_CITY_LIST.createList();

    // TODO: добавить клик на оверлэй
    SELECTED_CITY.addEventListener('click', () => MODAL_CITY_LIST.displayCityList());
    
    if (localStorage['city']) SELECTED_CITY.textContent = localStorage.getItem('city');

    CITY_BLOCK.appendChild(MODAL_CITY_LIST.getListCities());



    // const mobCities = document.querySelector('.js-cities__mob');
    const mobCities = document.querySelector('.modal-cities');
    let mobCityList = document.querySelector('.js-cities__list');

    //city choice

    function openCityList(element) {
        element.classList.add('_active');
        CITY_LIST.classList.add('_city-list_active');
        document.addEventListener('click', handleClickOverLay);
    }

    function closeCityList(element) {
        element.classList.remove('_active');
        CITY_LIST.classList.remove('_city-list_active');
        document.removeEventListener('click', handleClickOverLay);
    }


    //'#' + 181818
    function openMobCity() {
        mobCities.classList.add('show');
        let cityList = document.querySelector('.service-center__city-list-mobile');
        cityList.style.opacity = 1;
        cityList.style.visibility = 'visible';
        cityList.style.height = 100 + '%';
        body.style.overflow = 'hidden';
    }

    const appendCityList = () => {
        let list = CITY_LIST.cloneNode(true);
        mobCityList.after(list);
    };

    try {
        appendCityList();
    } catch (e) {
        console.log(e);
    }


    function closeMobCity() {
        document.querySelector('.js-cities__close').addEventListener('click', () => {
            mobCities.classList.remove('show');
            CITY_LIST.style.opacity = 0;
            CITY_LIST.style.visibility = 'hidden';
            body.style.overflow = 'visible';
        })
    }

    function chooseMobCity() {
        document.querySelectorAll('.header__list-item').forEach(e => {
            const city = e;
            city.addEventListener('click', () => {
                SELECTED_CITY.textContent = city.dataset.city;
                currentCity = city.dataset.city;
                localStorage.setItem('city', city.dataset.city);
                mobCities.classList.remove('show');
                CITY_LIST.style.opacity = 0;
                CITY_LIST.style.visibility = 'hidden';
            })
        })
    }

    function checkWindowWidth(element) {

        if (IS_MOBILE) {
            openMobCity();
            closeMobCity();
            chooseMobCity();

        } else {
            element.classList.contains('_active') 
                ? closeCityList(element) 
                : openCityList(element);
            chooseCity();
        }
    }

    // SELECTED_CITY.addEventListener('click', (e) => checkWindowWidth(e.target));

    // Start refactor

    function chooseCity() {
        // document.querySelectorAll('.header__list-item').forEach(e => {
        //     const city = e;
        //     city.addEventListener('click', () => {
        //         currentCity = city.dataset.city;
        //         SELECTED_CITY.textContent = city.dataset.city;
        //         localStorage.setItem('city', city.dataset.city);
        //         SELECTED_CITY.classList.remove('_active');
        //         CITY_LIST.classList.remove('_city-list_active');

        //     })
        // })
    }


    const QUESTIONS = document.querySelectorAll('.faq__question');
    
    QUESTIONS.forEach(item => {
        item.addEventListener('click', () => {
            const arrow = item;
            const content = item.nextElementSibling;

            if (content.style.maxHeight) {
                document.querySelectorAll('.faq__text').forEach(item => {
                    item.style.maxHeight = null;
                    item.style.opacity = null;
                })
                document.querySelectorAll('.faq__question').forEach(item => {
                    item.classList.remove('_active', 'faq__question-arrow-rotate');
                })
            } else {
                document.querySelectorAll('.faq__text').forEach(item => {
                    item.style.maxHeight = null;
                    item.style.opacity = null;
                })
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = 1;

                document.querySelectorAll('.faq__question').forEach(item => {
                    item.classList.remove('_active','faq__question-arrow-rotate');
                })
                arrow.classList.add('_active' , 'faq__question-arrow-rotate');
            }
        })
    })

    const QUESTIONS_BOTTOM = document.querySelectorAll('.faq-bottom__question');
    
    QUESTIONS_BOTTOM.forEach(item => {
        item.addEventListener('click', () => {
            const arrow = item;
            const content = item.nextElementSibling;

            if (content.style.maxHeight) {
                document.querySelectorAll('.faq-bottom__text').forEach(item => {
                    item.style.maxHeight = null;
                    item.style.opacity = null;
                })
                document.querySelectorAll('.faq-bottom__question').forEach(item => {
                    item.classList.remove('_active', 'faq-bottom__question-arrow-rotate');
                })
            } else {
                document.querySelectorAll('.faq-bottom__text').forEach(item => {
                    item.style.maxHeight = null;
                    item.style.opacity = null;
                })
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = 1;

                document.querySelectorAll('.faq-bottom__question').forEach(item => {
                    item.classList.remove('_active','faq-bottom__question-arrow-rotate');
                })
                arrow.classList.add('_active' , 'faq-bottom__question-arrow-rotate');
            }
        })
    })


    //header
    let lastScroll = 0;
    let defaultOffset = 980;


    const nmd = window.matchMedia('(max-width: 1023px)')

    if (nmd.matches) {
        defaultOffset = 600;
    }

    const nsm = window.matchMedia('(max-width: 767px)')

    if (nsm.matches) {
        defaultOffset = 900;
    }

    const nxs = window.matchMedia('(max-width: 767px)')

    if (nxs.matches) {
        defaultOffset = 780;
    }

    const nxxs = window.matchMedia('(max-width: 767px)')

    if (nxxs.matches) {
        defaultOffset = 600;
    }


    const headerFixed = document.querySelector('.header-fixed');


    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
    const containHideHeader = () => headerFixed.classList.contains('hide-header');
    const containHideHeaderRemove = () => headerFixed.classList.remove('hide-header');


    // const jsMenu = document.querySelector(".js-menu__mob")


    window.addEventListener('scroll', headerVisibility)


    function headerVisibility() {
        // const jsMenu = document.querySelector(".js-menu__mob")
        // const active = jsMenu.querySelector('.js-menu__mob_active')


        if (scrollPosition() < lastScroll && !containHideHeader()) {
            //scroll down
            // console.log(jsMenu);


            headerFixed.classList.add('hide-header');
        } else if (scrollPosition() < defaultOffset && scrollPosition() > lastScroll) {
            headerFixed.classList.add('hide-header');
        } else if (scrollPosition() > defaultOffset && scrollPosition() > lastScroll || scrollPosition() == 0) {
            //scroll up
            headerFixed.classList.remove('hide-header');
        }

        lastScroll = scrollPosition();

    }


    function openMobileMenu() {
        const HEADER = document.querySelector('.header')
        const MENU_LIST = document.querySelector('.header__menu');
        const OPEN_ICON = document.querySelector('.header__icon-mob_open');
        const CLOSE_ICON = document.querySelector('.header__icon-mob_close');

        let openBtnFixed = document.querySelector('.header-fixed__menu-burger');
        let closeBtnFixed = document.querySelector('.js-menu-fixed__close');
        let menuItems = document.querySelectorAll('.js-menu__mob-item');

        OPEN_ICON.addEventListener('click', () => {
            MENU_LIST.classList.add('header__menu_show');
            OPEN_ICON.classList.add('hide');
            CLOSE_ICON.classList.remove('hide');
            HEADER.classList.add('header_green-bg')
            window.removeEventListener('scroll', headerVisibility);
        });

        CLOSE_ICON.addEventListener('click', () => {
            MENU_LIST.classList.remove('header__menu_show');
            CLOSE_ICON.classList.add('hide');
            OPEN_ICON.classList.remove('hide');
            HEADER.classList.remove('header_green-bg')
            window.addEventListener('scroll', headerVisibility);
        });

        openBtnFixed.addEventListener('click', () => {
            MENU_LIST.classList.add('js-menu__mob_active');
            containHideHeaderRemove();
            window.removeEventListener('scroll', headerVisibility);
            // openBtnFixed.classList.add('hide-burger-fixed');
            // closeBtnFixed.classList.add("hide-close-fixed");
        });

        closeBtnFixed.addEventListener('click', () => {
            MENU_LIST.classList.remove('js-menu__mob_active');
            window.addEventListener('scroll', headerVisibility);
            openBtnFixed.classList.remove('hide-burger-fixed');
            closeBtnFixed.classList.remove("hide-close-fixed");
        });

        menuItems.forEach(item => {

            item.addEventListener('click', () => {
                MENU_LIST.classList.remove('js-menu__mob_active');
                // window.addEventListener('scroll', headerVisibility);
            })
        })
    }

    openMobileMenu();


    // //menu scroll effects
    //     let headerBlockHeight = +window.getComputedStyle(header, null).height.replace('px', '');

    //     window.addEventListener('scroll', () => {
    //       getStickyHeader(header, headerBlockHeight);
    //     })

    //     function getStickyHeader(elem, triggerHeight) {
    //       if (window.scrollY = triggerHeight) {
    //         elem.classList.add('header__sticky_js');

    //       } else {
    //         elem.classList.remove('header__sticky_js');

    //       }
    //     }

    //   //hide menu on scroll

    //   function hideUnhideMenuOnScroll() {
    //     const serviceCenter = document.querySelector('.service-center');
    //     let scrollPosition = document.documentElement.scrollTop;


    //     window.onscroll = function() {
    //       let currentScrollPosition = document.documentElement.scrollTop;

    //       if (scrollPosition < currentScrollPosition && scrollPosition > serviceCenter.clientHeight) {
    //           header.classList.add('header__hide_js');
    //           wrapper.classList.remove('header__black-bgc_js');
    //       } else if(currentScrollPosition <= 0) {
    //         wrapper.classList.remove('header__black-bgc_js');
    //       } else {
    //         header.classList.remove('header__hide_js');
    //         wrapper.classList.add('header__black-bgc_js');
    //       }
    //       scrollPosition = currentScrollPosition;
    //       }
    //     }

    //     hideUnhideMenuOnScroll();



    class ValidationForm {
        constructor(
            formSelector,
            telSelector,
            ) {
            this.form = document.querySelector(`.${formSelector}`);
            this.phone = this.form.querySelector(`.${telSelector}`);
            this.inputWrappers = this.form.querySelectorAll('div');
            this.button = this.form.querySelector('button');
            this.inputs = this.form.querySelectorAll('.__js__input');
            this.modalThanks = document.querySelector('.modal-thanks__overlay');
            this.modalCloseButton = document.querySelector('.modal-thanks__close');
            this.inputs.forEach(element => {
                if (element.name == 'name') {
                    this.name = element
                } else if (element.name == 'tel') {
                    this.tel = element
                } else if (element.name == 'email') {
                    this.email = element
                } else if (element.name == 'message') {
                    this.message = element
                }
            })
        }

        initForm() {

            const phoneOptions = {
                mask: '+{7} (000) 000-00-00',
            };
            debugger
            new IMask(this.phone, phoneOptions);

            this.inputWrappers.forEach(wrapper => {
                const input = wrapper.querySelector('input');
                const errText = wrapper.querySelector('p');
                input.addEventListener('input', (event) => this.handleInputChanges(event, input, errText));
                input.addEventListener('blur', (event) => this.handleInputBlur(event, input, errText));
            })

            this.button.addEventListener('click', (event) => {
                event.preventDefault();
                let isValid = this.form.checkValidity()
                if (isValid) {
                    this.sendForm(event);
                }
            })
        }

        setBtnDisabled() {
            this.button.disabled = true;
            this.button.classList.add('_disabled');
        }

        setBtnActive() {
            this.button.disabled = false;
            this.button.classList.remove('_disabled');
        }

        handleInputChanges = (event, input, errText) => {
            (this.form.checkValidity()) ? this.setBtnActive() : this.setBtnDisabled();

            if (input.validity.valid && errText.classList.contains('_unhide')) {
                errText.classList.remove('_unhide');
            }

        }

        handleInputBlur = (event, input, errText) => {
            if (!input.validity.valid) {
                errText.classList.add('_unhide');
            }
        }

        sendForm(event) {
            let formData = new FormData(this.form);

            const firstForm = document.querySelector('.application-form__container-form')
            const secondForm = document.querySelector('.contacts__form')

            const elementsFirstForm = firstForm.elements
            const elementsSecondForm = secondForm.elements

            for (let i = 0; i < elementsFirstForm.length; i++) {
                elementsFirstForm[i].setAttribute('disabled', 'true');
                this.button.classList.add('_disabled');
            }
            
            for (let i = 0; i < elementsSecondForm.length; i++) {
                elementsSecondForm[i].setAttribute('disabled', 'true');
                this.button.classList.add('_disabled');
            }

            fetch('/post.php', {
                method: 'POST',
                body: formData,
                headers: {
                    'Access-Control-Allow-Origin': "*"
                }
            }).then(response => {
                for (let i = 0; i < elementsFirstForm.length; i++) {
                    elementsFirstForm[i].removeAttribute('disabled');
                    this.button.classList.remove('_disabled');
                }
                for (let i = 0; i < elementsSecondForm.length; i++) {
                    elementsSecondForm[i].removeAttribute('disabled');
                    this.button.classList.remove('_disabled');
                }

                    return response.json()
                })
                .then(data => {
                    var orderNumberElement = document.querySelector('.__js__order-number');
                    // Установить значение элемента
                    orderNumberElement.textContent = data.id;

                    this.showModal();
                    this.form.reset();
                })
                .catch(err => {
                    console.log(err);
                })
        }


        hideModal() {
            this.modalThanks.addEventListener('click', (e) => {
                if (e.target === e.currentTarget || e.target.classList.contains('modal-thanks__close')) {
                    this.modalThanks.classList.remove('modal-thanks__overlay_active');
                }
            });
        }

        showModal() {
            this.modalThanks.classList.add('modal-thanks__overlay_active');
            this.hideModal();
        }
    }




    // class ValidationForm {
    //     constructor(formSelector) {
    //         this.form = document.querySelector(`.${formSelector}`);
    //         this.inputWrappers = this.form.querySelectorAll('div');
    //         this.button = this.form.querySelector('button');
    //         this.inputs = this.form.querySelectorAll('.__js__input');
    //         this.modalThanks = document.querySelector('.modal-thanks__overlay');
    //         this.modalCloseButton = document.querySelector('.modal-thanks__close');
    //         this.inputs.forEach(element => {
    //             if (element.name == 'name') {
    //                 this.name = element
    //             } else if (element.name == 'tel') {
    //                 this.tel = element
    //             } else if (element.name == 'email') {
    //                 this.email = element
    //             } else if (element.name == 'message') {
    //                 this.message = element
    //             }
    //         })
    //     }

    //     initForm() {

    //         const phoneOptions = {
    //             mask: '+{7} (000) 000-00-00',
    //         };

    //         new IMask(this.tel, phoneOptions);

    //         this.inputWrappers.forEach(wrapper => {
    //             const input = wrapper.querySelector('input');
    //             const errText = wrapper.querySelector('p');
    //             input.addEventListener('input', (event) => this.handleInputChanges(event, input, errText));
    //             input.addEventListener('blur', (event) => this.handleInputBlur(event, input, errText));
    //         })

    //         this.button.addEventListener('click', (event) => {
    //             event.preventDefault();
    //             let isValid = this.form.checkValidity()
    //             if (isValid) {
    //                 this.sendForm(event);
    //             }
    //         })
    //     }

    //     setBtnDisabled() {
    //         this.button.disabled = true;
    //         this.button.classList.add('_disabled');
    //     }

    //     setBtnActive() {
    //         this.button.disabled = false;
    //         this.button.classList.remove('_disabled');
    //     }

    //     handleInputChanges = (event, input, errText) => {
    //         (this.form.checkValidity()) ? this.setBtnActive() : this.setBtnDisabled();

    //         if (input.validity.valid && errText.classList.contains('_unhide')) {
    //             errText.classList.remove('_unhide');
    //         }

    //     }

    //     handleInputBlur = (event, input, errText) => {
    //         if (!input.validity.valid) {
    //             errText.classList.add('_unhide');
    //         }
    //     }

    //     sendForm(event) {
    //         let formData = new FormData(this.form);

    //         const firstForm = document.querySelector('.application-form__container-form')
    //         const secondForm = document.querySelector('.contacts__form')

    //         const elementsFirstForm = firstForm.elements
    //         const elementsSecondForm = secondForm.elements

    //         for (let i = 0; i < elementsFirstForm.length; i++) {
    //             elementsFirstForm[i].setAttribute('disabled', 'true');
    //             this.button.classList.add('_disabled');
    //         }
            
    //         for (let i = 0; i < elementsSecondForm.length; i++) {
    //             elementsSecondForm[i].setAttribute('disabled', 'true');
    //             this.button.classList.add('_disabled');
    //         }

    //         fetch('/post.php', {
    //             method: 'POST',
    //             body: formData,
    //             headers: {
    //                 'Access-Control-Allow-Origin': "*"
    //             }
    //         }).then(response => {
    //             for (let i = 0; i < elementsFirstForm.length; i++) {
    //                 elementsFirstForm[i].removeAttribute('disabled');
    //                 this.button.classList.remove('_disabled');
    //             }
    //             for (let i = 0; i < elementsSecondForm.length; i++) {
    //                 elementsSecondForm[i].removeAttribute('disabled');
    //                 this.button.classList.remove('_disabled');
    //             }

    //                 return response.json()
    //             })
    //             .then(data => {
    //                 var orderNumberElement = document.querySelector('.__js__order-number');
    //                 // Установить значение элемента
    //                 orderNumberElement.textContent = data.id;

    //                 this.showModal();
    //                 this.form.reset();
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //     }


    //     hideModal() {
    //         this.modalThanks.addEventListener('click', (e) => {
    //             if (e.target === e.currentTarget || e.target.classList.contains('modal-thanks__close')) {
    //                 this.modalThanks.classList.remove('modal-thanks__overlay_active');
    //             }
    //         });
    //     }

    //     showModal() {
    //         this.modalThanks.classList.add('modal-thanks__overlay_active');
    //         this.hideModal();
    //     }
    // }

    // new ValidationForm(document.querySelector('.contacts__form')).initForm();
    // new ValidationForm(document.querySelector('.application-form__form')).initForm();

    debugger
    const APPLICATION_FORM = new ValidationForm(
        'application-form__container-form',
        'application-form__input_tel',    
    );
    APPLICATION_FORM.initForm();
})


//Скролл к контактам
// const scrollButton = document.querySelectorAll('.scrollButton')
// scrollButton.forEach(e => {
//     e.addEventListener('click', () => {
//         document.getElementById('contacts').scrollIntoView({
//             behavior: 'smooth'
//             });
//     })
// }) 
