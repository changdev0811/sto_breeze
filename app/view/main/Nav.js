/**
 * Main navigation view, containing header bar, nav sidebar
 * and content panel
 * @class Nav
 * @namespace Breeze.view.main.Nav
 * @alias widget.main.nav
 * @extends Ext.Container
 */
Ext.define('Breeze.view.main.Nav', {
    extend: 'Ext.Container',
    alias: 'widget.main.nav',

    requires: [
        'Breeze.view.main.NavModel',
        'Breeze.view.main.NavController',
        'Breeze.widget.punch.AnalogClock',
        'Breeze.widget.punch.DigitalClock',
        'Ext.menu.Menu',
        'Ext.menu.Item',
        'Breeze.widget.navBar.NavTree',
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
            userCls: 'main-nav-header',
            height:'64pt',
            layout: 'hbox',

            items: [
                {
                    xtype: 'image',
                    reference: 'navHeaderLogo',
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
                        // Company Name
                        {
                            xtype: 'component',
                            flex: 1,
                            style: '',
                            userCls: 'main-nav-company-name',
                            reference: 'navHeaderCompanyName',
                            bind: {
                                html: '{header.business}'
                            }
                        },
                        // User Name
                        {
                            xtype: 'component',
                            flex: 1,
                            style: '',
                            userCls: 'main-nav-user-name',
                            reference: 'navHeaderUserName',
                            bind: {
                                html: '{header.fullname}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'button',
                    ui:'mainNavUserButton',
                    userCls:'main-nav-user-button',
                    buttonType: 'icon',
                    iconCls: 'x-fas fa-user',
                    text: '',
                    menu:{
                        xtype: 'menu',
                        items:[
                            {  
                                xtype: 'menucheckitem',
                                text: 'Enable Night Mode',
                                bind: {
                                    checked: '{nightMode}'
                                },
                                listeners: {
                                    checkChange: 'onMenuNightModeChange'
                                }
                            },
                            {
                               xtype: 'menuitem',
                               text:'User Preferences',
                               iconCls:'x-fas fa-user-cog',
                               separator: true
                            //    icon: 'resources/icons/user-cog.svg'
                            }, {
                               xtype: 'menuitem',
                               text:'Sign Out',
                               iconCls:'x-fas fa-sign-out',
                               handler: 'onMenuSignOut'
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
            userCls: 'full-content',
            items: [
                {

                    xtype: 'container',
                    layout: 'vbox',
                    // minWidth: '200pt',
                    // maxWidth: '200pt',
                    //width: 'auto',
                    // flex: 1,
                    reference: 'navSideBar',
                    userCls:['main-nav-side-bar'],
                    items: [
                        {
                            xtype: 'breeze-punchbutton',
                            reference: 'navPunchClock',
                            bind: {
                                hidden: '{!hasKron || (!canQuickPunch && !canPunch)}',
                                allowed: {
                                    quick: '{canQuickPunch}',
                                    regular: '{canPunch}'
                                },
                                clockedIn: '{isClockedIn}'
                            },
                            listeners: {
                                punch: 'onPunch'
                            }
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            scrollable: 'y',
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'breeze.navbar.collapsebutton',
                                    ui: 'mainNavCollapseButton',
                                    collapsed: false,
                                    height: '2em',
                                    listeners: {
                                        tap: 'onSideNavToggle'
                                    }
                                },
                                {
                                    // Side navigation menu tree
                                    xtype: 'breeze.navbar.navtree',
                                    defaults: {
                                        xtype: 'breeze.navbar.navtreeitem'
                                    },
                                    micro: false,
                                    // flex: 3,
                                    userCls: ['main-nav-side-menu','normal'],
                                    ui: 'SideNav',
                                    expanderFirst:false,
                                    expanderOnly:false,
                                    singleExpand:true,
                                    selectOnExpander:true,
                                    floatLeafItems: false,
                                    reference: 'navSideMenuTree',
                                    bind: '{personalNav}',
                                    listeners: {
                                        selectionchange: 'onSideNavSelect'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    reference: 'employeesPanelContainer',
                    layout: 'fit',
                    width: '250pt',
                    items: [
                        // {
                        //     xtype: 'breeze-employees-panel'
                        // }
                    ],
                    hidden: true
                },
                {
                    xtype: 'navigationview',
                    flex: 3,
                    userCls: 'main-content',
                    reference: 'contentContainer',
                    scrollable: 'vertical',
                    navigationBar: false,
                    layout: {
                        animation: 'fade'
                    }
                    // layout: 'fit'
                }
            ]
        }
    ]
});