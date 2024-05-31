/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { CustomerScreen } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function CustomerScreenCreateForm(props) {
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
    Message: "",
    Show: false,
    Number: "",
  };
  const [Message, setMessage] = React.useState(initialValues.Message);
  const [Show, setShow] = React.useState(initialValues.Show);
  const [Number, setNumber] = React.useState(initialValues.Number);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setMessage(initialValues.Message);
    setShow(initialValues.Show);
    setNumber(initialValues.Number);
    setErrors({});
  };
  const validations = {
    Message: [],
    Show: [],
    Number: [],
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
          Message,
          Show,
          Number,
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
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(new CustomerScreen(modelFields));
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
      {...getOverrideProps(overrides, "CustomerScreenCreateForm")}
      {...rest}
    >
      <TextField
        label="Message"
        isRequired={false}
        isReadOnly={false}
        value={Message}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Message: value,
              Show,
              Number,
            };
            const result = onChange(modelFields);
            value = result?.Message ?? value;
          }
          if (errors.Message?.hasError) {
            runValidationTasks("Message", value);
          }
          setMessage(value);
        }}
        onBlur={() => runValidationTasks("Message", Message)}
        errorMessage={errors.Message?.errorMessage}
        hasError={errors.Message?.hasError}
        {...getOverrideProps(overrides, "Message")}
      ></TextField>
      <SwitchField
        label="Show"
        defaultChecked={false}
        isDisabled={false}
        isChecked={Show}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Message,
              Show: value,
              Number,
            };
            const result = onChange(modelFields);
            value = result?.Show ?? value;
          }
          if (errors.Show?.hasError) {
            runValidationTasks("Show", value);
          }
          setShow(value);
        }}
        onBlur={() => runValidationTasks("Show", Show)}
        errorMessage={errors.Show?.errorMessage}
        hasError={errors.Show?.hasError}
        {...getOverrideProps(overrides, "Show")}
      ></SwitchField>
      <TextField
        label="Number"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Number}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Message,
              Show,
              Number: value,
            };
            const result = onChange(modelFields);
            value = result?.Number ?? value;
          }
          if (errors.Number?.hasError) {
            runValidationTasks("Number", value);
          }
          setNumber(value);
        }}
        onBlur={() => runValidationTasks("Number", Number)}
        errorMessage={errors.Number?.errorMessage}
        hasError={errors.Number?.hasError}
        {...getOverrideProps(overrides, "Number")}
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
