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
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { CustomerEvent } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function CustomerEventUpdateForm(props) {
  const {
    id: idProp,
    customerEvent: customerEventModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    EventName: "",
    EventDate: "",
    EventTime: "",
    CustomerName: "",
    Children: "",
    Adults: "",
    Table: "",
    FoodOptions: "",
    Total: "",
    Email: "",
    Telephone: "",
    FoodOption: false,
  };
  const [EventName, setEventName] = React.useState(initialValues.EventName);
  const [EventDate, setEventDate] = React.useState(initialValues.EventDate);
  const [EventTime, setEventTime] = React.useState(initialValues.EventTime);
  const [CustomerName, setCustomerName] = React.useState(
    initialValues.CustomerName
  );
  const [Children, setChildren] = React.useState(initialValues.Children);
  const [Adults, setAdults] = React.useState(initialValues.Adults);
  const [Table, setTable] = React.useState(initialValues.Table);
  const [FoodOptions, setFoodOptions] = React.useState(
    initialValues.FoodOptions
  );
  const [Total, setTotal] = React.useState(initialValues.Total);
  const [Email, setEmail] = React.useState(initialValues.Email);
  const [Telephone, setTelephone] = React.useState(initialValues.Telephone);
  const [FoodOption, setFoodOption] = React.useState(initialValues.FoodOption);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = customerEventRecord
      ? { ...initialValues, ...customerEventRecord }
      : initialValues;
    setEventName(cleanValues.EventName);
    setEventDate(cleanValues.EventDate);
    setEventTime(cleanValues.EventTime);
    setCustomerName(cleanValues.CustomerName);
    setChildren(cleanValues.Children);
    setAdults(cleanValues.Adults);
    setTable(cleanValues.Table);
    setFoodOptions(
      typeof cleanValues.FoodOptions === "string" ||
        cleanValues.FoodOptions === null
        ? cleanValues.FoodOptions
        : JSON.stringify(cleanValues.FoodOptions)
    );
    setTotal(cleanValues.Total);
    setEmail(cleanValues.Email);
    setTelephone(cleanValues.Telephone);
    setFoodOption(cleanValues.FoodOption);
    setErrors({});
  };
  const [customerEventRecord, setCustomerEventRecord] = React.useState(
    customerEventModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(CustomerEvent, idProp)
        : customerEventModelProp;
      setCustomerEventRecord(record);
    };
    queryData();
  }, [idProp, customerEventModelProp]);
  React.useEffect(resetStateValues, [customerEventRecord]);
  const validations = {
    EventName: [],
    EventDate: [],
    EventTime: [],
    CustomerName: [],
    Children: [],
    Adults: [],
    Table: [],
    FoodOptions: [{ type: "JSON" }],
    Total: [],
    Email: [],
    Telephone: [],
    FoodOption: [],
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
          EventName,
          EventDate,
          EventTime,
          CustomerName,
          Children,
          Adults,
          Table,
          FoodOptions,
          Total,
          Email,
          Telephone,
          FoodOption,
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
            CustomerEvent.copyOf(customerEventRecord, (updated) => {
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
      {...getOverrideProps(overrides, "CustomerEventUpdateForm")}
      {...rest}
    >
      <TextField
        label="Event name"
        isRequired={false}
        isReadOnly={false}
        value={EventName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              EventName: value,
              EventDate,
              EventTime,
              CustomerName,
              Children,
              Adults,
              Table,
              FoodOptions,
              Total,
              Email,
              Telephone,
              FoodOption,
            };
            const result = onChange(modelFields);
            value = result?.EventName ?? value;
          }
          if (errors.EventName?.hasError) {
            runValidationTasks("EventName", value);
          }
          setEventName(value);
        }}
        onBlur={() => runValidationTasks("EventName", EventName)}
        errorMessage={errors.EventName?.errorMessage}
        hasError={errors.EventName?.hasError}
        {...getOverrideProps(overrides, "EventName")}
      ></TextField>
      <TextField
        label="Event date"
        isRequired={false}
        isReadOnly={false}
        value={EventDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              EventName,
              EventDate: value,
              EventTime,
              CustomerName,
              Children,
              Adults,
              Table,
              FoodOptions,
              Total,
              Email,
              Telephone,
              FoodOption,
            };
            const result = onChange(modelFields);
            value = result?.EventDate ?? value;
          }
          if (errors.EventDate?.hasError) {
            runValidationTasks("EventDate", value);
          }
          setEventDate(value);
        }}
        onBlur={() => runValidationTasks("EventDate", EventDate)}
        errorMessage={errors.EventDate?.errorMessage}
        hasError={errors.EventDate?.hasError}
        {...getOverrideProps(overrides, "EventDate")}
      ></TextField>
      <TextField
        label="Event time"
        isRequired={false}
        isReadOnly={false}
        value={EventTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              EventName,
              EventDate,
              EventTime: value,
              CustomerName,
              Children,
              Adults,
              Table,
              FoodOptions,
              Total,
              Email,
              Telephone,
              FoodOption,
            };
            const result = onChange(modelFields);
            value = result?.EventTime ?? value;
          }
          if (errors.EventTime?.hasError) {
            runValidationTasks("EventTime", value);
          }
          setEventTime(value);
        }}
        onBlur={() => runValidationTasks("EventTime", EventTime)}
        errorMessage={errors.EventTime?.errorMessage}
        hasError={errors.EventTime?.hasError}
        {...getOverrideProps(overrides, "EventTime")}
      ></TextField>
      <TextField
        label="Customer name"
        isRequired={false}
        isReadOnly={false}
        value={CustomerName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              EventName,
              EventDate,
              EventTime,
              CustomerName: value,
              Children,
              Adults,
              Table,
              FoodOptions,
              Total,
              Email,
              Telephone,
              FoodOption,
            };
            const result = onChange(modelFields);
            value = result?.CustomerName ?? value;
          }
          if (errors.CustomerName?.hasError) {
            runValidationTasks("CustomerName", value);
          }
          setCustomerName(value);
        }}
        onBlur={() => runValidationTasks("CustomerName", CustomerName)}
        errorMessage={errors.CustomerName?.errorMessage}
        hasError={errors.CustomerName?.hasError}
        {...getOverrideProps(overrides, "CustomerName")}
      ></TextField>
      <TextField
        label="Children"
        isRequired={false}
        isReadOnly={false}
        value={Children}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              EventName,
              EventDate,
              EventTime,
              CustomerName,
              Children: value,
              Adults,
              Table,
              FoodOptions,
              Total,
              Email,
              Telephone,
              FoodOption,
            };
            const result = onChange(modelFields);
            value = result?.Children ?? value;
          }
          if (errors.Children?.hasError) {
            runValidationTasks("Children", value);
          }
          setChildren(value);
        }}
        onBlur={() => runValidationTasks("Children", Children)}
        errorMessage={errors.Children?.errorMessage}
        hasError={errors.Children?.hasError}
        {...getOverrideProps(overrides, "Children")}
      ></TextField>
      <TextField
        label="Adults"
        isRequired={false}
        isReadOnly={false}
        value={Adults}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              EventName,
              EventDate,
              EventTime,
              CustomerName,
              Children,
              Adults: value,
              Table,
              FoodOptions,
              Total,
              Email,
              Telephone,
              FoodOption,
            };
            const result = onChange(modelFields);
            value = result?.Adults ?? value;
          }
          if (errors.Adults?.hasError) {
            runValidationTasks("Adults", value);
          }
          setAdults(value);
        }}
        onBlur={() => runValidationTasks("Adults", Adults)}
        errorMessage={errors.Adults?.errorMessage}
        hasError={errors.Adults?.hasError}
        {...getOverrideProps(overrides, "Adults")}
      ></TextField>
      <TextField
        label="Table"
        isRequired={false}
        isReadOnly={false}
        value={Table}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              EventName,
              EventDate,
              EventTime,
              CustomerName,
              Children,
              Adults,
              Table: value,
              FoodOptions,
              Total,
              Email,
              Telephone,
              FoodOption,
            };
            const result = onChange(modelFields);
            value = result?.Table ?? value;
          }
          if (errors.Table?.hasError) {
            runValidationTasks("Table", value);
          }
          setTable(value);
        }}
        onBlur={() => runValidationTasks("Table", Table)}
        errorMessage={errors.Table?.errorMessage}
        hasError={errors.Table?.hasError}
        {...getOverrideProps(overrides, "Table")}
      ></TextField>
      <TextAreaField
        label="Food options"
        isRequired={false}
        isReadOnly={false}
        value={FoodOptions}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              EventName,
              EventDate,
              EventTime,
              CustomerName,
              Children,
              Adults,
              Table,
              FoodOptions: value,
              Total,
              Email,
              Telephone,
              FoodOption,
            };
            const result = onChange(modelFields);
            value = result?.FoodOptions ?? value;
          }
          if (errors.FoodOptions?.hasError) {
            runValidationTasks("FoodOptions", value);
          }
          setFoodOptions(value);
        }}
        onBlur={() => runValidationTasks("FoodOptions", FoodOptions)}
        errorMessage={errors.FoodOptions?.errorMessage}
        hasError={errors.FoodOptions?.hasError}
        {...getOverrideProps(overrides, "FoodOptions")}
      ></TextAreaField>
      <TextField
        label="Total"
        isRequired={false}
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
              EventName,
              EventDate,
              EventTime,
              CustomerName,
              Children,
              Adults,
              Table,
              FoodOptions,
              Total: value,
              Email,
              Telephone,
              FoodOption,
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
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={Email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              EventName,
              EventDate,
              EventTime,
              CustomerName,
              Children,
              Adults,
              Table,
              FoodOptions,
              Total,
              Email: value,
              Telephone,
              FoodOption,
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
              EventName,
              EventDate,
              EventTime,
              CustomerName,
              Children,
              Adults,
              Table,
              FoodOptions,
              Total,
              Email,
              Telephone: value,
              FoodOption,
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
      <SwitchField
        label="Food option"
        defaultChecked={false}
        isDisabled={false}
        isChecked={FoodOption}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              EventName,
              EventDate,
              EventTime,
              CustomerName,
              Children,
              Adults,
              Table,
              FoodOptions,
              Total,
              Email,
              Telephone,
              FoodOption: value,
            };
            const result = onChange(modelFields);
            value = result?.FoodOption ?? value;
          }
          if (errors.FoodOption?.hasError) {
            runValidationTasks("FoodOption", value);
          }
          setFoodOption(value);
        }}
        onBlur={() => runValidationTasks("FoodOption", FoodOption)}
        errorMessage={errors.FoodOption?.errorMessage}
        hasError={errors.FoodOption?.hasError}
        {...getOverrideProps(overrides, "FoodOption")}
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
          isDisabled={!(idProp || customerEventModelProp)}
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
              !(idProp || customerEventModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
