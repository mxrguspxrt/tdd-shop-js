function ProductService() {
}

ProductService.prototype.getAutomaticallyAddedProducts = function(product) {
  return [];
};

function Product(opts) {
  opts = opts || {};
  this.name = opts.name;
  this.price = opts.price;
  this.unit = opts.unit;
  this.validBuytime = opts.validBuytime;
};

Product.prototype.getName = function() {
  return name;
};

Product.prototype.getProductService = function() {
  return new ProductService();
};

Product.prototype.getAutomaticallyAddedProducts = function() {
  return this.getProductService().getAutomaticallyAddedProducts(this);
};

Product.prototype.isValidBuytime = function(currentHours) {
  var validBuytime = this.validBuytime;

  if (!validBuytime) {
    return true;
  }

  if (currentHours > validBuytime.start && currentHours < validBuytime.end) {
    return true;
  }

  return false;
};
