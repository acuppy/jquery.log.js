(function() {

  describe("$.log", function() {
    it("binds to the jQuery object", function() {
      return expect($.log).toBeDefined();
    });
    it("only activates if window.console exists", function() {
      spyOn(window, 'console').andReturn(void 0);
      $.log('message');
      return expect(window.console).not.toHaveBeenCalled();
    });
    it("only calls with a valid log_level", function() {
      spyOn(console, 'debug');
      $.log('message', 'foo');
      return expect(console.debug).not.toHaveBeenCalled();
    });
    it("only calls with a log_level greater than minimum threshold", function() {
      spyOn(console, 'debug');
      spyOn(console, 'warn');
      $.log({
        log_level: 'warn'
      });
      $.log('message', 'debug');
      expect(console.debug).not.toHaveBeenCalled();
      expect(console.warn).not.toHaveBeenCalled();
      return $.log({
        log_level: 'debug'
      });
    });
    describe("options", function() {
      beforeEach(function() {
        spyOn(console, 'info');
        spyOn(console, 'debug');
        spyOn(console, 'warn');
        spyOn(console, 'error');
        return spyOn(console, 'log');
      });
      return describe("when receiving a string", function() {
        it("should set the default log_level to debug", function() {
          $.log('here is my message');
          return expect(console.debug).toHaveBeenCalled();
        });
        it("should accept a function", function() {
          $.log(function() {
            return "here is my message";
          });
          return expect(console.debug).toHaveBeenCalled();
        });
        it("should extend the current settings if an object is passed in", function() {
          spyOn($, 'extend').andCallThrough();
          $.log({
            foo: "bar"
          });
          expect($.extend).toHaveBeenCalled();
          return expect(console.debug).not.toHaveBeenCalled();
        });
        return it("should set the active option if a boolean is passed in", function() {
          spyOn($, 'extend').andCallThrough();
          $.log(true);
          expect($.extend).not.toHaveBeenCalled();
          return expect(console.debug).not.toHaveBeenCalled();
        });
      });
    });
    return describe("settings", function() {
      beforeEach(function() {
        spyOn(console, 'group');
        spyOn(console, 'groupCollapsed');
        spyOn(console, 'groupEnd');
        return spyOn(console, 'trace');
      });
      it("should display the backtrace", function() {
        $.log({
          backtrace: true
        });
        $.log('message');
        return expect(console.trace).toHaveBeenCalled();
      });
      it("should display grouped", function() {
        $.log({
          group: true
        });
        $.log('message');
        expect(console.group).toHaveBeenCalled();
        return expect(console.groupEnd).toHaveBeenCalled();
      });
      return it("should display groupCollapsed", function() {
        $.log({
          group: true,
          collapsed: true
        });
        $.log('message');
        expect(console.groupCollapsed).toHaveBeenCalled();
        return expect(console.groupEnd).toHaveBeenCalled();
      });
    });
  });

  describe("$.fn.log", function() {
    return it("should be", function() {
      return expect($.fn.log).toBeDefined();
    });
  });

}).call(this);
