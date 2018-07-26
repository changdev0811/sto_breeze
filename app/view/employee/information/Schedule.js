Ext.define('Breeze.view.employee.information.Schedule', {
    extend: 'Ext.Container',
    alias: 'widget.employee.information.schedule',

    layout: 'vbox',

    items: [
        {
            xtype: 'fieldset',
            userCls: 'employee-info-fieldset',
            layout: 'hbox',
            // title: 'Name',
            defaults: {
                flex: 1,
                xtype: 'textfield',
                userCls: 'employee-info-general-field',
                ui: 'employeeinfo-textfield'
            },
            items: [
                {
                    xtype: 'fieldset',
                    userCls: 'employee-info-fieldset',
                    title: 'Shift Information',
                    items: [
                        {
                            xtype: 'grid'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'vbox',
                    flex: 1,
                    defaults: {
                        xtype: 'selectfield',
                        userCls: 'employee-info-general-field',
                        ui: 'employeeinfo-textfield'
                    },
                    items: [
                        {
                            name: 'startup_settings',
                            label: 'Accrual Policy',
                        },
                        {
                            name: 'default_project',
                            label: 'Default Project',
                        },
                        {
                            xtype: 'fieldset',
                            userCls: 'employee-info-fieldset',
                            title: 'Exempt Status',
                            defaults: { 
                                xtype: 'radiofield',
                                ui: 'employeeinfo-radio'
                            },
                            items: [{
                                label: 'Exempt',
                                name: 'exempt_status',
                                value: 138
                            },{
                                label: 'Non-Exempt',
                                name: 'exempt_status',
                                value: 139
                            }]

                        }
                    ]
                }
            ]
        }
    ]
});