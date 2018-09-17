/**
 * Extended version of Toast
 * 
 * Provides:
 *  - Dismissible behavior
 *  - Context-themed styling
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
        INFO: 'info', INFORMATIN: 'info'
    },

    config: {
        /*  ===[States]===
            Set to ERROR/INFO/WARN
        */
        type: 'info',
        /* ===[UI Style Names]===
           (uses panel-ui and toolable-ui)
        */
        // UI type for error messages
        errorUi: 'toast-error',
        // UI Type for informational messages
        infoUi: 'toast-info',
        // UI Type for warning messages
        warnUi: 'toast-warn',
        /* ===[Icon Settings]=== */
        // Base icon style prefix
        iconBaseClass: 'x-icon-el x-font-icon x-fas',
        // Error icon class
        // errorIcon: 'fa-times-circle',
        errorIcon: 'fa-times-octagon',
        // Informational icon class
        // infoIcon: 'fa-info-circle',
        infoIcon: 'fa-info',
        // Warning icon class
        // warnIcon: 'fa-exclamation-triangle',
        warnIcon: 'fa-exclamation',
        /* ===[Behavior]=== */
        // Whether toast is dismissable
        dismissable: true
    },


    showToast: function(config){
        config = config || {};
        this.setConfig(config);
        this.callParent([config]);
    },

    applyMessage: function(value){
        var styling = this.typeStyles();
        console.info('Styling: ', styling);
        var icon = this.generateIcon(styling.icon);
        var me = this;
        this.setUi(styling.ui);
        var msg = Ext.factory({
            cls: me.baseCls + '-text',
            ui: styling.ui,
            layout: 'hbox',
            items: [
                icon,
                {
                    xtype: 'component',
                    html: value,
                    flex: 1
                }
            ]
        },Ext.Container,this._message);
        if(value && value !== null){
            return msg;
        } else {
            return null;
        }

    },

    privates: {
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
        generateIcon: function(icon){
            var iconClass = `${this.getIconBaseClass()} ${icon}`;
            return Ext.create('Ext.Component', { html: `<span class="${iconClass}"></span>&nbsp;`});
        },
    }

});