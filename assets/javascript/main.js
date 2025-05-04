let currentIndex = 0
const slides = document.querySelectorAll('.carousel-item')
const totalSlides = slides.length

function showSlide(index) {
    slides.forEach((slide) => {
        slide.classList.remove('active')
    });

    slides[index].classList.add('active')

    const offset = -index * 100
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides
    showSlide(currentIndex)
}

setInterval(nextSlide, 3000) 
showSlide(currentIndex)

const promoBtn = document.querySelector('#promoBtn')

promoBtn.innerHTML = `<a href="./pages/promo.html">Accéder à la liste des promotions</a>
`