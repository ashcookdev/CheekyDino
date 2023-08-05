/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Breakfast } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type BreakfastUpdateFormInputValues = {
    Name?: string;
    Price?: number;
    WhiteBread?: boolean;
    BrownBread?: boolean;
    Egg?: number;
    Fried?: boolean;
    Scrambled?: boolean;
    Sausage?: number;
    Bacon?: number;
    HashBrown?: number;
};
export declare type BreakfastUpdateFormValidationValues = {
    Name?: ValidationFunction<string>;
    Price?: ValidationFunction<number>;
    WhiteBread?: ValidationFunction<boolean>;
    BrownBread?: ValidationFunction<boolean>;
    Egg?: ValidationFunction<number>;
    Fried?: ValidationFunction<boolean>;
    Scrambled?: ValidationFunction<boolean>;
    Sausage?: ValidationFunction<number>;
    Bacon?: ValidationFunction<number>;
    HashBrown?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BreakfastUpdateFormOverridesProps = {
    BreakfastUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    Price?: PrimitiveOverrideProps<TextFieldProps>;
    WhiteBread?: PrimitiveOverrideProps<SwitchFieldProps>;
    BrownBread?: PrimitiveOverrideProps<SwitchFieldProps>;
    Egg?: PrimitiveOverrideProps<TextFieldProps>;
    Fried?: PrimitiveOverrideProps<SwitchFieldProps>;
    Scrambled?: PrimitiveOverrideProps<SwitchFieldProps>;
    Sausage?: PrimitiveOverrideProps<TextFieldProps>;
    Bacon?: PrimitiveOverrideProps<TextFieldProps>;
    HashBrown?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BreakfastUpdateFormProps = React.PropsWithChildren<{
    overrides?: BreakfastUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    breakfast?: Breakfast;
    onSubmit?: (fields: BreakfastUpdateFormInputValues) => BreakfastUpdateFormInputValues;
    onSuccess?: (fields: BreakfastUpdateFormInputValues) => void;
    onError?: (fields: BreakfastUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BreakfastUpdateFormInputValues) => BreakfastUpdateFormInputValues;
    onValidate?: BreakfastUpdateFormValidationValues;
} & React.CSSProperties>;
export default function BreakfastUpdateForm(props: BreakfastUpdateFormProps): React.ReactElement;
