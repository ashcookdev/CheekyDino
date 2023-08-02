/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { CafeOrder } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CafeOrderUpdateFormInputValues = {
    CreatedTime?: string;
    CreatedDate?: string;
    Total?: number;
    DrinkItems?: string[];
    HotItems?: string[];
    Table?: number;
    Completed?: boolean;
    Delieved?: boolean;
    Sessionid?: string;
    TimeDelivered?: string;
    Notes?: string;
    Kitchen?: boolean;
};
export declare type CafeOrderUpdateFormValidationValues = {
    CreatedTime?: ValidationFunction<string>;
    CreatedDate?: ValidationFunction<string>;
    Total?: ValidationFunction<number>;
    DrinkItems?: ValidationFunction<string>;
    HotItems?: ValidationFunction<string>;
    Table?: ValidationFunction<number>;
    Completed?: ValidationFunction<boolean>;
    Delieved?: ValidationFunction<boolean>;
    Sessionid?: ValidationFunction<string>;
    TimeDelivered?: ValidationFunction<string>;
    Notes?: ValidationFunction<string>;
    Kitchen?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CafeOrderUpdateFormOverridesProps = {
    CafeOrderUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    CreatedTime?: PrimitiveOverrideProps<TextFieldProps>;
    CreatedDate?: PrimitiveOverrideProps<TextFieldProps>;
    Total?: PrimitiveOverrideProps<TextFieldProps>;
    DrinkItems?: PrimitiveOverrideProps<TextFieldProps>;
    HotItems?: PrimitiveOverrideProps<TextFieldProps>;
    Table?: PrimitiveOverrideProps<TextFieldProps>;
    Completed?: PrimitiveOverrideProps<SwitchFieldProps>;
    Delieved?: PrimitiveOverrideProps<SwitchFieldProps>;
    Sessionid?: PrimitiveOverrideProps<TextFieldProps>;
    TimeDelivered?: PrimitiveOverrideProps<TextFieldProps>;
    Notes?: PrimitiveOverrideProps<TextFieldProps>;
    Kitchen?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type CafeOrderUpdateFormProps = React.PropsWithChildren<{
    overrides?: CafeOrderUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    cafeOrder?: CafeOrder;
    onSubmit?: (fields: CafeOrderUpdateFormInputValues) => CafeOrderUpdateFormInputValues;
    onSuccess?: (fields: CafeOrderUpdateFormInputValues) => void;
    onError?: (fields: CafeOrderUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CafeOrderUpdateFormInputValues) => CafeOrderUpdateFormInputValues;
    onValidate?: CafeOrderUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CafeOrderUpdateForm(props: CafeOrderUpdateFormProps): React.ReactElement;
