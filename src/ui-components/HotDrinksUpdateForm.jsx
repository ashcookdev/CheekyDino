/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { HotDrinks } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function HotDrinksUpdateForm(props) {
  const {
    id: idProp,
    hotDrinks: hotDrinksModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Tea: "",
    SpecialTea: "",
    HotChocolate: "",
    Cappaccino: "",
    Decaff: "",
    HotChocolateCreamMarshmellow: "",
    Latte: "",
    Mocha: "",
    AmericanoWhite: "",
    AmericanoBlack: "",
    Expresso: "",
    DoubleExpresso: "",
    FlatWhite: "",
    Syrup: "",
  };
  const [Tea, setTea] = React.useState(initialValues.Tea);
  const [SpecialTea, setSpecialTea] = React.useState(initialValues.SpecialTea);
  const [HotChocolate, setHotChocolate] = React.useState(
    initialValues.HotChocolate
  );
  const [Cappaccino, setCappaccino] = React.useState(initialValues.Cappaccino);
  const [Decaff, setDecaff] = React.useState(initialValues.Decaff);
  const [HotChocolateCreamMarshmellow, setHotChocolateCreamMarshmellow] =
    React.useState(initialValues.HotChocolateCreamMarshmellow);
  const [Latte, setLatte] = React.useState(initialValues.Latte);
  const [Mocha, setMocha] = React.useState(initialValues.Mocha);
  const [AmericanoWhite, setAmericanoWhite] = React.useState(
    initialValues.AmericanoWhite
  );
  const [AmericanoBlack, setAmericanoBlack] = React.useState(
    initialValues.AmericanoBlack
  );
  const [Expresso, setExpresso] = React.useState(initialValues.Expresso);
  const [DoubleExpresso, setDoubleExpresso] = React.useState(
    initialValues.DoubleExpresso
  );
  const [FlatWhite, setFlatWhite] = React.useState(initialValues.FlatWhite);
  const [Syrup, setSyrup] = React.useState(initialValues.Syrup);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = hotDrinksRecord
      ? { ...initialValues, ...hotDrinksRecord }
      : initialValues;
    setTea(cleanValues.Tea);
    setSpecialTea(cleanValues.SpecialTea);
    setHotChocolate(cleanValues.HotChocolate);
    setCappaccino(cleanValues.Cappaccino);
    setDecaff(cleanValues.Decaff);
    setHotChocolateCreamMarshmellow(cleanValues.HotChocolateCreamMarshmellow);
    setLatte(cleanValues.Latte);
    setMocha(cleanValues.Mocha);
    setAmericanoWhite(cleanValues.AmericanoWhite);
    setAmericanoBlack(cleanValues.AmericanoBlack);
    setExpresso(cleanValues.Expresso);
    setDoubleExpresso(cleanValues.DoubleExpresso);
    setFlatWhite(cleanValues.FlatWhite);
    setSyrup(cleanValues.Syrup);
    setErrors({});
  };
  const [hotDrinksRecord, setHotDrinksRecord] =
    React.useState(hotDrinksModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(HotDrinks, idProp)
        : hotDrinksModelProp;
      setHotDrinksRecord(record);
    };
    queryData();
  }, [idProp, hotDrinksModelProp]);
  React.useEffect(resetStateValues, [hotDrinksRecord]);
  const validations = {
    Tea: [],
    SpecialTea: [],
    HotChocolate: [],
    Cappaccino: [],
    Decaff: [],
    HotChocolateCreamMarshmellow: [],
    Latte: [],
    Mocha: [],
    AmericanoWhite: [],
    AmericanoBlack: [],
    Expresso: [],
    DoubleExpresso: [],
    FlatWhite: [],
    Syrup: [],
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
          Tea,
          SpecialTea,
          HotChocolate,
          Cappaccino,
          Decaff,
          HotChocolateCreamMarshmellow,
          Latte,
          Mocha,
          AmericanoWhite,
          AmericanoBlack,
          Expresso,
          DoubleExpresso,
          FlatWhite,
          Syrup,
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
          await DataStore.save(
            HotDrinks.copyOf(hotDrinksRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "HotDrinksUpdateForm")}
      {...rest}
    >
      <TextField
        label="Tea"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Tea}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Tea: value,
              SpecialTea,
              HotChocolate,
              Cappaccino,
              Decaff,
              HotChocolateCreamMarshmellow,
              Latte,
              Mocha,
              AmericanoWhite,
              AmericanoBlack,
              Expresso,
              DoubleExpresso,
              FlatWhite,
              Syrup,
            };
            const result = onChange(modelFields);
            value = result?.Tea ?? value;
          }
          if (errors.Tea?.hasError) {
            runValidationTasks("Tea", value);
          }
          setTea(value);
        }}
        onBlur={() => runValidationTasks("Tea", Tea)}
        errorMessage={errors.Tea?.errorMessage}
        hasError={errors.Tea?.hasError}
        {...getOverrideProps(overrides, "Tea")}
      ></TextField>
      <TextField
        label="Special tea"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={SpecialTea}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Tea,
              SpecialTea: value,
              HotChocolate,
              Cappaccino,
              Decaff,
              HotChocolateCreamMarshmellow,
              Latte,
              Mocha,
              AmericanoWhite,
              AmericanoBlack,
              Expresso,
              DoubleExpresso,
              FlatWhite,
              Syrup,
            };
            const result = onChange(modelFields);
            value = result?.SpecialTea ?? value;
          }
          if (errors.SpecialTea?.hasError) {
            runValidationTasks("SpecialTea", value);
          }
          setSpecialTea(value);
        }}
        onBlur={() => runValidationTasks("SpecialTea", SpecialTea)}
        errorMessage={errors.SpecialTea?.errorMessage}
        hasError={errors.SpecialTea?.hasError}
        {...getOverrideProps(overrides, "SpecialTea")}
      ></TextField>
      <TextField
        label="Hot chocolate"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={HotChocolate}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Tea,
              SpecialTea,
              HotChocolate: value,
              Cappaccino,
              Decaff,
              HotChocolateCreamMarshmellow,
              Latte,
              Mocha,
              AmericanoWhite,
              AmericanoBlack,
              Expresso,
              DoubleExpresso,
              FlatWhite,
              Syrup,
            };
            const result = onChange(modelFields);
            value = result?.HotChocolate ?? value;
          }
          if (errors.HotChocolate?.hasError) {
            runValidationTasks("HotChocolate", value);
          }
          setHotChocolate(value);
        }}
        onBlur={() => runValidationTasks("HotChocolate", HotChocolate)}
        errorMessage={errors.HotChocolate?.errorMessage}
        hasError={errors.HotChocolate?.hasError}
        {...getOverrideProps(overrides, "HotChocolate")}
      ></TextField>
      <TextField
        label="Cappaccino"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Cappaccino}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Tea,
              SpecialTea,
              HotChocolate,
              Cappaccino: value,
              Decaff,
              HotChocolateCreamMarshmellow,
              Latte,
              Mocha,
              AmericanoWhite,
              AmericanoBlack,
              Expresso,
              DoubleExpresso,
              FlatWhite,
              Syrup,
            };
            const result = onChange(modelFields);
            value = result?.Cappaccino ?? value;
          }
          if (errors.Cappaccino?.hasError) {
            runValidationTasks("Cappaccino", value);
          }
          setCappaccino(value);
        }}
        onBlur={() => runValidationTasks("Cappaccino", Cappaccino)}
        errorMessage={errors.Cappaccino?.errorMessage}
        hasError={errors.Cappaccino?.hasError}
        {...getOverrideProps(overrides, "Cappaccino")}
      ></TextField>
      <TextField
        label="Decaff"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Decaff}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Tea,
              SpecialTea,
              HotChocolate,
              Cappaccino,
              Decaff: value,
              HotChocolateCreamMarshmellow,
              Latte,
              Mocha,
              AmericanoWhite,
              AmericanoBlack,
              Expresso,
              DoubleExpresso,
              FlatWhite,
              Syrup,
            };
            const result = onChange(modelFields);
            value = result?.Decaff ?? value;
          }
          if (errors.Decaff?.hasError) {
            runValidationTasks("Decaff", value);
          }
          setDecaff(value);
        }}
        onBlur={() => runValidationTasks("Decaff", Decaff)}
        errorMessage={errors.Decaff?.errorMessage}
        hasError={errors.Decaff?.hasError}
        {...getOverrideProps(overrides, "Decaff")}
      ></TextField>
      <TextField
        label="Hot chocolate cream marshmellow"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={HotChocolateCreamMarshmellow}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Tea,
              SpecialTea,
              HotChocolate,
              Cappaccino,
              Decaff,
              HotChocolateCreamMarshmellow: value,
              Latte,
              Mocha,
              AmericanoWhite,
              AmericanoBlack,
              Expresso,
              DoubleExpresso,
              FlatWhite,
              Syrup,
            };
            const result = onChange(modelFields);
            value = result?.HotChocolateCreamMarshmellow ?? value;
          }
          if (errors.HotChocolateCreamMarshmellow?.hasError) {
            runValidationTasks("HotChocolateCreamMarshmellow", value);
          }
          setHotChocolateCreamMarshmellow(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "HotChocolateCreamMarshmellow",
            HotChocolateCreamMarshmellow
          )
        }
        errorMessage={errors.HotChocolateCreamMarshmellow?.errorMessage}
        hasError={errors.HotChocolateCreamMarshmellow?.hasError}
        {...getOverrideProps(overrides, "HotChocolateCreamMarshmellow")}
      ></TextField>
      <TextField
        label="Latte"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Latte}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Tea,
              SpecialTea,
              HotChocolate,
              Cappaccino,
              Decaff,
              HotChocolateCreamMarshmellow,
              Latte: value,
              Mocha,
              AmericanoWhite,
              AmericanoBlack,
              Expresso,
              DoubleExpresso,
              FlatWhite,
              Syrup,
            };
            const result = onChange(modelFields);
            value = result?.Latte ?? value;
          }
          if (errors.Latte?.hasError) {
            runValidationTasks("Latte", value);
          }
          setLatte(value);
        }}
        onBlur={() => runValidationTasks("Latte", Latte)}
        errorMessage={errors.Latte?.errorMessage}
        hasError={errors.Latte?.hasError}
        {...getOverrideProps(overrides, "Latte")}
      ></TextField>
      <TextField
        label="Mocha"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Mocha}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Tea,
              SpecialTea,
              HotChocolate,
              Cappaccino,
              Decaff,
              HotChocolateCreamMarshmellow,
              Latte,
              Mocha: value,
              AmericanoWhite,
              AmericanoBlack,
              Expresso,
              DoubleExpresso,
              FlatWhite,
              Syrup,
            };
            const result = onChange(modelFields);
            value = result?.Mocha ?? value;
          }
          if (errors.Mocha?.hasError) {
            runValidationTasks("Mocha", value);
          }
          setMocha(value);
        }}
        onBlur={() => runValidationTasks("Mocha", Mocha)}
        errorMessage={errors.Mocha?.errorMessage}
        hasError={errors.Mocha?.hasError}
        {...getOverrideProps(overrides, "Mocha")}
      ></TextField>
      <TextField
        label="Americano white"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={AmericanoWhite}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Tea,
              SpecialTea,
              HotChocolate,
              Cappaccino,
              Decaff,
              HotChocolateCreamMarshmellow,
              Latte,
              Mocha,
              AmericanoWhite: value,
              AmericanoBlack,
              Expresso,
              DoubleExpresso,
              FlatWhite,
              Syrup,
            };
            const result = onChange(modelFields);
            value = result?.AmericanoWhite ?? value;
          }
          if (errors.AmericanoWhite?.hasError) {
            runValidationTasks("AmericanoWhite", value);
          }
          setAmericanoWhite(value);
        }}
        onBlur={() => runValidationTasks("AmericanoWhite", AmericanoWhite)}
        errorMessage={errors.AmericanoWhite?.errorMessage}
        hasError={errors.AmericanoWhite?.hasError}
        {...getOverrideProps(overrides, "AmericanoWhite")}
      ></TextField>
      <TextField
        label="Americano black"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={AmericanoBlack}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Tea,
              SpecialTea,
              HotChocolate,
              Cappaccino,
              Decaff,
              HotChocolateCreamMarshmellow,
              Latte,
              Mocha,
              AmericanoWhite,
              AmericanoBlack: value,
              Expresso,
              DoubleExpresso,
              FlatWhite,
              Syrup,
            };
            const result = onChange(modelFields);
            value = result?.AmericanoBlack ?? value;
          }
          if (errors.AmericanoBlack?.hasError) {
            runValidationTasks("AmericanoBlack", value);
          }
          setAmericanoBlack(value);
        }}
        onBlur={() => runValidationTasks("AmericanoBlack", AmericanoBlack)}
        errorMessage={errors.AmericanoBlack?.errorMessage}
        hasError={errors.AmericanoBlack?.hasError}
        {...getOverrideProps(overrides, "AmericanoBlack")}
      ></TextField>
      <TextField
        label="Expresso"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Expresso}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Tea,
              SpecialTea,
              HotChocolate,
              Cappaccino,
              Decaff,
              HotChocolateCreamMarshmellow,
              Latte,
              Mocha,
              AmericanoWhite,
              AmericanoBlack,
              Expresso: value,
              DoubleExpresso,
              FlatWhite,
              Syrup,
            };
            const result = onChange(modelFields);
            value = result?.Expresso ?? value;
          }
          if (errors.Expresso?.hasError) {
            runValidationTasks("Expresso", value);
          }
          setExpresso(value);
        }}
        onBlur={() => runValidationTasks("Expresso", Expresso)}
        errorMessage={errors.Expresso?.errorMessage}
        hasError={errors.Expresso?.hasError}
        {...getOverrideProps(overrides, "Expresso")}
      ></TextField>
      <TextField
        label="Double expresso"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={DoubleExpresso}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Tea,
              SpecialTea,
              HotChocolate,
              Cappaccino,
              Decaff,
              HotChocolateCreamMarshmellow,
              Latte,
              Mocha,
              AmericanoWhite,
              AmericanoBlack,
              Expresso,
              DoubleExpresso: value,
              FlatWhite,
              Syrup,
            };
            const result = onChange(modelFields);
            value = result?.DoubleExpresso ?? value;
          }
          if (errors.DoubleExpresso?.hasError) {
            runValidationTasks("DoubleExpresso", value);
          }
          setDoubleExpresso(value);
        }}
        onBlur={() => runValidationTasks("DoubleExpresso", DoubleExpresso)}
        errorMessage={errors.DoubleExpresso?.errorMessage}
        hasError={errors.DoubleExpresso?.hasError}
        {...getOverrideProps(overrides, "DoubleExpresso")}
      ></TextField>
      <TextField
        label="Flat white"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={FlatWhite}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Tea,
              SpecialTea,
              HotChocolate,
              Cappaccino,
              Decaff,
              HotChocolateCreamMarshmellow,
              Latte,
              Mocha,
              AmericanoWhite,
              AmericanoBlack,
              Expresso,
              DoubleExpresso,
              FlatWhite: value,
              Syrup,
            };
            const result = onChange(modelFields);
            value = result?.FlatWhite ?? value;
          }
          if (errors.FlatWhite?.hasError) {
            runValidationTasks("FlatWhite", value);
          }
          setFlatWhite(value);
        }}
        onBlur={() => runValidationTasks("FlatWhite", FlatWhite)}
        errorMessage={errors.FlatWhite?.errorMessage}
        hasError={errors.FlatWhite?.hasError}
        {...getOverrideProps(overrides, "FlatWhite")}
      ></TextField>
      <TextField
        label="Syrup"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Syrup}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Tea,
              SpecialTea,
              HotChocolate,
              Cappaccino,
              Decaff,
              HotChocolateCreamMarshmellow,
              Latte,
              Mocha,
              AmericanoWhite,
              AmericanoBlack,
              Expresso,
              DoubleExpresso,
              FlatWhite,
              Syrup: value,
            };
            const result = onChange(modelFields);
            value = result?.Syrup ?? value;
          }
          if (errors.Syrup?.hasError) {
            runValidationTasks("Syrup", value);
          }
          setSyrup(value);
        }}
        onBlur={() => runValidationTasks("Syrup", Syrup)}
        errorMessage={errors.Syrup?.errorMessage}
        hasError={errors.Syrup?.hasError}
        {...getOverrideProps(overrides, "Syrup")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || hotDrinksModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || hotDrinksModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
