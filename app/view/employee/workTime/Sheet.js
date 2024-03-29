/**
 * WorkTime Records Time Sheet subview
 * @class Sheet
 * @namespace Breeze.view.employee.workTime.Sheet
 * @alias widget.employee.worktime.sheet
 */
Ext.define('Breeze.view.employee.workTime.Sheet', {
    extend: 'Ext.Container',
    alias: 'widget.employee.worktime.sheet',

    layout: 'vbox',
    userCls: 'employee-worktime-records-grid',

    items: [
        {
            xtype: 'panel',
            ui: 'wtr-grid-panel',
            userCls: 'employee-info-fieldset no-padding no-margin',
            title: 'Worktime Reccords',
            layout: 'vbox',
            margin:'8pt 0pt 0pt 8pt',
            flex: 1,
            items: [
                {
                    reference: 'workTimeSheetGrid',
                    xtype: 'grid',
                    ui: 'employee-worktime-records-grid',
                    userCls: 'employee-worktime-records-grid',
                    height: '100%', width: '100%',
                    flex: 1,
                    layout: 'hbox',

                    itemConfig: {
                        xtype: 'gridrow'
                    },
                    // sortable: false,
                    // columnLines: true,
                    // plugins: {
                    //     // { type: 'rowexpander' }
                    //     rowexpander: true
                    // },
                    
                    bind: {
                        store: '{timeSheetRecords}'
                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            flex: 2,
                            // formatter: 'date("m/d/Y")',
                            // dataIndex: 'Project_ID',
                            text: 'Project',
                            dataIndex: 'AbsenceName',
                            // tpl: [
                            //     '{[this.projectName(values.Project_ID)]}',
                            //     {
                            //         projectName: function(v){
                            //             console.info('Project name method');
                            //             return v;
                            //         }
                            //     }
                            // ]
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 1,
                            bind: { text: '{sheetDayLabels.day1}' },
                            // dataIndex: 'Day1HHMM',
                            tpl: [
                                '{[this.format(values.Day1Minutes)]}',
                                {
                                    format: function(v){
                                        return Breeze.helper.Time.minutesToHours(v);
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 1,
                            bind: { text: '{sheetDayLabels.day2}' },
                            // dataIndex: 'Day2Hours'
                            tpl: [
                                '{[this.format(values.Day2Minutes)]}',
                                {
                                    format: function(v){
                                        return Breeze.helper.Time.minutesToHours(v);
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 1,
                            bind: { text: '{sheetDayLabels.day3}' },
                            // dataIndex: 'Day3Hours'
                            tpl: [
                                '{[this.format(values.Day3Minutes)]}',
                                {
                                    format: function(v){
                                        return Breeze.helper.Time.minutesToHours(v);
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 1,
                            bind: { text: '{sheetDayLabels.day4}' },
                            tpl: [
                                '{[this.format(values.Day4Minutes)]}',
                                {
                                    format: function(v){
                                        return Breeze.helper.Time.minutesToHours(v);
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 1,
                            bind: { text: '{sheetDayLabels.day5}' },
                            tpl: [
                                '{[this.format(values.Day5Minutes)]}',
                                {
                                    format: function(v){
                                        return Breeze.helper.Time.minutesToHours(v);
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 1,
                            bind: { text: '{sheetDayLabels.day6}' },
                            tpl: [
                                '{[this.format(values.Day6Minutes)]}',
                                {
                                    format: function(v){
                                        return Breeze.helper.Time.minutesToHours(v);
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 1,
                            bind: { text: '{sheetDayLabels.day7}' },
                            tpl: [
                                '{[this.format(values.Day7Minutes)]}',
                                {
                                    format: function(v){
                                        return Breeze.helper.Time.minutesToHours(v);
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 1,
                            text: 'WT<br/>Hours',
                            dataIndex: 'WT_Hours'
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 1,
                            text: 'Project<br/>Totals',
                            dataIndex: 'ProjTotal'

                        }
                    ]
                },
                {
                    xtype: 'grid',
                    ui: 'employee-worktime-records-grid',
                    userCls: 'employee-worktime-records-grid',
                },
                // ===[Approve/Deny Button Container]===
                /*
                {
                    xtype: 'toolbar',
                    ui: 'wtr-actions',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            text: 'Approve',
                            //ui: 'confirm alt wtr-button wtr-button-alt',
                            ui: 'confirm alt',
                            //iconCls: 'x-fas fa-check',
                            menu: {
                                xtype: 'menu',
                                items: [
                                    {
                                        xtype: 'menuitem',
                                        text: 'Approve',
                                        itemId: 'mnuApproveRegular',
                                        iconCls: 'x-fas fa-check-circle'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        text: 'Approve w/ Note',
                                        itemId: 'mnuApproveWithNote',
                                        iconCls: 'x-fas fa-file-check'
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Deny',
                            //ui: 'decline alt wtr-button wtr-button-alt',
                            ui: 'decline alt',
                            //iconCls: 'x-fas fa-times',
                            menu: {
                                xtype: 'menu',
                                items: [
                                    {
                                        xtype: 'menuitem',
                                        text: 'Deny',
                                        itemId: 'mnuDenyRegular',
                                        iconCls: 'x-fas fa-times-octagon'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        text: 'Deny w/ Note',
                                        itemId: 'mnuDenyWithNote',
                                        iconCls: 'x-fas fa-file-times'
                                    }
                                ]
                            }
                        }
                    ]
                }
                */

            ]
        },

        {
            xtype: 'container',
            layout: 'hbox',
            items: [

                //{
                //    xtype: 'button',
                //    ui: 'plain wtr-button',
                //    text: 'Show All Punches',
                //    reference: 'showPunchesButton',
                //    data: {
                //        showText: 'Show All Punches',
                //        hideText: 'Hide All Punches'
                //    },
                //    listeners: {
                //        tap: 'onShowPunches'
                //    }
                //},
                // ===[Approve/Deny Button Container]===
                {
                    xtype: 'toolbar',
                    ui: 'wtr-actions',
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    items: [
                        



                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-clock', 
                            ui:'alt',
                        },
                        {
                            xtype: 'spacer',
                            flex: 1,
                        },

                        {
                            xtype: 'button',
                            text: 'Approve',
                            //ui: 'confirm alt wtr-button wtr-button-alt',
                            ui: 'confirm alt',
                            //iconCls: 'x-fas fa-check',
                            menu: {
                                xtype: 'menu',
                                items: [
                                    {
                                        xtype: 'menuitem',
                                        text: 'Approve',
                                        itemId: 'mnuApproveRegular',
                                        iconCls: 'x-fas fa-check-circle'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        text: 'Approve w/ Note',
                                        itemId: 'mnuApproveWithNote',
                                        iconCls: 'x-fas fa-file-check'
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Deny',
                            //ui: 'decline alt wtr-button wtr-button-alt',
                            ui: 'decline alt',
                            //iconCls: 'x-fas fa-times',
                            menu: {
                                xtype: 'menu',
                                items: [
                                    {
                                        xtype: 'menuitem',
                                        text: 'Deny',
                                        itemId: 'mnuDenyRegular',
                                        iconCls: 'x-fas fa-times-octagon'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        text: 'Deny w/ Note',
                                        itemId: 'mnuDenyWithNote',
                                        iconCls: 'x-fas fa-file-times'
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }


    ]

});