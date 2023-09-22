import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ConsolePageWithHeader from '../../../layouts/ConsoleLayout/ConsolePageWithHeader';
import useGoTo from '../../../utilities/useGoTo';
import BookList from './BookList';

const BookListPage = () => {
    const { t } = useTranslation('bookList');

    const goToNewBookPage = useGoTo('/private/system/books/add');

    const extra = (
        <Button icon={<PlusOutlined />} onClick={goToNewBookPage} type="primary">
            {t('bookList:actions.newBook')}
        </Button>
    );

    return (
        <ConsolePageWithHeader extra={extra} subTitle={t('bookList:subTitle')} title={t('bookList:title')}>
            <BookList />
        </ConsolePageWithHeader>
    );
};

export default BookListPage;
