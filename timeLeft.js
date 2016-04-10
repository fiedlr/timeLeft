/* timeLeft v0.7.1 <github.com/fiedlr/timeLeft> | (c) 2016 Adam Fiedler | @license <opensource.org/licenses/MIT> */
var timeLeft = function (date, format, area, reaction) {
	this.then = new Date(date);
	this.format = format;
	this.area = area;
	this.reaction = reaction;
	
	// Load the data
	this.refresh();
	
	// Set an interval
	this.clock = setInterval(this.refresh.bind(this), 1000);
};

// Things needed to be refreshed
timeLeft.prototype.refresh = function () {
	var now = new Date();
	var distance = (this.then.getTime() - now.getTime()) / 1000 / 60 / 60 / 24;
	var format = this.format;
	
	if (distance > 0) {
		// Years
		if (format.search('%Y') !== -1) {
			var years = Math.floor(distance / 365.25);
			format = format.replace('%Y', years);
			
			if (years > 0)
			distance -= years * 365.25;
		}
		
		// Months
		if (format.search('%M') !== -1) {
			var months = Math.floor(distance / 30.4375);
			format = format.replace('%M', months);
			
			if (months > 0)
			distance -= months * 30.4375;
		}
		
		// Weeks
		if (format.search('%W') !== -1) {
			var weeks = Math.floor(distance / 7);
			format = format.replace('%W', weeks);
			
			if (weeks > 0)
			distance -= weeks * 7;
		}
		
		// Days
		if (format.search('%D') !== -1) {
			var days = Math.floor(distance);
			format = format.replace('%D', days);
			
			if (days > 0)
			distance -= days;
		}
		
		// Hours
		if (format.search('%h') !== -1) {
			var hours = Math.floor(distance * 24);
			format = format.replace('%h', hours);
			
			if (hours > 0)
			distance -= hours / 24;
		}
		
		// Minutes
		if (format.search('%m') !== -1) {
			var minutes = Math.floor(distance * 24 * 60);
			format = format.replace('%m', minutes);
			
			if (minutes > 0)
			distance -= minutes / 24 / 60;
		}
		
		// Seconds
		if (format.search('%s') !== -1) {
			var seconds = Math.floor(distance * 24 * 60 * 60);
			format = format.replace('%s', seconds);
		}
	} else {
		// Stop the interval
		this.stop();
		
		// Clean the area
		format = '';
		
		// Execute the reaction
		this.reaction();
		
		// Null the reaction
		this.reaction = null;
	}
	
	if (!(typeof jQuery !== 'undefined' && !this.area.html(format))) { 
		// Show the change
		this.area.innerHTML = format;
	}
};

// In case you want to stop it :-)
timeLeft.prototype.stop = function () {
	clearInterval(this.clock);	
};