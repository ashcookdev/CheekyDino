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
export declare type PartyAdultFoodCreateFormInputValues = {
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
export declare type PartyAdultFoodCreateFormValidationValues = {
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
export declare type PartyAdultFoodCreateFormOverridesProps = {
    PartyAdultFoodCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type PartyAdultFoodCreateFormProps = React.PropsWithChildren<{
    overrides?: PartyAdultFoodCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PartyAdultFoodCreateFormInputValues) => PartyAdultFoodCreateFormInputValues;
    onSuccess?: (fields: PartyAdultFoodCreateFormInputValues) => void;
    onError?: (fields: PartyAdultFoodCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PartyAdultFoodCreateFormInputValues) => PartyAdultFoodCreateFormInputValues;
    onValidate?: PartyAdultFoodCreateFormValidationValues;
} & React.CSSProperties>;
export default function PartyAdultFoodCreateForm(props: PartyAdultFoodCreateFormProps): React.ReactElement;
