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
export declare type PartyBookingCreateFormInputValues = {
    ChildName?: string;
    ChildAge?: number;
    NoOfChildren?: number;
    FoodOptionSelected?: string;
    AdultHotFoodQty?: string;
    AdultColdFoodQty?: string;
    Total?: number;
    partybookingID?: string;
    PartyFoodComplete?: boolean;
    LeftBranch?: boolean;
    CurrentGuests?: number;
    LeftBranchTime?: string;
    Table?: number;
    PartyFoodDelivered?: boolean;
    AmountPaid?: string;
    PartyAdultFoodChoices?: string[];
    Email?: string;
    Telephone?: string;
    CalibrateStock?: boolean;
};
export declare type PartyBookingCreateFormValidationValues = {
    ChildName?: ValidationFunction<string>;
    ChildAge?: ValidationFunction<number>;
    NoOfChildren?: ValidationFunction<number>;
    FoodOptionSelected?: ValidationFunction<string>;
    AdultHotFoodQty?: ValidationFunction<string>;
    AdultColdFoodQty?: ValidationFunction<string>;
    Total?: ValidationFunction<number>;
    partybookingID?: ValidationFunction<string>;
    PartyFoodComplete?: ValidationFunction<boolean>;
    LeftBranch?: ValidationFunction<boolean>;
    CurrentGuests?: ValidationFunction<number>;
    LeftBranchTime?: ValidationFunction<string>;
    Table?: ValidationFunction<number>;
    PartyFoodDelivered?: ValidationFunction<boolean>;
    AmountPaid?: ValidationFunction<string>;
    PartyAdultFoodChoices?: ValidationFunction<string>;
    Email?: ValidationFunction<string>;
    Telephone?: ValidationFunction<string>;
    CalibrateStock?: ValidationFunction<boolean>;
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
    partybookingID?: PrimitiveOverrideProps<TextFieldProps>;
    PartyFoodComplete?: PrimitiveOverrideProps<SwitchFieldProps>;
    LeftBranch?: PrimitiveOverrideProps<SwitchFieldProps>;
    CurrentGuests?: PrimitiveOverrideProps<TextFieldProps>;
    LeftBranchTime?: PrimitiveOverrideProps<TextFieldProps>;
    Table?: PrimitiveOverrideProps<TextFieldProps>;
    PartyFoodDelivered?: PrimitiveOverrideProps<SwitchFieldProps>;
    AmountPaid?: PrimitiveOverrideProps<TextFieldProps>;
    PartyAdultFoodChoices?: PrimitiveOverrideProps<TextFieldProps>;
    Email?: PrimitiveOverrideProps<TextFieldProps>;
    Telephone?: PrimitiveOverrideProps<TextFieldProps>;
    CalibrateStock?: PrimitiveOverrideProps<SwitchFieldProps>;
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
