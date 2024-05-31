/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type AdminCreateFormInputValues = {
    Monday?: string;
    Tuesday?: string;
    Wednesday?: string;
    Thursday?: string;
    Friday?: string;
    Saturday?: string;
    Sunday?: string;
    TableData?: string;
    SessionPriceList?: string;
    AdultPrice?: string;
    CalculationCode?: string;
    PartyPriceList?: string;
    UpdateURL?: string;
    ClosedDates?: string[];
    PartyTimeslots?: string;
    DefaultSlots?: string;
};
export declare type AdminCreateFormValidationValues = {
    Monday?: ValidationFunction<string>;
    Tuesday?: ValidationFunction<string>;
    Wednesday?: ValidationFunction<string>;
    Thursday?: ValidationFunction<string>;
    Friday?: ValidationFunction<string>;
    Saturday?: ValidationFunction<string>;
    Sunday?: ValidationFunction<string>;
    TableData?: ValidationFunction<string>;
    SessionPriceList?: ValidationFunction<string>;
    AdultPrice?: ValidationFunction<string>;
    CalculationCode?: ValidationFunction<string>;
    PartyPriceList?: ValidationFunction<string>;
    UpdateURL?: ValidationFunction<string>;
    ClosedDates?: ValidationFunction<string>;
    PartyTimeslots?: ValidationFunction<string>;
    DefaultSlots?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AdminCreateFormOverridesProps = {
    AdminCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Monday?: PrimitiveOverrideProps<TextAreaFieldProps>;
    Tuesday?: PrimitiveOverrideProps<TextAreaFieldProps>;
    Wednesday?: PrimitiveOverrideProps<TextAreaFieldProps>;
    Thursday?: PrimitiveOverrideProps<TextAreaFieldProps>;
    Friday?: PrimitiveOverrideProps<TextAreaFieldProps>;
    Saturday?: PrimitiveOverrideProps<TextAreaFieldProps>;
    Sunday?: PrimitiveOverrideProps<TextAreaFieldProps>;
    TableData?: PrimitiveOverrideProps<TextAreaFieldProps>;
    SessionPriceList?: PrimitiveOverrideProps<TextAreaFieldProps>;
    AdultPrice?: PrimitiveOverrideProps<TextFieldProps>;
    CalculationCode?: PrimitiveOverrideProps<TextAreaFieldProps>;
    PartyPriceList?: PrimitiveOverrideProps<TextAreaFieldProps>;
    UpdateURL?: PrimitiveOverrideProps<TextFieldProps>;
    ClosedDates?: PrimitiveOverrideProps<TextFieldProps>;
    PartyTimeslots?: PrimitiveOverrideProps<TextAreaFieldProps>;
    DefaultSlots?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type AdminCreateFormProps = React.PropsWithChildren<{
    overrides?: AdminCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AdminCreateFormInputValues) => AdminCreateFormInputValues;
    onSuccess?: (fields: AdminCreateFormInputValues) => void;
    onError?: (fields: AdminCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AdminCreateFormInputValues) => AdminCreateFormInputValues;
    onValidate?: AdminCreateFormValidationValues;
} & React.CSSProperties>;
export default function AdminCreateForm(props: AdminCreateFormProps): React.ReactElement;
