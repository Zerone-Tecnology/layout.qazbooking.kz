$(function() {

	$('.slider').owlCarousel({
		items: 4,
		dots: false,
		nav: true,
	});

	$('.reviews-slider').owlCarousel({
		items: 3,
		nav: true,
	});

});

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
