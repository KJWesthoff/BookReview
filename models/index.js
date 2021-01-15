// import all models
const Book = require('./Book');
const User = require('./User');
const Comment = require('./Comment');
const Vote = require('./Vote');

// create associations
User.hasMany(Book, {
  foreignKey: 'user_id'
});

Book.belongsTo(User, {
  foreignKey: 'user_id'
});


User.belongsToMany(Book, {
    through: Vote,
    as: 'voted_books',
    foreignKey: 'user_id'
  });
  
  Book.belongsToMany(User, {
    through: Vote,
    as: 'voted_books',
    foreignKey: 'book_id'
  });
  
  Vote.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
  Vote.belongsTo(Book, {
    foreignKey: 'book_id'
  });
  
  User.hasMany(Vote, {
    foreignKey: 'user_id'
  });
  
  Book.hasMany(Vote, {
    foreignKey: 'book_id'
  });

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Book, {
  foreignKey: 'book_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Book.hasMany(Comment, {
  foreignKey: 'book_id'
});

module.exports = { User, Book, Comment, Vote };
