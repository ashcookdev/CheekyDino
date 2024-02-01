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
export declare type StockControlCreateFormInputValues = {
    Name?: string;
    Weight?: number;
    Quantity?: number;
    Price?: number;
    PreVAT?: number;
    Supplier?: string;
    VAT?: number;
    CurrentStockLevel?: number;
    Cases?: number;
    ProductId?: string;
    NewPrice?: number;
    NewVAT?: number;
    UsedBy?: string;
    MatchCode?: string;
};
export declare type StockControlCreateFormValidationValues = {
    Name?: ValidationFunction<string>;
    Weight?: ValidationFunction<number>;
    Quantity?: ValidationFunction<number>;
    Price?: ValidationFunction<number>;
    PreVAT?: ValidationFunction<number>;
    Supplier?: ValidationFunction<string>;
    VAT?: ValidationFunction<number>;
    CurrentStockLevel?: ValidationFunction<number>;
    Cases?: ValidationFunction<number>;
    ProductId?: ValidationFunction<string>;
    NewPrice?: ValidationFunction<number>;
    NewVAT?: ValidationFunction<number>;
    UsedBy?: ValidationFunction<string>;
    MatchCode?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StockControlCreateFormOverridesProps = {
    StockControlCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    Weight?: PrimitiveOverrideProps<TextFieldProps>;
    Quantity?: PrimitiveOverrideProps<TextFieldProps>;
    Price?: PrimitiveOverrideProps<TextFieldProps>;
    PreVAT?: PrimitiveOverrideProps<TextFieldProps>;
    Supplier?: PrimitiveOverrideProps<TextFieldProps>;
    VAT?: PrimitiveOverrideProps<TextFieldProps>;
    CurrentStockLevel?: PrimitiveOverrideProps<TextFieldProps>;
    Cases?: PrimitiveOverrideProps<TextFieldProps>;
    ProductId?: PrimitiveOverrideProps<TextFieldProps>;
    NewPrice?: PrimitiveOverrideProps<TextFieldProps>;
    NewVAT?: PrimitiveOverrideProps<TextFieldProps>;
    UsedBy?: PrimitiveOverrideProps<TextFieldProps>;
    MatchCode?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type StockControlCreateFormProps = React.PropsWithChildren<{
    overrides?: StockControlCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: StockControlCreateFormInputValues) => StockControlCreateFormInputValues;
    onSuccess?: (fields: StockControlCreateFormInputValues) => void;
    onError?: (fields: StockControlCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: StockControlCreateFormInputValues) => StockControlCreateFormInputValues;
    onValidate?: StockControlCreateFormValidationValues;
} & React.CSSProperties>;
export default function StockControlCreateForm(props: StockControlCreateFormProps): React.ReactElement;
