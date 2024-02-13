const d = document;
const $q = d.querySelectorAll.bind(d);
const $g = d.querySelector.bind(d);

function openModal() {
  var modal = document.getElementById("modal");
  modal.classList.add("show");
	$('body').css("overflow", "hidden");
}
function closeModal() {
  var modal = document.getElementById("modal");
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
