(function() {
  var $, Logger;

  $ = jQuery;

  Logger = {
    settings: {
      active: true,
      backtrace: false,
      group: true,
      collapsed: false,
      log_level: 'debug'
    },
    levels: {
      info: 0,
      debug: 1,
      warn: 2,
      error: 3
    },
    log: function(options, log_level, obj) {
      var collection, write_to_console, _l, _s;
      _s = Logger.settings;
      _l = Logger.levels;
      if (!window.console || !_s.active || (_l[log_level] < _l[_s.log_level]) || !window.console[log_level]) {
        return;
      }
      write_to_console = function(msg, level, obj) {
        switch (level) {
          case 'info':
            return console.info("%s: %o", msg, obj);
          case 'debug':
            return console.debug("%s: %o", msg, obj);
          case 'warn':
            return console.warn("%s: %o", msg, obj);
          case 'error':
            return console.error("%s: %o", msg, obj);
          case 'log':
            return console.log("%s: %o", msg, obj);
        }
      };
      if (_s.group) {
        if (_s.collapsed) {
          console.groupCollapsed('Console log for: "' + obj.selector + '"');
        } else {
          console.group('Console log for: "' + obj.selector + '"');
        }
      }
      collection = obj.each(function() {
        switch (typeof options) {
          case 'string':
            return write_to_console(options, log_level, this);
          case 'function':
            return write_to_console(options(this, log_level, this));
          case 'object':
            return $.extend(_s, options);
          case 'boolean':
            return _s.active = options;
        }
      });
      if (_s.group) console.groupEnd();
      if (_s.backtrace) console.trace();
      return collection;
    }
  };

  $.log = function(options) {
    var log_level, _s;
    try {
      _s = Logger.settings;
      if (typeof arguments[1] !== 'string') log_level = 'debug';
      switch (typeof options) {
        case 'string':
          return Logger.log(options, log_level, $(document));
        case 'function':
          return Logger.log(options(), log_level, $(document));
        case 'object':
          return $.extend(_s, options);
        case 'boolean':
          return _s.active = options;
        default:
          return Logger.log('Unsupported parameter passed to logger');
      }
    } catch (err) {
      return $.error('Logger had the following error: ' + err.toString());
    }
  };

  $.fn.log = function(msg, log_level, scope) {
    try {
      Logger.log(msg, log_level, scope || this);
    } catch (err) {
      $.error('Logger had the following error: ' + err.toString());
    }
    return this;
  };

}).call(this);
