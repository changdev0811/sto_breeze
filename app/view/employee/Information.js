/**
 * Employee Information View
 * @class Information
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

    layout: 'hbox',

    viewModel: {
        type: 'employee.information'
    },

    controller: 'employee.information',
    listeners: {
        initialize: 'onInit'
    },

    userCls: 'employee-info-outer-container',

    items: [
        {
            xtype: 'employee.information.sidebar',
            userCls: 'employee-info-sidebar'
        },        
        {
            flex: 3,
            xtype: 'tabpanel',
            layout: {
                animation: 'fade'
            },
            // TODO: Create Themer UI Override and reference here
            ui: 'employeeInfoTabs',
            tabBar: {
                defaultTabUI: 'employeeInfoTabs',
                shadow: false
            },
            // flex: 1,
            defaults: {
                userCls: 'employee-info-tab-container'
            },
            items: [
                // containers with title and items containing body
                {
                    xtype: 'container',
                    reference: 'employeeTab',
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
                    id: 'companyTab',
                    title: 'Company',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'employee.information.company',
                            userCls: 'employee-info-tab-form'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    reference: 'scheduleTab',
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
                    title: 'Punch Policy',
                    layout: 'vbox',
                    // xtype: 'employee.information.punchpolicy',
                    items: [
                        {
                            xtype: 'selectfield',
                            name: 'punch_policy',
                            reference: 'punchPolicy',
                            displayField: 'Name',
                            label: 'Punch Policy',
                            valueField: 'ID',
                            bind: '{punchPolicy.policy_id}',
                            userCls: 'employee-info-general-field',
                            ui: 'employeeinfo-textfield',
                            required: true,
                            bind: '{info.punchPolicy.policy_id}'
                        },
                        {
                            xtype: 'employee.information.punchpolicy',
                            flex: 1
                        }
                    ]
                }
            ]
        }
    ]
});