(function() {

  describe("$.log", function() {
    it("binds to the jQuery object", function() {
      return expect($.log).toBeDefined();
    });
    return describe("options", function() {
      beforeEach(function() {
        spyOn(console, 'info').andCallThrough();
        spyOn(console, 'debug').andCallThrough();
        spyOn(console, 'warn').andCallThrough();
        spyOn(console, 'error').andCallThrough();
        return spyOn(console, 'log').andCallThrough();
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
  });

  describe("$.fn.log", function() {
    return it("should be", function() {
      return expect($.fn.log).toBeDefined();
    });
  });

}).call(this);
