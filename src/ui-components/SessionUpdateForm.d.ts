/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Session } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SessionUpdateFormInputValues = {
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
export declare type SessionUpdateFormValidationValues = {
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
export declare type SessionUpdateFormOverridesProps = {
    SessionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type SessionUpdateFormProps = React.PropsWithChildren<{
    overrides?: SessionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    session?: Session;
    onSubmit?: (fields: SessionUpdateFormInputValues) => SessionUpdateFormInputValues;
    onSuccess?: (fields: SessionUpdateFormInputValues) => void;
    onError?: (fields: SessionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SessionUpdateFormInputValues) => SessionUpdateFormInputValues;
    onValidate?: SessionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SessionUpdateForm(props: SessionUpdateFormProps): React.ReactElement;
