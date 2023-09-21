/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Confectionary } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ConfectionaryUpdateFormInputValues = {
    Name?: string;
    Price?: number;
    Kitchen?: boolean;
};
export declare type ConfectionaryUpdateFormValidationValues = {
    Name?: ValidationFunction<string>;
    Price?: ValidationFunction<number>;
    Kitchen?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ConfectionaryUpdateFormOverridesProps = {
    ConfectionaryUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    Price?: PrimitiveOverrideProps<TextFieldProps>;
    Kitchen?: PrimitiveOverrideProps<SwitchFieldProps>;
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
