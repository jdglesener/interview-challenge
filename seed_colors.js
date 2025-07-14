const mongoose = require('mongoose');

// 🔗 Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/colorpicker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 🧬 Schema
const colorSchema = new mongoose.Schema({
  hex: String,
  rgb: {
    r: Number,
    g: Number,
    b: Number,
  },
  name: String,
  tags: [String],
  isActive: Boolean,
});

const Color = mongoose.model('Color', colorSchema);

// 🎨 Base colors for tag matching
const baseColors = {
  Red:     { r: 255, g: 0,   b: 0   },
  Orange:  { r: 255, g: 165, b: 0   },
  Yellow:  { r: 255, g: 255, b: 0   },
  Green:   { r: 0,   g: 128, b: 0   },
  Blue:    { r: 0,   g: 0,   b: 255 },
  Purple:  { r: 128, g: 0,   b: 128 },
  Brown:   { r: 139, g: 69,  b: 19  },
  Gray:    { r: 128, g: 128, b: 128 }
};

// 🔍 Match closest color tag
function getClosestTag(rgb) {
  let closestTag = null;
  let shortestDistance = Infinity;

  for (const [tag, baseRgb] of Object.entries(baseColors)) {
    const distance = Math.sqrt(
      Math.pow(rgb.r - baseRgb.r, 2) +
      Math.pow(rgb.g - baseRgb.g, 2) +
      Math.pow(rgb.b - baseRgb.b, 2)
    );
    if (distance < shortestDistance) {
      shortestDistance = distance;
      closestTag = tag;
    }
  }

  return closestTag;
}

// 🔄 Hex → RGB
function hexToRgb(hex) {
  const value = parseInt(hex.slice(1), 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

// ⚙️ Generate complete color objects
function generateColorObjects(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hex = '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
    const rgb = hexToRgb(hex);
    colors.push({
      hex,
      rgb,
      name: `Color ${i + 1}`,
      tags: [getClosestTag(rgb)],
      isActive: true,
    });
  }
  return colors;
}

// 🚀 Insert into Mongo
async function seedColors() {
  try {
    const colorData = generateColorObjects(100);
    const result = await Color.insertMany(colorData);
    console.log(`🎉 Successfully inserted ${result.length} colors`);
  } catch (err) {
    console.error('⚠️ Seeding error:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedColors();
