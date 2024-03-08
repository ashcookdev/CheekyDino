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
export declare type BeautyInPlayCreateFormInputValues = {
    AppointmentTime?: string;
    AppointmentDate?: string;
    Treatment?: string;
    Total?: string;
};
export declare type BeautyInPlayCreateFormValidationValues = {
    AppointmentTime?: ValidationFunction<string>;
    AppointmentDate?: ValidationFunction<string>;
    Treatment?: ValidationFunction<string>;
    Total?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BeautyInPlayCreateFormOverridesProps = {
    BeautyInPlayCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    AppointmentTime?: PrimitiveOverrideProps<TextFieldProps>;
    AppointmentDate?: PrimitiveOverrideProps<TextFieldProps>;
    Treatment?: PrimitiveOverrideProps<TextFieldProps>;
    Total?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BeautyInPlayCreateFormProps = React.PropsWithChildren<{
    overrides?: BeautyInPlayCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: BeautyInPlayCreateFormInputValues) => BeautyInPlayCreateFormInputValues;
    onSuccess?: (fields: BeautyInPlayCreateFormInputValues) => void;
    onError?: (fields: BeautyInPlayCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BeautyInPlayCreateFormInputValues) => BeautyInPlayCreateFormInputValues;
    onValidate?: BeautyInPlayCreateFormValidationValues;
} & React.CSSProperties>;
export default function BeautyInPlayCreateForm(props: BeautyInPlayCreateFormProps): React.ReactElement;
