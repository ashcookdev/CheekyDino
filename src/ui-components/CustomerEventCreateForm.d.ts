/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type CustomerEventCreateFormInputValues = {
    EventName?: string;
    EventDate?: string;
    EventTime?: string;
    CustomerName?: string;
    Children?: string;
    Adults?: string;
    Table?: string;
    FoodOptions?: string;
    Total?: number;
    Email?: string;
    Telephone?: string;
    FoodOption?: boolean;
};
export declare type CustomerEventCreateFormValidationValues = {
    EventName?: ValidationFunction<string>;
    EventDate?: ValidationFunction<string>;
    EventTime?: ValidationFunction<string>;
    CustomerName?: ValidationFunction<string>;
    Children?: ValidationFunction<string>;
    Adults?: ValidationFunction<string>;
    Table?: ValidationFunction<string>;
    FoodOptions?: ValidationFunction<string>;
    Total?: ValidationFunction<number>;
    Email?: ValidationFunction<string>;
    Telephone?: ValidationFunction<string>;
    FoodOption?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CustomerEventCreateFormOverridesProps = {
    CustomerEventCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    EventName?: PrimitiveOverrideProps<TextFieldProps>;
    EventDate?: PrimitiveOverrideProps<TextFieldProps>;
    EventTime?: PrimitiveOverrideProps<TextFieldProps>;
    CustomerName?: PrimitiveOverrideProps<TextFieldProps>;
    Children?: PrimitiveOverrideProps<TextFieldProps>;
    Adults?: PrimitiveOverrideProps<TextFieldProps>;
    Table?: PrimitiveOverrideProps<TextFieldProps>;
    FoodOptions?: PrimitiveOverrideProps<TextAreaFieldProps>;
    Total?: PrimitiveOverrideProps<TextFieldProps>;
    Email?: PrimitiveOverrideProps<TextFieldProps>;
    Telephone?: PrimitiveOverrideProps<TextFieldProps>;
    FoodOption?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type CustomerEventCreateFormProps = React.PropsWithChildren<{
    overrides?: CustomerEventCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CustomerEventCreateFormInputValues) => CustomerEventCreateFormInputValues;
    onSuccess?: (fields: CustomerEventCreateFormInputValues) => void;
    onError?: (fields: CustomerEventCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CustomerEventCreateFormInputValues) => CustomerEventCreateFormInputValues;
    onValidate?: CustomerEventCreateFormValidationValues;
} & React.CSSProperties>;
export default function CustomerEventCreateForm(props: CustomerEventCreateFormProps): React.ReactElement;
