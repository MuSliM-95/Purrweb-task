import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { commentsProvider } from './comments.providers';

@Module({
  providers: [CommentsService, ...commentsProvider],
  controllers: [CommentsController]
})
export class CommentsModule {}
