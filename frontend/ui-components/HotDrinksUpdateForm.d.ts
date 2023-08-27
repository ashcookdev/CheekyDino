/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { HotDrinks } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type HotDrinksUpdateFormInputValues = {
    Name?: string;
    Price?: number;
    Syrup?: boolean;
    Kitchen?: boolean;
};
export declare type HotDrinksUpdateFormValidationValues = {
    Name?: ValidationFunction<string>;
    Price?: ValidationFunction<number>;
    Syrup?: ValidationFunction<boolean>;
    Kitchen?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HotDrinksUpdateFormOverridesProps = {
    HotDrinksUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    Price?: PrimitiveOverrideProps<TextFieldProps>;
    Syrup?: PrimitiveOverrideProps<SwitchFieldProps>;
    Kitchen?: PrimitiveOverrideProps<SwitchFieldProps>;
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
