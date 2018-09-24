/**
 * Printing helper class
 * 
 * @class Printing
 * @namespace Breeze.helper.Printing
 */
Ext.define('Breeze.helper.Printing', {
   
    statics: {

        PRINT_DOC: '<!DOCTYPE html>' +
            '<html>' +
            '<head><title>Breeze</title></head>' +
            '<body></body>' +
        '</html>',
        
        /**
         * Print an element using a canvas in a popup window
         * @param {Element} element Source element
         * @return {Promise} promise resolving in window reference or rejecting with error
         */
        printElement: function(element){
            var me = this;
            return new Promise(function(resolve, reject){
                html2canvas(element).then(
                    function(canvas){
                        console.info('canvas', canvas);
                        try {
                            var win = window.open('','','');
                            win.document.open();
                            win.document.write(this.PRINT_DOC);
                            
                            win.document.body.appendChild(canvas);
                            win.document.close();
                            
                            // Workaround for random "undefined" text thrown into document
                            if(win.document.body.firstChild.nodeType == Node.TEXT_NODE){
                                win.document.body.firstChild.remove();
                            }

                            win.focus();
                            win.print();
                            win.close();

                            resolve();
                        }
                        catch(e){
                            console.warn('Exception caught in printElement > html2canvas:', e);
                            reject(e);
                        }
                    }
                ).catch(
                    function(err){
                        console.warn('Error caught in html2canvas:', err);
                        reject(err);
                    }
                )
            });
        }

    }

});