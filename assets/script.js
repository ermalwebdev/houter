"use strict";
const sliderTop = document.querySelector(".carousel_container");
const carouselItems = document.querySelectorAll(".carousel_items");
const lastCarouselItem = carouselItems[carouselItems.length - 1];

let isPressed = false;
let cursorX;
let isatEnd = true;
// Libraries
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
const pathFills = document.querySelectorAll(".path_arrows");
swiper.on("slideChange", function () {
	if (swiper.isEnd) {
		console.log("ermal");
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

const arrowLandR = document.querySelectorAll(".arrows");
const houseContainerSlider = document.querySelector(".houses_container");
const allHouseSlider = document.querySelector(".all_houses");
const housesCard = document.querySelectorAll(".house_card");

pathFills.forEach(index => {
	index.setAttribute("fill", "white");
});
const videoContainer = document.querySelector(".video_img_sell_info");
const imageVideo = document.querySelector(".image_preview_container");

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

const hamburgerOpenClose = document.querySelector(".hamburger_link");
const menuContainer = document.querySelector(".nav_header");
const hamburgerIcon = document.querySelectorAll(".svg_icon_burger");

hamburgerOpenClose.addEventListener("click", function () {
	if (hamburgerIcon[0].classList.contains("active")) {
		hamburgerIcon[0].classList.remove("active");
		hamburgerIcon[1].classList.add("active");
		menuContainer.style.display = "block";
		document.querySelector("html").style.overflow = "hidden";
		document.querySelector("body").style.position = "fixed";
		document.querySelector("body").style.top = "0px";
	} else {
		hamburgerIcon[1].classList.remove("active");
		hamburgerIcon[0].classList.add("active");
		menuContainer.style.display = "none";
		document.querySelector("html").style.overflow = "";
		document.querySelector("body").style.position = "";
	}
});
