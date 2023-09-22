import { BookUpdateInput } from '../../../../api';
import BookDetailForm from './BookDetailForm';

export type BookFormValues = BookUpdateInput;

export const defaultValues: BookFormValues = {
    title: '',
    description: '',
    language: '',
    pages: 0,
};

const BookForm = () => <BookDetailForm />;

export default BookForm;
