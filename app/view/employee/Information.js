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
        // 'Breeze.view.employee.information.General',
        // 'Breeze.view.employee.information.Company',
        // 'Breeze.view.employee.information.Schedule',
        // 'Breeze.view.employee.information.Security',
        'Breeze.view.employee.InformationController'
    ],

    layout: 'vbox',

    controller: 'employee.information',
    listeners: {
        initialize: 'onInit'
    },

    userCls: 'employee-info-outer-container',

    items: [
        {
            xtype: 'tabpanel',
            layout: {
                animation: 'fade'
            },
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
                    itemId: 'employeeTab',
                    title: 'Employee',
                    items: [
                        {
                            xtype: 'employee.information.general',
                            userCls: 'employee-info-tab-form'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    itemId: 'companyTab',
                    title: 'Company',
                    items: [
                        {
                            xtype: 'employee.information.company',
                            userCls: 'employee-info-tab-form'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    itemId: 'scheduleTab',
                    title: 'Schedule',
                    items: [
                        {
                            xtype: 'employee.information.schedule',
                            userCls: 'employee-info-tab-form'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    itemId: 'securityTab',
                    title: 'Security',
                    items: [
                        {
                            xtype: 'employee.information.security',
                            userCls: 'employee-info-tab-form'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    reference: 'punchTab',
                    title: 'Punch Policy'
                }
            ]
        }
    ]
});