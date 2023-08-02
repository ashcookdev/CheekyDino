/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { SoftDrinks } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SoftDrinksUpdateFormInputValues = {
    Name?: string;
    Price?: number;
    Kitchen?: boolean;
};
export declare type SoftDrinksUpdateFormValidationValues = {
    Name?: ValidationFunction<string>;
    Price?: ValidationFunction<number>;
    Kitchen?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SoftDrinksUpdateFormOverridesProps = {
    SoftDrinksUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    Price?: PrimitiveOverrideProps<TextFieldProps>;
    Kitchen?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type SoftDrinksUpdateFormProps = React.PropsWithChildren<{
    overrides?: SoftDrinksUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    softDrinks?: SoftDrinks;
    onSubmit?: (fields: SoftDrinksUpdateFormInputValues) => SoftDrinksUpdateFormInputValues;
    onSuccess?: (fields: SoftDrinksUpdateFormInputValues) => void;
    onError?: (fields: SoftDrinksUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SoftDrinksUpdateFormInputValues) => SoftDrinksUpdateFormInputValues;
    onValidate?: SoftDrinksUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SoftDrinksUpdateForm(props: SoftDrinksUpdateFormProps): React.ReactElement;
