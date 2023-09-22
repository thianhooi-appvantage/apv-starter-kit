import { useParams } from 'react-router-dom';
import { useGetBookByIdQuery } from '../../../api';
import LoadingElement from '../../../components/LoadingElement';
import NotFoundResult from '../../../components/results/NotFoundResult';
import BookDetailsInnerPage from './BookDetailsInnerPage';

const BookDetailsPage = () => {
    const { bookId } = useParams<{ bookId: string }>();

    const { data, loading, error } = useGetBookByIdQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            id: bookId,
        },
    });

    const book = data?.getBookById;

    if (!book && loading) {
        return <LoadingElement />;
    }

    if (!book || !!error) {
        return <NotFoundResult />;
    }

    return <BookDetailsInnerPage book={book} />;
};

export default BookDetailsPage;
