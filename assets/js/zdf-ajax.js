/**
 * Created by Sam on 12/03/14.
 */

jQuery(document).ready(function($){
    var sendMessageButton;

    if( $('.zd-form-ajax').length ) {
        sendMessageButton = $('.zd-form-ajax').find('input[type="submit"]');

        var theForm = $('.zd-form-ajax').on('submit', prepareMessage),
            sendButtonWidth = sendMessageButton.outerWidth();

        sendMessageButton.css({'width':sendButtonWidth});

    }

    function prepareMessage() {

        var $this = $(this),
            postData = {
                action: 'zdf_ajax_send',
                security: zdf_ajax_object.ajax_nonce,
                zdf_form_data: getFormDataArray()
//                zdf_form_data: $this.serialize()
            };

        sendMessage(postData);

        return false;
    }

    function sendMessage(_postData) {
        sendMessageButton.addClass('sending');

        $.post(
            zdf_ajax_object.ajax_url,
            _postData,
            function( response, textStatus ) {
//                console.log( response );
//                console.log(textStatus);
                if( textStatus === 'success') {
                    var data = JSON.parse(response);

                    sendMessageButton.removeClass('sending').val('Sending');

                    if( data.sent ) {
//                        console.log(data);
                        sendMessageButton.addClass('sent').val('Sent!').attr('disabled', 'disabled');
//                        console.log('Message sent');
                        //Prevent multiple sendings
                    }
                    else {
//                        console.log(data.errors);
//                        console.log('Message not sent');
                        sendMessageButton.addClass('not-sent').val('Try again');

                        for(var error in data.errors) {
//                            console.log(error);
                            if( data.errors[error] ) {
                                var id = '#' + error.replace('_', '-');
                                $(id).addClass('error');
                                $(id + '-error').text(data.errors[error]);

                            }
                        }
                    }
                }
                else {
                    console.log('Message not able to send');
                    sendMessageButton.addClass('not-sent').val('Try again');
                }
            }
        );
    }

    function getFormDataArray() {
        var formData = [];
        theForm.find('.zdf-input').each(function(){
//            formData
            var $this = $(this);
            formData.push({
                name: $this.attr('name'),
                value: $this.val(),
                type: $this.attr('type'),
                required: $this.attr('required')
            });
        });

        return formData;
    }

});
