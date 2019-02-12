/**
 * Employee EmployeeAccrualPolicy View
 * @class AccrualPolicy
 * @memberof Breeze.view.employee.
 * @extends Ext.Panel
 */
Ext.define('Breeze.view.employee.AccrualPolicy', {
    extend: 'Ext.Panel',
    alias: 'widget.employee.accrualpolicy',

    config: {
        crumbTitle: 'My Accrual Policy',
    },


    requires: [
        'Breeze.view.employee.AccrualPolicyController',
        'Ext.grid.plugin.CellEditing',
        'Ext.field.Display',
        'Ext.field.Date'
    ],

    viewModel: {
        type: 'employee.accrualpolicy'
    },

    controller: 'employee.accrualpolicy',

    listeners: {
        initialize: 'onInit'
    },


    //==[Start of Panel Setup/Styling]====
    tools: [
        {
            iconCls: 'x-fa fa-sync',
            handler: 'onRefreshTool'
        },
        {
            iconCls: 'x-fa fa-print',
            handler: 'onPrintTool'
        }
    ],


    title: 'Employee Accrual Policy',
    bind: {
        title: 'Employee Accrual Policy - {categoryAdjust.categoryName}'
    },
    ui: 'employee-accrual-policy-base',
    layout: 'hbox',
    userCls: 'employee-fyi-container',
    scrollable: true,
    // Action buttons shown at bottom of panel
    buttonAlign: 'right',
    buttons: [
        { 
            text: 'Save', itemId: 'save', handler: 'onSave',
            ui: 'confirm alt', style: 'width:125pt',
            hidden: true,
            bind: { hidden: '{isRestricted}' }
        }
    ],
    // Adjust action button toolbar spacing and appearance with UI and shadow
    buttonToolbar: {
        xtype: 'toolbar',
        ui: 'employee-fyi-actions',
        shadow: false,
    },
    items: [
        {
            xtype: 'container',
            flex: 2,
            layout: 'vbox',
            items: [
                // row 1
                // Category
                {
                    xtype: 'selectfield',
                    ui: 'fyi fyi-text',
                    userCls: 'fyi-fieldset no-side-margin no-border',
                    value: 'Max',
                    label: 'Category:',
                    valueField: 'Category_ID',
                    displayField: 'Category_Name',
                    labelAlign: 'left',
                    labelWidth: 'auto',
                    // Formats items with category color dot
                    itemTpl: [
                        '<div class="usercategories-widget-legend-item-label">',
                        '<div class="legend-item-dot" style="background-color:{Category_Color_HEX}"></div>',
                        '{Category_Name}</div>'
                    ],
                    bind: {
                        value: '{categoryId}',
                        store: '{categories}'
                    },
                    listeners: {
                        change: 'onCategoryChange'
                    }
                },

                // row 2
                // Year Type
                {
                    xtype: 'container', layout: 'hbox',
                    items: [
                        {
                            xtype: 'displayfield',
                            ui: 'fyi-display-field',
                            userCls: 'fyi-fieldset no-side-margin no-border',

                            label: 'Year Type:',
                        },
                        {
                            xtype: 'spacer',
                            width: '10pt',
                        },
                        {
                            xtype: 'containerfield',
                            userCls: 'fyi-fieldset no-side-margin',
                            layout: 'hbox',
                            defaults: {
                                bodyAlign: 'stretch',
                                ui: 'fyi',
                                xtype: 'radio',
                                style: 'padding-right: 8pt; padding-left: 8pt',
                                bind: {
                                    hidden: '{isRestricted}',
                                }
                            },
                            reference: 'calendarType',
                            bind: {
                                values: {
                                    calTypeRadio: '{categoryAdjust.calendarType}'
                                },
                            },
                            items: [
                                {
                                    name: 'calTypeRadio',
                                    boxLabel: 'Anniversary',
                                    value: 45,
                                    bind: {
                                        groupValue: '{calendarType.calTypeRadio}'
                                    }
                                },
                                {
                                    name: 'calTypeRadio',
                                    boxLabel: 'Calendar',
                                    value: 46,
                                    bind: {
                                        groupValue: '{calendarType.calTypeRadio}'
                                    }
                                },
                                {
                                    name: 'calTypeRadio',
                                    boxLabel: 'Fiscal',
                                    value: 47,
                                    bind: {
                                        groupValue: '{calendarType.calTypeRadio}'
                                    }
                                },
                                // Static component shown in restricted mode
                                {
                                    xtype: 'component',
                                    hidden: true,
                                    userCls: 'employee-accrual-policy-cmptext',
                                    bind: {
                                        hidden: '{!isRestricted}',
                                        data: {
                                            calType: '{categoryAdjust.calendarType}'
                                        }
                                    },
                                    tpl: [
                                        '<tpl switch="calType">',
                                        '<tpl case="45">Anniversary',
                                        '<tpl case="46">Calendar',
                                        '<tpl case="47">Fiscal',
                                        '</tpl>'
                                    ]
                                }
                            ]
                        }
                    ]
                },


                // row 3
                // View Date + Recording Year
                {
                    xtype: 'container',
                    //userCls: 'fyi-fieldset no-side-margin no-border',
                    layout: 'hbox',
                    //flex: 1,
                    items: [
                        {
                            xtype: 'containerfield',
                            ui: 'fyi',
                            userCls: 'no-padding',
                            labelAlign: 'left',
                            labelWidth: 'auto',
                            label: 'View Date:',
                            items: [
                                // {
                                //     xtype: 'button',
                                //     ui: 'icon wtr-button plain',
                                //     iconCls: 'x-fas fa-arrow-from-right',
                                //     iconAlign: 'top',
                                //     handler: 'onPrevYearButton'
                                // },
                                {
                                    xtype: 'datefield',
                                    userCls: 'no-side-margin no-padding no-border',
                                    ui: 'fyi fyi-text',
                                    //name: 'viewdate_field',
                                    width: '170pt',
                                    reference: 'viewDateField',
                                    picker: null,
                                    // picker: {
                                    //     xtype: 'datepicker',
                                    //     title: 'Select Date'
                                    // },
                                    bind: {
                                        value: '{categoryAdjust.viewDate}'
                                    },
                                    listeners: {
                                        change: 'onViewDateChange'
                                    }
                                },
                                // {
                                //     xtype: 'button',
                                //     ui: 'icon wtr-button plain',
                                //     iconCls: 'x-fas fa-arrow-to-right',
                                //     iconAlign: 'top',
                                //     handler: 'onNextYearButton'
                                // },
                            ]
                        },
                        

                        {
                            xtype: 'spacer',
                            width: '5pt',
                        },

                        {
                            xtype: 'selectfield',
                            ui: 'fyi fyi-text', userCls: 'fyi-fieldset no-padding no-border',
                            width: '160pt',
                            label: 'Recording Year:',
                            reference: 'recordingYearField',
                            labelAlign: 'left', labelWidth: 'auto',
                            // store: 'Years',
                            displayField: 'Year', valueField: 'Year',
                            // value: (new Date()).getYear() + 1900,
                            bind: {
                                value: '{categoryAdjust.recordingYear}',
                                store: '{recordedYears}'
                                // value: '{recordingYear}'
                            },
                            listeners: {
                                select: 'onRecordingYearSelect'
                            }
                        },
                        {
                            xtype: 'spacer',
                            width: '5pt',
                        },
                        {
                            xtype: 'component',
                            userCls: 'employee-accrual-policy-cmptext',
                            bind: {
                                html: '({categoryAdjust.recordingYearStart} - {categoryAdjust.recordingYearEnd})'
                            }
                        }
                    ]
                },

                // row 4
                // Accrual Rules Grid
                {
                    xtype: 'fieldset',
                    userCls: 'fyi-fieldset no-side-margin no-padding',
                    layout: 'vbox',
                    flex: 1,
                    items: [

                        {
                            xtype: 'toolbar',
                            ui: 'employee-fyi-tree',
                            shadow: false,
                            items: [
                                {
                                    xtype: 'checkbox',
                                    ui: 'reporting',
                                    boxLabel: 'Accrual Rules',
                                    bind: {
                                        checked: '{categoryAdjust.allowAccrual}',
                                        disabled: '{isRestricted}'
                                    }
                                },

                                { xtype: 'spacer', flex: 1 },

                                {
                                    xtype: 'button',
                                    iconCls: 'x-fas fa-plus',
                                    ui: 'plain wtr-button',
                                    bind: {
                                        hidden: '{isRestricted}'
                                    },
                                    listeners: {
                                        tap: 'onAccrualRuleAdd'
                                    }
                                },
                            ]
                        },

                        // Accrual Rules grid
                        {
                            xtype: 'grid',

                            reference: 'accrualRuleGrid',

                            ui: [
                                'employee-fyi-grid', 
                                'employee-ap-grid'
                            ], userCls: [
                                'employee-fyi-grid',
                                'no-background'
                            ],

                            hidden: true,
                            scrollable: 'y',

                            flex: 1,
                            hideHeaders: false,  sortable: false,  grouped: true,
                            
                            defaults: {
                                cell: {
                                    ui: [
                                        'employee-fyi-grid', 
                                        'employee-fyi-tree-item',
                                        'employee-ap-grid'
                                    ]
                                },
                                userCls: 'no-border',
                            },

                            defaultType: 'gridcolumn',

                            plugins: {
                                gridcellediting: true
                            },
                            bind: {
                                hidden: '{!categoryAdjust.allowAccrual}',
                                store: '{categoryRules}'
                            },
                            listeners: {
                                beforecompleteedit: 'onAccrualRuleBeforeEditComplete',
                                beforeedit: 'onAccrualRuleInfoBeforeEdit'
                            },

                            columns: [
                                {
                                    xtype: 'datecolumn',
                                    text: 'From',
                                    dataIndex: 'ruleStart', itemId: 'from',
                                    // flex: 1.5,
                                    menu: null, menuDisabled: true
                                },

                                {
                                    xtype: 'datecolumn',
                                    text: 'To',
                                    dataIndex: 'ruleEnd', itemId: 'to',
                                    // flex: 1.5,
                                    menu: null, menuDisabled: true
                                },
                                {
                                    text: 'Accrual Information',
                                    dataIndex: 'accrualChanged', itemId: 'info',
                                    flex: 4,
                                    menu: null, menuDisabled: true,
                                    tpl: ['<tpl if="accformInc!=0">',
                                        '<tpl if="accformPer==56||accformPer==119">Monthly Special: </tpl>',
                                        '{accformInc} ',
                                        '<tpl if="accformUnit==48">Day</tpl>',
                                        '<tpl if="accformUnit==49">Hour</tpl>',
                                        '<tpl if="accformUnit==50">Minute</tpl>',
                                        '<tpl if="accformInc!=1">s</tpl> ',
                                        '<tpl if="accformPer &lt; 115">',
                                            '<tpl if="accformPer==51">Weekly on ',
                                                '<tpl if="accformDay==1">Sunday</tpl>',
                                                '<tpl if="accformDay==2">Monday</tpl>',
                                                '<tpl if="accformDay==3">Tuesday</tpl>',
                                                '<tpl if="accformDay==4">Wednesday</tpl>',
                                                '<tpl if="accformDay==5">Thursday</tpl>',
                                                '<tpl if="accformDay==6">Friday</tpl>',
                                                '<tpl if="accformDay==7">Saturday</tpl>',
                                            '</tpl>',
                                            '<tpl if="accformPer==52">BiWeekly on the ',
                                                '<tpl if="accformDay &lt; 8"> first </tpl>',
                                                '<tpl if="accformDay &gt; 7"> second </tpl>',
                                                '<tpl if="accformDay==1||accformDay==8">Sunday</tpl>',
                                                '<tpl if="accformDay==2||accformDay==9">Monday</tpl>',
                                                '<tpl if="accformDay==3||accformDay==10">Tuesday</tpl>',
                                                '<tpl if="accformDay==4||accformDay==11">Wednesday</tpl>',
                                                '<tpl if="accformDay==5||accformDay==12">Thursday</tpl>',
                                                '<tpl if="accformDay==6||accformDay==13">Friday</tpl>',
                                                '<tpl if="accformDay==7||accformDay==14">Saturday</tpl>',
                                            '</tpl>',
                                            '<tpl if="accformPer==53">Monthly on ',
                                                '<tpl if="accformDay!=\'ANNIVERSARY\'">the </tpl>',
                                                '{accformDay}',
                                                '<tpl if="accformDay==1 ||accformDay==21||accformDay==31">st</tpl>',
                                                '<tpl if="accformDay==2 ||accformDay==22">nd</tpl>',
                                                '<tpl if="accformDay==3 ||accformDay==23">rd</tpl>',
                                                '<tpl if="accformDay!=1 &&accformDay!=2 &&accformDay!=3 &&accformDay!=21&&accformDay!=22&&accformDay!=23&&accformDay!=31&&accformDay!=\'ANNIVERSARY\'">th</tpl>',
                                            '</tpl>',
                                            '<tpl if="accformPer==54">Quarterly</tpl>',
                                            '<tpl if="accformPer==55">Semi-Annually</tpl>',
                                            '<tpl if="accformPer==56"> on ',
                                                '<tpl if="eval(accformDay.split(\'-\')[0])==1">January</tpl>',
                                                '<tpl if="eval(accformDay.split(\'-\')[0])==2">February</tpl>',
                                                '<tpl if="eval(accformDay.split(\'-\')[0])==3">March</tpl>',
                                                '<tpl if="eval(accformDay.split(\'-\')[0])==4">April</tpl>',
                                                '<tpl if="eval(accformDay.split(\'-\')[0])==5">May</tpl>',
                                                '<tpl if="eval(accformDay.split(\'-\')[0])==6">June</tpl>',
                                                '<tpl if="eval(accformDay.split(\'-\')[0])==7">July</tpl>',
                                                '<tpl if="eval(accformDay.split(\'-\')[0])==8">August</tpl>',
                                                '<tpl if="eval(accformDay.split(\'-\')[0])==9">September</tpl>',
                                                '<tpl if="eval(accformDay.split(\'-\')[0])==10">October</tpl>',
                                                '<tpl if="eval(accformDay.split(\'-\')[0])==11">November</tpl>',
                                                '<tpl if="eval(accformDay.split(\'-\')[0])==12">December</tpl>',
                                                ' {msDay}',
                                                '<tpl if="eval(accformDay.split(\'-\')[1])==1 ||eval(accformDay.split(\'-\')[1])==21||eval(accformDay.split(\'-\')[1])==31">st</tpl>',
                                                '<tpl if="eval(accformDay.split(\'-\')[1])==2 ||eval(accformDay.split(\'-\')[1])==22">nd</tpl>',
                                                '<tpl if="eval(accformDay.split(\'-\')[1])==3 ||eval(accformDay.split(\'-\')[1])==23">rd</tpl>',
                                                '<tpl if="eval(accformDay.split(\'-\')[1])!=1 &&eval(accformDay.split(\'-\')[1])!=2 &&eval(accformDay.split(\'-\')[1])!=3 ' ,
                                                    '&&eval(accformDay.split(\'-\')[1])!=21&&eval(accformDay.split(\'-\')[1])!=22&&eval(accformDay.split(\'-\')[1])!=23',
                                                    '&&eval(accformDay.split(\'-\')[1])!=31&&eval(accformDay.split(\'-\')[1])!=\'ANNIVERSARY\'">th</tpl>',
                                            '</tpl>',
                                            '<tpl if="accformPer==114">Annually on {accformDay}</tpl>',
                                        '</tpl>',
                                        '<tpl if="accformPer &gt; 114"> per ',
                                            '<tpl if="accformPer!=119">',
                                                '<tpl if="accformDay &gt; 1">{accformDay} </tpl>',
                                                '<tpl if="accformPer==115">Day</tpl>',
                                                '<tpl if="accformPer==116">Week</tpl>',
                                                '<tpl if="accformPer==117">Month</tpl>',
                                                '<tpl if="accformPer==118">Year</tpl>',
                                                '<tpl if="accformDay &gt; 1">s</tpl>',
                                            '</tpl>',
                                            '<tpl if="accformPer==119">',
                                                '{msMonth}',
                                                '<tpl if="eval(accformDay.split(\'-\')[0])==1">st</tpl>',
                                                '<tpl if="eval(accformDay.split(\'-\')[0])==2">nd</tpl>',
                                                '<tpl if="eval(accformDay.split(\'-\')[0])==3">rd</tpl>',
                                                '<tpl if="eval(accformDay.split(\'-\')[0])!=1 &&eval(accformDay.split(\'-\')[0])!=2 &&eval(accformDay.split(\'-\')[0])!=3">th</tpl>',
                                                ' Month on ',
                                                '<tpl if="eval(accformDay.split(\'-\')[1])!=\'ANNIVERSARY\'">the </tpl>',
                                                '{msDay}',
                                                '<tpl if="eval(accformDay.split(\'-\')[1])==1 ||eval(accformDay.split(\'-\')[1])==21||eval(accformDay.split(\'-\')[1])==31">st</tpl>',
                                                '<tpl if="eval(accformDay.split(\'-\')[1])==2 ||eval(accformDay.split(\'-\')[1])==22">nd</tpl>',
                                                '<tpl if="eval(accformDay.split(\'-\')[1])==3 ||eval(accformDay.split(\'-\')[1])==23">rd</tpl>',
                                                '<tpl if="eval(accformDay.split(\'-\')[1])!=1 &&eval(accformDay.split(\'-\')[1])!=2 &&eval(accformDay.split(\'-\')[1])!=3 ' ,
                                                    '&&eval(accformDay.split(\'-\')[1])!=21&&eval(accformDay.split(\'-\')[1])!=22&&eval(accformDay.split(\'-\')[1])!=23',
                                                    '&&eval(accformDay.split(\'-\')[1])!=31&&eval(accformDay.split(\'-\')[1])!=\'ANNIVERSARY\'">th</tpl>',
                                            '</tpl>',
                                        '</tpl>',
                                    '</tpl>',
                                    '<tpl if="accformInc==0">No Accrual</tpl>'
                                    ],
                                    editor: {
                                        xtype: 'containerfield',
                                        itemId: 'infoField',
                                        label: '', layout: 'hbox',
                                        items: [
                                            {
                                                xtype: 'spinnerfield',
                                                itemId: 'accformInc',
                                                // flex: 1,
                                                decimals: 4,
                                                style: 'width: 3.5em',
                                                textAlign: 'center',
                                                // listeners: {
                                                //     change: 'onAccrualRuleInfoChange'
                                                // }
                                            },
                                            {
                                                xtype: 'selectfield',
                                                itemId: 'accformUnit',
                                                // flex: 2,
                                                style: 'width: 6em',
                                                store: 'MinimumUseUnits',
                                                displayField: 'Description', valueField: 'ID',
                                                value: 48,
                                                // margin: 'inherit inherit inherit 4pt',
                                                ui: 'admin-ap-small-input',
                                                // TODO: Adjust picker so tool component doens't take up space to increase available space
                                            },
                                            {
                                                xtype: 'selectfield',
                                                itemId: 'accformOn',
                                                bind: {
                                                    store: '{accrualRateOn}'
                                                },
                                                displayField: 'Description', valueField: 'ID',
                                                value: 53,
                                                style: 'width: 7.5em',
                                                hidden: true,
                                                listeners: {
                                                    change: 'onAccrualRuleInfoChange'
                                                }
                                            }, {
                                                xtype: 'selectfield',
                                                itemId: 'onPer',
                                                displayField: 'Description', valueField: 'ID',
                                                bind: { store: '{onPerTypes}' },
                                                // value: 1,
                                                style: 'width: 4.5em',
                                                ui: 'admin-ap-small-input',
                                                listeners: {
                                                    change: 'onAccrualRuleInfoChange'
                                                }
                                                // flex: 1
                                            }, {
                                                xtype: 'selectfield',
                                                itemId: 'monthlySpecialOn',
                                                hidden: true,
                                                bind: { store: '{monthlySpecialOnOpt}' },
                                                displayField: 'Description', valueField: 'ID',
                                                value: 1,
                                                listeners: {
                                                    change: 'onAccrualRuleInfoChange'
                                                }
                                            }, {
                                                xtype: 'spinnerfield',
                                                itemId: 'perX',
                                                minValue: 1, decimals: 0,
                                                style: 'width: 3.5em',
                                                textAlign: 'center',
                                                value: 1,
                                                hidden: true,
                                                // listeners: {
                                                //     change: 'onAccrualRuleInfoChange'
                                                // }
                                            }, {
                                                xtype: 'selectfield',
                                                itemId: 'accformPer',
                                                bind: { store: '{accrualRatePer}' },
                                                displayField: 'Description', valueField: 'ID',
                                                style: 'width: 6.5em',
                                                hidden: true,
                                                listeners: {
                                                    select: 'onAccrualRuleInfoChange'
                                                }
                                            }, {
                                                xtype: 'selectfield',
                                                itemId: 'monthlySpecialPer',
                                                bind: { store: '{monthlySpecialPerOpt}' },
                                                displayField: 'Description', valueField: 'ID',
                                                style: 'width: 6em',
                                                // flex: 1,
                                                value: '1',
                                                hidden: true,
                                            }, {
                                                xtype: 'selectfield',
                                                itemId: 'onWeekly',
                                                bind: { store: '{onWeekly}' },
                                                displayField: 'Description', valueField: 'ID',
                                                value: '6',
                                                style: 'width: 6.5em',
                                                // flex: 1,-
                                                hidden: true,
                                            }, {
                                                xtype: 'selectfield',
                                                itemId: 'onBiWeekly',
                                                bind: { store: '{onBiWeekly}' },
                                                displayField: 'Description', valueField: 'ID',
                                                value: '13',
                                                // flex: 1,-
                                                hidden: true,
                                            }, {
                                                xtype: 'displayfield',
                                                itemId: 'msOn',
                                                label: '',
                                                value: 'on the',
                                                hidden: true
                                            }, {
                                                xtype: 'selectfield',
                                                itemId: 'monthly31',
                                                bind: { store: '{monthly31}' },
                                                displayField: 'Description', valueField: 'ID',
                                                value: '1',
                                                style: 'width: 6.5em',
                                                // width: 48,
                                                // flex: 1,-
                                                textAlign: 'center',
                                                hidden: true,
                                            }, {
                                                xtype: 'selectfield',
                                                itemId: 'monthly30',
                                                bind: { store: '{monthly30}' },
                                                displayField: 'Description', valueField: 'ID',
                                                value: '1',
                                                style: 'width: 6.5em',
                                                // width: 48,
                                                // flex: 1,-
                                                textAlign: 'center',
                                                hidden: true,
                                            }, {
                                                xtype: 'selectfield',
                                                itemId: 'monthly28',
                                                bind: { store: '{monthly28}' },
                                                displayField: 'Description', valueField: 'ID',
                                                value: '1',
                                                style: 'width: 6.5em',
                                                // width: 48,
                                                // flex: 1,=
                                                textAlign: 'center',
                                                hidden: true,
                                            }, {
                                                xtype: 'datefield',
                                                itemId: 'onAnnually',
                                                dateFormat: 'm/d',
                                                value: '1/1',
                                                flex: 1,
                                                hidden: true,
                                            }, {
                                                xtype: 'displayfield',
                                                itemId: 'onAnniversary',
                                                value: 'Anniversary',
                                                label: '',
                                                hidden: true
                                            }
                                        ]
                                    },
                                    bind: {
                                        editable: '{!isRestricted}'
                                    }
                                },
                                {
                                    text: 'Occurrences',
                                    dataIndex: 'occurrences', itemId: 'occurrences',
                                    // flex: 2,
                                    menu: null, menuDisabled: true,
                                    tpl: [
                                        '<tpl if="occurrences &lt; 0">---</tpl>',
                                        '<tpl if="occurrences &gt;= 0">{occurrences}</tpl>'
                                    ]
                                },
                                {
                                    text: 'Total Time', 
                                    dataIndex: 'total', itemId: 'totalTime',
                                    // flex: 2,
                                    menu: null, menuDisabled: true,
                                    tpl: [
                                        '<tpl if="occurrences &lt; 0">---</tpl>',
                                        '<tpl if="occurrences &gt;= 0">{total}',
                                            '<tpl if="recording_mode == 20"> Days</tpl>',
                                            '<tpl if="recording_mode == 21"> Hours</tpl>',
                                        '</tpl>'
                                    ],
                                    // Delete interval tool
                                    cell: {
                                        toolDefaults: {
                                            ui: 'employeeinfo-grid-tool',
                                            zone: 'end'
                                        },
                                        tools: [
                                            {
                                                iconCls: 'x-fas fa-times',
                                                handler: 'onAccrualRuleDelete',
                                                bind: {
                                                    hidden: '{isRestricted}'
                                                }
                                            }
                                        ]
                                    }

                                },
                            ],

                        }

                    ]
                },

                // row 5
                // Carry over
                {
                    xtype: 'fieldset',
                    userCls: 'fyi-fieldset no-side-margin',
                    layout: 'vbox',
                    defaults: {
                        xtype: 'displayfield',
                        ui: 'fyi-display-field',
                    },
                    items: [
                        // sub row 1
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            flex: 1,
                            defaults: {
                                xtype: 'displayfield',
                            },
                            items: [
                                {
                                    xtype: 'checkbox',
                                    ui: 'fyi',
                                    boxLabel: 'Carry Over',
                                    reference: 'carryOverCheckbox',
                                    minWidth: '64pt',
                                    bodyAlign: 'stretch',
                                    hidden: false,
                                    bind: {
                                        disabled: '{isRestricted}',
                                        checked: '{carryOverSettings.enabled}'
                                    }
                                },
                                {
                                    xtype: 'spacer',
                                    width: '10pt',
                                },
                                {
                                    xtype: 'selectfield',
                                    // reference: 'carryOptionField',
                                    ui: 'reporting fyi-text',
                                    options: [
                                        { text: 'No Max', value: 0 },
                                        { text: 'Max', value: 1 },
                                    ],
                                    displayField: 'text', valueField: 'value',
                                    hidden: true,
                                    bind: {
                                        value: '{carryOverSettings.option}',
                                        hidden: '{hideCarryOver}',
                                        readOnly: '{isRestricted}'
                                    },

                                },
                                {
                                    xtype: 'spacer',
                                    width: '10pt'
                                },
                                {
                                    xtype: 'numberfield',
                                    clearable: false,
                                    ui: 'fyi fyi-text',
                                    textAlign: 'right',
                                    flex: 1,
                                    value: 0, minValue: 0, decimals: 4,
                                    hidden: true,
                                    bind: {
                                        hidden: '{hideCarryOver || hideCarryMax}',
                                        value: '{carryMax}'
                                    }

                                },
                            ]
                        },
                        // sub row 2
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            flex: 1,
                            defaults: {
                                xtype: 'displayfield',
                                //ui: 'fyi-display-field',
                                hidden: true,
                                bind: {
                                    hidden: '{hideCarryOver}'
                                }
                            },
                            items: [
                                {
                                    xtype: 'checkbox',
                                    ui: 'fyi',
                                    boxLabel: 'Expires',
                                    minWidth: '64pt',
                                    bodyAlign: 'stretch',
                                    bind: {
                                        readOnly: '{isRestricted}',
                                        checked: '{carryOverSettings.expires}'
                                    }
                                },
                                {
                                    xtype: 'spacer',
                                    width: '10pt',
                                },
                                {
                                    xtype: 'datefield',
                                    userCls: 'fyi-fieldset no-padding no-border',
                                    ui: ['dark-textfield', 'fyi-field', 'fyi-textfield'],
                                    //reference: 'viewDate',
                                    picker: null,
                                    bind: {
                                        readOnly: '{isRestricted}',
                                        value: '{categoryAdjust.carryExpires}',
                                        hidden: '{!carryOverSettings.expires || hideCarryOver}'
                                    }
                                },
                            ]
                        },
                    ]
                },
            ]
        },
        // column 2
        // Info (rightSide)
        {
            xtype: 'container',
            width: '220pt', layout: 'vbox',
            itemId: 'rightSide',
            items: [
                // User Info Box
                {
                    xtype: 'fieldset',
                    userCls: 'fyi-fieldset',
                    layout: 'vbox',
                    defaults: {
                        xtype: 'displayfield',
                        ui: 'employee-accrual-policy-display-field',
                        labelWidth: '96pt'
                    },
                    items: [
                        {
                            label: 'Employee',
                            labelAlign: 'left',
                            // labelWidth: 'auto',
                            bind: { value: '{categoryAdjust.employeeName}' },
                        },
                        {
                            label: 'Department',
                            labelAlign: 'left',
                            // labelWidth: 'auto',
                            bind: { value: '{categoryAdjust.departmentName}' },
                        },
                        {
                            label: 'Hire Date',
                            labelAlign: 'left',
                            // labelWidth: 'auto',
                            bind: { value: '{categoryAdjust.hire_date}' },
                        }
                    ]
                },
                // Start accruing field
                {
                    xtype: 'datefield',
                    userCls: 'fyi-fieldset no-padding no-border',
                    ui: 'fyi fyi-text',
                    //name: 'viewdate_field',
                    itemId: 'startAccruing',
                    label: 'Start accruing on:',
                    labelAlign: 'left', labelWidth: 'auto',
                    picker: null,
                    bind: {
                        value: '{categoryAdjust.wait_date}',
                        hidden: '{!categoryAdjust.isallowed}',
                        minDate: '{employeeHireDate}',
                        editable: '{!isRestricted}'
                    }
                },
                // Ledger
                {
                    xtype: 'fieldset',
                    userCls: 'fyi-fieldset',
                    layout: 'vbox',
                    flex: 1,
                    defaults: {
                        xtype: 'displayfield',
                        ui: [
                            'employee-accrual-policy-display-field',
                            'employee-accrual-policy-display-field-ledger'
                        ],
                        width: '100%',
                        bodyAlign: 'stretch',
                        data: {
                            color: false
                        }
                    },
                    items: [
                        {
                            label: 'Carried Over',
                            labelAlign: 'left',
                            labelWidth: '115pt',
                            bind: { 
                                value: '{categoryPoint.carryOver}',
                                hidden: '{!categoryAdjust.isallowed}'
                            },
                            renderer: 'renderLedgerValue',
                            encodeHtml: false
                        },
                        {
                            ui: [
                                'employee-accrual-policy-display-field',
                                'employee-accrual-policy-display-field-ledger',
                                'employee-accrual-policy-display-field-ledger-small'
                            ],
                            label: 'Carry Over Expired',
                            labelAlign: 'left',
                            labelWidth: '115pt',
                            bind: {
                                value: '{categoryPoint.carryOverExpired}',
                                hidden: '{!categoryAdjust.isallowed}'
                            },
                            renderer: 'renderLedgerValue',
                            encodeHtml: false,
                            data: {
                                color: false,
                                small: true
                            }
                        },
                        {
                            label: 'Accrued',
                            labelAlign: 'left',
                            labelWidth: '115pt',
                            bind: {
                                value: '{categoryPoint.accrued}',
                                hidden: '{!categoryAdjust.isallowed}'
                            },
                            renderer: 'renderLedgerValue',
                            encodeHtml: false,
                        },
                        {
                            label: 'Adjustments',
                            labelAlign: 'left',
                            labelWidth: '115pt',
                            bind: { 
                                value: '{categoryPoint.adjustments}',
                                hidden: '{!categoryAdjust.isallowed}'
                            },
                            renderer: 'renderLedgerValue',
                            encodeHtml: false
                        },
                        {
                            xtype: 'component',
                            html: '<hr/>',
                            bind: {
                                hidden: '{!categoryAdjust.isallowed}'
                            }
                        },
                        {
                            label: 'Allowed',
                            labelAlign: 'left',
                            labelWidth: '115pt',
                            bind: { 
                                value: '{categoryPoint.allowed}',
                                hidden: '{!categoryAdjust.isallowed}'
                            },
                            renderer: 'renderLedgerValue',
                            encodeHtml: false
                        },
                        {
                            label: 'Recorded',
                            labelAlign: 'left',
                            labelWidth: '115pt',
                            bind: { value: '{categoryPoint.recorded}' },
                            renderer: 'renderLedgerValue',
                            encodeHtml: false,
                            data: { color: true, negative: true }
                        },
                        {
                            xtype: 'component',
                            html: '<hr/>'
                        },
                        {
                            xtype: 'checkbox',
                            ui: 'fyi',
                            boxLabel: 'Show scheduled time',
                            bodyAlign: 'stretch',
                            bind: {
                                checked: '{showScheduled}'
                            },
                            listeners: {
                                change: 'onShowScheduledTimeChange'
                            }
                        },
                        {
                            label: 'Remaining',
                            labelAlign: 'left',
                            labelWidth: '115pt',
                            bind: { value: '{categoryPoint.remaining}' },
                            renderer: 'renderLedgerValue',
                            encodeHtml: false,
                        },

                    ]
                },
            ]
        }
        //     ]
        // }
    ]
});