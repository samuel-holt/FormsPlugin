/**
 * Created by Sam on 13/03/14.
 */

var count = 0;

jQuery(document).ready(function($){
//    console.log('ZDF Admin');

    if( $('#add-input').length ) {
        var addInputButton = $('#add-input');

        addInputButton.on('click', addNewInput);
    }

    function addNewInput() {
        var sortableInputs = $('#sortable-inputs'),
            clonedInput = sortableInputs.find('.zdf-form-group:last').clone();

        if( !clonedInput.find('.remove-input').length ) {
            $('<a data-id="'+count+'" class="remove-input" href="#" title="Remove this form input">x</a>').appendTo(clonedInput);
        }

        clonedInput.attr('id', 'form-group-'+count).appendTo(sortableInputs);

        count ++;

        return false;
    }

    function removeInput(event) {

        var id = $(this).attr('data-id');
        console.log(id);

        var el = '#form-group-' + id;

        $(el).remove();

//        var parentElement = $(this).parents('.zdf-form-group');
//
//        console.log(parentElement);
//
//        $(parentElement).remove();

//        $(this).prev().remove();

        return false;
    }
});

(function($){

    $( "#sortable-inputs" ).sortable().disableSelection();

//    var removeInputButton = $();

    $(document).on('click', '.remove-input', function(){

//        var id = $(this).attr('data-id');
//        console.log(id);
//
//        var el = '#form-group-' + id;
//
//        $(el).remove();

        $(this).parent().fadeOut().remove();

        count --;

        return false;
    });

})(jQuery);

