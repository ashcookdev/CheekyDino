/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { MessageDashboard } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MessageDashboardUpdateFormInputValues = {
    content?: string;
    createdAt?: string;
    email?: string;
    group?: string[];
};
export declare type MessageDashboardUpdateFormValidationValues = {
    content?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    group?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MessageDashboardUpdateFormOverridesProps = {
    MessageDashboardUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    group?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MessageDashboardUpdateFormProps = React.PropsWithChildren<{
    overrides?: MessageDashboardUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    messageDashboard?: MessageDashboard;
    onSubmit?: (fields: MessageDashboardUpdateFormInputValues) => MessageDashboardUpdateFormInputValues;
    onSuccess?: (fields: MessageDashboardUpdateFormInputValues) => void;
    onError?: (fields: MessageDashboardUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MessageDashboardUpdateFormInputValues) => MessageDashboardUpdateFormInputValues;
    onValidate?: MessageDashboardUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MessageDashboardUpdateForm(props: MessageDashboardUpdateFormProps): React.ReactElement;
