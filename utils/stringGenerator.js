function generateRandomString(length = 35) {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    let randomString = '';
    for (let i = 0; i < length; i++) {
      randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return randomString;
  }

module.exports = generateRandomString