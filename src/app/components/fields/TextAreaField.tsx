import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { useField } from 'formik';
import { memo, ReactNode } from 'react';
import FormItem, { FormItemProps } from './FormItem';

export interface TextAreaFieldProps extends Omit<TextAreaProps, 'value' | 'onChange'> {
    name: string;
    label?: JSX.Element | string;
    tooltip?: FormItemProps['tooltip'];
}

type TextAreaFieldWithAddOnProps = TextAreaFieldProps & { addMoreButton?: ReactNode };

const TextAreaField = ({ name, required, label, addMoreButton, tooltip, ...props }: TextAreaFieldWithAddOnProps) => {
    const [field, meta] = useField({ name });

    return (
        <FormItem label={label} meta={meta} required={required} tooltip={tooltip}>
            <Input.Group>
                <Input.TextArea
                    autoSize={{ minRows: 2, maxRows: 6 }}
                    // spread props
                    {...props}
                    // then spread the field properties itself
                    {...field}
                />
                {addMoreButton && <span className="ant-input-group-addon">{addMoreButton}</span>}
            </Input.Group>
        </FormItem>
    );
};

export default memo(TextAreaField);
