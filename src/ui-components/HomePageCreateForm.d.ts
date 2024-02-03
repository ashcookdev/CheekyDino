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
export declare type HomePageCreateFormInputValues = {
    TopSectionTitle?: string;
    TopSectionPic?: string;
    TopSectionWriting?: string;
    EventTitle?: string;
    EventPic?: string;
    EventWriting?: string;
    EventTwoTitle?: string;
    EventTwoPic?: string;
    EventTwoWriting?: string;
    EventThreeTitle?: string;
    EventThreePic?: string;
    EventThreeWriting?: string;
    EventOneButton?: boolean;
    EventTwoButton?: boolean;
    EventThreeButton?: boolean;
};
export declare type HomePageCreateFormValidationValues = {
    TopSectionTitle?: ValidationFunction<string>;
    TopSectionPic?: ValidationFunction<string>;
    TopSectionWriting?: ValidationFunction<string>;
    EventTitle?: ValidationFunction<string>;
    EventPic?: ValidationFunction<string>;
    EventWriting?: ValidationFunction<string>;
    EventTwoTitle?: ValidationFunction<string>;
    EventTwoPic?: ValidationFunction<string>;
    EventTwoWriting?: ValidationFunction<string>;
    EventThreeTitle?: ValidationFunction<string>;
    EventThreePic?: ValidationFunction<string>;
    EventThreeWriting?: ValidationFunction<string>;
    EventOneButton?: ValidationFunction<boolean>;
    EventTwoButton?: ValidationFunction<boolean>;
    EventThreeButton?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HomePageCreateFormOverridesProps = {
    HomePageCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    TopSectionTitle?: PrimitiveOverrideProps<TextFieldProps>;
    TopSectionPic?: PrimitiveOverrideProps<TextFieldProps>;
    TopSectionWriting?: PrimitiveOverrideProps<TextFieldProps>;
    EventTitle?: PrimitiveOverrideProps<TextFieldProps>;
    EventPic?: PrimitiveOverrideProps<TextFieldProps>;
    EventWriting?: PrimitiveOverrideProps<TextFieldProps>;
    EventTwoTitle?: PrimitiveOverrideProps<TextFieldProps>;
    EventTwoPic?: PrimitiveOverrideProps<TextFieldProps>;
    EventTwoWriting?: PrimitiveOverrideProps<TextFieldProps>;
    EventThreeTitle?: PrimitiveOverrideProps<TextFieldProps>;
    EventThreePic?: PrimitiveOverrideProps<TextFieldProps>;
    EventThreeWriting?: PrimitiveOverrideProps<TextFieldProps>;
    EventOneButton?: PrimitiveOverrideProps<SwitchFieldProps>;
    EventTwoButton?: PrimitiveOverrideProps<SwitchFieldProps>;
    EventThreeButton?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type HomePageCreateFormProps = React.PropsWithChildren<{
    overrides?: HomePageCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HomePageCreateFormInputValues) => HomePageCreateFormInputValues;
    onSuccess?: (fields: HomePageCreateFormInputValues) => void;
    onError?: (fields: HomePageCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HomePageCreateFormInputValues) => HomePageCreateFormInputValues;
    onValidate?: HomePageCreateFormValidationValues;
} & React.CSSProperties>;
export default function HomePageCreateForm(props: HomePageCreateFormProps): React.ReactElement;
