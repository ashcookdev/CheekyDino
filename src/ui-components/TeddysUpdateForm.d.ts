/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Teddys } from "../models";
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
export declare type TeddysUpdateFormInputValues = {
    Name?: string;
    ImgSrc?: string;
};
export declare type TeddysUpdateFormValidationValues = {
    Name?: ValidationFunction<string>;
    ImgSrc?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TeddysUpdateFormOverridesProps = {
    TeddysUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    ImgSrc?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TeddysUpdateFormProps = React.PropsWithChildren<{
    overrides?: TeddysUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    teddys?: Teddys;
    onSubmit?: (fields: TeddysUpdateFormInputValues) => TeddysUpdateFormInputValues;
    onSuccess?: (fields: TeddysUpdateFormInputValues) => void;
    onError?: (fields: TeddysUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TeddysUpdateFormInputValues) => TeddysUpdateFormInputValues;
    onValidate?: TeddysUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TeddysUpdateForm(props: TeddysUpdateFormProps): React.ReactElement;
