import { GraphQLBookResolvers } from '../definitions';

const BookGraphQL: GraphQLBookResolvers = {
    id: root => root._id,
};

export default BookGraphQL;
