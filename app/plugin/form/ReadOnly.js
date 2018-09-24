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
		active: true,
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
			'breeze-checkbox', 'breeze-checkboxfield',
		]
    },

    init: function(host){
    	// console.info('Readonly plugin initialized for ', host);
    	this.propagateBinding(host);
	},
	
	updateActive: function(newVal, oldVal){
		if(newVal !== oldVal){
			this.propagateBinding(this.getCmp());
		}
	},

    privates: {

		/**
		 * Build binding expression string
		 * @param {boolean} inverted If true, bind expression value is negated
		 * @return {String} bind expression (config 'expression' wrapped in { })
		 */
    	expressionString: function(inverted){
    		return ['{', (inverted)? '!' : '', this.config.expression, '}'].join('');
    	},

		/**
		 * Apply readonly bindings to field, provided it doesn't have attribute
		 * `ignoreReadOnly` set to truthy value
		 * @param {Object} field Field/Component to apply binding to
		 */
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
    		if(!root.ignoreReadOnly && this.getActive()){
				this.propagateToField(root);
			}
    		if(typeof root.getItems !== 'undefined' && this.config.recursive && !root.ignoreReadOnly && this.getActive()){
    			var items = root.getItems().items;
    			for(var i = 0; i < items.length; i++){
    				this.propagateBinding(items[i]);
    			}
    		}
    	}
    }

});