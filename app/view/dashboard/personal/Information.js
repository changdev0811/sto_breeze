/**
 * Personal Dashboard > Employee Information Widget
 * @class Information
 * @alias Breeze.view.dashboard.personal.Information
 */
Ext.define('Breeze.view.dashboard.personal.Information', {
    extend: 'Ext.Panel',
    alias: 'widget.dashboard.personal.information',

    layout: 'fit',

    title: 'Employee Info',

    bind: {
        title: '{fullName}'
    },

    ui: 'employee-info-dashboard',

    tools: [
        {
            iconCls: 'x-fas fa-angle-right'
        }
    ],

    items: [
        {
           layout: 'hbox',
           xtype: 'container',
           padding: '8pt',
           items: [
               {
                   xtype: 'image',
                   margin: '0pt 8pt 8pt 8pt 8pt',
                   height: '96pt',
                   width: '96pt',
                   bind: {
                       src: '{profileImage}'
                   },
                   userCls: 'employee-info-dashboard-picture'
               },
               {
                   xtype: 'container',
                   flex: 1,
                   layout: 'vbox',
                   items: [
                       {
                           xtype: 'container',
                           layout: 'hbox',
                           defaults: {
                               xtype: 'displayfield',
                               ui: ['employeeinfo-textfield','employeeinfo-display'],
                               flex: 1
                           },
                           items: [
                               {
                                   label: 'Department',
                                   bind: {
                                       value: '{employeeInfo.DepartmentName}'
                                   }
                               },
                               {
                                   label: 'Gender',
                                   value: 'Male'
                               }
                           ]
                       },
                       {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                xtype: 'displayfield',
                                ui: ['employeeinfo-textfield','employeeinfo-display'],
                                flex: 1
                            },
                            items: [
                                {
                                    label: 'Hire Date',
                                    bind: {
                                        value: '{employeeInfo.HireDate}'
                                    }
                                },
                                {
                                    label: 'Birth Date',
                                    bind: {
                                        value: '{employeeInfo.BirthDate}'
                                    }
                                }
                            ]

                        }
                   ]
               }
           ]
           
        },
    ]

});