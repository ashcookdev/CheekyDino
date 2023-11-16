/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { ClockIn as ClockIn0 } from "../models";
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
export declare type ClockInUpdateFormInputValues = {
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
export declare type ClockInUpdateFormValidationValues = {
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
export declare type ClockInUpdateFormOverridesProps = {
    ClockInUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type ClockInUpdateFormProps = React.PropsWithChildren<{
    overrides?: ClockInUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    clockIn?: ClockIn0;
    onSubmit?: (fields: ClockInUpdateFormInputValues) => ClockInUpdateFormInputValues;
    onSuccess?: (fields: ClockInUpdateFormInputValues) => void;
    onError?: (fields: ClockInUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ClockInUpdateFormInputValues) => ClockInUpdateFormInputValues;
    onValidate?: ClockInUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ClockInUpdateForm(props: ClockInUpdateFormProps): React.ReactElement;
