Ext.define('Breeze.view.main.Nav', {
    extend: 'Ext.Container',
    alias: 'widget.main.nav',

    requires: [
        'Breeze.view.main.NavModel',
        'Breeze.view.main.NavController',
        'Ext.menu.Menu',
        'Ext.menu.Item',
        'Ext.list.Tree',
        'Ext.Toolbar'
    ],

    viewModel: {
        type: 'main.nav'
    },
    controller: 'main.nav',


    layout: 'vbox',

    items: [
        {
            xtype: 'container',
            userCls:'main-nav-header',
            height:'60pt',
            layout: 'hbox',
            items: [
                {
                    xtype: 'component',
                    html: 'title'
                }
            ]

        },
        {
            xtype: 'container',
            flex: 1,
            layout: 'hbox',
            items: [
                {
                    xtype: 'container',
                    layout: 'vbox',
                    // minWidth: '150px',
                    width: 'auto',
                    // flex: 1,
                    userCls:'main-nav-side-bar',
                    items: [
                        {
                            xtype: 'container',
                            reference: 'navPunchClock',
                            flex: 1,
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'component',
                                    itemId: 'dateTime',
                                    bind: {
                                        html: 
                                            '<h3>{punchDate}</h3><hr>' +
                                            '<h4>{punchTime}</h4><hr>' +
                                            '<h5>{punchStatus}</h5>'
                                    }
                                }, {
                                    xtype: 'component',
                                    itemId: 'clock'
                                }
                            ]
                        },
                        {
                            // Side navigation menu tree
                            xtype: 'treelist',
                            micro: false,
                            flex: 3,
                            userCls: 'main-nav-side-menu',
                            ui: 'SideNav',
                            reference: 'navSideMenuTree',
                            store: {
                                root: {
                                    children: [
                                        {
                                            text: 'Personal',
                                            iconCls: 'x-fa fa-user',
                                            children: [
                                                {
                                                    text: 'Calendar', leaf: true,
                                                    iconCls: 'x-fa fa-calendar'
                                                }, {
                                                    text: 'Employee Information', leaf: true,
                                                    iconCls: 'x-fa fa-id-card-o'
                                                }, {
                                                    text: 'FYI', leaf: true,
                                                    iconCls: 'x-fa fa-table'
                                                }, {
                                                    text: 'Year at a Glance', leaf: true,
                                                    iconCls: 'x-fa fa-eye'
                                                }
                                            ]
                                        }, {
                                            text: 'My Requests', leaf: true,
                                            iconCls: 'x-fa fa-retweet'
                                        },  {
                                            text: 'Reports', leaf: true,
                                            iconCls: 'x-fa fa-bar-chart'
                                        },  {
                                            text: 'Help', leaf: true,
                                            iconCls: 'x-fa fa-question-circle'
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 3,
                    reference: 'contentContainer',
                    scrollable: 'vertical'
                }
            ]
        }
    ]
});