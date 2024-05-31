/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Messages } from "../models";
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
export declare type MessagesUpdateFormInputValues = {
    content?: string;
    createdAt?: string;
    email?: string;
    group?: string[];
    orderID?: string;
    sessionID?: string;
    partyID?: string;
    delivered?: boolean;
    FoodReady?: boolean;
    FoodDelivered?: boolean;
};
export declare type MessagesUpdateFormValidationValues = {
    content?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    group?: ValidationFunction<string>;
    orderID?: ValidationFunction<string>;
    sessionID?: ValidationFunction<string>;
    partyID?: ValidationFunction<string>;
    delivered?: ValidationFunction<boolean>;
    FoodReady?: ValidationFunction<boolean>;
    FoodDelivered?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MessagesUpdateFormOverridesProps = {
    MessagesUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    group?: PrimitiveOverrideProps<TextFieldProps>;
    orderID?: PrimitiveOverrideProps<TextFieldProps>;
    sessionID?: PrimitiveOverrideProps<TextFieldProps>;
    partyID?: PrimitiveOverrideProps<TextFieldProps>;
    delivered?: PrimitiveOverrideProps<SwitchFieldProps>;
    FoodReady?: PrimitiveOverrideProps<SwitchFieldProps>;
    FoodDelivered?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type MessagesUpdateFormProps = React.PropsWithChildren<{
    overrides?: MessagesUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    messages?: Messages;
    onSubmit?: (fields: MessagesUpdateFormInputValues) => MessagesUpdateFormInputValues;
    onSuccess?: (fields: MessagesUpdateFormInputValues) => void;
    onError?: (fields: MessagesUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MessagesUpdateFormInputValues) => MessagesUpdateFormInputValues;
    onValidate?: MessagesUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MessagesUpdateForm(props: MessagesUpdateFormProps): React.ReactElement;
