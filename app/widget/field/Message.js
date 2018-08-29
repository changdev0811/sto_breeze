/**
 * Context-styled message pane for displaying form errors or messages
 * @class Message
 * @namespace Breeze.widget.field.Message
 * @alias widget.breeze.field.message
 * @xtype breeze-message
 */
Ext.define('Breeze.widget.field.Message', {
    extend: 'Ext.Component',
    alias: 'widget.breeze.field.message',
    requires: [],
    xtype: 'breeze-message',

    config: {
        state: 'info',
        message: 'No message'
    },

    // State styling constants
    states: {
        info: {
            userCls: 'msg-info',
            icon: 'x-fas fa-info-circle'
        },
        error: {
            userCls: 'msg-error',
            icon: 'x-fas fa-exclamation-circle'
        },
        warn: {
            userCls: 'msg-warn',
            icon: 'x-fas fa-exclamation-triangle'
        }
    },

    tpl: new Ext.XTemplate(
        '<div class="{stateClass}">',
        '<span class="{stateIcon}"></span>',
        '<span>{message}</span>'
    ),


    updateState: function(newVal, oldVal){
        this.refreshContent();
    },

    updateMessage: function(newVal, oldVal){
        this.refreshContent();
    },

    privates: {
        refreshContent: function(){
            var state = this.states[this.getState()];

            this.setData({
                stateClass: state.userCls, 
                stateIcon: state.icon,
                message: this.getMessage()
            });
        }
    }



});
