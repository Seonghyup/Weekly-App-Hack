// DemoPopup.js - application popup for PopupDemo

enyo.kind({
	name: "DemoPopup",
	kind: "VFlexBox",
	pack: "justify",
	align: "justify",
	events: {
		onTap: ""
	},
	components: [
		{name: "sampleControl", content: "Replace this Control with Controls that do something useful!"},
		{kind: "ApplicationEvents", onKeypress: "keyTyped", onKeydown: "keyTyped", onLoad: "loaded", onKeyboardShown: "keyTyped"},
		{name: "displayStatus", kind: "PalmService", service: "palm://com.palm.display/", method: "status", onSuccess: "displayStatusSuccess", onFailure: "displayStatusFail", subscribe: true}
	],
	create: function () {
		this.inherited(arguments);
		this.log("enyo.windowParams: ", enyo.windowParams);
		this.$.displayStatus.call();
	},
	loaded: function (inSender, inFoo) {
		this.log("foo: ", inFoo);
	},
	closePopup: function (inSender, inEvent) {
		this.log("");
		window.close();
	},
	displayStatusSuccess: function (inSender, inResponse) {
		this.log("response:", inResponse);
		if (inResponse.event === "displayOff" || inResponse.dockMode === true)
			window.close();
	},
	displayStatusFail: function (inSender, inResponse) {
		this.error("response:", inResponse);
	}
});
