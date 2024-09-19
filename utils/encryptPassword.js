const bcrypt = require('bcryptjs')
exports.encryptPassword =  async function (plain_password) {
    const password = await bcrypt.hash(plain_password, 10);
    return password;
 }
// encryptPassword("123").then((data) => console.log(data))
exports.removeObject = function(array, itemToRemove) {
    const findIndex = array.findIndex(a => a.scale === itemToRemove.scale)
    findIndex !== -1 && array.splice(findIndex , 1)
    return array
}
exports.isExit = function (array, itemToCheck) {
    let flag;
    if (array.length==0) {
        return false
    }
    for (var i =0; i<array.length; i++) {
        if (JSON.stringify(array[i]) === JSON.stringify(itemToCheck)) {
            flag = true;
            break;
        }
        flag = false;
    }
    return flag
}