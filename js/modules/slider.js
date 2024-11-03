import { getZero } from "./timer";

function slider({container, slides, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // slider
    const slide = document.querySelectorAll(slides),
          sliderParent = document.querySelector(container),
          prevBtn = document.querySelector(prevArrow),
          nextBtn = document.querySelector(nextArrow),
          currSlide = document.querySelector(currentCounter),
          totalSlide = document.querySelector(totalCounter);
    const slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;
    let currentSlide = 0
    let offset = 0;


    // Dots
    sliderParent.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    sliderParent.append(indicators);

    for (let i = 0; i < slide.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i);
        dot.classList.add('dot');
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `
        indicators.append(dot);
        dots.push(dot);
    }

    function activeDot() {
        dots.forEach(item => item.style.opacity = '.5');
        dots[currentSlide].style.opacity = 1;
    }
    activeDot();

    function delNotDigits(str) {
        return +str.replace(/\D/ig, '');
    }

    dots.forEach(item => {
        item.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            currentSlide = +slideTo;

            offset = delNotDigits(width) * (slideTo);
            slidesField.style.transform = `translateX(-${offset}px)`

            activeDot();
            slideCounter();
        })
    })
    
    
    // Карусель
    totalSlide.innerText = getZero(slide.length);
    function slideCounter() {
        currSlide.innerText = getZero(currentSlide + 1);
    }
    slideCounter()

    slidesField.style.width = 100 * slide.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slide.forEach(item => item.style.width = width);
    
    function nextSlide() {
        if (offset == delNotDigits(width) * (slide.length - 1)) {
            offset = 0;
        } else {
            offset += delNotDigits(width);
        }

        if(currentSlide < slide.length - 1) {
            currentSlide++
        } else {
            currentSlide = 0
        }
        slideCounter()

        slidesField.style.transform = `translateX(-${offset}px)`

        activeDot();
    }

    nextBtn.addEventListener('click', () => nextSlide())

    setInterval(nextSlide, 3500);

    prevBtn.addEventListener('click', () => {
        if (offset == 0) {
            offset = delNotDigits(width) * (slide.length - 1);
        } else {
            offset -= delNotDigits(width);
        }

        if(currentSlide > 0) {
            currentSlide--
        } else {
            currentSlide = slide.length - 1
        }
        slideCounter()

        slidesField.style.transform = `translateX(-${offset}px)`

        activeDot();
    })


    // Обычный слайдер
    // totalSlide.innerText = getZero(slide.length);

    // function slideCounter() {
    //     currSlide.innerText = getZero(currentSlide + 1);
    // }
    // slideCounter()

    // function hideSlide() {
    //     slide.forEach(item => {
    //         item.classList.remove('show');
    //         item.classList.add('hide');
    //     })
    // }
    // hideSlide();

    // function showSlide(index = 0) {
    //     slide[index].classList.remove('hide');
    //     slide[index].classList.add('show');
    // }
    // showSlide(currentSlide);

    // prevBtn.addEventListener('click', () => {
    //     if(currentSlide > 0) {
    //         currentSlide--
    //     } else {
    //         currentSlide = slide.length - 1
    //     }
    //     hideSlide();
    //     showSlide(currentSlide);
    //     slideCounter();
    //     activeDot();
    // })

    // nextBtn.addEventListener('click', () => {
    //     if(currentSlide < slide.length - 1) {
    //         currentSlide++
    //     } else {
    //         currentSlide = 0
    //     }
    //     hideSlide();
    //     showSlide(currentSlide);
    //     slideCounter();
    //     activeDot();
    // })

}

export default slider;