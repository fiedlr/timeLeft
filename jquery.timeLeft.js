/* timeLeft v0.9.1 <github.com/fiedlr/timeLeft> | (c) 2015 Adam Fiedler | Released under MIT License <opensource.org/licenses/MIT> */
$.widget('tml.timeLeft', {

	// Inner attributes	
	clock: null, till: null, wanted: {},
	
	// Options
	options: {
		till: 'January 19, 2038 03:14:07',
		format: '%Y years %M months %W weeks %D days %h hours %m minutes %s seconds remain...',
		refreshInterval: 1000,
		complete: function () {
			alert('It\'s time!');
		}	
	},
	
	_create: function () {
		
		// Setup
		this.till 	= new Date(this.options.till);
		this.wanted = {
			years: 		this.options.format.search('%Y'),
			months:		this.options.format.search('%M'),
			weeks: 		this.options.format.search('%W'),
			days: 		this.options.format.search('%D'),
			hours: 		this.options.format.search('%h'),
			minutes: 	this.options.format.search('%m'),
			seconds:	this.options.format.search('%s')
		};	
				
		// Sets an interval
		if (this.refresh() !== false)
		this.clock = setInterval(this.refresh.bind(this), this.options.refreshInterval);
					
	},
		
	refresh: function () {
		var 	now 		= 	new Date(),
				distance 	= 	(this.till.getTime() - now.getTime()) / 1000 / 60 / 60 / 24, // set days as a base (least diff bothways)
				content 	= 	this.options.format,
				result 		= 	this;
			
		if (distance > 0) {
				
			if (this.wanted.years != -1) {
				var years = Math.floor(distance / 365.25); // needs a fix for the leap year
				content = content.replace('%Y', years);
				distance -= years * 365.25;						
			}
				
			if (this.wanted.months != -1) {
				var months = Math.floor(distance / 30.4375); // needs a fix for the leap year
				content = content.replace('%M', months);
				distance -= months * 30.4375;						
			}
			
			if (this.wanted.weeks != -1) {
				var weeks = Math.floor(distance / 7);
				content = content.replace('%W', weeks);
				distance -= weeks * 7;							
			}
				
			if (this.wanted.days != -1) {
				var days = Math.floor(distance);
				content = content.replace('%D', days);
				distance -= days;
			}
				
			if (this.wanted.hours != -1) {
				var hours = Math.floor(distance * 24);
				content = content.replace('%h', hours);
				distance -= hours / 24;						
			}
				
			if (this.wanted.minutes != -1) {
				var minutes = Math.floor(distance * 24 * 60);
				content = content.replace('%m', minutes);
				distance -= minutes / 24 / 60;				
			}
			
			if (this.wanted.seconds != -1) {
				var seconds = Math.floor(distance * 24 * 60 * 60);
				content = content.replace('%s', seconds);	
			}

			this.element.html(content);
				
		} else {
			
			// Stops the clock
			this._destroy();
			this.options.complete();
			
			// Prevents a double-reaction
			result = false;
				
		}

		return result;
		
	},
		
	_destroy: function () {
			
		if (this.clock != null)
		clearInterval(this.clock);
			
		this.element.html('');
			
	}
	
});