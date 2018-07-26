/**
 * Employee Information View
 * @class Information
 * @namespace Breeze.view.employee
 * @alias Breeze.view.employee.Information
 */
Ext.define('Breeze.view.employee.Information', {
    extend: 'Ext.Container',
    alias: 'widget.employee.information',

    requires: [
        'Ext.tab.Panel',
        'Breeze.view.employee.information.General'
    ],

    layout: 'vbox',

    items: [
        {
            xtype: 'tabpanel',
            // TODO: Create Themer UI Override and reference here
            ui: 'employeeInfoTabs',
            tabBar: {
                defaultTabUI: 'employeeInfoTabs'
            },
            flex: 1,
            defaults: {
                userCls: 'employee-info-tab-container'
            },
            items: [
                // containers with title and items containing body
                {
                    xtype: 'container',
                    title: 'Employee',
                    items: [
                        {
                            xtype: 'employee.information.general'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    title: 'Company'
                },
                {
                    xtype: 'container',
                    title: 'Schedule'
                },
                {
                    xtype: 'container',
                    title: 'Security'
                },
                {
                    xtype: 'container',
                    title: 'Punch Policy'
                }
            ]
        }
    ]
})