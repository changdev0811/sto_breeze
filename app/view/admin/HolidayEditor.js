/**
 * HolidayEditor Admin view
 * @class HolidayEditor
 * @namespace Breeze.view.admin.HolidayEditor
 * @alias widget.admin.holidayeditor
 */
Ext.define('Breeze.view.admin.HolidayEditor', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.holidayeditor',

    requires: ['Breeze.widget.panel.MiniCalendarSingle'],

    config: {
        crumbTitle: 'Holiday Editor'
    },

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
    buttons: [
        {
            xtype: 'button',
            text: 'Apply Holiday Schedule',
            handler: 'onApplySchedule',
            ui: 'action',
            style:'width:175pt;'
        }, 
        {
            xtype: 'spacer',
        },
        {
            xtype: 'button',
            ui: 'confirm alt',
            text: 'Save',
            handler: 'onSaveButton',
            style:'width:175pt;'
        }
    ],

    // Adjust action button toolbar spacing and appearance with UI and shadow
    buttonToolbar: {
        xtype: 'toolbar',
        ui: 'admin-actions',
        shadow: false
    },

    dialog: {
        xtype: 'dialog',
        // width: '400pt', height: '400pt',
        ui: 'light-themed-dialog employeeinfo-dialog',
        title: 'Save Forward',

        items: [
            {
                xtype: 'containerfield',
                itemId: 'forwardMode',
                reference: 'forwardMode',
                layout: 'vbox',
                bind: {
                    values: {
                        mode: false
                    }
                },

                items: [
                    {
                        xtype: 'radio',
                        name: 'mode',
                        bodyAlign: 'stretch',
                        value: false,
                        boxLabel: 'Next Year',
                        bind: {
                            groupValue: '{forwardMode.mode}'
                        }
                    },
                    {
                        xtype: 'radio',
                        name: 'mode',
                        bodyAlign: 'stretch',
                        value: true,
                        boxLabel: 'All Future Years',
                        bind: {
                            groupValue: '{forwardMode.mode}'
                        }
                    }
                ]
            }
        ],

        buttons: [
            {
                text: 'Confirm',
                ui: 'action alt',
                handler: 'onSaveForFuture'
            },
            // {
            //     xtype: 'spacer', width: '8pt'
            // },
            // {
            //     text: 'Cancel',
            //     ui: 'decline alt',
            //     handler: 'onFutureSaveDialogCancel'
            // }
        ]
    },

    // Body contents
    items: [
        // Top 1

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
                    xtype:'container',
                    //ui:'admin-sub',
                    //userCls:'admin-fieldset  no-border',
                    layout:'vbox',
                    flex: 1,

                    // +++ fixed width +++
                    minWidth:'250pt',
                    maxWidth:'350pt',

                    minHeight:'420pt',


                    items:[
                        
                        {
                            xtype: 'fieldset',
                            layout: 'vbox',
                            // +++ Allow h scroll when panel is too small +++
                            scrollable:'x',
                            //userCls:'admin-fieldset no-border',

                            userCls:'admin-fieldset',


                            title:'Holidays for Year',
                            defaults: {
                                ui: 'admin admin-text',
                            },
                            items: [

                                {
                                    xtype: 'selectfield',
                                    ui: 'reporting reporting-text reporting-date',
                                    width:'200pt',
                                    label:'',
                                    labelAlign:'left',
                                    labelWidth:'auto',
                                    store: 'Years',
                                    displayField: 'Year', valueField: 'Year',
                                    bind: { value: '{currentYear}' },
                                    listeners: {
                                        select: 'onYearChange'
                                    }
                                },
                                {
                                    xtype:'spacer',
                                    height:'5pt',

                                },
                                {
                                    xtype: 'button',
                                    text: 'Save for Future Use',
                                    handler: 'showFutureSaveDialog',
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

                        {    
                            xtype: 'fieldset',
                            userCls:'admin-fieldset no-padding',
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
                                            handler: 'onAddHoliday'            
                                        },

                                    ]
                                },
                                {
                                    xtype: 'grid',
                                    ui: 'admin-grid',
                                    height: '100%',
                                    reference: 'holidaysGrid',
                                    // sortable: false, 
                                    columnResize: false,
                                    columnMenu: false, 
                                    hideHeaders: false,
                                    selectable: { mode: 'single' },
                                    bind: {
                                        store: '{holidays}'
                                    },
                                    defaults: {
                                        xtype: 'gridcolumn',
                                        userCls:'no-border',
                                        menuDisabled: true
                                    },
                                    layout: 'vbox',
                                    columns: [
                                        {
                                            xtype: 'datecolumn',
                                            dataIndex: 'holiday_Date',
                                            text: 'Date',
                                            width: 125                                   },
                                        {
                                            text: 'Holiday Name',
                                            dataIndex: 'holiday_Name',
                                            flex: 1,
                                            cell: {
                                                toolDefaults: {
                                                    ui: 'employeeinfo-grid-tool',
                                                    zone: 'end'
                                                },
                                                tools: [
                                                    {
                                                        iconCls: 'x-fas fa-times',
                                                        handler: 'onRemoveHoliday'
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    listeners: {
                                        select: 'onHolidaySelect'
                                    }
                                }
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
                                    ui: 'admin admin-text',
                                    required: true,
                                    userCls:'admin-fieldset no-border no-margin',
                                    bind: {
                                        value: '{holidayData.holiday_Name}'
                                    }
                                },
                                {
                                    xtype: 'spinnerfield',
                                    ui: 'admin admin-text',
                                    userCls:'admin-fieldset no-border no-margin',
                                    label:'Percentage',
                                    maxValue: 100,
                                    minValue: 0,
                                    decimals: 2,
                                    labelAlign:'left',
                                    labelWidth:'auto',
                                    bind: {
                                        value: '{holidayPercentage}'
                                    }
                                },
                                {
                                    xtype: 'panel.minicalendarsingle',
                                    reference: 'dateSelector',
                                    userCls: 'admin-mini-calendar',
                                    ui: 'minicalendar-admin',//'wtr-small',,
                                    collapsed: true,
                                    margin: '10pt 10pt 0pt 10pt',
                                    listeners: {
                                        dateselect: 'onHolidayCalendarDateSelect'
                                    },
                                    bind: {
                                        value: '{holidayData.holiday_Date}'
                                    }
                                },

                                {
                                    xtype: 'breeze-checkbox',
                                    boxLabel: 'Floating Holiday?',
                                    labelWidth: 'auto',
                                    // ui: 'employeeinfo-checkbox',
                                    ui: 'admin admin-text',
                                    userCls: 'employee-info-general-field no-margin no-padding',
                                    bodyAlign: 'stretch',
                                    reference: 'checkFloating',
                                    bind: {
                                        checked: '{floatingDate}'
                                    },
                                    listeners: {
                                        change: 'onFloatingHolidayToggle'
                                    }
                                },
                                {
                                    xtype:'container',
                                    layout:'hbox',
                                    userCls: 'employee-info-general-field',
                                    defaults: {
                                        ui: 'reporting admin-text'
                                    },
                                    bind: {
                                        hidden: '{!checkFloating.checked}'
                                    },
                                    items: [
                                        {
                                            xtype: 'selectfield',
                                            flex: 2,
                                            displayField: 'text', valueField: 'data',
                                            bind: {
                                                store: '{week}',
                                                value: '{holidayData.float_Week}'
                                            },
                                            listeners: {
                                                change: 'onFloatingHolidayWeekChange'
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            width: '10pt' //Spacing
                                        },
                                        {
                                            xtype: 'selectfield',
                                            flex: 3,
                                            displayField: 'text', valueField: 'data',
                                            bind: {
                                                store: '{weekday}',
                                                value: '{holidayData.float_Day}'
                                            },
                                            listeners: {
                                                change: 'onFloatingHolidayDayChange'
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            width: '10pt' //Spacing
                                        },
                                        {
                                            xtype: 'selectfield',
                                            reference: 'floatMonth',
                                            flex: 3,
                                            displayField: 'text', valueField: 'data',
                                            bind: {
                                                store: '{month}',
                                            },
                                            listeners: {
                                                change: 'onFloatingHolidayMonthChange'
                                            }
                                        },


                                    ]
                                }
                            ]
                        },
                    ]
                },
            ]
        },

        // {
        //     xtype: 'toolbar',
        //     ui:'admin-fieldset',
        //     userCls:'admin-fieldset no-border no-padding no-background',
        //     shadow: false,
        //     items:[
        //         {
        //             xtype: 'button',
        //             text: 'Save Holiday Schedule',
        //             ui: 'action',                   
        //             userCls:'admin-fieldset-no-border',
        //             style:'width:175pt;'

        //         },
        //         {
        //             xtype:'spacer',
        //             flex:1,
        //         },
        //         {
        //             xtype: 'button',
        //             text: 'save',
        //             ui: 'action',                   
        //             userCls:'admin-fieldset-no-border',
        //             style:'width:175pt;'

        //         },

        //     ]
        // }

    ]
});