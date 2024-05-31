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
export declare type HolidayCreateFormInputValues = {
    Name?: string;
    StartDate?: string;
    Description?: string;
    EndDate?: string;
    Approved?: boolean;
};
export declare type HolidayCreateFormValidationValues = {
    Name?: ValidationFunction<string>;
    StartDate?: ValidationFunction<string>;
    Description?: ValidationFunction<string>;
    EndDate?: ValidationFunction<string>;
    Approved?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HolidayCreateFormOverridesProps = {
    HolidayCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    StartDate?: PrimitiveOverrideProps<TextFieldProps>;
    Description?: PrimitiveOverrideProps<TextFieldProps>;
    EndDate?: PrimitiveOverrideProps<TextFieldProps>;
    Approved?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type HolidayCreateFormProps = React.PropsWithChildren<{
    overrides?: HolidayCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HolidayCreateFormInputValues) => HolidayCreateFormInputValues;
    onSuccess?: (fields: HolidayCreateFormInputValues) => void;
    onError?: (fields: HolidayCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HolidayCreateFormInputValues) => HolidayCreateFormInputValues;
    onValidate?: HolidayCreateFormValidationValues;
} & React.CSSProperties>;
export default function HolidayCreateForm(props: HolidayCreateFormProps): React.ReactElement;
