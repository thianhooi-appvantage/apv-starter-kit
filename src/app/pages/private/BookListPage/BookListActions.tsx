import { Divider, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Book } from '../../../api';

export type BookListActionsProps = { book: Book };

const BookListActions = ({ book }: BookListActionsProps) => {
    const { t } = useTranslation('bookList');

    return (
        <Space size="small" split={<Divider type="vertical" />}>
            <Link to={`/private/system/books/${book.id}`}>{t('bookList:actions.view')}</Link>
            <Link to={`/private/system/books/${book.id}/update`}>{t('bookList:actions.update')}</Link>
        </Space>
    );
};

export default BookListActions;
