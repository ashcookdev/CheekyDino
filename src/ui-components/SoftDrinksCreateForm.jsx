/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { SoftDrinks } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function SoftDrinksCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    FantaLemonBottle: "",
    FantaTwistBottle: "",
    FantaOrangeBottle: "",
    FantaOrangeZeroBottle: "",
    CokeBottle: "",
    DietCokeBottle: "",
    CokeZeroBottle: "",
    Sprite: "",
    AppleJuiceCarton: "",
    OrangeJuiceCarton: "",
    JugOfSquash: "",
    Slushy: "",
    FruitShoot: "",
    Water: "",
    NinjuApple: "",
    NinjuTropical: "",
  };
  const [FantaLemonBottle, setFantaLemonBottle] = React.useState(
    initialValues.FantaLemonBottle
  );
  const [FantaTwistBottle, setFantaTwistBottle] = React.useState(
    initialValues.FantaTwistBottle
  );
  const [FantaOrangeBottle, setFantaOrangeBottle] = React.useState(
    initialValues.FantaOrangeBottle
  );
  const [FantaOrangeZeroBottle, setFantaOrangeZeroBottle] = React.useState(
    initialValues.FantaOrangeZeroBottle
  );
  const [CokeBottle, setCokeBottle] = React.useState(initialValues.CokeBottle);
  const [DietCokeBottle, setDietCokeBottle] = React.useState(
    initialValues.DietCokeBottle
  );
  const [CokeZeroBottle, setCokeZeroBottle] = React.useState(
    initialValues.CokeZeroBottle
  );
  const [Sprite, setSprite] = React.useState(initialValues.Sprite);
  const [AppleJuiceCarton, setAppleJuiceCarton] = React.useState(
    initialValues.AppleJuiceCarton
  );
  const [OrangeJuiceCarton, setOrangeJuiceCarton] = React.useState(
    initialValues.OrangeJuiceCarton
  );
  const [JugOfSquash, setJugOfSquash] = React.useState(
    initialValues.JugOfSquash
  );
  const [Slushy, setSlushy] = React.useState(initialValues.Slushy);
  const [FruitShoot, setFruitShoot] = React.useState(initialValues.FruitShoot);
  const [Water, setWater] = React.useState(initialValues.Water);
  const [NinjuApple, setNinjuApple] = React.useState(initialValues.NinjuApple);
  const [NinjuTropical, setNinjuTropical] = React.useState(
    initialValues.NinjuTropical
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setFantaLemonBottle(initialValues.FantaLemonBottle);
    setFantaTwistBottle(initialValues.FantaTwistBottle);
    setFantaOrangeBottle(initialValues.FantaOrangeBottle);
    setFantaOrangeZeroBottle(initialValues.FantaOrangeZeroBottle);
    setCokeBottle(initialValues.CokeBottle);
    setDietCokeBottle(initialValues.DietCokeBottle);
    setCokeZeroBottle(initialValues.CokeZeroBottle);
    setSprite(initialValues.Sprite);
    setAppleJuiceCarton(initialValues.AppleJuiceCarton);
    setOrangeJuiceCarton(initialValues.OrangeJuiceCarton);
    setJugOfSquash(initialValues.JugOfSquash);
    setSlushy(initialValues.Slushy);
    setFruitShoot(initialValues.FruitShoot);
    setWater(initialValues.Water);
    setNinjuApple(initialValues.NinjuApple);
    setNinjuTropical(initialValues.NinjuTropical);
    setErrors({});
  };
  const validations = {
    FantaLemonBottle: [],
    FantaTwistBottle: [],
    FantaOrangeBottle: [],
    FantaOrangeZeroBottle: [],
    CokeBottle: [],
    DietCokeBottle: [],
    CokeZeroBottle: [],
    Sprite: [],
    AppleJuiceCarton: [],
    OrangeJuiceCarton: [],
    JugOfSquash: [],
    Slushy: [],
    FruitShoot: [],
    Water: [],
    NinjuApple: [],
    NinjuTropical: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          FantaLemonBottle,
          FantaTwistBottle,
          FantaOrangeBottle,
          FantaOrangeZeroBottle,
          CokeBottle,
          DietCokeBottle,
          CokeZeroBottle,
          Sprite,
          AppleJuiceCarton,
          OrangeJuiceCarton,
          JugOfSquash,
          Slushy,
          FruitShoot,
          Water,
          NinjuApple,
          NinjuTropical,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new SoftDrinks(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "SoftDrinksCreateForm")}
      {...rest}
    >
      <TextField
        label="Fanta lemon bottle"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={FantaLemonBottle}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              FantaLemonBottle: value,
              FantaTwistBottle,
              FantaOrangeBottle,
              FantaOrangeZeroBottle,
              CokeBottle,
              DietCokeBottle,
              CokeZeroBottle,
              Sprite,
              AppleJuiceCarton,
              OrangeJuiceCarton,
              JugOfSquash,
              Slushy,
              FruitShoot,
              Water,
              NinjuApple,
              NinjuTropical,
            };
            const result = onChange(modelFields);
            value = result?.FantaLemonBottle ?? value;
          }
          if (errors.FantaLemonBottle?.hasError) {
            runValidationTasks("FantaLemonBottle", value);
          }
          setFantaLemonBottle(value);
        }}
        onBlur={() => runValidationTasks("FantaLemonBottle", FantaLemonBottle)}
        errorMessage={errors.FantaLemonBottle?.errorMessage}
        hasError={errors.FantaLemonBottle?.hasError}
        {...getOverrideProps(overrides, "FantaLemonBottle")}
      ></TextField>
      <TextField
        label="Fanta twist bottle"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={FantaTwistBottle}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              FantaLemonBottle,
              FantaTwistBottle: value,
              FantaOrangeBottle,
              FantaOrangeZeroBottle,
              CokeBottle,
              DietCokeBottle,
              CokeZeroBottle,
              Sprite,
              AppleJuiceCarton,
              OrangeJuiceCarton,
              JugOfSquash,
              Slushy,
              FruitShoot,
              Water,
              NinjuApple,
              NinjuTropical,
            };
            const result = onChange(modelFields);
            value = result?.FantaTwistBottle ?? value;
          }
          if (errors.FantaTwistBottle?.hasError) {
            runValidationTasks("FantaTwistBottle", value);
          }
          setFantaTwistBottle(value);
        }}
        onBlur={() => runValidationTasks("FantaTwistBottle", FantaTwistBottle)}
        errorMessage={errors.FantaTwistBottle?.errorMessage}
        hasError={errors.FantaTwistBottle?.hasError}
        {...getOverrideProps(overrides, "FantaTwistBottle")}
      ></TextField>
      <TextField
        label="Fanta orange bottle"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={FantaOrangeBottle}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              FantaLemonBottle,
              FantaTwistBottle,
              FantaOrangeBottle: value,
              FantaOrangeZeroBottle,
              CokeBottle,
              DietCokeBottle,
              CokeZeroBottle,
              Sprite,
              AppleJuiceCarton,
              OrangeJuiceCarton,
              JugOfSquash,
              Slushy,
              FruitShoot,
              Water,
              NinjuApple,
              NinjuTropical,
            };
            const result = onChange(modelFields);
            value = result?.FantaOrangeBottle ?? value;
          }
          if (errors.FantaOrangeBottle?.hasError) {
            runValidationTasks("FantaOrangeBottle", value);
          }
          setFantaOrangeBottle(value);
        }}
        onBlur={() =>
          runValidationTasks("FantaOrangeBottle", FantaOrangeBottle)
        }
        errorMessage={errors.FantaOrangeBottle?.errorMessage}
        hasError={errors.FantaOrangeBottle?.hasError}
        {...getOverrideProps(overrides, "FantaOrangeBottle")}
      ></TextField>
      <TextField
        label="Fanta orange zero bottle"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={FantaOrangeZeroBottle}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              FantaLemonBottle,
              FantaTwistBottle,
              FantaOrangeBottle,
              FantaOrangeZeroBottle: value,
              CokeBottle,
              DietCokeBottle,
              CokeZeroBottle,
              Sprite,
              AppleJuiceCarton,
              OrangeJuiceCarton,
              JugOfSquash,
              Slushy,
              FruitShoot,
              Water,
              NinjuApple,
              NinjuTropical,
            };
            const result = onChange(modelFields);
            value = result?.FantaOrangeZeroBottle ?? value;
          }
          if (errors.FantaOrangeZeroBottle?.hasError) {
            runValidationTasks("FantaOrangeZeroBottle", value);
          }
          setFantaOrangeZeroBottle(value);
        }}
        onBlur={() =>
          runValidationTasks("FantaOrangeZeroBottle", FantaOrangeZeroBottle)
        }
        errorMessage={errors.FantaOrangeZeroBottle?.errorMessage}
        hasError={errors.FantaOrangeZeroBottle?.hasError}
        {...getOverrideProps(overrides, "FantaOrangeZeroBottle")}
      ></TextField>
      <TextField
        label="Coke bottle"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={CokeBottle}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              FantaLemonBottle,
              FantaTwistBottle,
              FantaOrangeBottle,
              FantaOrangeZeroBottle,
              CokeBottle: value,
              DietCokeBottle,
              CokeZeroBottle,
              Sprite,
              AppleJuiceCarton,
              OrangeJuiceCarton,
              JugOfSquash,
              Slushy,
              FruitShoot,
              Water,
              NinjuApple,
              NinjuTropical,
            };
            const result = onChange(modelFields);
            value = result?.CokeBottle ?? value;
          }
          if (errors.CokeBottle?.hasError) {
            runValidationTasks("CokeBottle", value);
          }
          setCokeBottle(value);
        }}
        onBlur={() => runValidationTasks("CokeBottle", CokeBottle)}
        errorMessage={errors.CokeBottle?.errorMessage}
        hasError={errors.CokeBottle?.hasError}
        {...getOverrideProps(overrides, "CokeBottle")}
      ></TextField>
      <TextField
        label="Diet coke bottle"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={DietCokeBottle}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              FantaLemonBottle,
              FantaTwistBottle,
              FantaOrangeBottle,
              FantaOrangeZeroBottle,
              CokeBottle,
              DietCokeBottle: value,
              CokeZeroBottle,
              Sprite,
              AppleJuiceCarton,
              OrangeJuiceCarton,
              JugOfSquash,
              Slushy,
              FruitShoot,
              Water,
              NinjuApple,
              NinjuTropical,
            };
            const result = onChange(modelFields);
            value = result?.DietCokeBottle ?? value;
          }
          if (errors.DietCokeBottle?.hasError) {
            runValidationTasks("DietCokeBottle", value);
          }
          setDietCokeBottle(value);
        }}
        onBlur={() => runValidationTasks("DietCokeBottle", DietCokeBottle)}
        errorMessage={errors.DietCokeBottle?.errorMessage}
        hasError={errors.DietCokeBottle?.hasError}
        {...getOverrideProps(overrides, "DietCokeBottle")}
      ></TextField>
      <TextField
        label="Coke zero bottle"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={CokeZeroBottle}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              FantaLemonBottle,
              FantaTwistBottle,
              FantaOrangeBottle,
              FantaOrangeZeroBottle,
              CokeBottle,
              DietCokeBottle,
              CokeZeroBottle: value,
              Sprite,
              AppleJuiceCarton,
              OrangeJuiceCarton,
              JugOfSquash,
              Slushy,
              FruitShoot,
              Water,
              NinjuApple,
              NinjuTropical,
            };
            const result = onChange(modelFields);
            value = result?.CokeZeroBottle ?? value;
          }
          if (errors.CokeZeroBottle?.hasError) {
            runValidationTasks("CokeZeroBottle", value);
          }
          setCokeZeroBottle(value);
        }}
        onBlur={() => runValidationTasks("CokeZeroBottle", CokeZeroBottle)}
        errorMessage={errors.CokeZeroBottle?.errorMessage}
        hasError={errors.CokeZeroBottle?.hasError}
        {...getOverrideProps(overrides, "CokeZeroBottle")}
      ></TextField>
      <TextField
        label="Sprite"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Sprite}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              FantaLemonBottle,
              FantaTwistBottle,
              FantaOrangeBottle,
              FantaOrangeZeroBottle,
              CokeBottle,
              DietCokeBottle,
              CokeZeroBottle,
              Sprite: value,
              AppleJuiceCarton,
              OrangeJuiceCarton,
              JugOfSquash,
              Slushy,
              FruitShoot,
              Water,
              NinjuApple,
              NinjuTropical,
            };
            const result = onChange(modelFields);
            value = result?.Sprite ?? value;
          }
          if (errors.Sprite?.hasError) {
            runValidationTasks("Sprite", value);
          }
          setSprite(value);
        }}
        onBlur={() => runValidationTasks("Sprite", Sprite)}
        errorMessage={errors.Sprite?.errorMessage}
        hasError={errors.Sprite?.hasError}
        {...getOverrideProps(overrides, "Sprite")}
      ></TextField>
      <TextField
        label="Apple juice carton"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={AppleJuiceCarton}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              FantaLemonBottle,
              FantaTwistBottle,
              FantaOrangeBottle,
              FantaOrangeZeroBottle,
              CokeBottle,
              DietCokeBottle,
              CokeZeroBottle,
              Sprite,
              AppleJuiceCarton: value,
              OrangeJuiceCarton,
              JugOfSquash,
              Slushy,
              FruitShoot,
              Water,
              NinjuApple,
              NinjuTropical,
            };
            const result = onChange(modelFields);
            value = result?.AppleJuiceCarton ?? value;
          }
          if (errors.AppleJuiceCarton?.hasError) {
            runValidationTasks("AppleJuiceCarton", value);
          }
          setAppleJuiceCarton(value);
        }}
        onBlur={() => runValidationTasks("AppleJuiceCarton", AppleJuiceCarton)}
        errorMessage={errors.AppleJuiceCarton?.errorMessage}
        hasError={errors.AppleJuiceCarton?.hasError}
        {...getOverrideProps(overrides, "AppleJuiceCarton")}
      ></TextField>
      <TextField
        label="Orange juice carton"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={OrangeJuiceCarton}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              FantaLemonBottle,
              FantaTwistBottle,
              FantaOrangeBottle,
              FantaOrangeZeroBottle,
              CokeBottle,
              DietCokeBottle,
              CokeZeroBottle,
              Sprite,
              AppleJuiceCarton,
              OrangeJuiceCarton: value,
              JugOfSquash,
              Slushy,
              FruitShoot,
              Water,
              NinjuApple,
              NinjuTropical,
            };
            const result = onChange(modelFields);
            value = result?.OrangeJuiceCarton ?? value;
          }
          if (errors.OrangeJuiceCarton?.hasError) {
            runValidationTasks("OrangeJuiceCarton", value);
          }
          setOrangeJuiceCarton(value);
        }}
        onBlur={() =>
          runValidationTasks("OrangeJuiceCarton", OrangeJuiceCarton)
        }
        errorMessage={errors.OrangeJuiceCarton?.errorMessage}
        hasError={errors.OrangeJuiceCarton?.hasError}
        {...getOverrideProps(overrides, "OrangeJuiceCarton")}
      ></TextField>
      <TextField
        label="Jug of squash"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={JugOfSquash}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              FantaLemonBottle,
              FantaTwistBottle,
              FantaOrangeBottle,
              FantaOrangeZeroBottle,
              CokeBottle,
              DietCokeBottle,
              CokeZeroBottle,
              Sprite,
              AppleJuiceCarton,
              OrangeJuiceCarton,
              JugOfSquash: value,
              Slushy,
              FruitShoot,
              Water,
              NinjuApple,
              NinjuTropical,
            };
            const result = onChange(modelFields);
            value = result?.JugOfSquash ?? value;
          }
          if (errors.JugOfSquash?.hasError) {
            runValidationTasks("JugOfSquash", value);
          }
          setJugOfSquash(value);
        }}
        onBlur={() => runValidationTasks("JugOfSquash", JugOfSquash)}
        errorMessage={errors.JugOfSquash?.errorMessage}
        hasError={errors.JugOfSquash?.hasError}
        {...getOverrideProps(overrides, "JugOfSquash")}
      ></TextField>
      <TextField
        label="Slushy"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Slushy}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              FantaLemonBottle,
              FantaTwistBottle,
              FantaOrangeBottle,
              FantaOrangeZeroBottle,
              CokeBottle,
              DietCokeBottle,
              CokeZeroBottle,
              Sprite,
              AppleJuiceCarton,
              OrangeJuiceCarton,
              JugOfSquash,
              Slushy: value,
              FruitShoot,
              Water,
              NinjuApple,
              NinjuTropical,
            };
            const result = onChange(modelFields);
            value = result?.Slushy ?? value;
          }
          if (errors.Slushy?.hasError) {
            runValidationTasks("Slushy", value);
          }
          setSlushy(value);
        }}
        onBlur={() => runValidationTasks("Slushy", Slushy)}
        errorMessage={errors.Slushy?.errorMessage}
        hasError={errors.Slushy?.hasError}
        {...getOverrideProps(overrides, "Slushy")}
      ></TextField>
      <TextField
        label="Fruit shoot"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={FruitShoot}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              FantaLemonBottle,
              FantaTwistBottle,
              FantaOrangeBottle,
              FantaOrangeZeroBottle,
              CokeBottle,
              DietCokeBottle,
              CokeZeroBottle,
              Sprite,
              AppleJuiceCarton,
              OrangeJuiceCarton,
              JugOfSquash,
              Slushy,
              FruitShoot: value,
              Water,
              NinjuApple,
              NinjuTropical,
            };
            const result = onChange(modelFields);
            value = result?.FruitShoot ?? value;
          }
          if (errors.FruitShoot?.hasError) {
            runValidationTasks("FruitShoot", value);
          }
          setFruitShoot(value);
        }}
        onBlur={() => runValidationTasks("FruitShoot", FruitShoot)}
        errorMessage={errors.FruitShoot?.errorMessage}
        hasError={errors.FruitShoot?.hasError}
        {...getOverrideProps(overrides, "FruitShoot")}
      ></TextField>
      <TextField
        label="Water"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Water}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              FantaLemonBottle,
              FantaTwistBottle,
              FantaOrangeBottle,
              FantaOrangeZeroBottle,
              CokeBottle,
              DietCokeBottle,
              CokeZeroBottle,
              Sprite,
              AppleJuiceCarton,
              OrangeJuiceCarton,
              JugOfSquash,
              Slushy,
              FruitShoot,
              Water: value,
              NinjuApple,
              NinjuTropical,
            };
            const result = onChange(modelFields);
            value = result?.Water ?? value;
          }
          if (errors.Water?.hasError) {
            runValidationTasks("Water", value);
          }
          setWater(value);
        }}
        onBlur={() => runValidationTasks("Water", Water)}
        errorMessage={errors.Water?.errorMessage}
        hasError={errors.Water?.hasError}
        {...getOverrideProps(overrides, "Water")}
      ></TextField>
      <TextField
        label="Ninju apple"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={NinjuApple}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              FantaLemonBottle,
              FantaTwistBottle,
              FantaOrangeBottle,
              FantaOrangeZeroBottle,
              CokeBottle,
              DietCokeBottle,
              CokeZeroBottle,
              Sprite,
              AppleJuiceCarton,
              OrangeJuiceCarton,
              JugOfSquash,
              Slushy,
              FruitShoot,
              Water,
              NinjuApple: value,
              NinjuTropical,
            };
            const result = onChange(modelFields);
            value = result?.NinjuApple ?? value;
          }
          if (errors.NinjuApple?.hasError) {
            runValidationTasks("NinjuApple", value);
          }
          setNinjuApple(value);
        }}
        onBlur={() => runValidationTasks("NinjuApple", NinjuApple)}
        errorMessage={errors.NinjuApple?.errorMessage}
        hasError={errors.NinjuApple?.hasError}
        {...getOverrideProps(overrides, "NinjuApple")}
      ></TextField>
      <TextField
        label="Ninju tropical"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={NinjuTropical}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              FantaLemonBottle,
              FantaTwistBottle,
              FantaOrangeBottle,
              FantaOrangeZeroBottle,
              CokeBottle,
              DietCokeBottle,
              CokeZeroBottle,
              Sprite,
              AppleJuiceCarton,
              OrangeJuiceCarton,
              JugOfSquash,
              Slushy,
              FruitShoot,
              Water,
              NinjuApple,
              NinjuTropical: value,
            };
            const result = onChange(modelFields);
            value = result?.NinjuTropical ?? value;
          }
          if (errors.NinjuTropical?.hasError) {
            runValidationTasks("NinjuTropical", value);
          }
          setNinjuTropical(value);
        }}
        onBlur={() => runValidationTasks("NinjuTropical", NinjuTropical)}
        errorMessage={errors.NinjuTropical?.errorMessage}
        hasError={errors.NinjuTropical?.hasError}
        {...getOverrideProps(overrides, "NinjuTropical")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
