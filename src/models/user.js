'use strict';

class User {
  constructor(name, username, password, isAdmin, location, phone) {
    this.name = name;
    this.username = username;
    this.password = password;
    this.isAdmin = isAdmin;
    this.location = location;
    this.phone = phone;
    this.createdAt = new Date();
  }
  getData() {
    return {name: this.name, username: this.username, location: this.location,
      phone: this.phone, createdAt: this.createdAt};
  }
}

var users = [
  new User('Big Joe', 'crazyjoe', '123456', false, 'Barcelona', '2626284619'),
  new User('Peter Parker', 'daboss', '123456', true, 'Chicago', '43488599229')
];

exports.get = function(id, cb) {
  const user = (users[id]) ? users[id].getData() : null;
  cb(null, user);
};

exports.getAll = function(cb) {
  const result = users.map((user) => {
    return user.getData();
  });
  cb(null, result);
};

