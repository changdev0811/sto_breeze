Ext.define('Breeze.view.employee.information.Company', {
    extend: 'Ext.Container',
    alias: 'widget.employee.information.company',

    layout: 'vbox',

    items: [
        {
            xtype: 'fieldset',
            userCls: 'employee-info-fieldset',
            layout: 'hbox',
            title: 'Name',
            defaults: {
                flex: 1,
                xtype: 'textfield',
                userCls: 'employee-info-general-field',
                ui: 'employeeinfo-textfield'
            },
            items: [
                {
                    name: 'first_name2',
                    label: 'First'
                },
                {
                    name: 'middle_name2',
                    label: 'Middle'
                },
                {
                    name: 'last_name2',
                    label: 'Last'
                }
            ]
        }
    ]
});