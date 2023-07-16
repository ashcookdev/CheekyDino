/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Confectionary } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ConfectionaryCreateForm(props) {
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
    Muffin: "",
    CakeSlice: "",
    Cookies: "",
    Buttons: "",
    Quavers: "",
    Pombears: "",
    Jazzles: "",
    Pringles: "",
    Raisins: "",
    SweetCone: "",
    Crisps60p: "",
    Crisps35p: "",
  };
  const [Muffin, setMuffin] = React.useState(initialValues.Muffin);
  const [CakeSlice, setCakeSlice] = React.useState(initialValues.CakeSlice);
  const [Cookies, setCookies] = React.useState(initialValues.Cookies);
  const [Buttons, setButtons] = React.useState(initialValues.Buttons);
  const [Quavers, setQuavers] = React.useState(initialValues.Quavers);
  const [Pombears, setPombears] = React.useState(initialValues.Pombears);
  const [Jazzles, setJazzles] = React.useState(initialValues.Jazzles);
  const [Pringles, setPringles] = React.useState(initialValues.Pringles);
  const [Raisins, setRaisins] = React.useState(initialValues.Raisins);
  const [SweetCone, setSweetCone] = React.useState(initialValues.SweetCone);
  const [Crisps60p, setCrisps60p] = React.useState(initialValues.Crisps60p);
  const [Crisps35p, setCrisps35p] = React.useState(initialValues.Crisps35p);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setMuffin(initialValues.Muffin);
    setCakeSlice(initialValues.CakeSlice);
    setCookies(initialValues.Cookies);
    setButtons(initialValues.Buttons);
    setQuavers(initialValues.Quavers);
    setPombears(initialValues.Pombears);
    setJazzles(initialValues.Jazzles);
    setPringles(initialValues.Pringles);
    setRaisins(initialValues.Raisins);
    setSweetCone(initialValues.SweetCone);
    setCrisps60p(initialValues.Crisps60p);
    setCrisps35p(initialValues.Crisps35p);
    setErrors({});
  };
  const validations = {
    Muffin: [],
    CakeSlice: [],
    Cookies: [],
    Buttons: [],
    Quavers: [],
    Pombears: [],
    Jazzles: [],
    Pringles: [],
    Raisins: [],
    SweetCone: [],
    Crisps60p: [],
    Crisps35p: [],
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
          Muffin,
          CakeSlice,
          Cookies,
          Buttons,
          Quavers,
          Pombears,
          Jazzles,
          Pringles,
          Raisins,
          SweetCone,
          Crisps60p,
          Crisps35p,
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
          await DataStore.save(new Confectionary(modelFields));
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
      {...getOverrideProps(overrides, "ConfectionaryCreateForm")}
      {...rest}
    >
      <TextField
        label="Muffin"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Muffin}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Muffin: value,
              CakeSlice,
              Cookies,
              Buttons,
              Quavers,
              Pombears,
              Jazzles,
              Pringles,
              Raisins,
              SweetCone,
              Crisps60p,
              Crisps35p,
            };
            const result = onChange(modelFields);
            value = result?.Muffin ?? value;
          }
          if (errors.Muffin?.hasError) {
            runValidationTasks("Muffin", value);
          }
          setMuffin(value);
        }}
        onBlur={() => runValidationTasks("Muffin", Muffin)}
        errorMessage={errors.Muffin?.errorMessage}
        hasError={errors.Muffin?.hasError}
        {...getOverrideProps(overrides, "Muffin")}
      ></TextField>
      <TextField
        label="Cake slice"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={CakeSlice}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Muffin,
              CakeSlice: value,
              Cookies,
              Buttons,
              Quavers,
              Pombears,
              Jazzles,
              Pringles,
              Raisins,
              SweetCone,
              Crisps60p,
              Crisps35p,
            };
            const result = onChange(modelFields);
            value = result?.CakeSlice ?? value;
          }
          if (errors.CakeSlice?.hasError) {
            runValidationTasks("CakeSlice", value);
          }
          setCakeSlice(value);
        }}
        onBlur={() => runValidationTasks("CakeSlice", CakeSlice)}
        errorMessage={errors.CakeSlice?.errorMessage}
        hasError={errors.CakeSlice?.hasError}
        {...getOverrideProps(overrides, "CakeSlice")}
      ></TextField>
      <TextField
        label="Cookies"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Cookies}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Muffin,
              CakeSlice,
              Cookies: value,
              Buttons,
              Quavers,
              Pombears,
              Jazzles,
              Pringles,
              Raisins,
              SweetCone,
              Crisps60p,
              Crisps35p,
            };
            const result = onChange(modelFields);
            value = result?.Cookies ?? value;
          }
          if (errors.Cookies?.hasError) {
            runValidationTasks("Cookies", value);
          }
          setCookies(value);
        }}
        onBlur={() => runValidationTasks("Cookies", Cookies)}
        errorMessage={errors.Cookies?.errorMessage}
        hasError={errors.Cookies?.hasError}
        {...getOverrideProps(overrides, "Cookies")}
      ></TextField>
      <TextField
        label="Buttons"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Buttons}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Muffin,
              CakeSlice,
              Cookies,
              Buttons: value,
              Quavers,
              Pombears,
              Jazzles,
              Pringles,
              Raisins,
              SweetCone,
              Crisps60p,
              Crisps35p,
            };
            const result = onChange(modelFields);
            value = result?.Buttons ?? value;
          }
          if (errors.Buttons?.hasError) {
            runValidationTasks("Buttons", value);
          }
          setButtons(value);
        }}
        onBlur={() => runValidationTasks("Buttons", Buttons)}
        errorMessage={errors.Buttons?.errorMessage}
        hasError={errors.Buttons?.hasError}
        {...getOverrideProps(overrides, "Buttons")}
      ></TextField>
      <TextField
        label="Quavers"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Quavers}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Muffin,
              CakeSlice,
              Cookies,
              Buttons,
              Quavers: value,
              Pombears,
              Jazzles,
              Pringles,
              Raisins,
              SweetCone,
              Crisps60p,
              Crisps35p,
            };
            const result = onChange(modelFields);
            value = result?.Quavers ?? value;
          }
          if (errors.Quavers?.hasError) {
            runValidationTasks("Quavers", value);
          }
          setQuavers(value);
        }}
        onBlur={() => runValidationTasks("Quavers", Quavers)}
        errorMessage={errors.Quavers?.errorMessage}
        hasError={errors.Quavers?.hasError}
        {...getOverrideProps(overrides, "Quavers")}
      ></TextField>
      <TextField
        label="Pombears"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Pombears}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Muffin,
              CakeSlice,
              Cookies,
              Buttons,
              Quavers,
              Pombears: value,
              Jazzles,
              Pringles,
              Raisins,
              SweetCone,
              Crisps60p,
              Crisps35p,
            };
            const result = onChange(modelFields);
            value = result?.Pombears ?? value;
          }
          if (errors.Pombears?.hasError) {
            runValidationTasks("Pombears", value);
          }
          setPombears(value);
        }}
        onBlur={() => runValidationTasks("Pombears", Pombears)}
        errorMessage={errors.Pombears?.errorMessage}
        hasError={errors.Pombears?.hasError}
        {...getOverrideProps(overrides, "Pombears")}
      ></TextField>
      <TextField
        label="Jazzles"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Jazzles}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Muffin,
              CakeSlice,
              Cookies,
              Buttons,
              Quavers,
              Pombears,
              Jazzles: value,
              Pringles,
              Raisins,
              SweetCone,
              Crisps60p,
              Crisps35p,
            };
            const result = onChange(modelFields);
            value = result?.Jazzles ?? value;
          }
          if (errors.Jazzles?.hasError) {
            runValidationTasks("Jazzles", value);
          }
          setJazzles(value);
        }}
        onBlur={() => runValidationTasks("Jazzles", Jazzles)}
        errorMessage={errors.Jazzles?.errorMessage}
        hasError={errors.Jazzles?.hasError}
        {...getOverrideProps(overrides, "Jazzles")}
      ></TextField>
      <TextField
        label="Pringles"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Pringles}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Muffin,
              CakeSlice,
              Cookies,
              Buttons,
              Quavers,
              Pombears,
              Jazzles,
              Pringles: value,
              Raisins,
              SweetCone,
              Crisps60p,
              Crisps35p,
            };
            const result = onChange(modelFields);
            value = result?.Pringles ?? value;
          }
          if (errors.Pringles?.hasError) {
            runValidationTasks("Pringles", value);
          }
          setPringles(value);
        }}
        onBlur={() => runValidationTasks("Pringles", Pringles)}
        errorMessage={errors.Pringles?.errorMessage}
        hasError={errors.Pringles?.hasError}
        {...getOverrideProps(overrides, "Pringles")}
      ></TextField>
      <TextField
        label="Raisins"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Raisins}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Muffin,
              CakeSlice,
              Cookies,
              Buttons,
              Quavers,
              Pombears,
              Jazzles,
              Pringles,
              Raisins: value,
              SweetCone,
              Crisps60p,
              Crisps35p,
            };
            const result = onChange(modelFields);
            value = result?.Raisins ?? value;
          }
          if (errors.Raisins?.hasError) {
            runValidationTasks("Raisins", value);
          }
          setRaisins(value);
        }}
        onBlur={() => runValidationTasks("Raisins", Raisins)}
        errorMessage={errors.Raisins?.errorMessage}
        hasError={errors.Raisins?.hasError}
        {...getOverrideProps(overrides, "Raisins")}
      ></TextField>
      <TextField
        label="Sweet cone"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={SweetCone}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Muffin,
              CakeSlice,
              Cookies,
              Buttons,
              Quavers,
              Pombears,
              Jazzles,
              Pringles,
              Raisins,
              SweetCone: value,
              Crisps60p,
              Crisps35p,
            };
            const result = onChange(modelFields);
            value = result?.SweetCone ?? value;
          }
          if (errors.SweetCone?.hasError) {
            runValidationTasks("SweetCone", value);
          }
          setSweetCone(value);
        }}
        onBlur={() => runValidationTasks("SweetCone", SweetCone)}
        errorMessage={errors.SweetCone?.errorMessage}
        hasError={errors.SweetCone?.hasError}
        {...getOverrideProps(overrides, "SweetCone")}
      ></TextField>
      <TextField
        label="Crisps60p"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Crisps60p}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Muffin,
              CakeSlice,
              Cookies,
              Buttons,
              Quavers,
              Pombears,
              Jazzles,
              Pringles,
              Raisins,
              SweetCone,
              Crisps60p: value,
              Crisps35p,
            };
            const result = onChange(modelFields);
            value = result?.Crisps60p ?? value;
          }
          if (errors.Crisps60p?.hasError) {
            runValidationTasks("Crisps60p", value);
          }
          setCrisps60p(value);
        }}
        onBlur={() => runValidationTasks("Crisps60p", Crisps60p)}
        errorMessage={errors.Crisps60p?.errorMessage}
        hasError={errors.Crisps60p?.hasError}
        {...getOverrideProps(overrides, "Crisps60p")}
      ></TextField>
      <TextField
        label="Crisps35p"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Crisps35p}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Muffin,
              CakeSlice,
              Cookies,
              Buttons,
              Quavers,
              Pombears,
              Jazzles,
              Pringles,
              Raisins,
              SweetCone,
              Crisps60p,
              Crisps35p: value,
            };
            const result = onChange(modelFields);
            value = result?.Crisps35p ?? value;
          }
          if (errors.Crisps35p?.hasError) {
            runValidationTasks("Crisps35p", value);
          }
          setCrisps35p(value);
        }}
        onBlur={() => runValidationTasks("Crisps35p", Crisps35p)}
        errorMessage={errors.Crisps35p?.errorMessage}
        hasError={errors.Crisps35p?.hasError}
        {...getOverrideProps(overrides, "Crisps35p")}
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
