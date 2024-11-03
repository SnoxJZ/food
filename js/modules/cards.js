import { getData } from "../services/services";

function cards() {
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
}

export default cards;