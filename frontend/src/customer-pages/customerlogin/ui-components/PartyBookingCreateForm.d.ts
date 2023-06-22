/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PartyBookingCreateFormInputValues = {
    ChildName?: string;
    ChildAge?: number;
    NoOfChildren?: number;
    FoodOptionSelected?: string;
    AdultHotFoodQty?: number;
    AdultColdFoodQty?: number;
    Total?: number;
};
export declare type PartyBookingCreateFormValidationValues = {
    ChildName?: ValidationFunction<string>;
    ChildAge?: ValidationFunction<number>;
    NoOfChildren?: ValidationFunction<number>;
    FoodOptionSelected?: ValidationFunction<string>;
    AdultHotFoodQty?: ValidationFunction<number>;
    AdultColdFoodQty?: ValidationFunction<number>;
    Total?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PartyBookingCreateFormOverridesProps = {
    PartyBookingCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ChildName?: PrimitiveOverrideProps<TextFieldProps>;
    ChildAge?: PrimitiveOverrideProps<TextFieldProps>;
    NoOfChildren?: PrimitiveOverrideProps<TextFieldProps>;
    FoodOptionSelected?: PrimitiveOverrideProps<TextFieldProps>;
    AdultHotFoodQty?: PrimitiveOverrideProps<TextFieldProps>;
    AdultColdFoodQty?: PrimitiveOverrideProps<TextFieldProps>;
    Total?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PartyBookingCreateFormProps = React.PropsWithChildren<{
    overrides?: PartyBookingCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PartyBookingCreateFormInputValues) => PartyBookingCreateFormInputValues;
    onSuccess?: (fields: PartyBookingCreateFormInputValues) => void;
    onError?: (fields: PartyBookingCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PartyBookingCreateFormInputValues) => PartyBookingCreateFormInputValues;
    onValidate?: PartyBookingCreateFormValidationValues;
} & React.CSSProperties>;
export default function PartyBookingCreateForm(props: PartyBookingCreateFormProps): React.ReactElement;
