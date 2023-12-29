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
export declare type PartyAdultFoodCreateFormInputValues = {
    Name?: string;
};
export declare type PartyAdultFoodCreateFormValidationValues = {
    Name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PartyAdultFoodCreateFormOverridesProps = {
    PartyAdultFoodCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PartyAdultFoodCreateFormProps = React.PropsWithChildren<{
    overrides?: PartyAdultFoodCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PartyAdultFoodCreateFormInputValues) => PartyAdultFoodCreateFormInputValues;
    onSuccess?: (fields: PartyAdultFoodCreateFormInputValues) => void;
    onError?: (fields: PartyAdultFoodCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PartyAdultFoodCreateFormInputValues) => PartyAdultFoodCreateFormInputValues;
    onValidate?: PartyAdultFoodCreateFormValidationValues;
} & React.CSSProperties>;
export default function PartyAdultFoodCreateForm(props: PartyAdultFoodCreateFormProps): React.ReactElement;
