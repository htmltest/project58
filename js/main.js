"use strict";

$(function () {

    var App = function () {

        return {
            init: function init() {
                DummyModule.init();
                MenuBehaviour.init();
                FlatsChoose.init();
                Gallery.init();
                SimpleSlider.init();
                Map.init();
                MainSlider.init();
                SimpleSelect.init();
                TouchEvents.init();
                Popups.init();
                ClickableTables.init();
                Fady.init();
                Flatbar.init();
                Countdown.init();

                SmoothLoading.init();

                // Forms validation and handling
                FormCallback.init();
                FormSend.init();
                FormRequest.init();

                $('.form-checkbox span input:checked').parent().parent().addClass('checked');
                $('.form-checkbox').click(function() {
                    $(this).toggleClass('checked');
                    $(this).find('input').prop('checked', $(this).hasClass('checked')).trigger('change');
                });

                $('.form-radio span input:checked').parent().parent().addClass('checked');
                $('.form-radio').click(function() {
                    var curName = $(this).find('input').attr('name');
                    $('.form-radio input[name="' + curName + '"]').parent().parent().removeClass('checked');
                    $(this).addClass('checked');
                    $(this).find('input').prop('checked', true).trigger('change');
                });


            }
        };
    }()

    /**
     * Dummy Module Example
     */
    ,
        MenuBehaviour = function () {
        return {
            init: function init() {
                var $btn = $(".header__navigation");
                var $nav = $("#nav");
                var $overlay = $(".nav__overlay");
                var $header = $("#header");

                if (!$btn.length) return false;

                $btn.on('click', function () {
                    $nav.toggleClass('nav--active');
                    $btn.toggleClass('header__navigation--toggled');
                    $overlay.toggleClass('nav__overlay--active');
                    $header.toggleClass('nav-opened');

                    return false;
                });
            }
        };
    }(),
        FlatsChoose = function () {
        return {
            init: function init() {
                var $btn = $(".flats-menu__caller");
                var $menu = $btn.parents('.flats-choose__menu');
                var $overlay = $(".flats-choose__overlay");
                var $clear_btn = $("#clear_btn");
                var class2toggle = 'flats-choose__menu--active';

                var ww = $(window).width() < window.screen.width ? $(window).width() : window.screen.width;

                if (ww > 768) {
                    $menu.height($(".layout-main").height() + 40);
                } else {
                    $menu.height($(".layout-main").height() + $(".layout-footer").height() + 40);
                }


                $('.flat__scheme--links a').click(function () {
                    var curLink = $(this);
                    if (!curLink.hasClass('active')) {
                        $('.flat__scheme--links a.active').removeClass('active');
                        curLink.addClass('active');
                        $('.flat__scheme img').attr('src', curLink.attr('href'));
                    }
                    return false;
                });

                if (!$btn.length) return false;

                $btn.on('click', function () {
                    $menu.toggleClass(class2toggle);
                    // if ( $menu.hasClass(class2toggle) ) {
                    //     $menu.height( $(".layout-main").height() + $(".layout-footer").height() + 40);
                    // }

                    $overlay.toggleClass('flats-choose__overlay--active');
                    return false;
                });

                $('.typography a.flats-choose__empty-change-link').click(function () {
                    $(".flats-menu__caller").click();
                    return false;
                });

                $clear_btn.on('click', function () {
                    $(".flats-menu__select").each(function (i, e) {
                        $(e).prop('selectedIndex', 0).simpleselect("refreshContents");
                    });
                    return false;
                });
            }
        };
    }(),
        Gallery = function () {
        return {
            init: function init() {
                if (!$('.gallery__list').length) return false;

                $('.gallery__list').slick({
                    dots: true,
                    infinite: true,
                    speed: 500,
                    cssEase: 'linear',
                    slide: '.gallery__image',
                    prevArrow: $('.gallery__control--prev'),
                    nextArrow: $('.gallery__control--next')
                });
                $('.gallery__list').on('afterChange', function(event, slick, currentSlide, nextSlide){
                    $('.gallery__title').html($('.slick-current').attr('title'));
                });
                $('.gallery__title').html($('.slick-current').attr('title'));
            }
        };
    }(),
        SimpleSlider = function () {
        return {
            init: function init() {
                if (!$('.simple-slider').length) return false;

                $('.simple-slider').slick({
                    dots: false,
                    infinite: true,
                    speed: 500,
                    cssEase: 'linear',
                    slide: 'img',
                    arrows: false
                });
            }
        };
    }(),
        MainSlider = function () {
        return {
            init: function init() {
                if (!$('.main-slider__slides').length) return false;

                $('.main-slider__slides').slick({
                    dots: true,
                    infinite: true,
                    speed: 500,
                    cssEase: 'linear',
                    slide: 'div',
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 4000
                });
            }
        };
    }(),
        SimpleSelect = function () {
        return {
            init: function init() {
                if ($('.flat-search__select').length) {
                    $('.flat-search__select').simpleselect();
                }

                if ($('.flats-menu__select').length) {
                    $(".flats-menu__select").simpleselect();
                }
            }
        };
    }(),
        SmoothLoading = function () {
        window.RATIO_SET = 0;

        var SL = {};
        SL.checkFlag = function (cb) {
            if (RATIO_SET == 0) {
                window.setTimeout(function () {
                    SL.checkFlag(cb);
                }, 30);
            } else {
                cb();
            }
        };

        SL.init = function (mode) {
            var $whiteoverlay = $("#white_overlay");

            if (mode) {
                $whiteoverlay.hide();
                return false;
            }

            SL.checkFlag(function () {
                $whiteoverlay.fadeOut();
            });
        };

        return SL;
    }(),
        TouchEvents = function () {
        return {
            init: function init() {

                var $flatsMenuCaller = $("#flats-menu__caller");
                var $flatsMenu = $(".flats-choose__menu");

                if ($flatsMenuCaller.length) {
                    var mc = new Hammer.Manager($flatsMenuCaller[0], {
                        recognizers: [[Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }]]
                    });

                    mc.on('swipe', function (e) {
                        if ($flatsMenu.hasClass('flats-choose__menu--active')) {
                            if (e.offsetDirection == Hammer.DIRECTION_LEFT) {
                                $flatsMenuCaller.trigger('click');
                                return false;
                            }
                        } else {
                            if (e.offsetDirection == Hammer.DIRECTION_RIGHT) {
                                $flatsMenuCaller.trigger('click');
                                return false;
                            }
                        }
                    });

                    var mc2 = new Hammer.Manager($flatsMenu[0], {
                        recognizers: [[Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }]]
                    });

                    mc2.on('swipe', function (e) {
                        if ($flatsMenu.hasClass('flats-choose__menu--active')) {
                            if (e.offsetDirection == Hammer.DIRECTION_LEFT) {
                                $flatsMenuCaller.trigger('click');
                                return false;
                            }
                        }
                    });
                }

                var $nav = $("#nav");
                var $navCaller = $(".header__navigation");

                var mc3 = new Hammer.Manager($nav[0], {
                    recognizers: [[Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }]]
                });

                mc3.on('swipe', function (e) {
                    if ($nav.hasClass('nav--active')) {
                        if (e.offsetDirection == Hammer.DIRECTION_LEFT) {
                            $navCaller.trigger('click');
                            return false;
                        }
                    }
                });

                // Flat page (swipes between flat pages)
                var $go_upper_link_prev = $(".flat__go--prev");

                if ($go_upper_link_prev.length) {
                    var mc4 = new Hammer.Manager($go_upper_link_prev[0], {
                        recognizers: [[Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }]]
                    });
                    mc4.on('swipe', function (e) {
                        if (e.offsetDirection == Hammer.DIRECTION_RIGHT) {
                            document.location.href = $go_upper_link_prev.attr('href');
                            return false;
                        }
                    });
                }

                var $go_upper_link_next = $(".flat__go--next");

                if ($go_upper_link_next.length) {
                    var mc5 = new Hammer.Manager($go_upper_link_next[0], {
                        recognizers: [[Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }]]
                    });
                    mc5.on('swipe', function (e) {
                        if (e.offsetDirection == Hammer.DIRECTION_LEFT) {
                            document.location.href = $go_upper_link_next.attr('href');
                            return false;
                        }
                    });
                }
            }
        };
    }(),
        Map = function () {
        return {
            init: function init() {
                if (!$("#map").length) return false;

                var map;
                ymaps.ready(function () {
                    var x = 56.138585;
                    var y = 40.384675;

                    map = new ymaps.Map("map", {
                        center: [x, y],
                        zoom: 16,
                        controls: []
                    });

                    var myPlacemark = new ymaps.Placemark([x, y], {}, {
                        iconLayout: 'default#image',
                        iconImageHref: 'img/placemark.png',
                        iconImageSize: [90, 115],
                        iconImageOffset: [-45, -115]
                    });

                    map.geoObjects.add(myPlacemark);
                });
            }
        };
    }(),
        Popups = function () {
        var $popup_request = $(".flat__popup-request.popup-request");
        var $btn_request = $("#request_btn");
        var $popup_send = $(".flat__popup-send.popup-send");
        var $btn_send = $("#send_btn");
        var $popup_callback = $(".flat__popup-callback.popup-callback");
        var $btn_callback = $("#callback_btn");

        var $popups = $(".popup-general");
        var $overlays = $(".popup-overlay-general");

        if ($("#callback_phone").length) $("#callback_phone").mask("+7 (999) 999-99-99");
        if ($("#request_phone").length) $("#request_phone").mask("+7 (999) 999-99-99");

        return {
            init: function init() {
                $btn_request.on('click', function () {
                    $popup_request.toggleClass('active');
                    $('.page').css({ 'position': 'static', 'overflow': 'hidden' });
                    $popup_request.find("input").first().focus();

                    return false;
                });

                $(".popup-request__close").on("click", function () {
                    $popup_request.toggleClass('active');
                    $('.page').css({ 'overflow': 'auto' });

                    return false;
                });

                $btn_send.on('click', function () {
                    $popup_send.toggleClass('active');
                    $('.page').css({ 'position': 'static', 'overflow': 'hidden' });
                    $popup_send.find("input").first().focus();

                    return false;
                });

                $(".popup-send__close").on("click", function () {
                    $popup_send.toggleClass('active');
                    $('.page').css({ 'overflow': 'auto' });

                    return false;
                });

                $btn_callback.on('click', function () {
                    $popup_callback.toggleClass('active');
                    $('.page').css({ 'position': 'static', 'overflow': 'hidden' });
                    $popup_callback.find("input").first().focus();

                    return false;
                });

                $(".popup-callback__close").on("click", function () {
                    $popup_callback.toggleClass('active');
                    $('.page').css({ 'overflow': 'auto' });

                    return false;
                });

                $overlays.on("click", function () {
                    $popups.removeClass('active');
                    $('.page').css({ 'overflow': 'auto' });
                });
            }
        };
    }()

    /**
     * ClickableTables
     */
    ,
        ClickableTables = function () {
        return {
            init: function init() {
                $("tr[data-href]").on('click', function (e) {
                    window.document.location = $(e.currentTarget).attr("data-href");
                });
            }
        };
    }(),
        FormCallback = function () {
        return {
            init: function init() {
                var $form = $("#form_callback");
                if (!$form.length) return false;

                $form.validate({
                    messages: {
                        email: "Пожалуйста, укажите корректный email",
                        surname: "Пожалуйста, укажите Ваше имя",
                        phone: "Пожалуйста, укажите номер телефона"
                    },
                    submitHandler: function submitHandler(form) {
                        // сюда процесс сабмита вставляем
                        // $(form).ajaxSubmit();
                        return false;
                    }
                });
            }
        };
    }(),
        FormSend = function () {
        return {
            init: function init() {
                var $form = $("#form_send");
                if (!$form.length) return false;

                $form.validate({
                    messages: {
                        email: {
                            required: "Пожалуйста, укажите адрес Вашей электронной почты",
                            email: "Пожалуйста, введите корректный адрес электронной почты"
                        }
                    },
                    submitHandler: function submitHandler(form) {
                        // сюда процесс сабмита вставляем
                        // $(form).ajaxSubmit();
                        return false;
                    }
                });
            }
        };
    }(),
        FormRequest = function () {
        return {
            init: function init() {
                var $form = $("#form_request");
                if (!$form.length) return false;

                $form.validate({
                    messages: {
                        surname: "Пожалуйста, укажите Ваше имя",
                        phone: "Пожалуйста, укажите номер телефона",
                        email: {
                            required: "Пожалуйста, укажите адрес Вашей электронной почты",
                            email: "Пожалуйста, введите корректный адрес электронной почты"
                        }
                    },
                    submitHandler: function submitHandler(form) {
                        // сюда процесс сабмита вставляем
                        // $(form).ajaxSubmit();
                        return false;
                    }
                });
            }
        };
    }()

    /**
     * Fady
     */
    ,
        Fady = function () {
        return {
            init: function init() {
                var $F = $("#fady");

                if (!$F.length) return false;

                var sTransitionEndEvt = 'transitionend webkitTransitionEnd oTransitionEnd';
                $F.addClass('disabled').on(sTransitionEndEvt, function () {
                    $F.remove();
                });

                // на случай если transition не была запущена вовсе
                window.setTimeout(function () {
                    if ($F.length) $F.remove();
                }, 400);
            }
        };
    }()

    /**
     * Dummy Module Example
     */
    ,
        Flatbar = function () {
        return {
            init: function init() {
                var $fca = $("#flatbar__caller");
                var $fcl = $("#flatbar__close");

                if (!$fca.length) return false;

                $fca.on('click', function (e) {
                    $(e.currentTarget).parents('.flatbar').toggleClass('flatbar--closed');
                    return false;
                });

                $fcl.on('click', function (e) {
                    $(e.currentTarget).parents('.flatbar').addClass('flatbar--closed');
                    return false;
                });
            }
        };
    }(),
        Countdown = function () {
        return {
            init: function init() {
                if (!$("#countdown").length) return false;

                var newYear = new Date($("#countdown").attr('data-countdown-to'));
                $('#countdown').countdown({
                    until: newYear,
                    layout: $('#countdownLayout').html()
                });
            }
        };
    }()

    /**
     * Dummy Module Example
     */
    ,
        DummyModule = function () {
        return {
            init: function init() {
                // do something
            }
        };
    }();App.init();
});
