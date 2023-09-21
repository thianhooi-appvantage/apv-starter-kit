import { GraphQLBookResolvers } from '../definitions';

const BookGraphQL: GraphQLBookResolvers = {
    id: root => root._id,
    author: (root, args, { loaders }) => loaders.userById.load(root.authorId),
};

export default BookGraphQL;
