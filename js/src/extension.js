/*
 * Modifications copyright (C) 2021 8080 Labs GmbH
 *
 * - replaced qgrid with ipyslickgrid in line 16
 */

// This file contains the javascript that is run when the notebook is loaded.
// It contains some requirejs configuration and the `load_ipython_extension`
// which is required for any notebook extension.

// Configure requirejs
if (window.require) {
    window.require.config({
        map: {
            "*" : {
                "ipyslickgrid": "nbextensions/ipyslickgrid/index"
            }
        }
    });
}

// Export the required load_ipython_extension
module.exports = {
    load_ipython_extension: function() {}
};
