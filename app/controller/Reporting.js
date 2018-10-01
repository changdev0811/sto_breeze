/**
 * Extended version of Breeze base ViewController with extra functionality
 * specific for reporting
 * 
 * @class Reporting
 * @namespace Breeze.controller.Reporting
 * @extends Breeze.controller.Base
 */
Ext.define('Breeze.controller.Reporting', {
    extend: 'Breeze.controller.Base',
    

    //===[Action Button Default Handlers]===

    /**
     * Handle 'Print PDF' action button
     * Can be overridden in view controllers extending Reporting
     */
    onPrintPDF: function(c, e, eOpts){
        console.info('Print PDF Clicked');
    },

    /**
     * Handle 'Print Excel' action button
     * Can be overridden in view controllers extending Reporting
     */
    onPrintExcel: function(c, e, eOpts){
        console.info('Print Excel Clicked');
    },

    /**
     * Handle 'Print Word' action button
     * Can be overridden in view controllers extending Reporting
     */
    onPrintWord: function(c, e, eOpts){
        console.info('Print Word Clicked');
    }
});