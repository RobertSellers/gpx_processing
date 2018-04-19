  /* ----- Navigation ----- */

  $('.nav').find('a').attr('tabindex', -1);

  $('.nav-btn').on('click', function () {
    if ($('.nav-wrap').hasClass('is-open')) {
      $('.nav-wrap').removeClass('is-open');
      $('.nav').attr('aria-hidden', true);
      $('.nav-btn').attr('aria-expanded', false);
      $('.nav').find('a').attr('tabindex', -1);
    } else {
      $('.nav-wrap').addClass('is-open');
      $('.nav-wrap').addClass('is-fixed');
      $('.nav-btn').addClass('is-active');
      $('.nav').attr('aria-hidden', false);
      $('.nav-btn').attr('aria-expanded', true);
      $('.nav').find('a').attr('tabindex', 0);
    }
  });

  $('.nav-wrap').on('transitionend', function () {
    if (!$('.nav-wrap').hasClass('is-open')) {
      $('.nav-wrap').removeClass('is-fixed');
      $('.nav-btn').removeClass('is-active');
    }
  });

  $('.nav-wrap').on('keypress', function (e) {
    switch (e.keyCode) {
      case 27:
        $('.nav-wrap').removeClass('is-open');
        $('.nav').attr('aria-hidden', true);
        $('.nav-btn').attr('aria-expanded', false);
        $('.nav').find('a').attr('tabindex', -1);
        $('.nav-btn').focus();
        break;
    }
  });

  /* ----- Tabs ----- */

  var $tabs = $('.tabs');
  var $panels = $('.tab-panel');

  $tabs.on('click', 'a', function (e) {
    e.preventDefault();

    var id = $(this).attr('href');

    $panels.filter('[aria-hidden="false"]').attr('aria-hidden', true);
    $tabs.find('[aria-selected="true"]').attr('aria-selected', false);

    $(this).attr('aria-selected', true);
    $(id).attr('aria-hidden', false);
  });

//////////////////////////////
//Ajax spinLoad Bar
//////////////////////////////

$(document).ajaxStart(function() {
$(".spinLoad").show();
});

$(document).ajaxStop(function() {
$(".spinLoad").hide();
});

//R output to popup
function successmsg(text){
    $("#successdiv").empty().append('<div class="alert alert-success alert-dismissable">' + text + '</div>');
  
  }
  
//R output to popup
function errormsg(text){
    $("#errordiv").empty().append('<div class="alert alert-danger alert-dismissable">' + text + '</div>');
}