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
        INFO: 'info', INFORMATION: 'info', SUCCESS: 'info'
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
        dismissable: true
    },


    showToast: function(config){
        config = config || {};
        this.setConfig(config);
        this.callParent([config]);
    },

    applyMessage: function(value){
        var styling = this.typeStyles();
        var icon = this.generateIcon(styling.icon);
        var me = this;

        this.setUi(styling.ui);
        
        var messageItems = [
            icon,
            {
                xtype: 'component',
                html: value,
                style: 'padding-right: 4pt',
                flex: 1
            },   
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
            return Ext.create('Ext.Component', { html: `<span class="${iconClass}" style="padding: ${this.getIconPadding()}"></span>&nbsp;`});
        },
        generateDismissButton: function(){
            var me = this;
            return Ext.create('Ext.Button', {
                iconCls: this.getDismissIcon(),
                handler: function(){
                    me.onTimeout();
                }
            });
        }

    }

});