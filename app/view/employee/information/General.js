Ext.define('Breeze.view.employee.information.General', {
    extend: 'Ext.Container',
    alias: 'widget.employee.information.general',

    layout: 'vbox',

    items: [
        {
            xtype: 'fieldset',
            layout: 'hbox',
            title: 'Name',
            defaults: {
                flex: 1,
                xtype: 'textfield',
                userCls: 'employee-info-general-field',
                ui: 'employeeInfoTextField'
            },
            items: [
                {
                    name: 'first_name',
                    label: 'First'
                },
                {
                    name: 'middle_name',
                    label: 'Middle'
                },
                {
                    name: 'last_name',
                    label: 'Last'
                }
            ]
        }
    ]
});