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
export declare type TimeEntryCreateFormInputValues = {
    StaffID?: string;
    ClockInTime?: string;
    ClockOutTime?: string;
    Hours?: number;
    Date?: string;
    ShiftStart?: string;
    ShiftFinish?: string;
};
export declare type TimeEntryCreateFormValidationValues = {
    StaffID?: ValidationFunction<string>;
    ClockInTime?: ValidationFunction<string>;
    ClockOutTime?: ValidationFunction<string>;
    Hours?: ValidationFunction<number>;
    Date?: ValidationFunction<string>;
    ShiftStart?: ValidationFunction<string>;
    ShiftFinish?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TimeEntryCreateFormOverridesProps = {
    TimeEntryCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    StaffID?: PrimitiveOverrideProps<TextFieldProps>;
    ClockInTime?: PrimitiveOverrideProps<TextFieldProps>;
    ClockOutTime?: PrimitiveOverrideProps<TextFieldProps>;
    Hours?: PrimitiveOverrideProps<TextFieldProps>;
    Date?: PrimitiveOverrideProps<TextFieldProps>;
    ShiftStart?: PrimitiveOverrideProps<TextFieldProps>;
    ShiftFinish?: PrimitiveOverrideProps<TextFieldProps>;
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
