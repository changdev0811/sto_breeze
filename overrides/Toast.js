/**
 * Extended version of Toast
 * 
 * Provides:
 *  - Dismissible behavior
 *  - Context-themed styling
 *  - Name based timeout presets with optional added time
 *  - Bulleted lists
 * @class Toast
 * @namespace Breeze.Toast
 * @namespace Ext.Toast
 * @override Ext.Toast
 */
Ext.define('Breeze.Toast', {
    override: 'Ext.Toast',

    // Static attributes
    statics: {
        // error type constant
        ERROR: 'error',
        // warning type constants
        WARN: 'warn', WARNING: 'warn',
        // info type constants
        INFO: 'info', INFORMATION: 'info', SUCCESS: 'info',
        // Timeout presets, use names in place of value; auto defaults to default
        TIMEOUTS: {
            error: 10000,
            info: 'auto',
            warn: ['auto',1000]
        }
    },

    config: {
        /*  ===[States]===
            Set to ERROR/INFO/WARN
        */

        // Default type is info, use Ext.Toast.INFO/WARN/ERROR
        type: 'info',
        /* ===[UI Style Names]===
           (uses panel-ui and toolable-ui)
        */

        //===[Style rules for types]===
        // UI type for error messages
        errorUi: 'toast-error',
        // UI Type for informational messages
        infoUi: 'toast-info',
        // UI Type for warning messages
        warnUi: 'toast-warn',

        /* ===[Icon Settings]=== */
        // Base icon style prefix
        iconBaseClass: 'x-fas',
        iconPadding: '2pt 4pt 2pt 4pt',
        // Error icon class
        // errorIcon: 'fa-times-circle',
        errorIcon: 'fa-times-octagon',
        // Informational icon class
        infoIcon: 'fa-info-circle',
        // infoIcon: 'fa-info',
        // Warning icon class
        // warnIcon: 'fa-exclamation-triangle',
        warnIcon: 'fa-exclamation',

        /* ===[Behavior]=== */
        // Whether toast is dismissable
        dismissIcon: 'x-fa fa-times',
        // can be passed in as boolean
        dismissable: true,
        // Default timeout period
        timeout: 6500,

        /* ===[Content Options]=== */
        // Bulleted list items array (used if list !== null || undefined)
        list: null,
        // Optional style classes to apply to list's <ul> element
        listClass: '',
        // Optional style classes to apply to list's <li> item elements
        listItemClass: ''
    },


    showToast: function(config){
        config = config || {};
        var {timeout} = config;
        config.timeout = this.resolveTimeout(timeout);
        this.setConfig(config);
        this.callParent([config]);
    },

    /**
     * Overrides message component of Toast, including
     * construction and behavior
     * @param {Object} value 
     */
    applyMessage: function(value){
        var styling = this.typeStyles();
        var icon = this.generateIcon(styling.icon);
        var me = this;

        this.setUi(styling.ui);
        

        var messageComp = this.generateMessage(value);

        var messageItems = [
            icon,
            messageComp     
        ];       

        if(this.getDismissable()){
            messageItems.push(this.generateDismissButton());
        }

        var msg = Ext.factory({
            cls: me.baseCls + '-text',            ui: styling.ui,
            layout: {
                type: 'hbox',
                align: 'center'
            },
            // style: 'line-height: 14pt',
            items: messageItems
        },Ext.Container,this._message);
        if(value && value !== null){
            return msg;
        } else {
            return null;
        }

    },

    privates: {
        /**
         * Lookup UI and Icon styles based on given toast type
         */
        typeStyles: function(){
            var type = this.getType();
            switch(type){
                case Ext.Toast.ERROR:
                return {
                    icon: this.getErrorIcon(),
                    ui: this.getErrorUi()
                };
                break;
                case Ext.Toast.WARN:
                return {
                    icon: this.getWarnIcon(),
                    ui: this.getWarnUi()
                };
                break;
                case Ext.Toast.INFO:
                return {
                    icon: this.getInfoIcon(),
                    ui: this.getInfoUi()
                };
                break;
            }
        },
        /**
         * Generate component used to display icon
         * @param {String} icon Icon class
         * @return {Object} Icon component
         */
        generateIcon: function(icon){
            var iconClass = `${this.getIconBaseClass()} ${icon}`;
            return Ext.create('Ext.Component', { html: `<span class="${iconClass}" style="padding: ${this.getIconPadding()}"></span>&nbsp;`});
        },
        /**
         * Generate dismiss button component
         * @return {Ext.Button} Dismiss button
         */
        generateDismissButton: function(){
            var me = this;
            return Ext.create('Ext.Button', {
                iconCls: this.getDismissIcon(),
                handler: function(){
                    me.onTimeout();
                }
            });
        },
        /**
         * Generate message component, either regular or with bulleted list
         * @param {String} msg Optional message body (if not given pulls from getMessage())
         * @return {Object} Message component object
         */
        generateMessage: function(msg){
            var body = Object.defVal(msg,this.getMessage()),
                listData = this.getList(),
                messageComp = null;
            if(Object.isUnvalued(listData)){
                // No list, so build regular message component
                messageComp = {
                    xtype: 'component',
                    html: body,
                    style: 'padding-right: 4pt',
                    flex: 1
                }
            } else {
                let ulClass = this.getListClass(),
                    liClass = this.getListItemClass();
                // Have list, so build message comp w/ list
                messageComp = {
                    xtype: 'component',
                    data: {
                        body: body,
                        list: listData
                    },
                    tpl: [
                        '<div>{body}</div>',
                        `<ul class='${ulClass}'>`,
                            '<tpl for="list">',
                                (`<li class='${liClass}'>` + '{.}</li>'),
                            '</tpl>',
                        '</ul>'
                    ],
                    style: 'padding-right: 4pt',
                    flex: 1
                }
            }

            return messageComp;
        },
        /**
         * Resolve actual timeout length, resolving a numeric input,
         * a timeout preset name string, (see Ext.Toast.TIMEOUTS), or an array
         * of two values to be added together (can include strings ('auto', 
         * 'warn') or numeric values (e.g. ['warn',1000] would be 1 second 
         * longer than the warn template))
         * 
         * Uses recursion to resolve templates and arrays
         * 
         * @param {(String|Array|Number)} to Timeout value to resolve
         * @return {Number} Timeout duration
         */
        resolveTimeout: function(to){
            if(typeof to == 'string'){
                if(to == 'auto'){
                    return this.getTimeout();
                } else {
                    return this.resolveTimeout(Ext.Toast.TIMEOUTS[to]);
                }
            } else if(Array.isArray(to)){
                // it's an array, meaning add values together
                return this.resolveTimeout(to[0]) + this.resolveTimeout(to[1]);
            } else {
                return to;
            }
        }

    }

});