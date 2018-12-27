/**
 * Admin User Defined Categories API calls
 * Extends Breeze.api.Base.
 * @class Roles
 * @namespace Breeze.api.admin.UDC
 * @extends Breeze.api.Base
 */
Ext.define('Breeze.api.admin.UDC', {
    extend: 'Breeze.api.Base',

    /**
     * @param {Object} categoryId Category ID
     * @param {String} name Name to check
     * @return {Promise} Promise resolving with true or rejecting with toast
     * @api /isCategoryNameInUse
     */
    isNameInUse: function (categoryId, name) {
        var api = this.api;
        return new Promise((resolve, reject) => {
            api.serviceRequest(
                'isCategoryNameInUse',
                {
                    category_id: categoryId,
                    name: name
                },
                true, false,
                function (r) {
                    var resp = api.decodeJsonResponse(r);
                    if (resp) {
                        reject({
                            type: Ext.Toast.WARNING,
                            message: 'Name is already used by a different category.'
                        });
                    } else {
                        resolve(true);
                    }
                },
                function (err) {
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Unknown error',
                        error: err
                    });
                }
            )
        });
    },

    /**
     * @api /reorderCategories
     * @deprecated Until behavior substituting drag and drop is decided on
     */
    reorderCategories: function () {

    },

    /**
     * @api /createCategory
     */
    create: function () {
        var api = this.api;
        return new Promise((resolve, reject) => {
            api.serviceRequest(
                'createCategory',
                {},
                true, false,
                function (r) {
                    var resp = api.decodeJsonResponse(r);
                    if (resp.success) {
                        resolve({
                            type: Ext.Toast.INFO,
                            message: resp.info.join('')
                        });
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: 'Unable to create category',
                            error: resp.err
                        });
                    }
                },
                function (err) {
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Unknown error',
                        error: err
                    });
                }
            )
        });
    },

    /**
     * @param {Object} categoryId Category ID
     * @return {Promise} Promise resolving with object indicating inUse and
     *      tiedToPoint, or rejecting with error Toast
     * @api /isCategoryInUse
     */
    isInUse: function (categoryId) {
        var api = this.api;
        return new Promise((resolve, reject) => {
            api.serviceRequest(
                'isCategoryInUse',
                { category_id: categoryId },
                true, false,
                function (r) {
                    var resp = api.decodeJsonResponse(r);
                    if (resp !== 0) {
                        let result = {
                            inUse: true,
                            tiedToPoint: false
                        };
                        if (resp !== -1) {
                            result.tiedToPoint = true
                        }
                        resolve(result);
                    } else {
                        resolve({
                            inUse: false,
                            tiedToPoint: false
                        });
                    }
                },
                function (err) {
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Unknown error',
                        error: err
                    });
                }
            )
        });
    },

    /**
     * @param {Object} categoryId Category ID
     * @return {Promise} Promise resolving success toast or rejecting with error
     *      toast
     * @api /removeCategory
     */
    delete: function (categoryId) {
        var api = this.api;
        return new Promise((resolve, reject) => {
            api.serviceRequest(
                'removeCategory',
                { category_id: categoryId },
                true, false,
                function (r) {
                    var resp = api.decodeJsonResponse(r);
                    if (resp.success) {
                        resolve({
                            type: Ext.Toast.INFO,
                            message: resp.info.join('')
                        });
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: 'Unable to delete category',
                            error: resp.err
                        });
                    }
                },
                function (err) {
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Unknown error',
                        error: err
                    });
                }
            );
        });
    },

    /**
     * @param {Object} parameters Updated category record object
     * @return {Promise} Promise resolving with success toast or rejecting 
     *      with error toast
     * @api /UpdateCategory
     */
    update: function (parameters) {
        var api = this.api;
        return new Promise((resolve, reject) => {
            api.serviceRequest(
                'UpdateCategory',
                { CatInfo: Ext.JSON.encode(parameters) },
                true, false,
                function (r) {
                    var resp = api.decodeJsonResponse(r);
                    if (resp.success) {
                        resolve({
                            type: Ext.Toast.INFO,
                            message: 'Category updated successfully.'
                        });
                    } else {
                        reject({
                            type: Ext.Toast.ERROR,
                            message: 'Error updating category' + (
                                resp.err !== ""
                            )? `(${resp.err})` : '',
                            error: resp.err
                        });
                    }
                },
                function (err) {
                    reject({
                        type: Ext.Toast.ERROR,
                        message: 'Unknown error',
                        error: err
                    });
                }
            );
        });
    }

});