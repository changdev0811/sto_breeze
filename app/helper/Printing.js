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

        printElement: function(element){
            var me = this;
            return new Promise(function(resolve, reject){
                html2canvas(element).then(
                    function(canvas){
                        var win = window.open('','','');
                        win.document.open();
                        win.document.write(this.PRINT_DOC);
                        win.document.body.appendChild(canvas);
                        win.document.close();
                        win.focus();
                        win.print();
                        win.close();
                        resolve(win);
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