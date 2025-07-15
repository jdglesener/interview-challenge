// db.js
const mongoose = require('mongoose');
const uri = "mongodb+srv://jordanglesener:<dbpassword>@cluster0.jf95r9h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, {
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