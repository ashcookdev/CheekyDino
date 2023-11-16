/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type TimeEntryCreateFormInputValues = {
    StaffID?: string;
    Hours?: number;
    Dates?: string[];
    ShiftStart?: string[];
    ShiftFinish?: string[];
    Month?: string;
    StaffName?: string;
    Holiday?: string[];
};
export declare type TimeEntryCreateFormValidationValues = {
    StaffID?: ValidationFunction<string>;
    Hours?: ValidationFunction<number>;
    Dates?: ValidationFunction<string>;
    ShiftStart?: ValidationFunction<string>;
    ShiftFinish?: ValidationFunction<string>;
    Month?: ValidationFunction<string>;
    StaffName?: ValidationFunction<string>;
    Holiday?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TimeEntryCreateFormOverridesProps = {
    TimeEntryCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    StaffID?: PrimitiveOverrideProps<TextFieldProps>;
    Hours?: PrimitiveOverrideProps<TextFieldProps>;
    Dates?: PrimitiveOverrideProps<TextFieldProps>;
    ShiftStart?: PrimitiveOverrideProps<TextFieldProps>;
    ShiftFinish?: PrimitiveOverrideProps<TextFieldProps>;
    Month?: PrimitiveOverrideProps<TextFieldProps>;
    StaffName?: PrimitiveOverrideProps<TextFieldProps>;
    Holiday?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TimeEntryCreateFormProps = React.PropsWithChildren<{
    overrides?: TimeEntryCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TimeEntryCreateFormInputValues) => TimeEntryCreateFormInputValues;
    onSuccess?: (fields: TimeEntryCreateFormInputValues) => void;
    onError?: (fields: TimeEntryCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TimeEntryCreateFormInputValues) => TimeEntryCreateFormInputValues;
    onValidate?: TimeEntryCreateFormValidationValues;
} & React.CSSProperties>;
export default function TimeEntryCreateForm(props: TimeEntryCreateFormProps): React.ReactElement;
