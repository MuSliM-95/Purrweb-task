import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('COMMENTS_REPOSITORY') private useRepository: typeof Comment,
  ) {}

  async createComment({userId, cardId, text}: CommentDto) {
    const comment = await this.useRepository.create({
      userId,
      cardId,
      text,
    })

    console.log(comment);
    

    if(!comment) {
      throw new BadRequestException('Не удалось создать комментарий')
    }

    return comment
  }

  async updateCommentById(text: string, commentId: number): Promise<Comment> {
    const comment = await this.useRepository.findOne({where: {id: commentId}})

    if(!comment) {
     throw new BadRequestException(`Комментария по ${commentId} не найден`)
    }

    await comment.update({text})
    await comment.save()

    return comment
  }

  async getAllComments() {
     return await this.useRepository.findAll()
  }


  async deleteCommentById(id: Number) {
    return await this.useRepository.destroy({where: {id}})
  }
}
