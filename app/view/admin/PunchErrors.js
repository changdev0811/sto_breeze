/**
 * PunchErrors Admin view
 * @class PunchErrors
 * @namespace Breeze.view.admin.PunchErrors
 * @alias widget.admin.puncherrors
 */
Ext.define('Breeze.view.admin.PunchErrors', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.puncherrors',

    config: {
        crumbTitle: 'Punch Errors'
    },

    // View Model
    viewModel: {
        type: 'admin.puncherrors'
    },

    // Controller
    controller: 'admin.puncherrors',
    listeners: {
        initialize: 'onInit'
    },



    // Layout and base styles
    layout: 'vbox',
    ui: 'admin-base',

    title: 'Punch Errors',



    // Adjust action button toolbar spacing and appearance with UI and shadow
    buttonToolbar: {
        xtype: 'toolbar',
        ui: 'admin-actions',
        shadow: false
    },

    // Body contents
    items: [

        {
            xtype: 'container',
            userCls: 'admin-fieldset',
            flex: 1,
            layout: 'vbox',
            items: [
                {
                    xtype: 'grid',
                    ui: 'admin-grid',
                    reference: 'errorGrid',
                    layout: 'hbox',
                    flex: 1,
                    sortable: false, columnResize: false,
                    columnMenu: false, hideHeaders: false,
                    bind: {
                        store: '{supervisors}'
                    },
                    defaults: {
                        xtype: 'gridcolumn',
                    },
                    // Plugin for editable grid
                    plugins: {
                        gridcellediting: true
                    },
                    selectable: {
                        mode: 'multi'
                    },
                    columns: [
                        {
                            xtype: 'checkcolumn',
                            width: 50,
                            itemId: 'check',
                            menu: null,
                            menuDisabled: true
                        },
                        {
                            text: 'Employee',
                            itemId: 'employee',
                            flex: 1,
                            dataIndex: 'supervisorId',
                            tpl: '{Name}',
                            menuDisabled: true,
                        },
                        {
                            text: 'Punch Time',
                            itemId: 'time',
                            flex: 1,
                            tpl: '{Role_Name}',
                            dataIndex: 'roleId',
                            menuDisabled: true,
                            // align:'center',
                            editor: {
                                xtype: 'selectfield',
                                valueField: 'Role_Id',
                                displayField: 'Role_Name',
                                bind: {
                                    store: '{roles}'
                                },
                                listeners: {
                                    select: 'onEditSupervisorRoleSelect'
                                }
                            },
                            
                        },
                        {
                            text: 'ERROR',
                            itemId: 'error',
                            flex: 2.5,
                            tpl: '{Role_Name}',
                            dataIndex: 'roleId',
                            menuDisabled: true,
                            // align:'center',
                            editor: {
                                xtype: 'selectfield',
                                valueField: 'Role_Id',
                                displayField: 'Role_Name',
                                bind: {
                                    store: '{roles}'
                                },
                                listeners: {
                                    select: 'onEditSupervisorRoleSelect'
                                }
                            },
                            
                        },
                    ],
                    listeners: {
                        // beforeedit: 'onSupervisorBeforeEdit',
                        // edit: 'onSupervisorPostEdit'
                    }
                }
            ]
        },
        {
            xtype: 'panel',
            ui: 'admin-sub',
            buttons: {
                remove: { text: 'Remove Punch Errors', /*handler: 'onPrintPDF',*/ ui: 'action', style: 'width:175pt;' },
                reprocess: { text: 'Re-Process', /*handler: 'onPrintPDF',*/ ui: 'action', style: 'width:175pt;' },
            },

            buttonAlign: 'right',
            buttonToolbar: {
                xtype: 'toolbar',
                ui: 'admin-actions',
                shadow: false
            }
        },


    ]

});