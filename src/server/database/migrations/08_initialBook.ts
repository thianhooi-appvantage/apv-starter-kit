import { ObjectId } from 'mongodb';
import { DatabaseContext } from '../instance';

type Book = {
    _id: ObjectId;
    title: string;
    description?: string;
    pages: number;
    language: string;
    authorId: ObjectId;
    isDeleted: boolean;
};

export default {
    identifier: '08_initialBook',

    async up({ regular: { db } }: DatabaseContext): Promise<void> {
        await db.collection<Book>('books').insertOne({
            _id: new ObjectId(),
            title: 'Lorem Ipsum',
            description: 'Lorem ipsum book description',
            pages: 100,
            language: 'English',
            authorId: new ObjectId(),
            isDeleted: false,
        });
    },
};
