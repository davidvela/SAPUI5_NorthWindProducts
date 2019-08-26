sap.ui.define([
		"test/testNorthProducts/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("test.testNorthProducts.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);