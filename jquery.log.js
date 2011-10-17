/**
 * jquery.log.js
 * 
 * @version 0.1.0
 * @author Adam Cuppy 
 * @copyright http://defineyouredge.com
 * 
 */ 

(function( $ ){
	
	var Logger = {
		
		settings: {
			
			// activate the logger
			active: true,
			
			// outputs console.trace() after the log has been written
			backtrace: false,
			
			// auto collapses console.log groups
			collapsed: false,
			
			// sets the default log level for console output
			//
			// available log levels:  info, debug, warn, error, log
			log_level: 'debug',
			
			// replaces console.log with alert popup
			windows_safe: false
		},
	
		// initialized the plugin and logs the message
		log: function( options, obj ) {
			
			// private writer
			//
			// @msg: string output to log
			// @obj: object to attach to the log
			function write_to_console( msg, obj ){
				if( Logger.settings.active ){
					
					if( Logger.settings.windows_safe ){
						alert( msg );
					} else {
						switch( Logger.settings.log_level ){
							case 'info':
								console.info("%s: %o", msg, obj);
								break
							case 'debug':
								console.debug("%s: %o", msg, obj);
								break
							case 'warn':
								console.warn("%s: %o", msg, obj);
								break
							case 'error':
								console.error("%s: %o", msg, obj);
								break
							case 'log':
							default:
								console.log("%s: %o", msg, obj);
								break
						}
					}
				}
			}
			
			if( Logger.settings.windows_safe ){
				if( Logger.settings.collapsed ){
					console.groupCollapsed('Console log for: "'+ obj.selector+'"');
				} else {
					console.group('Console log for: "'+ obj.selector+'"');
				}
			}
			
			collection = obj.each(function(){
				switch( typeof options ){
					case 'string':
						write_to_console( options, this);
						break
				  case 'function':
				  	write_to_console( options( this ), this);
				  	break
				  case 'object':
				  	$.extend( Logger.settings, options );
				  	break
				  case 'boolean':
				  	Logger.settings.active = options;
				  	break
				  default:
				  	$.error('Unsupported parameter passed to logger');
				};
			});
			
			if( Logger.settings.windows_safe ) console.groupEnd();
			if( Logger.settings.backtrace )    console.trace();
			
			return collection;
  	} // EOF Logger.init
  }; // EOF Logger
  
  // Simple log writer and Logger configuration setter
  //
  // @options mixed:
  //			string : Output directly to the console.log
  // 			function : Process a callback function to return a string to output to the console.log
  // 			object: Pass configuration parameters to Logger.settings for all future log messages
  //		 	boolean: Pass true/false to Logger.settings.active to activate/deactivate the logger
  //
  // @log_level string: 
  //		  Only works when options is a String or Callback function
  //			Set the log level for output of that instance
  //
  $.log = function( options, log_level ){
		switch( typeof options ){
			case 'string':
				if( typeof log_level == 'string') Logger.settings.log_level = log_level;
				Logger.log( options, $(document) );
				break
		  case 'function':
		  	if( typeof log_level == 'string') Logger.settings.log_level = log_level;
		  	Logger.log( options(), $(document) );
		  	break
		  case 'object':
		  	$.extend( Logger.settings, options );
		  	break
		  case 'boolean':
		  	Logger.settings.active = options;
		  	break
		  default:
		  	$.error('Unsupported parameter passed to logger');
		};
	};
	
	// Primary chainable jQuery constructor
	// 
	$.fn.log = function( msg, log_level ){
		if( typeof log_level == 'string') $.log({ log_level: log_level });		
		Logger.log( msg, this);
		return this;
	}
  
})( jQuery );