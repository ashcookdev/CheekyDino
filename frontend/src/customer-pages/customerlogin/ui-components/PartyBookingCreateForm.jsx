/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { PartyBooking } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function PartyBookingCreateForm(props) {
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
    ChildName: "",
    ChildAge: "",
    NoOfChildren: "",
    FoodOptionSelected: "",
    AdultHotFoodQty: "",
    AdultColdFoodQty: "",
    Total: "",
  };
  const [ChildName, setChildName] = React.useState(initialValues.ChildName);
  const [ChildAge, setChildAge] = React.useState(initialValues.ChildAge);
  const [NoOfChildren, setNoOfChildren] = React.useState(
    initialValues.NoOfChildren
  );
  const [FoodOptionSelected, setFoodOptionSelected] = React.useState(
    initialValues.FoodOptionSelected
  );
  const [AdultHotFoodQty, setAdultHotFoodQty] = React.useState(
    initialValues.AdultHotFoodQty
  );
  const [AdultColdFoodQty, setAdultColdFoodQty] = React.useState(
    initialValues.AdultColdFoodQty
  );
  const [Total, setTotal] = React.useState(initialValues.Total);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setChildName(initialValues.ChildName);
    setChildAge(initialValues.ChildAge);
    setNoOfChildren(initialValues.NoOfChildren);
    setFoodOptionSelected(initialValues.FoodOptionSelected);
    setAdultHotFoodQty(initialValues.AdultHotFoodQty);
    setAdultColdFoodQty(initialValues.AdultColdFoodQty);
    setTotal(initialValues.Total);
    setErrors({});
  };
  const validations = {
    ChildName: [{ type: "Required" }],
    ChildAge: [{ type: "Required" }],
    NoOfChildren: [{ type: "Required" }],
    FoodOptionSelected: [],
    AdultHotFoodQty: [],
    AdultColdFoodQty: [],
    Total: [{ type: "Required" }],
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
          ChildName,
          ChildAge,
          NoOfChildren,
          FoodOptionSelected,
          AdultHotFoodQty,
          AdultColdFoodQty,
          Total,
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
          await DataStore.save(new PartyBooking(modelFields));
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
      {...getOverrideProps(overrides, "PartyBookingCreateForm")}
      {...rest}
    >
      <TextField
        label="Child name"
        isRequired={true}
        isReadOnly={false}
        value={ChildName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ChildName: value,
              ChildAge,
              NoOfChildren,
              FoodOptionSelected,
              AdultHotFoodQty,
              AdultColdFoodQty,
              Total,
            };
            const result = onChange(modelFields);
            value = result?.ChildName ?? value;
          }
          if (errors.ChildName?.hasError) {
            runValidationTasks("ChildName", value);
          }
          setChildName(value);
        }}
        onBlur={() => runValidationTasks("ChildName", ChildName)}
        errorMessage={errors.ChildName?.errorMessage}
        hasError={errors.ChildName?.hasError}
        {...getOverrideProps(overrides, "ChildName")}
      ></TextField>
      <TextField
        label="Child age"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={ChildAge}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ChildName,
              ChildAge: value,
              NoOfChildren,
              FoodOptionSelected,
              AdultHotFoodQty,
              AdultColdFoodQty,
              Total,
            };
            const result = onChange(modelFields);
            value = result?.ChildAge ?? value;
          }
          if (errors.ChildAge?.hasError) {
            runValidationTasks("ChildAge", value);
          }
          setChildAge(value);
        }}
        onBlur={() => runValidationTasks("ChildAge", ChildAge)}
        errorMessage={errors.ChildAge?.errorMessage}
        hasError={errors.ChildAge?.hasError}
        {...getOverrideProps(overrides, "ChildAge")}
      ></TextField>
      <TextField
        label="No of children"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={NoOfChildren}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ChildName,
              ChildAge,
              NoOfChildren: value,
              FoodOptionSelected,
              AdultHotFoodQty,
              AdultColdFoodQty,
              Total,
            };
            const result = onChange(modelFields);
            value = result?.NoOfChildren ?? value;
          }
          if (errors.NoOfChildren?.hasError) {
            runValidationTasks("NoOfChildren", value);
          }
          setNoOfChildren(value);
        }}
        onBlur={() => runValidationTasks("NoOfChildren", NoOfChildren)}
        errorMessage={errors.NoOfChildren?.errorMessage}
        hasError={errors.NoOfChildren?.hasError}
        {...getOverrideProps(overrides, "NoOfChildren")}
      ></TextField>
      <TextField
        label="Food option selected"
        isRequired={false}
        isReadOnly={false}
        value={FoodOptionSelected}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ChildName,
              ChildAge,
              NoOfChildren,
              FoodOptionSelected: value,
              AdultHotFoodQty,
              AdultColdFoodQty,
              Total,
            };
            const result = onChange(modelFields);
            value = result?.FoodOptionSelected ?? value;
          }
          if (errors.FoodOptionSelected?.hasError) {
            runValidationTasks("FoodOptionSelected", value);
          }
          setFoodOptionSelected(value);
        }}
        onBlur={() =>
          runValidationTasks("FoodOptionSelected", FoodOptionSelected)
        }
        errorMessage={errors.FoodOptionSelected?.errorMessage}
        hasError={errors.FoodOptionSelected?.hasError}
        {...getOverrideProps(overrides, "FoodOptionSelected")}
      ></TextField>
      <TextField
        label="Adult hot food qty"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={AdultHotFoodQty}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ChildName,
              ChildAge,
              NoOfChildren,
              FoodOptionSelected,
              AdultHotFoodQty: value,
              AdultColdFoodQty,
              Total,
            };
            const result = onChange(modelFields);
            value = result?.AdultHotFoodQty ?? value;
          }
          if (errors.AdultHotFoodQty?.hasError) {
            runValidationTasks("AdultHotFoodQty", value);
          }
          setAdultHotFoodQty(value);
        }}
        onBlur={() => runValidationTasks("AdultHotFoodQty", AdultHotFoodQty)}
        errorMessage={errors.AdultHotFoodQty?.errorMessage}
        hasError={errors.AdultHotFoodQty?.hasError}
        {...getOverrideProps(overrides, "AdultHotFoodQty")}
      ></TextField>
      <TextField
        label="Adult cold food qty"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={AdultColdFoodQty}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ChildName,
              ChildAge,
              NoOfChildren,
              FoodOptionSelected,
              AdultHotFoodQty,
              AdultColdFoodQty: value,
              Total,
            };
            const result = onChange(modelFields);
            value = result?.AdultColdFoodQty ?? value;
          }
          if (errors.AdultColdFoodQty?.hasError) {
            runValidationTasks("AdultColdFoodQty", value);
          }
          setAdultColdFoodQty(value);
        }}
        onBlur={() => runValidationTasks("AdultColdFoodQty", AdultColdFoodQty)}
        errorMessage={errors.AdultColdFoodQty?.errorMessage}
        hasError={errors.AdultColdFoodQty?.hasError}
        {...getOverrideProps(overrides, "AdultColdFoodQty")}
      ></TextField>
      <TextField
        label="Total"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={Total}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              ChildName,
              ChildAge,
              NoOfChildren,
              FoodOptionSelected,
              AdultHotFoodQty,
              AdultColdFoodQty,
              Total: value,
            };
            const result = onChange(modelFields);
            value = result?.Total ?? value;
          }
          if (errors.Total?.hasError) {
            runValidationTasks("Total", value);
          }
          setTotal(value);
        }}
        onBlur={() => runValidationTasks("Total", Total)}
        errorMessage={errors.Total?.errorMessage}
        hasError={errors.Total?.hasError}
        {...getOverrideProps(overrides, "Total")}
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
