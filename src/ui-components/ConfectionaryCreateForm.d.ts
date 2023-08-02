/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ConfectionaryCreateFormInputValues = {
    Name?: string;
    Price?: number;
    Kitchen?: boolean;
};
export declare type ConfectionaryCreateFormValidationValues = {
    Name?: ValidationFunction<string>;
    Price?: ValidationFunction<number>;
    Kitchen?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ConfectionaryCreateFormOverridesProps = {
    ConfectionaryCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    Price?: PrimitiveOverrideProps<TextFieldProps>;
    Kitchen?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type ConfectionaryCreateFormProps = React.PropsWithChildren<{
    overrides?: ConfectionaryCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ConfectionaryCreateFormInputValues) => ConfectionaryCreateFormInputValues;
    onSuccess?: (fields: ConfectionaryCreateFormInputValues) => void;
    onError?: (fields: ConfectionaryCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ConfectionaryCreateFormInputValues) => ConfectionaryCreateFormInputValues;
    onValidate?: ConfectionaryCreateFormValidationValues;
} & React.CSSProperties>;
export default function ConfectionaryCreateForm(props: ConfectionaryCreateFormProps): React.ReactElement;
