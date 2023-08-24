/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { KidsMenu } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type KidsMenuUpdateFormInputValues = {
    Name?: string;
    Price?: number;
    Description?: string;
    Beans?: boolean;
    Notes?: string;
    Kitchen?: boolean;
    imageSrc?: string;
    Prep?: string;
    Ingredients?: string[];
    Snooze?: boolean;
};
export declare type KidsMenuUpdateFormValidationValues = {
    Name?: ValidationFunction<string>;
    Price?: ValidationFunction<number>;
    Description?: ValidationFunction<string>;
    Beans?: ValidationFunction<boolean>;
    Notes?: ValidationFunction<string>;
    Kitchen?: ValidationFunction<boolean>;
    imageSrc?: ValidationFunction<string>;
    Prep?: ValidationFunction<string>;
    Ingredients?: ValidationFunction<string>;
    Snooze?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type KidsMenuUpdateFormOverridesProps = {
    KidsMenuUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    Price?: PrimitiveOverrideProps<TextFieldProps>;
    Description?: PrimitiveOverrideProps<TextFieldProps>;
    Beans?: PrimitiveOverrideProps<SwitchFieldProps>;
    Notes?: PrimitiveOverrideProps<TextFieldProps>;
    Kitchen?: PrimitiveOverrideProps<SwitchFieldProps>;
    imageSrc?: PrimitiveOverrideProps<TextFieldProps>;
    Prep?: PrimitiveOverrideProps<TextFieldProps>;
    Ingredients?: PrimitiveOverrideProps<TextFieldProps>;
    Snooze?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type KidsMenuUpdateFormProps = React.PropsWithChildren<{
    overrides?: KidsMenuUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    kidsMenu?: KidsMenu;
    onSubmit?: (fields: KidsMenuUpdateFormInputValues) => KidsMenuUpdateFormInputValues;
    onSuccess?: (fields: KidsMenuUpdateFormInputValues) => void;
    onError?: (fields: KidsMenuUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: KidsMenuUpdateFormInputValues) => KidsMenuUpdateFormInputValues;
    onValidate?: KidsMenuUpdateFormValidationValues;
} & React.CSSProperties>;
export default function KidsMenuUpdateForm(props: KidsMenuUpdateFormProps): React.ReactElement;
