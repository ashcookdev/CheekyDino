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
    PartyType?: string;
    ChildName?: string;
    ChildAge?: number;
    PartyDate?: string;
    PartyTime?: string;
    NoOfChildren?: number;
    ThirdPartyContactedDate?: boolean;
    FoodOptionSelected?: string;
    Total?: number;
    SweetConesSelected?: boolean;
    CharacterSelected?: string;
    BearVoiceRecorders?: boolean;
    PartyFoodPrepared?: string;
    PartyHostAssigned?: string;
    PartyChildMumArrived?: string;
    PartyFoodTimeDue?: string;
    PartyFinish?: string;
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
    Payments?: string[];
    Utd?: boolean;
};
export declare type PartyBookingCreateFormValidationValues = {
    PartyType?: ValidationFunction<string>;
    ChildName?: ValidationFunction<string>;
    ChildAge?: ValidationFunction<number>;
    PartyDate?: ValidationFunction<string>;
    PartyTime?: ValidationFunction<string>;
    NoOfChildren?: ValidationFunction<number>;
    ThirdPartyContactedDate?: ValidationFunction<boolean>;
    FoodOptionSelected?: ValidationFunction<string>;
    Total?: ValidationFunction<number>;
    SweetConesSelected?: ValidationFunction<boolean>;
    CharacterSelected?: ValidationFunction<string>;
    BearVoiceRecorders?: ValidationFunction<boolean>;
    PartyFoodPrepared?: ValidationFunction<string>;
    PartyHostAssigned?: ValidationFunction<string>;
    PartyChildMumArrived?: ValidationFunction<string>;
    PartyFoodTimeDue?: ValidationFunction<string>;
    PartyFinish?: ValidationFunction<string>;
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
    Payments?: ValidationFunction<string>;
    Utd?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PartyBookingCreateFormOverridesProps = {
    PartyBookingCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    PartyType?: PrimitiveOverrideProps<TextFieldProps>;
    ChildName?: PrimitiveOverrideProps<TextFieldProps>;
    ChildAge?: PrimitiveOverrideProps<TextFieldProps>;
    PartyDate?: PrimitiveOverrideProps<TextFieldProps>;
    PartyTime?: PrimitiveOverrideProps<TextFieldProps>;
    NoOfChildren?: PrimitiveOverrideProps<TextFieldProps>;
    ThirdPartyContactedDate?: PrimitiveOverrideProps<SwitchFieldProps>;
    FoodOptionSelected?: PrimitiveOverrideProps<TextFieldProps>;
    Total?: PrimitiveOverrideProps<TextFieldProps>;
    SweetConesSelected?: PrimitiveOverrideProps<SwitchFieldProps>;
    CharacterSelected?: PrimitiveOverrideProps<TextFieldProps>;
    BearVoiceRecorders?: PrimitiveOverrideProps<SwitchFieldProps>;
    PartyFoodPrepared?: PrimitiveOverrideProps<TextFieldProps>;
    PartyHostAssigned?: PrimitiveOverrideProps<TextFieldProps>;
    PartyChildMumArrived?: PrimitiveOverrideProps<TextFieldProps>;
    PartyFoodTimeDue?: PrimitiveOverrideProps<TextFieldProps>;
    PartyFinish?: PrimitiveOverrideProps<TextFieldProps>;
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
    Payments?: PrimitiveOverrideProps<TextFieldProps>;
    Utd?: PrimitiveOverrideProps<SwitchFieldProps>;
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
