/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Extras } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ExtrasUpdateFormInputValues = {
    Name?: string;
    Price?: number;
    Kitchen?: boolean;
};
export declare type ExtrasUpdateFormValidationValues = {
    Name?: ValidationFunction<string>;
    Price?: ValidationFunction<number>;
    Kitchen?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ExtrasUpdateFormOverridesProps = {
    ExtrasUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    Price?: PrimitiveOverrideProps<TextFieldProps>;
    Kitchen?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type ExtrasUpdateFormProps = React.PropsWithChildren<{
    overrides?: ExtrasUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    extras?: Extras;
    onSubmit?: (fields: ExtrasUpdateFormInputValues) => ExtrasUpdateFormInputValues;
    onSuccess?: (fields: ExtrasUpdateFormInputValues) => void;
    onError?: (fields: ExtrasUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ExtrasUpdateFormInputValues) => ExtrasUpdateFormInputValues;
    onValidate?: ExtrasUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ExtrasUpdateForm(props: ExtrasUpdateFormProps): React.ReactElement;
