import React from 'react';
import { useTranslation } from 'react-i18next';
import ConsolePageWithHeader from '../../../layouts/ConsoleLayout/ConsolePageWithHeader';
import BookList from './BookList';

const BookListPage = () => {
    const { t } = useTranslation('bookList');

    return (
        <ConsolePageWithHeader subTitle={t('bookList:subTitle')} title={t('bookList:title')}>
            <BookList />
        </ConsolePageWithHeader>
    );
};

export default BookListPage;
