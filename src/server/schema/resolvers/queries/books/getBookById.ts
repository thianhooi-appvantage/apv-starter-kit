import { getDatabaseContext } from '../../../../database';
import { GraphQLQueryResolvers } from '../../definitions';

const query: GraphQLQueryResolvers['getBookById'] = async (root, { id }) => {
    const { collections } = await getDatabaseContext();

    return collections.books.findOne({ _id: id });
};

export default query;
