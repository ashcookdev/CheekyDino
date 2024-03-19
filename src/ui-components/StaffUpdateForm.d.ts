/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Staff } from "../models";
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
export declare type StaffUpdateFormInputValues = {
    Name?: string;
    Email?: string;
    TimeEntries?: string;
    Role?: string;
    HourlyRate?: number;
    StartDate?: string;
    Current?: boolean;
    Telephone?: string;
    ContractType?: string;
    EndDate?: string;
    Age?: string;
    DOB?: string;
    InterviewNotes?: string;
    Medical?: string;
    ApplicationID?: string;
};
export declare type StaffUpdateFormValidationValues = {
    Name?: ValidationFunction<string>;
    Email?: ValidationFunction<string>;
    TimeEntries?: ValidationFunction<string>;
    Role?: ValidationFunction<string>;
    HourlyRate?: ValidationFunction<number>;
    StartDate?: ValidationFunction<string>;
    Current?: ValidationFunction<boolean>;
    Telephone?: ValidationFunction<string>;
    ContractType?: ValidationFunction<string>;
    EndDate?: ValidationFunction<string>;
    Age?: ValidationFunction<string>;
    DOB?: ValidationFunction<string>;
    InterviewNotes?: ValidationFunction<string>;
    Medical?: ValidationFunction<string>;
    ApplicationID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StaffUpdateFormOverridesProps = {
    StaffUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    Email?: PrimitiveOverrideProps<TextFieldProps>;
    TimeEntries?: PrimitiveOverrideProps<TextFieldProps>;
    Role?: PrimitiveOverrideProps<TextFieldProps>;
    HourlyRate?: PrimitiveOverrideProps<TextFieldProps>;
    StartDate?: PrimitiveOverrideProps<TextFieldProps>;
    Current?: PrimitiveOverrideProps<SwitchFieldProps>;
    Telephone?: PrimitiveOverrideProps<TextFieldProps>;
    ContractType?: PrimitiveOverrideProps<TextFieldProps>;
    EndDate?: PrimitiveOverrideProps<TextFieldProps>;
    Age?: PrimitiveOverrideProps<TextFieldProps>;
    DOB?: PrimitiveOverrideProps<TextFieldProps>;
    InterviewNotes?: PrimitiveOverrideProps<TextFieldProps>;
    Medical?: PrimitiveOverrideProps<TextFieldProps>;
    ApplicationID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type StaffUpdateFormProps = React.PropsWithChildren<{
    overrides?: StaffUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    staff?: Staff;
    onSubmit?: (fields: StaffUpdateFormInputValues) => StaffUpdateFormInputValues;
    onSuccess?: (fields: StaffUpdateFormInputValues) => void;
    onError?: (fields: StaffUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: StaffUpdateFormInputValues) => StaffUpdateFormInputValues;
    onValidate?: StaffUpdateFormValidationValues;
} & React.CSSProperties>;
export default function StaffUpdateForm(props: StaffUpdateFormProps): React.ReactElement;
