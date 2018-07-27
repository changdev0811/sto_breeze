/**
 * Employee FYI View
 * @class Breeze.view.employee.Fyi
 */
Ext.define('Breeze.view.employee.Fyi2',{
    extend: 'Ext.Container',
    alias: 'widget.employee.fyi2',

    requires: [
        'Breeze.view.employee.Fyi2Controller',
        'Breeze.view.employee.Fyi2Model',
        'Breeze.view.employee.fyi.Grid',
        'Ext.field.Display',
        'Ext.field.Date',
        'Ext.picker.Date'
    ],
    
    viewModel: {
        type: 'employee.fyi2'
    },
    controller: 'employee.fyi2',

    layout: 'vbox',

    items: [
        
        // info panel at top
        {
            xtype: 'container',
            flex: 1,
            layout: 'vbox',
            items: [
                {
                    xtype: 'displayfield',
                    label: 'Employee Name',
                    bind: {
                        value: '{employeeName}'
                    },
                    flex: 1
                },
                {
                    xtype: 'displayfield',
                    label: 'Department',
                    bind: {
                        value: '{departmentName}'
                    },
                    flex: 1
                },
                {
                    xtype: 'displayfield',
                    label: 'Hire Date',
                    bind: {
                        value: '{hireDate}'
                    },
                    flex: 1
                }/*,
                {
                    xtype: 'displayfield',
                    label: 'Points',
                    value: '2018/01/01',
                    flex: 1
                }*/
            ]
        },
        //{ xtype: 'form', items: [
        {
            xtype: 'container',
            items: [
                {
                    xtype: 'datefield',
                    name: 'viewdate_field',
                    label: 'FYI View as of',
                    picker: {
                        xtype: 'datepicker',
                        title: 'Select Date'
                    },
                    value: Ext.util.Format.date(new Date(), 'm/d/y')
                }
            ]
        }, {
            xtype: 'container',
            flex: 3,
            scrollable: false,
            layout: 'box',
            items: [
                {
                    xtype: 'employee.fyi.grid',
                    width: '100%', height: '100%',
                    reference: 'fyiGrid'
                }
            ]
            // xtype: 'employee.fyi.grid',
            // reference: 'fyiGrid'
        }, {
            xtype: 'container',
            items: [
                {
                    xtype: 'checkbox',
                    // docked: 'left',
                    name: 'scheduled_checkbox',
                    label: 'Show Scheduled recorded time',
                    labelAlign: 'right',
                    labelWidth: 'auto'
                }
            ]
        }
        // ]}
    ]



});