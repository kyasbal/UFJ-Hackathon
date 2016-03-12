var apiRoot = "http://demo-ap08-prod.apigee.net/v1";

function apiGet(addr) {
  return superagent.get(apiRoot + addr).set('Authorization', 'Bearer ' + window.apiToken);
}

function apiPost(addr) {
  return superagent.post(apiRoot + addr).set('Authorization', 'Bearer ' + window.apiToken);
}

api = {

};

if (window.location.hash) {
  var regex = /access_token=([^&]+)/;
  var token = regex.exec(window.location.hash)[1];
  window.apiToken = token;
} else {
  throw new Error("Token was not found in header");
}

api.users = function(id) {
  return new Primise((request, reject) => {
    if (!id) {
      apiGet("/users").end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(res.text));
        }
      });
    } else {
      apiGet("/users/" + id).end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(res.text));
        }
      });
    }
  });
}

api.users.__proto__.me = function() {
  return new Promise((resolve, reject) => {
    apiGet("/users/me").end((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(res.text));
      }
    });
  });
}

api.accounts = function(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      apiGet("/accounts").end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(res.text));
        }
      });
    } else {
      apiGet("/accounts/" + id).end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(res.text));
        }
      });
    }
  });
}

api.accounts.__proto__.transactions = function(id) {
  return new Promise((resolve, reject) => {
    apiGet("/accounts/" + id + "/transactions").end((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(res.text));
      }
    });
  });
}

api.accounts.__proto__.transfers = function(id) {
  return new Promise((resolve, reject) => {
    apiGet("/accounts/" + id + "/transfers").end((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(res.text));
      }
    });
  });
}

api.users.__proto__.transfer_patterns = {
  get: function(id, templateId) {
    return new Promise((resolve, reject) => {
      if (!templateId) {
        apiGet("/users/" + id + "/transfer-patterns").end((err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(res.text));
          }
        });
      } else {
        apiGet("/users/" + id + "/transfer-patterns/"+templateId).end((err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(res.text));
          }
        });
      }
    });
  }
};

api.users.me().then(m => {
  console.log(m);
  return api.users.transfer_patterns.get(m.user_id);
}).then(d => {
  return api.users.transfer_patterns.get(d.entities[0].user_id,d.entities[0].transfer_pattern_id);
}).then(t=>{
  console.log(t);
})
