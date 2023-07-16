/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Confectionary } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ConfectionaryUpdateFormInputValues = {
    Muffin?: number;
    CakeSlice?: number;
    Cookies?: number;
    Buttons?: number;
    Quavers?: number;
    Pombears?: number;
    Jazzles?: number;
    Pringles?: number;
    Raisins?: number;
    SweetCone?: number;
    Crisps60p?: number;
    Crisps35p?: number;
};
export declare type ConfectionaryUpdateFormValidationValues = {
    Muffin?: ValidationFunction<number>;
    CakeSlice?: ValidationFunction<number>;
    Cookies?: ValidationFunction<number>;
    Buttons?: ValidationFunction<number>;
    Quavers?: ValidationFunction<number>;
    Pombears?: ValidationFunction<number>;
    Jazzles?: ValidationFunction<number>;
    Pringles?: ValidationFunction<number>;
    Raisins?: ValidationFunction<number>;
    SweetCone?: ValidationFunction<number>;
    Crisps60p?: ValidationFunction<number>;
    Crisps35p?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ConfectionaryUpdateFormOverridesProps = {
    ConfectionaryUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Muffin?: PrimitiveOverrideProps<TextFieldProps>;
    CakeSlice?: PrimitiveOverrideProps<TextFieldProps>;
    Cookies?: PrimitiveOverrideProps<TextFieldProps>;
    Buttons?: PrimitiveOverrideProps<TextFieldProps>;
    Quavers?: PrimitiveOverrideProps<TextFieldProps>;
    Pombears?: PrimitiveOverrideProps<TextFieldProps>;
    Jazzles?: PrimitiveOverrideProps<TextFieldProps>;
    Pringles?: PrimitiveOverrideProps<TextFieldProps>;
    Raisins?: PrimitiveOverrideProps<TextFieldProps>;
    SweetCone?: PrimitiveOverrideProps<TextFieldProps>;
    Crisps60p?: PrimitiveOverrideProps<TextFieldProps>;
    Crisps35p?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ConfectionaryUpdateFormProps = React.PropsWithChildren<{
    overrides?: ConfectionaryUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    confectionary?: Confectionary;
    onSubmit?: (fields: ConfectionaryUpdateFormInputValues) => ConfectionaryUpdateFormInputValues;
    onSuccess?: (fields: ConfectionaryUpdateFormInputValues) => void;
    onError?: (fields: ConfectionaryUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ConfectionaryUpdateFormInputValues) => ConfectionaryUpdateFormInputValues;
    onValidate?: ConfectionaryUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ConfectionaryUpdateForm(props: ConfectionaryUpdateFormProps): React.ReactElement;
