describe("Cart", function() {
  var cart;
  var product1;
  var product2;

  beforeEach(function() {
    cart = new Cart();
    product1 = new Product({name: "Vesi", price: 1.5});
    product2 = new Product({name: "Shiski", price: 20.0});
    product3 = new Product({name: "Kartul", price: 20.0, unit: "kilograms"});
  });

  describe("total amount", function() {

    it("is zero for empty cart", function() {
      expect(cart.getTotalAmount()).toEqual(0.0);
    });

    it("returns sum for cart with 2 items", function() {
      cart.addProduct(product1, 1);
      cart.addProduct(product2, 1);
      expect(cart.getTotalAmount()).toEqual(21.5);
    });

    it("returns correct amount for multiple items of same product", function() {
      cart.addProduct(new Product({price: 10.0}), 10);
      expect(cart.getTotalAmount()).toEqual(100.0);
    });

  });


  describe("receipt", function() {

    it("contains product name, quantity, price=total price", function() {
      cart.addProduct(product1, 1);
      cart.addProduct(product2, 10);
      expect(cart.getReceipt()).toEqual("Vesi\t1 x 1.5 = 1.5\nShiski\t10 x 20 = 200\n");
    });

    it("shows three places after comma for items that have kg", function() {
      cart.addProduct(product1, 1);
      cart.addProduct(product3, 1.5555);
      expect(cart.getReceipt()).toEqual("Vesi\t1 x 1.5 = 1.5\nKartul\t1.556 x 20 = 31.11\n");
    });

    it("contains grouped items (even if added multiple times)", function() {
      cart.addProduct(product1, 1);
      cart.addProduct(product1, 1);
      cart.addProduct(product3, 2.5555);
      cart.addProduct(product3, 2.5555);
      expect(cart.getReceipt()).toEqual("Vesi\t2 x 1.5 = 3\nKartul\t5.111 x 20 = 102.22\n");
    });

  });

  describe("automatic product addition", function() {

    it("adds connected products automatically", function() {
      var automaticallyAddedProduct = new Product();
      var productWithAddition = new Product();

      productWithAddition.getAutomaticallyAddedProducts = function() {
        return [automaticallyAddedProduct];
      }

      cart.addProduct(productWithAddition, 2);

      expect(cart.items).toContain({product: automaticallyAddedProduct, quantity: 2});
    });

  });

});

