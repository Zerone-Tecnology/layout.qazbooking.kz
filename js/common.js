let prevScrollPosition = window.pageYOffset;
function moveHeader () {
  const currentScrollPos = window.pageYOffset;
	
	var header = document.querySelector("header");
	if (prevScrollPosition < currentScrollPos)
		header.classList.add("active");
	else
		header.classList.remove("active");

	prevScrollPosition = currentScrollPos;
}
window.addEventListener('scroll', moveHeader);

function openModal(id) {
  var modal = document.getElementById(id);
  modal.classList.add("show");
	document.body.style.overflow = "hidden";
}
function closeModal(id) {
  var modal = document.getElementById(id);
  modal.classList.remove("show");
	document.body.style.overflow = "auto";
}

let activeAuth = 0;
function changeAuth() {
	const container = document.getElementById('auth');
	const title = container.querySelector('.title');
	const buttons = container.querySelectorAll('.button-text');
	if (activeAuth === 0) {
		title.innerText = "Вход";
		buttons[0].innerText = "Войти";
		buttons[1].innerText = "Регистрация";
		activeAuth++;
	} else {
		title.innerText = "Регистрация";
		buttons[0].innerText = "Регистрация";
		buttons[1].innerText = "Войти";
		activeAuth--;
	}
}

function handleSortMenu() {
	var menu = document.getElementById('sorting_menu');
	if (menu.classList.length > 1)
		menu.classList.remove("show");
	else
		menu.classList.add("show");
}

function profile(index) {
	const $buttonList = document.querySelectorAll.bind(document)('.user-item');
	const $contentList = document.querySelectorAll.bind(document)('.right');
	$buttonList.forEach(function(element) {
		element.classList.remove('active');
	});
	$contentList.forEach(function(element) {
		element.classList.remove('active');
	});
	$buttonList[index - 1].classList.add("active");
	$contentList[index - 1].classList.add("active");
}

function slider(id) {
	var active = 0;
	const container = document.getElementById(id);
	const list = container.getElementsByClassName('carousel-item');
	const width = list[0].offsetWidth;
	const length = list.length;
	const maxIndex = length - 1;

	function prevSlide() {
		console.log(active);
		if (active > 0) {
			active--;
			console.log(active);
			const newPosition = active * (width + 30);
			container.style.transform = `translateX(-${newPosition}px)`;
		}
	}
	function nextSlide() {
		console.log(active);
		if (active < maxIndex) {
			active++;
			console.log(active);
			const newPosition = active * (width + 30);
			container.style.transform = `translateX(-${newPosition}px)`;
		}
	}

	return { prevSlide, nextSlide };
}

function initializeCarousel(carouselId) {
	const $list = document.querySelector.bind(document)(`#${carouselId} .card-galery__mini-inner`);
	let active = 1;

	const getSlideIndex = ($slide) => {
		return [...document.querySelectorAll.bind(document)(`#${carouselId} .carousel-item`)].indexOf( $slide );
	}

	const prevSlide = () => {
		const max = document.querySelectorAll.bind(document)(`#${carouselId} .carousel-item`).length - 1;
		const main = document.querySelectorAll.bind(document)(`#${carouselId} .card-galery__main .image`)
		let newPosition;
		main[active].style.opacity = '0';
		if (1 < active) {
			newPosition = (active - 2) * 97;
			active -= 1;
		}
		else {
			newPosition = (max - 2) * 97;
			active = max - 1;
		}
		main[active].style.opacity = '1';
		$list.style.transform = `translateX(-${newPosition}px)`;
	}

	const nextSlide = () => {
		const max = document.querySelectorAll.bind(document)(`#${carouselId} .carousel-item`).length - 1;
		const main = document.querySelectorAll.bind(document)(`#${carouselId} .card-galery__main .image`)
		let newPosition;
		main[active].style.opacity = '0';
		if (max - 1 > active) {
			newPosition = active * 97;
			active += 1;
		}
		else {
			newPosition = 0;
			active = 1;
		}
		main[active].style.opacity = '1';
		$list.style.transform = `translateX(-${newPosition}px)`;
	}

	const chooseSlide = (e) => {
		const $slide = e.target.closest(`.carousel-item`);
		const index = getSlideIndex($slide);
		console.log($slide);
		if (index < active) {
			prevSlide();
		} else if (index > active) {
			nextSlide();
		}
	}
	
	$list.addEventListener( "focusin", chooseSlide );
}
