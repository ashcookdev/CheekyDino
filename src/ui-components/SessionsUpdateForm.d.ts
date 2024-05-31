/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Sessions } from "../models";
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
export declare type SessionsUpdateFormInputValues = {
    Name?: string;
    Email?: string;
    TimeslotFrom?: string;
    TimeslotTo?: string;
    TimeLeft?: string;
    TimeArrived?: string;
    Date?: string;
    Table?: number;
    Orders?: number;
    Prepaid?: boolean;
    TotalSpent?: number;
    Adults?: number;
    Children?: number;
    Arrived?: boolean;
    LeftCenter?: boolean;
    ExtraTables?: number;
    Telephone?: string;
    orderid?: string[];
    Staff?: string;
    CustomerbookingID?: string;
    Event?: boolean;
    EventID?: string;
    EventName?: string;
    PaymentAuth?: string;
    PaymentMethod?: string;
    EntranceFee?: number;
    CleanTable?: boolean;
    ChildData?: string;
    TableCleaned?: boolean;
    AcceptedTerms?: boolean;
    EmailSubscription?: boolean;
    CarReg?: string;
};
export declare type SessionsUpdateFormValidationValues = {
    Name?: ValidationFunction<string>;
    Email?: ValidationFunction<string>;
    TimeslotFrom?: ValidationFunction<string>;
    TimeslotTo?: ValidationFunction<string>;
    TimeLeft?: ValidationFunction<string>;
    TimeArrived?: ValidationFunction<string>;
    Date?: ValidationFunction<string>;
    Table?: ValidationFunction<number>;
    Orders?: ValidationFunction<number>;
    Prepaid?: ValidationFunction<boolean>;
    TotalSpent?: ValidationFunction<number>;
    Adults?: ValidationFunction<number>;
    Children?: ValidationFunction<number>;
    Arrived?: ValidationFunction<boolean>;
    LeftCenter?: ValidationFunction<boolean>;
    ExtraTables?: ValidationFunction<number>;
    Telephone?: ValidationFunction<string>;
    orderid?: ValidationFunction<string>;
    Staff?: ValidationFunction<string>;
    CustomerbookingID?: ValidationFunction<string>;
    Event?: ValidationFunction<boolean>;
    EventID?: ValidationFunction<string>;
    EventName?: ValidationFunction<string>;
    PaymentAuth?: ValidationFunction<string>;
    PaymentMethod?: ValidationFunction<string>;
    EntranceFee?: ValidationFunction<number>;
    CleanTable?: ValidationFunction<boolean>;
    ChildData?: ValidationFunction<string>;
    TableCleaned?: ValidationFunction<boolean>;
    AcceptedTerms?: ValidationFunction<boolean>;
    EmailSubscription?: ValidationFunction<boolean>;
    CarReg?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SessionsUpdateFormOverridesProps = {
    SessionsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    Email?: PrimitiveOverrideProps<TextFieldProps>;
    TimeslotFrom?: PrimitiveOverrideProps<TextFieldProps>;
    TimeslotTo?: PrimitiveOverrideProps<TextFieldProps>;
    TimeLeft?: PrimitiveOverrideProps<TextFieldProps>;
    TimeArrived?: PrimitiveOverrideProps<TextFieldProps>;
    Date?: PrimitiveOverrideProps<TextFieldProps>;
    Table?: PrimitiveOverrideProps<TextFieldProps>;
    Orders?: PrimitiveOverrideProps<TextFieldProps>;
    Prepaid?: PrimitiveOverrideProps<SwitchFieldProps>;
    TotalSpent?: PrimitiveOverrideProps<TextFieldProps>;
    Adults?: PrimitiveOverrideProps<TextFieldProps>;
    Children?: PrimitiveOverrideProps<TextFieldProps>;
    Arrived?: PrimitiveOverrideProps<SwitchFieldProps>;
    LeftCenter?: PrimitiveOverrideProps<SwitchFieldProps>;
    ExtraTables?: PrimitiveOverrideProps<TextFieldProps>;
    Telephone?: PrimitiveOverrideProps<TextFieldProps>;
    orderid?: PrimitiveOverrideProps<TextFieldProps>;
    Staff?: PrimitiveOverrideProps<TextFieldProps>;
    CustomerbookingID?: PrimitiveOverrideProps<TextFieldProps>;
    Event?: PrimitiveOverrideProps<SwitchFieldProps>;
    EventID?: PrimitiveOverrideProps<TextFieldProps>;
    EventName?: PrimitiveOverrideProps<TextFieldProps>;
    PaymentAuth?: PrimitiveOverrideProps<TextFieldProps>;
    PaymentMethod?: PrimitiveOverrideProps<TextFieldProps>;
    EntranceFee?: PrimitiveOverrideProps<TextFieldProps>;
    CleanTable?: PrimitiveOverrideProps<SwitchFieldProps>;
    ChildData?: PrimitiveOverrideProps<TextAreaFieldProps>;
    TableCleaned?: PrimitiveOverrideProps<SwitchFieldProps>;
    AcceptedTerms?: PrimitiveOverrideProps<SwitchFieldProps>;
    EmailSubscription?: PrimitiveOverrideProps<SwitchFieldProps>;
    CarReg?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SessionsUpdateFormProps = React.PropsWithChildren<{
    overrides?: SessionsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    sessions?: Sessions;
    onSubmit?: (fields: SessionsUpdateFormInputValues) => SessionsUpdateFormInputValues;
    onSuccess?: (fields: SessionsUpdateFormInputValues) => void;
    onError?: (fields: SessionsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SessionsUpdateFormInputValues) => SessionsUpdateFormInputValues;
    onValidate?: SessionsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SessionsUpdateForm(props: SessionsUpdateFormProps): React.ReactElement;
