/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { KitchenLayout } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type KitchenLayoutUpdateFormInputValues = {
    Name?: string;
    Amount?: number;
    Items?: string[];
};
export declare type KitchenLayoutUpdateFormValidationValues = {
    Name?: ValidationFunction<string>;
    Amount?: ValidationFunction<number>;
    Items?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type KitchenLayoutUpdateFormOverridesProps = {
    KitchenLayoutUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    Amount?: PrimitiveOverrideProps<TextFieldProps>;
    Items?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type KitchenLayoutUpdateFormProps = React.PropsWithChildren<{
    overrides?: KitchenLayoutUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    kitchenLayout?: KitchenLayout;
    onSubmit?: (fields: KitchenLayoutUpdateFormInputValues) => KitchenLayoutUpdateFormInputValues;
    onSuccess?: (fields: KitchenLayoutUpdateFormInputValues) => void;
    onError?: (fields: KitchenLayoutUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: KitchenLayoutUpdateFormInputValues) => KitchenLayoutUpdateFormInputValues;
    onValidate?: KitchenLayoutUpdateFormValidationValues;
} & React.CSSProperties>;
export default function KitchenLayoutUpdateForm(props: KitchenLayoutUpdateFormProps): React.ReactElement;
