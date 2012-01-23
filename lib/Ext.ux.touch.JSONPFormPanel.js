Ext.namespace('Ext.ux.touch');
/**
 * Ext.ux.touch.JSONPFormPanel Extension Class
 *
 * @author Chris Toppon
 * @version 0.1
 *
 * @class Ext.ux.touch.JSONPFormPanel
 * @extends Ext.form.FormPanel
 * @constructor
 * @param {Object} config Configuration options
 */
Ext.ux.JSONPFormPanel = function(config) {
    // call parent constructor
    Ext.ux.JSONPFormPanel.superclass.constructor.call(this, config);
}; 

//extend
Ext.extend(Ext.ux.JSONPFormPanel, Ext.form.FormPanel, {
    submit: function(options) {
        var form = this.el.dom || {},
        formValues
        
        options = Ext.apply({
            url : this.url || form.action,
            callbackKey: 'callback',
            submitDisabled : false,
            method : form.method || 'post',
            autoAbort : false,
            params : null,
            waitMsg : null,
            headers: null,
            success : null,
            failure : null
        }, options || {});
        
        formValues = this.getValues(this.standardSubmit || !options.submitDisabled);
        
        if (this.standardSubmit) {
            if (form) {
                if (options.url && Ext.isEmpty(form.action)) {
                    form.action = options.url;
                }

                form.method = (options.method || form.method).toLowerCase();

                if (this.fireEvent('beforesubmit', this, formValues, options) !== false) {
                    form.submit();
                }
            }
            return null;
        }
        
        if (this.fireEvent('beforesubmit', this, formValues, options ) !== false) {
            if (options.waitMsg) {
                this.showMask(options.waitMsg);
            }
            Ext.util.JSONP.request({
                url     : options.url,
                callbackKey: options.callbackKey,
                params  : formValues,
                callback : function(response) {
                    var responseText = Ext.encode(response);
                    this.hideMask();
                    if (response.pager || response.users || response.userGroups) {
                        success = true;
                        if (success) {
                            if (Ext.isFunction(options.success)) {
                                options.success.call(options.scope || this, this, response, responseText);
                            }

                            this.fireEvent('submit', this, response);
                            return;
                        }
                    }

                    if (Ext.isFunction(options.failure)) {
                        options.failure.call(options.scope || this, this, response, responseText);
                    }
                    
                    this.fireEvent('exception', this, response);
                },
                scope : this
            });
        }
    }
});