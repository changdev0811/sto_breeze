Ext.define('Breeze.view.employee.information.Company', {
    extend: 'Ext.Container',
    alias: 'widget.employee.information.company',

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
                    xtype: 'datefield',
                    name: 'date_of_hire',
                    label: 'Hire Date',
                },
                {
                    xtype: 'datefield',
                    name: 'date_of_termination',
                    label: 'Termination Date',
                },
                {
                    name: 'customer_employee_id',
                    label: 'Employee #'
                }
            ]
        },
        {
            xtype: 'fieldset',
            userCls: 'employee-info-fieldset',
            layout: 'hbox',
            defaults: {
                flex: 1,
                xtype: 'textfield',
                userCls: 'employee-info-general-field',
                ui: 'employeeinfo-textfield'
            },
            items: [
                {
                    xtype: 'selectfield',
                    name: 'department',
                    label: 'Department',
                    displayField: 'Name',
                    valueField: 'Name',
                    reference: 'departments'
                },
                {
                    name: 'badge_id',
                    label: 'Badge #'
                }
            ]
        },
        {
            xtype: 'fieldset',
            userCls: 'employee-info-fieldset',
            layout: 'hbox',
            defaults: {
                flex: 1,
                xtype: 'textfield',
                userCls: 'employee-info-general-field',
                ui: 'employeeinfo-textfield'
            },
            items: [
                {
                    name: 'comp_rate',
                    xtype: 'numberfield',
                    minValue: 0, decimals: 2,
                    label: 'Compensation'
                },
                {
                    xtype: 'selectfield',
                    label: 'Compensation Frequency',
                    name: 'comp_per',
                    options: [
                        {text: 'Hourly', value: 'Hourly'},
                        {text: 'Daily', value: 'Daily'},
                        {text: 'Weekly', value: 'Weekly'},
                        {text: 'Bi-Weekly', value: 'Bi-Weekly'},
                        {text: 'Monthly', value: 'Monthly'},
                        {text: 'Annually', value: 'Annually'}
                    ]
                },
                {
                    name: 'payroll',
                    label: 'Payroll #'
                }
            ]
        }
    ]
});