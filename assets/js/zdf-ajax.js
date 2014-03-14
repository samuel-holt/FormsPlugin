/**
 * Created by Sam on 12/03/14.
 */

jQuery(document).ready(function($){

    if( $('.zd-form-ajax').length ) {


        $('.zd-form-ajax').on('submit', prepareMessage);


    }

    function prepareMessage() {

        var $this = $(this),
            postData = {
                action: 'zdf_ajax_send',
                security: zdf_ajax_object.ajax_nonce,
                zdf_form_data: $this.serialize()
            };

        sendMessage(postData);

        return false;
    }

    function sendMessage(_postData) {

        $.post(
            zdf_ajax_object.ajax_url,
            _postData,
            function(response) {
                console.log( response );
                var data = JSON.parse(response);

            }
        );
    }

});
