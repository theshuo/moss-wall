const router = require('express').Router();
module.exports = router;

router.get('/', (req, res, next) => res.json({ moss: 'wall' }));

router.get('/graph', (req, res, next) => res.json(req.graph));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
