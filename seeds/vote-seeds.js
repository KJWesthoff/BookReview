const { Vote } = require('../models');

const votedata = [
  {
    user_id: 9,
    book_id: 19
  },
  {
    user_id: 1,
    book_id: 8
  },
  {
    user_id: 8,
    book_id: 12
  },
  {
    user_id: 8,
    book_id: 19
  },
  {
    user_id: 9,
    book_id: 3
  },
  {
    user_id: 3,
    book_id: 16
  },
  {
    user_id: 4,
    book_id: 7
  },
  {
    user_id: 10,
    book_id: 7
  },
  {
    user_id: 3,
    book_id: 18
  },
  {
    user_id: 9,
    book_id: 16
  },
  {
    user_id: 3,
    book_id: 17
  },
  {
    user_id: 10,
    book_id: 2
  },
  {
    user_id: 6,
    book_id: 10
  },
  {
    user_id: 5,
    book_id: 11
  },
  {
    user_id: 6,
    book_id: 1
  },
  {
    user_id: 9,
    book_id: 18
  },
  {
    user_id: 6,
    book_id: 15
  },
  {
    user_id: 6,
    book_id: 7
  },
  {
    user_id: 6,
    book_id: 4
  },
  {
    user_id: 1,
    book_id: 16
  },
  {
    user_id: 10,
    book_id: 18
  },
  {
    user_id: 4,
    book_id: 10
  },
  {
    user_id: 10,
    book_id: 5
  },
  {
    user_id: 5,
    book_id: 16
  },
  {
    user_id: 6,
    book_id: 17
  },
  {
    user_id: 1,
    book_id: 15
  },
  {
    user_id: 7,
    book_id: 13
  },
  {
    user_id: 6,
    book_id: 3
  },
  {
    user_id: 6,
    book_id: 13
  },
  {
    user_id: 7,
    book_id: 1
  },
  {
    user_id: 4,
    book_id: 15
  },
  {
    user_id: 2,
    book_id: 18
  },
  {
    user_id: 9,
    book_id: 10
  },
  {
    user_id: 10,
    book_id: 15
  },
  {
    user_id: 8,
    book_id: 1
  },
  {
    user_id: 10,
    book_id: 8
  },
  {
    user_id: 2,
    book_id: 13
  },
  {
    user_id: 9,
    book_id: 20
  },
  {
    user_id: 1,
    book_id: 17
  },
  {
    user_id: 10,
    book_id: 9
  },
  {
    user_id: 10,
    book_id: 3
  },
  {
    user_id: 5,
    book_id: 6
  },
  {
    user_id: 6,
    book_id: 12
  },
  {
    user_id: 5,
    book_id: 2
  },
  {
    user_id: 6,
    book_id: 14
  },
  {
    user_id: 8,
    book_id: 18
  },
  {
    user_id: 3,
    book_id: 4
  }
];

const seedVotes = () => Vote.bulkCreate(votedata, { returning: true });

module.exports = seedVotes;
