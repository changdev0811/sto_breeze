/**
 * HolidayEditor Report form
 * @class HolidayEditor
 * @namespace Breeze.view.admin.HolidayEditor
 * @alias widget.admin.holidayeditor
 */
Ext.define('Breeze.view.admin.HolidayEditor', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.holidayeditor',

    // Layout and base styles
    layout: 'vbox',
    ui: 'wtr-panel',

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
        {
            xtype: 'container',
            layout: 'hbox',
            userCls:'admin-fieldset-no-border',
            defaults: {
                ui: 'reporting reporting-text',
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


        {
            xtype:'panel',
            ui:'admin-sub',
            layout:'hbox',
            flex: 1,
            items:[
                {
                    
                    xtype: 'panel',
                    title: 'Holiday Schedule',
                    ui: 'admin-sub',
                    flex: 1,
                    layout: 'vbox',

                    
                    buttons: {
                        apply: { text: 'Apply Holiday Schedule', /*handler: 'onPrintPDF',*/ ui: 'action', userCls:'tool-button-left' },
                        add: { iconCls:'x-fas fa-plus'  /* userCls:'NEED NEW CLASS FOR THESE '*/},
                    },

                    buttonAlign: 'left',
                    buttonToolbar: {
                        xtype: 'toolbar',
                        ui: 'admin-actions',
                        shadow: false
                    },

                    items:[
                        {

                            xtype: 'container',
                            userCls:'admin-fieldset',
                            flex: 1,
                            layout: 'vbox',
                        },

                    ]
                },
                {
                    
                    xtype: 'panel',
                    title: 'Holiday Details',
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

                            xtype: 'container',
                            userCls:'admin-fieldset',
                            flex: 1,
                            layout: 'vbox',
                            items:[

                                {
                                    xtype: 'breeze-textfield',
                                    label: 'Holiday Name',
                                    name:'holiday_Name',
                                    ui: 'admin admin-text',
                                    userCls:'admin-fieldset-no-border',

                                },
                                {
                                    xtype: 'spinnerfield',
                                    ui: 'reporting reporting-text',
                                    userCls:'admin-fieldset-no-border',
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