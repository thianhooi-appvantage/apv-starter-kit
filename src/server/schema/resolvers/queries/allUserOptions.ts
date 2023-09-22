import { getDatabaseContext } from '../../../database';
import { GraphQLQueryResolvers } from '../definitions';

const query: GraphQLQueryResolvers['allUserOptions'] = async () => {
    const { collections } = await getDatabaseContext();

    return collections.users.find().toArray();
};

export default query;
