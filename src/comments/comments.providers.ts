import { Comment } from "./entities/comment.entity";

export const commentsProvider = [
    {
        provide: 'COMMENTS_REPOSITORY',
        useValue: Comment
    }
]