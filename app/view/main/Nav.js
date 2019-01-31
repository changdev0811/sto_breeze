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
        'Breeze.widget.navBar.UserHeader',
        'Ext.menu.Menu',
        'Ext.menu.Item',
        'Breeze.widget.navBar.NavTree',
        'Breeze.widget.history.Bread',
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
        //----- Header -------------------------------------------
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

        },//------- end of Header --------------------------
        //---------- Body ----------------------------------
        {
            xtype: 'container',
            flex: 1,
            layout: 'hbox',
            userCls: 'full-content',
            items: [
                //----------- side tree-node navigation bar --------
                {
                    xtype: 'container',
                    layout: 'vbox',
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
                                    xtype: 'breeze-user-header',
                                    reference: 'userHeader',
                                    companyNameBinding: '{header.business}',
                                    userNameBinding: '{header.fullname}'
                                },
                                
                                /*{
                                    xtype: 'breeze.navbar.navtree',
                                    defaults: {
                                        xtype: 'breeze.navbar.navtreeitem'
                                    },
                                    micro: false,
                                    userCls: ['main-nav-side-menu', 'normal'],
                                    ui: 'SideNav',
                                    expanderFirst: false,
                                    expanderOnly: false,
                                    singleExpand: true,
                                    selectOnExpander: true,
                                    floatLeafItems: false,
                                    store: {
                                        root: {
                                            children: [
                                                {
                                                    text: 'Venture Interactive',
                                                    iconCls: 'x-fas fa-user',
                                                    // routeAct: false,
                                                    // routeRef: 'personal',
                                                    // id: 'personal',
                                                    children: [
                                                        {
                                                            text: 'User Preferences', leaf: true,
                                                            iconCls: 'x-fas fa-user-cog',
                                                            routeRef: 'user/preferences',
                                                            id: 'preferences'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        type: 'tree'
                                    },
                                    listeners: {
                                        selectionchange: 'onSideNavSelect'
                                    }
                                },*/
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
                },//----------- end of side tree-node navigation bar
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
        },

        {
            xtype: 'dialog',
            ui:'dark-themed-dialog employeeinfo-dialog',
            reference: 'punchWindowDialog',
            minWidth: '300pt',
            minHeight: '300pt',
            layout: 'vbox',
            title:{
                text:'Notes',
                ui:'dark-themed-dialog'
            },
            bind:{
                title: '{header.fullname}',
            },
            items:[
                {
                    xtype:'container',
                    layout:'hbox',
                    items:[
                        {
                            xtype: 'image',
                            height: '48pt',
                            width: '48pt',
                            src: 'resources/photos/default_user.png',
                            //bind: {
                            //    src: '{profilePicture}'
                            //},
                            reference: 'infoProfilePicture',
                            userCls: 'punch-window-profile-picture',

                        },
                        {
                            xtype: 'component',
                            flex:1,
                            style:'margin:auto 0pt auto 5pt;',
                            html: 'You are currently {inout}<br>{lastPunch}'
                        },
                    ]
                },
                {
                    xtype: 'component',
                    userCls:'punchWindowClock',
                    html: '{0:00:00 AM/PM}'
                },
                {
                    xtype: 'selectfield',
                    label: 'Project',
                    labelAlign: 'left',
                    labelWidth: 'auto',
                    placeholder: '*No Project*',
                },
                {
                    xtype: 'textareafield',
                    flex: 1,
                    border: true,
                    label: 'Note',
                    //bind: '{tempNotes}',
                    placeholder: ""
                }
            ],
            buttons: [
                {
                    text: 'Clear',
                    ui: 'action alt',
                    handler: 'onClearNotesButton',
                    bind: {
                        //disabled: '{!hasTempNotes}'
                    }
                },
                {
                    xtype: 'spacer',
                    //width: '8pt',
                    flex:1,
                },
                {
                    text: 'Punch In', // Bind: Punch In / Punch Out
                    ui: 'confirm alt',
                    //handler: 'onSubmitNotesButton' // Bind: Punch In / Punch Out
                },
                {
                    xtype: 'spacer',
                    width: '8pt'
                },
                {
                    text: 'Cancel',
                    ui: 'decline alt',
                    handler: 'onClosePunchWindowDialog'
                }
            ]
        },

    ]
});