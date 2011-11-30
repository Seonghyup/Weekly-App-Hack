/* Copyright 2009-2011 Hewlett-Packard Development Company, L.P. All rights reserved. */
enyo.kind({
    name: "enyo.Canon.MapAppHack",
    kind: enyo.VFlexBox,
    components: [
	{name: "getData", kind: "WebService", onSuccess: "gotData", onFailure: "gotDataFailure"},
	{
		name: "myMap",
		kind: "Map",
		flex: 1,
		credentials: "Ai19r1nQvo9kGPNf8t5RstX0TNTKj2mShzKYWAfhiSBuV9iTWbjQYYW5hQD4v_ap"
	},
	{ name: "getremotedata", flex: 0,kind: "Button", caption:"Get Data", onclick: "getremotedata"}
	],
	getremotedata: function(){		
			var url = "http://data.liquidr.com/erddap/tabledap/basic.json?latitude,longitude,time,id,tempSub,tempSurface,headingSub&id=%22Fontaine%20Maru%20(PCX_4)%22";
			console.log("url="+url);
			this.$.getData.setUrl(url);
			this.$.getData.call();
    },
	gotData: function(inSender, inResponse) {
		console.log("gotData");
		//console.log("result:"+enyo.json.stringify(inResponse.table.rows));
		
		var results = inResponse.table.rows;
		
		var inOptions = null;
		var locations = [];
		var old=0;
		
		//this.$.myMap.clearAll();
		
		for (var i = 0; i< results.length; i++) {
		  
			// let's use the date part of the timestamp to only display one entry per day
			var datepart=results[i][2].slice(0,10);
			datepart=datepart.replace(/-/g,"");

			if (datepart>old) {
		  
				var location = new Microsoft.Maps.Location(results[i][0], results[i][1]);
				locations.push(location)
				var pushpin = new Microsoft.Maps.Pushpin(location, inOptions);
			
				var infobox = new Microsoft.Maps.Infobox(location, {title: results[i][3],description: "Time:"+results[i][2]+"<br>Water Temp C:"+results[i][4]+"<br>Air Temp C:"+results[i][5]+"<br>Heading:"+results[i][6], visible:false, offset:new Microsoft.Maps.Point(0,35)});
		
				infobox.dataIndex = i;
				pushpin.infobox = infobox;
				this.$.myMap.map.entities.push(infobox);	
				this.$.myMap.map.entities.push(pushpin);
				Microsoft.Maps.Events.addHandler(pushpin, 'click', enyo.bind(this, "doPinOnclick"));
				Microsoft.Maps.Events.addHandler(infobox, 'click', enyo.bind(this, "doInfoboxOnclick"));
			
				old=datepart;
			
			}
			
		}
		var bestview = Microsoft.Maps.LocationRect.fromLocations(locations);
		this.$.myMap.map.setView({bounds:bestview });
		
	},
	gotDataFailure: function(inSender, inResponse) {
		console.log("gotDataFailure");
	},
	doPinOnclick: function(inSender) {
	var pin = inSender.target;
	if (pin)
	{
		var infobox = pin.infobox;
		if (infobox)
		{
  			infobox.setOptions({visible:true});
		}
	}
  },
  doInfoboxOnclick: function(inSender) {
	//console.log("dataIndex:"+inSender.target.dataIndex);
  
  var pin = inSender.target;
	if (pin)
	{
		var infobox = pin.infobox;
		if (infobox)
		{
	
		infobox.setOptions({ visible: false });
		}
	}
  }
});