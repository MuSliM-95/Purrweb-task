import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { columnProviders } from './columns.providers';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [CommentsModule],
  providers: [ColumnsService, ...columnProviders],
  controllers: [ColumnsController],
  exports: [ColumnsService]
})
export class ColumnsModule {}
