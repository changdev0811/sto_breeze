Ext.define('Breeze.view.main.Nav', {
    extend: 'Ext.Container',
    alias: 'widget.main.nav',

    requires: [
        'Breeze.view.main.NavModel',
        'Breeze.view.main.NavController',
        'Breeze.view.main.tko.AnalogClock',
        'Breeze.view.main.tko.DigitalClock',
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
                    ui:'mainNavUserButton',
                    userCls:'main-nav-user-button',
                    buttonType: 'icon',
                    iconCls: 'x-fa fa-user',
                    text: '',
                    menu:{
                        xtype: 'menu',
                        items:[
                            {
                               xtype: 'menuitem',
                               text:'User Preferences',
                               iconCls:'x-fa fa-user-cog' 
                            }, {
                               xtype: 'menuitem',
                               text:'Sign Out',
                               iconCls:'x-fa fa-sign-out' 
                            }
                        ]
                    }
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
                    minWidth: '256pt',
                    width: 'auto',
                    // flex: 1,
                    userCls:'main-nav-side-bar',
                    items: [
                        {
                            xtype: 'container',
                            reference: 'navPunchClock',
                            layout: 'hbox',
                            height:'128pt',
                            userCls:'main-nav-punch-clock',
                            items: [
                                {
                                    xtype:'main.tko.digitalClock',
                                    clockedIn:false

                                },{
                                    xtype:'main.tko.analogClock',

                                }
                                /*
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
                                */
                            ]
                        },

                        {
                            // Side navigation menu tree
                            xtype: 'treelist',
                            micro: false,
                            flex: 3,
                            userCls: 'main-nav-side-menu',
                            ui: 'SideNav',
                            expanderFirst:false,
                            expanderOnly:false,
                            singleExpand:true,
                            selectOnExpander:true,
                            reference: 'navSideMenuTree',
                            bind: '{personalNav}',
                            listeners: {
                                selectionchange: 'onSideNavSelect'
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