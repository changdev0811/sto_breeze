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

    //===[Dialogs shared by view]===

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
    },

    employeeNotesDialog: {
        xtype: 'dialog',
        title: 'Leave Request Notes',
        ui: 'dark-themed-dialog employeeinfo-dialog dark-dlg',

        layout: 'fit',

        maxHeight: '400pt',
        width: '300pt',
        height: '300pt',

        items: [
            {
                xtype: 'textareafield',
                flex: 1,
                border: true,
                label: '',
                itemId: 'notes',
                placeholder: "No notes are currently recorded.",
            }
        ],

        buttons: [
            {
                text: 'Save',
                ui: 'confirm alt',
                itemId: 'save',
                handler: 'onEmployeeNotesSave'
            },
            {
                xtype: 'spacer',
                width: '8pt'
            },
            {
                text: 'Cancel',
                ui: 'decline alt',
                handler: 'onEmployeeNotesDialogCancel'
            }
        ]
    },

    supervisorNotesDialog: {
        xtype: 'dialog',
        title: 'Supervisor Notes',
        ui: 'dark-themed-dialog employeeinfo-dialog dark-dlg',

        layout: 'fit',

        maxHeight: '400pt',
        width: '300pt',
        height: '300pt',

        items: [
            {
                xtype: 'textareafield',
                flex: 1,
                border: true,
                label: '',
                itemId: 'notes',
                readOnly: true,
                placeholder: "No notes are currently recorded.",
            }
        ],

        buttons: [
            {
                text: 'Cancel',
                ui: 'decline alt',
                handler: 'onSupervisorNotesDialogCancel'
            }
        ]
    },

    denyNotesDialog: {
        xtype: 'dialog',
        title: 'Deny Notes',
        ui: 'dark-themed-dialog employeeinfo-dialog dark-dlg',

        layout: 'fit',

        maxHeight: '400pt',
        width: '300pt',
        height: '300pt',

        items: [
            {
                xtype: 'textareafield',
                flex: 1,
                border: true,
                label: '',
                itemId: 'notes',
                readOnly: true,
                placeholder: "No notes are currently recorded.",
            }
        ],

        buttons: [
            {
                text: 'Cancel',
                ui: 'decline alt',
                handler: 'onDenyNotesDialogCancel'
            }
        ]
    }

});