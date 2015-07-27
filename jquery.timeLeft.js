/* timeLeft v0.9.0 <github.com/fiedlr/timeLeft> | (c) 2015 Adam Fiedler | Released under MIT License <opensource.org/licenses/MIT> */
;(function ($) {
	
	// Inner attributes	
	var th, till, wanted = {}, clock = null;
	
	// Options
	var opts = {},
		defaults = {
			till: 'January 19, 2038 03:14:07',
			format: '%Y years %M months %W weeks %D days %h hours %m minutes %s seconds remain...',
			refreshInterval: 1000,
			complete: function () {
				alert('It\'s time!');
			}	
		};
		
	// Methods	
	var methods = {
			
			init: function (options) {
				
				// Setup
				$.extend(opts, defaults, options);
				th = this,
				till 	= new Date(opts.till),
				wanted = {
					years: 		opts.format.search('%Y'),
					months:		opts.format.search('%M'),
					weeks: 		opts.format.search('%W'),
					days: 		opts.format.search('%D'),
					hours: 		opts.format.search('%h'),
					minutes: 	opts.format.search('%m'),
					seconds:	opts.format.search('%s')
				};	
				
				// Set an interval
				if (methods.refresh() !== false)
				clock = setInterval(function () { return th.timeLeft('refresh'); }, opts.refreshInterval);
				
				return th;
					
			},
			
			refresh: function () {
				var now 	= new Date(),
						distance = (till.getTime() - now.getTime()) / 1000 / 60 / 60 / 24, // set days as a base (least diff bothways)
						content = opts.format,
						result = th;
				
				if (distance > 0) {
					
					if (wanted.years != -1) {
						var years = Math.floor(distance / 365.25); // needs a fix for a leap year
						content = content.replace('%Y', years);
						distance -= years * 365.25;						
					}
					
					if (wanted.months != -1) {
						var months = Math.floor(distance / 30.4375); // needs a fix for a leap year
						content = content.replace('%M', months);
						distance -= months * 30.4375;						
					}
					
					if (wanted.weeks != -1) {
						var weeks = Math.floor(distance / 7);
						content = content.replace('%W', weeks);
						distance -= weeks * 7;							
					}
					
					if (wanted.days != -1) {
						var days = Math.floor(distance);
						content = content.replace('%D', days);
						distance -= days;
					}
					
					if (wanted.hours != -1) {
						var hours = Math.floor(distance * 24);
						content = content.replace('%h', hours);
						distance -= hours / 24;						
					}
					
					if (wanted.minutes != -1) {
						var minutes = Math.floor(distance * 24 * 60);
						content = content.replace('%m', minutes);
						distance -= minutes / 24 / 60;				
					}
					
					if (wanted.seconds != -1) {
						var seconds = Math.floor(distance * 24 * 60 * 60);
						content = content.replace('%s', seconds);	
					}
					
					// Show up
					$(th).html(content);
					
				} else {
					
					// Stop the clock
					th.stop();
					
					// React to the stop
					opts.complete(); 
					
					// Prevent double-react after finish
					result = false;
					
				}
				
				return result;
				
			},
			
			destroy: function () {
				
				if (clock != null) // Check if there actually is something to stop
				clearInterval(clock);
				
				$(th).html('');
				
			}
			
			
	};
		
	// Access
	$.fn.timeLeft = function (options) {
		
		if (methods[options]) {
			// Calling a method
			return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof options === 'object' || !options) {
			// Constructor
			return methods.init.apply(this, arguments);
		} else {
			// Error
			$.error(options + ' needs to be an object or a method.');
		}    		
		
	}
	
}(jQuery));