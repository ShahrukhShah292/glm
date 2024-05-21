const data = require('../data.json');

const billersAsPerCategoryController = (req, res) => {
  const category = req.query.category;
  if (!category) {
    return res.status(400).json({ error: 'Category parameter is required' });
  }
  const filteredBillers = data.filter(biller => biller.billerCategory === category);
  res.json(filteredBillers);
};

module.exports = { billersAsPerCategoryController };
