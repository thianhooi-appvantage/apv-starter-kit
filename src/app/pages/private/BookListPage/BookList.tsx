import { Table } from 'antd';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Book, useListBooksQuery } from '../../../api';
import PaginatedTable from '../../../components/PaginatedTable';
import InternalErrorResult from '../../../components/results/InternalErrorResult';
import BookListActions from './BookListActions';
import useListReducer from './useListReducer';

const BookList = () => {
    const { t } = useTranslation('bookList');

    const [state, dispatch] = useListReducer();
    const { page, pageSize } = state;

    const { data, loading, error } = useListBooksQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            pagination: { offset: (page - 1) * pageSize, limit: pageSize },
        },
    });

    const dataSource = useMemo(() => (data?.list?.items || []).map(item => ({ ...item, key: item.id })), [data]);
    const total = data?.list?.count || 0;

    if (!loading && error) {
        return <InternalErrorResult />;
    }

    return (
        <PaginatedTable
            dataSource={dataSource}
            dispatch={dispatch}
            loading={loading}
            rowKey="id"
            state={state}
            total={total}
        >
            <Table.Column key="title" dataIndex="title" title={t('bookList:columns.title')} />
            <Table.Column key="language" dataIndex="language" title={t('bookList:columns.language')} />
            <Table.Column key="pages" dataIndex="pages" title={t('bookList:columns.pageCount')} />
            <Table.Column key="author" dataIndex={['author', 'displayName']} title={t('bookList:columns.author')} />
            <Table.Column<Book>
                key="actions"
                dataIndex="actions"
                render={(value, record) => <BookListActions book={record} />}
                title={t('bookList:columns.actions')}
            />
        </PaginatedTable>
    );
};

export default BookList;
