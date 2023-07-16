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
export declare type SoftDrinksCreateFormInputValues = {
    FantaLemonBottle?: number;
    FantaTwistBottle?: number;
    FantaOrangeBottle?: number;
    FantaOrangeZeroBottle?: number;
    CokeBottle?: number;
    DietCokeBottle?: number;
    CokeZeroBottle?: number;
    Sprite?: number;
    AppleJuiceCarton?: number;
    OrangeJuiceCarton?: number;
    JugOfSquash?: number;
    Slushy?: number;
    FruitShoot?: number;
    Water?: number;
    NinjuApple?: number;
    NinjuTropical?: number;
};
export declare type SoftDrinksCreateFormValidationValues = {
    FantaLemonBottle?: ValidationFunction<number>;
    FantaTwistBottle?: ValidationFunction<number>;
    FantaOrangeBottle?: ValidationFunction<number>;
    FantaOrangeZeroBottle?: ValidationFunction<number>;
    CokeBottle?: ValidationFunction<number>;
    DietCokeBottle?: ValidationFunction<number>;
    CokeZeroBottle?: ValidationFunction<number>;
    Sprite?: ValidationFunction<number>;
    AppleJuiceCarton?: ValidationFunction<number>;
    OrangeJuiceCarton?: ValidationFunction<number>;
    JugOfSquash?: ValidationFunction<number>;
    Slushy?: ValidationFunction<number>;
    FruitShoot?: ValidationFunction<number>;
    Water?: ValidationFunction<number>;
    NinjuApple?: ValidationFunction<number>;
    NinjuTropical?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SoftDrinksCreateFormOverridesProps = {
    SoftDrinksCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    FantaLemonBottle?: PrimitiveOverrideProps<TextFieldProps>;
    FantaTwistBottle?: PrimitiveOverrideProps<TextFieldProps>;
    FantaOrangeBottle?: PrimitiveOverrideProps<TextFieldProps>;
    FantaOrangeZeroBottle?: PrimitiveOverrideProps<TextFieldProps>;
    CokeBottle?: PrimitiveOverrideProps<TextFieldProps>;
    DietCokeBottle?: PrimitiveOverrideProps<TextFieldProps>;
    CokeZeroBottle?: PrimitiveOverrideProps<TextFieldProps>;
    Sprite?: PrimitiveOverrideProps<TextFieldProps>;
    AppleJuiceCarton?: PrimitiveOverrideProps<TextFieldProps>;
    OrangeJuiceCarton?: PrimitiveOverrideProps<TextFieldProps>;
    JugOfSquash?: PrimitiveOverrideProps<TextFieldProps>;
    Slushy?: PrimitiveOverrideProps<TextFieldProps>;
    FruitShoot?: PrimitiveOverrideProps<TextFieldProps>;
    Water?: PrimitiveOverrideProps<TextFieldProps>;
    NinjuApple?: PrimitiveOverrideProps<TextFieldProps>;
    NinjuTropical?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SoftDrinksCreateFormProps = React.PropsWithChildren<{
    overrides?: SoftDrinksCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SoftDrinksCreateFormInputValues) => SoftDrinksCreateFormInputValues;
    onSuccess?: (fields: SoftDrinksCreateFormInputValues) => void;
    onError?: (fields: SoftDrinksCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SoftDrinksCreateFormInputValues) => SoftDrinksCreateFormInputValues;
    onValidate?: SoftDrinksCreateFormValidationValues;
} & React.CSSProperties>;
export default function SoftDrinksCreateForm(props: SoftDrinksCreateFormProps): React.ReactElement;
