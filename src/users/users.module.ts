import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { DatabaseModule } from 'src/db/db.module';
import { JwtModule } from '@nestjs/jwt';
import { TokensModule } from 'src/tokens/tokens.module';
import { ColumnsModule } from 'src/columns/columns.module';
import { clearCookie } from 'src/middlewares/cookie.middleware';

@Module({
  imports: [DatabaseModule, TokensModule, ColumnsModule,
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_SECRET,
      signOptions: {expiresIn: '1d'}
    }),
    JwtModule.register({
      global: true,
      secret: process.env.REFRESH_SECRET,
      signOptions: {expiresIn: '7d'}
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
     consumer.apply(clearCookie).forRoutes({path: 'users/delete', method: RequestMethod.DELETE})
  }
}
