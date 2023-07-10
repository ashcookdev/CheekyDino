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
export declare type CafeOrderCreateFormInputValues = {
    CreatedTime?: string;
    CreatedDate?: string;
    Total?: number;
    DrinkItems?: string[];
    HotItems?: string[];
    Table?: number;
    Completed?: boolean;
};
export declare type CafeOrderCreateFormValidationValues = {
    CreatedTime?: ValidationFunction<string>;
    CreatedDate?: ValidationFunction<string>;
    Total?: ValidationFunction<number>;
    DrinkItems?: ValidationFunction<string>;
    HotItems?: ValidationFunction<string>;
    Table?: ValidationFunction<number>;
    Completed?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CafeOrderCreateFormOverridesProps = {
    CafeOrderCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    CreatedTime?: PrimitiveOverrideProps<TextFieldProps>;
    CreatedDate?: PrimitiveOverrideProps<TextFieldProps>;
    Total?: PrimitiveOverrideProps<TextFieldProps>;
    DrinkItems?: PrimitiveOverrideProps<TextFieldProps>;
    HotItems?: PrimitiveOverrideProps<TextFieldProps>;
    Table?: PrimitiveOverrideProps<TextFieldProps>;
    Completed?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type CafeOrderCreateFormProps = React.PropsWithChildren<{
    overrides?: CafeOrderCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CafeOrderCreateFormInputValues) => CafeOrderCreateFormInputValues;
    onSuccess?: (fields: CafeOrderCreateFormInputValues) => void;
    onError?: (fields: CafeOrderCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CafeOrderCreateFormInputValues) => CafeOrderCreateFormInputValues;
    onValidate?: CafeOrderCreateFormValidationValues;
} & React.CSSProperties>;
export default function CafeOrderCreateForm(props: CafeOrderCreateFormProps): React.ReactElement;
