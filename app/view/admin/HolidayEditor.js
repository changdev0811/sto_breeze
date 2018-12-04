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
            // +++ Allow h scroll when panel is too small +++
            scrollable:'x',
            userCls:'admin-fieldset no-border',
            defaults: {
                ui: 'admin admin-text',
            },
            items: [

                {
                    xtype: 'selectfield',
                    ui: 'reporting reporting-text reporting-date',

                    //name: 'recYear',
                    width:'200pt',
                    label:'Holidays for Year',
                    labelAlign:'left',
                    labelWidth:'auto',
                    store: 'Years',
                    displayField: 'Year', valueField: 'Year',
                    bind: { value: String( (new Date()).getYear() + 1900 ) } //<-- this should probably be in the model.js
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
                    style:'width:150pt;'

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


            // +++ Allow h scroll when panel is too small +++
            scrollable:true,

            flex: 1,
            items:[
                // Column 1
                {
                    xtype:'panel',
                    ui:'admin-sub',
                    userCls:'admin-fieldset no-padding no-border',
                    layout:'vbox',
                    flex: 1,

                    // +++ fixed width +++
                    minWidth:'150pt',
                    maxWidth:'200pt',

                    minHeight:'420pt',


                    items:[
                        {    
                            xtype: 'fieldset',
                            userCls:'admin-fieldset no-side-margin',
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
                                    userCls: 'employeeinfo-shift-grid no-border no-background',
                                    flex:1,
                                    layout: 'hbox',
                                    hideHeaders: true,
                                    rootVisible: false,
                                    columns: [
                                        {
                                            xtype: 'checkcolumn',
                                            cell: {
                                                ui: 'admin-tree-column admin-tree-item',
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
                                                ui: 'admin-tree-column admin-tree-item',
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

                    // +++ fixed width +++
                    minWidth:'250pt',
                    maxWidth:'350pt',

                    minHeight:'420pt',



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
                                    userCls:'admin-fieldset no-border no-margin',

                                },
                                {
                                    xtype: 'spinnerfield',
                                    ui: 'admin admin-text',
                                    userCls:'admin-fieldset no-border no-margin',
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
                                    ui: 'minicalendar-admin',//'wtr-small',,
                                    collapsed: true,
                                    margin: '10pt 10pt 0pt 10pt',
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
                                    userCls: 'employee-info-general-field no-margin no-padding',
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
                                        ui: 'reporting admin-text'
                                    },
                                    items: [
                                        {
                                            xtype: 'selectfield',
                                            name: 'week',
                                            flex: 2,
                                            options: [
                                                { text: '1st', value: 1 },
                                                { text: '2nd', value: 2 },
                                                { text: '3rd', value: 3 },
                                                { text: '4th', value: 4 },
                                                { text: '5th', value: 5 },
                                            ]//<-- this should probably be in the model.js
                                        },
                                        {
                                            xtype: 'container',
                                            width: '10pt' //Spacing
                                        },
                                        {
                                            xtype: 'selectfield',
                                            name: 'day',
                                            flex: 3,
                                            options: [
                                                { text: 'Sunday',       value: 1 },
                                                { text: 'Monday',       value: 2 },
                                                { text: 'Tuesday',      value: 3 },
                                                { text: 'Wednesday',    value: 4 },
                                                { text: 'Thursday',     value: 5 },
                                                { text: 'Friday',       value: 6 },
                                                { text: 'Saturday',     value: 7 },
                                            ]//<-- this should probably be in the model.js
                                        },
                                        {
                                            xtype: 'container',
                                            width: '10pt' //Spacing
                                        },
                                        {
                                            xtype: 'selectfield',
                                            name: 'month',
                                            flex: 3,
                                            options: [
                                                { text: 'January', value: 1 },
                                                { text: 'February', value: 2 },
                                                { text: 'March', value: 3 },
                                                { text: 'April', value: 4 },
                                                { text: 'May', value: 5 },
                                                { text: 'June', value: 6 },
                                                { text: 'July', value: 7 },
                                                { text: 'August', value: 8 },
                                                { text: 'September', value: 9 },
                                                { text: 'October', value: 10 },
                                                { text: 'November', value: 11 },
                                                { text: 'December', value: 12 },
                                            ]//<-- this should probably be in the model.js
                                        },


                                    ]
                                }
                            ]
                        },
                    ]
                },
            ]
        },

        {
            xtype: 'toolbar',
            ui:'admin-fieldset',
            userCls:'admin-fieldset no-border no-padding no-background',
            shadow: false,
            items:[
                {
                    xtype: 'button',
                    text: 'Save Holiday Schedule',
                    ui: 'action',                   
                    userCls:'admin-fieldset-no-border',
                    style:'width:175pt;'

                },
                {
                    xtype:'spacer',
                    flex:1,
                },
                {
                    xtype: 'button',
                    text: 'save',
                    ui: 'action',                   
                    userCls:'admin-fieldset-no-border',
                    style:'width:175pt;'

                },

            ]
        }




    ]
});