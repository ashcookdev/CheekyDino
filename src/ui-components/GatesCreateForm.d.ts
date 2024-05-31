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
export declare type GatesCreateFormInputValues = {
    content?: number;
};
export declare type GatesCreateFormValidationValues = {
    content?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GatesCreateFormOverridesProps = {
    GatesCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type GatesCreateFormProps = React.PropsWithChildren<{
    overrides?: GatesCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: GatesCreateFormInputValues) => GatesCreateFormInputValues;
    onSuccess?: (fields: GatesCreateFormInputValues) => void;
    onError?: (fields: GatesCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GatesCreateFormInputValues) => GatesCreateFormInputValues;
    onValidate?: GatesCreateFormValidationValues;
} & React.CSSProperties>;
export default function GatesCreateForm(props: GatesCreateFormProps): React.ReactElement;
