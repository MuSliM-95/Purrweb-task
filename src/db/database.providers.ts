import { Sequelize } from 'sequelize-typescript';
import { Card } from 'src/cards/entities/card.entity';
import { ColumnModel } from 'src/columns/entities/column.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Token } from 'src/tokens/entities/token.entity';
import { User } from 'src/users/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.HOST,
        port: +process.env.PORT,
        username: process.env.DB_USER_NAME,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
      });

      sequelize.addModels([User, Token, ColumnModel, Card, Comment]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
