/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Staff } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type StaffUpdateFormInputValues = {
    Name?: string;
    Email?: string;
    TimeEntries?: string;
    Role?: string;
};
export declare type StaffUpdateFormValidationValues = {
    Name?: ValidationFunction<string>;
    Email?: ValidationFunction<string>;
    TimeEntries?: ValidationFunction<string>;
    Role?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StaffUpdateFormOverridesProps = {
    StaffUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    Email?: PrimitiveOverrideProps<TextFieldProps>;
    TimeEntries?: PrimitiveOverrideProps<TextFieldProps>;
    Role?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type StaffUpdateFormProps = React.PropsWithChildren<{
    overrides?: StaffUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    staff?: Staff;
    onSubmit?: (fields: StaffUpdateFormInputValues) => StaffUpdateFormInputValues;
    onSuccess?: (fields: StaffUpdateFormInputValues) => void;
    onError?: (fields: StaffUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: StaffUpdateFormInputValues) => StaffUpdateFormInputValues;
    onValidate?: StaffUpdateFormValidationValues;
} & React.CSSProperties>;
export default function StaffUpdateForm(props: StaffUpdateFormProps): React.ReactElement;
