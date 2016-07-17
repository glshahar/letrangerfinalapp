
    jQuery(document).ready(function ($) {
    var options = { $AutoPlay: false };
    var jssor_slider1 = new $JssorSlider$('slider1_container', options);
    });

    $(document).ready(function () {
       $("#left").click(function () {
       var leftPos = $('.designersName').scrollLeft();
       $(".designersName").animate({scrollLeft: leftPos + 250}, 600);
  		});
	});


