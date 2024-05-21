const axios = require('axios');

class EkoAPI {
    constructor(baseUrl, ekoKey) {
        this.baseUrl = baseUrl;
        this.ekoKey = ekoKey;
    }

    async generateSecretKey(timestamp) {
        const encodedKey = Buffer.from(this.ekoKey).toString('base64');
        const hmac = crypto.createHmac('sha256', encodedKey);
        hmac.update(timestamp.toString());
        const signature = hmac.digest('base64');
        return signature;
    }

    async verifyPAN(panNumber, purpose, purposeDesc, initiatorId) {
        const timestamp = Math.floor(Date.now() / 1000);
        const secretKey = await this.generateSecretKey(timestamp);

        const url = `${this.baseUrl}pan/verify`;
        const headers = {
            developer_key: this.ekoKey,
            'secret-key': secretKey,
            'secret-key-timestamp': timestamp,
        };

        const data = {
            pan_number: panNumber,
            purpose,
            purpose_desc,
            initiator_id: initiatorId,
        };

        try {
            const response = await axios.post(url, data, { headers });
            return response.data;
        } catch (error) {
            console.error('Error verifying PAN:', error);
            throw error; // Re-throw for handling in controller
        }
    }
}

module.exports = EkoAPI;
