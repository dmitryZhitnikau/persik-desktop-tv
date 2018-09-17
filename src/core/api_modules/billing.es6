export default {
  getProducts(currency = null) {
    const version = 2;
    const module = 'billing';
    const method = 'GET';
    const action = 'products';
    const params = {};
    if (currency !== null) {
      params.currency = currency;
    }
    return this.exec(method, version, module, action, params, true);
  },

  getSubscriptions() {
    const version = 2;
    const module = 'billing';
    const method = 'GET';
    const action = 'subscriptions';
    return this.exec(method, version, module, action, {}, true);
  },

  createPayment(ids, paySys) {
    const version = 2;
    const module = 'billing';
    const method = 'POST';
    const action = 'payment';
    const params = {
      product_option_id: ids,
      pay_sys: paySys,
    };
    return this.exec(method, version, module, action, params);
  },
};
