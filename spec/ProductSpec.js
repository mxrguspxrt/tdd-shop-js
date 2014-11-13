describe("Product", function() {

  beforeEach(function() {
  });

  describe("automatic product addition", function() {
    var receivedProduct;

    it("gets list from external service and returns list", function() {
      var productService = new ProductService();

      productService.getAutomaticallyAddedProducts = function(product) {
        this.receivedProduct = product;
        return "result";
      };

      var product = new Product();

      product.getProductService = function() {
        return productService;
      };

      expect(product.getAutomaticallyAddedProducts()).toEqual("result");
      expect(productService.receivedProduct).toEqual(product);
    });

  });

});

