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

    $(document).on('blur', 'input[id^="field-name"]', updateStorage);
    $(document).on('click', 'input[id^="required"]', updateStorage);

    function updateStorage() {
        var fieldData = [],
            $ = window.jQuery;

        $('#zdf_form_options').find('.zdf-form-group').each(function() {
            var group = $(this),
                groupId = group.attr('data-id'),
                formGroupData = {
                    'id': groupId,
                    'formData': []
                };

            //            console.log( $this.find('.zd-input').length );

            group.find('.zdf-input').each(function() {
                var input = $(this);
                //                formGroupData.push($(this).val());
                formGroupData.formData.push({
                    'value': input.val()
                });
            });

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
                var data = storedData[i],
                    fieldId = data.id,
                    fieldData = data.formData,
                    setValues = [];

//                console.log(data.formData);

                fieldGroups += '<div data-id="'+fieldId+'" class="zdf-form-group sortable">';
                for( var field in fieldData ) {
//                    console.log(fieldData[field]);
                    var f = fieldData[field];
                    setValues.push(f.value);
//                    fieldGroups += FormBuilder.buildInput({
//                        'label': fieldData[field].label,
//                        'name': fieldData[field].name,
//                        'value': fieldData[field].value,
//                        'type': fieldData[field].type
//                    });
                }
                fieldGroups += FormBuilder.inputBlock(setValues);


                fieldGroups += '</div>';

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
//        Counter.addField();

            return false;
        }
    });

})(jQuery);



/*
FormBuilder Class
 */
var FormBuilder = {
    buildInput: function( _args ) {
        var html = '',
            before = '',
            after = '',
            inputLabel = _args.hasOwnProperty('label') ? _args.label : 'Form label',
            wrapper = _args.hasOwnProperty('wrapper') ? _args.wrapper : false,
            additionalMarkup = _args.hasOwnProperty('additionalMarkup') ? _args.additionalMarkup : false,
            inputType = _args.hasOwnProperty('type') ? _args.type : 'text',
            inputName = _args.hasOwnProperty('name') ? _args.name : inputLabel.toLowerCase().replace(' ', '_')
                + '_' + fieldCount,
            inputId = _args.hasOwnProperty('id') ? _args.id : inputName.replace('_', '-'),
            inputClass = _args.hasOwnProperty('class') ? 'zdf-input ' + _args.class : 'zd-input',
            inputPlaceholder = _args.hasOwnProperty('placeholder') ? _args.placeholder : inputLabel,
            inputValue = _args.hasOwnProperty('value') ? _args.value : '',
            isButton = (inputType.search(/button|submit/) > -1);

        if( wrapper ) {
            before += '<' + wrapper + ' class="zdf-input-wrapper">';

            if( additionalMarkup ) {
                after += additionalMarkup;
            }

            after += '</' + wrapper + '>';
        }

        html += before;

        // Don't show the label if it's a button
        if( ! isButton ) {
            html += '<label for="{id}">{label}</label>'.supplant({
                id: inputId,
                label: inputLabel
            });
        }

        if( inputType.search(/text|email/) > -1 ) {
            html += '<input type="text" name="{name}" id="{id}" class="{class}" placeholder="{placeholder}" value="{value}"{required} />'.supplant({
                name:       inputName,
                id:         inputId,
                class:      inputClass,
                placeholder:inputPlaceholder,
                value:      inputValue,
                required:   _args.required ? ' required aria-required="true"' : ''
            });
        }
        else if( 'textarea' === inputType ) {
            html += '<textarea name="{name}" id="{id}" class="{class}" placeholder="{placeholder}"{required}>{value}</textarea>'.supplant({
                name:       inputName,
                id:         inputId,
                class:      inputClass,
                placeholder:inputPlaceholder,
                value:      inputValue,
                required:   _args.required ? ' required aria-required="true"' : '',
                rows:       _args.rows,
                cols:       _args.cols
            });
        }
        else if( 'select' === inputType ) {
            html += '<select name="{name}" id="{id}" class="{class}">'.supplant({
                name:       inputName,
                id:         inputId,
                class:      inputClass,
                required:   _args.required ? ' required aria-required="true"' : ''
            });

            for( var option in _args.options ) {
                html += '<option value="{value}">{optionName}</option>'.supplant({
                    optionName: option,
                    value: _args.options[option]
                });
            }
            html += '</select>'
        }
        else if( inputType.search(/checkbox|radio/) > -1 ) {
            html += '<input type="{type}" name="{name}" id="{id}" class="{class}"{checked}{required} />'.supplant({
                type:       inputType,
                name:       inputName,
                id:         inputId,
                class:      inputClass,
                checked:    _args.checked ? ' checked' : '',
                required:   _args.required ? ' required aria-required="true"' : ''
            });
        }
        else if( 'hidden' === inputType ) {
            html += '<input type="hidden" name="{name}" id="{id}" class="{class}" />'.supplant({
                name:       inputName,
                id:         inputId,
                class:      inputClass
            })
        }
        else if( isButton ) {
            html += '<input type="{type}" name="{name}" id="{id}" class="{class}" value="{value}" />'.supplant({
                type:       inputType,
                name:       inputName,
                id:         inputId,
                class:      inputClass,
                value:      _args.hasOwnProperty('value') ? _args.value : inputLabel
            });
        }

        html += after;

        return html;
    },
    inputBlock: function( _setValues ) {

        if( _setValues === 'undefined' ) {
            _setValues = ['','',''];
        }
        var html = '<div data-id="' + fieldCount + '" class="zdf-form-group sortable">';

        html += this.buildInput({
            'label': 'Field name',
            'type': 'text',
            'required': true,
            'value': _setValues[0]
        });
        html += this.buildInput({
            'label': 'Field type',
            'type': 'select',
            'class': 'field-type-select',
            'options': {
                'Text': 'text',
                'Email': 'email',
                'Textbox': 'textarea',
                'Checkbox': 'checkbox',
                'Select (dropdown)': 'select',
                'Radio': 'radio',
                'Hidden': 'hidden'
            },
            'required': false,
            'value': _setValues[1]
        });
        html += this.buildInput({
            'label': 'Required',
            'type': 'checkbox',
            'checked': false,
            'required': false,
            'value': _setValues[2]
        });

        html += '<a class="remove-input" href="#" title="Remove this form input">x</a>';

        html += '</div><!--.zdf-form-group-->';

        return html;
    },
    singleOption: function( showRemoveButton ) {
        optionCount ++;
//        Counter.addOption();
        var removeButton = '<a class="remove-option" href="#" title="Remove this option">x</a>';

        return this.buildInput({
            'label': 'Option name',
            'id': '',
            'name': 'option_' + Counter.getOptionCount(),
            'additionalMarkup': showRemoveButton ? removeButton : '',
            'wrapper': 'p'
        });

//        return output;
    },
    optionBlock: function() {
        var output = '<div class="zdf-option-group">';
        output += this.singleOption(false);
//        output += this.singleOption(true);
//        output += this.singleOption(true);

        output += this.buildInput({
            'label': 'Add Option',
            'type': 'button',
            'class': 'zdf-add-option button button-default'
        });

        output += '</div><!--zdf-option-group-->';

        return output;
    }
};

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

