const router = require('express').Router();
const { Topic } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => res.json({ moss: 'wall' }));

router.get('/topics', (req, res, next) => {
  Topic.findAll({ attributes: [ 'name' ] })
    .then(topics => res.json(topics.map(topic => topic.name)))
    .catch(next);
});

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
