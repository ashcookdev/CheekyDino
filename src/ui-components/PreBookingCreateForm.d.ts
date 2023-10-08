/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PreBookingCreateFormInputValues = {
    Name?: string;
    Email?: string;
    Date?: string;
    Adults?: string;
    Children?: string;
    Booked?: boolean;
};
export declare type PreBookingCreateFormValidationValues = {
    Name?: ValidationFunction<string>;
    Email?: ValidationFunction<string>;
    Date?: ValidationFunction<string>;
    Adults?: ValidationFunction<string>;
    Children?: ValidationFunction<string>;
    Booked?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PreBookingCreateFormOverridesProps = {
    PreBookingCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    Email?: PrimitiveOverrideProps<TextFieldProps>;
    Date?: PrimitiveOverrideProps<TextFieldProps>;
    Adults?: PrimitiveOverrideProps<TextFieldProps>;
    Children?: PrimitiveOverrideProps<TextFieldProps>;
    Booked?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type PreBookingCreateFormProps = React.PropsWithChildren<{
    overrides?: PreBookingCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PreBookingCreateFormInputValues) => PreBookingCreateFormInputValues;
    onSuccess?: (fields: PreBookingCreateFormInputValues) => void;
    onError?: (fields: PreBookingCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PreBookingCreateFormInputValues) => PreBookingCreateFormInputValues;
    onValidate?: PreBookingCreateFormValidationValues;
} & React.CSSProperties>;
export default function PreBookingCreateForm(props: PreBookingCreateFormProps): React.ReactElement;
