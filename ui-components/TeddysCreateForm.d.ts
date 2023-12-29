/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TeddysCreateFormInputValues = {
    Name?: string;
    ImgSrc?: string;
};
export declare type TeddysCreateFormValidationValues = {
    Name?: ValidationFunction<string>;
    ImgSrc?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TeddysCreateFormOverridesProps = {
    TeddysCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    ImgSrc?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TeddysCreateFormProps = React.PropsWithChildren<{
    overrides?: TeddysCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TeddysCreateFormInputValues) => TeddysCreateFormInputValues;
    onSuccess?: (fields: TeddysCreateFormInputValues) => void;
    onError?: (fields: TeddysCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TeddysCreateFormInputValues) => TeddysCreateFormInputValues;
    onValidate?: TeddysCreateFormValidationValues;
} & React.CSSProperties>;
export default function TeddysCreateForm(props: TeddysCreateFormProps): React.ReactElement;
