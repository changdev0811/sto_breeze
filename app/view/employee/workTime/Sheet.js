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
            sortable: false,
            columnLines: true,
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
                    tpl: [
                        '{[this.projectName(values.Project_ID)]}',
                        {
                            projectName: function(v){
                                console.info('Project name method');
                                return v;
                            }
                        }
                    ]
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    bind: { text: '{sheetDayLabels.day1}' },
                    // dataIndex: 'Day1HHMM',
                    tpl: '{Day1Hours}:{Day1Minutes}'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    bind: { text: '{sheetDayLabels.day2}' },
                    // dataIndex: 'Day2Hours'
                    tpl: '{Day2Hours}:{Day2Minutes}'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    bind: { text: '{sheetDayLabels.day3}' },
                    // dataIndex: 'Day3Hours'
                    tpl: '{Day3Hours}:{Day3Minutes}'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    bind: { text: '{sheetDayLabels.day4}' },
                    tpl: '{Day4Hours}:{Day4Minutes}'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    bind: { text: '{sheetDayLabels.day5}' },
                    tpl: '{Day5Hours}:{Day5Minutes}'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    bind: { text: '{sheetDayLabels.day6}' },
                    tpl: '{Day6Hours}:{Day6Minutes}'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    bind: { text: '{sheetDayLabels.day7}' },
                    tpl: '{Day7Hours}:{Day7Minutes}'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    text: 'WT Hrs',
                    dataIndex: 'WT_Hours'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    text: 'Prog. Hrs',
                    dataIndex: 'ProjTotal'

                }
            ]
        },
        // ===[Approve/Deny Button Container]===
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'end'
            },
            items: [
                {
                    xtype: 'button',
                    text: 'Approve',
                    ui: 'confirm wtr-button',
                    menu: {
                        xtype: 'menu',
                        items: [
                            {
                                xtype: 'menuitem',
                                text: 'Approve',
                                itemId: 'mnuApproveRegular'
                            },
                            {
                                xtype: 'menuitem',
                                text: 'Approve w/ Note',
                                itemId: 'mnuApproveWithNote'
                            }
                        ]
                    }
                },
                {
                    xtype: 'button',
                    text: 'Deny',
                    ui: 'decline wtr-button',
                    menu: {
                        xtype: 'menu',
                        items: [
                            {
                                xtype: 'menuitem',
                                text: 'Deny',
                                itemId: 'mnuDenyRegular'
                            },
                            {
                                xtype: 'menuitem',
                                text: 'Deny w/ Note',
                                itemId: 'mnuDenyWithNote'
                            }
                        ]
                    }
                }
            ]
        }
    ]

});