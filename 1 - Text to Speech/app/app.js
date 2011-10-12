/* Text to speech test */

enyo.kind({
	name: "TTSTest",
	kind: "VFlexBox",
	components: [
		{
		    kind: enyo.Hybrid, 
		    name: "plugin", 
		    width: 0, 
		    height: 0, 
		    executable: "sdltts", 
		    takeKeyboardFocus: false, 
		    onPluginReady: "handlePluginReady"
		},
		{ 
		    name: "input", 
		    kind: enyo.Input, 
		    value:"I'm sorry Dave. I'm afraid I can't do that." 
		},
		{
		    kind: enyo.Button,
		    onclick: "handleClick",
		    caption: "Say something",		    
		}
	],
	pluginReady: false,
	
	create: function() {
		this.inherited(arguments);
		console.log("in create");		
	},
	handleClick: function(inSender) {
	    console.log("clicked");
	    if(this.pluginReady) {
	        var text = this.$.input.getValue();
	        console.log("saying text: " + text);
	        var status = this.$.plugin.callPluginMethod("playAudio",text);
	        console.log("status = " + status);
		}
	},
	handlePluginReady: function(inSender) {
		console.log("plugin initialized");
		this.pluginReady = true;
	},
	
});
