/**
 * Restore Employee Admin view
 * @class RestoreEmployee
 * @namespace Breeze.view.admin.RestoreEmployee
 * @alias widget.admin.restoreemployee
 */
Ext.define('Breeze.view.admin.RestoreEmployee', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.restoreemployee',

    config: {
        crumbTitle: 'Restore Employees'
    },


    // View Model
    viewModel: {
        type: 'admin.restoreemployee'
    },

        // Controller
    controller: 'admin.restoreemployee',
    listeners: {
        initialize: 'onInit'
    },

    // Layout and base styles
    layout: 'vbox',
    ui: 'admin-base',

    title: 'Restore Employees',

    // Adjust action button toolbar spacing and appearance with UI and shadow
    buttonToolbar: {
        xtype: 'toolbar',
        ui: 'admin-actions',
        shadow: false
    },

    // Body contents
    items: [
        {
            xtype: 'fieldset',
            userCls:'admin-fieldset no-padding',
            title:'Employee to Restore',
            maxWidth:'350pt',
            ui: 'admin-sub',
            layout:'vbox',

            items:[

                {
                    xtype: 'selectfield',
                    ui: 'admin admin-text',
                    margin:'8pt',
                    reference:'deletedEmployeesSelectField',

                    placeholder: 'Select employee to restore',
                    displayField: 'text',
                    valueField: 'data',
                    bind: {
                        store: '{Employees}',
                    },
                    listeners:{
                        select:'onEmployeeSelect'
                    }

                },

                {
                    xtype: 'toolbar',
                    userCls:'admin-toolbar-footer',
                    shadow: false,
                    buttonAlign: 'right',
                    items: [
                        {
                            xtype:'spacer',
                            flex:1,
                        },
                        {
                            xtype: 'button',
                            ui: 'plain wtr-button',
                            reference:'restoreButton', 
                            disabled:true, 
                            text: 'Restore Employee', 
                            handler:'onRestoreButtonTap', 
                            ui: 'action',
                                        

                        },
                    ]
                },




            ]
        },
    ]
});