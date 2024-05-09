const axios = require('axios');
const qs = require('qs');
const crypto = require('crypto');
const moment = require('moment');

exports.verifyPan = async (req, res) => {
  try {
    const { pan_number, purpose, initiator_id, purpose_desc } = req.body;

    // Generate secret key and secret key timestamp
    const { secret_key, secret_key_timestamp } = generateSecretKey();

    const data = qs.stringify({
      'pan_number': pan_number,
      'purpose': purpose,
      'initiator_id': initiator_id,
      'purpose_desc': purpose_desc
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.eko.in:25002/ekoicici/v1/',
      headers: {
        'developer_key': '6c76de25fc863d11bd6b39c472bb396e',
        'secret_key': secret_key,
        'secret_key_timestamp': secret_key_timestamp,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    };

    const response = await axios.request(config);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function generateSecretKey() {
  const key = 'bb658207-54f7-47b2-807d-7bb239750f22';
  const secret_key_timestamp = moment().valueOf().toString(); // Current timestamp in milliseconds
  const key_bytes = Buffer.from(key, 'utf-8');

  const hmac = crypto.createHmac('sha256', key_bytes);
  hmac.update(secret_key_timestamp);

  const dig = hmac.digest();
  const secret_key = dig.toString('base64');

  return {
    secret_key,
    secret_key_timestamp
  };
}
