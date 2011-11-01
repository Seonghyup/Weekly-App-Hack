// Main.js - main card for PopupDemo

enyo.kind({
	name: "KeySymbol",
	kind: "Control",
	className: "keySymbol"
});


enyo.kind({
	name: "Main",
	kind: enyo.VFlexBox,
	components: [
		{kind: "ApplicationEvents", /*onWindowParamsChange: "handleWindowParams",*/ onWindowActivated: "wakeup"},
		{kind: "PageHeader", components: [
			{content: "PopupDemo"}
		]},
		{kind: "HFlexBox", flex: 1, pack: "justify", align: "justify", components: [
			{flex: 1, kind: "Pane", components: [
				{flex: 1, kind: "Scroller", components: [
					{style: "margin: 10px;", components: [
						{className: "subhead", content: "Popup"},
						{content: "<br />To close popup, press the Center button. (Pressing the Center button again takes you to card mode.)"},

						{className: "subhead", content: "<br />Card"},
						{content: "You can toss this card away, but don't swipe the dashboard notification away."},

						{className: "subhead", content: "<br />Miscellaneous"},
						{content: "You must close the popup to display dashboard notifications or allow USB-mode."}
					]}
				]}
			]}, 
			{kind: "Pane", style: "width: 350px;", components: [
				{style: "margin: 10px;", components: [
					{className: "subhead", content: "Dashboard"},
					{content: "To open popup, while any app is running: <ol><li>swipe down on notification area&nbsp;\u2191</li><li>tap on <strong>Pop Up popup</strong></li><ol>"},
				]}
			]}
		]},
		{kind: "AppMenu", automatic: true, components: [
			{caption: enyo._$L("Help"), onclick: "showHelp"}
		]},
		{kind: "HelpDialog"}
	],
	create: function () {
		this.inherited(arguments);
		if (enyo.application.result === undefined) {
			enyo.application.result = 0;
		}
	},
//	handleWindowParams: function () {
//		this.log("windowParams: ", enyo.windowParams);
//	},
	wakeup: function () {
		this.log("woken");
		// If HP enables clickableWhenLocked for popups, set it to true for the dashboard, to allow lock-screen useage. 
		enyo.windows.openDashboard("shimDashboard/shimDashboard.html", "shimDashboard", {paramFoo: "bar"}, {/*clickableWhenLocked: true*/});
		enyo.windows.openPopup("popup/demoPopup.html", "demoPopup", {param1: "opened from main card wakeup"}, {clickableWhenLocked: true}, 200, false);
	},
	showHelp: function () {
		this.$.helpDialog.open();
	}
});
