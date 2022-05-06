export var Api = {
  call: function call(url, method) {
    var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var data = {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    if (Object.keys(body).length > 0) {
      data.body = JSON.stringify(body);
    }
    return fetch(url, data).then(function (response) {
      return response.json();
    });
  },
  get: function get(url) {
    return this.call(url, 'get');
  },
  post: function post(url) {
    var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return this.call(url, 'post', body);
  },
  delete: function _delete(url) {
    return this.call(url, 'delete');
  }
};