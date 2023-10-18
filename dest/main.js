// loading
function loadPage () {
    let number = document.querySelector('.loading__number');
    let counter = 0;
    setInterval(()=> {
        if (counter == 100){
            clearInterval;
        } else {
            counter += 1;
            number.innerHTML = `${counter}%`;
        }
    },20)

    const loading = document.querySelector('.loading');
    window.addEventListener('load' , function () {
        loading.classList.add('--hide');
    })
}
loadPage()

//background header ... scroll
function changeBackground () {
    const element = document.getElementById('scroll-to')
    const header = document.querySelector('.header');
    const elementTop = element.offsetTop;
    const elementHeight = element.offsetHeight;
    let scrollY = window.scrollY;
    if (scrollY > (elementTop + elementHeight))
    {
        header.classList.add('--bg-black');
    } else
        {
            header.classList.remove('--bg-black');
        }
}
// backtotop ... scroll
function showBacktotop () {
    const btt = document.querySelector('.back-to-top');
    let scrollY = window.scrollY;
    if (scrollY > window.innerHeight)
    {
        btt.classList.add('show');
    } else
        {
            btt.classList.remove('show');
        }
}

// scroll -> show background + btt

window.addEventListener('scroll', function () {
    changeBackground();
    showBacktotop();
})

//click back to top
let backTop = document.querySelector(".back-to-top");
function topFunction() {
    backTop.addEventListener('click', function(){
        document.documentElement.scrollTop = 0;
    })
}
topFunction();

// toggle language select
function selectLang() {
    const listLang = document.getElementById("listLang");
    const dropDown = document.querySelector(".dropdown");
    const curLang = document.querySelector(".header__right-lang-current");
    const innerCur = document.querySelector(".header__right-lang-current span");
    const innerSecs = document.querySelectorAll("#listLang li");
    curLang.addEventListener ('click', function(e) {
        e.stopPropagation();
        dropDown.classList.toggle("--rotate");
        listLang.classList.toggle("show");
        document.addEventListener("click",function() {
            listLang.classList.remove("show")
            dropDown.classList.remove("--rotate");
        })
        innerSecs.forEach(item => item.addEventListener("click", function() {
            let temp = item.innerHTML;
            item.innerHTML = innerCur.innerHTML;
            innerCur.innerHTML = temp;
        }))
    })
}
selectLang();

// toggle nav menu
function toggleNav() {
    const btnMenu = document.querySelector('.header__right-btnmenu') 
    const navMenu = document.querySelector('.nav');
    const headLogo = document.querySelector('.header__logo');
    const headLang = document.querySelector('.header__right-lang');
    const hamburger = document.querySelector('.hambergur');
    const liNav = document.querySelectorAll('.nav .nav__menu li')
    btnMenu.addEventListener('click', function() {
        navMenu.classList.toggle("show");
        headLogo.classList.toggle("show");
        headLang.classList.toggle("show");
        hamburger.classList.toggle("active-menu");
    })  
    liNav.forEach (item => item.addEventListener('click', function() {
        console.log("test")
        navMenu.classList.toggle("show");
        headLogo.classList.toggle("show");
        headLang.classList.toggle("show");
        hamburger.classList.toggle("active-menu");
    }))
    // hide nav
    function hideNav() {
        navMenu.classList.remove("show")
        hamburger.classList.remove("active-menu")
    }
    window.addEventListener('resize', function() {
        let wWindow = window.innerWidth
        if (wWindow > 992) {
            hideNav()
        }
    })
}
toggleNav();


// slide
window.addEventListener("load", function() {
    const hero = document.querySelector(".hero");
    const slider = document.querySelector(".hero__slider");
    const sliderItem = document.querySelectorAll(".hero__slider-item");
    const nextBtn = document.querySelector(".--next");
    const preBtn = document.querySelector(".--pre");
    const dotItems = document.querySelectorAll(".dotted__item");
    const sliderItemWidth = sliderItem[0].offsetWidth;
    const sliderLength = sliderItem.length;
    const numberCur = document.querySelector(".number__current");
    let positionX = 0;
    let index = 1;

    // dotted
    dotItems.forEach(item => item.addEventListener("click", function() {
        dotItems.forEach(e => e.classList.remove("--active"));
        item.classList.add("--active");
        indexDotted = parseInt(item.dataset.index);
        index = indexDotted;
        slider.style = `transform: translateX(${-1 * (index-1) * sliderItemWidth }px)`;
        numberCur.innerHTML = index.toString().padStart(2, "0");
    }))

    // next and prev
    nextBtn.addEventListener("click", function() {
        handleChangeSlide(1);    
    })  
    preBtn.addEventListener("click", function() {
        handleChangeSlide(-1);    
    })
    
    function handleChangeSlide(direction) {
        if (direction == 1) {
            if (index > (sliderLength - 1)) return;
            index ++;
            numberCur.innerHTML = index.toString().padStart(2, "0");
            positionX = -1 * (index-1) * sliderItemWidth ;
            slider.style = `transform: translateX(${positionX}px)`;
        }
        else {
            if (index < 2) return;
            index --;
            numberCur.innerHTML = index.toString().padStart(2, "0");
            positionX = -1 * (index-1) * sliderItemWidth;
            slider.style = `transform: translateX(${positionX}px)`;

        }
        
        [...dotItems].forEach(item => item.classList.remove("--active"));
        dotItems[index-1].classList.add("--active");
    }
})

// show popup video
function showPopup () {
    const popup = document.querySelector(".popup")
    const btnPlays = document.querySelectorAll("#icon-play")
    const iframeVideo = document.querySelector(".popup__video-inner")
    const test = document.querySelector(".btn-learn")
    const btnClose = document.querySelector(".popup__video-close")
  
    btnPlays.forEach(item => item.addEventListener("click", function() {
        let id = item.getAttribute("data-videoid");
        iframeVideo.innerHTML = ` <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/${id}?autoplay=1" allow="autoplay" frameborder=”0″ allowfullscreen
        ></iframe>`
        popup.classList.add("show")
    }))
    // close popup
    function clsPopup() {
        popup.classList.remove("show");
        iframeVideo.innerHTML = "";
    }
    btnClose.addEventListener("click", function() {
        clsPopup();
    })
    document.addEventListener('keydown', function(e) {
        if (e.which == 27) {
            clsPopup();
        }
    }) 
}
showPopup() 
