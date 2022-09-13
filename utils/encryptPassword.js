const bcrypt = require('bcryptjs')
exports.encryptPassword =  async function (plain_password) {
    const password = await bcrypt.hash(plain_password, 10);
    return password;
 }
// encryptPassword("123").then((data) => console.log(data))