const express = require('express');
const app = express();
const Color = require('./models/Color');
const PORT = 3000;
const colorsRoute = require('./api/colors.js');

app.use(express.static('public'));

app.get('/colors', async (req, res) => {
  console.log(req.query)
  const { category, search, page = 1, limit = 36 } = req.query;
  const query = {};

  if (category) query.category = category;
  if (search) query.hex = { $regex: search, $options: 'i' };

  const totalCount = await Color.countDocuments(query);
  const colors = await Color.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json({
    colors,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: parseInt(page),
  });
});

app.use('/api/colors', colorsRoute)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
