import { InputNumber as AntdInputNumber, InputNumberProps } from 'antd';
import { useField } from 'formik';
import { memo } from 'react';
import styled from 'styled-components';
import FormItem, { FormItemProps } from './FormItem';

// Styled to fill the whole space
export const InputNumber = styled(AntdInputNumber)<{ $offsetTop?: string }>`
    width: 100%;
    background-color: transparent;
    box-shadow: none;
    border-top: none;
    border-left: none;
    border-right: none;
    font-size: 16px;
    height: 34px;

    & .ant-input-number-group-addon {
        background-color: #fff;
        border-bottom: 1px line;
        border-top: none;
        border-left: none;
        border-right: none;
        border-radius: 0;
        font-size: 16px;
    }

    & .ant-input-number {
        height: 34px;
        padding-top: ${props => props.$offsetTop ?? '2px'};
    }
`;

export interface InputFieldProps extends Omit<InputNumberProps, 'value' | 'onChange' | 'autoComplete'> {
    name: string;
    label?: string;
    itemProps?: Omit<FormItemProps, 'label' | 'meta' | 'required' | 'children'>;
    tooltip?: FormItemProps['tooltip'];
}

const InputNumberField = ({ name, required, label, itemProps, tooltip, ...props }: InputFieldProps) => {
    const [field, meta, { setValue }] = useField({ name });

    return (
        <FormItem {...itemProps} label={label} meta={meta} required={required} tooltip={tooltip}>
            <InputNumber
                autoComplete="off"
                {...props}
                {...field}
                controls={false}
                onChange={value => setValue(value)}
            />
        </FormItem>
    );
};

export default memo(InputNumberField);
