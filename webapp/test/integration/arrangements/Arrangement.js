sap.ui.define([
	"sap/ui/test/Opa5"
], function(Opa5) {
	"use strict";

	function getFrameUrl (sHash, sUrlParameters) {
		var sUrl = jQuery.sap.getResourcePath("test/testNorthProducts/test/flpSandboxMockServer.html");

		sUrlParameters = sUrlParameters ? "?" + sUrlParameters : "";

		if (sHash) {
			sHash = "#NorthwindProducts-display&/" + (sHash.indexOf("/") === 0 ? sHash.substring(1) : sHash);
		} else {
			sHash = "#NorthwindProducts-display";
		}

		return sUrl + sUrlParameters + sHash;
	}

	return Opa5.extend("test.testNorthProducts.test.integration.arrangements.Arrangement", {

		iStartMyApp: function (oOptions) {
			var sUrlParameters;
			oOptions = oOptions || {};

			// Start the app with a minimal delay to make tests run fast but still async to discover basic timing issues
			var iDelay = oOptions.delay || 50;

			sUrlParameters = "serverDelay=" + iDelay;

			this.iStartMyAppInAFrame(getFrameUrl(oOptions.hash, sUrlParameters));
		},

		iStartMyAppOnADesktopToTestErrorHandler: function (sParam) {
			this.iStartMyAppInAFrame(getFrameUrl("", sParam));
		},

		iRestartTheAppWithTheRememberedItem : function (oOptions) {
			var sObjectId;
			this.waitFor({
				success : function () {
					sObjectId = this.getContext().currentItem.id;
				}
			});

			return this.waitFor({
				success : function() {
					oOptions.hash = "/Products/" + encodeURIComponent(sObjectId);
					this.iStartMyApp(oOptions);
				}
			});
		}

	});

});