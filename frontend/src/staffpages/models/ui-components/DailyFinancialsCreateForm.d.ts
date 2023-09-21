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
export declare type DailyFinancialsCreateFormInputValues = {
    Gross?: number;
    VATReturns?: number;
    Net?: number;
    Date?: string;
};
export declare type DailyFinancialsCreateFormValidationValues = {
    Gross?: ValidationFunction<number>;
    VATReturns?: ValidationFunction<number>;
    Net?: ValidationFunction<number>;
    Date?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DailyFinancialsCreateFormOverridesProps = {
    DailyFinancialsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Gross?: PrimitiveOverrideProps<TextFieldProps>;
    VATReturns?: PrimitiveOverrideProps<TextFieldProps>;
    Net?: PrimitiveOverrideProps<TextFieldProps>;
    Date?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DailyFinancialsCreateFormProps = React.PropsWithChildren<{
    overrides?: DailyFinancialsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DailyFinancialsCreateFormInputValues) => DailyFinancialsCreateFormInputValues;
    onSuccess?: (fields: DailyFinancialsCreateFormInputValues) => void;
    onError?: (fields: DailyFinancialsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DailyFinancialsCreateFormInputValues) => DailyFinancialsCreateFormInputValues;
    onValidate?: DailyFinancialsCreateFormValidationValues;
} & React.CSSProperties>;
export default function DailyFinancialsCreateForm(props: DailyFinancialsCreateFormProps): React.ReactElement;
