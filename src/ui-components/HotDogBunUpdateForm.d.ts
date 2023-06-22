/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { HotDogBun } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type HotDogBunUpdateFormInputValues = {
    StockLevel?: number;
};
export declare type HotDogBunUpdateFormValidationValues = {
    StockLevel?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HotDogBunUpdateFormOverridesProps = {
    HotDogBunUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    StockLevel?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HotDogBunUpdateFormProps = React.PropsWithChildren<{
    overrides?: HotDogBunUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    hotDogBun?: HotDogBun;
    onSubmit?: (fields: HotDogBunUpdateFormInputValues) => HotDogBunUpdateFormInputValues;
    onSuccess?: (fields: HotDogBunUpdateFormInputValues) => void;
    onError?: (fields: HotDogBunUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HotDogBunUpdateFormInputValues) => HotDogBunUpdateFormInputValues;
    onValidate?: HotDogBunUpdateFormValidationValues;
} & React.CSSProperties>;
export default function HotDogBunUpdateForm(props: HotDogBunUpdateFormProps): React.ReactElement;
