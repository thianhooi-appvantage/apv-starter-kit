import { ObjectId } from 'mongodb';

export type Book = {
    _id: ObjectId;
    title: string;
    description?: string;
    pages: number;
    language: string;
    authorId: ObjectId;
    isDeleted: boolean;
};
