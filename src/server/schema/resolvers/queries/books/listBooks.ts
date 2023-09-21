import { Filter } from 'mongodb';
import { Book, getDatabaseContext } from '../../../../database';
import { paginateAggregation } from '../../../../utils/pagination';
import { GraphQLBookFilteringRule, GraphQLQueryResolvers, Maybe } from '../../definitions';

const getFilter = (rule?: Maybe<GraphQLBookFilteringRule>): Filter<Book> => {
    const rootFilter: Filter<Book> = {};

    if (!rule) {
        return rootFilter;
    }

    const filters: Filter<Book>[] = [];

    if (rule.title) {
        rootFilter.title = new RegExp(rule.title, 'i');
    }

    if (rule.language) {
        rootFilter.language = new RegExp(rule.language, 'i');
    }

    if (filters.length > 0) {
        return { $and: filters };
    }

    return rootFilter;
};

const query: GraphQLQueryResolvers['listBooks'] = async (root, { pagination, filter }) => {
    const { collections } = await getDatabaseContext();

    return paginateAggregation(
        collections.books,
        [
            {
                $match: {
                    $and: [getFilter(filter)],
                },
            },
        ],
        pagination
    );
};

export default query;
