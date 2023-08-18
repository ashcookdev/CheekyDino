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
export declare type StaffCreateFormInputValues = {
    Name?: string;
    Email?: string;
    TimeEntries?: string;
    Role?: string;
    HourlyRate?: number;
};
export declare type StaffCreateFormValidationValues = {
    Name?: ValidationFunction<string>;
    Email?: ValidationFunction<string>;
    TimeEntries?: ValidationFunction<string>;
    Role?: ValidationFunction<string>;
    HourlyRate?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StaffCreateFormOverridesProps = {
    StaffCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    Email?: PrimitiveOverrideProps<TextFieldProps>;
    TimeEntries?: PrimitiveOverrideProps<TextFieldProps>;
    Role?: PrimitiveOverrideProps<TextFieldProps>;
    HourlyRate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type StaffCreateFormProps = React.PropsWithChildren<{
    overrides?: StaffCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: StaffCreateFormInputValues) => StaffCreateFormInputValues;
    onSuccess?: (fields: StaffCreateFormInputValues) => void;
    onError?: (fields: StaffCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: StaffCreateFormInputValues) => StaffCreateFormInputValues;
    onValidate?: StaffCreateFormValidationValues;
} & React.CSSProperties>;
export default function StaffCreateForm(props: StaffCreateFormProps): React.ReactElement;
