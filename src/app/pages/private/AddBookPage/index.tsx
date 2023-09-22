import { Button, Form, message } from 'antd';
import { Formik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { BookCreateInput, useCreateBookMutation } from '../../../api';
import ConsolePageWithHeader from '../../../layouts/ConsoleLayout/ConsolePageWithHeader';
import useHandleError from '../../../utilities/useHandleError';
import CreateBookForm, { defaultValues } from '../BookDetailsPage/BookForm/CreateBookForm';

const validate = (values: BookCreateInput) => {
    const errors: Partial<Record<keyof BookCreateInput, string>> = {};

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

const AddBookPage = () => {
    const { t } = useTranslation(['bookDetails']);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [createBookMutation] = useCreateBookMutation();

    const onSubmit = useHandleError<BookCreateInput>(
        async values => {
            setIsLoading(true);
            message.loading({
                content: t('bookDetails:messages.createSubmitting'),
                key: 'primary',
                duration: 0,
            });

            await createBookMutation({
                variables: {
                    data: values,
                },
            }).finally(() => {
                setIsLoading(false);
                message.destroy('primary');
            });

            message.success({
                content: t('bookDetails:messages.createSuccessful'),
                key: 'primary',
            });

            navigate('/private/system/books');
        },
        [createBookMutation, navigate, t]
    );

    return (
        <ConsolePageWithHeader
            footer={[
                <Button key="submit" form="bookForm" htmlType="submit" loading={isLoading} type="primary">
                    {t('bookDetails:actions.create')}
                </Button>,
            ]}
            onBack={() => navigate('/private/system/books')}
            title={t('bookDetails:title')}
        >
            <Formik initialValues={defaultValues} onSubmit={onSubmit} validate={validate}>
                {({ handleSubmit, values }) => (
                    <Form id="bookForm" name="bookForm" onSubmitCapture={handleSubmit}>
                        <CreateBookForm />
                    </Form>
                )}
            </Formik>
        </ConsolePageWithHeader>
    );
};

export default AddBookPage;
