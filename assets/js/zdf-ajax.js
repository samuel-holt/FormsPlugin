/**
 * Created by Sam on 12/03/14.
 */

jQuery(document).ready(function($){

    if( $('.zd-form-ajax').length ) {


        var theForm = $('.zd-form-ajax').on('submit', prepareMessage);


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

        $.post(
            zdf_ajax_object.ajax_url,
            _postData,
            function( response, textStatus ) {
                console.log( response );
                console.log(textStatus);
                if( textStatus === 'success') {
                    var data = JSON.parse(response);
                    if( data.sent ) {
//                        console.log(data);
                        console.log('Message sent');
                    }
                    else {
                        console.log(data.errors);
                        console.log('Message not sent');

                        for(var error in data.errors) {
                            console.log(error);
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
