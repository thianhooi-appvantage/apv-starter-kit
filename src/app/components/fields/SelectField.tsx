import { Select, SelectProps } from 'antd';
import { useField } from 'formik';
import { memo, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import FormItem, { FormItemProps } from './FormItem';

export type SelectOption<T> = {
    label: JSX.Element | ReactNode;
    value: T;
};

export interface SelectFieldProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
    name: string;
    label?: string;
    itemProps?: Omit<FormItemProps, 'label' | 'meta' | 'required' | 'children'>;
    required?: boolean;
    options: SelectOption<string | number | boolean>[];
    onChange?: (value: any) => void;
}

const SelectField = ({ name, required, label, itemProps, disabled, onChange = null, ...props }: SelectFieldProps) => {
    const { t } = useTranslation('common');
    const [field, meta, { setValue }] = useField({ name });

    const { options } = props;

    const onValueChanged = useCallback(
        value => {
            setValue(value);

            if (onChange) {
                onChange(value);
            }
        },
        [setValue, onChange]
    );

    return (
        <FormItem {...itemProps} label={label} meta={meta} required={required}>
            <Select
                // spread props
                {...props}
                // then spread the field properties itself
                {...field}
                // disabled={disabled || (isFieldEmpty && options?.length === 1 && required)}
                onChange={onValueChanged}
                options={options as SelectProps['options']}
                placeholder={t('common:pleaseSelect')}
                showArrow
            />
        </FormItem>
    );
};

export default memo(SelectField);
