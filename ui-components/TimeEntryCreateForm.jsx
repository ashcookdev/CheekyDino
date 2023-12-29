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
import { TimeEntry } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
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
  runValidationTasks,
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
    const { hasError } = runValidationTasks();
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
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function TimeEntryCreateForm(props) {
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
    StaffID: "",
    Hours: "",
    Dates: [],
    ShiftStart: [],
    ShiftFinish: [],
    Month: "",
    StaffName: "",
    Holiday: [],
  };
  const [StaffID, setStaffID] = React.useState(initialValues.StaffID);
  const [Hours, setHours] = React.useState(initialValues.Hours);
  const [Dates, setDates] = React.useState(initialValues.Dates);
  const [ShiftStart, setShiftStart] = React.useState(initialValues.ShiftStart);
  const [ShiftFinish, setShiftFinish] = React.useState(
    initialValues.ShiftFinish
  );
  const [Month, setMonth] = React.useState(initialValues.Month);
  const [StaffName, setStaffName] = React.useState(initialValues.StaffName);
  const [Holiday, setHoliday] = React.useState(initialValues.Holiday);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setStaffID(initialValues.StaffID);
    setHours(initialValues.Hours);
    setDates(initialValues.Dates);
    setCurrentDatesValue("");
    setShiftStart(initialValues.ShiftStart);
    setCurrentShiftStartValue("");
    setShiftFinish(initialValues.ShiftFinish);
    setCurrentShiftFinishValue("");
    setMonth(initialValues.Month);
    setStaffName(initialValues.StaffName);
    setHoliday(initialValues.Holiday);
    setCurrentHolidayValue("");
    setErrors({});
  };
  const [currentDatesValue, setCurrentDatesValue] = React.useState("");
  const DatesRef = React.createRef();
  const [currentShiftStartValue, setCurrentShiftStartValue] =
    React.useState("");
  const ShiftStartRef = React.createRef();
  const [currentShiftFinishValue, setCurrentShiftFinishValue] =
    React.useState("");
  const ShiftFinishRef = React.createRef();
  const [currentHolidayValue, setCurrentHolidayValue] = React.useState("");
  const HolidayRef = React.createRef();
  const validations = {
    StaffID: [],
    Hours: [],
    Dates: [],
    ShiftStart: [],
    ShiftFinish: [],
    Month: [],
    StaffName: [],
    Holiday: [],
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
          Hours,
          Dates,
          ShiftStart,
          ShiftFinish,
          Month,
          StaffName,
          Holiday,
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
          await DataStore.save(new TimeEntry(modelFields));
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
      {...getOverrideProps(overrides, "TimeEntryCreateForm")}
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
              Hours,
              Dates,
              ShiftStart,
              ShiftFinish,
              Month,
              StaffName,
              Holiday,
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
              Hours: value,
              Dates,
              ShiftStart,
              ShiftFinish,
              Month,
              StaffName,
              Holiday,
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
              Hours,
              Dates: values,
              ShiftStart,
              ShiftFinish,
              Month,
              StaffName,
              Holiday,
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
        runValidationTasks={async () =>
          await runValidationTasks("Dates", currentDatesValue)
        }
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
              Hours,
              Dates,
              ShiftStart: values,
              ShiftFinish,
              Month,
              StaffName,
              Holiday,
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
        runValidationTasks={async () =>
          await runValidationTasks("ShiftStart", currentShiftStartValue)
        }
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
              Hours,
              Dates,
              ShiftStart,
              ShiftFinish: values,
              Month,
              StaffName,
              Holiday,
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
        runValidationTasks={async () =>
          await runValidationTasks("ShiftFinish", currentShiftFinishValue)
        }
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
        label="Month"
        isRequired={false}
        isReadOnly={false}
        value={Month}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              StaffID,
              Hours,
              Dates,
              ShiftStart,
              ShiftFinish,
              Month: value,
              StaffName,
              Holiday,
            };
            const result = onChange(modelFields);
            value = result?.Month ?? value;
          }
          if (errors.Month?.hasError) {
            runValidationTasks("Month", value);
          }
          setMonth(value);
        }}
        onBlur={() => runValidationTasks("Month", Month)}
        errorMessage={errors.Month?.errorMessage}
        hasError={errors.Month?.hasError}
        {...getOverrideProps(overrides, "Month")}
      ></TextField>
      <TextField
        label="Staff name"
        isRequired={false}
        isReadOnly={false}
        value={StaffName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              StaffID,
              Hours,
              Dates,
              ShiftStart,
              ShiftFinish,
              Month,
              StaffName: value,
              Holiday,
            };
            const result = onChange(modelFields);
            value = result?.StaffName ?? value;
          }
          if (errors.StaffName?.hasError) {
            runValidationTasks("StaffName", value);
          }
          setStaffName(value);
        }}
        onBlur={() => runValidationTasks("StaffName", StaffName)}
        errorMessage={errors.StaffName?.errorMessage}
        hasError={errors.StaffName?.hasError}
        {...getOverrideProps(overrides, "StaffName")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              StaffID,
              Hours,
              Dates,
              ShiftStart,
              ShiftFinish,
              Month,
              StaffName,
              Holiday: values,
            };
            const result = onChange(modelFields);
            values = result?.Holiday ?? values;
          }
          setHoliday(values);
          setCurrentHolidayValue("");
        }}
        currentFieldValue={currentHolidayValue}
        label={"Holiday"}
        items={Holiday}
        hasError={errors?.Holiday?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Holiday", currentHolidayValue)
        }
        errorMessage={errors?.Holiday?.errorMessage}
        setFieldValue={setCurrentHolidayValue}
        inputFieldRef={HolidayRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Holiday"
          isRequired={false}
          isReadOnly={false}
          type="date"
          value={currentHolidayValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Holiday?.hasError) {
              runValidationTasks("Holiday", value);
            }
            setCurrentHolidayValue(value);
          }}
          onBlur={() => runValidationTasks("Holiday", currentHolidayValue)}
          errorMessage={errors.Holiday?.errorMessage}
          hasError={errors.Holiday?.hasError}
          ref={HolidayRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Holiday")}
        ></TextField>
      </ArrayField>
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
