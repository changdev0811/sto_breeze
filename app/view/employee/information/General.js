/**
 * Employee Information > General Tab View
 * @class General
 * @alias Breeze.view.employee.information.General
 */
Ext.define('Breeze.view.employee.information.General', {
    extend: 'Ext.Container',
    alias: 'widget.employee.information.general',


    padding:'8pt',


    requires: [
        'Breeze.widget.field.Text'
    ],

    layout: 'vbox',

    plugins: {
        readOnlyPlug: {
            type: 'breeze.form.readonly',
            recursive: true,
            expression: 'readOnly'
        }
    },

    items: [
        {
            xtype: 'fieldset',
            userCls: 'employee-info-fieldset no-side-margin',
            layout: 'hbox',
            title: 'Name',
            defaults: {
                flex: 1,
                xtype: 'breeze-textfield',
                userCls: 'employee-info-general-field',
                ui: 'employeeinfo-textfield'
            },
            items: [
                {
                    name: 'first_name',
                    label: 'First',
                    // id: 'firstName',
                    required: true,
                    bind: {
                        value: '{info.FirstName}'
                    }
                },
                {
                    name: 'middle_name',
                    label: 'Middle',
                    bind: { value: '{info.MiddleName}' }
                },
                {
                    name: 'last_name',
                    required: true,
                    label: 'Last',
                    bind: { value: '{info.LastName}' }
                }
            ]
        },
        {
            xtype: 'fieldset',
            userCls: 'employee-info-fieldset no-side-margin',
            layout: 'hbox',
            // title: 'Name',
            defaults: {
                flex: 1,
                xtype: 'breeze-textfield',
                userCls: 'employee-info-general-field',
                ui: 'employeeinfo-textfield',
                // bind: {
                //     // make fields readonly when view model has readOnly set to true 
                //     editable: '{!readOnly}',
                //     readOnly: '{readOnly}'
                // }
            },
            items: [
                {
                    // name: 'ssn',
                    label: 'SSN',
                    reference: 'ssnPlain',
                    // autoHideInputMask: true,
                    // inputMask: '999-99-9999',
                    bind: { 
                        value: '{info.SSN}',
                        hidden: '{!perms.ssn}'
                    }
                },
                {
                    // label: 'SSN',
                    reference: 'ssnHidden',
                    value: '(hidden)',
                    readOnly: true,
                    ignoreReadOnly: true,
                    bind: {
                        hidden: '{perms.ssn}'
                    }
                },
                {
                    xtype: 'datefield',
                    name: 'date_of_birth',
                    label: 'Birth Date',
                    edgePicker: {},
                    // picker: {
                    //     xtype: 'datepicker',
                    //     title: 'Select Birth Date'
                    // },
                    bind: { value: '{info.BirthDate}' }
                    //msgTarget
                    //invalidText
                },
                {
                    xtype: 'selectfield',
                    // name: 'gender',
                    label: 'Gender',
                    store: 'GenderOptions',
                    bind: { value: '{info.Gender}' },
                    displayField: 'Description',
                    valueField: 'ID'
                }
            ]
        }
    ]
});