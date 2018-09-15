/**
 * WorkTime Records Record subview
 * @class Record
 * @alias Breeze.view.employee.workTime.Record
 */
Ext.define('Breeze.view.employee.workTime.Record', {
    extend: 'Ext.Container',
    alias: 'widget.employee.worktime.record',

    requires: [
        'Ext.grid.plugin.RowExpander'
    ],

    layout: 'vbox',
    userCls: 'employee-worktime-records-grid',

    items: [
        {
            reference: 'workTimeRecordGrid',
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
            plugins: {
                // { type: 'rowexpander' }
                rowexpander: true
            },
            itemConfig: {
                body: {
                    userCls: 'wtr-grid-no-spacer',
                    // TODO: Handle display of deductions
                    tpl: [
                        '<div class="employee-wtr-records-rowbody">',
                            '<div class="punch-in">',
                                '<div class="start">',
                                    '<span class="iconlbl">IN Punch</span><br/>',
                                    '<div class="icon in"></div>',
                                '</div>',
                                '<div class="lbl">',
                                    '<label>Date:</label> {[this.shortDate(values.In_Punch.Punch_Time)]}<br/>',
                                    '<label>Time:</label> {[this.shortTime(values.In_Punch.processed_time)]}<br/>',
                                    '<label>Notes:</label> {In_Punch.notes}<br/>',
                                '</div>',
                                '<div class="end">',
                                    '<tpl if="In_Punch.lat !== 0 &amp;&amp; In_Punch.lng !== 0">',
                                    '<div data-action="map" data-punch="in" data-record="{ID}" class="icon loc x-fas fa-map-marked-alt"></div>',
                                    '</tpl>',
                                '</div>',
                            '</div>',
                            '<tpl if="End_Time !== null">',
                            '<div class="punch-out">',
                                '<div class="start">',
                                    '<span class="iconlbl">OUT Punch</span><br/>',
                                    '<div class="icon out"></div>',
                                '</div>',
                                '<div class="lbl">',
                                    '<label>Date:</label> {[this.shortDate(values.Out_Punch.Punch_Time)]}<br/>',
                                    '<label>Time:</label> {[this.shortTime(values.Out_Punch.processed_time)]}<br/>',
                                    '<label>Notes:</label> {Out_Punch.notes}<br/>',
                                '</div>',
                                '<div class="end">',
                                    '<tpl if="Out_Punch.lat !== 0 &amp;&amp; Out_Punch.lng !== 0">',
                                    '<div data-action="map" data-punch="out" data-record="{ID}" class="icon loc x-fas fa-map-marked-alt"></div>',
                                    '</tpl>',
                                '</div>',
                            '</div>',
                            '</tpl>',
                        '</div>',
                         {
                             // Format date string to be short
                             shortDate: function(v){
                                 if(v == null){
                                     return "(None)";
                                 }
                                 var pad = function(n){return (n<10)? "0" + n : n;};
                                 var dt = v.substr(0, v.indexOf(')')).substr(v.indexOf('(')+1);
                                 var d = new Date(parseInt(dt));
                                 return [
                                     pad(d.getUTCMonth() + 1),
                                     pad(d.getUTCDate()),
                                     pad(d.getUTCFullYear())
                                 ].join('/');
                             },
                             // Format time string to be displayable
                             shortTime: function(v){
                                if(v == null){
                                    return "(None)";
                                }
                                var dt = v.substr(0, v.indexOf(')')).substr(v.indexOf('(')+1);
                                var d = new Date(parseInt(dt));
                                return d.toLocaleTimeString();
                            }
                         }
                    ]
                }
            },
            bind: {
                store: '{workTimeRecords}'
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    text: '',
                    groupable: false,
                    hideable: false,
                    menu: null,
                    menuDisabled: true,
                    resizable: false,
                    tpl: '<span style="padding:0;" class="{Photo}"></span>',
                    cell: {
                        encodeHtml: false
                    },
                    width: '4em',
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    formatter: 'date("m/d/Y")',
                    dataIndex: 'Record_Date',
                    text: 'Date'
                },

                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    text: 'Time IN',
                    // dataIndex: 'Start_Time'
                    tpl: [
                        '{[this.formatted(values.Start_Time)]}',
                        {
                            formatted: function(v){
                                return v.toLocaleTimeString();
                            }
                        }
                    ]
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    text: 'Time OUT',
                    // dataIndex: 'End_Time'
                    tpl: [
                        '{[this.formatted(values.End_Time)]}',
                        {
                            formatted: function(v){
                                return v.toLocaleTimeString();
                            }
                        }
                    ]
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    text: 'Hours',
                    dataIndex: 'Total_Time_Hours'

                },
                {
                    xtype: 'gridcolumn',
                    flex: 2,
                    text: 'Project',
                    dataIndex: 'Project'
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                // {
                //     xtype: 'checkbox',
                //     boxLabel: 'Show Punches',
                //     // labelAlign: 'right',
                //     inline: true,
                //     reference: 'wtrShowPunches',
                //     ui: 'dark-checkbox',
                //     listeners: {
                //         change: 'onShowPunchesChange'
                //     }
                // },
                {
                    xtype: 'button',
                    ui: 'plain wtr-button',
                    text: 'Show Punches',
                    listeners: {
                        tap: 'onShowPunches'
                    }
                },
                {
                    xtype: 'container',
                    flex: 1,
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
        }
    ]

});