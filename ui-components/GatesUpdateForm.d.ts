/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Gates } from "../models";
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
export declare type GatesUpdateFormInputValues = {
    content?: number;
};
export declare type GatesUpdateFormValidationValues = {
    content?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GatesUpdateFormOverridesProps = {
    GatesUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type GatesUpdateFormProps = React.PropsWithChildren<{
    overrides?: GatesUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    gates?: Gates;
    onSubmit?: (fields: GatesUpdateFormInputValues) => GatesUpdateFormInputValues;
    onSuccess?: (fields: GatesUpdateFormInputValues) => void;
    onError?: (fields: GatesUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GatesUpdateFormInputValues) => GatesUpdateFormInputValues;
    onValidate?: GatesUpdateFormValidationValues;
} & React.CSSProperties>;
export default function GatesUpdateForm(props: GatesUpdateFormProps): React.ReactElement;
