marfeel.ChartModel = {
	getDevicesData: function(callback) {
		//simulated data
		//this should be given by a backend service	
		var data = [{
			statName: 'Revenue',
			value: 200000,
			history: [1,2,8,12,10,12,13,14,13,16,17,15,16,12,16,17,15,16,11],
			details: [{
					deviceName: 'Smartphone',
					value: 80000
				},{
					deviceName: 'Tablet',
					value: 120000
				}]
		},{
			statName: 'Impressions',
			value: 50000000,
			history: [1,2,8,12,10,12,13,14,13,16,17,15,16,12,16,17,15,16,16,15,14,17,16,12,13,14,13,16,17,15,16,12,16,17,15,16,11],
			details: [{
					deviceName: 'Smartphone',
					value: 30000000
				},{
					deviceName: 'Tablet',
					value: 20000000
				}]
		},
		{
			statName: 'Visits',
			value: 600000000,
			history: [1,2,8,12,10,12,13,14,13,16,17,15,16,12,16,17,15,16,11],
			details: [{
					deviceName: 'Smartphone',
					value: 120000000
				},{
					deviceName: 'Tablet',
					value: 480000000
				}]
		}];

		callback(data);
	}
};