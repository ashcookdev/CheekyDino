/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { PartyGuests } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PartyGuestsUpdateFormInputValues = {
    ChildName?: string;
    FoodOption?: string;
    Allergies?: string;
    ContactInfoEmail?: string;
    Arrived?: string;
    SweetConeColour?: string;
    TeddyTasticBear?: string;
    Completed?: boolean;
};
export declare type PartyGuestsUpdateFormValidationValues = {
    ChildName?: ValidationFunction<string>;
    FoodOption?: ValidationFunction<string>;
    Allergies?: ValidationFunction<string>;
    ContactInfoEmail?: ValidationFunction<string>;
    Arrived?: ValidationFunction<string>;
    SweetConeColour?: ValidationFunction<string>;
    TeddyTasticBear?: ValidationFunction<string>;
    Completed?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PartyGuestsUpdateFormOverridesProps = {
    PartyGuestsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ChildName?: PrimitiveOverrideProps<TextFieldProps>;
    FoodOption?: PrimitiveOverrideProps<TextFieldProps>;
    Allergies?: PrimitiveOverrideProps<TextFieldProps>;
    ContactInfoEmail?: PrimitiveOverrideProps<TextFieldProps>;
    Arrived?: PrimitiveOverrideProps<TextFieldProps>;
    SweetConeColour?: PrimitiveOverrideProps<TextFieldProps>;
    TeddyTasticBear?: PrimitiveOverrideProps<TextFieldProps>;
    Completed?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type PartyGuestsUpdateFormProps = React.PropsWithChildren<{
    overrides?: PartyGuestsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    partyGuests?: PartyGuests;
    onSubmit?: (fields: PartyGuestsUpdateFormInputValues) => PartyGuestsUpdateFormInputValues;
    onSuccess?: (fields: PartyGuestsUpdateFormInputValues) => void;
    onError?: (fields: PartyGuestsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PartyGuestsUpdateFormInputValues) => PartyGuestsUpdateFormInputValues;
    onValidate?: PartyGuestsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PartyGuestsUpdateForm(props: PartyGuestsUpdateFormProps): React.ReactElement;
