
describe("$.log", function() {
  it("binds to the jQuery object", function() {
    expect($).toBe(jQuery);
    expect($.log).toBeDefined();
  });

  it("reports if active", function() {
    $.log(true);
  });
});