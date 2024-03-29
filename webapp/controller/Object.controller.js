/*global location*/
sap.ui.define([
		"test/testNorthProducts/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/routing/History",
		"test/testNorthProducts/model/formatter", 
		'sap/m/MessageToast'
	], function (
		BaseController,
		JSONModel,
		History,
		formatter, 
		MessageToast
	) {
		"use strict";

		return BaseController.extend("test.testNorthProducts.controller.Object", {

			formatter: formatter,

			/* =========================================================== */
			/* lifecycle methods                                           */
			/* =========================================================== */

			/**
			 * Called when the worklist controller is instantiated.
			 * @public
			 */
			onInit : function () {
				// Model used to manipulate control states. The chosen values make sure,
				// detail page is busy indication immediately so there is no break in
				// between the busy indication for loading the view's meta data
				var iOriginalBusyDelay,
					oViewModel = new JSONModel({
						busy : true,
						delay : 0
					});

				this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);

				// Store original busy indicator delay, so it can be restored later on
				iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();
				this.setModel(oViewModel, "objectView");
				this.getOwnerComponent().getModel().metadataLoaded().then(function () {
						// Restore original busy indicator delay for the object view
						oViewModel.setProperty("/delay", iOriginalBusyDelay);
					}
				);
				//history model:		
				this.historyModelCreation();
				//Process Flow: 
				this.processFlowModelCreation();

			},
			historyModelCreation: function(){
				// HISTORY TABLE
				var histJSONData = {
					history: [{
						version: "1.0",
						validto: "31.12.9999",
						validfrom: "01.01.2015",
						respbuyer: " David",
						cwh: "DEU, ESP, PAR",
						approvers: "davisss ",
						dateCreation: "01.01.2015"
					}, {
						version: "2.0",
						validto: "31.12.9999",
						validfrom: "01.01.2018",
						respbuyer: " David",
						cwh: "DEU, ESP, PAR",
						approvers: "davisss ",
						dateCreation: "01.01.2018"
					}]
				};
				this.getView().setModel(new JSONModel(histJSONData), "hist");
			},
			
			processFlowModelCreation: function(){
				// json: 
				//{"nodes":[{"id":"1","lane":"0","title":"SalesOrder1","titleAbbreviation":"SO1","children":[2],"state":"Positive","stateText":"OKstatus","focused":true,"texts":["SalesOrderDocumentOverduelongtextforwrappingupallaspects","Notcleared"]},
						// {"id":"2","lane":"0","title":"SalesOrder2","titleAbbreviation":"SO1","children":[21],"state":"Positive","stateText":"OKstatus","focused":true,"texts":["SalesOrderDocumentOverduelongtextforwrappingupallaspects","Notcleared"]},
						// {"id":"21","lane":"2","title":"InvoicePlanned","titleAbbreviation":"IP","children":null,"state":"Planned","stateText":null,"focused":false,"texts":null}],
				// "lanes":[{"id":"0","icon":"sap-icon://order-status","label":"InOrder","position":0},
							//{"id":"1","icon":"sap-icon://monitor-payments","label":"InDelivery","position":1},
							//{"id":"2","icon":"sap-icon://payment-approval","label":"InInvoice","position":2}]}
			
				
				var data1 = {
					lanes:[ 
							{id:"0", icon:"sap-icon://share-2",				label:"Published \n -- test 1234567890_1234567890",			 position:0},
							{id:"1", icon:"sap-icon://employee-approvals",	label:"Aprobed",			 position:1},
							{id:"2", icon:"sap-icon://process",				label:"QUAL Implementation", position:2},
							{id:"3", icon:"sap-icon://approvals",			label:"PROD Implementation", position:3}
						],
					nodes: [	
							{id:"0",lane:"0",title:"Published",    titleAbbreviation:"KPM", children:[1], state:"Positive",    stateText:"David Vela -- 24.08.2019", focused:true, texts:["David Vela","24.08.2019"]},
							{id:"1",lane:"1",title:"ZBM Approval", titleAbbreviation:"ZBM", children:[2], state:"Positive",    stateText:"OKstatus", focused:true, 	texts:["Rejected by David 24.08","Approved by David 25.08 "]},
							{id:"2",lane:"2",title:"PCQ Imp",	   titleAbbreviation:"PCQ", children:[3], state:"Positive",    stateText:"OKstatus", focused:true, 	texts:["OK"]},
							{id:"3",lane:"3",title:"PCP Imp",	   titleAbbreviation:"PCP", children:[],  state:"Neutral",     stateText:"Neutral",  focused:true, 	texts:["Comment1","Comment2"]}
						] 	
				};
								
				var data2 = {
					lanes:[ 
							{id:"0", icon:"sap-icon://share-2",				label:"Published ",			 position:0},
							{id:"1", icon:"sap-icon://employee-approvals",	label:"Aprobed",			 position:1},
							{id:"2", icon:"sap-icon://process",				label:"QUAL Implementation", position:2},
							{id:"3", icon:"sap-icon://approvals",			label:"PROD Implementation", position:3}
						],
					nodes: [	
							{id:"0",lane:"0",title:"Published",    titleAbbreviation:"KPM", children:[1], state:"Positive",     stateText:"David Vela -- 24.08.2019", focused:true, texts:["David Vela","24.08.2019"]},
							{id:"1",lane:"1",title:"ZBM Approval", titleAbbreviation:"ZBM", children:[2,4], state:"Negative", 	stateText:"Rejected", focused:true, 	texts:["Rejected 25.08","Comment2"]},
							
							{id:"2",lane:"0",title:"Published",    titleAbbreviation:"KPM", children:[3], state:"Positive",     stateText:"David Vela -- 24.08.2019", focused:true, texts:["David Vela","26.08.2019"]},
							{id:"3",lane:"1",title:"ZBM Approval", titleAbbreviation:"ZBM", children:[4], state:"Positive", 	stateText:"OKstatus", focused:true, 	texts:["Approved 26.08","Comment2"]},
							
							{id:"4",lane:"2",title:"PCQ Imp",	   titleAbbreviation:"PCQ", children:[5], state:"Positive",     stateText:"Positive", focused:true, 	texts:["Approved after changes "]},
							{id:"5",lane:"3",title:"PCP Imp",	   titleAbbreviation:"PCP", children:[],  state:"Planned",      stateText:"Neutral",  focused:true, 	texts:["Comment1","Comment2"]}
						] 	
				};
				
				var data3 = {
					lanes:[ 
							{id:"0", icon:"sap-icon://share-2",				label:"KPL Published ",			 position:0},
							{id:"1", icon:"sap-icon://employee-approvals",	label:"ZBM Approval",			 position:1},
							{id:"2", icon:"sap-icon://share-2",				label:"KPL Published `",			 position:2},
							{id:"3", icon:"sap-icon://employee-approvals",	label:"ZBM Approval",			 position:3},
							{id:"4", icon:"sap-icon://process",				label:"QUAL I`mplementation", position:4},
							{id:"5", icon:"sap-icon://approvals",			label:"PROD Implementation", position:5}
						],
					nodes: [	
							{id:"0",lane:"0",title:"A",  	titleAbbreviation:"KPM", children:[1], state:"Positive",     stateText:"David Vela -- 24.08.2019",	focused:true,	texts:["David Vela","24.08.2019"]},
							{id:"1",lane:"1",title:"b",		titleAbbreviation:"ZBM", children:[2], state:"Negative", 	 stateText:"David Vela -- 24.08.2019",	focused:true, 	texts:"Rejected 25.08" },
							{id:"2",lane:"2",title:"c",  	titleAbbreviation:"KPM", children:[3], state:"Positive",     stateText:"David Vela -- 25.08.2019",	focused:true,	texts:["David Vela","26.08.2019"]},
							{id:"3",lane:"3",title:"d",		titleAbbreviation:"ZBM", children:[4], state:"Positive", 	 stateText:"David Vela -- 26.08",		focused:true, 	texts:""},
							{id:"4",lane:"4",title:"e",		titleAbbreviation:"PCQ", children:[5], state:"Positive",     stateText:"David Vela -- 26.08",		focused:true, 	texts:["Approved after changes "]},
							{id:"5",lane:"5",title:"f",		titleAbbreviation:"PCP", children:[],  state:"Planned",      stateText:"David Vela -- ",			focused:true, 	texts:["Comment1","Comment2"]}
						] 	
				};
				var logic = function(){
						var dataBE = {
								table : [
											{ id: 0 , abbreviation: "KPM", state : "Positive", stateText:"David Vela -- 24.08.2019" } , // text? 
											{ id: 1 , abbreviation: "ZBM", state : "Positive", stateText:"David Vela -- 24.08.2019" } ,
											{ id: 2 , abbreviation: "PCQ", state : "Positive", stateText:"David Vela -- 24.08.2019" } ,
											{ id: 3 , abbreviation: "PCP", state : "Neutral",  stateText:"David Vela -- " } 
										]};
						var aNodes = []; var aLanes = []; 
						for(var i in dataBE.table){
							var row = dataBE.table[i]; 
							var oNode = {	id:  row.id,  
											lane: row.id, 
											title:"", 	
											titleAbbreviation:row.abbreviation,
											children:[ ], 
											state:row.state,     
											stateText:row.stateText,	
											focused:true , 
											texts:[]
										};
											
							var oLane = {   id:row.id,					
											icon:"",				
											label:"",			 
											position:row.id,};
											
							switch (row.abbreviation) {
								case "KPM": oLane.icon = "sap-icon://share-2"; oLane.label ="KPL Publication"; oNode.children.push(row.id+1);	break;
								case "ZBM": oLane.icon = "sap-icon://employee-approvals"; oLane.label ="ZBM Approval"; 	oNode.children.push(row.id+1); break;
								case "PCQ": oLane.icon = "sap-icon://process"; oLane.label ="QUAL Implementation"; 	oNode.children.push(row.id+1); break;
								case "PCP": oLane.icon = "sap-icon://approvals"; oLane.label ="PROD Implementation"; 	break;
								default: continue; 
							}
							aNodes.push(oNode );
							aLanes.push(oLane );
							
						}
						return { lanes:aLanes, nodes : aNodes };
								
				};
				var data4 = logic(); 
				
				
				this.getView().setModel(new JSONModel(data4), "pflow");

			}, 
			
			
			

			/* =========================================================== */
			/* event handlers                                              */
			/* =========================================================== */

			/**
			 * Event handler when the share in JAM button has been clicked
			 * @public
			 */
			onShareInJamPress : function () {
				var oViewModel = this.getModel("objectView"),
					oShareDialog = sap.ui.getCore().createComponent({
						name: "sap.collaboration.components.fiori.sharing.dialog",
						settings: {
							object:{
								id: location.href,
								share: oViewModel.getProperty("/shareOnJamTitle")
							}
						}
					});
				oShareDialog.open();
			},


			/* =========================================================== */
			/* internal methods                                            */
			/* =========================================================== */

			/**
			 * Binds the view to the object path.
			 * @function
			 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
			 * @private
			 */
			_onObjectMatched : function (oEvent) {
				var sObjectId =  oEvent.getParameter("arguments").objectId;
				this.getModel().metadataLoaded().then( function() {
					var sObjectPath = this.getModel().createKey("Products", {
						ID :  sObjectId
					});
					this._bindView("/" + sObjectPath);
				}.bind(this));
			},

			/**
			 * Binds the view to the object path.
			 * @function
			 * @param {string} sObjectPath path to the object to be bound
			 * @private
			 */
			_bindView : function (sObjectPath) {
				var oViewModel = this.getModel("objectView"),
					oDataModel = this.getModel();

				this.getView().bindElement({
					path: sObjectPath,
					events: {
						change: this._onBindingChange.bind(this),
						dataRequested: function () {
							oDataModel.metadataLoaded().then(function () {
								// Busy indicator on view should only be set if metadata is loaded,
								// otherwise there may be two busy indications next to each other on the
								// screen. This happens because route matched handler already calls '_bindView'
								// while metadata is loaded.
								oViewModel.setProperty("/busy", true);
							});
						},
						dataReceived: function () {
							oViewModel.setProperty("/busy", false);
						}
					}
				});
			},

			_onBindingChange : function () {
				var oView = this.getView(),
					oViewModel = this.getModel("objectView"),
					oElementBinding = oView.getElementBinding();

				// No data for the binding
				if (!oElementBinding.getBoundContext()) {
					this.getRouter().getTargets().display("objectNotFound");
					return;
				}

				var oResourceBundle = this.getResourceBundle(),
					oObject = oView.getBindingContext().getObject(),
					sObjectId = oObject.ID,
					sObjectName = oObject.Name;

				oViewModel.setProperty("/busy", false);
				// Add the object page to the flp routing history
				this.addHistoryEntry({
					title: this.getResourceBundle().getText("objectTitle") + " - " + sObjectName,
					icon: "sap-icon://enter-more",
					intent: "#NorthwindProducts-display&/Products/" + sObjectId
				});

				oViewModel.setProperty("/saveAsTileTitle", oResourceBundle.getText("saveAsTileTitle", [sObjectName]));
				oViewModel.setProperty("/shareOnJamTitle", sObjectName);
				oViewModel.setProperty("/shareSendEmailSubject",
				oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
				oViewModel.setProperty("/shareSendEmailMessage",
				oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
			},
			_getColorByState: function (oItem) {
			switch (oItem.getState()) {
				case "Error" : return "red";
				case "Warning" : return "orange";
				case "Success" : return "green";
			}
		},
		itemPress: function (oEvent) {
			var oItem = oEvent.getSource(),
				aCustomData = oItem.getCustomData(),
				sTitle = aCustomData[0].getValue(),
				sIcon = aCustomData[1].getValue(),
				sSubTitle = aCustomData[2].getValue(),
				sDescription = aCustomData[3].getValue();

			var oPopover = new sap.m.Popover({
				contentWidth: "300px",
				title: "Order status",
				content: [
					new sap.m.HBox({
						items: [
							new sap.ui.core.Icon({
								src: sIcon,
								color: this._getColorByState(oItem)
							}).addStyleClass("sapUiSmallMarginBegin sapUiSmallMarginEnd"),
							new sap.m.FlexBox({
								width: "100%",
								renderType: "Bare",
								direction: "Column",
								items: [new sap.m.Title({
									level: sap.ui.core.TitleLevel.H1,
									text: sTitle
								}), new sap.m.Text({
									text: sSubTitle
								}).addStyleClass("sapUiSmallMarginBottom sapUiSmallMarginTop"),
									new sap.m.Text({
										text: sDescription
									})
								]
							})
						]
					}).addStyleClass("sapUiTinyMargin")
				],
				footer: [
					new sap.m.Toolbar({
						content: [
							new sap.m.ToolbarSpacer(),
							new sap.m.Button({
								text: "Close",
								press: function() {
									oPopover.close();
								}
							})]
					})
				]
			});

		oPopover.openBy(oEvent.getParameter("item"));
		}, 
				onOnError: function( event ) {
			MessageToast.show("Exception occurred: " + event.getParameters().text);
		},

		onNodePress: function(event) {
			MessageToast.show("Node " + event.getParameters().getNodeId() + " has been clicked.");
		},

		onZoomIn: function () {
			this.oProcessFlow.zoomIn();

			MessageToast.show("Zoom level changed to: " + this.oProcessFlow.getZoomLevel());
		},

		onZoomOut: function () {
			this.oProcessFlow.zoomOut();

			MessageToast.show("Zoom level changed to: " + this.oProcessFlow.getZoomLevel());
		}

		});

	}
);