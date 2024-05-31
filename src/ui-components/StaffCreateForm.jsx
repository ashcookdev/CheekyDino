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
import { Staff } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function StaffCreateForm(props) {
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
    Name: "",
    Email: "",
    TimeEntries: "",
    Role: "",
    HourlyRate: "",
    StartDate: "",
    Current: false,
    Telephone: "",
    ContractType: "",
    EndDate: "",
    Age: "",
    DOB: "",
    InterviewNotes: "",
    Medical: "",
    ApplicationID: "",
  };
  const [Name, setName] = React.useState(initialValues.Name);
  const [Email, setEmail] = React.useState(initialValues.Email);
  const [TimeEntries, setTimeEntries] = React.useState(
    initialValues.TimeEntries
  );
  const [Role, setRole] = React.useState(initialValues.Role);
  const [HourlyRate, setHourlyRate] = React.useState(initialValues.HourlyRate);
  const [StartDate, setStartDate] = React.useState(initialValues.StartDate);
  const [Current, setCurrent] = React.useState(initialValues.Current);
  const [Telephone, setTelephone] = React.useState(initialValues.Telephone);
  const [ContractType, setContractType] = React.useState(
    initialValues.ContractType
  );
  const [EndDate, setEndDate] = React.useState(initialValues.EndDate);
  const [Age, setAge] = React.useState(initialValues.Age);
  const [DOB, setDOB] = React.useState(initialValues.DOB);
  const [InterviewNotes, setInterviewNotes] = React.useState(
    initialValues.InterviewNotes
  );
  const [Medical, setMedical] = React.useState(initialValues.Medical);
  const [ApplicationID, setApplicationID] = React.useState(
    initialValues.ApplicationID
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.Name);
    setEmail(initialValues.Email);
    setTimeEntries(initialValues.TimeEntries);
    setRole(initialValues.Role);
    setHourlyRate(initialValues.HourlyRate);
    setStartDate(initialValues.StartDate);
    setCurrent(initialValues.Current);
    setTelephone(initialValues.Telephone);
    setContractType(initialValues.ContractType);
    setEndDate(initialValues.EndDate);
    setAge(initialValues.Age);
    setDOB(initialValues.DOB);
    setInterviewNotes(initialValues.InterviewNotes);
    setMedical(initialValues.Medical);
    setApplicationID(initialValues.ApplicationID);
    setErrors({});
  };
  const validations = {
    Name: [],
    Email: [],
    TimeEntries: [],
    Role: [],
    HourlyRate: [],
    StartDate: [],
    Current: [],
    Telephone: [],
    ContractType: [],
    EndDate: [],
    Age: [],
    DOB: [],
    InterviewNotes: [],
    Medical: [],
    ApplicationID: [],
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
          Email,
          TimeEntries,
          Role,
          HourlyRate,
          StartDate,
          Current,
          Telephone,
          ContractType,
          EndDate,
          Age,
          DOB,
          InterviewNotes,
          Medical,
          ApplicationID,
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
          await DataStore.save(new Staff(modelFields));
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
      {...getOverrideProps(overrides, "StaffCreateForm")}
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
              Email,
              TimeEntries,
              Role,
              HourlyRate,
              StartDate,
              Current,
              Telephone,
              ContractType,
              EndDate,
              Age,
              DOB,
              InterviewNotes,
              Medical,
              ApplicationID,
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
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={Email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Email: value,
              TimeEntries,
              Role,
              HourlyRate,
              StartDate,
              Current,
              Telephone,
              ContractType,
              EndDate,
              Age,
              DOB,
              InterviewNotes,
              Medical,
              ApplicationID,
            };
            const result = onChange(modelFields);
            value = result?.Email ?? value;
          }
          if (errors.Email?.hasError) {
            runValidationTasks("Email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("Email", Email)}
        errorMessage={errors.Email?.errorMessage}
        hasError={errors.Email?.hasError}
        {...getOverrideProps(overrides, "Email")}
      ></TextField>
      <TextField
        label="Time entries"
        isRequired={false}
        isReadOnly={false}
        value={TimeEntries}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              TimeEntries: value,
              Role,
              HourlyRate,
              StartDate,
              Current,
              Telephone,
              ContractType,
              EndDate,
              Age,
              DOB,
              InterviewNotes,
              Medical,
              ApplicationID,
            };
            const result = onChange(modelFields);
            value = result?.TimeEntries ?? value;
          }
          if (errors.TimeEntries?.hasError) {
            runValidationTasks("TimeEntries", value);
          }
          setTimeEntries(value);
        }}
        onBlur={() => runValidationTasks("TimeEntries", TimeEntries)}
        errorMessage={errors.TimeEntries?.errorMessage}
        hasError={errors.TimeEntries?.hasError}
        {...getOverrideProps(overrides, "TimeEntries")}
      ></TextField>
      <TextField
        label="Role"
        isRequired={false}
        isReadOnly={false}
        value={Role}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              TimeEntries,
              Role: value,
              HourlyRate,
              StartDate,
              Current,
              Telephone,
              ContractType,
              EndDate,
              Age,
              DOB,
              InterviewNotes,
              Medical,
              ApplicationID,
            };
            const result = onChange(modelFields);
            value = result?.Role ?? value;
          }
          if (errors.Role?.hasError) {
            runValidationTasks("Role", value);
          }
          setRole(value);
        }}
        onBlur={() => runValidationTasks("Role", Role)}
        errorMessage={errors.Role?.errorMessage}
        hasError={errors.Role?.hasError}
        {...getOverrideProps(overrides, "Role")}
      ></TextField>
      <TextField
        label="Hourly rate"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={HourlyRate}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              TimeEntries,
              Role,
              HourlyRate: value,
              StartDate,
              Current,
              Telephone,
              ContractType,
              EndDate,
              Age,
              DOB,
              InterviewNotes,
              Medical,
              ApplicationID,
            };
            const result = onChange(modelFields);
            value = result?.HourlyRate ?? value;
          }
          if (errors.HourlyRate?.hasError) {
            runValidationTasks("HourlyRate", value);
          }
          setHourlyRate(value);
        }}
        onBlur={() => runValidationTasks("HourlyRate", HourlyRate)}
        errorMessage={errors.HourlyRate?.errorMessage}
        hasError={errors.HourlyRate?.hasError}
        {...getOverrideProps(overrides, "HourlyRate")}
      ></TextField>
      <TextField
        label="Start date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={StartDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              TimeEntries,
              Role,
              HourlyRate,
              StartDate: value,
              Current,
              Telephone,
              ContractType,
              EndDate,
              Age,
              DOB,
              InterviewNotes,
              Medical,
              ApplicationID,
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
      <SwitchField
        label="Current"
        defaultChecked={false}
        isDisabled={false}
        isChecked={Current}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              TimeEntries,
              Role,
              HourlyRate,
              StartDate,
              Current: value,
              Telephone,
              ContractType,
              EndDate,
              Age,
              DOB,
              InterviewNotes,
              Medical,
              ApplicationID,
            };
            const result = onChange(modelFields);
            value = result?.Current ?? value;
          }
          if (errors.Current?.hasError) {
            runValidationTasks("Current", value);
          }
          setCurrent(value);
        }}
        onBlur={() => runValidationTasks("Current", Current)}
        errorMessage={errors.Current?.errorMessage}
        hasError={errors.Current?.hasError}
        {...getOverrideProps(overrides, "Current")}
      ></SwitchField>
      <TextField
        label="Telephone"
        isRequired={false}
        isReadOnly={false}
        value={Telephone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              TimeEntries,
              Role,
              HourlyRate,
              StartDate,
              Current,
              Telephone: value,
              ContractType,
              EndDate,
              Age,
              DOB,
              InterviewNotes,
              Medical,
              ApplicationID,
            };
            const result = onChange(modelFields);
            value = result?.Telephone ?? value;
          }
          if (errors.Telephone?.hasError) {
            runValidationTasks("Telephone", value);
          }
          setTelephone(value);
        }}
        onBlur={() => runValidationTasks("Telephone", Telephone)}
        errorMessage={errors.Telephone?.errorMessage}
        hasError={errors.Telephone?.hasError}
        {...getOverrideProps(overrides, "Telephone")}
      ></TextField>
      <TextField
        label="Contract type"
        isRequired={false}
        isReadOnly={false}
        value={ContractType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              TimeEntries,
              Role,
              HourlyRate,
              StartDate,
              Current,
              Telephone,
              ContractType: value,
              EndDate,
              Age,
              DOB,
              InterviewNotes,
              Medical,
              ApplicationID,
            };
            const result = onChange(modelFields);
            value = result?.ContractType ?? value;
          }
          if (errors.ContractType?.hasError) {
            runValidationTasks("ContractType", value);
          }
          setContractType(value);
        }}
        onBlur={() => runValidationTasks("ContractType", ContractType)}
        errorMessage={errors.ContractType?.errorMessage}
        hasError={errors.ContractType?.hasError}
        {...getOverrideProps(overrides, "ContractType")}
      ></TextField>
      <TextField
        label="End date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={EndDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              TimeEntries,
              Role,
              HourlyRate,
              StartDate,
              Current,
              Telephone,
              ContractType,
              EndDate: value,
              Age,
              DOB,
              InterviewNotes,
              Medical,
              ApplicationID,
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
      <TextField
        label="Age"
        isRequired={false}
        isReadOnly={false}
        value={Age}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              TimeEntries,
              Role,
              HourlyRate,
              StartDate,
              Current,
              Telephone,
              ContractType,
              EndDate,
              Age: value,
              DOB,
              InterviewNotes,
              Medical,
              ApplicationID,
            };
            const result = onChange(modelFields);
            value = result?.Age ?? value;
          }
          if (errors.Age?.hasError) {
            runValidationTasks("Age", value);
          }
          setAge(value);
        }}
        onBlur={() => runValidationTasks("Age", Age)}
        errorMessage={errors.Age?.errorMessage}
        hasError={errors.Age?.hasError}
        {...getOverrideProps(overrides, "Age")}
      ></TextField>
      <TextField
        label="Dob"
        isRequired={false}
        isReadOnly={false}
        value={DOB}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              TimeEntries,
              Role,
              HourlyRate,
              StartDate,
              Current,
              Telephone,
              ContractType,
              EndDate,
              Age,
              DOB: value,
              InterviewNotes,
              Medical,
              ApplicationID,
            };
            const result = onChange(modelFields);
            value = result?.DOB ?? value;
          }
          if (errors.DOB?.hasError) {
            runValidationTasks("DOB", value);
          }
          setDOB(value);
        }}
        onBlur={() => runValidationTasks("DOB", DOB)}
        errorMessage={errors.DOB?.errorMessage}
        hasError={errors.DOB?.hasError}
        {...getOverrideProps(overrides, "DOB")}
      ></TextField>
      <TextField
        label="Interview notes"
        isRequired={false}
        isReadOnly={false}
        value={InterviewNotes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              TimeEntries,
              Role,
              HourlyRate,
              StartDate,
              Current,
              Telephone,
              ContractType,
              EndDate,
              Age,
              DOB,
              InterviewNotes: value,
              Medical,
              ApplicationID,
            };
            const result = onChange(modelFields);
            value = result?.InterviewNotes ?? value;
          }
          if (errors.InterviewNotes?.hasError) {
            runValidationTasks("InterviewNotes", value);
          }
          setInterviewNotes(value);
        }}
        onBlur={() => runValidationTasks("InterviewNotes", InterviewNotes)}
        errorMessage={errors.InterviewNotes?.errorMessage}
        hasError={errors.InterviewNotes?.hasError}
        {...getOverrideProps(overrides, "InterviewNotes")}
      ></TextField>
      <TextField
        label="Medical"
        isRequired={false}
        isReadOnly={false}
        value={Medical}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              TimeEntries,
              Role,
              HourlyRate,
              StartDate,
              Current,
              Telephone,
              ContractType,
              EndDate,
              Age,
              DOB,
              InterviewNotes,
              Medical: value,
              ApplicationID,
            };
            const result = onChange(modelFields);
            value = result?.Medical ?? value;
          }
          if (errors.Medical?.hasError) {
            runValidationTasks("Medical", value);
          }
          setMedical(value);
        }}
        onBlur={() => runValidationTasks("Medical", Medical)}
        errorMessage={errors.Medical?.errorMessage}
        hasError={errors.Medical?.hasError}
        {...getOverrideProps(overrides, "Medical")}
      ></TextField>
      <TextField
        label="Application id"
        isRequired={false}
        isReadOnly={false}
        value={ApplicationID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              TimeEntries,
              Role,
              HourlyRate,
              StartDate,
              Current,
              Telephone,
              ContractType,
              EndDate,
              Age,
              DOB,
              InterviewNotes,
              Medical,
              ApplicationID: value,
            };
            const result = onChange(modelFields);
            value = result?.ApplicationID ?? value;
          }
          if (errors.ApplicationID?.hasError) {
            runValidationTasks("ApplicationID", value);
          }
          setApplicationID(value);
        }}
        onBlur={() => runValidationTasks("ApplicationID", ApplicationID)}
        errorMessage={errors.ApplicationID?.errorMessage}
        hasError={errors.ApplicationID?.hasError}
        {...getOverrideProps(overrides, "ApplicationID")}
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
