describe("Cart", function() {
  var cart;

  beforeEach(function() {
    cart = new Cart();
  });

  describe("total amount", function() {
    it("is zero for empty cart", function() {
      expect(cart.getTotalAmount()).toEqual(0.0);
    });
  });
});
