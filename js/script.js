window.addEventListener('DOMContentLoaded', () => {
    // Tabs
    const tabsContent = document.querySelectorAll('.tabcontent'),
          tabs = document.querySelectorAll('.tabheader__item'),
          tabsParent = document.querySelector('.tabheader__items');
    
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add("hide", "fade");
            item.classList.remove("show");
        })

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");

        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })

    // Timer
    const deadline = '2024-10-19';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - new Date();

        if (t <= 0) {
            days = hours = minutes = seconds = 0;
        } else {
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        }

        return {
            total: t,
            days,
            hours,
            minutes,
            seconds
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime)

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline)


    // Modal
    const btnModalOpen = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');
          modalTimerId = setTimeout(showModal, 50000);

    function hideModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'scroll';
    };

    function showModal() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimerId);
    }

    btnModalOpen.forEach(item => {
        item.addEventListener('click', () => {
            showModal();
        });    
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            hideModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            hideModal();
        }
    })

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    // Cards
    class Card {
        constructor(img, alt, title, desc, price, parrent, ...classes) {
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.desc = desc;
            this.price = price;
            this.classList = classes;
            this.parrent = document.querySelector(parrent);
            this.transfer = 41;
            this.changeToUAH()

            const card = document.createElement("div");
            if(this.classList.length === 0) {
                this.element = 'menu__item';
                card.classList.add(this.element);
            } else {
                classes.forEach(item => card.classList.add(item));
            }

            card.innerHTML = `
                <img src=${this.img} alt=${alt}>
                <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
                <div class="menu__item-descr">${this.desc}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `

            this.parrent.append(card);
        }

        changeToUAH() {
            this.price = +this.price * this.transfer
        }
    }
    
    const getData = async (url) => {
        const res = await fetch(url)

        if (!res.ok) {
            throw new Error();
        }

        return await res.json();
    }

    // Получение данных карточек от сервера
    // getData('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, alt, title, desc, price}) => {
    //         new Card(img, alt, title, desc, price, '.menu .container', 'menu__item')
    //     })
    // })
    // Используем axios для получения данных вместо fetch
    axios.get('http://localhost:3000/menu')
    .then(data => {
        data.data.forEach(({img, alt, title, desc, price}) => {
            new Card(img, alt, title, desc, price, '.menu .container', 'menu__item')
        })
    })

    // Forms
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json'
            }
        })

        return await res.json();
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Создаем блок loading
            const loadingMessage = document.createElement('img');
            loadingMessage.src = message.loading;
            loadingMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', loadingMessage)

            // Получаем данные с формы
            const formData = new FormData(form); 

            // Преобразовываем formdata в обычный объект (не обязательно)
            // const object = {}
            // formData.forEach((item, key) => {
            //     object[key] = item;
            // })
            const json = JSON.stringify(Object.fromEntries(formData.entries()))

            // Создаем запрос
            postData('http://localhost:3000/requests', json)
            .then(response => {
                console.log(response);
                showThanksModal(message.success);
                loadingMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
            })
        })
    }

    forms.forEach(item => bindPostData(item));


    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog')

        prevModalDialog.classList.add('hide');
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close="" class="modal__close">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            hideModal();
        }, 4000)
    }
})