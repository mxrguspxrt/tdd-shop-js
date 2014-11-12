function Cart() {
  this.items = [];
}

Cart.prototype.getTotalAmount = function() {
  return 0;
};

Cart.prototype.add = function(amount) {
  this.items.push(amount);
};

Cart.prototype.getReceipt = function() {
  return "receipt";
};
