/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { HotDrinks } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type HotDrinksUpdateFormInputValues = {
    Tea?: number;
    SpecialTea?: number;
    HotChocolate?: number;
    Cappaccino?: number;
    Decaff?: number;
    HotChocolateCreamMarshmellow?: number;
    Latte?: number;
    Mocha?: number;
    AmericanoWhite?: number;
    AmericanoBlack?: number;
    Expresso?: number;
    DoubleExpresso?: number;
    FlatWhite?: number;
    Syrup?: number;
};
export declare type HotDrinksUpdateFormValidationValues = {
    Tea?: ValidationFunction<number>;
    SpecialTea?: ValidationFunction<number>;
    HotChocolate?: ValidationFunction<number>;
    Cappaccino?: ValidationFunction<number>;
    Decaff?: ValidationFunction<number>;
    HotChocolateCreamMarshmellow?: ValidationFunction<number>;
    Latte?: ValidationFunction<number>;
    Mocha?: ValidationFunction<number>;
    AmericanoWhite?: ValidationFunction<number>;
    AmericanoBlack?: ValidationFunction<number>;
    Expresso?: ValidationFunction<number>;
    DoubleExpresso?: ValidationFunction<number>;
    FlatWhite?: ValidationFunction<number>;
    Syrup?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HotDrinksUpdateFormOverridesProps = {
    HotDrinksUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Tea?: PrimitiveOverrideProps<TextFieldProps>;
    SpecialTea?: PrimitiveOverrideProps<TextFieldProps>;
    HotChocolate?: PrimitiveOverrideProps<TextFieldProps>;
    Cappaccino?: PrimitiveOverrideProps<TextFieldProps>;
    Decaff?: PrimitiveOverrideProps<TextFieldProps>;
    HotChocolateCreamMarshmellow?: PrimitiveOverrideProps<TextFieldProps>;
    Latte?: PrimitiveOverrideProps<TextFieldProps>;
    Mocha?: PrimitiveOverrideProps<TextFieldProps>;
    AmericanoWhite?: PrimitiveOverrideProps<TextFieldProps>;
    AmericanoBlack?: PrimitiveOverrideProps<TextFieldProps>;
    Expresso?: PrimitiveOverrideProps<TextFieldProps>;
    DoubleExpresso?: PrimitiveOverrideProps<TextFieldProps>;
    FlatWhite?: PrimitiveOverrideProps<TextFieldProps>;
    Syrup?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HotDrinksUpdateFormProps = React.PropsWithChildren<{
    overrides?: HotDrinksUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    hotDrinks?: HotDrinks;
    onSubmit?: (fields: HotDrinksUpdateFormInputValues) => HotDrinksUpdateFormInputValues;
    onSuccess?: (fields: HotDrinksUpdateFormInputValues) => void;
    onError?: (fields: HotDrinksUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HotDrinksUpdateFormInputValues) => HotDrinksUpdateFormInputValues;
    onValidate?: HotDrinksUpdateFormValidationValues;
} & React.CSSProperties>;
export default function HotDrinksUpdateForm(props: HotDrinksUpdateFormProps): React.ReactElement;
