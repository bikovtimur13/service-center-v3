document.addEventListener('DOMContentLoaded', () => {
    const IS_MOBILE = window.matchMedia('(max-width: 767px)').matches;
    const SELECTED_CITY = document.querySelector('.header__selected-city');
    const CITY_BLOCK = document.querySelector('.header__city-choice');
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
    const HEADER_MENU_ITEMS = document.querySelectorAll('.header__menu-item-text');

    const SECTION_SERVICES = document.querySelector('.services');
    const SECTION_CONTACTS = document.querySelector('.contacts');
    const SECTION_GUARANTEES = document.querySelector('.guarantees');
    const SECTION_TRADE_IN = document.querySelector('.trade-in');
    const SECTION_FAQ = document.querySelector('.faq-bottom');
    const SECTION_APP_FORM = document.querySelector('.application-form');

    const BUTTONS_TO_FORM = [document.querySelector('.header__button'), document.querySelector('.poster__button')];

    const QUESTIONS = document.querySelectorAll('.faq__question');
    const QUESTIONS_BOTTOM = document.querySelectorAll('.faq-bottom__question');


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
            this.overlay = document.createElement('div');
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
    
        displayCityList(){
            this.listCities.classList.remove('hide');
            this.listCities.classList.add('show');
        }
        
        closeCityList(){
            this.listCities.classList.remove('show');
            this.listCities.classList.add('hide');
        }
    }

    class Overlay{
        overlay = document.createElement('div');
        
        constructor(selectorName, elementForWhichOverlay, handlerClickOverlay){
            this.elementForWhichOverlay = elementForWhichOverlay;
            this.handlerClickOverlay = handlerClickOverlay;
            this.addSelector(selectorName);
            this.init();
        }
    
        init(){
            this.overlay.classList.add('overlay');
        }
        addSelector(selectorName){
            this.overlay.classList.add(`overlay_${selectorName}`);
        }
        show(){
            this.elementForWhichOverlay.insertAdjacentElement('beforebegin', this.overlay);
            document.body.classList.add('modal-open');
            this.overlay.addEventListener('click', this.handlerClickOverlay)
        }
        hide(){
            this.overlay.removeEventListener('click', this.handlerClickOverlay)
            this.overlay.remove();
            document.body.classList.remove('modal-open');
        }
    }

    class HeaderController{
        constructor(selectorHeader, selectorOpen, selectorClose, selectorMenu, selectorAddStyle){
            this.header = document.querySelector(`.${selectorHeader}`);
            this.openIcon = document.querySelector(`.${selectorOpen}`);
            this.closeIcon = document.querySelector(`.${selectorClose}`);
            this.menu = document.querySelector(`.${selectorMenu}`);
            this.additionalStyle = selectorAddStyle;
        }

        openMenu(){
            this.show(this.menu);
            this.hide(this.openIcon);
            this.show(this.closeIcon);
            this.header.classList.add(this.additionalStyle)
        }
        
        closeMenu(){
            this.hide(this.menu);
            this.hide(this.closeIcon);
            this.show(this.openIcon);
            this.header.classList.remove(this.additionalStyle)
        }

        hide(elem){
            elem.classList.remove('show');
            elem.classList.add('hide');
        }
        show(elem){
            elem.classList.remove('hide');
            elem.classList.add('show');
        }

        getOpenIcon(){
            return this.openIcon;
        }

        getCloseIcon(){
            return this.closeIcon;
        }
        getMenu(){
            return this.menu;
        }

        getHeader(){
            return this.header;
        }
    }

    class ValidationForm {
        constructor(
            formSelector,
            telSelector,
            inputWrapper,
            buttonSelector,
            inputSelector
        ) {
            this.form = document.querySelector(`.${formSelector}`);
            this.phone = this.form.querySelector(`.${telSelector}`);
            this.inputWrappers = this.form.querySelectorAll(`.${inputWrapper}`);
            this.button = this.form.querySelector(`.${buttonSelector}`);
            this.inputs = this.form.querySelectorAll(`${inputSelector}`);
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

            const firstForm = document.querySelector('.application-form__container-form');
            const secondForm = document.querySelector('.contacts__form');
            const thirdForm = document.querySelector('.trade-in__form');

            const elementsFirstForm = firstForm.elements
            const elementsSecondForm = secondForm.elements
            const elementsThirdForm = thirdForm.elements

            for (let i = 0; i < elementsFirstForm.length; i++) {
                elementsFirstForm[i].setAttribute('disabled', 'true');
                this.button.classList.add('_disabled');
            }
            
            for (let i = 0; i < elementsSecondForm.length; i++) {
                elementsSecondForm[i].setAttribute('disabled', 'true');
                this.button.classList.add('_disabled');
            }

            for (let i = 0; i < elementsThirdForm.length; i++) {
                elementsThirdForm[i].setAttribute('disabled', 'true');
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
                for (let i = 0; i < elementsThirdForm.length; i++) {
                    elementsThirdForm[i].removeAttribute('disabled');
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

    const MODAL_CITY_LIST = new CityList(
        'list-cities',
        'list-cities__item',
        CITY_ARR,
        clickItemCity,
        SELECTED_CITY,
    );

    MODAL_CITY_LIST.createList();

    const OVERLAY_CITY_LIST = new Overlay(
        'list-cities',
        MODAL_CITY_LIST.getListCities(),
        clickOverlay,
    );

    if(IS_MOBILE) {
        const ABOVE_MENU = document.querySelector('.header__above-header');
        const HEADER_CONTROLLER = new HeaderController(
            'header',
            'header__icon-mob_open',
            'header__icon-mob_close',
            'header__menu',
            'header_green-bg'
        );

        const OVERLAY_HEADER = new Overlay(
            'header',
            HEADER_CONTROLLER.getHeader(),
            clickOverlayMob,
        );

        HEADER_CONTROLLER.getOpenIcon().addEventListener('click', () => {
            OVERLAY_HEADER.show();
            HEADER_CONTROLLER.openMenu()
        })

        HEADER_CONTROLLER.getCloseIcon().addEventListener('click', () => {
            OVERLAY_HEADER.hide();
            HEADER_CONTROLLER.closeMenu()
        })
        
        // Перемещение ABOVE_MENU внутрь списка
        HEADER_CONTROLLER.getMenu().appendChild(ABOVE_MENU);

        function clickOverlayMob(){
            OVERLAY_HEADER.hide();
            HEADER_CONTROLLER.closeMenu();
        }
    }

    function showModal(){
        MODAL_CITY_LIST.displayCityList();
        if(!IS_MOBILE) OVERLAY_CITY_LIST.show();
    }

    function clickItemCity(elementCity){
        SELECTED_CITY.textContent = elementCity.dataset.city;
        localStorage.setItem('city', elementCity.dataset.city);
        OVERLAY_CITY_LIST.hide();
    }

    function clickOverlay(){
        OVERLAY_CITY_LIST.hide();
        MODAL_CITY_LIST.closeCityList();
    }


    SELECTED_CITY.addEventListener('click', () => showModal());
    
    if (localStorage['city']) SELECTED_CITY.textContent = localStorage.getItem('city');

    CITY_BLOCK.appendChild(MODAL_CITY_LIST.getListCities());

    HEADER_MENU_ITEMS.forEach(item => item.addEventListener('click', () => {
        switch(item.textContent){
            case 'Главная':
                scrollToElement(SECTION_SERVICES);
                break;
            case 'Контакты':
                scrollToElement(SECTION_CONTACTS);
                break; 
            case 'Гарантии':
                scrollToElement(SECTION_GUARANTEES);
                break;  
            case 'Trade-in':
                scrollToElement(SECTION_TRADE_IN);
                break;
            case 'FAQ':
                scrollToElement(SECTION_FAQ);
                break;
            default:
                IS_MOBILE 
        }
    }))

    BUTTONS_TO_FORM.forEach(button => button.addEventListener('click', () => scrollToElement(SECTION_APP_FORM)))

    function scrollToElement(element){
        element.scrollIntoView({
            block: 'start',
            inline: 'center',
            behavior: 'smooth'
        })
    }

    const APPLICATION_FORM = new ValidationForm(
        'application-form__container-form',
        'application-form__input_tel', 
        'application-form__input-wrapper',   
        'application-form__button',
        'application-form__input'
    );
    APPLICATION_FORM.initForm();
        
    
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
})

