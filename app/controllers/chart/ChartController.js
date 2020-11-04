marfeel.ChartController = {
	init: function(){
		var t = this;
		marfeel.ChartModel.getDevicesData(function(data) {
			var colors = { 
				Revenue : ['#55d321', '#006400'],
				Impressions: ['#09c5df', '#004f65'],
				Visits: ['#d55710', '#fdc308']
			};

			for(var i = 0; i < data.length; i++) {
				var name = data.statName;
				var color = colors[name];
				var currentData = data[i];
				t.generateMiniDashboard('chart-container', currentData, colors);
			};
		});
		
		console.log('init chartcontroller');	
	},

	generateMiniDashboard: function(targetEl, data, colors) {
		var containerEl = document.getElementById(targetEl);
		var wrapper = document.createElement('div');
		wrapper.setAttribute('class', 'chart-wrapper');
		containerEl.appendChild(wrapper);

		var width = wrapper.offsetWidth;
		var height = wrapper.offsetHeight;
		var padding = wrapper.offsetHeight * 0.05;

		/** DONUT CHART **/
		var radius = Math.min(width, height) / 3;
		var outerRadius = radius - radius * 0.07;
		var innerRadius = radius - radius * 0.14;
		var archWidth =  radius * 0.14 -radius * 0.07; 

		var color1 = colors[data.statName][0];
		var color2 = colors[data.statName][1];
		var color = d3.scale.ordinal()
		    .range([color1, color2]);

		var arc = d3.svg.arc()
		    .outerRadius(outerRadius)
		    .innerRadius(innerRadius);

		var pie = d3.layout.pie()
		    .sort(null)
		    .value(function(d) { return d.value; });

		var svg = d3.select(wrapper)
			.append('svg')
			.attr('id', data.statName)
		    .attr('width', width)
		    .attr('height', height)
		  	.append('g')
		    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		var g = svg.selectAll('.arc')
		      .data(pie(data.details))
		    .enter().append('g')
		      .attr('class', 'arc');

		  g.append('path')
		      .attr('d', arc)
		      .style('fill', function(d) { return color(d.value); });

		//text

		var total = data.value;

		g.append('text')
	      .text(function(d) { 
	      	var percentage = marfeel.ChartController.getPercentage(total, d.value) + '%';
	      	return percentage + ' ' + d.value; 
	      })
	      .attr('transform', function(d,i) {
	      	var bbox = this.getBBox();
            var textwidth = bbox.width;
	      	var x = (i==0) ? width/2 - textwidth - padding : -width/2 + padding;
	      	return 'translate(' + x + ' , ' + (radius + 20)+ ')'; 
	      })
	      .attr('dy', '.35em');

	    g.append('text')
	      .text(function(d) { return d.data.deviceName; })
	      .attr('font-weight','bold')
	      .attr('transform', function(d,i) {
	      	var bbox = this.getBBox();
            var textwidth = bbox.width;
	      	var x = (i==0) ? width/2 - textwidth - padding : -width/2 + padding;
	      	return 'translate(' + x + ' , ' + radius + ')'; 
	      })
	      .attr('dy', '.35em')
	      .attr('class','device-name')
	      .style('fill', function(d) { return color(d.value); });

	    /*CENTER CHART*/
	    //this part went a little bit out of hand, sorry.
	    var curveHeight = radius;
	    var scaleToHeight = d3.scale.linear().domain([d3.min(data.history), d3.max(data.history)]).range([curveHeight,0]);
	    
	    var area = d3.svg.area()					
			.x(function(d,i) { return outerRadius*2/data.history.length  * i - outerRadius + archWidth/2; })
			.y0(curveHeight)
			.y1(function(d) { return scaleToHeight(d); })
			.interpolate('cardinal');

		var valueline = d3.svg.line()
		    .x(function(d,i) { return outerRadius*2/data.history.length * i - outerRadius + archWidth/2 ; })
		    .y(function(d) { return scaleToHeight(d); })
		    .interpolate('cardinal');

		//overwrite svg to work with the other group
		var svg = d3.select('svg#'+data.statName)
			.append('g')
		    .attr('transform', 'translate(' + width/2 + ',' + height/2 + ')')
		    .attr('class','center-group');

	    //mask
	    svg.append('clipPath')       
			.attr('id', 'circle-clip')
			.append('ellipse')          
			.attr('cx', 0)       
			.attr('cy', 0)
			.attr('rx', innerRadius - radius * 0.06)
			.attr('ry', innerRadius - radius * 0.06)
			.attr('fill','red');

		//area
		//debugger;
	    svg.append('path')
	        .attr('d', valueline(data.history))
	        .attr('stroke', colors[data.statName][1])
	        .attr('stroke-width','4')
	        .attr('fill', 'none')
	        .attr('clip-path', 'url(#circle-clip)')
	        //.attr('transform','translate(' + width/2 + ', ' + height / 2+ ')');

	    //line
		svg.append('path')
		    .datum(data.history)
		    .attr('class', 'area')
		    .attr('d', area)
		    .attr('fill', colors[data.statName][0])
		    .attr('clip-path', 'url(#circle-clip)')
	        //.attr('transform','translate(' + width/2 + ', ' + height/2+ ')');

	},

	getPercentage: function(total, value) {
		return value * 100 / total;
	}
};
{
	window.addEventListener("load", function() {
		marfeel.ChartController.init(); 
	}, false);
}
