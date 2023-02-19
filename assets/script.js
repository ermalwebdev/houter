"use strict";
// Selectors
const sliderTop = document.querySelector(".carousel_container");
const carouselItems = document.querySelectorAll(".carousel_items");
const arrowLandR = document.querySelectorAll(".arrows");
const houseContainerSlider = document.querySelector(".houses_container");
const allHouseSlider = document.querySelector(".all_houses");
const housesCard = document.querySelectorAll(".house_card");
const hamburgerOpenClose = document.querySelector(".hamburger_link");
const menuContainer = document.querySelector(".nav_header");
const hamburgerIcon = document.querySelectorAll(".svg_icon_burger");
const selectHouses = document.querySelectorAll(".btns_selection");
const selectHousesIcons = document.querySelectorAll(".houses_svg");
const pathFills = document.querySelectorAll(".path_arrows");
const lastCarouselItem = carouselItems[carouselItems.length - 1];
const videoContainer = document.querySelector(".video_img_sell_info");
const imageVideo = document.querySelector(".image_preview_container");

// JavaScript Free Hand

// Hamburger Menu
hamburgerOpenClose.addEventListener("click", function () {
	if (hamburgerIcon[0].classList.contains("active")) {
		hamburgerIcon[0].classList.remove("active");
		hamburgerIcon[1].classList.add("active");
		menuContainer.style.display = "block";
		document.querySelector("body").style.overflow = "hidden";
	} else {
		hamburgerIcon[1].classList.remove("active");
		hamburgerIcon[0].classList.add("active");
		menuContainer.style.display = "none";
		document.querySelector("body").style.overflow = "";
	}
});
const menuMediaQuery = window.matchMedia("(min-width: 1200px)");
window.addEventListener("resize", function () {
	if (menuMediaQuery.matches) {
		document.querySelector(".nav_header").style.display = "block";
	} else {
		document.querySelector(".nav_header").style.display = "none";
	}
});
// Carousel Top No Libraries
let isPressed = false;
let cursorX;
let isatEnd = true;
sliderTop.addEventListener("mousedown", e => {
	isPressed = true;
	for (let i = 0; i < carouselItems.length; i++) {
		cursorX = e.offsetX - carouselItems[0].offsetLeft;
	}
});
sliderTop.addEventListener("mousemove", e => {
	if (!isPressed) return;
	for (let i = 0; i < carouselItems.length; i++) {
		carouselItems[i].style.left = `${e.offsetX - cursorX}px`;
	}
	boundSlides();
});
window.addEventListener("mouseup", () => {
	isPressed = false;
	if (isPressed === false) {
		setTimeout(() => {
			carouselItems.forEach(index => {
				index.style.left = 0;
			});
		}, 15000);
	}
});
function boundSlides() {
	const containerRect = sliderTop.getBoundingClientRect();
	const lastChildCloseTo =
		lastCarouselItem.offsetLeft + lastCarouselItem.offsetWidth;
	for (let i = 0; i < carouselItems.length; i++) {
		const carouselRect = carouselItems[i].getBoundingClientRect();
		if (
			parseInt(carouselItems[i].style.left) > 200 ||
			lastChildCloseTo <= 220
		) {
			carouselItems[i].style.left = 0;
		} else if (carouselRect.right < containerRect.right) {
			carouselItems[i].style.left = `-${
				carouselItems[i].width - containerRect.width
			}px`;
		}
	}
}

// Libraries Swiper Js
//Featured House
var swiper = new Swiper(".mySwiper", {
	slidesPerView: 1,
	centeredSlides: false,
	spaceBetween: 40,
	navigation: {
		nextEl: ".btn_right_arrow",
		prevEl: ".btn_left_arrow",
	},
	breakpoints: {
		// when window width is >= 320px
		700: {
			slidesPerView: 2,
			spaceBetween: 40,
		},
		992: {
			slidesPerView: 2,
			spaceBetween: 40,
		},
		1200: {
			slidesPerView: 3,
			spaceBetween: 40,
		},
		1400: {
			slidesPerView: 4,
			spaceBetween: 40,
		},
	},
});
pathFills.forEach(index => {
	index.setAttribute("fill", "white");
});
const countActiveSliders = function () {
	let activeSliders = 0;
	swiper.slides.forEach(slide => {
		if (slide.offsetWidth > 0) {
			activeSliders++;
		}
	});
	return activeSliders;
};
if (selectHouses.length) {
	selectHouses.forEach((indexHouses, counterI) => {
		indexHouses.addEventListener("click", e => {
			e.preventDefault();
			selectHouses.forEach((index, counter) => {
				index.classList.remove("active_house");
				selectHousesIcons[counter].setAttribute("fill", "#888B97");
			});
			indexHouses.classList.add("active_house");
			selectHousesIcons[counterI].setAttribute("fill", "#10B981");
		});
	});
}
const mediaQueryOnePointFourK = window.matchMedia("(max-width: 1200px)");
const defaultArrowColors = (arrow1, path1, arrow2, path2) => {
	arrowLandR[0].style.backgroundColor = `${arrow1}`;
	pathFills[0].setAttribute("fill", `${path1}`);
	arrowLandR[1].style.backgroundColor = `${arrow2}`;
	pathFills[1].setAttribute("fill", `${path2}`);
};
selectHouses.forEach(index => {
	index.addEventListener("click", e => {
		if (index.classList.contains("btn_house")) {
			housesCard.forEach(index => {
				if (!index.classList.contains("hs_card")) {
					index.style.display = "none";
				} else {
					index.style.display = "block";
				}
			});
		} else if (index.classList.contains("btn_villa")) {
			housesCard.forEach(index => {
				if (!index.classList.contains("villa_card")) {
					index.style.display = "none";
				} else {
					index.style.display = "block";
				}
			});
		} else if (index.classList.contains("btn_apartment")) {
			housesCard.forEach(index => {
				if (!index.classList.contains("appartment_card")) {
					index.style.display = "none";
				} else {
					index.style.display = "block";
				}
			});
		}
		swiper.update();
		swiper.slideTo(0);
		if (mediaQueryOnePointFourK.matches === true && countActiveSliders() >= 4) {
			defaultArrowColors("rgb(224, 227, 235)", "#3C4563", "#10b981", "white");
			console.log("eraml");
		} else if (countActiveSliders() <= 4) {
			defaultArrowColors(
				"rgb(224, 227, 235)",
				"#3C4563",
				"rgb(224, 227, 235)",
				"#3C4563"
			);
		} else {
			defaultArrowColors("rgb(224, 227, 235)", "#3C4563", "#10b981", "white");
		}
	});
});
arrowLandR[0].style.backgroundColor = "#e0e3eb";
pathFills[0].setAttribute("fill", "#3C4563");
swiper.on("slideChange", function () {
	if (swiper.isEnd) {
		arrowLandR[1].style.backgroundColor = "#e0e3eb";
		pathFills[1].setAttribute("fill", "#3C4563");
		arrowLandR[0].style.backgroundColor = "#10b981";
		pathFills[0].setAttribute("fill", "white");
	} else if (swiper.isBeginning) {
		arrowLandR[0].style.backgroundColor = "#e0e3eb";
		pathFills[0].setAttribute("fill", "#3C4563");
		arrowLandR[1].style.backgroundColor = "#10b981";
		pathFills[1].setAttribute("fill", "white");
	} else {
		arrowLandR.forEach(index => {
			index.style.backgroundColor = "#10b981";
		});
		pathFills.forEach(index => {
			index.setAttribute("fill", "white");
		});
	}
});

// SwiperJs Review Slider
var reviewSwiper = new Swiper(".newSwiper", {
	slidesPerView: 1,
	spaceBetween: 56,
	freeMode: false,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	breakpoints: {
		// when window width is >= 320px
		767: {
			slidesPerView: 2,
			spaceBetween: 40,
		},
		1200: {
			slidesPerView: 3,
			spaceBetween: 40,
		},
	},
});

// Librarie VideoJs
var video = videojs("my-video");
videoContainer.addEventListener("mouseover", function () {
	imageVideo.style.zIndex = "-1";
});
videoContainer.addEventListener("mouseout", function () {
	imageVideo.style.zIndex = "2";
	if (!video.paused()) {
		imageVideo.style.zIndex = "-1";
	}
	setTimeout(() => {
		if (video.paused() && imageVideo.style.zIndex === "2") {
			video.load();
		}
	}, 2500);
});
video.on("ended", function () {
	imageVideo.style.zIndex = "2";
	video.load();
});
