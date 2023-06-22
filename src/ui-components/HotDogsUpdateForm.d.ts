/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { HotDogs } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type HotDogsUpdateFormInputValues = {
    CreatedTime?: string;
    CreatedDate?: string;
    StockLevel?: number;
    Price?: number;
};
export declare type HotDogsUpdateFormValidationValues = {
    CreatedTime?: ValidationFunction<string>;
    CreatedDate?: ValidationFunction<string>;
    StockLevel?: ValidationFunction<number>;
    Price?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HotDogsUpdateFormOverridesProps = {
    HotDogsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    CreatedTime?: PrimitiveOverrideProps<TextFieldProps>;
    CreatedDate?: PrimitiveOverrideProps<TextFieldProps>;
    StockLevel?: PrimitiveOverrideProps<TextFieldProps>;
    Price?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HotDogsUpdateFormProps = React.PropsWithChildren<{
    overrides?: HotDogsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    hotDogs?: HotDogs;
    onSubmit?: (fields: HotDogsUpdateFormInputValues) => HotDogsUpdateFormInputValues;
    onSuccess?: (fields: HotDogsUpdateFormInputValues) => void;
    onError?: (fields: HotDogsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HotDogsUpdateFormInputValues) => HotDogsUpdateFormInputValues;
    onValidate?: HotDogsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function HotDogsUpdateForm(props: HotDogsUpdateFormProps): React.ReactElement;
