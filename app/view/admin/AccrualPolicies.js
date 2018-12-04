/**
 * AccrualPolicies Admin view
 * @class AccrualPolicies
 * @namespace Breeze.view.admin.AccrualPolicies
 * @alias widget.admin.AccrualPolicies
 */
Ext.define('Breeze.view.admin.AccrualPolicies', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.accrualpolicies',

    // View Model
    viewModel: {
        type: 'admin.accrualpolicies'
    },

    // Controller
    controller: 'admin.accrualpolicies',
    listeners: {
        initialize: 'onInit'
    },

    // Layout and base styles
    layout: 'hbox',
    ui: 'admin-base',

    title: 'Accrual Policies',

    // Action buttons shown at bottom of panel
    buttonAlign: 'center',
    buttons: {
        save: { text: 'Save', handler: 'onSavePolicy', ui: 'confirm alt', style: 'width:200pt' },
        apply: { text: 'Save and Apply to Employees', /* handler: 'onPrintExcel',*/ ui: 'action', style: 'width:200pt' },
    },

    // Adjust action button toolbar spacing and appearance with UI and shadow
    buttonToolbar: {
        xtype: 'toolbar',
        ui: 'admin-actions',
        shadow: false
    },

    // Body contents
    items: [

        // Main horizontal arranging container
        {
            xtype: 'container',
            flex: 1,
            layout: 'hbox',
            // +++ Allow h scroll when panel is too small +++
            scrollable: 'x',
            items: [

                // Column 1
                {
                    xtype: 'container',
                    flex: 1,

                    // +++ fixed width +++
                    minWidth: '150pt',
                    maxWidth: '200pt',

                    layout: 'vbox',
                    items: [
                        // Accrual Policies List
                        {
                            xtype: 'fieldset',
                            userCls: 'admin-fieldset no-padding',
                            flex: 1,
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'toolbar',
                                    ui: 'admin-tree',
                                    shadow: false,
                                    items: [
                                        {
                                            xtype: 'component',
                                            html: 'Policies',
                                            userCls: 'admin-title-toolbar',
                                        },
                                        {
                                            xtype: 'spacer',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'x-fas fa-plus',
                                            ui: 'plain wtr-button',
                                            handler: 'onCreatePolicyButton'
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'x-fas fa-minus',
                                            ui: 'plain wtr-button',
                                        },
                                    ]
                                },
                                {
                                    xtype: 'breeze-categories-list',
                                    ui: 'admin-shift-grid',
                                    userCls: 'admin-fieldset no-background no-margin no-border',
                                    reference: 'policyList',
                                    fieldMode: 'none',
                                    itemConfig: {
                                        ui: 'admin-list-item-select',
                                        templates: {
                                            radioValue: '{record.ID}',
                                            itemData: { name: '{record.Name} '},
                                            itemTpl: '{name}'
                                        }
                                    },
                                    bind: {
                                        store: '{policiesList}',
                                    },
                                    viewModel: true,
                                    listeners: {
                                        select: 'onPolicySelect'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'breeze-textfield',
                            label: 'Setting Name',
                            // name: 'setting_name_label',
                            ui: 'admin admin-text',
                            userCls: 'admin-fieldset no-border',
                            bind: '{policyData.Name}'
                        },
                        {
                            xtype: 'fieldset',
                            name: 'recording_mode',
                            userCls: 'admin-fieldset',
                            title: 'Recording Mode',
                            height: '45pt',
                            layout: 'vbox',
                            flex: 1,
                            minHeight: '55pt',
                            maxHeight: '55pt',


                            items: [
                                {
                                    xtype: 'containerfield',
                                    reference: 'recordingMode',
                                    layout: 'hbox',
                                    defaults: {
                                        bodyAlign: 'stretch',
                                        ui: 'admin',
                                        xtype: 'radio'
                                    },
                                    bind: {
                                        values: {
                                            recMode: '{policyData.recordingMode}'
                                        }
                                    },
                                    items: [
                                        {
                                            flex: 1,
                                            name: 'recMode',
                                            boxLabel: 'Days',
                                            value: 20,
                                            bind: {
                                                groupValue: '{recordingMode.recMode}'
                                            }
                                        },
                                        {
                                            flex: 1,
                                            name: 'recMode',
                                            boxLabel: 'Hours',
                                            value: 21,
                                            bind: {
                                                groupValue: '{recordingMode.recMode}'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            userCls: 'admin-fieldset no-padding',
                            flex: 1,
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'toolbar',
                                    ui: 'admin-tree',
                                    shadow: false,
                                    items: [
                                        {
                                            xtype: 'component',
                                            html: 'Shift Information',
                                            userCls: 'admin-title-toolbar',
                                        },
                                        {
                                            xtype: 'spacer',
                                            flex: 1,
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'x-fas fa-plus',
                                            ui: 'plain wtr-button',
                                        }
                                    ]
                                },
                                {
                                    xtype: 'grid',
                                    ui: 'admin-grid',
                                    height: '100%',
                                    sortable: false, columnResize: false,
                                    columnMenu: false, hideHeaders: false,
                                    bind: {
                                        store: '{policySegments}'
                                    },
                                    defaults: {
                                        xtype: 'gridcolumn',
                                        menuDisabled: true
                                    },
                                    layout: 'vbox',
                                    columns: [
                                        {
                                            tpl: '{StartTime}',
                                            text: 'Start',
                                            dataIndex: 'StartSegment',
                                            flex: 1
                                        },
                                        // {
                                        //     xtype: 'templatecolumn',
                                        //     tpl: ['-'],
                                        //     width: '2em'
                                        // },
                                        {
                                            tpl: '{StopTime}',
                                            text: 'Stop',
                                            dataIndex: 'StopSegment',
                                            flex: 1,
                                            cell: {
                                                toolDefaults: {
                                                    ui: 'employeeinfo-grid-tool',
                                                    zone: 'end'
                                                },
                                                tools: [
                                                    {
                                                        iconCls: 'x-fas fa-times',
                                                        handler: 'onRemoveShiftSegment'
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                },
                // Column 2
                {
                    xtype: 'fieldset',
                    title: 'List of Categories',
                    userCls: 'admin-fieldset no-padding',

                    flex: 1,
                    // +++ fixed width +++
                    minWidth: '150pt',
                    maxWidth: '200pt',


                    layout: {
                        type: 'fit',
                        alignment: 'stretch'
                    },
                    items: [
                        // User defined category selector
                        // === Replacement category selector
                        {
                            xtype: 'breeze-categories-list',
                            ui: 'admin-shift-grid',
                            userCls: 'admin-fieldset no-background no-margin no-border',
                            reference: 'categoryList',
                            fieldMode: 'none',
                            itemConfig: {
                                ui: 'admin-list-item-select'
                            },
                            bind: {
                                store: '{categoriesList}',
                            },
                            listeners: {
                                select: 'onCategorySelect'
                            },
                            viewModel: true
                        }
                    ]
                },
                // Column 3
                {
                    xtype: 'panel',
                    bind: {
                        title: '{selectedCategory.categoryName} Information',
                    },
                    ui: 'admin-sub',
                    flex: 2,
                    // +++ fixed width +++
                    minWidth: '400pt',
                    maxWidth: '400pt',

                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'container',
                            userCls: 'admin-fieldset no-border',
                            layout: 'hbox',
                            flex: 1,
                            maxHeight: '55pt',
                            minHeight: '55pt',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    name: 'category_recording_year_type',
                                    userCls: 'admin-fieldset no-margin',
                                    title: 'Recording Year Type',
                                    layout: 'hbox',
                                    flex: 3,

                                    items: [
                                        {
                                            xtype: 'containerfield',
                                            reference: 'recordingYear',
                                            defaults: {
                                                bodyAlign: 'stretch',
                                                ui: 'admin',
                                                xtype: 'radio',
                                                style: 'padding-right: 8pt'
                                            },
                                            bind: {
                                                values: {
                                                    yearType: '{categoryYearType}'
                                                }
                                            },
                                            items: [
                                                {
                                                    name: 'yearType',
                                                    boxLabel: 'Anniversary',
                                                    value: 45,
                                                    bind: {
                                                        groupValue: '{recordingYear.yearType}'
                                                    }
                                                },
                                                {
                                                    name: 'yearType',
                                                    boxLabel: 'Calendar',
                                                    value: 46,
                                                    bind: {
                                                        groupValue: '{recordingYear.yearType}'
                                                    }
                                                },
                                                {
                                                    name: 'yearType',
                                                    boxLabel: 'Fiscal',
                                                    value: 45,
                                                    bind: {
                                                        groupValue: '{recordingYear.yearType}'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    name: 'category_waiting_period_data',
                                    ui: 'admin-base',
                                    userCls: 'admin-fieldset',
                                    title: 'Start Accruing After',
                                    layout: 'hbox',
                                    flex: 2,
                                    minHeight: '55pt',
                                    maxHeight: '55pt',
                                    defaults: {
                                        ui: 'admin admin-text'
                                    },
                                    items: [
                                        {
                                            xtype: 'spinnerfield',
                                            flex: 1,
                                            style: 'padding-left: 4pt',
                                            name: 'category_new_time',
                                            decimals: 0,
                                            minValue: 0,
                                            bind: {
                                                value: '{selectedCategory.newTime}'
                                            }
                                        },
                                        {
                                            xtype: 'spacer',
                                            width: '10pt'
                                        },
                                        {
                                            xtype: 'selectfield',
                                            flex: 2,
                                            name: 'category_new_rate',
                                            displayField: 'Description',
                                            valueField: 'ID',
                                            store: 'NewRates',
                                            bind: {
                                                value: '{selectedCategory.newRate}'
                                            }
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            userCls: 'admin-fieldset no-border',
                            layout: 'hbox',
                            flex: 1,
                            maxHeight: '55pt',
                            minHeight: '55pt',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    name: 'category_accrual_cap_data',
                                    ui: 'admin-base',
                                    userCls: 'admin-fieldset no-margin',
                                    title: 'Cap Accruals At',
                                    layout: 'hbox',
                                    flex: 3,
                                    minHeight: '55pt',
                                    maxHeight: '55pt',
                                    defaults: {
                                        ui: 'admin admin-text'
                                    },
                                    items: [
                                        {
                                            xtype: 'spinnerfield',
                                            flex: 1,
                                            style: 'padding-left: 4pt',
                                            name: 'category_accrual_cap_amount',
                                            decimals: 0,
                                            minValue: 0,
                                            bind: {
                                                value: '{selectedCategory.accrualCapAmount}'
                                            }
                                        },
                                        {
                                            xtype: 'spacer',
                                            width: '10pt'
                                        },
                                        {
                                            xtype: 'selectfield',
                                            flex: 2,
                                            name: 'category_accrual_cap_unit',
                                            // allowBlank: false,
                                            // editable: false,
                                            displayField: 'description',
                                            valueField: 'code',
                                            bind: {
                                                store: '{accrualCapUnit}',
                                                value: '{selectedCategory.accrualCapUnit}'
                                            }
                                        },
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    name: 'category_balance_cap_data',
                                    ui: 'admin-base',
                                    userCls: 'admin-fieldset',
                                    title: 'Cap Balance At',
                                    layout: 'hbox',
                                    flex: 2,
                                    minHeight: '55pt',
                                    maxHeight: '55pt',
                                    defaults: {
                                        ui: 'admin admin-text'
                                    },
                                    items: [
                                        {
                                            xtype: 'spinnerfield',
                                            name: 'category_balance_cap_amount',
                                            flex: 1,
                                            style: 'padding-left: 4pt',
                                            decimals: 2,
                                            bind: {
                                                value: '{selectedCategory.balanceCapAmount}'
                                            }
                                        },
                                        {
                                            xtype: 'spacer',
                                            width: '10pt'
                                        },
                                        {
                                            xtype: 'selectfield',
                                            flex: 2,
                                            name: 'category_balance_cap_unit',
                                            store: Ext.create('Ext.data.Store', {
                                                fields: ['code', 'description'],
                                                data: [
                                                    { "code": 48, "description": "Days" },
                                                    { "code": 49, "description": "Hours" },
                                                    { "code": 50, "description": "Minutes" }
                                                ]
                                            }),
                                            valueField: 'code',
                                            displayField: 'description',
                                            bind: {
                                                value: '{selectedCategory.balanceCapUnit}'
                                            }
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            userCls: 'admin-fieldset no-padding',
                            flex: 1,
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'toolbar',
                                    ui: 'admin-tree',
                                    shadow: false,
                                    items: [
                                        {
                                            xtype: 'checkbox',
                                            ui: 'reporting',
                                            bind: {
                                                boxLabel: '{selectedCategory.categoryName} Accrual Rules',
                                                checked: '{selectedCategory.allowAccrual}'
                                            },
                                            //listeners: {
                                            //    change: 'onCategoriesCheckAllChange'
                                            //}
                                        },

                                        { xtype: 'spacer', flex: 1 },

                                        {
                                            xtype: 'button',
                                            //text: 'Save for Future Use',
                                            iconCls: 'x-fas fa-plus',
                                            ui: 'plain wtr-button',
                                            bind: {
                                                disabled: '{!selectedCategory.allowAccrual}'
                                            }
                                        },

                                        {
                                            xtype: 'button',
                                            //text: 'Save for Future Use',
                                            iconCls: 'x-fas fa-clock',
                                            ui: 'plain wtr-button',
                                            bind: {
                                                disabled: '{!selectedCategory.allowAccrual}'
                                            }
                                        },
                                    ]
                                },

                                {
                                    xtype: 'grid',
                                    flex: 1,
                                    sortable: false, striped: false,
                                    columnMenu: null, grouped: true,
                                    ui: 'admin-grid', userCls: 'admin-grid',
                                    reference: 'accrualRuleGrid',
                                    hidden: true,
                                    bind: {
                                        // store: '{selectedCategory.accrualRules}'
                                        // store: '{selectedCategoryAccrualRules}'
                                        store: '{groupedCategoryAccrualRules}',
                                        hidden: '{!selectedCategory.allowAccrual}'
                                    },
                                    listeners: {
                                        // storechange: (grid, newStore)=>{
                                        //     if(!Object.isUnvalued(newStore)){
                                        //         newStore.setGroupField('ruleName');
                                        //     }
                                        // }
                                    },
                                    defaults: {
                                        cell: {
                                            ui: 'admin-grid admin-tree-item'
                                        }
                                    },
                                    defaultType: 'gridcolumn',
                                    columns: [
                                        {
                                            itemId: 'from',
                                            text: 'From',
                                            dataIndex: 'svcFrom',
                                            menuDisabled: true,
                                            tpl: [
                                                '<tpl if="svcFrom==0">Hire</tpl>',
                                                '<tpl if="svcFrom!=0">',
                                                '{svcFrom} Year<tpl if="svcFrom!=1">s</tpl>',
                                                '</tpl>'
                                            ]
                                        },
                                        {
                                            itemId: 'through',
                                            text: 'Through',
                                            dataIndex: 'svcTo',
                                            cell: {
                                                encodeHtml: false
                                            },
                                            tpl: [
                                                '<tpl if="svcTo==0">&infin;</tpl>',
                                                '<tpl if="svcTo!=0">{svcTo} Year',
                                                '<tpl if="svcTo!=1">s</tpl></tpl>'
                                            ]
                                        },
                                        {
                                            itemId: 'info',
                                            text: 'Accrual Information',
                                            flex: 1,
                                            dataIndex: 'accrualChanged',
                                            tpl: [
                                               '<tpl if="accformInc!=0">',
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
                                                        '<tpl if="accformPer==140">Worked Hour</tpl>',
                                                        '<tpl if="accformPer==141">Worked Day</tpl>',
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
                                            ]
                                        }
                                    ]
                                },
                            ]
                        },


                        {
                            xtype: 'fieldset',
                            userCls: 'admin-fieldset no-padding',
                            flex: 1,
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'toolbar',
                                    ui: 'admin-tree',
                                    shadow: false,
                                    items: [
                                        {
                                            xtype: 'component',
                                            bind: {
                                                html: '{selectedCategory.categoryName} Carry Over Rules'
                                            },
                                            userCls: 'admin-title-toolbar',
                                        },
                                        {
                                            xtype: 'spacer',
                                            flex: 1,

                                        },
                                        {
                                            xtype: 'button',
                                            //text: 'Save for Future Use',
                                            iconCls: 'x-fas fa-plus',
                                            ui: 'plain wtr-button',
                                        },
                                    ]
                                },
                                {
                                    xtype: 'grid',
                                    flex: 1,
                                    sortable: false, striped: false,
                                    columnMenu: null,
                                    ui: 'admin-grid', userCls: 'admin-grid',
                                    reference: 'carryOverGrid',
                                    bind: {
                                        store: '{selectedCategoryCarryOverRules}',
                                    },
                                    listeners: {
                                        // storechange: (grid, newStore)=>{
                                        //     if(!Object.isUnvalued(newStore)){
                                        //         newStore.setGroupField('ruleName');
                                        //     }
                                        // }
                                    },
                                    defaults: {
                                        cell: {
                                            ui: 'admin-grid admin-tree-item'
                                        },
                                        draggable: false
                                    },
                                    defaultType: 'gridcolumn',
                                    columns: [
                                        {
                                            itemId: 'from',
                                            text: 'From',
                                            dataIndex: 'svcFrom',
                                            flex: 1,
                                            menuDisabled: true,
                                            tpl: [
                                                '<tpl if="svcFrom==0">Hire</tpl>',
                                                '<tpl if="svcFrom!=0">Year {svcFrom}</tpl>',
                                            ]
                                        },
                                        {
                                            itemId: 'through',
                                            text: 'Through',
                                            dataIndex: 'svcTo',
                                            flex: 1,
                                            cell: {
                                                encodeHtml: false
                                            },
                                            tpl: [
                                                '<tpl if="svcTo==0">&infin;</tpl>',
                                                '<tpl if="svcTo!=0">Year {svcTo}</tpl>'
                                            ]
                                        },
                                        {
                                            itemId: 'over',
                                            xtype: 'checkcolumn',
                                            flex: 1.25,
                                            headerCheckbox: false,
                                            text: 'Carry Over',
                                            dataIndex: 'allowCarry'
                                        },
                                        {
                                            itemId: 'max',
                                            flex: 1.25,
                                            text: 'Carry Max',
                                            dataIndex: 'carryMax',
                                            tpl: [
                                                '<tpl if="allowCarry==false">--</tpl>',
                                                '<tpl if="allowCarry==true">',
                                                    '<tpl if="carryOver==0">No Max</tpl>',
                                                    '<tpl if="carryOver &gt; 0">{carryOver}</tpl>',
                                                '</tpl>'
                                            ]
                                        },
                                        {
                                            itemId: 'info',
                                            text: 'Carry Over Expiration',
                                            flex: 2.5,
                                            dataIndex: 'expChanged',
                                            tpl: [
                                                '<tpl if="allowCarry==false">--</tpl>',
                                                '<tpl if="allowCarry==true">',
                                                    '<tpl if="perAmount==0">No expiration</tpl>',
                                                    '<tpl if="perAmount!=0">Expires after {perAmount} ',
                                                        '<tpl if="perUnit==57">day</tpl>',
                                                        '<tpl if="perUnit==58">week</tpl>',
                                                        '<tpl if="perUnit==59">month</tpl>',
                                                        '<tpl if="perUnit==60">year</tpl>',
                                                        '<tpl if="perAmount!=1">s</tpl>',
                                                    '</tpl>',
                                                '</tpl>'
                                            ]
                                        }
                                    ]
                                },
                            ]
                        },





                    ]
                },

            ]
        },
        //====[Dialogs]=====
        /* Create Accrual Policy Dialog */
        {
            xtype: 'dialog',
            ui: 'light-themed-dialog',
            reference: 'createPolicyDialog',
            title: 'Create New Accrual Policy',
            layout: 'vbox',
            buttons: [
                {
                    xtype: 'button',
                    text: 'Save',
                    ui: 'confirm alt'
                },
                {
                    xtype: 'spacer', width: '8pt'
                },
                {
                    xtype: 'button',
                    text: 'Cancel',
                    ui: 'decline alt',
                    handler: 'onCreatePolicyDlgCancel'
                }
            ],
            items: [
                {
                    xtype: 'breeze-textfield',
                    itemId: 'policyName',
                    label: 'Policy Name',
                    required: true
                },
                {
                    xtype: 'containerfield',
                    itemId: 'createOption',
                    layout: 'vbox',
                    defaults: {
                        bodyAlign: 'stretch',
                        xtype: 'radio'
                    },
                    items: [
                        {
                            name: 'option',
                            boxLabel: 'Create from scratch using default values',
                            value: 1, checked: true
                        },
                        {
                            name: 'option',
                            boxLabel: 'Copy an existing Accrual Policy',
                            reference: 'createDlgCopyExisting',
                            value: 2
                        }
                    ]
                },
                {
                    xtype: 'selectfield',
                    label: 'Copy From',
                    itemId: 'policySource',
                    // TODO: Update default copied accrual to match selection before show
                    value: null,
                    bind: {
                        hidden: '{!createDlgCopyExisting.checked}',
                        store: '{policiesList}'
                    },
                    displayField: 'Name',
                    valueField: 'ID'
                }
            ]
        },
        /* Add Shift Segment Dialog */
        {
            xtype: 'dialog',
            ui: 'light-themed-dialog',
            reference: 'addShiftDialog',
            title: 'Add Shift Segment',
            layout: 'vbox',
            buttons: [
                {
                    xtype: 'button',
                    text: 'Save',
                    ui: 'confirm alt'
                },
                {
                    xtype: 'spacer', width: '8pt'
                },
                {
                    xtype: 'button',
                    text: 'Cancel',
                    ui: 'decline alt',
                    // handler: 'onCreatePolicyDlgCancel'
                }
            ],
            items: [
               
            ]
        }
    ]
});