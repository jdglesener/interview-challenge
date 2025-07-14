// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/colorpicker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('✅ Connected to MongoDB');

  try {
    const collections = await db.db.listCollections().toArray();
    console.log('📦 Collections:', collections.map(col => col.name));
  } catch (error) {
    console.error('❌ Error fetching collections:', error);
  }
});

module.exports = mongoose;