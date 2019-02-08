/**
 * WorkTime Records Record subview
 * @class Record
 * @alias Breeze.view.employee.workTime.Record
 */
Ext.define('Breeze.view.employee.workTime.Record', {
    extend: 'Ext.Container',
    alias: 'widget.employee.worktime.record',

    layout: 'vbox',
    userCls: 'employee-worktime-records-grid',

    items: [
        {
            xtype: 'panel',
            flex: 1,
            tools: [
                {
                    xtype: 'tool',
                    iconCls: 'x-fas fa-plus',
                    handler: 'showAddNewWTRDialog'
                }
            ], 
            layout: 'vbox',
            items: [{
                    reference: 'workTimeRecordGrid',
                    xtype: 'grid',
                    ui: 'employee-worktime-records-grid',
                    userCls: 'employee-worktime-records-grid',
                    height: '100%', width: '100%',
                    flex: 1,
                    layout: 'hbox',
                    // itemConfig: {
                    //     xtype: 'gridrow'
                    // },
                    sortable: false,
                    plugins: {
                        rowexpander: true,
                        gridcellediting: {
                            selectOnEdit: true
                        }
                    },
                    // Removed for now because trying to force newly loaded
                    // records to show their punches causes layout issues
                    // listeners: {
                    //     refresh: 'onWorkRecordsUpdated'
                    // },
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
                                            '<div data-action="map" data-punch="in" data-record="{ID}" class="icon loc x-far fa-compass"></div>',
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
                                            '<div data-action="map" data-punch="out" data-record="{ID}" class="icon loc x-far fa-compass"></div>',
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
                            groupable: false,
                            hideable: false,
                            menu: null,
                            menuDisabled: true,
                            // tpl: '<div class="{Photo}"></div>',
                            renderer: function(val, rec, col, cell){
                                cell.setTools([{
                                    iconCls: rec.get('Photo')
                                }]);
                            },
                            // padding: '2pt', margin: '2pt',
                            width: 'auto',
                            
                        },
                        {
                            xtype: 'datecolumn',
                            flex: 1,
                            text: 'Date',
                            dataIndex: 'Record_Date',
                            sortable: true,
                            editable: true,
                            editor: {
                                field: {
                                    xtype: 'datepickerfield',
                                    listeners: {
                                        change: 'onCellChange'
                                    }
                                },
                                allowBlank: false
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 1,
                            text: 'Time IN',
                            dataIndex: 'timeIn',
                            sortable: true,
                            editable: true,
                            editor: {
                                xtype: 'selectfield',
                                itemId: 'timeInSelector',
                                bind: {
                                    store: 'accrualShiftChoices'
                                },
                                displayField: 'time',
                                valueField: 'value',
                                listeners: {
                                    change: 'onTimeChange'
                                }
                            },
                            renderer: 'timefieldRenderer'
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 1,
                            text: 'Time OUT',
                            dataIndex: 'timeOut',
                            sortable: true,
                            editable: true,
                            editor: {
                                xtype: 'selectfield',
                                itemId: 'timeOutSelector',
                                store: 'accrualShiftChoices',
                                displayField: 'time',
                                valueField: 'value',
                                bind: {
                                    listeners: {
                                        change: 'onTimeChange'
                                    }
                                }
                            },
                            renderer: 'timefieldRenderer'
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 1,
                            text: 'Hours',
                            dataIndex: 'Total_Time_Hours',
                            sortable: true,
                            editable: false,
                            // summaryType: 'sum',
                            // summaryRenderer: function (value, summaryData, dataIndex) {
                            //     return new Minutes(value, this.grid.up('wtv').HHMM).display();
                            // }
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 2,
                            text: 'Project',
                            dataIndex: 'Project_ID',
                            sortable: true,
                            editable: true,
                            editor: {
                                xtype: 'selectfield',
                                bind: {
                                    store: '{projects}',
                                },
                                displayField: 'Name',
                                valueField: 'ID',
                                listeners: {
                                    change: 'onCellChange'
                                }
                            },
                            renderer: 'projectRenderer'
                        }
                    ]
                }
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
                            xtype: 'checkbox',
                            boxLabel: 'Show Punches',
                            // labelAlign: 'right',
                            inline: true,
                            reference: 'wtrShowPunches',
                            ui: 'dark-checkbox',
                            listeners: {
                                change: 'onShowPunchesChange'
                            }
                        },

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