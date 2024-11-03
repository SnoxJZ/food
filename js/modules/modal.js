function hideModal(modalSelector) {
    modal = document.querySelector(modalSelector),
    modal.classList.remove('show');
    document.body.style.overflow = 'scroll';
};

function showModal(modalSelector, modalTimerId) {
    modal = document.querySelector(modalSelector),
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if (modalTimerId) {
        clearTimeout(modalTimerId);
    }
}

function modal(btnModalSelector, modalSelector, modalTimerId) {
    // Modal
    const btnModalOpen = document.querySelectorAll(btnModalSelector),
          modal = document.querySelector(modalSelector);

    btnModalOpen.forEach(item => {
        item.addEventListener('click', () => {
            showModal(modalSelector, modalTimerId);
        });    
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            hideModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            hideModal(modalSelector);
        }
    })

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {hideModal};
export {showModal};