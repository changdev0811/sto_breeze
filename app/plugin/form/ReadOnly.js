/**
 * Protect fields with bound readonly mode
 * @class ReadOnly
 * @namespace Breeze.plugin.form.ReadOnly
 * @alias plugin.breeze.form.readonly
 */
Ext.define('Breeze.plugin.form.ReadOnly', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.breeze.form.readonly',

    config: {
    	recursive: true,
    	expression: ''
    },

    fieldTypes: {
    	editable: [
            'textfield','datefield','email','text','password','spinnerfield','date',
            'breeze-textfield','breeze-password','breeze-email', 'numberfield',
            'emailfield', 'passwordfield', 'textareafield', 'urlfield', 'selectfield'
    	],
    	disabled: [
            'checkbox', 'checkboxfield', 'radio', 'radiofield', 
             'togglefield', 'sliderfield'
		],
		readOnly: [
			'breeze-checkbox', 'breeze-checkfield',
		]
    },

    init: function(host){
    	// console.info('Readonly plugin initialized for ', host);
    	this.propagateBinding(host);
    },

    privates: {

    	expressionString: function(inverted){
    		return ['{', (inverted)? '!' : '', this.config.expression, '}'].join('');
    	},

    	propagateToField: function(field){
    		// console.group('Binding to field ' + field.xtype);
    		if(this.fieldTypes.disabled.includes(field.xtype)){
    			// console.info('Starting bind: ', field.getBind());
    			// var bind = field.getBind();
                // bind.disabled = this.expressionString();
                field.getBind();
    			field.setBind({disabled: this.expressionString()});
    			// console.info('Post update bind: ', field.getBind());
    		}
    		if(this.fieldTypes.editable.includes(field.xtype)){
    			// console.info('Starting bind: ', field.getBind());
    			// bind.editable = this.expressionString(true);
                // console.info(this.expressionString());
                field.getBind();
    			field.setBind({readOnly: this.expressionString(), editable: this.expressionString(true)});
    			// console.info('Post update bind: ', field.getBind());
			}
			if(this.fieldTypes.readOnly.includes(field.xtype)){
    			// console.info('Starting bind: ', field.getBind());
    			// bind.editable = this.expressionString(true);
                // console.info(this.expressionString());
                field.getBind();
    			field.setBind({readOnly: this.expressionString()});
    			// console.info('Post update bind: ', field.getBind());
    		}
    		// console.groupEnd();
    	},

    	propagateBinding: function(root){
    		this.propagateToField(root);
    		if(typeof root.getItems !== 'undefined' && this.config.recursive && !root.ignoreReadOnly){
    			var items = root.getItems().items;
    			for(var i = 0; i < items.length; i++){
    				this.propagateBinding(items[i]);
    			}
    		}
    	}
    }

});