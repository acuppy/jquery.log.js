describe "$.log", ->
  it "binds to the jQuery object", -> 
    expect($.log).toBeDefined()

  it "only activates if window.console exists", ->
    spyOn(window, 'console').andReturn(undefined)
    $.log 'message'
    expect(window.console).not.toHaveBeenCalled()

  it "only calls with a valid log_level", ->
    spyOn console, 'debug'
    $.log 'message', 'foo'
    expect(console.debug).not.toHaveBeenCalled()

  it "only calls with a log_level greater than minimum threshold", ->
    spyOn console, 'debug'
    spyOn console, 'warn'
    $.log log_level: 'warn'
    $.log 'message', 'debug'
    expect(console.debug).not.toHaveBeenCalled()
    expect(console.warn).not.toHaveBeenCalled()
    $.log log_level: 'debug'

  describe "options", ->
    beforeEach ->
      spyOn(console, 'info')
      spyOn(console, 'debug')
      spyOn(console, 'warn')
      spyOn(console, 'error')
      spyOn(console, 'log')

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

  describe "settings", ->
    beforeEach ->
      spyOn(console, 'group')
      spyOn(console, 'groupCollapsed')
      spyOn(console, 'groupEnd')
      spyOn(console, 'trace')

    it "should display the backtrace", ->
      $.log backtrace: true
      $.log 'message'
      expect(console.trace).toHaveBeenCalled()

    it "should display grouped", ->
      $.log group: true
      $.log 'message'
      expect(console.group).toHaveBeenCalled()
      expect(console.groupEnd).toHaveBeenCalled()

    it "should display groupCollapsed", ->
      $.log group: true, collapsed: true
      $.log 'message'
      expect(console.groupCollapsed).toHaveBeenCalled()
      expect(console.groupEnd).toHaveBeenCalled()

describe "$.fn.log", ->
  it "should be", -> 
    expect($.fn.log).toBeDefined()