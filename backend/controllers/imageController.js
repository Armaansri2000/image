import Image from '../models/Image.js';

export const getImages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const heading = req.query.heading || '';

    const query = {};

    if (search) {
      query.imageName = { $regex: search, $options: 'i' };
    }

    if (heading) {
      query.heading = heading;
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      Image.find(query).skip(skip).limit(limit).lean(),
      Image.countDocuments(query)
    ]);

    res.json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
