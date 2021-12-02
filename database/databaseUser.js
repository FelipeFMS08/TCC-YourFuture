function databaseUser(connection) {
    this.userConnection = connection
}

databaseUser.prototype.createUser = function (data, callback) {
    this.userConnection.query('INSERT INTO yourfuture_users SET ?', data, callback)
}

databaseUser.prototype.searchAll = function (callback) {
    this.userConnection.query('SELECT * FROM yourfuture_users', callback)
}

databaseUser.prototype.verifyEmail = function (data,callback) {
    this.userConnection.query('SELECT * FROM yourfuture_users WHERE email = ?',data.email, callback)
}

databaseUser.prototype.verifyEmailAndPassword = function (data, callback) {
    this.userConnection.query('SELECT * FROM yourfuture_users where email = ? and password = ?', [data.email, data.password],callback)
}

databaseUser.prototype.searchUser = function (id, callback) {
    this.userConnection.query('SELECT * FROM yourfuture_users where id = ?',  id,callback)
}
module.exports = function() {
    return databaseUser
}