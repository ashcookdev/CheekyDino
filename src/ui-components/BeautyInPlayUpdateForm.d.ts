/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { BeautyInPlay } from "../models";
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
export declare type BeautyInPlayUpdateFormInputValues = {
    AppointmentTime?: string;
    AppointmentDate?: string;
    Treatment?: string;
    Total?: string;
};
export declare type BeautyInPlayUpdateFormValidationValues = {
    AppointmentTime?: ValidationFunction<string>;
    AppointmentDate?: ValidationFunction<string>;
    Treatment?: ValidationFunction<string>;
    Total?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BeautyInPlayUpdateFormOverridesProps = {
    BeautyInPlayUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    AppointmentTime?: PrimitiveOverrideProps<TextFieldProps>;
    AppointmentDate?: PrimitiveOverrideProps<TextFieldProps>;
    Treatment?: PrimitiveOverrideProps<TextFieldProps>;
    Total?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BeautyInPlayUpdateFormProps = React.PropsWithChildren<{
    overrides?: BeautyInPlayUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    beautyInPlay?: BeautyInPlay;
    onSubmit?: (fields: BeautyInPlayUpdateFormInputValues) => BeautyInPlayUpdateFormInputValues;
    onSuccess?: (fields: BeautyInPlayUpdateFormInputValues) => void;
    onError?: (fields: BeautyInPlayUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BeautyInPlayUpdateFormInputValues) => BeautyInPlayUpdateFormInputValues;
    onValidate?: BeautyInPlayUpdateFormValidationValues;
} & React.CSSProperties>;
export default function BeautyInPlayUpdateForm(props: BeautyInPlayUpdateFormProps): React.ReactElement;
