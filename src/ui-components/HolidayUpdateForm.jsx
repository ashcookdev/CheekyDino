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
import { Holiday } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function HolidayUpdateForm(props) {
  const {
    id: idProp,
    holiday: holidayModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Name: "",
    StartDate: "",
    Description: "",
    EndDate: "",
    Approved: false,
  };
  const [Name, setName] = React.useState(initialValues.Name);
  const [StartDate, setStartDate] = React.useState(initialValues.StartDate);
  const [Description, setDescription] = React.useState(
    initialValues.Description
  );
  const [EndDate, setEndDate] = React.useState(initialValues.EndDate);
  const [Approved, setApproved] = React.useState(initialValues.Approved);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = holidayRecord
      ? { ...initialValues, ...holidayRecord }
      : initialValues;
    setName(cleanValues.Name);
    setStartDate(cleanValues.StartDate);
    setDescription(cleanValues.Description);
    setEndDate(cleanValues.EndDate);
    setApproved(cleanValues.Approved);
    setErrors({});
  };
  const [holidayRecord, setHolidayRecord] = React.useState(holidayModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Holiday, idProp)
        : holidayModelProp;
      setHolidayRecord(record);
    };
    queryData();
  }, [idProp, holidayModelProp]);
  React.useEffect(resetStateValues, [holidayRecord]);
  const validations = {
    Name: [],
    StartDate: [],
    Description: [],
    EndDate: [],
    Approved: [],
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
          Name,
          StartDate,
          Description,
          EndDate,
          Approved,
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
          await DataStore.save(
            Holiday.copyOf(holidayRecord, (updated) => {
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
      {...getOverrideProps(overrides, "HolidayUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={Name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name: value,
              StartDate,
              Description,
              EndDate,
              Approved,
            };
            const result = onChange(modelFields);
            value = result?.Name ?? value;
          }
          if (errors.Name?.hasError) {
            runValidationTasks("Name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("Name", Name)}
        errorMessage={errors.Name?.errorMessage}
        hasError={errors.Name?.hasError}
        {...getOverrideProps(overrides, "Name")}
      ></TextField>
      <TextField
        label="Start date"
        isRequired={false}
        isReadOnly={false}
        value={StartDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              StartDate: value,
              Description,
              EndDate,
              Approved,
            };
            const result = onChange(modelFields);
            value = result?.StartDate ?? value;
          }
          if (errors.StartDate?.hasError) {
            runValidationTasks("StartDate", value);
          }
          setStartDate(value);
        }}
        onBlur={() => runValidationTasks("StartDate", StartDate)}
        errorMessage={errors.StartDate?.errorMessage}
        hasError={errors.StartDate?.hasError}
        {...getOverrideProps(overrides, "StartDate")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={Description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              StartDate,
              Description: value,
              EndDate,
              Approved,
            };
            const result = onChange(modelFields);
            value = result?.Description ?? value;
          }
          if (errors.Description?.hasError) {
            runValidationTasks("Description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("Description", Description)}
        errorMessage={errors.Description?.errorMessage}
        hasError={errors.Description?.hasError}
        {...getOverrideProps(overrides, "Description")}
      ></TextField>
      <TextField
        label="End date"
        isRequired={false}
        isReadOnly={false}
        value={EndDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              StartDate,
              Description,
              EndDate: value,
              Approved,
            };
            const result = onChange(modelFields);
            value = result?.EndDate ?? value;
          }
          if (errors.EndDate?.hasError) {
            runValidationTasks("EndDate", value);
          }
          setEndDate(value);
        }}
        onBlur={() => runValidationTasks("EndDate", EndDate)}
        errorMessage={errors.EndDate?.errorMessage}
        hasError={errors.EndDate?.hasError}
        {...getOverrideProps(overrides, "EndDate")}
      ></TextField>
      <SwitchField
        label="Approved"
        defaultChecked={false}
        isDisabled={false}
        isChecked={Approved}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Name,
              StartDate,
              Description,
              EndDate,
              Approved: value,
            };
            const result = onChange(modelFields);
            value = result?.Approved ?? value;
          }
          if (errors.Approved?.hasError) {
            runValidationTasks("Approved", value);
          }
          setApproved(value);
        }}
        onBlur={() => runValidationTasks("Approved", Approved)}
        errorMessage={errors.Approved?.errorMessage}
        hasError={errors.Approved?.hasError}
        {...getOverrideProps(overrides, "Approved")}
      ></SwitchField>
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
          isDisabled={!(idProp || holidayModelProp)}
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
              !(idProp || holidayModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
