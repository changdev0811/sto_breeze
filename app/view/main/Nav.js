Ext.define('Breeze.view.main.Nav', {
    extend: 'Ext.Container',
    alias: 'widget.main.nav',

    requires: [
        'Breeze.view.main.NavModel',
        'Breeze.view.main.NavController',
        'Ext.menu.Menu',
        'Ext.menu.Item',
        'Ext.list.Tree',
        'Ext.Toolbar',
        'Ext.Img',
        'Ext.Button'
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
            height:'64pt',
            layout: 'hbox',

            items: [
                {
                    xtype: 'image',
                    reference: 'Logo',
                    height: '64pt',
                    width: '170pt',
                    selfAlign: '',
                    src: 'resources/img/breeze_logo.svg'
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'component',
                            flex: 1,
                            style: '',
                            userCls: 'main-nav-company-name',
                            html: 'Company Name'
                        },
                        {
                            xtype: 'component',
                            flex: 1,
                            style: '',
                            userCls: 'main-nav-user-name',
                            html: 'First M. Last'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    buttonType: 'icon',
                    iconCls: 'x-fa fa-user',
                    text: ''
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
                            height:'128pt',
                            userCls:'main-nav-punch-clock',
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
                                        /*{
                                            text: 'Dashboard', leaf: true,
                                            iconCls: 'x-fa fa-tachometer'
                                        },*/ {
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