$(document).ready(function($) {

	$('.input_phone .input__wrap').mask('+7 (000) 000-00-00');

	$('.date-picker input').datepicker({
		firstDay: 0,
		dayNamesMin: ["Пн", "Вт", "Ср", "Чт", "Пт", "Ср", "Вс"],
		monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
	});


	var galleryList = $('.gallery__list'),
			galleryNav = $('.gallery__control');

	galleryList.slick({
		asNavFor: galleryNav,
		arrows: false
	});

	galleryNav.slick({
		slidesToShow: 3,
		asNavFor: galleryList,
		focusOnSelect: true,
		responsive: [{
			breakpoint: 1220,
			settings: {
				slidesToShow: 2	
			}}, {
			breakpoint: 767,
			settings: {
				slidesToShow: 1
			}
		}]
	});


	var reviewsItem = $('.reviews__item'),
			reviewsItemLength = reviewsItem.length,
			reviewsList = $('.reviews__list'),
			reviewsArrows = $('.reviews__arrows'),
			reviewsNum = $('.reviews__counts-num'),
			reviewsTotal = $('.reviews__counts-total');

	reviewsTotal.html(reviewsItemLength);

	reviewsList.slick({
		variableWidth: true,
		centerMode: true,
		appendArrows: reviewsArrows,
		responsive: [{
			breakpoint: 767,
			settings: {
				variableWidth: false,
				centerMode: false,
			}
		}]
	})

	reviewsList.on('afterChange', function(event, slick, direction){
	  reviewsNum.html(direction + 1);
	});

	new WOW().init();

	$('form .btn').click(function(event) {
		event.preventDefault();
		var form = $(this).parents('form');
				inputsRequired = form.find('.input_required'),
				inputsRequiredLength = inputsRequired.length,
				counter = 0;

		inputsRequired.each(function(index, el) {
			if ($(this).find('input').val() == '') {
				$(this).addClass('input_error');
			} else {
				$(this).removeClass('input_error');
				counter++;
			}
		});

		if (counter == inputsRequiredLength) {
			$.ajax({
		    type: "POST",
		    url: "order.php",
		    data: form.serialize()
				}).done(function() {
			    $.fancybox.close();
					$.fancybox.open({src  : '#popup-thanks',type : 'inline'});
			});

		}
	});
});
