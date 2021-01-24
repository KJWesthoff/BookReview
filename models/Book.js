const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create our Book model
class Book extends Model {}
/*
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      book_id: body.book_id
    }).then(() => {
      return Book.findOne({
        where: {
          id: body.book_id
        },
        attributes: [
          'id',
          'book_url',
          'img_url',
          'title',
          'author',
          'created_at',
          [
            sequelize.literal('(SELECT COUNT(*) FROM vote WHERE book.id = vote.book_id)'),
            'vote_count'
          ]
        ],
        include: [
          {
            model: models.Comment,
            attributes: ['id', 'comment_text', 'book_id', 'user_id', 'created_at'],
            include: {
              model: models.User,
              attributes: ['username']
            }
          }
        ]
      });
    });
  }
}
*/

// create fields/columns for Book model
Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author:{
      type: DataTypes.STRING,
      allowNull: false,
    },
     book_url: {
       type: DataTypes.STRING,
       allowNull: true,
       validate: {
         isURL: true
       }
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isURL: true
      }
   },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'book'
  }
);

module.exports = Book;
