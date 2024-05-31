/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { PartyAdultFood } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PartyAdultFoodUpdateFormInputValues = {
    ChickenNugget?: number;
    CocktailSausage?: number;
    OnionRings?: number;
    FishFingers?: number;
    MozzarellaSticks?: number;
    GarlicBread?: number;
    GarlicMushrooms?: number;
    TraySandwiches?: number;
    PepperoniPizza?: number;
    MargheritaPizza?: number;
    BBQChickenPizza?: number;
    VegPizza?: number;
};
export declare type PartyAdultFoodUpdateFormValidationValues = {
    ChickenNugget?: ValidationFunction<number>;
    CocktailSausage?: ValidationFunction<number>;
    OnionRings?: ValidationFunction<number>;
    FishFingers?: ValidationFunction<number>;
    MozzarellaSticks?: ValidationFunction<number>;
    GarlicBread?: ValidationFunction<number>;
    GarlicMushrooms?: ValidationFunction<number>;
    TraySandwiches?: ValidationFunction<number>;
    PepperoniPizza?: ValidationFunction<number>;
    MargheritaPizza?: ValidationFunction<number>;
    BBQChickenPizza?: ValidationFunction<number>;
    VegPizza?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PartyAdultFoodUpdateFormOverridesProps = {
    PartyAdultFoodUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ChickenNugget?: PrimitiveOverrideProps<TextFieldProps>;
    CocktailSausage?: PrimitiveOverrideProps<TextFieldProps>;
    OnionRings?: PrimitiveOverrideProps<TextFieldProps>;
    FishFingers?: PrimitiveOverrideProps<TextFieldProps>;
    MozzarellaSticks?: PrimitiveOverrideProps<TextFieldProps>;
    GarlicBread?: PrimitiveOverrideProps<TextFieldProps>;
    GarlicMushrooms?: PrimitiveOverrideProps<TextFieldProps>;
    TraySandwiches?: PrimitiveOverrideProps<TextFieldProps>;
    PepperoniPizza?: PrimitiveOverrideProps<TextFieldProps>;
    MargheritaPizza?: PrimitiveOverrideProps<TextFieldProps>;
    BBQChickenPizza?: PrimitiveOverrideProps<TextFieldProps>;
    VegPizza?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PartyAdultFoodUpdateFormProps = React.PropsWithChildren<{
    overrides?: PartyAdultFoodUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    partyAdultFood?: PartyAdultFood;
    onSubmit?: (fields: PartyAdultFoodUpdateFormInputValues) => PartyAdultFoodUpdateFormInputValues;
    onSuccess?: (fields: PartyAdultFoodUpdateFormInputValues) => void;
    onError?: (fields: PartyAdultFoodUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PartyAdultFoodUpdateFormInputValues) => PartyAdultFoodUpdateFormInputValues;
    onValidate?: PartyAdultFoodUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PartyAdultFoodUpdateForm(props: PartyAdultFoodUpdateFormProps): React.ReactElement;
