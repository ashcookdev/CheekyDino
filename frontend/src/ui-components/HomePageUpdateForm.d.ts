/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { HomePage } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type HomePageUpdateFormInputValues = {
    Message?: string;
};
export declare type HomePageUpdateFormValidationValues = {
    Message?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HomePageUpdateFormOverridesProps = {
    HomePageUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Message?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HomePageUpdateFormProps = React.PropsWithChildren<{
    overrides?: HomePageUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    homePage?: HomePage;
    onSubmit?: (fields: HomePageUpdateFormInputValues) => HomePageUpdateFormInputValues;
    onSuccess?: (fields: HomePageUpdateFormInputValues) => void;
    onError?: (fields: HomePageUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HomePageUpdateFormInputValues) => HomePageUpdateFormInputValues;
    onValidate?: HomePageUpdateFormValidationValues;
} & React.CSSProperties>;
export default function HomePageUpdateForm(props: HomePageUpdateFormProps): React.ReactElement;
