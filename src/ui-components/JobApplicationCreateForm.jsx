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
import { JobApplication } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function JobApplicationCreateForm(props) {
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
    CoverLetter: "",
    Role: "",
    Town: "",
    DOB: "",
    Email: "",
    Telephone: "",
    PreviousExprience: "",
    CV: "",
    Age: "",
    Interviewed: false,
    InterviewNotes: "",
    Offered: false,
    InterviewTime: "",
    InterviewDate: "",
    InterviewSet: false,
    NotInterested: false,
  };
  const [Name, setName] = React.useState(initialValues.Name);
  const [CoverLetter, setCoverLetter] = React.useState(
    initialValues.CoverLetter
  );
  const [Role, setRole] = React.useState(initialValues.Role);
  const [Town, setTown] = React.useState(initialValues.Town);
  const [DOB, setDOB] = React.useState(initialValues.DOB);
  const [Email, setEmail] = React.useState(initialValues.Email);
  const [Telephone, setTelephone] = React.useState(initialValues.Telephone);
  const [PreviousExprience, setPreviousExprience] = React.useState(
    initialValues.PreviousExprience
  );
  const [CV, setCV] = React.useState(initialValues.CV);
  const [Age, setAge] = React.useState(initialValues.Age);
  const [Interviewed, setInterviewed] = React.useState(
    initialValues.Interviewed
  );
  const [InterviewNotes, setInterviewNotes] = React.useState(
    initialValues.InterviewNotes
  );
  const [Offered, setOffered] = React.useState(initialValues.Offered);
  const [InterviewTime, setInterviewTime] = React.useState(
    initialValues.InterviewTime
  );
  const [InterviewDate, setInterviewDate] = React.useState(
    initialValues.InterviewDate
  );
  const [InterviewSet, setInterviewSet] = React.useState(
    initialValues.InterviewSet
  );
  const [NotInterested, setNotInterested] = React.useState(
    initialValues.NotInterested
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.Name);
    setCoverLetter(initialValues.CoverLetter);
    setRole(initialValues.Role);
    setTown(initialValues.Town);
    setDOB(initialValues.DOB);
    setEmail(initialValues.Email);
    setTelephone(initialValues.Telephone);
    setPreviousExprience(initialValues.PreviousExprience);
    setCV(initialValues.CV);
    setAge(initialValues.Age);
    setInterviewed(initialValues.Interviewed);
    setInterviewNotes(initialValues.InterviewNotes);
    setOffered(initialValues.Offered);
    setInterviewTime(initialValues.InterviewTime);
    setInterviewDate(initialValues.InterviewDate);
    setInterviewSet(initialValues.InterviewSet);
    setNotInterested(initialValues.NotInterested);
    setErrors({});
  };
  const validations = {
    Name: [],
    CoverLetter: [],
    Role: [],
    Town: [],
    DOB: [],
    Email: [],
    Telephone: [],
    PreviousExprience: [],
    CV: [],
    Age: [],
    Interviewed: [],
    InterviewNotes: [],
    Offered: [],
    InterviewTime: [],
    InterviewDate: [],
    InterviewSet: [],
    NotInterested: [],
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
          CoverLetter,
          Role,
          Town,
          DOB,
          Email,
          Telephone,
          PreviousExprience,
          CV,
          Age,
          Interviewed,
          InterviewNotes,
          Offered,
          InterviewTime,
          InterviewDate,
          InterviewSet,
          NotInterested,
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
          await DataStore.save(new JobApplication(modelFields));
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
      {...getOverrideProps(overrides, "JobApplicationCreateForm")}
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
              CoverLetter,
              Role,
              Town,
              DOB,
              Email,
              Telephone,
              PreviousExprience,
              CV,
              Age,
              Interviewed,
              InterviewNotes,
              Offered,
              InterviewTime,
              InterviewDate,
              InterviewSet,
              NotInterested,
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
        label="Cover letter"
        isRequired={false}
        isReadOnly={false}
        value={CoverLetter}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              CoverLetter: value,
              Role,
              Town,
              DOB,
              Email,
              Telephone,
              PreviousExprience,
              CV,
              Age,
              Interviewed,
              InterviewNotes,
              Offered,
              InterviewTime,
              InterviewDate,
              InterviewSet,
              NotInterested,
            };
            const result = onChange(modelFields);
            value = result?.CoverLetter ?? value;
          }
          if (errors.CoverLetter?.hasError) {
            runValidationTasks("CoverLetter", value);
          }
          setCoverLetter(value);
        }}
        onBlur={() => runValidationTasks("CoverLetter", CoverLetter)}
        errorMessage={errors.CoverLetter?.errorMessage}
        hasError={errors.CoverLetter?.hasError}
        {...getOverrideProps(overrides, "CoverLetter")}
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
              CoverLetter,
              Role: value,
              Town,
              DOB,
              Email,
              Telephone,
              PreviousExprience,
              CV,
              Age,
              Interviewed,
              InterviewNotes,
              Offered,
              InterviewTime,
              InterviewDate,
              InterviewSet,
              NotInterested,
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
        label="Town"
        isRequired={false}
        isReadOnly={false}
        value={Town}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              CoverLetter,
              Role,
              Town: value,
              DOB,
              Email,
              Telephone,
              PreviousExprience,
              CV,
              Age,
              Interviewed,
              InterviewNotes,
              Offered,
              InterviewTime,
              InterviewDate,
              InterviewSet,
              NotInterested,
            };
            const result = onChange(modelFields);
            value = result?.Town ?? value;
          }
          if (errors.Town?.hasError) {
            runValidationTasks("Town", value);
          }
          setTown(value);
        }}
        onBlur={() => runValidationTasks("Town", Town)}
        errorMessage={errors.Town?.errorMessage}
        hasError={errors.Town?.hasError}
        {...getOverrideProps(overrides, "Town")}
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
              CoverLetter,
              Role,
              Town,
              DOB: value,
              Email,
              Telephone,
              PreviousExprience,
              CV,
              Age,
              Interviewed,
              InterviewNotes,
              Offered,
              InterviewTime,
              InterviewDate,
              InterviewSet,
              NotInterested,
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
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={Email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              CoverLetter,
              Role,
              Town,
              DOB,
              Email: value,
              Telephone,
              PreviousExprience,
              CV,
              Age,
              Interviewed,
              InterviewNotes,
              Offered,
              InterviewTime,
              InterviewDate,
              InterviewSet,
              NotInterested,
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
        label="Telephone"
        isRequired={false}
        isReadOnly={false}
        value={Telephone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              CoverLetter,
              Role,
              Town,
              DOB,
              Email,
              Telephone: value,
              PreviousExprience,
              CV,
              Age,
              Interviewed,
              InterviewNotes,
              Offered,
              InterviewTime,
              InterviewDate,
              InterviewSet,
              NotInterested,
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
        label="Previous exprience"
        isRequired={false}
        isReadOnly={false}
        value={PreviousExprience}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              CoverLetter,
              Role,
              Town,
              DOB,
              Email,
              Telephone,
              PreviousExprience: value,
              CV,
              Age,
              Interviewed,
              InterviewNotes,
              Offered,
              InterviewTime,
              InterviewDate,
              InterviewSet,
              NotInterested,
            };
            const result = onChange(modelFields);
            value = result?.PreviousExprience ?? value;
          }
          if (errors.PreviousExprience?.hasError) {
            runValidationTasks("PreviousExprience", value);
          }
          setPreviousExprience(value);
        }}
        onBlur={() =>
          runValidationTasks("PreviousExprience", PreviousExprience)
        }
        errorMessage={errors.PreviousExprience?.errorMessage}
        hasError={errors.PreviousExprience?.hasError}
        {...getOverrideProps(overrides, "PreviousExprience")}
      ></TextField>
      <TextField
        label="Cv"
        isRequired={false}
        isReadOnly={false}
        value={CV}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              CoverLetter,
              Role,
              Town,
              DOB,
              Email,
              Telephone,
              PreviousExprience,
              CV: value,
              Age,
              Interviewed,
              InterviewNotes,
              Offered,
              InterviewTime,
              InterviewDate,
              InterviewSet,
              NotInterested,
            };
            const result = onChange(modelFields);
            value = result?.CV ?? value;
          }
          if (errors.CV?.hasError) {
            runValidationTasks("CV", value);
          }
          setCV(value);
        }}
        onBlur={() => runValidationTasks("CV", CV)}
        errorMessage={errors.CV?.errorMessage}
        hasError={errors.CV?.hasError}
        {...getOverrideProps(overrides, "CV")}
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
              CoverLetter,
              Role,
              Town,
              DOB,
              Email,
              Telephone,
              PreviousExprience,
              CV,
              Age: value,
              Interviewed,
              InterviewNotes,
              Offered,
              InterviewTime,
              InterviewDate,
              InterviewSet,
              NotInterested,
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
      <SwitchField
        label="Interviewed"
        defaultChecked={false}
        isDisabled={false}
        isChecked={Interviewed}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Name,
              CoverLetter,
              Role,
              Town,
              DOB,
              Email,
              Telephone,
              PreviousExprience,
              CV,
              Age,
              Interviewed: value,
              InterviewNotes,
              Offered,
              InterviewTime,
              InterviewDate,
              InterviewSet,
              NotInterested,
            };
            const result = onChange(modelFields);
            value = result?.Interviewed ?? value;
          }
          if (errors.Interviewed?.hasError) {
            runValidationTasks("Interviewed", value);
          }
          setInterviewed(value);
        }}
        onBlur={() => runValidationTasks("Interviewed", Interviewed)}
        errorMessage={errors.Interviewed?.errorMessage}
        hasError={errors.Interviewed?.hasError}
        {...getOverrideProps(overrides, "Interviewed")}
      ></SwitchField>
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
              CoverLetter,
              Role,
              Town,
              DOB,
              Email,
              Telephone,
              PreviousExprience,
              CV,
              Age,
              Interviewed,
              InterviewNotes: value,
              Offered,
              InterviewTime,
              InterviewDate,
              InterviewSet,
              NotInterested,
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
      <SwitchField
        label="Offered"
        defaultChecked={false}
        isDisabled={false}
        isChecked={Offered}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Name,
              CoverLetter,
              Role,
              Town,
              DOB,
              Email,
              Telephone,
              PreviousExprience,
              CV,
              Age,
              Interviewed,
              InterviewNotes,
              Offered: value,
              InterviewTime,
              InterviewDate,
              InterviewSet,
              NotInterested,
            };
            const result = onChange(modelFields);
            value = result?.Offered ?? value;
          }
          if (errors.Offered?.hasError) {
            runValidationTasks("Offered", value);
          }
          setOffered(value);
        }}
        onBlur={() => runValidationTasks("Offered", Offered)}
        errorMessage={errors.Offered?.errorMessage}
        hasError={errors.Offered?.hasError}
        {...getOverrideProps(overrides, "Offered")}
      ></SwitchField>
      <TextField
        label="Interview time"
        isRequired={false}
        isReadOnly={false}
        value={InterviewTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              CoverLetter,
              Role,
              Town,
              DOB,
              Email,
              Telephone,
              PreviousExprience,
              CV,
              Age,
              Interviewed,
              InterviewNotes,
              Offered,
              InterviewTime: value,
              InterviewDate,
              InterviewSet,
              NotInterested,
            };
            const result = onChange(modelFields);
            value = result?.InterviewTime ?? value;
          }
          if (errors.InterviewTime?.hasError) {
            runValidationTasks("InterviewTime", value);
          }
          setInterviewTime(value);
        }}
        onBlur={() => runValidationTasks("InterviewTime", InterviewTime)}
        errorMessage={errors.InterviewTime?.errorMessage}
        hasError={errors.InterviewTime?.hasError}
        {...getOverrideProps(overrides, "InterviewTime")}
      ></TextField>
      <TextField
        label="Interview date"
        isRequired={false}
        isReadOnly={false}
        value={InterviewDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              CoverLetter,
              Role,
              Town,
              DOB,
              Email,
              Telephone,
              PreviousExprience,
              CV,
              Age,
              Interviewed,
              InterviewNotes,
              Offered,
              InterviewTime,
              InterviewDate: value,
              InterviewSet,
              NotInterested,
            };
            const result = onChange(modelFields);
            value = result?.InterviewDate ?? value;
          }
          if (errors.InterviewDate?.hasError) {
            runValidationTasks("InterviewDate", value);
          }
          setInterviewDate(value);
        }}
        onBlur={() => runValidationTasks("InterviewDate", InterviewDate)}
        errorMessage={errors.InterviewDate?.errorMessage}
        hasError={errors.InterviewDate?.hasError}
        {...getOverrideProps(overrides, "InterviewDate")}
      ></TextField>
      <SwitchField
        label="Interview set"
        defaultChecked={false}
        isDisabled={false}
        isChecked={InterviewSet}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Name,
              CoverLetter,
              Role,
              Town,
              DOB,
              Email,
              Telephone,
              PreviousExprience,
              CV,
              Age,
              Interviewed,
              InterviewNotes,
              Offered,
              InterviewTime,
              InterviewDate,
              InterviewSet: value,
              NotInterested,
            };
            const result = onChange(modelFields);
            value = result?.InterviewSet ?? value;
          }
          if (errors.InterviewSet?.hasError) {
            runValidationTasks("InterviewSet", value);
          }
          setInterviewSet(value);
        }}
        onBlur={() => runValidationTasks("InterviewSet", InterviewSet)}
        errorMessage={errors.InterviewSet?.errorMessage}
        hasError={errors.InterviewSet?.hasError}
        {...getOverrideProps(overrides, "InterviewSet")}
      ></SwitchField>
      <SwitchField
        label="Not interested"
        defaultChecked={false}
        isDisabled={false}
        isChecked={NotInterested}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Name,
              CoverLetter,
              Role,
              Town,
              DOB,
              Email,
              Telephone,
              PreviousExprience,
              CV,
              Age,
              Interviewed,
              InterviewNotes,
              Offered,
              InterviewTime,
              InterviewDate,
              InterviewSet,
              NotInterested: value,
            };
            const result = onChange(modelFields);
            value = result?.NotInterested ?? value;
          }
          if (errors.NotInterested?.hasError) {
            runValidationTasks("NotInterested", value);
          }
          setNotInterested(value);
        }}
        onBlur={() => runValidationTasks("NotInterested", NotInterested)}
        errorMessage={errors.NotInterested?.errorMessage}
        hasError={errors.NotInterested?.hasError}
        {...getOverrideProps(overrides, "NotInterested")}
      ></SwitchField>
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
