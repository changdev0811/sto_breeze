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
            height: '64pt',
            layout: 'hbox',


            items: [
                {
                    xtype: 'image',
                    reference: 'navHeaderLogo',
                    height: '64pt',
                    width: '170pt',
                    selfAlign: '',
                    style: 'cursor: pointer',
                    src: 'resources/img/breeze_logo.svg',
                    listeners: {
                        tap: 'onLogoTap'
                    }
                },

                // +++ Bread crumbs go in here +++
                {
                    xtype: 'breeze-history-bread',
                    reference: 'breadCrumbs',
                    flex: 1,
                    style: 'margin-left: 48pt; height: 64pt'
                },
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
                    userCls: ['main-nav-side-bar'],
                    items: [

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
                                    xtype: 'container',
                                    layout: 'hbox',
                                    height: '64pt',
                                    items: [

                                        {
                                            xtype: 'image',
                                            height: '32pt',
                                            width: '32pt',
                                            src: 'resources/photos/default_user.png',
                                            //bind: {
                                            //    src: '{profilePicture}'
                                            //},
                                            reference: 'infoProfilePicture',
                                            userCls: 'main-info-profile-picture'
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
                                            menuAlign: 'tr',
                                            ui: 'mainNavUserButton',
                                            userCls: 'main-nav-user-button',
                                            text: '',
                                            arrow: false,
                                            iconCls: 'x-fa fa-angle-right',
                                        },

                                        /* Actual button */
                                        {
                                            xtype: 'button',
                                            menuAlign: 'tr',
                                            ui: 'mainNavUserButton',
                                            userCls: 'main-nav-user-button',
                                            style: 'position:absolute; height:64pt; width:220pt; right:0pt',
                                            text: '',
                                            arrow: false,
                                            menu: {
                                                xtype: 'menu',
                                                items: [
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
                                                        text: 'User Preferences',
                                                        iconCls: 'x-fas fa-user-cog',
                                                        separator: true
                                                        //    icon: 'resources/icons/user-cog.svg'
                                                    }, {
                                                        xtype: 'menuitem',
                                                        text: 'Sign Out',
                                                        iconCls: 'x-fas fa-sign-out',
                                                        handler: 'onMenuSignOut'
                                                    }
                                                ]
                                            }
                                        }

                                    ]
                                },


                                {
                                    // Side navigation menu tree
                                    xtype: 'breeze.navbar.navtree',
                                    defaults: {
                                        xtype: 'breeze.navbar.navtreeitem'
                                    },
                                    micro: false,
                                    // flex: 3,
                                    userCls: ['main-nav-side-menu', 'normal'],
                                    ui: 'SideNav',
                                    expanderFirst: false,
                                    expanderOnly: false,
                                    singleExpand: true,
                                    selectOnExpander: true,
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
                    reference: 'sidePanelContainer',
                    layout: 'fit',
                    //width: '250pt',
                    width: '225pt',
                    items: [
                        // {
                        //     xtype: 'breeze-employees-panel'
                        // }
                    ],
                    hidden: true,
                    bind: {
                        hidden: '{!sidePanel.shown}'
                    }
                },
                /*  Container for combining potential employees panel
                    subnav bar and main navigation content view */
                {
                    xtype: 'container',
                    layout: 'vbox',
                    flex: 3,
                    items: [
                        // Employees Panel Sub Navigation bar
                        {
                            xtype: 'breeze-employees-subnav',
                            bind: {
                                hidden: '{hideEmployeesSubNav}'
                            }
                        },
                        {
                            xtype: 'navigationview',
                            userCls: 'main-content',
                            flex: 1,
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
        }
    ]
});