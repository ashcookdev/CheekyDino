/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { HotDogs } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function HotDogsCreateForm(props) {
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
    CreatedTime: "",
    CreatedDate: "",
    StockLevel: "",
    Price: "",
  };
  const [CreatedTime, setCreatedTime] = React.useState(
    initialValues.CreatedTime
  );
  const [CreatedDate, setCreatedDate] = React.useState(
    initialValues.CreatedDate
  );
  const [StockLevel, setStockLevel] = React.useState(initialValues.StockLevel);
  const [Price, setPrice] = React.useState(initialValues.Price);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setCreatedTime(initialValues.CreatedTime);
    setCreatedDate(initialValues.CreatedDate);
    setStockLevel(initialValues.StockLevel);
    setPrice(initialValues.Price);
    setErrors({});
  };
  const validations = {
    CreatedTime: [],
    CreatedDate: [],
    StockLevel: [],
    Price: [],
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
          CreatedTime,
          CreatedDate,
          StockLevel,
          Price,
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
          await DataStore.save(new HotDogs(modelFields));
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
      {...getOverrideProps(overrides, "HotDogsCreateForm")}
      {...rest}
    >
      <TextField
        label="Created time"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={CreatedTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              CreatedTime: value,
              CreatedDate,
              StockLevel,
              Price,
            };
            const result = onChange(modelFields);
            value = result?.CreatedTime ?? value;
          }
          if (errors.CreatedTime?.hasError) {
            runValidationTasks("CreatedTime", value);
          }
          setCreatedTime(value);
        }}
        onBlur={() => runValidationTasks("CreatedTime", CreatedTime)}
        errorMessage={errors.CreatedTime?.errorMessage}
        hasError={errors.CreatedTime?.hasError}
        {...getOverrideProps(overrides, "CreatedTime")}
      ></TextField>
      <TextField
        label="Created date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={CreatedDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              CreatedTime,
              CreatedDate: value,
              StockLevel,
              Price,
            };
            const result = onChange(modelFields);
            value = result?.CreatedDate ?? value;
          }
          if (errors.CreatedDate?.hasError) {
            runValidationTasks("CreatedDate", value);
          }
          setCreatedDate(value);
        }}
        onBlur={() => runValidationTasks("CreatedDate", CreatedDate)}
        errorMessage={errors.CreatedDate?.errorMessage}
        hasError={errors.CreatedDate?.hasError}
        {...getOverrideProps(overrides, "CreatedDate")}
      ></TextField>
      <TextField
        label="Stock level"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={StockLevel}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              CreatedTime,
              CreatedDate,
              StockLevel: value,
              Price,
            };
            const result = onChange(modelFields);
            value = result?.StockLevel ?? value;
          }
          if (errors.StockLevel?.hasError) {
            runValidationTasks("StockLevel", value);
          }
          setStockLevel(value);
        }}
        onBlur={() => runValidationTasks("StockLevel", StockLevel)}
        errorMessage={errors.StockLevel?.errorMessage}
        hasError={errors.StockLevel?.hasError}
        {...getOverrideProps(overrides, "StockLevel")}
      ></TextField>
      <TextField
        label="Price"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Price}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              CreatedTime,
              CreatedDate,
              StockLevel,
              Price: value,
            };
            const result = onChange(modelFields);
            value = result?.Price ?? value;
          }
          if (errors.Price?.hasError) {
            runValidationTasks("Price", value);
          }
          setPrice(value);
        }}
        onBlur={() => runValidationTasks("Price", Price)}
        errorMessage={errors.Price?.errorMessage}
        hasError={errors.Price?.hasError}
        {...getOverrideProps(overrides, "Price")}
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
