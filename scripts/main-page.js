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
            this.overlay.addEventListener('click', () => this.handlerClickOverlay())
        }
        hide(){
            this.overlay.remove();
            document.body.classList.remove('modal-open');
            this.overlay.removeEventListener('click', this.handlerClickOverlay)
        }
    }

    class HeaderController{
        constructor(selectorOpen, selectorClose, selectorMenu){
            this.openIcon = document.querySelector(`.${selectorOpen}`);
            this.closeIcon = document.querySelector(`.${selectorClose}`);
            this.menu = document.querySelector(`.${selectorMenu}`);

        }

        openMenu(){
            this.menu.classList.remove('hide');
            this.menu.classList.add('show');
        }
        
        closeMenu(){
            this.menu.classList.remove('show');
            this.menu.classList.add('hide');
        }

        getOpenIcon(){
            return this.openIcon
        }
        
        getCloseIcon(){
            return this.closeIcon
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
        clickOverlayCityList,
    );

    if(IS_MOBILE) {
        const ABOVE_MENU = document.querySelector('.header__above-header');
        const HEADER_CONTROLLER = new HeaderController(
            'header__icon-mob_open',
            'header__icon-mob_close',
            'header__menu'
        );

        function showAboveHeader(){
            ABOVE_MENU.classList.add('show');
            ABOVE_MENU.classList.remove('hide');
        }
        function hideAboveHeader(){
            ABOVE_MENU.classList.add('show');
            ABOVE_MENU.classList.remove('hide');
        }
        
        HEADER_CONTROLLER.getOpenIcon().addEventListener('click', () => HEADER_CONTROLLER.openMenu())
    }

    function showModal(){
        debugger
        MODAL_CITY_LIST.displayCityList();
        OVERLAY_CITY_LIST.show();
    }

    function clickItemCity(elementCity){
        SELECTED_CITY.textContent = elementCity.dataset.city;
        localStorage.setItem('city', elementCity.dataset.city);
        OVERLAY_CITY_LIST.hide();
    }

    function clickOverlayCityList(){
        OVERLAY_CITY_LIST.hide();
        MODAL_CITY_LIST.closeCityList();
    }



    SELECTED_CITY.addEventListener('click', () => showModal());
    
    if (localStorage['city']) SELECTED_CITY.textContent = localStorage.getItem('city');

    CITY_BLOCK.appendChild(MODAL_CITY_LIST.getListCities());

})

