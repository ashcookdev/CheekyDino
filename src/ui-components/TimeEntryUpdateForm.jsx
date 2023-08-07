/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { TimeEntry } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
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
    ClockInTime: [],
    ClockOutTime: [],
    Hours: "",
    Dates: [],
    ShiftStart: [],
    ShiftFinish: [],
    WeekNumber: "",
    StaffNam: "",
  };
  const [StaffID, setStaffID] = React.useState(initialValues.StaffID);
  const [ClockInTime, setClockInTime] = React.useState(
    initialValues.ClockInTime
  );
  const [ClockOutTime, setClockOutTime] = React.useState(
    initialValues.ClockOutTime
  );
  const [Hours, setHours] = React.useState(initialValues.Hours);
  const [Dates, setDates] = React.useState(initialValues.Dates);
  const [ShiftStart, setShiftStart] = React.useState(initialValues.ShiftStart);
  const [ShiftFinish, setShiftFinish] = React.useState(
    initialValues.ShiftFinish
  );
  const [WeekNumber, setWeekNumber] = React.useState(initialValues.WeekNumber);
  const [StaffNam, setStaffNam] = React.useState(initialValues.StaffNam);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = timeEntryRecord
      ? { ...initialValues, ...timeEntryRecord }
      : initialValues;
    setStaffID(cleanValues.StaffID);
    setClockInTime(cleanValues.ClockInTime ?? []);
    setCurrentClockInTimeValue("");
    setClockOutTime(cleanValues.ClockOutTime ?? []);
    setCurrentClockOutTimeValue("");
    setHours(cleanValues.Hours);
    setDates(cleanValues.Dates ?? []);
    setCurrentDatesValue("");
    setShiftStart(cleanValues.ShiftStart ?? []);
    setCurrentShiftStartValue("");
    setShiftFinish(cleanValues.ShiftFinish ?? []);
    setCurrentShiftFinishValue("");
    setWeekNumber(cleanValues.WeekNumber);
    setStaffNam(cleanValues.StaffNam);
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
  const [currentClockInTimeValue, setCurrentClockInTimeValue] =
    React.useState("");
  const ClockInTimeRef = React.createRef();
  const [currentClockOutTimeValue, setCurrentClockOutTimeValue] =
    React.useState("");
  const ClockOutTimeRef = React.createRef();
  const [currentDatesValue, setCurrentDatesValue] = React.useState("");
  const DatesRef = React.createRef();
  const [currentShiftStartValue, setCurrentShiftStartValue] =
    React.useState("");
  const ShiftStartRef = React.createRef();
  const [currentShiftFinishValue, setCurrentShiftFinishValue] =
    React.useState("");
  const ShiftFinishRef = React.createRef();
  const validations = {
    StaffID: [],
    ClockInTime: [],
    ClockOutTime: [],
    Hours: [],
    Dates: [],
    ShiftStart: [],
    ShiftFinish: [],
    WeekNumber: [],
    StaffNam: [],
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
          Dates,
          ShiftStart,
          ShiftFinish,
          WeekNumber,
          StaffNam,
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
              Dates,
              ShiftStart,
              ShiftFinish,
              WeekNumber,
              StaffNam,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              StaffID,
              ClockInTime: values,
              ClockOutTime,
              Hours,
              Dates,
              ShiftStart,
              ShiftFinish,
              WeekNumber,
              StaffNam,
            };
            const result = onChange(modelFields);
            values = result?.ClockInTime ?? values;
          }
          setClockInTime(values);
          setCurrentClockInTimeValue("");
        }}
        currentFieldValue={currentClockInTimeValue}
        label={"Clock in time"}
        items={ClockInTime}
        hasError={errors?.ClockInTime?.hasError}
        errorMessage={errors?.ClockInTime?.errorMessage}
        setFieldValue={setCurrentClockInTimeValue}
        inputFieldRef={ClockInTimeRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Clock in time"
          isRequired={false}
          isReadOnly={false}
          type="time"
          value={currentClockInTimeValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.ClockInTime?.hasError) {
              runValidationTasks("ClockInTime", value);
            }
            setCurrentClockInTimeValue(value);
          }}
          onBlur={() =>
            runValidationTasks("ClockInTime", currentClockInTimeValue)
          }
          errorMessage={errors.ClockInTime?.errorMessage}
          hasError={errors.ClockInTime?.hasError}
          ref={ClockInTimeRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "ClockInTime")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              StaffID,
              ClockInTime,
              ClockOutTime: values,
              Hours,
              Dates,
              ShiftStart,
              ShiftFinish,
              WeekNumber,
              StaffNam,
            };
            const result = onChange(modelFields);
            values = result?.ClockOutTime ?? values;
          }
          setClockOutTime(values);
          setCurrentClockOutTimeValue("");
        }}
        currentFieldValue={currentClockOutTimeValue}
        label={"Clock out time"}
        items={ClockOutTime}
        hasError={errors?.ClockOutTime?.hasError}
        errorMessage={errors?.ClockOutTime?.errorMessage}
        setFieldValue={setCurrentClockOutTimeValue}
        inputFieldRef={ClockOutTimeRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Clock out time"
          isRequired={false}
          isReadOnly={false}
          type="time"
          value={currentClockOutTimeValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.ClockOutTime?.hasError) {
              runValidationTasks("ClockOutTime", value);
            }
            setCurrentClockOutTimeValue(value);
          }}
          onBlur={() =>
            runValidationTasks("ClockOutTime", currentClockOutTimeValue)
          }
          errorMessage={errors.ClockOutTime?.errorMessage}
          hasError={errors.ClockOutTime?.hasError}
          ref={ClockOutTimeRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "ClockOutTime")}
        ></TextField>
      </ArrayField>
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
              Dates,
              ShiftStart,
              ShiftFinish,
              WeekNumber,
              StaffNam,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              StaffID,
              ClockInTime,
              ClockOutTime,
              Hours,
              Dates: values,
              ShiftStart,
              ShiftFinish,
              WeekNumber,
              StaffNam,
            };
            const result = onChange(modelFields);
            values = result?.Dates ?? values;
          }
          setDates(values);
          setCurrentDatesValue("");
        }}
        currentFieldValue={currentDatesValue}
        label={"Dates"}
        items={Dates}
        hasError={errors?.Dates?.hasError}
        errorMessage={errors?.Dates?.errorMessage}
        setFieldValue={setCurrentDatesValue}
        inputFieldRef={DatesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Dates"
          isRequired={false}
          isReadOnly={false}
          type="date"
          value={currentDatesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Dates?.hasError) {
              runValidationTasks("Dates", value);
            }
            setCurrentDatesValue(value);
          }}
          onBlur={() => runValidationTasks("Dates", currentDatesValue)}
          errorMessage={errors.Dates?.errorMessage}
          hasError={errors.Dates?.hasError}
          ref={DatesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Dates")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              StaffID,
              ClockInTime,
              ClockOutTime,
              Hours,
              Dates,
              ShiftStart: values,
              ShiftFinish,
              WeekNumber,
              StaffNam,
            };
            const result = onChange(modelFields);
            values = result?.ShiftStart ?? values;
          }
          setShiftStart(values);
          setCurrentShiftStartValue("");
        }}
        currentFieldValue={currentShiftStartValue}
        label={"Shift start"}
        items={ShiftStart}
        hasError={errors?.ShiftStart?.hasError}
        errorMessage={errors?.ShiftStart?.errorMessage}
        setFieldValue={setCurrentShiftStartValue}
        inputFieldRef={ShiftStartRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Shift start"
          isRequired={false}
          isReadOnly={false}
          value={currentShiftStartValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.ShiftStart?.hasError) {
              runValidationTasks("ShiftStart", value);
            }
            setCurrentShiftStartValue(value);
          }}
          onBlur={() =>
            runValidationTasks("ShiftStart", currentShiftStartValue)
          }
          errorMessage={errors.ShiftStart?.errorMessage}
          hasError={errors.ShiftStart?.hasError}
          ref={ShiftStartRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "ShiftStart")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              StaffID,
              ClockInTime,
              ClockOutTime,
              Hours,
              Dates,
              ShiftStart,
              ShiftFinish: values,
              WeekNumber,
              StaffNam,
            };
            const result = onChange(modelFields);
            values = result?.ShiftFinish ?? values;
          }
          setShiftFinish(values);
          setCurrentShiftFinishValue("");
        }}
        currentFieldValue={currentShiftFinishValue}
        label={"Shift finish"}
        items={ShiftFinish}
        hasError={errors?.ShiftFinish?.hasError}
        errorMessage={errors?.ShiftFinish?.errorMessage}
        setFieldValue={setCurrentShiftFinishValue}
        inputFieldRef={ShiftFinishRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Shift finish"
          isRequired={false}
          isReadOnly={false}
          value={currentShiftFinishValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.ShiftFinish?.hasError) {
              runValidationTasks("ShiftFinish", value);
            }
            setCurrentShiftFinishValue(value);
          }}
          onBlur={() =>
            runValidationTasks("ShiftFinish", currentShiftFinishValue)
          }
          errorMessage={errors.ShiftFinish?.errorMessage}
          hasError={errors.ShiftFinish?.hasError}
          ref={ShiftFinishRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "ShiftFinish")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Week number"
        isRequired={false}
        isReadOnly={false}
        value={WeekNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              StaffID,
              ClockInTime,
              ClockOutTime,
              Hours,
              Dates,
              ShiftStart,
              ShiftFinish,
              WeekNumber: value,
              StaffNam,
            };
            const result = onChange(modelFields);
            value = result?.WeekNumber ?? value;
          }
          if (errors.WeekNumber?.hasError) {
            runValidationTasks("WeekNumber", value);
          }
          setWeekNumber(value);
        }}
        onBlur={() => runValidationTasks("WeekNumber", WeekNumber)}
        errorMessage={errors.WeekNumber?.errorMessage}
        hasError={errors.WeekNumber?.hasError}
        {...getOverrideProps(overrides, "WeekNumber")}
      ></TextField>
      <TextField
        label="Staff nam"
        isRequired={false}
        isReadOnly={false}
        value={StaffNam}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              StaffID,
              ClockInTime,
              ClockOutTime,
              Hours,
              Dates,
              ShiftStart,
              ShiftFinish,
              WeekNumber,
              StaffNam: value,
            };
            const result = onChange(modelFields);
            value = result?.StaffNam ?? value;
          }
          if (errors.StaffNam?.hasError) {
            runValidationTasks("StaffNam", value);
          }
          setStaffNam(value);
        }}
        onBlur={() => runValidationTasks("StaffNam", StaffNam)}
        errorMessage={errors.StaffNam?.errorMessage}
        hasError={errors.StaffNam?.hasError}
        {...getOverrideProps(overrides, "StaffNam")}
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
