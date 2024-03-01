// Variables
const d = document;
const $q = d.querySelectorAll.bind(d);
const $g = d.querySelector.bind(d);

// Header
let prevScrollPosition = window.pageYOffset;
function moveHeader () {
  const currentScrollPos = window.pageYOffset;
	
	let header = $g('header');
	if (!(prevScrollPosition < currentScrollPos) || currentScrollPos < 82)
		header.classList.remove('active');
	else
		header.classList.add('active');

	prevScrollPosition = currentScrollPos;
}
window.addEventListener('scroll', moveHeader);

// Calendar
const dateInputs = $q('.search-date');
dateInputs.forEach(dateInput => {
  if (dateInput) {
    dateInput.addEventListener('click', function(event) {
      dateInput.select();
    });
  }
});

function generateCalendar() {
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	today = new Date();
	currentMonth = today.getMonth();
	currentYear = today.getFullYear();
	selectYear = $g('#calendar_year');
	selectMonth = $g('#calendar_month');

	title = $g('#calendar-title');
	$g('#calendar_days').innerHTML = generateTableHeader(days);
	$g('#calendar_year').innerHTML = generateYear(2023, 2030);

	showCalendar(currentMonth, currentYear);
}

function generateYear(start, end) {
	let years = '';
	for (let year = start; year <= end; year++)
		years += "<option value='" + year + "'>" + year + "</option>";
	return years;
}

function generateTableHeader(days) {
	let dataHead = '<tr>';
	for (dhead in days) {
		dataHead += "<th class='calendar-title' data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
	}
	dataHead += '</tr>';

	return dataHead;
}

function showCalendar(month, year) {
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const firstDay = (new Date(year, month)).getDay();

	title.innerHTML = months[month] + ' ' + year;
	selectYear.value = year;
	selectMonth.value = month;

	table = $g('#calendar_body');
	table.innerHTML = '';

	// creating all cells
	let date = 1;
	for (let i = 0; i < 6; i++) {
		let row = d.createElement('tr');
		
		for (let j = 0; j < 7; j++) {
			if (i === 0 && j < firstDay) {
				cell = d.createElement('td');
				cellText = d.createTextNode('');
				cell.appendChild(cellText);
				row.appendChild(cell);
			} else if (date >	 daysInMonth(month, year)) {
				break;
			} else {
				cell = d.createElement('td');
				cell.setAttribute('data-date', date);
				cell.setAttribute('data-month', month + 1);
				cell.setAttribute('data-year', year);
				cell.setAttribute('data-month_name', months[month]);
				cell.className = 'calendar-item';
				cell.innerHTML = '<span>' + date + '</span>';

				if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth())
					cell.className = 'calendar-item selected';
				row.appendChild(cell);
				date++;
			}
		}
		table.appendChild(row);
	}
}

function nextMonth() {
	currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
	currentMonth = (currentMonth + 1) % 12;
	showCalendar(currentMonth, currentYear);
}

function previousMonth() {
	currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
	currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
	showCalendar(currentMonth, currentYear);
}

function jumpToDate() {
	currentYear = parseInt(selectYear.value);
	currentMonth = parseInt(selectMonth.value);
	showCalendar(currentMonth, currentYear);
}

function daysInMonth(iMonth, iYear) {
	return 32 - new Date(iYear, iMonth, 32).getDate();
}

// Modal
function handleModal(id) {
	let modal = $g(`#${id}`);
	if (modal.classList.length > 1) {
		modal.classList.remove('show');
		d.body.style.overflow = 'auto';
	} else {
		modal.classList.add('show');
		d.body.style.overflow = 'hidden';
	}
}

// Authentification
let activeAuth = 0;
function changeAuth() {
	const container = $g('#auth');
	const title = container.querySelector('.title');
	const buttons = container.querySelectorAll('.button-text');
	if (activeAuth === 0) {
		title.innerText = 'Вход';
		buttons[0].innerText = 'Войти';
		buttons[1].innerText = 'Регистрация';
		activeAuth++;
	} else {
		title.innerText = 'Регистрация';
		buttons[0].innerText = 'Регистрация';
		buttons[1].innerText = 'Войти';
		activeAuth--;
	}
}

// Menus
function handleMenu(id) {
	let menu = $g(`#${id}`);
	if (menu.classList.length > 1)
		menu.classList.remove('show');
	else
		menu.classList.add('show');
}

// Filter
d.addEventListener('DOMContentLoaded', function() {
	const inputs = $q('.field-input, .checkbox-input, .radio-input');
	const button = $g('#button_filter');
	const initialValue = $g('.field-input').value;

	function updateButtonState() {
		const atLeastOneChecked = Array.from(inputs).some(function(input) {
			if (input.type === 'number')
				return input.value.trim() !== '';
			else
				return input.checked;
		});

		if (atLeastOneChecked)
			button.classList.remove('disabled');
		else
			button.classList.add('disabled');
	}

	button.addEventListener('click', function() {
		$g('.field-input').value = initialValue;
		updateButtonState();
	});

	inputs.forEach(function(input) {
		input.addEventListener('click', updateButtonState);
		input.addEventListener('change', updateButtonState);
		input.addEventListener('input', updateButtonState);
	});
});

// Carousel / Slider
let activeSlider = 0;
function slider(id, full = false) {
	const container = $g(`#${id}`);
	const inner = container.querySelector('.carousel-inner');
	const list = container.getElementsByClassName('carousel-item');
	const mainImages = $q('.main_image .image');
	const width = list[0].offsetWidth;
	const length = list.length;
	const maxIndex = length - 1;

	function changeImage() {
		hideImages();
		mainImages[activeSlider].classList.add('active');
	}
	function hideImages() {
		for (let i = 0; i < length; i++) {
			mainImages[i].classList.remove('active');
		}
	}
	function updateTransform() {
		const newPosition = activeSlider * (width + 30);
		inner.style.transform = `translateX(-${newPosition}px)`;
	}
	function prevSlide() {
		if (activeSlider > 0)
			activeSlider--;
		updateTransform();
		changeImage();
	}
	function nextSlide() {
		if ((!full && activeSlider < maxIndex - 2) || (full && activeSlider < length - 1))
			activeSlider++;
		updateTransform();
		changeImage();
	}

	return { prevSlide, nextSlide };
}

function dragSlider(id) {
	const container = $g(`#${id}`);
	let isDown = false;
	let startX;
	let scrollLeft;

	container.addEventListener('mousedown', (e) => {
		isDown = true;
		container.classList.add('active');
		startX = e.pageX - container.offsetLeft;
		scrollLeft = container.scrollLeft;
	});
	container.addEventListener('mouseleave', () => {
		isDown = false;
		container.classList.remove('active');
	});
	container.addEventListener('mouseup', () => {
		isDown = false;
		container.classList.remove('active');
	});
	container.addEventListener('mousemove', (e) => {
		if (!isDown)
			return;
		e.preventDefault();
		const x = e.pageX - container.offsetLeft;
		const walk = (x - startX) * 3;
		container.scrollLeft = scrollLeft - walk;
	});
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
	$buttonList[index - 1].classList.add('active');
	$contentList[index - 1].classList.add('active');
}

function initializeCarousel(carouselId) {
	const $list = $g(`#${carouselId} .carousel-inner`);
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
		if (index < active)
			prevSlide();
		else if (index > active)
			nextSlide();
	}
	
	$list.addEventListener( 'focusin', chooseSlide );
}
