import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, message } from 'antd';
import { Form, Formik } from 'formik';
import { pick } from 'lodash/fp';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { BookDataFragment, BookUpdateInput, useDeleteBookMutation, useUpdateBookMutation } from '../../../api';
import ConsolePageWithHeader from '../../../layouts/ConsoleLayout/ConsolePageWithHeader';
import useHandleError from '../../../utilities/useHandleError';
import { BookFormValues } from './BookForm';
import BookDetailForm from './BookForm/BookDetailForm';

type BookDetailsInnerPageProps = {
    book: BookDataFragment;
    disabled?: boolean;
};

const BookDetailsInnerPage = ({ book, disabled = false }: BookDetailsInnerPageProps) => {
    const { t } = useTranslation('bookDetails');
    const navigate = useNavigate();

    const [updateBookMutation] = useUpdateBookMutation();
    const [deleteBookMutation] = useDeleteBookMutation();

    const initialValues = useMemo(
        (): BookUpdateInput => pick(['title', 'description', 'language', 'pages'], book),
        [book]
    );

    const validate = (values: BookFormValues) => {
        const errors: Partial<Record<keyof BookFormValues, string>> = {};

        Object.keys(values).forEach(key => {
            if (!values[key]) {
                errors[key] = 'Required';
            }
        });

        if (values.pages < 1) {
            errors.pages = 'Invalid page count';
        }

        return errors;
    };

    const onSubmit = useHandleError<BookFormValues>(
        async values => {
            message.loading({
                content: t('bookDetails:messages.updateSubmitting'),
                key: 'primary',
                duration: 0,
            });

            await updateBookMutation({
                variables: {
                    id: book.id,
                    data: values,
                },
            }).finally(() => {
                message.destroy('primary');
            });

            message.success({
                content: t('bookDetails:messages.updateSuccessful'),
                key: 'primary',
            });

            navigate('/private/system/books');
        },
        [book.id, navigate, t, updateBookMutation]
    );

    const deleteBook = useCallback(async () => {
        Modal.confirm({
            title: t('bookDetails:deleteModal.title'),
            icon: <ExclamationCircleOutlined />,
            content: t('bookDetails:deleteModal.content'),
            okText: t('bookDetails:deleteModal.okText'),
            okType: 'danger',
            cancelText: t('bookDetails:deleteModal.cancelText'),
            async onOk() {
                message.loading({
                    content: t('bookDetails:messages.deleteSubmitting'),
                    key: 'primary',
                    duration: 0,
                });

                await deleteBookMutation({
                    variables: {
                        id: book.id,
                    },
                }).finally(() => {
                    message.destroy('primary');
                });

                message.success({
                    content: t('bookDetails:messages.deleteSuccessful'),
                    key: 'primary',
                });

                navigate('/private/system/books');
            },
        });
    }, [book.id, deleteBookMutation, navigate, t]);

    return (
        <ConsolePageWithHeader
            footer={[
                <Button key="delete" htmlType="button" onClick={deleteBook} danger>
                    {t('bookDetails:actions.delete')}
                </Button>,
                <Button key="submit" form="bookForm" htmlType="submit" type="primary">
                    {t('bookDetails:actions.update')}
                </Button>,
            ]}
            onBack={() => navigate('/private/system/books')}
            title={t('bookDetails:title')}
        >
            <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate} enableReinitialize>
                {({ handleSubmit }) => (
                    <Form id="bookForm" name="bookForm" onSubmitCapture={handleSubmit}>
                        <BookDetailForm book={book} disabled={disabled} />
                    </Form>
                )}
            </Formik>
        </ConsolePageWithHeader>
    );
};

export default BookDetailsInnerPage;
