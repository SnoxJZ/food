import { hideModal, showModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
    // Forms
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
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
        showModal('.modal', modalTimerId);

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
            hideModal('.modal');
        }, 4000)
    }
}

export default forms;