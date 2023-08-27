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
export declare type ExtrasCreateFormInputValues = {
    Name?: string;
    Price?: number;
    Kitchen?: boolean;
};
export declare type ExtrasCreateFormValidationValues = {
    Name?: ValidationFunction<string>;
    Price?: ValidationFunction<number>;
    Kitchen?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ExtrasCreateFormOverridesProps = {
    ExtrasCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    Price?: PrimitiveOverrideProps<TextFieldProps>;
    Kitchen?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type ExtrasCreateFormProps = React.PropsWithChildren<{
    overrides?: ExtrasCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ExtrasCreateFormInputValues) => ExtrasCreateFormInputValues;
    onSuccess?: (fields: ExtrasCreateFormInputValues) => void;
    onError?: (fields: ExtrasCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ExtrasCreateFormInputValues) => ExtrasCreateFormInputValues;
    onValidate?: ExtrasCreateFormValidationValues;
} & React.CSSProperties>;
export default function ExtrasCreateForm(props: ExtrasCreateFormProps): React.ReactElement;
