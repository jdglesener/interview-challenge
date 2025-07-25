const express = require('express');
const router = express.Router();
const Color = require('../models/Color');

router.get('/random', async (req, res) => {
  console.log('colors.js router loaded');
  try {
    console.log('Fetching Random Color...')
    const [randomColor] = await Color.aggregate([{ $sample: { size: 1 } }]);
    if (!randomColor) {
      return res.status(404).json({ error: 'No colors found' });
    }
    res.json(randomColor);
  } catch (err) {
    console.error('Random color error:', err);
    res.status(500).json({ error: 'Failed to fetch random color' });
  }
});
// GET all colors
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;
  const skip = (page - 1) * pageSize;

  try {
    const colors = await Color.find()
      .skip(skip)
      .limit(pageSize);

    const total = await Color.countDocuments();
    console.log(colors);
    res.json({
      colors,
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (err) {
    console.error('Pagination error:', err);
    res.status(500).json({ error: 'Failed to fetch colors' });
  }
});

// POST a new color
router.post('/', async (req, res) => {
  try {
    const newColor = new Color(req.body);
    const savedColor = await newColor.save();
    res.status(201).json(savedColor);
  } catch (error) {
    res.status(400).json({ error: 'Failed to save color' });
  }
});


module.exports = router;
