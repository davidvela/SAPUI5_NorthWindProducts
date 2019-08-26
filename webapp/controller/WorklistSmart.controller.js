sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"test/testNorthProducts/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/routing/History",
		"test/testNorthProducts/model/formatter",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator"
	], function (Controller, BaseController, JSONModel, History, formatter, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("test.testNorthProducts.controller.WorklistSmart", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf test.testNorthProducts.view.WorklistSmart
		 */
		onInit: function () {
				 var oModel = sap.ui.getCore().getModel();
				 this.getView().setModel(oModel);

		},
	onNavBack: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("worklist", true);
			
			return; 
				this.getOwnerComponent().getRouter().getTargets().display("TargetView1", {
			});
			return; 
			
			this.getOwnerComponent().getRouter().navTo("TargetView1", { }, true); //duplicated ID? 
			//history.go(-1);
			return;
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Otherwise we go backwards with a forward history
				var bReplace = true;
				//this.getRouter().navTo("master", {}, bReplace);
				this.getOwnerComponent().getRouter().navTo("TargetView1", { }, bReplace);
			}
		}, 
		test: function(){
			debugger;
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf test.testNorthProducts.view.WorklistSmart
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf test.testNorthProducts.view.WorklistSmart
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf test.testNorthProducts.view.WorklistSmart
		 */
		//	onExit: function() {
		//
		//	}

	});

});