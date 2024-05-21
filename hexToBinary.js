function hextobin(hexString) {
    let binString = '';
    for (let count = 0; count < hexString.length; count += 2) {
        const subString = hexString.substr(count, 2);
        const packedString = Buffer.from(subString, 'hex');
        binString += packedString;
    }
    return binString;
}

// Hexadecimal string
const hexString = '098fc6e1d3feb7f6dfd7b72d86ea166a845a5fa3c19b738cf2412aadc8494d3ef35d07417f3eb6b939dbdc42f3e53d86cc18c527f2419567fa27c3efc7e80338eb38ad73fe2e55d90e105b8b27b179884ac09ddc8871b060f184c8cbf94a02a4d76a55298ea7cbc8bf2c592fd7fc6ad2eb3b21c5bb5580c570a4bdb6a3efe9f322df25dc1c445198eaecb9505632379620889a51b4de4dbce36991a9c6bd54a52c5c32c428d381fb759215c39cb2ccdc32dbe6b4c25f9e516e2f1ef18391bc317d33e455465951a2531b84504f94c1adf65c56bec9ae8331715d0d338254122c071395c6d24e9c676380ba121a559ac73a785dac71cf8f0208f4bd3a44258b340533453c143313d6f9fd4dec3c475bf7e14b5a338b1096efe2d80d5353e1a493545e4f5ef5a1fded43982a81a6baf51d';

// Convert hexadecimal string to binary data
const binaryData = hextobin(hexString);

console.log("Binary Data:", binaryData);
