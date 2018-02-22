/*
    <a href="javascript:" class="open-modal" data-modal-id="modal-callback">
    ...
    <div class="overlay">
        <div class="modal" id="modal-callback">
            <div class="modal__close">Закрыть окно</div>
            ...
            <a href="javascript:" class="open-submodal" data-modal-id="modal-callback-submodal">
        </div>
    </div>

    <style>
        .overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: 20px;
            background-color: rgba(0, 0, 0, 0.5);
            overflow: auto;
            z-index: 5;
        }
        .modal {
            display: none;
            position: relative;
            max-width: 460px;
            margin: 40px auto 0;
            padding: 30px;
            background: @color_white;
        }
        .modal--shadow {
            position: absolute;
            left: -200px;
            opacity: 0;
            visibility: hidden;
            transition: all 300ms ease-in-out;
        }
    </style>
*/
(function($){    
    modals();
    function modals() {
        var body = $('body');
        // обертка для модального окна
        var overlay = $('.overlay_modal');
        // селектор ссылки для открытия окна
        var openModal = $('.open-modal');
        // селектор модальных окон
        var modals = $('.modal_window');
        // селектор ссылки для открытия дочернего окна
        var openSubmodal = modals.find('.open-submodal');

        // обработчики
        $('body').on('click', openModal.selector, function () {
            var id = $(this).data('modal-id');
            showModal(id);
        });
        $('body').on('click', openSubmodal.selector, function () {
            var id = $(this).data('modal-id');
            var modal = $(this).parents('.modal');
            showSubmodal(id, modal);
        });

        $('body').on('click', '.modal_window__close', hideModal);
        $('body').on('click', '.modal_window', function (event) {

            if (!overlay.hasClass('overlay--noclose')) {
                if ($(event.target).is(modals)) {
                    hideModal();
                }
            }
            else {
                overlay.removeClass('overlay--noclose')
            }

        });

        // валидация формы в модальном окне при submit
        modals.find('form').on('submit', checkValid);
        modals.find('input, textarea').on('focus', function () {
            $(this).removeClass('input__error')
                .parents('.modal').find('.modal__error').removeClass('show');
        });

        // функции
        // показываем окно
        function showModal(id) {
            $('#'+id).css('display','inline-block');
            $('#'+id).addClass('modal--open');
            overlay.fadeIn();
            if (!!$.fn.select2) {
                $('#'+id).find('select:not(.no-select)').select2({
                    //minimumResultsForSearch: Infinity
                });
            }
            body.css({overflow: 'hidden'});
            $('#wrapper').css({'filter' : 'blur(6px)'})
            $('.top_bar').css({'filter' : 'blur(6px)'})
        }
        // показываем дочернее окно
        function showSubmodal(id, modal) {
            /* modal.animate({
                "margin-right" : '+=200',
                'opacity' : 0,
                'visibility' : 'hidden'
            }, 100); */
            modals.addClass('modal--shadow');
            
            $('#'+id).css('display','inline-block');
            $('#'+id).addClass('submodal--open').removeClass('modal--shadow');
            //overlay.fadeIn();
            if (!!$.fn.select2) {
                $('#'+id).find('select').select2({         
                    //minimumResultsForSearch: Infinity
                });
            }
            //body.css({overflow: 'hidden'});
        }
        
        // скрываем окно
        function hideModal() {
            if ($('.submodal--open').length) {
                hideSubmodal();
            }
            else {
                overlay.fadeOut(0);
                modals.fadeOut(0);
                body.css({overflow: 'auto'});
				$('#wrapper').css({'filter' : 'blur(0px)'})
                $('.top_bar').css({'filter' : 'blur(0px)'})
                var modal = modals.filter('.modal--open');
                if (modal.find('.modal__clear-form')) {
                    clearForm(modal);
                }

                modals.removeAttr('style');
                modals.removeClass('modal--open modal--shadow submodal--open');
            }
        }

        // скрываем дочернее окно
        function hideSubmodal () {
            $('.submodal--open').addClass('modal--shadow');
            $('.modal--open').removeClass('modal--shadow');
            modals.removeClass('submodal--open');
        }
        
        // очистка формы
        function clearForm (modal) {
            modal.find('form').trigger('reset');
            [].forEach.call(modal.find('input[checked]'), function (item) {
                item.removeAttribute('checked');
            });
        }
        
        // валидация формы
        function checkValid (event) {
            var $this = $(this);
            var requiredFields = ['callback_phone'];
            var error = false;
            
            requiredFields.forEach(function (item, i) {
                var elem = $this.find('[name="'+item+'"]');
                if (!!elem.length) {
                    if ( !elem.val() ) {
                        elem.addClass('input__error');
                        $this.find('.modal__error').addClass('show');
                        error = true;
                    }
                }
            });
            
            if (error) {
                event.preventDefault(); 
                (event.cancelBubble) ? event.cancelBubble : event.stopPropagation;
            }
            
        }
    }
})($);