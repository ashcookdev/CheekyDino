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
export declare type HotDrinksCreateFormInputValues = {
    Name?: string;
    Price?: number;
    Syrup?: boolean;
    Kitchen?: boolean;
};
export declare type HotDrinksCreateFormValidationValues = {
    Name?: ValidationFunction<string>;
    Price?: ValidationFunction<number>;
    Syrup?: ValidationFunction<boolean>;
    Kitchen?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HotDrinksCreateFormOverridesProps = {
    HotDrinksCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    Price?: PrimitiveOverrideProps<TextFieldProps>;
    Syrup?: PrimitiveOverrideProps<SwitchFieldProps>;
    Kitchen?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type HotDrinksCreateFormProps = React.PropsWithChildren<{
    overrides?: HotDrinksCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HotDrinksCreateFormInputValues) => HotDrinksCreateFormInputValues;
    onSuccess?: (fields: HotDrinksCreateFormInputValues) => void;
    onError?: (fields: HotDrinksCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HotDrinksCreateFormInputValues) => HotDrinksCreateFormInputValues;
    onValidate?: HotDrinksCreateFormValidationValues;
} & React.CSSProperties>;
export default function HotDrinksCreateForm(props: HotDrinksCreateFormProps): React.ReactElement;
