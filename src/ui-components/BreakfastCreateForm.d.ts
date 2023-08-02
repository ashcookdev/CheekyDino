/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type BreakfastCreateFormInputValues = {
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
export declare type BreakfastCreateFormValidationValues = {
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
export declare type BreakfastCreateFormOverridesProps = {
    BreakfastCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type BreakfastCreateFormProps = React.PropsWithChildren<{
    overrides?: BreakfastCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: BreakfastCreateFormInputValues) => BreakfastCreateFormInputValues;
    onSuccess?: (fields: BreakfastCreateFormInputValues) => void;
    onError?: (fields: BreakfastCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BreakfastCreateFormInputValues) => BreakfastCreateFormInputValues;
    onValidate?: BreakfastCreateFormValidationValues;
} & React.CSSProperties>;
export default function BreakfastCreateForm(props: BreakfastCreateFormProps): React.ReactElement;
