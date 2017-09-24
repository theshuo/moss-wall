const Word = require('./word');
const Topic = require('./topic');
// const TopicSimilarity = require('./topicSimilarity');
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
// Topic.belongsToMany(Topic, { as: 'Topic1', through: 'TopicSimilarity' });

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  Topic,
  // TopicSimilarity,
  Word,
};
