import { ReturnDocument } from 'mongodb';
import { getDatabaseContext } from '../../../../database';
import { GraphQLMutationResolvers } from '../../definitions';

const mutation: GraphQLMutationResolvers['deleteBook'] = async (root, { id }) => {
    const { collections } = await getDatabaseContext();

    const book = await collections.books.findOne({ _id: id, isDeleted: false });

    if (!book) {
        throw new Error('Book not found');
    }

    const update = await collections.books.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { $set: { isDeleted: true } },
        { returnDocument: ReturnDocument.AFTER }
    );

    return update.value;
};

export default mutation;
