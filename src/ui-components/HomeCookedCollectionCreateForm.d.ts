/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type HomeCookedCollectionCreateFormInputValues = {
    CreatedTime?: string;
    CreatedDate?: string;
    Total?: number;
    DrinkItems?: string[];
    HotItems?: string[];
    CollectionTime?: string;
    Completed?: boolean;
    Delieved?: boolean;
    Name?: string;
    Notes?: string;
    Kitchen?: boolean;
    KitchenMenuId?: string[];
    Email?: string;
    Telephone?: string;
    Prepaid?: boolean;
    PaymentAuth?: string;
};
export declare type HomeCookedCollectionCreateFormValidationValues = {
    CreatedTime?: ValidationFunction<string>;
    CreatedDate?: ValidationFunction<string>;
    Total?: ValidationFunction<number>;
    DrinkItems?: ValidationFunction<string>;
    HotItems?: ValidationFunction<string>;
    CollectionTime?: ValidationFunction<string>;
    Completed?: ValidationFunction<boolean>;
    Delieved?: ValidationFunction<boolean>;
    Name?: ValidationFunction<string>;
    Notes?: ValidationFunction<string>;
    Kitchen?: ValidationFunction<boolean>;
    KitchenMenuId?: ValidationFunction<string>;
    Email?: ValidationFunction<string>;
    Telephone?: ValidationFunction<string>;
    Prepaid?: ValidationFunction<boolean>;
    PaymentAuth?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HomeCookedCollectionCreateFormOverridesProps = {
    HomeCookedCollectionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    CreatedTime?: PrimitiveOverrideProps<TextFieldProps>;
    CreatedDate?: PrimitiveOverrideProps<TextFieldProps>;
    Total?: PrimitiveOverrideProps<TextFieldProps>;
    DrinkItems?: PrimitiveOverrideProps<TextFieldProps>;
    HotItems?: PrimitiveOverrideProps<TextFieldProps>;
    CollectionTime?: PrimitiveOverrideProps<TextFieldProps>;
    Completed?: PrimitiveOverrideProps<SwitchFieldProps>;
    Delieved?: PrimitiveOverrideProps<SwitchFieldProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    Notes?: PrimitiveOverrideProps<TextFieldProps>;
    Kitchen?: PrimitiveOverrideProps<SwitchFieldProps>;
    KitchenMenuId?: PrimitiveOverrideProps<TextFieldProps>;
    Email?: PrimitiveOverrideProps<TextFieldProps>;
    Telephone?: PrimitiveOverrideProps<TextFieldProps>;
    Prepaid?: PrimitiveOverrideProps<SwitchFieldProps>;
    PaymentAuth?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HomeCookedCollectionCreateFormProps = React.PropsWithChildren<{
    overrides?: HomeCookedCollectionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HomeCookedCollectionCreateFormInputValues) => HomeCookedCollectionCreateFormInputValues;
    onSuccess?: (fields: HomeCookedCollectionCreateFormInputValues) => void;
    onError?: (fields: HomeCookedCollectionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HomeCookedCollectionCreateFormInputValues) => HomeCookedCollectionCreateFormInputValues;
    onValidate?: HomeCookedCollectionCreateFormValidationValues;
} & React.CSSProperties>;
export default function HomeCookedCollectionCreateForm(props: HomeCookedCollectionCreateFormProps): React.ReactElement;
