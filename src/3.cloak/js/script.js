$(document).ready(function(){
    $('.carousel__inner').slick({        
    speed: 1200,
    adaptiveHeight: false,
    prevArrow: '<button type="button" class="slick-prev"><img src="../dist/img/icons/chevron-left.png"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="../dist/img/icons/chevron-right.png"></button>',
    responsive: [{
            breakpoint: 992,
            settings: {
              dots: true,
              arrows: false
            }
}]});
    
$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
  $(this)
    .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
    .closest('div.container').find('div.catalog__main-content').removeClass('catalog__main-content_active').eq($(this).index()).addClass('catalog__main-content_active');
});

function toggleSlide(item) {
  $(item).each(function(i) {
      $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog__content').eq(i).toggleClass('catalog__content_active');
          $('.catalog__list').eq(i).toggleClass('catalog__list_active');
      })
  });
};

toggleSlide('.catalog__link');
toggleSlide('.catalog__back');

$('[data-modal=consultation]').on('click', function () {
  $('.overlay, #consultation').fadeIn();
});

$('.modal__close').on('click', function () {
  $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
});

// $('.button_mini').on('click', function () {
//   $('.overlay, #order').fadeIn();
// });

$('.button_mini').each(function(i){
  $(this).on('click', function() {
    $('#order .modal__descr').text($('.catalog__subtitle').eq(i).text());
    $('.overlay, #order').fadeIn();
  })
});

function valideForms(form){
  $(form).validate({
    rules: {
      name: "required",
      phone: "required",
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: "Введите свои имя",
      email: "Введите свой реальный email",
      phone: "Введите свой телефон"
      }
  });
};

valideForms('#consultation-form');
valideForms('#order form');
valideForms('#consultation form');

$(function(){
  $("input[name=phone]").mask("+375(29) 999-99-99")});

$('form').submit(function(e){
  e.preventDefault();
  if (!$(this).valid()) {
    return;
  }
  $.ajax({
    type: "POST",
    url: "mailer/smart.php",
    data: $(this).serialize()
  }).done(function() {
    $(this).find("input").val("");
    $('#consultation, #order').fadeOut();
    $('.overlay, #thanks').fadeIn('slow');
    $('form').trigger('reset');
  });
  return false;
});

$(window).scroll(function(){
  if($(this).scrollTop() > 1600) {
    $('.pageup').fadeIn();
  } else {
    $('.pageup').fadeOut();
  }
});

});