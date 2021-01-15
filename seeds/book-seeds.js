const { Book } = require('../models');

const postdata = [
  {
    title: 'Donec posuere metus vitae ipsum.',
    author: 'John Smith',
    user_id: 10
  },
  {
    title: 'Morbi non quam nec dui luctus rutrum.',
    author: 'Ron Smith',
    user_id: 8
  },
  {
    title: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    author: 'Carol Bennett',
    user_id: 1
  },
  {
    title: 'Nunc purus.',
    author: 'Jacob Jacob',
    user_id: 4
  },
  {
    title: 'Pellentesque eget nunc.',
    author: 'Ron Swanson',
    user_id: 7
  },
  {
    title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    author: 'Ron Swanson',
    user_id: 4
  },
  {
    title: 'In hac habitasse platea dictumst.',
    author: 'Brad John',
    user_id: 1
  },
  {
    title: 'Morbi non quam nec dui luctus rutrum.',
    author: 'Rob Bob',
    user_id: 1
  },
  {
    title: 'Duis ac nibh.',
    author: 'Person Pearson',
    user_id: 9
  },
  {
    title: 'Curabitur at ipsum ac tellus semper interdum.',
    author: 'JK Rowling',
    user_id: 5
  },
  {
    title: 'In hac habitasse platea dictumst.',
    author: 'J.R.R Tolken',
    user_id: 3
  },
  {
    title: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.',
    author: 'Dora the explorer',
    user_id: 10
  },
  {
    title: 'Donec dapibus.',
    author: 'Robert Baratheon',
    user_id: 8
  },
  {
    title: 'Nulla tellus.',
    author: 'Arya Stark',
    user_id: 3
  },
  {
    title: 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.',
    author: 'Duke Detain',
    user_id: 3
  },
  {
    title:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.',
    author: 'Freda McCloud',
    user_id: 7
  },
  {
    title: 'In hac habitasse platea dictumst.',
    author: 'Jake Samp',
    user_id: 6
  },
  {
    title: 'Etiam justo.',
    author: 'Rocket Book',
    user_id: 4
  },
  {
    title: 'Nulla ut erat id mauris vulputate elementum.',
    author: 'Dodge HellCat',
    user_id: 6
  },
  {
    title: 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    author: 'Bob Woodward',
    user_id: 7
  }
];

const seedBooks = () => Book.bulkCreate(postdata);

module.exports = seedBooks;
