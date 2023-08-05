/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { TimeEntry } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function TimeEntryUpdateForm(props) {
  const {
    id: idProp,
    timeEntry: timeEntryModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    StaffID: "",
    ClockInTime: "",
    ClockOutTime: "",
    Hours: "",
    Date: "",
    ShiftStart: "",
    ShiftFinish: "",
  };
  const [StaffID, setStaffID] = React.useState(initialValues.StaffID);
  const [ClockInTime, setClockInTime] = React.useState(
    initialValues.ClockInTime
  );
  const [ClockOutTime, setClockOutTime] = React.useState(
    initialValues.ClockOutTime
  );
  const [Hours, setHours] = React.useState(initialValues.Hours);
  const [Date, setDate] = React.useState(initialValues.Date);
  const [ShiftStart, setShiftStart] = React.useState(initialValues.ShiftStart);
  const [ShiftFinish, setShiftFinish] = React.useState(
    initialValues.ShiftFinish
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = timeEntryRecord
      ? { ...initialValues, ...timeEntryRecord }
      : initialValues;
    setStaffID(cleanValues.StaffID);
    setClockInTime(cleanValues.ClockInTime);
    setClockOutTime(cleanValues.ClockOutTime);
    setHours(cleanValues.Hours);
    setDate(cleanValues.Date);
    setShiftStart(cleanValues.ShiftStart);
    setShiftFinish(cleanValues.ShiftFinish);
    setErrors({});
  };
  const [timeEntryRecord, setTimeEntryRecord] =
    React.useState(timeEntryModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(TimeEntry, idProp)
        : timeEntryModelProp;
      setTimeEntryRecord(record);
    };
    queryData();
  }, [idProp, timeEntryModelProp]);
  React.useEffect(resetStateValues, [timeEntryRecord]);
  const validations = {
    StaffID: [],
    ClockInTime: [],
    ClockOutTime: [],
    Hours: [],
    Date: [],
    ShiftStart: [],
    ShiftFinish: [],
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
          StaffID,
          ClockInTime,
          ClockOutTime,
          Hours,
          Date,
          ShiftStart,
          ShiftFinish,
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
            TimeEntry.copyOf(timeEntryRecord, (updated) => {
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
      {...getOverrideProps(overrides, "TimeEntryUpdateForm")}
      {...rest}
    >
      <TextField
        label="Staff id"
        isRequired={false}
        isReadOnly={false}
        value={StaffID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              StaffID: value,
              ClockInTime,
              ClockOutTime,
              Hours,
              Date,
              ShiftStart,
              ShiftFinish,
            };
            const result = onChange(modelFields);
            value = result?.StaffID ?? value;
          }
          if (errors.StaffID?.hasError) {
            runValidationTasks("StaffID", value);
          }
          setStaffID(value);
        }}
        onBlur={() => runValidationTasks("StaffID", StaffID)}
        errorMessage={errors.StaffID?.errorMessage}
        hasError={errors.StaffID?.hasError}
        {...getOverrideProps(overrides, "StaffID")}
      ></TextField>
      <TextField
        label="Clock in time"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={ClockInTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              StaffID,
              ClockInTime: value,
              ClockOutTime,
              Hours,
              Date,
              ShiftStart,
              ShiftFinish,
            };
            const result = onChange(modelFields);
            value = result?.ClockInTime ?? value;
          }
          if (errors.ClockInTime?.hasError) {
            runValidationTasks("ClockInTime", value);
          }
          setClockInTime(value);
        }}
        onBlur={() => runValidationTasks("ClockInTime", ClockInTime)}
        errorMessage={errors.ClockInTime?.errorMessage}
        hasError={errors.ClockInTime?.hasError}
        {...getOverrideProps(overrides, "ClockInTime")}
      ></TextField>
      <TextField
        label="Clock out time"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={ClockOutTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              StaffID,
              ClockInTime,
              ClockOutTime: value,
              Hours,
              Date,
              ShiftStart,
              ShiftFinish,
            };
            const result = onChange(modelFields);
            value = result?.ClockOutTime ?? value;
          }
          if (errors.ClockOutTime?.hasError) {
            runValidationTasks("ClockOutTime", value);
          }
          setClockOutTime(value);
        }}
        onBlur={() => runValidationTasks("ClockOutTime", ClockOutTime)}
        errorMessage={errors.ClockOutTime?.errorMessage}
        hasError={errors.ClockOutTime?.hasError}
        {...getOverrideProps(overrides, "ClockOutTime")}
      ></TextField>
      <TextField
        label="Hours"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Hours}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              StaffID,
              ClockInTime,
              ClockOutTime,
              Hours: value,
              Date,
              ShiftStart,
              ShiftFinish,
            };
            const result = onChange(modelFields);
            value = result?.Hours ?? value;
          }
          if (errors.Hours?.hasError) {
            runValidationTasks("Hours", value);
          }
          setHours(value);
        }}
        onBlur={() => runValidationTasks("Hours", Hours)}
        errorMessage={errors.Hours?.errorMessage}
        hasError={errors.Hours?.hasError}
        {...getOverrideProps(overrides, "Hours")}
      ></TextField>
      <TextField
        label="Date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={Date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              StaffID,
              ClockInTime,
              ClockOutTime,
              Hours,
              Date: value,
              ShiftStart,
              ShiftFinish,
            };
            const result = onChange(modelFields);
            value = result?.Date ?? value;
          }
          if (errors.Date?.hasError) {
            runValidationTasks("Date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("Date", Date)}
        errorMessage={errors.Date?.errorMessage}
        hasError={errors.Date?.hasError}
        {...getOverrideProps(overrides, "Date")}
      ></TextField>
      <TextField
        label="Shift start"
        isRequired={false}
        isReadOnly={false}
        value={ShiftStart}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              StaffID,
              ClockInTime,
              ClockOutTime,
              Hours,
              Date,
              ShiftStart: value,
              ShiftFinish,
            };
            const result = onChange(modelFields);
            value = result?.ShiftStart ?? value;
          }
          if (errors.ShiftStart?.hasError) {
            runValidationTasks("ShiftStart", value);
          }
          setShiftStart(value);
        }}
        onBlur={() => runValidationTasks("ShiftStart", ShiftStart)}
        errorMessage={errors.ShiftStart?.errorMessage}
        hasError={errors.ShiftStart?.hasError}
        {...getOverrideProps(overrides, "ShiftStart")}
      ></TextField>
      <TextField
        label="Shift finish"
        isRequired={false}
        isReadOnly={false}
        value={ShiftFinish}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              StaffID,
              ClockInTime,
              ClockOutTime,
              Hours,
              Date,
              ShiftStart,
              ShiftFinish: value,
            };
            const result = onChange(modelFields);
            value = result?.ShiftFinish ?? value;
          }
          if (errors.ShiftFinish?.hasError) {
            runValidationTasks("ShiftFinish", value);
          }
          setShiftFinish(value);
        }}
        onBlur={() => runValidationTasks("ShiftFinish", ShiftFinish)}
        errorMessage={errors.ShiftFinish?.errorMessage}
        hasError={errors.ShiftFinish?.hasError}
        {...getOverrideProps(overrides, "ShiftFinish")}
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
          isDisabled={!(idProp || timeEntryModelProp)}
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
              !(idProp || timeEntryModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
