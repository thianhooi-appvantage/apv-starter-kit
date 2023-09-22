import { Descriptions } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { BookDataFragment } from '../../../api';
import ConsolePageWithHeader from '../../../layouts/ConsoleLayout/ConsolePageWithHeader';

type BookInnerPageProps = {
    book: BookDataFragment;
};

const BookInnerPage = ({ book }: BookInnerPageProps) => {
    const { t } = useTranslation(['bookDetails']);
    const navigate = useNavigate();

    const content = (
        <Descriptions column={{ xs: 1, md: 2 }} bordered>
            <Descriptions.Item label={t('bookDetails:content.title')}>{book.title}</Descriptions.Item>
            <Descriptions.Item label={t('bookDetails:content.author')}>{book.author?.displayName}</Descriptions.Item>
            <Descriptions.Item label={t('bookDetails:content.language')}>{book.language}</Descriptions.Item>
            <Descriptions.Item label={t('bookDetails:content.pageCount')}>{book.pages}</Descriptions.Item>
            <Descriptions.Item label={t('bookDetails:content.description')}>{book.description}</Descriptions.Item>
        </Descriptions>
    );

    return (
        <ConsolePageWithHeader
            content={content}
            onBack={() => navigate('/private/system/books')}
            title={t('bookDetails:title')}
        />
    );
};

export default BookInnerPage;
