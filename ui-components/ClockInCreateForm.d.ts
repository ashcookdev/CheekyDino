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
export declare type ClockInCreateFormInputValues = {
    ClockIn?: string;
    ClockOut?: string;
    Sick?: boolean;
    Holiday?: string;
    StaffId?: string;
    TimeEntryId?: string;
    Date?: string;
    ClockedIn?: boolean;
    ClockedOut?: boolean;
    StaffName?: string;
    StaffRole?: string;
    Break?: boolean;
    BreakStart?: string;
    BreakEnd?: string;
};
export declare type ClockInCreateFormValidationValues = {
    ClockIn?: ValidationFunction<string>;
    ClockOut?: ValidationFunction<string>;
    Sick?: ValidationFunction<boolean>;
    Holiday?: ValidationFunction<string>;
    StaffId?: ValidationFunction<string>;
    TimeEntryId?: ValidationFunction<string>;
    Date?: ValidationFunction<string>;
    ClockedIn?: ValidationFunction<boolean>;
    ClockedOut?: ValidationFunction<boolean>;
    StaffName?: ValidationFunction<string>;
    StaffRole?: ValidationFunction<string>;
    Break?: ValidationFunction<boolean>;
    BreakStart?: ValidationFunction<string>;
    BreakEnd?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ClockInCreateFormOverridesProps = {
    ClockInCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ClockIn?: PrimitiveOverrideProps<TextFieldProps>;
    ClockOut?: PrimitiveOverrideProps<TextFieldProps>;
    Sick?: PrimitiveOverrideProps<SwitchFieldProps>;
    Holiday?: PrimitiveOverrideProps<TextFieldProps>;
    StaffId?: PrimitiveOverrideProps<TextFieldProps>;
    TimeEntryId?: PrimitiveOverrideProps<TextFieldProps>;
    Date?: PrimitiveOverrideProps<TextFieldProps>;
    ClockedIn?: PrimitiveOverrideProps<SwitchFieldProps>;
    ClockedOut?: PrimitiveOverrideProps<SwitchFieldProps>;
    StaffName?: PrimitiveOverrideProps<TextFieldProps>;
    StaffRole?: PrimitiveOverrideProps<TextFieldProps>;
    Break?: PrimitiveOverrideProps<SwitchFieldProps>;
    BreakStart?: PrimitiveOverrideProps<TextFieldProps>;
    BreakEnd?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ClockInCreateFormProps = React.PropsWithChildren<{
    overrides?: ClockInCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ClockInCreateFormInputValues) => ClockInCreateFormInputValues;
    onSuccess?: (fields: ClockInCreateFormInputValues) => void;
    onError?: (fields: ClockInCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ClockInCreateFormInputValues) => ClockInCreateFormInputValues;
    onValidate?: ClockInCreateFormValidationValues;
} & React.CSSProperties>;
export default function ClockInCreateForm(props: ClockInCreateFormProps): React.ReactElement;
