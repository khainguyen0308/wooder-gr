
// loading
function loadPage () {
    function handlePercent (percent) {
        const perNumber = document.querySelector('.loading__number');
        const perInner = document.querySelector('.loading-inner')
        perInner.style.width = `${percent}%`
        perNumber.textContent = `${percent}%`
    }  
    function hideLoading () {
        const body = document.querySelector('body')
        const loading = document.querySelector('.loading');
        body.classList.remove("--disable-body-scroll");
        loading.classList.add('--hide');
    }
    // img loaded   
    const lengthImgs = document.querySelectorAll('img').length
    let imgsLoaded = new imagesLoaded('body');
    let count = 0
    imgsLoaded
    .on("progress", (instance ) => {
      count++;
      let percent = Math.floor((count / lengthImgs) * 100);
      handlePercent(percent);
    })
    .on("always", (instance ) => {
      console.log("ALWAYS - all images have been loaded");
    })
    .on("fail", (instance ) => {
      console.log("FAIL - all images loaded, at least one is broken");
    })
    .on("done", (instance ) => {
      console.log("DONE  - all images have been successfully loaded");
      hideLoading();
    })
    
}
loadPage()

// progress-bar
function progressBar () {
    const progress = document.querySelector('.progress-bar')
    document.addEventListener('scroll', function() {
        let heightBody = this.body.clientHeight - window.innerHeight;
        let scrollY = window.scrollY;
        let widthPro = scrollY / heightBody * 100;
        progress.style.width = `${widthPro}%`;
    })
}
progressBar()

// cursor
function mouseMove () {
    document.addEventListener("mousemove", function(e) {
        const cursor = document.querySelector(".cursor");
        let xCoord = e.clientX - cursor.clientWidth/2,
            yCoord = e.clientY - cursor.clientHeight/2; 
        cursor.style.transform = `translate(${xCoord}px, ${yCoord}px)`
    }) 
}
mouseMove()
// cursor active
function showMouseMove () {
    const cursor = document.querySelector('.cursor')
    const elementHovers = document.querySelectorAll('.--hover')
    elementHovers.forEach(element => element.addEventListener('mouseover', function() {
        cursor.classList.add('--active')
        // console.log("test")
    }))
    elementHovers.forEach(element => element.addEventListener('mouseout', function() {
        cursor.classList.remove('--active')
    }))
}
showMouseMove()

//change background header ... scroll
function changeBackground () {
    const element = document.getElementById('scroll-to')
    const header = document.querySelector('.header');
    const heightHeader = document.getElementById("header").offsetHeight
    const elementTop = element.offsetTop;
    const elementHeight = element.offsetHeight;
    let scrollY = window.scrollY;
    if (scrollY > (elementTop + elementHeight - heightHeader))
    {
        header.classList.add('--bg-black');
    } else
        {
            header.classList.remove('--bg-black');
        }
}
//show backtotop ... scroll
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
        window.scrollTo({
            top: 0
          });
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
            
        function hideSecLang() {
            dropDown.classList.remove("--rotate");
            listLang.classList.remove("show");
        }
        document.addEventListener("click",function(e) {
            hideSecLang()
        })
        document.addEventListener('keydown', function(e) {
            if (e.which == 27) {
                hideSecLang()
            }
        })
    })
    innerSecs.forEach(item => item.addEventListener("click", function(e) {
        let temp = item.textContent;
        item.innerHTML = innerCur.textContent;
        innerCur.innerHTML = temp;
    }))
    
}
selectLang();

// toggle nav menu
function toggleNav() {
    const body = document.querySelector('body')
    const btnMenu = document.querySelector('.header__right-btnmenu') 
    const navMenu = document.querySelector('.nav');
    const headLogo = document.querySelector('.header__logo');
    const headLang = document.querySelector('.header__right-lang');
    const hamburger = document.querySelector('.hambergur');
    const liNav = document.querySelectorAll('.nav .nav__menu li')
    btnMenu.addEventListener('click', function() {
        navMenu.classList.toggle("show");
        headLogo.classList.toggle("hidden");
        headLang.classList.toggle("hidden");
        hamburger.classList.toggle("active-menu");
        body.classList.toggle('--disable-body-scroll')
    })  
    // hide nav
    function hideNav() {
        navMenu.classList.remove("show")
        hamburger.classList.remove("active-menu")
        headLogo.classList.remove("hidden");
        headLang.classList.remove("hidden");
        body.classList.remove('--disable-body-scroll')
    }

    liNav.forEach (item => item.addEventListener('click', function() {
        hideNav()
    }))

    window.addEventListener('resize', function() {
        let wWindow = window.innerWidth
        if (wWindow > 992) {
            hideNav()
        }
    })
    document.addEventListener('keydown', function(e) {
        if (e.which == 27) {
            hideNav()  
        }
    }) 
}
toggleNav();


// slide code
// window.addEventListener("load", function() {
//     const hero = document.querySelector(".hero");
//     const slider = document.querySelector(".hero__slider");
//     const sliderItem = document.querySelectorAll(".hero__slider-item");
//     const nextBtn = document.querySelector(".--next");
//     const preBtn = document.querySelector(".--pre");
//     const dotItems = document.querySelectorAll(".dotted__item");
//     const sliderItemWidth = sliderItem[0].offsetWidth;
//     const sliderLength = sliderItem.length;
//     const numberCur = document.querySelector(".number__current");
//     let positionX = 0;
//     let index = 1;

//     // dotted
//     dotItems.forEach(item => item.addEventListener("click", function() {
//         dotItems.forEach(e => e.classList.remove("--active"));
//         item.classList.add("--active");
//         indexDotted = parseInt(item.dataset.index);
//         index = indexDotted;
//         slider.style = `transform: translateX(${-1 * (index-1) * sliderItemWidth }px)`;
//         numberCur.innerHTML = index.toString().padStart(2, "0");
//     }))

//     // next and prev
//     nextBtn.addEventListener("click", function() {
//         handleChangeSlide(1);    
//     })  
//     preBtn.addEventListener("click", function() {
//         handleChangeSlide(-1);    
//     })
    
//     function handleChangeSlide(direction) {
//         if (direction == 1) {
//             if (index > (sliderLength - 1)) return;
//             index ++;
//             numberCur.innerHTML = index.toString().padStart(2, "0");
//             positionX = -1 * (index-1) * sliderItemWidth ;
//             slider.style = `transform: translateX(${positionX}px)`;
//         }
//         else {
//             if (index < 2) return;
//             index --;
//             numberCur.innerHTML = index.toString().padStart(2, "0");
//             positionX = -1 * (index-1) * sliderItemWidth;
//             slider.style = `transform: translateX(${positionX}px)`;

//         }
        
//         [...dotItems].forEach(item => item.classList.remove("--active"));
//         dotItems[index-1].classList.add("--active");
//     }
// })


// show popup video
function showPopup () {
    const body = document.querySelector('body')
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
        body.classList.add('--disable-body-scroll')
    }))
    // close popup
    function clsPopup() {
        popup.classList.remove("show");
        iframeVideo.innerHTML = "";
        body.classList.remove('--disable-body-scroll')
    }
    btnClose.addEventListener("click", function() {
        clsPopup();
    })
    popup.addEventListener("click", function() {
        clsPopup();
    })
    document.addEventListener('keydown', function(e) {
        if (e.which == 27) {
            clsPopup();
        }
    })
}
showPopup() 

// tab
function changeTab () {
    tabs = document.querySelectorAll(".news__tabs-tab")
    lists = document.querySelectorAll(".news__list")
    tabs.forEach((tab, index) => tab.addEventListener('click', function(){
        console.log(index)
        tabs.forEach(tab => tab.classList.remove('--active'))
        tab.classList.add('--active')   
        lists.forEach (list => list.classList.remove('--active'))
        lists[index].classList.add('--active')
    }))
}
changeTab()

// faq accordion
function accordion () {
    const accordion = document.querySelectorAll('.accordion__content');
    accordion.forEach((item,index) => item.addEventListener('click', function() {
        item.classList.toggle('--active')
        accordion.forEach((item2,index2)=>{ 
            if(index != index2){ 
                item2.classList.remove("--active");  
            } 
        }) 
    })
)}
accordion()

// Handle click menu header = nav
function handleClickMenu () {
    const itemMenus = document.querySelectorAll('.item-menu')
    const itemNavs = document.querySelectorAll('.item-nav')
    itemMenus.forEach(item => item.addEventListener('click', function(e) {
        e.preventDefault()
        itemMenus.forEach(item => item.classList.remove('--active'))
        item.classList.add('--active')
        let idSection = item.getAttribute('href')
        let topSection = document.querySelector(idSection).offsetTop
        window.scrollTo({
            top: topSection
        })
    }))
    itemNavs.forEach(item => item.addEventListener('click', function(e) {
        e.preventDefault()
        itemNavs.forEach(item => item.classList.remove('--active'))
        item.classList.add('--active')
        let idSection = item.getAttribute('href')
        let topSection = document.querySelector(idSection).offsetTop
        const heightHeader = document.getElementById("header").offsetHeight
        window.scrollTo({
            top: topSection - heightHeader
        })
    }))
}
handleClickMenu()

// scroll to section
function scrollSection () {
    const itemMenus = document.querySelectorAll('.item-menu')
    const itemNavs = document.querySelectorAll('.item-nav')
    const sections = document.querySelectorAll('section')
    const heightHeader = document.getElementById("header").offsetHeight
    
    window.addEventListener('scroll', function() {
        sections.forEach(section => {
            let scrollY = window.scrollY
            let topSection = section.offsetTop
            let heightSection = section.offsetHeight
            let idCurrent = section.getAttribute('id')
            if (scrollY >= topSection - heightHeader && scrollY < topSection + heightSection - heightHeader) {
                if (idCurrent != null){
                    itemMenus.forEach(menu => {
                        menu.classList.remove("--active")
                        document.querySelector(".item-menu[href*="+ idCurrent + "]").classList.add('--active')
                    }) 
                    itemNavs.forEach(nav => {
                        nav.classList.remove("--active")
                        document.querySelector(".item-nav[href*="+ idCurrent + "]").classList.add('--active')
                    })           
                }
            }
        }
        )
    })
}
scrollSection()



// lib
// // slider flickity
function handleSlider () {
    var slider = document.querySelector('.hero__slider')
    var flktySlider = new Flickity(
        slider,
        {
            cellAlign: 'left',
            contain: true,
            draggable: '>1',
            prevNextButtons: false,
            wrapAround: true,
            on: {
                ready: function () {
                    console.log("ready")
                    handleDotted()
                    getTotalPage()
                },
                change: function(index) {
                    
                    handlePaging(index)
                }
            }
        }
    );
    // control
    let nextBtn = document.querySelector(".--next");
    let preBtn = document.querySelector(".--pre");
    nextBtn.addEventListener('click', function() {
        flktySlider.next(true)
    })
    preBtn.addEventListener('click', function() {
        flktySlider.previous(true)
    })
    // dotted
    function handleDotted () {
        let dotted = document.querySelector('.flickity-page-dots'),
            heroPage = document.querySelector('.hero__bottom-paging')
            heroPage.appendChild(dotted)
    }
    // paging
    function handlePaging(index) {
        let numberCur = document.querySelector(".number__current");
            numberCur.innerHTML= (index+1).toString().padStart(2, "0");                
    }
    // total page
    function getTotalPage () {
    const numberTotal = document.querySelector(".number__total"); 
    const quantitySlider = document.querySelectorAll(".hero__slider-item").length;
    numberTotal.innerHTML = `/${quantitySlider.toString().padStart(2, "0")}`
    }
    
}
handleSlider()


// Gallery fancybox

function handleGallery () {
    Fancybox.bind("[data-fancybox]", {
      // Your custom options
      infinite: true
    });
}
handleGallery();

// Carousel
function handleCarousel () {
    var carouselImg = document.querySelector('.carousel__img')
    var flktyCarousel = new Flickity(
        carouselImg,
        {
            cellAlign: 'left',
            contain: true,
            draggable: '>1',
            prevNextButtons: false,
            wrapAround: true,
            pageDots: false,
            freeScroll: true,
            accessibility: true,
        }
    );


    function handleProgressCarousel () {
        const progressBar = document.querySelector('.carousel__progress-inner')
        flktyCarousel.on("scroll", function(percent) {
            widthInner = (Math.max (0, Math.min(1,percent))) * 100
            // console.log(widthInner)
            progressBar.style.width = `${widthInner}%`
        })
    }
    handleProgressCarousel()
}

// load => handleCarousel, handleSlider
window.addEventListener('load', function() {
    handleCarousel()
})




