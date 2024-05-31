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
export declare type CustomerEnquiriesCreateFormInputValues = {
    To?: string;
    Content?: string;
    Replied?: boolean;
    From?: string;
    Marketing?: boolean;
    ToMarketing?: string[];
};
export declare type CustomerEnquiriesCreateFormValidationValues = {
    To?: ValidationFunction<string>;
    Content?: ValidationFunction<string>;
    Replied?: ValidationFunction<boolean>;
    From?: ValidationFunction<string>;
    Marketing?: ValidationFunction<boolean>;
    ToMarketing?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CustomerEnquiriesCreateFormOverridesProps = {
    CustomerEnquiriesCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    To?: PrimitiveOverrideProps<TextFieldProps>;
    Content?: PrimitiveOverrideProps<TextFieldProps>;
    Replied?: PrimitiveOverrideProps<SwitchFieldProps>;
    From?: PrimitiveOverrideProps<TextFieldProps>;
    Marketing?: PrimitiveOverrideProps<SwitchFieldProps>;
    ToMarketing?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CustomerEnquiriesCreateFormProps = React.PropsWithChildren<{
    overrides?: CustomerEnquiriesCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CustomerEnquiriesCreateFormInputValues) => CustomerEnquiriesCreateFormInputValues;
    onSuccess?: (fields: CustomerEnquiriesCreateFormInputValues) => void;
    onError?: (fields: CustomerEnquiriesCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CustomerEnquiriesCreateFormInputValues) => CustomerEnquiriesCreateFormInputValues;
    onValidate?: CustomerEnquiriesCreateFormValidationValues;
} & React.CSSProperties>;
export default function CustomerEnquiriesCreateForm(props: CustomerEnquiriesCreateFormProps): React.ReactElement;
