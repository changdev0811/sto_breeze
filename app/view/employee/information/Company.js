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
                xtype: 'breeze-textfield',
                userCls: 'employee-info-general-field',
                ui: 'employeeinfo-textfield'
            },
            items: [
                {
                    xtype: 'datefield',
                    name: 'date_of_hire',
                    label: 'Hire Date',
                    bind: '{hireDate}'
                },
                {
                    xtype: 'datefield',
                    name: 'date_of_termination',
                    label: 'Termination Date',
                    bind: '{info.TerminationDate}'
                },
                {
                    name: 'customer_employee_id',
                    label: 'Employee #',
                    bind: '{info.EmployeeNumber}'
                }
            ]
        },
        {
            xtype: 'fieldset',
            userCls: 'employee-info-fieldset',
            layout: 'hbox',
            defaults: {
                flex: 1,
                xtype: 'breeze-textfield',
                userCls: 'employee-info-general-field',
                ui: 'employeeinfo-textfield'
            },
            items: [
                {
                    xtype: 'selectfield',
                    name: 'department',
                    label: 'Department',
                    displayField: 'Name',
                    valueField: 'Id',
                    reference: 'departments',
                    bind: '{info.Department}',
                },
                {
                    name: 'badge_id',
                    label: 'Badge #',
                    bind: '{info.Badge}'
                }
            ]
        },
        {
            xtype: 'fieldset',
            userCls: 'employee-info-fieldset',
            layout: 'hbox',
            defaults: {
                flex: 1,
                xtype: 'breeze-textfield',
                userCls: 'employee-info-general-field',
                ui: 'employeeinfo-textfield'
            },
            items: [
                {
                    name: 'comp_rate',
                    xtype: 'numberfield',
                    minValue: 0, decimals: 2,
                    label: 'Compensation',
                    bind: '{info.CompRate}'
                },
                {
                    xtype: 'selectfield',
                    label: 'Compensation Frequency',
                    name: 'comp_per',
                    store: 'CompensationOptions',
                    bind: '{info.CompPer}',
                    displayField: 'Description',
                    valueField: 'ID'
                },
                {
                    name: 'payroll',
                    label: 'Payroll #',
                    bind: '{info.Payroll}'
                }
            ]
        }
    ]
});