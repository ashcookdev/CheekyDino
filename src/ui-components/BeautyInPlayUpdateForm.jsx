/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { BeautyInPlay } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function BeautyInPlayUpdateForm(props) {
  const {
    id: idProp,
    beautyInPlay: beautyInPlayModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    AppointmentTime: "",
    AppointmentDate: "",
    Treatment: "",
    Total: "",
  };
  const [AppointmentTime, setAppointmentTime] = React.useState(
    initialValues.AppointmentTime
  );
  const [AppointmentDate, setAppointmentDate] = React.useState(
    initialValues.AppointmentDate
  );
  const [Treatment, setTreatment] = React.useState(initialValues.Treatment);
  const [Total, setTotal] = React.useState(initialValues.Total);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = beautyInPlayRecord
      ? { ...initialValues, ...beautyInPlayRecord }
      : initialValues;
    setAppointmentTime(cleanValues.AppointmentTime);
    setAppointmentDate(cleanValues.AppointmentDate);
    setTreatment(cleanValues.Treatment);
    setTotal(cleanValues.Total);
    setErrors({});
  };
  const [beautyInPlayRecord, setBeautyInPlayRecord] = React.useState(
    beautyInPlayModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(BeautyInPlay, idProp)
        : beautyInPlayModelProp;
      setBeautyInPlayRecord(record);
    };
    queryData();
  }, [idProp, beautyInPlayModelProp]);
  React.useEffect(resetStateValues, [beautyInPlayRecord]);
  const validations = {
    AppointmentTime: [],
    AppointmentDate: [],
    Treatment: [],
    Total: [],
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
          AppointmentTime,
          AppointmentDate,
          Treatment,
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
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(
            BeautyInPlay.copyOf(beautyInPlayRecord, (updated) => {
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
      {...getOverrideProps(overrides, "BeautyInPlayUpdateForm")}
      {...rest}
    >
      <TextField
        label="Appointment time"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={AppointmentTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              AppointmentTime: value,
              AppointmentDate,
              Treatment,
              Total,
            };
            const result = onChange(modelFields);
            value = result?.AppointmentTime ?? value;
          }
          if (errors.AppointmentTime?.hasError) {
            runValidationTasks("AppointmentTime", value);
          }
          setAppointmentTime(value);
        }}
        onBlur={() => runValidationTasks("AppointmentTime", AppointmentTime)}
        errorMessage={errors.AppointmentTime?.errorMessage}
        hasError={errors.AppointmentTime?.hasError}
        {...getOverrideProps(overrides, "AppointmentTime")}
      ></TextField>
      <TextField
        label="Appointment date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={AppointmentDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              AppointmentTime,
              AppointmentDate: value,
              Treatment,
              Total,
            };
            const result = onChange(modelFields);
            value = result?.AppointmentDate ?? value;
          }
          if (errors.AppointmentDate?.hasError) {
            runValidationTasks("AppointmentDate", value);
          }
          setAppointmentDate(value);
        }}
        onBlur={() => runValidationTasks("AppointmentDate", AppointmentDate)}
        errorMessage={errors.AppointmentDate?.errorMessage}
        hasError={errors.AppointmentDate?.hasError}
        {...getOverrideProps(overrides, "AppointmentDate")}
      ></TextField>
      <TextField
        label="Treatment"
        isRequired={false}
        isReadOnly={false}
        value={Treatment}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              AppointmentTime,
              AppointmentDate,
              Treatment: value,
              Total,
            };
            const result = onChange(modelFields);
            value = result?.Treatment ?? value;
          }
          if (errors.Treatment?.hasError) {
            runValidationTasks("Treatment", value);
          }
          setTreatment(value);
        }}
        onBlur={() => runValidationTasks("Treatment", Treatment)}
        errorMessage={errors.Treatment?.errorMessage}
        hasError={errors.Treatment?.hasError}
        {...getOverrideProps(overrides, "Treatment")}
      ></TextField>
      <TextField
        label="Total"
        isRequired={false}
        isReadOnly={false}
        value={Total}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              AppointmentTime,
              AppointmentDate,
              Treatment,
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || beautyInPlayModelProp)}
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
              !(idProp || beautyInPlayModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
