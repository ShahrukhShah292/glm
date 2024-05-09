const Data = require('../models/Data');

exports.getDataByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const data = await Data.find({ blr_category_name: categoryName });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
