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
export declare type HotDogsCreateFormInputValues = {
    CreatedTime?: string;
    CreatedDate?: string;
    StockLevel?: number;
    Price?: number;
};
export declare type HotDogsCreateFormValidationValues = {
    CreatedTime?: ValidationFunction<string>;
    CreatedDate?: ValidationFunction<string>;
    StockLevel?: ValidationFunction<number>;
    Price?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HotDogsCreateFormOverridesProps = {
    HotDogsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    CreatedTime?: PrimitiveOverrideProps<TextFieldProps>;
    CreatedDate?: PrimitiveOverrideProps<TextFieldProps>;
    StockLevel?: PrimitiveOverrideProps<TextFieldProps>;
    Price?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HotDogsCreateFormProps = React.PropsWithChildren<{
    overrides?: HotDogsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HotDogsCreateFormInputValues) => HotDogsCreateFormInputValues;
    onSuccess?: (fields: HotDogsCreateFormInputValues) => void;
    onError?: (fields: HotDogsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HotDogsCreateFormInputValues) => HotDogsCreateFormInputValues;
    onValidate?: HotDogsCreateFormValidationValues;
} & React.CSSProperties>;
export default function HotDogsCreateForm(props: HotDogsCreateFormProps): React.ReactElement;
