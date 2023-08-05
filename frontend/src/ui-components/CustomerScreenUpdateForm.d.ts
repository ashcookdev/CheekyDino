/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { CustomerScreen } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CustomerScreenUpdateFormInputValues = {
    Message?: string;
    Show?: boolean;
};
export declare type CustomerScreenUpdateFormValidationValues = {
    Message?: ValidationFunction<string>;
    Show?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CustomerScreenUpdateFormOverridesProps = {
    CustomerScreenUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Message?: PrimitiveOverrideProps<TextFieldProps>;
    Show?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type CustomerScreenUpdateFormProps = React.PropsWithChildren<{
    overrides?: CustomerScreenUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    customerScreen?: CustomerScreen;
    onSubmit?: (fields: CustomerScreenUpdateFormInputValues) => CustomerScreenUpdateFormInputValues;
    onSuccess?: (fields: CustomerScreenUpdateFormInputValues) => void;
    onError?: (fields: CustomerScreenUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CustomerScreenUpdateFormInputValues) => CustomerScreenUpdateFormInputValues;
    onValidate?: CustomerScreenUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CustomerScreenUpdateForm(props: CustomerScreenUpdateFormProps): React.ReactElement;
