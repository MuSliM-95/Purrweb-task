import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { CommentDto } from './dto/comment.dto';
import { Request } from 'express';
import { UserVerification } from 'src/guard/verification.guard';

@Controller('comments')
export class CommentsController {
    constructor(public readonly commentsService: CommentsService) {}

    @Post('create')
    @UseGuards(AuthGuard)
    addComment(@Body(new ValidationPipe()) commentDto: CommentDto, @Req() req: Request) {
         const { userId } = req.cookies
         return this.commentsService.createComment({...commentDto, userId})
    }

    @Patch('update/:userId/:id')
    @UseGuards(AuthGuard, UserVerification)
    updateComment(@Body(new ValidationPipe()) commentDto: CommentDto, @Param('id') id: number) {
        return this.commentsService.updateCommentById(commentDto.text, id )
    }

    @Get()
    getComments() {
        return this.commentsService.getAllComments() 
    }


    @Delete('delete/:userId/:id')
    @UseGuards(AuthGuard, UserVerification)
    removeComment(@Param('id') id: number) { 
        return this.commentsService.deleteCommentById(id)
    }

 }
