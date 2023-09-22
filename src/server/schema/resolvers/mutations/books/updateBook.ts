import { getDatabaseContext } from '../../../../database';
import { GraphQLMutationResolvers } from '../../definitions';

const mutation: GraphQLMutationResolvers['updateBook'] = async (root, { id, data }) => {
    const { collections } = await getDatabaseContext();

    const book = await collections.books.findOne({ _id: id });

    if (!book) {
        throw new Error('Book not found');
    }

    const update = await collections.books.findOneAndUpdate({ _id: id }, { $set: data }, { returnDocument: 'after' });

    return update.value;
};

export default mutation;
