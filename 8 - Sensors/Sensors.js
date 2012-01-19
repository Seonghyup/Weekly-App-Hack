enyo.kind({
	name: "Sensors",
	kind: enyo.VFlexBox,
	components: [
		{kind: "Header", content: "Enyo Sensors"},
		{kind: "HFlexBox", components:[
			{kind: "Image", name: "myImage"},
			{kind: "HtmlContent", name:"resultWindow", content: "Gamma=0 Beta=0 Alpha=0" }
		]}
 	],
	create: function() {
		this.inherited(arguments);

		enyo.setAllowedOrientation('left');
		this.$.myImage.setSrc("images/touchpad.jpg");

		window.addEventListener("deviceorientation", enyo.bind(this,"onSensorData"), true);
		//window.addEventListener("devicemotion", enyo.bind(this,"onSensorData"), true);
	},
    onSensorData : function(event) {

    	// gamma is the left-to-right tilt in degrees, where right is positive
    	var tiltLR = event.gamma;

    	// beta is the front-to-back tilt in degrees, where front is positive
    	var tiltFB = event.beta;

    	// alpha is the compass direction the device is facing in degrees
    	var dir = event.alpha

    	// when using the devicemotion event, try these values:
    	// event.acceleration.x/y/z
    	// event.accelerationIncludingGravity.x/y/z

		var rotation = "rotate(" + dir + "deg) rotate3d(1,0,0, " + (tiltFB * -1) + "deg)";

		this.$.myImage.applyStyle('-webkit-transform',rotation);

		var res="Gamma="+Math.round(tiltLR)+" Beta="+Math.round(tiltFB)+" Alpha="+Math.round(dir);
		this.$.resultWindow.setContent(res);
        
    }
});