/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type FoodReadyCreateFormInputValues = {
    Message?: string;
    Ready?: boolean;
};
export declare type FoodReadyCreateFormValidationValues = {
    Message?: ValidationFunction<string>;
    Ready?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FoodReadyCreateFormOverridesProps = {
    FoodReadyCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Message?: PrimitiveOverrideProps<TextFieldProps>;
    Ready?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type FoodReadyCreateFormProps = React.PropsWithChildren<{
    overrides?: FoodReadyCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: FoodReadyCreateFormInputValues) => FoodReadyCreateFormInputValues;
    onSuccess?: (fields: FoodReadyCreateFormInputValues) => void;
    onError?: (fields: FoodReadyCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FoodReadyCreateFormInputValues) => FoodReadyCreateFormInputValues;
    onValidate?: FoodReadyCreateFormValidationValues;
} & React.CSSProperties>;
export default function FoodReadyCreateForm(props: FoodReadyCreateFormProps): React.ReactElement;
