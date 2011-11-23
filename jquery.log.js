/**
 * jquery.log.js
 * 
 * @version 0.2.1
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
		
		/**
		 * Log level conversion
		 */
		levels : {
			'info'  : 0,
			'debug' : 1,
			'warn'  : 2,
			'error' : 3
		},
	
		/**
		 * initialized the plugin and logs the message
		 * 
		 * @param {Mixed} options : hash of configuration options or a String which is the messages
		 * @param {String} log_level : of this message only
		 * @param {Object} obj : associated jQuery object
		 * @return void
		 */
		log: function( options, log_level, obj ) {
			
			var _s = Logger.settings;
			
			function write_to_console( msg, level, obj ){
				if( _s.active ){
					
					if( _s.windows_safe ){
						alert( msg );
						return;
					}
					
					if ( Logger.levels[level] <= Logger.levels[_s.log_level] ) {
						switch( level ){
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
			
			if( !_s.windows_safe ){
				if( _s.collapsed ){
					console.groupCollapsed('Console log for: "'+ obj.selector+'"');
				} else {
					console.group('Console log for: "'+ obj.selector+'"');
				}
			}
			
			collection = obj.each(function(){
				switch( typeof options ){
					case 'string':
						write_to_console( options, log_level, this);
						break
				  case 'function':
				  	write_to_console( options( this ), log_level, this);
				  	break
				  case 'object':
				  	$.extend( _s, options );
				  	break
				  case 'boolean':
				  	_s.active = options;
				  	break
				  default:
				  	$.error('Unsupported parameter passed to logger');
				};
			});
			
			if( _s.windows_safe ) console.groupEnd();
			if( _s.backtrace )    console.trace();
			
			return collection;
  	} // EOF Logger.init
  }; // EOF Logger
  
  /**
   * Shorthand logging method
   * 
   * @param {Mixed} options : mixed use
   * @return void
   */
  $.log = function( options ){
  	try {
  		var _s = Logger.settings;
  		
	  	if( typeof arguments[1] != 'string' ) log_level = 'info';
	  			
			switch( typeof options ){
				case 'string':
					Logger.log( options, log_level, $(document) );
					break
			  case 'function':
			  	Logger.log( options(), log_level, $(document) );
			  	break
			  case 'object':
			  	$.extend( _s, options );
			  	break
			  case 'boolean':
			  	_s.active = options;
			  	break
			  default:
			  	$.error('Unsupported parameter passed to logger');
			};
		} catch(err) {
			console.log('Logger had the following error: '+ err.toString());
		}
	};
	
	/**
	 * Initiates the chain-ability of the plugin
	 * 
	 * @param {Mixed} msg : string log message OR callback to initiate to make a log entry
	 * @param {String} log_level : string representing the log_level
	 * @return {jQuery} passthru of the original object
	 */
	$.fn.log = function( msg, log_level, scope ){
		try {	
			Logger.log( msg, log_level, scope || this);
		} catch(err) {
			console.log('Logger had the following error: '+ err.toString());
		}
		return this;
	}
  
})( jQuery );