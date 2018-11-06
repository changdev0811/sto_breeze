/**
 * HolidayEditor Admin view
 * @class HolidayEditor
 * @namespace Breeze.view.admin.HolidayEditor
 * @alias widget.admin.holidayeditor
 */
Ext.define('Breeze.view.admin.HolidayEditor', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.holidayeditor',

    // View Model
    viewModel: {
        type: 'admin.holidayeditor'
    },

    // Controller
    controller: 'admin.holidayeditor',
    listeners: {
        initialize: 'onInit'
    },


    // Layout and base styles
    layout: 'vbox',
    ui: 'admin-base',

    title: 'Holiday Editor',

    // Action buttons shown at bottom of panel
    //buttonAlign: 'right',
    //buttons: {
    //    pdf: { text: 'Save Accrual Policy', /* handler: 'onPrintPDF',*/ ui: 'action' },
    //    excel: { text: 'Save', /* handler: 'onPrintExcel',*/ ui: 'action' },
    //},

    // Adjust action button toolbar spacing and appearance with UI and shadow
    buttonToolbar: {
        xtype: 'toolbar',
        ui: 'admin-actions',
        shadow: false
    },

    // Body contents
    items: [
        // Top 1
        {
            xtype: 'container',
            layout: 'hbox',
            userCls:'admin-fieldset no-border',
            defaults: {
                ui: 'admin admin-text',
            },
            items: [
                {
                    xtype: 'combobox',
                    name: 'recYear',
                    width:'200pt',
                    label:'Holidays for Year',
                    labelAlign:'left',
                    labelWidth:'auto',
                    name: 'duration_amount',
                    name: 'category_balance_cap_unit',
                    valueField: 'code',
                    displayField: 'description',
                    style: 'padding-left: 4pt',

                },

                {
                    xtype:'spacer',
                    width:'20pt',

                },

                {


                    xtype: 'button',
                    text: 'Save for Future Use',
                    ui: 'action',                   
                    userCls:'admin-fieldset-no-border',

                },
                {
                    xtype:'container',
                    flex:2
                }
            ]
        },
        // Bottom
        {
            xtype:'panel',
            ui:'admin-sub',
            layout:'hbox',
            flex: 1,
            items:[
                // Column 1
                {
                    xtype:'panel',
                    ui:'admin-sub',
                    userCls:'admin-fieldset no-padding no-border',
                    layout:'vbox',
                    flex: 1,


                    buttons: {
                        apply: { text: 'Apply Holiday Schedule',  ui: 'action'},
                    },

                    buttonAlign: 'left',
                    buttonToolbar: {
                        xtype: 'toolbar',
                        ui: 'admin-actions',
                        shadow: false
                    },


                    items:[
                        {    
                            xtype: 'fieldset',
                            userCls:'admin-fieldset no-margin',
                            flex: 1,
                            layout: 'vbox',

                            items:[
                                {
                                    xtype: 'toolbar',
                                    ui:'admin-tree',
                                    shadow: false,
                                    items:[
                                        { 
                                            xtype: 'component', 
                                            html: 'Holiday Schedule',
                                            userCls:'admin-title-toolbar', 
                                        },
                                        {
                                            xtype:'spacer',
                                            flex:1,
                                        },
                                        {
                                            xtype: 'button',
                                            //text: 'Save for Future Use',
                                            iconCls:'x-fas fa-plus',
                                            ui: 'plain wtr-button',                   
                                        },

                                    ]
                                },
                                {
                                    xtype: 'tree',
                                    // == Item ID to make finding tree in panel easier
                                    itemId: 'tree',
                                    ui: 'employeeinfo-shift-grid',
                                    userCls: 'employeeinfo-shift-grid no-border',
                                    flex:1,
                                    layout: 'hbox',
                                    hideHeaders: true,
                                    rootVisible: false,
                                    columns: [
                                        {
                                            xtype: 'checkcolumn',
                                            cell: {
                                                ui: 'report-tree-column reporting-tree-item',
                                            },
                                            dataIndex: 'checked',
                                            minWidth: '2em',
                                            width: 'auto',
                                            padding: 0,
                                            //listeners: {
                                            //    checkChange: 'onTreeGridChecked'
                                            //}
                                        },
                                        {
                                            xtype: 'treecolumn',
                                            cell: {
                                                ui: 'report-tree-column reporting-tree-item',
                                            },
                                            dataIndex: 'text',
                                            flex: 1,
                                            layout: {
                                                alignment: 'stretch'
                                            }
                                        }
                                    ],

                                    bind: '{departmentsTree}'
                                },
                            ]
                        },
                    ]
                },
                // Column 2
                {
                    
                    xtype: 'panel',
                    ui: 'admin-sub',
                    flex: 1,
                    layout: 'vbox',

                    buttons: {
                        add: { text: 'Save', /*handler: 'onPrintPDF',*/ ui: 'action' },
                    },


                    buttonToolbar: {
                        xtype: 'toolbar',
                        ui: 'admin-actions',
                        shadow: false
                    },



                    items:[
                        {

                            xtype: 'fieldset',
                            title:'Holiday Details',
                            userCls:'admin-fieldset',
                            flex: 1,
                            layout: 'vbox',
                            items:[

                                {
                                    xtype: 'breeze-textfield',
                                    label: 'Holiday Name',
                                    name:'holiday_Name',
                                    ui: 'admin admin-text',
                                    userCls:'admin-fieldset no-border',

                                },
                                {
                                    xtype: 'spinnerfield',
                                    ui: 'admin admin-text',
                                    userCls:'admin-fieldset no-border',
                                    label:'Percentage',
                                    name: 'percentage',
                                    maxValue: 100,
                                    minValue: 0,
                                    labelAlign:'left',
                                    labelWidth:'auto',
                                    name: 'duration_amount',
                                },
                                {
                                    xtype: 'panel.minicalendar',
                                    reference: 'weekSelector',
                                    ui: 'minicalendar',//'wtr-small',,
                                    collapsed: true,
                                    margin: '0pt 10pt 0pt 10pt',
                                    listeners: {
                                        //change: 'onWeekChange'
                                    }
                                },

                                {
                                    xtype: 'breeze-checkbox',
                                    name: 'overtime_opt1',
                                    boxLabel: 'Floating Holiday?',
                                    name: 'floatingHoliday',
                                    labelWidth: 'auto',
                                    ui: 'employeeinfo-checkbox',
                                    userCls: 'employee-info-general-field',
                                    bodyAlign: 'stretch',
                                    reference: 'otCheck1',
                                    bind: {
                                        //checked: '{info.punchPolicy.Ot_Opt1}'
                                    },
                                    listeners: {
                                        //change: 'onOvertime1Change'
                                    }


                                },

                                {
                                    xtype:'container',
                                    name: 'floatOptions',
                                    layout:'hbox',
                                    userCls: 'employee-info-general-field',
                                    defaults: {
                                        ui: 'reporting reporting-text'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            flex: 1,
                                            name: 'week',
                                            valueField: 'data',
                                            displayField: 'text',
                                            editable: false,
                                            allowBlank: false,
                                            blankText: 'Week',
                                            forceSelection: true,
                                        },
                                        {
                                            xtype: 'container',
                                            width: '10pt' //Spacing
                                        },
                                        {
                                            xtype: 'combobox',
                                            flex: 2,
                                            name: 'day',
                                            valueField: 'data',
                                            displayField: 'text',
                                            editable: false,
                                            allowBlank: false,
                                            blankText: 'Day',
                                            forceSelection: true,
                                        },
                                        {
                                            xtype: 'container',
                                            width: '10pt' //Spacing
                                        },
                                        {
                                            xtype: 'combobox',
                                            flex: 2,
                                            name: 'month',
                                            valueField: 'data',
                                            displayField: 'text',
                                            editable: false,
                                            allowBlank: false,
                                            blankText: 'Month',
                                            forceSelection: true,
                                        },                                    ]




                                }

                            ]
                        },

                    ]
                },
            ]
        }
    ]
});