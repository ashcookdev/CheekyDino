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
export declare type KitchenLayoutCreateFormInputValues = {
    Name?: string;
    Amount?: number;
    Items?: string[];
};
export declare type KitchenLayoutCreateFormValidationValues = {
    Name?: ValidationFunction<string>;
    Amount?: ValidationFunction<number>;
    Items?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type KitchenLayoutCreateFormOverridesProps = {
    KitchenLayoutCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    Amount?: PrimitiveOverrideProps<TextFieldProps>;
    Items?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type KitchenLayoutCreateFormProps = React.PropsWithChildren<{
    overrides?: KitchenLayoutCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: KitchenLayoutCreateFormInputValues) => KitchenLayoutCreateFormInputValues;
    onSuccess?: (fields: KitchenLayoutCreateFormInputValues) => void;
    onError?: (fields: KitchenLayoutCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: KitchenLayoutCreateFormInputValues) => KitchenLayoutCreateFormInputValues;
    onValidate?: KitchenLayoutCreateFormValidationValues;
} & React.CSSProperties>;
export default function KitchenLayoutCreateForm(props: KitchenLayoutCreateFormProps): React.ReactElement;
