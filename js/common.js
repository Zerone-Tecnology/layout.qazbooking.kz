const d = document;
const $q = d.querySelectorAll.bind(d);
const $g = d.querySelector.bind(d);

function moveHeader () {
	var header = document.querySelector("header");
	if (window.scrollY >= 96)
		header.classList.add("active");
	else
		header.classList.remove("active");
}
window.addEventListener('scroll', moveHeader);

function openModal(id) {
  var modal = document.getElementById(id);
  modal.classList.add("show");
	$('body').css("overflow", "hidden");
}
function closeModal(id) {
  var modal = document.getElementById(id);
  modal.classList.remove("show");
	$('body').css("overflow", "auto");
}

function profile(index) {
	const $buttonList = $q('.user-item');
	const $contentList = $q('.right');
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
	const $list = $g(`#${carouselId} .card-galery__mini-inner`);
	let active = 1;

	const getSlideIndex = ($slide) => {
		return [...$q(`#${carouselId} .carousel-item`)].indexOf( $slide );
	}

	const prevSlide = () => {
		const max = $q(`#${carouselId} .carousel-item`).length - 1;
		const main = $q(`#${carouselId} .card-galery__main .image`)
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
		const max = $q(`#${carouselId} .carousel-item`).length - 1;
		const main = $q(`#${carouselId} .card-galery__main .image`)
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
