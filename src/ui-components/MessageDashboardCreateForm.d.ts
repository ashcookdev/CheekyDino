/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MessageDashboardCreateFormInputValues = {
    content?: string;
    createdAt?: string;
    email?: string;
    group?: string[];
};
export declare type MessageDashboardCreateFormValidationValues = {
    content?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    group?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MessageDashboardCreateFormOverridesProps = {
    MessageDashboardCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    group?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MessageDashboardCreateFormProps = React.PropsWithChildren<{
    overrides?: MessageDashboardCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MessageDashboardCreateFormInputValues) => MessageDashboardCreateFormInputValues;
    onSuccess?: (fields: MessageDashboardCreateFormInputValues) => void;
    onError?: (fields: MessageDashboardCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MessageDashboardCreateFormInputValues) => MessageDashboardCreateFormInputValues;
    onValidate?: MessageDashboardCreateFormValidationValues;
} & React.CSSProperties>;
export default function MessageDashboardCreateForm(props: MessageDashboardCreateFormProps): React.ReactElement;
