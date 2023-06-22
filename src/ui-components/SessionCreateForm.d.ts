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
export declare type SessionCreateFormInputValues = {
    Name?: string;
    BookedArrivalTime?: string;
    Date?: string;
    Paid?: boolean;
    Table?: number;
    TimeLeftBranch?: string;
    TimeArrrived?: string;
    BookedExitTime?: string;
    AmountSpent?: number;
    TableOrders?: number;
};
export declare type SessionCreateFormValidationValues = {
    Name?: ValidationFunction<string>;
    BookedArrivalTime?: ValidationFunction<string>;
    Date?: ValidationFunction<string>;
    Paid?: ValidationFunction<boolean>;
    Table?: ValidationFunction<number>;
    TimeLeftBranch?: ValidationFunction<string>;
    TimeArrrived?: ValidationFunction<string>;
    BookedExitTime?: ValidationFunction<string>;
    AmountSpent?: ValidationFunction<number>;
    TableOrders?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SessionCreateFormOverridesProps = {
    SessionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    BookedArrivalTime?: PrimitiveOverrideProps<TextFieldProps>;
    Date?: PrimitiveOverrideProps<TextFieldProps>;
    Paid?: PrimitiveOverrideProps<SwitchFieldProps>;
    Table?: PrimitiveOverrideProps<TextFieldProps>;
    TimeLeftBranch?: PrimitiveOverrideProps<TextFieldProps>;
    TimeArrrived?: PrimitiveOverrideProps<TextFieldProps>;
    BookedExitTime?: PrimitiveOverrideProps<TextFieldProps>;
    AmountSpent?: PrimitiveOverrideProps<TextFieldProps>;
    TableOrders?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SessionCreateFormProps = React.PropsWithChildren<{
    overrides?: SessionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SessionCreateFormInputValues) => SessionCreateFormInputValues;
    onSuccess?: (fields: SessionCreateFormInputValues) => void;
    onError?: (fields: SessionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SessionCreateFormInputValues) => SessionCreateFormInputValues;
    onValidate?: SessionCreateFormValidationValues;
} & React.CSSProperties>;
export default function SessionCreateForm(props: SessionCreateFormProps): React.ReactElement;
