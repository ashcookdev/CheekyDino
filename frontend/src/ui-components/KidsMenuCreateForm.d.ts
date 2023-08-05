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
export declare type KidsMenuCreateFormInputValues = {
    Name?: string;
    Price?: number;
    Description?: string;
    Beans?: boolean;
    Notes?: string;
    Kitchen?: boolean;
    imageSrc?: string;
};
export declare type KidsMenuCreateFormValidationValues = {
    Name?: ValidationFunction<string>;
    Price?: ValidationFunction<number>;
    Description?: ValidationFunction<string>;
    Beans?: ValidationFunction<boolean>;
    Notes?: ValidationFunction<string>;
    Kitchen?: ValidationFunction<boolean>;
    imageSrc?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type KidsMenuCreateFormOverridesProps = {
    KidsMenuCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    Price?: PrimitiveOverrideProps<TextFieldProps>;
    Description?: PrimitiveOverrideProps<TextFieldProps>;
    Beans?: PrimitiveOverrideProps<SwitchFieldProps>;
    Notes?: PrimitiveOverrideProps<TextFieldProps>;
    Kitchen?: PrimitiveOverrideProps<SwitchFieldProps>;
    imageSrc?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type KidsMenuCreateFormProps = React.PropsWithChildren<{
    overrides?: KidsMenuCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: KidsMenuCreateFormInputValues) => KidsMenuCreateFormInputValues;
    onSuccess?: (fields: KidsMenuCreateFormInputValues) => void;
    onError?: (fields: KidsMenuCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: KidsMenuCreateFormInputValues) => KidsMenuCreateFormInputValues;
    onValidate?: KidsMenuCreateFormValidationValues;
} & React.CSSProperties>;
export default function KidsMenuCreateForm(props: KidsMenuCreateFormProps): React.ReactElement;
