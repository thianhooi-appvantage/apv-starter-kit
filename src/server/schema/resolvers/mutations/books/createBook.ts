import { ObjectId } from 'mongodb';
import { Book, getDatabaseContext } from '../../../../database';
import { GraphQLMutationResolvers } from '../../definitions';

const mutation: GraphQLMutationResolvers['createBook'] = async (root, { data }) => {
    const { collections } = await getDatabaseContext();

    const author = await collections.users.findOne({ _id: new ObjectId(data.authorId) });

    if (!author) {
        throw new Error('Author not found');
    }

    const document: Book = {
        _id: new ObjectId(),
        ...data,
        authorId: new ObjectId(data.authorId),
        isDeleted: false,
    };

    await collections.books.insertOne(document);

    return document;
};

export default mutation;
