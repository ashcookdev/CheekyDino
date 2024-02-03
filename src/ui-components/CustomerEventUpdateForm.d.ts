/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { CustomerEvent } from "../models";
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
export declare type CustomerEventUpdateFormInputValues = {
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
export declare type CustomerEventUpdateFormValidationValues = {
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
export declare type CustomerEventUpdateFormOverridesProps = {
    CustomerEventUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type CustomerEventUpdateFormProps = React.PropsWithChildren<{
    overrides?: CustomerEventUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    customerEvent?: CustomerEvent;
    onSubmit?: (fields: CustomerEventUpdateFormInputValues) => CustomerEventUpdateFormInputValues;
    onSuccess?: (fields: CustomerEventUpdateFormInputValues) => void;
    onError?: (fields: CustomerEventUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CustomerEventUpdateFormInputValues) => CustomerEventUpdateFormInputValues;
    onValidate?: CustomerEventUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CustomerEventUpdateForm(props: CustomerEventUpdateFormProps): React.ReactElement;
