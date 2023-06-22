/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type FrankfurterCreateFormInputValues = {
    StockLevel?: number;
};
export declare type FrankfurterCreateFormValidationValues = {
    StockLevel?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FrankfurterCreateFormOverridesProps = {
    FrankfurterCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    StockLevel?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FrankfurterCreateFormProps = React.PropsWithChildren<{
    overrides?: FrankfurterCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: FrankfurterCreateFormInputValues) => FrankfurterCreateFormInputValues;
    onSuccess?: (fields: FrankfurterCreateFormInputValues) => void;
    onError?: (fields: FrankfurterCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FrankfurterCreateFormInputValues) => FrankfurterCreateFormInputValues;
    onValidate?: FrankfurterCreateFormValidationValues;
} & React.CSSProperties>;
export default function FrankfurterCreateForm(props: FrankfurterCreateFormProps): React.ReactElement;
