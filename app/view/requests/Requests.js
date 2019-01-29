/**
 * View for Requests
 * Uses card layout to swap between MyRequests and MyRequestsInput
 * Child views use controller attached here
 * @class Requests
 * @namespace Breeze.view.requests.Requests
 * @alias widget.requests.requests
 */
Ext.define('Breeze.view.requests.Requests', {
    extend: 'Ext.Container',
    alias: 'widget.requests.requests',
    controller: 'requests.requests',
    viewModel: {
        type: 'requests.requests'
    },


    config: {
        crumbTitle: 'My Requests'
    },
    
    requires: [
        'Ext.layout.Card', 'Breeze.view.requests.RequestsController',
        'Breeze.view.requests.Main', 'Breeze.view.requests.Form'
    ],
    
    listeners: {
        initialize: 'onInit'
    },

    userCls:'requests-content',
    layout: 'card',
    items: [
        {
            xtype: 'requests.main',
            itemId: 'requests'
        },
        {
            xtype: 'requests.form',
            itemId: 'form'
        }
    ],

    createRequestDialog: {
        xtype: 'dialog',
        title: 'New Leave Request',
        ui: 'dark-themed-dialog employeeinfo-dialog dark-dlg',

        layout: 'vbox',

        maxHeight: '400pt',

        items: [
            {
                xtype: 'component',
                html: 'What would you like to call this request?'
            },
            {
                xtype: 'breeze-textfield',
                itemId: 'requestName',
                required: true,
                placeholder: 'Request Name'
            }
        ],

        buttons: [
            {
                text: 'Save',
                ui: 'confirm alt',
                handler: 'onCreateRequest'
            },
            {
                xtype: 'spacer',
                width: '8pt'
            },
            {
                text: 'Cancel',
                ui: 'decline alt',
                handler: 'onCreateRequestDialogCancel'
            }
        ]
    }

});