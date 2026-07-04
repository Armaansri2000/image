import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import Image from './models/Image.js';

dotenv.config();

const categories = [
  'Nature', 'Technology', 'Animals', 'Cars', 'Travel',
  'Food', 'Sports', 'Fashion', 'Architecture', 'Space'
];

const TOTAL_RECORDS = 200000;
const BATCH_SIZE = 5000;

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Image.deleteMany({});
    console.log('Cleared existing data');

    let inserted = 0;

    for (let i = 0; i < TOTAL_RECORDS; i += BATCH_SIZE) {
      const batch = [];

      for (let j = 0; j < BATCH_SIZE && (i + j) < TOTAL_RECORDS; j++) {
        const id = i + j + 1;
        batch.push({
          imageName: faker.lorem.words({ min: 2, max: 5 }),
          heading: categories[Math.floor(Math.random() * categories.length)],
          description: faker.lorem.sentence({ min: 8, max: 15 }),
          image: `https://picsum.photos/400/300?random=${id}`
        });
      }

      await Image.insertMany(batch);
      inserted += batch.length;
      console.log(`Inserted ${inserted} / ${TOTAL_RECORDS} records`);
    }

    console.log('Seeding complete!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();
