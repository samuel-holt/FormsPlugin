/**
 * Created with JetBrains PhpStorm.
 * User: Samwise
 * Date: 16/03/14
 * Time: 6:55 PM
 * To change this template use File | Settings | File Templates.
 */

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
                var isSelected = inputValue === _args.options[option] ? ' selected' : '';

                html += '<option value="{value}"{selected}>{optionName}</option>'.supplant({
                    optionName: option,
                    value: _args.options[option],
                    selected: isSelected
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
//        console.log( _setValues );

        if( typeof _setValues == 'undefined' ) {
            _setValues = ['','',''];
        }

//        console.log( _setValues[0] );
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
            'checked': _setValues[2],
            'required': false
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
    optionBlock: function( _setValues ) {

        if( typeof _setValues === 'undefined' ) {

        }

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