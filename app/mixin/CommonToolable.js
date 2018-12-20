/**
 * Mixin providing common tool functionality and dynamic injection
 * 
 * (Refresh and print tools)
 * 
 * Only auto-initializes when controller using mixin defines 
 * an 'onInit' method. Otheriwse, mixin can be manually initialized by
 * calling this.mixins.commonToolable.initCommonTools()
 * @class CommonToolable
 * @namespace Breeze.mixin.CommonToolable
 * @extends Ext.Mixin
 * @mixinId: commonToolable
 * @author wadevh <wade@ventureinteractive.com>
 */
Ext.define('Breeze.mixin.CommonToolable', {
    extend: 'Ext.Mixin',
    mixinId: 'commonToolable',

    config: {
        /**
         * Whether to inject tools; tools only injected if set to 
         * true in class using mixin
         */
        injectTools: false,
        /**
         * Tracks if tools have already been injected
         */
        toolsInjected: false,
        /**
         * Icon class for refresh tool
         */
        refreshToolIcon: 'x-fa fa-sync',
        /**
         * Icon class for print tool
         */
        printToolIcon: 'x-fa fa-print',
        /**
         * List of tools to include
         */
        commonTools: ['refresh', 'print'],
        /**
         * Optional specifier for component to add tools to
         * null - default container of mixed class
         * string - lookup component by reference name
         * object with 'itemId' - lookup component by itemId
         * object with 'ref' - lookup component by reference name
         */
        commonToolsContainer: null
    },

    mixinConfig: {
        after: {
            'onInit': 'initCommonTools'
        }
    },

    /**
     * Initialize common tools, performing injection if configured to do so
     * Automatically fired after 'onInit' method, if present
     */
    initCommonTools: function () {
        console.info('CommonToolable initCommonTools');
        if (this.getInjectTools() && !this.getToolsInjected()) {
            this.doInjection();
        }
    },

    constructor: function(){
        console.info('mix construct');
    },



    //=== [Tool Behaviors Event Handlers] ===

    /**
     * Handle refresh tool button click
     * 
     * Override in extending controllers to replace default behavior
     */
    onRefreshTool: function (c, t, eOpts) {
        console.info('Refresh tool');
        if (this.onInit) {
            this.onInit(this.getView());
        } else {
            console.warn('Default refresh tool handler (controller base) can\'t find onInit method');
        }
    },

    /**
     * Handle print tool button click
     * 
     * Override in extending controllers to replace default behavior
     */
    onPrintTool: function (c, t, eOpts) {
        console.info('Print tool');
        var me = this;
        var el = me.getView().element.dom;

        Breeze.helper.Printing.printElement(el).then(
            function (win) {
                console.info('Print ok?', win);
            }
        ).catch(
            function (err) {
                console.warn('Print failed: ', err);
            }
        )
    },

    privates: {

        /**
         * Resolve component to which tools will be added
         * Uses config param commonToolsContainer, which can be:
         *  - null : (base view attached to mixin class)
         *  - string : lookup name of component
         *  - object (itemId) : itemId of component to lookup
         *  - object (ref) : same as just providing reference name
         * Returns null on resolution failure 
         */
        resolveToolContainer: function () {
            var ref = this.getCommonToolsContainer();

            if (ref == null) {
                return this.getView();
            }

            if (typeof ref == 'string') {
                return this.lookup(ref);
            }

            if (typeof ref == 'object') {
                if (ref['itemId']) {
                    return this.getComponent(ref.itemId);
                }
                if (ref['reference']) {
                    return this.lookup(ref.reference);
                }
            }

            throw new Error(
                `Couldn't resolve common tool container from ${JSON.stringify(this.getCommonToolsContainer())}`
            );
        },

       
        /**
         * 'Inject' tools into target container view, if not already injected
         */
        doInjection: function () {
            if (this.getToolsInjected()) {
                // Skip if injection already took place
                return null;
            }
            var tools = [],
                includedTools = this.getCommonTools();


            // Add chosen tools to array, using config derived icons
            if (includedTools.includes('refresh')) {
                tools.push({
                    iconCls: this.getRefreshToolIcon(),
                    handler: 'onRefreshTool'
                });
            }

            if (includedTools.includes('print')) {
                tools.push({
                    iconCls: this.getPrintToolIcon(),
                    handler: 'onPrintTool'
                });
            }

            // Inject tools if at least one is chosen
            if (tools.length > 0) {
                var target = this.resolveToolContainer();
                if (target !== null) {
                    target.setTools(tools);
                }
            }

            // Update config value to indicate injection occurred
            this.setToolsInjected(true);
        }

    }

});
