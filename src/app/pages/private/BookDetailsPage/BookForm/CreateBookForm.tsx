import { Card, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { BookCreateInput, useAllUserOptionsQuery } from '../../../../api';
import InputField from '../../../../components/fields/InputField';
import InputNumberField from '../../../../components/fields/InputNumberField';
import SelectField from '../../../../components/fields/SelectField';
import TextAreaField from '../../../../components/fields/TextAreaField';

const colSpan = { lg: 8, md: 12, xs: 24 };

export type BookDetailFormProps = {
    disabled?: boolean;
};

export const defaultValues: BookCreateInput = {
    title: '',
    language: '',
    pages: 0,
    description: '',
    authorId: '',
};

const CreateBookForm = ({ disabled = false }: BookDetailFormProps) => {
    const { t } = useTranslation('bookDetails');

    const { data: allUsersData } = useAllUserOptionsQuery();

    const authorOptions = allUsersData?.allUserOptions.map(user => ({
        label: user.displayName,
        value: user.id,
    }));

    return (
        <Card title={t('bookDetails:cardTitles.configuration')}>
            <Row gutter={14}>
                <Col {...colSpan}>
                    <InputField
                        {...t('bookDetails:fields.title', { returnObjects: true })}
                        disabled={disabled}
                        name="title"
                        required
                    />
                </Col>

                <Col {...colSpan}>
                    <InputField
                        {...t('bookDetails:fields.language', { returnObjects: true })}
                        disabled={disabled}
                        name="language"
                        required
                    />
                </Col>

                <Col {...colSpan}>
                    <InputNumberField
                        {...t('bookDetails:fields.pageCount', { returnObjects: true })}
                        disabled={disabled}
                        min={1}
                        name="pages"
                        required
                    />
                </Col>

                <Col {...colSpan}>
                    <SelectField
                        {...t('bookDetails:fields.author', { returnObjects: true })}
                        name="authorId"
                        options={authorOptions}
                    />
                </Col>

                <Col span={24}>
                    <TextAreaField
                        disabled={disabled}
                        {...t('bookDetails:fields.description', { returnObjects: true })}
                        name="description"
                        required
                    />
                </Col>
            </Row>
        </Card>
    );
};

export default CreateBookForm;
