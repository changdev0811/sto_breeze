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
                    label: 'First',
                    id: 'firstName',
                    bind: '{info.FirstName}'
                },
                {
                    name: 'middle_name',
                    label: 'Middle',
                    bind: '{info.MiddleName}'
                },
                {
                    name: 'last_name',
                    label: 'Last',
                    bind: '{info.LastName}'
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
                    label: 'SSN',
                    bind: '{info.SSN}'
                },
                {
                    xtype: 'datefield',
                    name: 'date_of_birth',
                    label: 'Birth Date',
                    bind: '{info.BirthDate}'
                    //msgTarget
                    //invalidText
                },
                {
                    xtype: 'selectfield',
                    name: 'gender',
                    label: 'Gender',
                    store: 'GenderOptions',
                    bind: '{info.Gender}',
                    displayField: 'Description',
                    valueField: 'ID'
                }
            ]
        }
    ]
});