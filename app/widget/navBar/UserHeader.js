Ext.define('Breeze.widget.navBar.UserHeader', {
    extend: 'Ext.Container',
    xtype: 'breeze-user-header',
    alias: 'widget.breeze.navbar.userheader',

    config: {
        companyNameBinding: null,
        userNameBinding: null,
        profileImageBinding: null,

        collapsed: false,

        defaultProfileImage: 'resources/photos/default_user.png',

        profileClass: 'main-info-profile-picture',
        companyNameClass: 'main-nav-company-name',
        userNameClass: 'main-nav-user-name',
        buttonClass: 'main-nav-user-button',
        buttonUi: 'mainNavUserButton',

        hasMenu: false,
        menuItems: null
    },


    //====[Functions]====

    constructor: function () {
        this.callParent(arguments);
        this.applyBinding();
        this.applyStyles();
    },

    updateCollapsed: function(v){
        var names = this.getComponent('names');
        names.setHidden(v);
    },

    privates: {
        applyStyles: function(){
            var profilePic = this.getComponent('infoProfilePicture'),
                names = this.getComponent('names'),
                companyName = names.getComponent('company'),
                userName = names.getComponent('user');
            profilePic.setUserCls(this.getProfileClass());
            companyName.setUserCls(this.getCompanyNameClass());
            userName.setUserCls(this.getUserNameClass());
        },
        applyBinding: function () {
            var profilePic = this.getComponent('infoProfilePicture'),
                names = this.getComponent('names'),
                companyName = names.getComponent('company'),
                userName = names.getComponent('user');

            if(this.getProfileImageBinding()){
                profilePic.setBind({src: this.getProfileImageBinding()});
            } else {
                profilePic.setSrc(this.getDefaultProfileImage());
            }

            companyName.setBind({html: this.getCompanyNameBinding()});
            userName.setBind({html: this.getUserNameBinding()});
        },
        /**
         * @todo TODO: implement later if needed
         */
        buildMenu: function () {

        }
    },

    //====[Layout + Content]====

    layout: 'hbox', minHeight: '24pt',
    items: [
        {
            xtype: 'image',
            width: '20pt', height: '20pt',
            itemId: 'infoProfilePicture'
        },


        {
            xtype: 'container', flex: 1, layout: 'vbox', itemId: 'names',
            defaults: {  },
            items: [
                {
                    xtype: 'component', flex: 1, width: '128pt',
                    itemId: 'company'
                },
                {
                    xtype: 'component', flex: 1, width: '128pt',
                    itemId: 'user'
                }
            ]
        },
        // TODO: Implement ability to have menu if desirable
        // {
        //     xtype: 'button',
        //     menuAlign: 'tr', text: '',
        //     arrow: false, iconCls: 'x-fa fa-angle-right',
        //     itemId: 'helperButton'
        // },
        // {
        //     xtype: 'button',
        //     menuAlign: 'tr',
        //     ui: 'mainNavUserButton',
        //     userCls: 'main-nav-user-button',
        //     style: 'hyphens:auto; position:absolute; height:100%; width:220pt; right:0pt',
        //     text: '',
        //     arrow: false,
        //     menu: {
        //         xtype: 'menu',
        //         items: [
        //             /*{
        //                 xtype: 'menucheckitem',
        //                 text: 'Enable Night Mode',
        //                 bind: {
        //                     checked: '{nightMode}'
        //                 },
        //                 listeners: {
        //                     checkChange: 'onMenuNightModeChange'
        //                 }
        //             },*/
        //             {
        //                 xtype: 'menuitem',
        //                 text: 'User Preferences',
        //                 iconCls: 'x-fas fa-user-cog',
        //                 listeners: {
        //                     click: 'onUserPreferences'
        //                 },
        //                 // separator: true
        //                 //    icon: 'resources/icons/user-cog.svg'
        //             }/*, {
        //                 xtype: 'menuitem',
        //                 text: 'Sign Out',
        //                 iconCls: 'x-fas fa-sign-out',
        //                 handler: 'onMenuSignOut'
        //             }*/
        //         ]
        //     }
        // }
    ],

});

// Original code from Nav.js

// {
//     xtype: 'container',
//     layout: 'hbox',
//     minHeight: '64pt',
//     items: [
//         {
//             xtype: 'image',
//             height: '32pt',
//             width: '32pt',
//             src: 'resources/photos/default_user.png',
//             //bind: {
//             //    src: '{profilePicture}'
//             //},
//             reference: 'infoProfilePicture',
//             userCls: 'main-info-profile-picture'
//         },
//         {
//             xtype: 'container',
//             flex: 1,
//             layout: 'vbox',
//             items: [
//                 // Company Name
//                 {
//                     xtype: 'component',
//                     flex: 1,
//                     width:'136pt',
//                     style: '',
//                     userCls: 'main-nav-company-name',
//                     reference: 'navHeaderCompanyName',
//                     bind: {
//                         html: '{header.business}'
//                     }
//                 },
//                 // User Name
//                 {
//                     xtype: 'component',
//                     flex: 1,
//                     width:'136pt',
//                     style: '',
//                     userCls: 'main-nav-user-name',
//                     reference: 'navHeaderUserName',
//                     bind: {
//                         html: '{header.fullname}'
//                     }
//                 }
//             ]
//         },
//         // This item needs to be in place in order for collapse function to work
//         {
//             xtype: 'button',
//             menuAlign: 'tr',
//             ui: 'mainNavUserButton',
//             userCls: 'main-nav-user-button',
//             text: '',
//             arrow: false,
//             iconCls: 'x-fa fa-angle-right',
//         },
        // Item commented out as not currently using the popup menu attached
        // to the user button
        /* Actual button */
        // {
        //     xtype: 'button',
        //     menuAlign: 'tr',
        //     ui: 'mainNavUserButton',
        //     userCls: 'main-nav-user-button',
        //     style: 'hyphens:auto; position:absolute; height:100%; width:220pt; right:0pt',
        //     text: '',
        //     arrow: false,
        //     menu: {
        //         xtype: 'menu',
        //         items: [
        //             /*{
        //                 xtype: 'menucheckitem',
        //                 text: 'Enable Night Mode',
        //                 bind: {
        //                     checked: '{nightMode}'
        //                 },
        //                 listeners: {
        //                     checkChange: 'onMenuNightModeChange'
        //                 }
        //             },*/
        //             {
        //                 xtype: 'menuitem',
        //                 text: 'User Preferences',
        //                 iconCls: 'x-fas fa-user-cog',
        //                 listeners: {
        //                     click: 'onUserPreferences'
        //                 },
        //                 // separator: true
        //                 //    icon: 'resources/icons/user-cog.svg'
        //             }/*, {
        //                 xtype: 'menuitem',
        //                 text: 'Sign Out',
        //                 iconCls: 'x-fas fa-sign-out',
        //                 handler: 'onMenuSignOut'
        //             }*/
        //         ]
        //     }
        // }
    // ]
// },