/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { PartyBooking } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PartyBookingUpdateFormInputValues = {
    PartyType?: string;
    ChildName?: string;
    ChildAge?: number;
    PartyDate?: string;
    PartyTime?: string;
    NoOfChildren?: number;
    ThirdPartyContactedDate?: boolean;
    FoodOptionSelected?: string;
    Total?: number;
    AdultHotFoodQty?: number;
    AdultColdFoodQty?: number;
    SweetConesSelected?: boolean;
    CharacterSelected?: string;
    BearVoiceRecorders?: boolean;
    PartyFoodPrepared?: string;
    PartyHostAssigned?: string;
    PartyChildMumArrived?: string;
    PartyFoodTimeDue?: string;
    PartyFinish?: string;
};
export declare type PartyBookingUpdateFormValidationValues = {
    PartyType?: ValidationFunction<string>;
    ChildName?: ValidationFunction<string>;
    ChildAge?: ValidationFunction<number>;
    PartyDate?: ValidationFunction<string>;
    PartyTime?: ValidationFunction<string>;
    NoOfChildren?: ValidationFunction<number>;
    ThirdPartyContactedDate?: ValidationFunction<boolean>;
    FoodOptionSelected?: ValidationFunction<string>;
    Total?: ValidationFunction<number>;
    AdultHotFoodQty?: ValidationFunction<number>;
    AdultColdFoodQty?: ValidationFunction<number>;
    SweetConesSelected?: ValidationFunction<boolean>;
    CharacterSelected?: ValidationFunction<string>;
    BearVoiceRecorders?: ValidationFunction<boolean>;
    PartyFoodPrepared?: ValidationFunction<string>;
    PartyHostAssigned?: ValidationFunction<string>;
    PartyChildMumArrived?: ValidationFunction<string>;
    PartyFoodTimeDue?: ValidationFunction<string>;
    PartyFinish?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PartyBookingUpdateFormOverridesProps = {
    PartyBookingUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    PartyType?: PrimitiveOverrideProps<TextFieldProps>;
    ChildName?: PrimitiveOverrideProps<TextFieldProps>;
    ChildAge?: PrimitiveOverrideProps<TextFieldProps>;
    PartyDate?: PrimitiveOverrideProps<TextFieldProps>;
    PartyTime?: PrimitiveOverrideProps<TextFieldProps>;
    NoOfChildren?: PrimitiveOverrideProps<TextFieldProps>;
    ThirdPartyContactedDate?: PrimitiveOverrideProps<SwitchFieldProps>;
    FoodOptionSelected?: PrimitiveOverrideProps<TextFieldProps>;
    Total?: PrimitiveOverrideProps<TextFieldProps>;
    AdultHotFoodQty?: PrimitiveOverrideProps<TextFieldProps>;
    AdultColdFoodQty?: PrimitiveOverrideProps<TextFieldProps>;
    SweetConesSelected?: PrimitiveOverrideProps<SwitchFieldProps>;
    CharacterSelected?: PrimitiveOverrideProps<TextFieldProps>;
    BearVoiceRecorders?: PrimitiveOverrideProps<SwitchFieldProps>;
    PartyFoodPrepared?: PrimitiveOverrideProps<TextFieldProps>;
    PartyHostAssigned?: PrimitiveOverrideProps<TextFieldProps>;
    PartyChildMumArrived?: PrimitiveOverrideProps<TextFieldProps>;
    PartyFoodTimeDue?: PrimitiveOverrideProps<TextFieldProps>;
    PartyFinish?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PartyBookingUpdateFormProps = React.PropsWithChildren<{
    overrides?: PartyBookingUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    partyBooking?: PartyBooking;
    onSubmit?: (fields: PartyBookingUpdateFormInputValues) => PartyBookingUpdateFormInputValues;
    onSuccess?: (fields: PartyBookingUpdateFormInputValues) => void;
    onError?: (fields: PartyBookingUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PartyBookingUpdateFormInputValues) => PartyBookingUpdateFormInputValues;
    onValidate?: PartyBookingUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PartyBookingUpdateForm(props: PartyBookingUpdateFormProps): React.ReactElement;
