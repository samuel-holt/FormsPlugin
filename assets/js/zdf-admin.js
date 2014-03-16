/**
 * Created by Sam on 13/03/14.
 */

var fieldCount = 1,
    optionCount = 1;

/*
 Live listeners
 */
(function($){

    $( "#sortable-inputs" ).sortable().disableSelection();

//    var removeInputButton = $();

    $(document).on('click', '.remove-input', function(){

        $(this).parent().fadeOut().remove();

        fieldCount --;
//        Counter.removeField();

        return false;
    });

    $(document).on('change', '.field-type-select', function() {
        var $this = $(this),
            selected = $this.val(),
            formGroupParent = $this.parents('.zdf-form-group');

        //If dropdown/radio selected, show options panel below
//        console.log(selected);
        if( selected.search(/select/) > -1 ) {
            if( formGroupParent.find('.zdf-option-group').length ) {
                formGroupParent.find('.zdf-option-group').show();
            }
            else {
                $(FormBuilder.optionBlock()).appendTo(formGroupParent);
            }
        }
        else {
            if( formGroupParent.find('.zdf-option-group').length ) {
                formGroupParent.find('.zdf-option-group').hide();
            }
        }
        updateStorage();
    });

    $(document).on('click', '.zdf-add-option', function() {
        var $this = $(this),
            optionGroupParent = $this.parents('.zdf-option-group');

        $(FormBuilder.singleOption( true )).insertBefore($this);

        optionCount ++;
//        Counter.addOption();

    });

    $(document).on('click', '.remove-option', function() {
        $(this).parent().fadeOut().remove();

//        Counter.removeOption();
        optionCount --;

        return false;
    });

    $(document).on( 'blur', 'input[id^="field-name"]', updateStorage );
    $(document).on( 'click', 'input[id^="required"]', updateStorage );
    $(document).on( 'blur', '.zdf-option-group input[type="text"]', updateStorage )

    function updateStorage() {
        var fieldData = [];

        $('#zdf_form_options').find('.zdf-form-group').each(function() {
            var group = $(this);
//                groupId = group.attr('data-id'),
//                formGroupData = [];

//                console.log( $this.find('.zd-input').length );

//            group.find('.zdf-input').each(function() {
//                var input = $(this),
//                    inputVal;
//                //                formGroupData.push($(this).val());
////                console.log( input.attr('type') );
//                if( input.attr('type') === 'checkbox' ) {
////                    console.log('is checkbox');
//                    inputVal = input.is(':checked');
//                }
//                else {
//                    inputVal = input.val();
//                }
//                formGroupData.push(inputVal);
//            });

            var fieldType = group.find('select[id^="field-type"]').val();

            var formGroupData = [
                group.find('input[id^="field-name"]').val(),
                fieldType,
                group.find('input[id^="required"]').is(':checked')
            ];

            if( 'select' === fieldType ) {
//                formGroupData.push
                var options = [];
                group.find('.zdf-option-group').find('input[type="text"]').each(function(){
                    options.push( $(this).val() );
                });
                formGroupData.push(options);
            }

            fieldData.push(formGroupData);

        });

        localStorage.storedFieldData = JSON.stringify(fieldData);
    }

    function capitalise(string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    $(document).ready(function($){
//    'use strict';
//    console.log(Counter.ls);
//    console.log('ZDF Admin');
        var storedInputs = $('#sortable-inputs'),
            fieldGroups = '';

        // Load the current form groups
        if( localStorage.storedFieldData ) {
            var storedData = JSON.parse(localStorage.storedFieldData);

//            console.log(storedData.length);


            for(var i=0; i < storedData.length; i++) {
//                var data = storedData[i];

//                console.log(data.formData);

//                fieldGroups += '<div data-id="'+fieldId+'" class="zdf-form-group sortable">';
//                for( var field in fieldData ) {
////                    console.log(fieldData[field]);
//                    var f = fieldData[field];
//                    setValues.push(f.value);
////                    fieldGroups += FormBuilder.buildInput({
////                        'label': fieldData[field].label,
////                        'name': fieldData[field].name,
////                        'value': fieldData[field].value,
////                        'type': fieldData[field].type
////                    });
//                }
                fieldGroups += FormBuilder.inputBlock(storedData[i]);


//                fieldGroups += '</div>';

            }
            storedInputs.html( fieldGroups );
        }

        // If localStorage.storedFieldData...
        // Loop through data and add the form groups with the stored values

        if( $('#add-input').length ) {
            var addInputButton = $('#add-input');

            addInputButton.on('click', addNewInput);
        }

        function addNewInput() {
            var sortableInputs = $('#sortable-inputs'),
//            clonedInput = sortableInputs.find('.zdf-form-group:last').clone(),
                newInput = FormBuilder.inputBlock();

//        localhost.additionalInputs += newInput;

//        console.log(newInput);

            $(newInput).appendTo(sortableInputs);

//        if( !clonedInput.find('.remove-input').length ) {
//            $('<a data-id="'+fieldCount+'" class="remove-input" href="#" title="Remove this form input">x</a>').appendTo(clonedInput);
//        }
//
//        clonedInput.attr('id', 'form-group-'+fieldCount).appendTo(sortableInputs);

//        addFieldToStorage( fieldCount );

            fieldCount ++;
            updateStorage();
//        Counter.addField();

            return false;
        }
    });

})(jQuery);

String.prototype.supplant = function (o) {
    return this.replace(/{([^{}]*)}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

var Counter = {
    ls: window.localStorage,
    fieldCount: 0,
    optionCount: 0,
    getFieldCount: function() {
        return this.fieldCount;
    },
    addField: function() {
        this.fieldCount ++;
        this.ls._fieldCount ++;
    },
    removeField: function() {
        this.fieldCount --;
        if( this.fieldCount < 0 ) {
            this.fieldCount = 0;
            this.ls._fieldCount = 0;
        }
    },
    getOptionCount: function() {
        return this.optionCount;
    },
    addOption: function() {
        this.optionCount ++;
        this.ls._optionCount ++;
    },
    removeOption: function() {
        this.optionCount --;
        this.ls._optionCount --;
        if( this.optionCount < 0 ) {
            this.optionCount = 0;
            this.ls.optionCount = 0;
        }
    }

}

