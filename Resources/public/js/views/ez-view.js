YUI.add('ez-view', function (Y) {
    "use strict";
    /**
     * Provides the base eZ View
     *
     * @module ez-view
     */

    Y.namespace('eZ');

    /**
     * An abstract class that adds the `active` attribute so that any view can
     * detect its state and react when it is changed
     *
     * @namespace eZ
     * @class View
     * @extends View
     */
    Y.eZ.View = Y.Base.create('eZView', Y.View, [], {
        initializer: function () {
            this.after('activeChange', this._setSubviewsActive);
        },

        destructor: function () {
            this.set('active', false);
        },

        /**
         * Sets the active attribute of the sub views stored in attributes to
         * the same value as the current view
         *
         * @method _setSubviewsActive
         * @protected
         */
        _setSubviewsActive: function () {
            Y.Object.each(this._getAttrCfgs(), function (attrCfg, name) {
                var attr = this.get(name);

                if ( attr instanceof Y.eZ.View ) {
                    attr.set('active', this.get('active'));
                }
            }, this);
        }
    }, {
        ATTRS: {
            /**
             * Stores the active status of the view. It is set to true by the
             * application after the view container has been added to DOM.
             *
             * @attribute active
             * @type Boolean
             * @default false
             */
            active: {
                value: false
            }
        }
    });
});