import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    const userId = req.body.userId;
    try {
      const user = await User.findById(userId)
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
});
//router.post('/', );

export default router;