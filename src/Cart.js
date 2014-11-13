

function Cart() {
  this.items = [];
}

Cart.prototype.getTotalAmount = function() {
  var sum = 0;
  for (var i in this.items) {
    var price = this.items[i]["product"].price * this.items[i]["quantity"];
    sum += price;
  }
  return sum;
};


Cart.prototype.addProduct = function(product, quantity) {

  var now = new Date();

  if (!product.isValidBuytime(now.getHours())) {
    throw "can't buy at this time";
  }

  var existingItem = this.items.filter(function(item) {
    return item.product==product;
  })[0];

  if(existingItem) {
    existingItem.quantity += quantity;
  } else {
    this.items.push({product: product, quantity: quantity});
  }

  var automaticallyAddedProducts = product.getAutomaticallyAddedProducts();
  if(automaticallyAddedProducts) {
    var self = this;
    automaticallyAddedProducts.forEach(function(automaticallyAddedProduct) {
      self.addProduct(automaticallyAddedProduct, quantity);
    });
  }
};

Cart.prototype.getReceipt = function() {
  var receipt = "";
  this.items.forEach(function(item) {
    receipt += item.product.name;
    receipt += "\t";
    if (item.product.unit=="kilograms") {
      receipt += item.quantity.toFixed(3) + " x " + item.product.price + " = " + (item.quantity*item.product.price).toFixed(2);
    } else {
      receipt += item.quantity + " x " + item.product.price + " = " + item.quantity*item.product.price;
    }

    receipt += "\n";
  });
  return receipt;
};
