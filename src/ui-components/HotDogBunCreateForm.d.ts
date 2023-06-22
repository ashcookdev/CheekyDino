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
export declare type HotDogBunCreateFormInputValues = {
    StockLevel?: number;
};
export declare type HotDogBunCreateFormValidationValues = {
    StockLevel?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HotDogBunCreateFormOverridesProps = {
    HotDogBunCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    StockLevel?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HotDogBunCreateFormProps = React.PropsWithChildren<{
    overrides?: HotDogBunCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HotDogBunCreateFormInputValues) => HotDogBunCreateFormInputValues;
    onSuccess?: (fields: HotDogBunCreateFormInputValues) => void;
    onError?: (fields: HotDogBunCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HotDogBunCreateFormInputValues) => HotDogBunCreateFormInputValues;
    onValidate?: HotDogBunCreateFormValidationValues;
} & React.CSSProperties>;
export default function HotDogBunCreateForm(props: HotDogBunCreateFormProps): React.ReactElement;
