/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Frankfurter } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type FrankfurterUpdateFormInputValues = {
    StockLevel?: number;
};
export declare type FrankfurterUpdateFormValidationValues = {
    StockLevel?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FrankfurterUpdateFormOverridesProps = {
    FrankfurterUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    StockLevel?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FrankfurterUpdateFormProps = React.PropsWithChildren<{
    overrides?: FrankfurterUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    frankfurter?: Frankfurter;
    onSubmit?: (fields: FrankfurterUpdateFormInputValues) => FrankfurterUpdateFormInputValues;
    onSuccess?: (fields: FrankfurterUpdateFormInputValues) => void;
    onError?: (fields: FrankfurterUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FrankfurterUpdateFormInputValues) => FrankfurterUpdateFormInputValues;
    onValidate?: FrankfurterUpdateFormValidationValues;
} & React.CSSProperties>;
export default function FrankfurterUpdateForm(props: FrankfurterUpdateFormProps): React.ReactElement;
