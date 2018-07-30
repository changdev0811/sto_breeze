Ext.define('Breeze.view.employee.information.General', {
    extend: 'Ext.Container',
    alias: 'widget.employee.information.general',

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
        },
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
                    name: 'ssn',
                    label: 'SSN'
                },
                {
                    xtype: 'datefield',
                    name: 'date_of_birth',
                    label: 'Birth Date',
                    //msgTarget
                    //invalidText
                },
                {
                    xtype: 'selectfield',
                    name: 'gender',
                    label: 'Gender',
                    options: [
                        {text: 'Male', value: 'male'},
                        {text: 'Female', value: 'female'},
                        {text: 'Other', value: 'other'}
                    ]
                }
            ]
        }
    ]
});