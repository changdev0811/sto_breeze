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
        {
            xtype: 'container',
            items: [
                {
                    xtype: 'checkbox',
                    boxLabel: 'Show Punches',
                    // labelAlign: 'right',
                    ui: 'dark-checkbox',
                    inline: true,
                    // labelWidth: 'auto'
                }
            ]
        }
    ]

});