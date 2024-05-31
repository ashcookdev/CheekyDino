/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type JobApplicationCreateFormInputValues = {
    Name?: string;
    CoverLetter?: string;
    Role?: string;
    Town?: string;
    DOB?: string;
    Email?: string;
    Telephone?: string;
    PreviousExprience?: string;
    CV?: string;
    Age?: string;
    Interviewed?: boolean;
    InterviewNotes?: string;
    Offered?: boolean;
    InterviewTime?: string;
    InterviewDate?: string;
    InterviewSet?: boolean;
    NotInterested?: boolean;
};
export declare type JobApplicationCreateFormValidationValues = {
    Name?: ValidationFunction<string>;
    CoverLetter?: ValidationFunction<string>;
    Role?: ValidationFunction<string>;
    Town?: ValidationFunction<string>;
    DOB?: ValidationFunction<string>;
    Email?: ValidationFunction<string>;
    Telephone?: ValidationFunction<string>;
    PreviousExprience?: ValidationFunction<string>;
    CV?: ValidationFunction<string>;
    Age?: ValidationFunction<string>;
    Interviewed?: ValidationFunction<boolean>;
    InterviewNotes?: ValidationFunction<string>;
    Offered?: ValidationFunction<boolean>;
    InterviewTime?: ValidationFunction<string>;
    InterviewDate?: ValidationFunction<string>;
    InterviewSet?: ValidationFunction<boolean>;
    NotInterested?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type JobApplicationCreateFormOverridesProps = {
    JobApplicationCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    CoverLetter?: PrimitiveOverrideProps<TextFieldProps>;
    Role?: PrimitiveOverrideProps<TextFieldProps>;
    Town?: PrimitiveOverrideProps<TextFieldProps>;
    DOB?: PrimitiveOverrideProps<TextFieldProps>;
    Email?: PrimitiveOverrideProps<TextFieldProps>;
    Telephone?: PrimitiveOverrideProps<TextFieldProps>;
    PreviousExprience?: PrimitiveOverrideProps<TextFieldProps>;
    CV?: PrimitiveOverrideProps<TextFieldProps>;
    Age?: PrimitiveOverrideProps<TextFieldProps>;
    Interviewed?: PrimitiveOverrideProps<SwitchFieldProps>;
    InterviewNotes?: PrimitiveOverrideProps<TextFieldProps>;
    Offered?: PrimitiveOverrideProps<SwitchFieldProps>;
    InterviewTime?: PrimitiveOverrideProps<TextFieldProps>;
    InterviewDate?: PrimitiveOverrideProps<TextFieldProps>;
    InterviewSet?: PrimitiveOverrideProps<SwitchFieldProps>;
    NotInterested?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type JobApplicationCreateFormProps = React.PropsWithChildren<{
    overrides?: JobApplicationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: JobApplicationCreateFormInputValues) => JobApplicationCreateFormInputValues;
    onSuccess?: (fields: JobApplicationCreateFormInputValues) => void;
    onError?: (fields: JobApplicationCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: JobApplicationCreateFormInputValues) => JobApplicationCreateFormInputValues;
    onValidate?: JobApplicationCreateFormValidationValues;
} & React.CSSProperties>;
export default function JobApplicationCreateForm(props: JobApplicationCreateFormProps): React.ReactElement;
