// ShimDashboard.js - custom dashboard for PopupDemo

enyo.kind({
	name: "ShimDashboard",
	kind: "HFlexBox",
	pack: "justify",
	align: "justify",
	style: "color: white; background-color: #333;",
	components: [
		{kind: "ApplicationEvents", onWindowActivated: "wakeup", onWindowParamsChange: "handleWindowParams", onUnload: "closingDashboard", onApplicationRelaunch: "relaunch"},
		{kind: "VFlexBox", pack: "center", align: "center", onclick: "openPopup", components: [
			{kind: "Button", caption: $L("Pop Up Popup")}
		]},
		{kind: "VFlexBox", flex: 1, pack: "center", align: "justify", /*onclick: "copyToClipboard",*/ components: [
			{name: "textField", kind: "RichText", flex: 1, className: "textField", value: "apple", onchange: "textChange"}
		]}
	],
	create: function () {
		this.inherited(arguments);
		this.log("windowParams: ", enyo.windowParams);
	},
	wakeup: function () {
		this.log("woken");
//		this.$.resultDisplay.setContent(enyo.application.result.toPrecision(10).replace(/\.0*$|0+$/, ""));
	},
	handleWindowParams: function () {
		this.log("windowParams: ", enyo.windowParams);
	},
	openPopup: function (inEvent) {
		enyo.windows.openPopup("../popup/demoPopup.html", "demoPopup", {param1: "opened from dashboard tap"}, {clickableWhenLocked: true}, 200, false);
	},
	closingDashboard: function () {
		this.log("closing dashboard");
		enyo.windows.addBannerMessage($L("launch PopupDemo to re-open dashboard"), JSON.stringify({}));
//		enyo.nextTick(this, function () {
//			console.log("nextTick");
//			enyo.windows.addBannerMessage($L("launch PopupDemo to open dashboard"), JSON.stringify({}));
//		});
	},
	relaunch: function () {
		this.log("windowParams: ", enyo.windowParams);
		enyo.windows.activate("../index.html", "mainCard", {sender: "relaunch aided by dashboard"});
	}
});
