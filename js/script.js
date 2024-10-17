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
          btnModalClose = document.querySelector('[data-close]'),
          modal = document.querySelector('.modal');
        //   modalTimerId = setTimeout(showModal, 2000);

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

    btnModalClose.addEventListener('click', hideModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
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
    
    new Card(
        '../img/tabs/vegy.jpg',
        'vegy',
        'Фитнес', 
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        '8',
        '.menu .container',
        'menu__item'
    );

    new Card(
        '../img/tabs/elite.jpg',
        'elite',
        'Премиум', 
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        '16',
        '.menu .container',
        'menu__item'
    );

    new Card(
        '../img/tabs/post.jpg',
        'post',
        'Постное', 
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        '9',
        '.menu .container',
        'menu__item'
    );
})