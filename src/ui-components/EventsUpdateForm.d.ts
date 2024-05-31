/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Events } from "../models";
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
export declare type EventsUpdateFormInputValues = {
    Name?: string;
    Description?: string;
    Food?: boolean;
    StartTime?: string;
    Date?: string;
    Tables?: number;
    KidsPrice?: number;
    Image?: string;
    AdultMenu?: string;
    KidsMenu?: string;
    EndTime?: string;
    AdultPrice?: string;
    Price2?: number;
    Price3?: number;
    TicketsSold?: number;
    CalibrateStock?: boolean;
    Total?: number;
    PaymentAuth?: string;
};
export declare type EventsUpdateFormValidationValues = {
    Name?: ValidationFunction<string>;
    Description?: ValidationFunction<string>;
    Food?: ValidationFunction<boolean>;
    StartTime?: ValidationFunction<string>;
    Date?: ValidationFunction<string>;
    Tables?: ValidationFunction<number>;
    KidsPrice?: ValidationFunction<number>;
    Image?: ValidationFunction<string>;
    AdultMenu?: ValidationFunction<string>;
    KidsMenu?: ValidationFunction<string>;
    EndTime?: ValidationFunction<string>;
    AdultPrice?: ValidationFunction<string>;
    Price2?: ValidationFunction<number>;
    Price3?: ValidationFunction<number>;
    TicketsSold?: ValidationFunction<number>;
    CalibrateStock?: ValidationFunction<boolean>;
    Total?: ValidationFunction<number>;
    PaymentAuth?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EventsUpdateFormOverridesProps = {
    EventsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    Description?: PrimitiveOverrideProps<TextFieldProps>;
    Food?: PrimitiveOverrideProps<SwitchFieldProps>;
    StartTime?: PrimitiveOverrideProps<TextFieldProps>;
    Date?: PrimitiveOverrideProps<TextFieldProps>;
    Tables?: PrimitiveOverrideProps<TextFieldProps>;
    KidsPrice?: PrimitiveOverrideProps<TextFieldProps>;
    Image?: PrimitiveOverrideProps<TextFieldProps>;
    AdultMenu?: PrimitiveOverrideProps<TextAreaFieldProps>;
    KidsMenu?: PrimitiveOverrideProps<TextAreaFieldProps>;
    EndTime?: PrimitiveOverrideProps<TextFieldProps>;
    AdultPrice?: PrimitiveOverrideProps<TextFieldProps>;
    Price2?: PrimitiveOverrideProps<TextFieldProps>;
    Price3?: PrimitiveOverrideProps<TextFieldProps>;
    TicketsSold?: PrimitiveOverrideProps<TextFieldProps>;
    CalibrateStock?: PrimitiveOverrideProps<SwitchFieldProps>;
    Total?: PrimitiveOverrideProps<TextFieldProps>;
    PaymentAuth?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EventsUpdateFormProps = React.PropsWithChildren<{
    overrides?: EventsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    events?: Events;
    onSubmit?: (fields: EventsUpdateFormInputValues) => EventsUpdateFormInputValues;
    onSuccess?: (fields: EventsUpdateFormInputValues) => void;
    onError?: (fields: EventsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EventsUpdateFormInputValues) => EventsUpdateFormInputValues;
    onValidate?: EventsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EventsUpdateForm(props: EventsUpdateFormProps): React.ReactElement;
