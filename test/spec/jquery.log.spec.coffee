describe "$.log", ->
  it "binds to the jQuery object", -> 
    expect($.log).toBeDefined()

  describe "options", ->
    beforeEach ->
      spyOn(console, 'info').andCallThrough()
      spyOn(console, 'debug').andCallThrough()
      spyOn(console, 'warn').andCallThrough()
      spyOn(console, 'error').andCallThrough()
      spyOn(console, 'log').andCallThrough()

    describe "when receiving a string", ->
      it "should set the default log_level to debug", ->
        $.log 'here is my message'
        expect(console.debug).toHaveBeenCalled()

      it "should accept a function", ->
        $.log -> "here is my message"
        expect(console.debug).toHaveBeenCalled()

      it "should extend the current settings if an object is passed in", ->
        spyOn($, 'extend').andCallThrough()
        $.log foo: "bar"
        expect($.extend).toHaveBeenCalled()
        expect(console.debug).not.toHaveBeenCalled()

      it "should set the active option if a boolean is passed in", ->
        spyOn($, 'extend').andCallThrough()
        $.log true
        expect($.extend).not.toHaveBeenCalled()
        expect(console.debug).not.toHaveBeenCalled()

describe "$.fn.log", ->
  it "should be", -> 
    expect($.fn.log).toBeDefined()