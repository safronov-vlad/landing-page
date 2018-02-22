// $(document).ready(function(){
//
//     function formatTime(time, hours) {
//         if (hours) {
//             var h = Math.floor(time / 3600);
//             time = time - h * 3600;
//
//             var m = Math.floor(time / 60);
//             var s = Math.floor(time % 60);
//
//             return h.lead0(2)  + ":" + m.lead0(2) + ":" + s.lead0(2);
//         } else {
//             var m = Math.floor(time / 60);
//             var s = Math.floor(time % 60);
//
//             return m.lead0(2) + ":" + s.lead0(2);
//         }
//     }
//
//     Number.prototype.lead0 = function(n) {
//         var nz = "" + this;
//         while (nz.length < n) {
//             nz = "0" + nz;
//         }
//         return nz;
//     };
//
//     var controls = {
//         video: $("#video"),
//         playpause: $("#playnpause"),
//         total: $("#total"),
//         buffered: $("#buffered"),
//         progress: $("#current"),
//         duration: $("#duration"),
//         currentTime: $("#currenttime"),
//         hasHours: false,
//         // togglePlayback: function () {
//         //     (video.paused) ? video.play() : video.pause()
//         // }
//     }
//
//     var video = controls.video[0];
//
//
//     $('.videocontainer__starter').click(function(){
//         video.play();
//         $(this).hide();
//         $(video).css('opacity', '1');
//         $('.controls').addClass('active');
//         if(video && video.buffered && video.buffered.length > 0 && video.buffered.end && video.duration){
//             video.addEventListener("progress", function() {
//                 var buffered = Math.floor(video.buffered.end(0)) / Math.floor(video.duration);
//                 controls.buffered[0].style.width =  Math.floor(buffered * controls.total.width()) + "px";
//             }, false);
//             console.log('good');
//         }
//     })
//     controls.playpause.click(function(){
//         if(video.paused) {
//             video.play();
//             $(this).html('<img src="img/pause.svg">');
//         }
//         else {
//             video.pause();
//             $(this).html('<img src="img/play.svg">');
//         }
//         $(this).toggleClass("paused");
//
//
//     });
//
//     video.addEventListener("canplay", function() {
//         controls.hasHours = (video.duration / 3600) >= 1.0;
//         controls.duration.text(formatTime(video.duration, controls.hasHours));
//         controls.currentTime.text(formatTime(0),controls.hasHours);
//     }, false);
//
//     video.addEventListener("timeupdate", function() {
//         controls.currentTime.text(formatTime(video.currentTime, controls.hasHours));
//         var progress = Math.floor(video.currentTime) / Math.floor(video.duration);
//         controls.progress[0].style.width = Math.floor(progress * controls.total.width()) + "px";
//     }, false);
//
//     // video.addEventListener("progress", function() {
//     //     var buffered = Math.floor(video.buffered.end(0)) / Math.floor(video.duration);
//     //     controls.buffered[0].style.width =  Math.floor(buffered * controls.total.width()) + "px";
//     // }, false);
//
//     controls.total.click(function(e) {
//         var x = (e.pageX - $(this).offset().left)/$(this).width();
//         video.currentTime = x * video.duration;
//     });
//
// });
//END VIDEO
$(document).ready(function(){
    // $(".wrap").onepage_scroll({
    //     loop: false,
    //     beforeMove: function(e) {
    //         if($($('.wrap section')[0]).hasClass('active')){
    //             $('.header_fixed').removeClass('active');
    //         }
    //         else{
    //             $('.header_fixed').addClass('active');
    //         }
    //         $($('.navigate_list__navigate_item')[e-1]).addClass('active')
    //         $($('.navigate_list__navigate_item')[e-1]).siblings().removeClass('active')
    //     },
    //     afterMove: function(e) {
    //         $($('.wrap section')[e-1]).addClass('animations')
    //         $($('.wrap section')[e-1]).siblings().removeClass('animations')
    //         $($('.wrap section')[e-1]).find('.block__item').each(function(){$(this).addClass('fadeInUpBig')})
    //     }
    // })
    //
    my_func = function(e){
        $($('.navigate_list__navigate_item')[e]).addClass('active')
        $($('.navigate_list__navigate_item')[e]).siblings().removeClass('active')
        $('.wrap').animate({ scrollTop : $('.wrap').scrollTop() + $('.site_container > section[data-id=' + e + ']').offset().top }, 600)
    }
    // $('body').on('click', '.navigate_list__navigate_item', function(){
    //     my_func(parseInt($(this).find('a').attr('data-id')))
    // })

    $('.slick').slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: false,
        pauseOnHover: false,
        pauseOnDotsHover: true,
    })


    //детище
    //вкл выкл скролл
    var keys = {37: 1, 38: 1, 39: 1, 40: 1};

    preventDefault = function(e) {
      e = e || window.event;
      if (e.preventDefault)
          e.preventDefault();
      e.returnValue = false;
    }

    preventDefaultForScrollKeys = function(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    disableScroll = function() {
      if (window.addEventListener) // older FF
          window.addEventListener('DOMMouseScroll', preventDefault, false);
      window.onwheel = preventDefault; // modern standard
      window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
      window.ontouchmove  = preventDefault; // mobile
      document.onkeydown  = preventDefaultForScrollKeys;
    }

    enableScroll = function() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        params = {
            windowH : $(window).height(),
            scroll_to_delay : 250,
            speed : 250,
        }

        $($('.container > section')[0]).addClass('active')

        document.addEventListener('scroll', function (event) {
            //change data-current
            if( $('.container > section.active').offset().top < - ( params.windowH / 2 ) ){
                $('.container > section.active').removeClass('active').next().addClass('active');
                $('.container').css('background',$(e + ' > section.active').data('color'));
            }
            else if ( $(e + ' > section.active').offset().top > params.windowH / 2 ){
                $('.container > section.active').removeClass('active').prev().addClass('active');
                $('.container').css('background',$(e + ' > section.active').data('color'));
            }
        }, true)
        $(window).resize(function(){
            params.windowH = $(window).height()
        })
    }
    else {
        iscroll = function (e) {
            //параметры
            params = {
                windowH: $(window).height(), // ширина окна
                scroll_to_delay: 250, // делей срабатывания прилипания
                speed: 250, // скорость прилипания
                color_speed: 500, // скорость смены цвета
                change_color: false, // вкл смена цвета
                paralax_fogging: true, // вкл паралакс
                maximum_opacity: .5, //максимальный % затемнения ( от 0 до 1 )
            }
            one_percent = params.windowH / 100
            //выставление параметров при загрузке страницы
            $($(e + ' > section')[0]).addClass('active')
            for (i = 0; i < $(e + ' > section').length; i++) {
                $($(e + ' > section')[i]).attr('data-id', i)
                if (!$($(e + ' > section')[i]).attr('data-color')) {
                    $($(e + ' > section')[i]).append('<div class="fogged"></div>')
                }
                else if ($($(e + ' > section')[i]).attr('data-color')) {
                    if (!$($($(e + ' > section')[i]).next()[0]).attr('data-color')) {
                        $($(e + ' > section')[i]).append('<div class="fogged"></div>')
                    }
                }
            }
            $(e + ' > section[data-color]').css('background', $($(e + ' > section[data-color]')[0]).data('color'))
            flag = false
            curr_position = 0
            //функция прокрутки
            move = function () {
                //фиксирование стандартного блока
                if ($(e + ' > section.active').height() == params.windowH) {
                    len = 0
                    for (i = 0; i < $(e + ' > section').length; i++) {
                        if (!$($(e + ' > section')[i]).hasClass('active')) {
                            len += $($(e + ' > section')[i]).height()
                        }
                        else {
                            disableScroll()
                            $.when($('.wrap').animate({scrollTop: len}, params.speed)).then(function () {
                                enableScroll();
                                return
                            })
                        }
                    }
                }
                else {
                    //если видно следующий блок, делаем так чтобы видно не было
                    if ($(e + ' > section.active').next()[0]) {
                        //фиксирование расширенного блока: true = низ блока / else = верх блока
                        if ($(e + ' > section.active').next().offset().top - params.windowH < 0) {
                            len = 0
                            for (i = 0; i < $(e + ' > section').length; i++) {
                                if (!$($(e + ' > section')[i]).hasClass('active')) {
                                    len += $($(e + ' > section')[i]).height()
                                }
                                else {
                                    disableScroll()
                                    $.when($('.wrap').animate({scrollTop: len + $(e + ' > section.active').height() - params.windowH}, params.speed)).then(function () {
                                        enableScroll();
                                        return
                                    })
                                }
                            }
                        }
                        else if ($(e + ' > section.active').offset().top > 0) {
                            len = 0
                            for (i = 0; i < $(e + ' > section').length; i++) {
                                if (!$($(e + ' > section')[i]).hasClass('active')) {
                                    len += $($(e + ' > section')[i]).height()
                                }
                                else {
                                    disableScroll()
                                    $.when($('.wrap').animate({scrollTop: len}, params.speed)).then(function () {
                                        enableScroll();
                                        return
                                    })
                                }
                            }
                        }
                    }
                    else {
                        //если видно предыдущий блок, делаем так чтобы видно не было
                        if ($(e + ' > section.active').offset().top > 0) {
                            len = 0
                            for (i = 0; i < $(e + ' > section').length; i++) {
                                if (!$($(e + ' > section')[i]).hasClass('active')) {
                                    len += $($(e + ' > section')[i]).height()
                                }
                                else {
                                    disableScroll()
                                    $.when($('.wrap').animate({scrollTop: len}, params.speed)).then(function () {
                                        enableScroll();
                                        return
                                    })
                                }
                            }
                        }
                    }
                }
            }

            //проверка что прокрутка еще идет
            check_scroll = function () {
                if (curr_position != $('.wrap').scrollTop()) {
                    curr_position = $('.wrap').scrollTop()
                    setTimeout(function () {
                        check_scroll()
                    }, params.scroll_to_delay)
                }
                else {
                    move()
                    flag = false
                }
            }

            //обраобтичк прокрутки
            document.addEventListener('scroll', function (event) {
                //переключение авктивного блока
                if ($(e + ' > section.active').offset().top < -(($(e + ' > section.active').height() - params.windowH) + params.windowH / 2 )) {
                    $(e + ' > section.active').removeClass('active').next().addClass('active');
                    $($('.navigate_list__navigate_item')[$(e + ' > section.active').data('id')]).addClass('active')
                    $($('.navigate_list__navigate_item')[$(e + ' > section.active').data('id')]).siblings().removeClass('active')
                    if ($(e + ' > section.active').data('color')) {
                        $(e + ' > section[data-color]').css('background', $(e + ' > section.active').data('color'))
                    }
                }
                else if ($(e + ' > section.active').offset().top > params.windowH / 2) {
                    $(e + ' > section.active').removeClass('active').prev().addClass('active');
                    $($('.navigate_list__navigate_item')[$(e + ' > section.active').data('id')]).addClass('active')
                    $($('.navigate_list__navigate_item')[$(e + ' > section.active').data('id')]).siblings().removeClass('active')
                    if ($(e + ' > section.active').data('color')) {
                        $(e + ' > section[data-color]').css('background', $(e + ' > section.active').data('color'))
                    }
                }
                //паралкс + затемнение
                if (params.paralax_fogging) {
                    if ($(e + ' > section.active').next()[0]) {
                        if ($(e + ' > section.active').offset().top > 0) {
                            $(e + ' > section.active').prev().find('.fogged').css({'opacity': params.maximum_opacity * ( ( params.windowH - $(e + ' > section.active').offset().top ) / one_percent ) / 100})
                            $(e + ' > section.active').prev().find('.paralaxed').css('transform', 'translateY(' + 0.3 * ( ( params.windowH - $(e + ' > section.active').offset().top ) / one_percent ) + '%)')
                        }
                        else if ($(e + ' > section.active').offset().top < 0) {
                            if (( $(e + ' > section.active').offset().top + ( $(e + ' > section.active').height() - params.windowH ) ) < 0) {
                                $(e + ' > section.active').find('.fogged').css({'opacity': (( -( $(e + ' > section.active').height() - params.windowH + $(e + ' > section.active').offset().top ) / one_percent ) * params.maximum_opacity) / 100})
                                $(e + ' > section.active').find('.paralaxed').css('transform', 'translateY(' + (( -( $(e + ' > section.active').height() - params.windowH + $(e + ' > section.active').offset().top ) / one_percent ) * 0.3) + '%)')
                            }
                            else {
                                $(e + ' > section.active').find('.fogged').css({'opacity': 0})
                                $(e + ' > section.active').find('.paralaxed').css({'transform': 'translateY(0%)'})
                            }
                        }
                        else {
                            $(e + ' > section.active').find('.fogged').css({'opacity': 0})
                            $(e + ' > section.active').find('.paralaxed').css({'transform': 'translateY(0%)'})
                        }
                    }
                    else{
                        if ($(e + ' > section.active').offset().top > 0) {
                            $(e + ' > section.active').prev().find('.fogged').css({'opacity': params.maximum_opacity * ( ( params.windowH - $(e + ' > section.active').offset().top ) / one_percent ) / 100})
                            $(e + ' > section.active').prev().find('.paralaxed').css('transform', 'translateY(' + 0.3 * ( ( params.windowH - $(e + ' > section.active').offset().top ) / one_percent ) + '%)')
                        }
                    }
                }
                //прилипалка
                if (!flag) {
                    check_scroll()
                    flag = true
                }
            }, true)
        }
    }
    iscroll('.site_container')

})