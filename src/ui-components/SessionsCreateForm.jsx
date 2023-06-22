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
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Sessions } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function SessionsCreateForm(props) {
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
    TimeslotFrom: "",
    TimeslotTo: "",
    TimeLeft: "",
    TimeArrived: "",
    Date: "",
    Table: "",
    Orders: "",
    Prepaid: false,
    TotalSpent: "",
    CafeOrderID: "",
    Adults: "",
    Children: "",
  };
  const [Name, setName] = React.useState(initialValues.Name);
  const [Email, setEmail] = React.useState(initialValues.Email);
  const [TimeslotFrom, setTimeslotFrom] = React.useState(
    initialValues.TimeslotFrom
  );
  const [TimeslotTo, setTimeslotTo] = React.useState(initialValues.TimeslotTo);
  const [TimeLeft, setTimeLeft] = React.useState(initialValues.TimeLeft);
  const [TimeArrived, setTimeArrived] = React.useState(
    initialValues.TimeArrived
  );
  const [Date, setDate] = React.useState(initialValues.Date);
  const [Table, setTable] = React.useState(initialValues.Table);
  const [Orders, setOrders] = React.useState(initialValues.Orders);
  const [Prepaid, setPrepaid] = React.useState(initialValues.Prepaid);
  const [TotalSpent, setTotalSpent] = React.useState(initialValues.TotalSpent);
  const [CafeOrderID, setCafeOrderID] = React.useState(
    initialValues.CafeOrderID
  );
  const [Adults, setAdults] = React.useState(initialValues.Adults);
  const [Children, setChildren] = React.useState(initialValues.Children);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.Name);
    setEmail(initialValues.Email);
    setTimeslotFrom(initialValues.TimeslotFrom);
    setTimeslotTo(initialValues.TimeslotTo);
    setTimeLeft(initialValues.TimeLeft);
    setTimeArrived(initialValues.TimeArrived);
    setDate(initialValues.Date);
    setTable(initialValues.Table);
    setOrders(initialValues.Orders);
    setPrepaid(initialValues.Prepaid);
    setTotalSpent(initialValues.TotalSpent);
    setCafeOrderID(initialValues.CafeOrderID);
    setAdults(initialValues.Adults);
    setChildren(initialValues.Children);
    setErrors({});
  };
  const validations = {
    Name: [],
    Email: [{ type: "Email" }],
    TimeslotFrom: [],
    TimeslotTo: [],
    TimeLeft: [],
    TimeArrived: [],
    Date: [],
    Table: [],
    Orders: [],
    Prepaid: [],
    TotalSpent: [],
    CafeOrderID: [],
    Adults: [],
    Children: [],
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
          TimeslotFrom,
          TimeslotTo,
          TimeLeft,
          TimeArrived,
          Date,
          Table,
          Orders,
          Prepaid,
          TotalSpent,
          CafeOrderID,
          Adults,
          Children,
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
          await DataStore.save(new Sessions(modelFields));
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
      {...getOverrideProps(overrides, "SessionsCreateForm")}
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
              TimeslotFrom,
              TimeslotTo,
              TimeLeft,
              TimeArrived,
              Date,
              Table,
              Orders,
              Prepaid,
              TotalSpent,
              CafeOrderID,
              Adults,
              Children,
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
              TimeslotFrom,
              TimeslotTo,
              TimeLeft,
              TimeArrived,
              Date,
              Table,
              Orders,
              Prepaid,
              TotalSpent,
              CafeOrderID,
              Adults,
              Children,
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
        label="Timeslot from"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={TimeslotFrom}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              TimeslotFrom: value,
              TimeslotTo,
              TimeLeft,
              TimeArrived,
              Date,
              Table,
              Orders,
              Prepaid,
              TotalSpent,
              CafeOrderID,
              Adults,
              Children,
            };
            const result = onChange(modelFields);
            value = result?.TimeslotFrom ?? value;
          }
          if (errors.TimeslotFrom?.hasError) {
            runValidationTasks("TimeslotFrom", value);
          }
          setTimeslotFrom(value);
        }}
        onBlur={() => runValidationTasks("TimeslotFrom", TimeslotFrom)}
        errorMessage={errors.TimeslotFrom?.errorMessage}
        hasError={errors.TimeslotFrom?.hasError}
        {...getOverrideProps(overrides, "TimeslotFrom")}
      ></TextField>
      <TextField
        label="Timeslot to"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={TimeslotTo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              TimeslotFrom,
              TimeslotTo: value,
              TimeLeft,
              TimeArrived,
              Date,
              Table,
              Orders,
              Prepaid,
              TotalSpent,
              CafeOrderID,
              Adults,
              Children,
            };
            const result = onChange(modelFields);
            value = result?.TimeslotTo ?? value;
          }
          if (errors.TimeslotTo?.hasError) {
            runValidationTasks("TimeslotTo", value);
          }
          setTimeslotTo(value);
        }}
        onBlur={() => runValidationTasks("TimeslotTo", TimeslotTo)}
        errorMessage={errors.TimeslotTo?.errorMessage}
        hasError={errors.TimeslotTo?.hasError}
        {...getOverrideProps(overrides, "TimeslotTo")}
      ></TextField>
      <TextField
        label="Time left"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={TimeLeft}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              TimeslotFrom,
              TimeslotTo,
              TimeLeft: value,
              TimeArrived,
              Date,
              Table,
              Orders,
              Prepaid,
              TotalSpent,
              CafeOrderID,
              Adults,
              Children,
            };
            const result = onChange(modelFields);
            value = result?.TimeLeft ?? value;
          }
          if (errors.TimeLeft?.hasError) {
            runValidationTasks("TimeLeft", value);
          }
          setTimeLeft(value);
        }}
        onBlur={() => runValidationTasks("TimeLeft", TimeLeft)}
        errorMessage={errors.TimeLeft?.errorMessage}
        hasError={errors.TimeLeft?.hasError}
        {...getOverrideProps(overrides, "TimeLeft")}
      ></TextField>
      <TextField
        label="Time arrived"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={TimeArrived}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              TimeslotFrom,
              TimeslotTo,
              TimeLeft,
              TimeArrived: value,
              Date,
              Table,
              Orders,
              Prepaid,
              TotalSpent,
              CafeOrderID,
              Adults,
              Children,
            };
            const result = onChange(modelFields);
            value = result?.TimeArrived ?? value;
          }
          if (errors.TimeArrived?.hasError) {
            runValidationTasks("TimeArrived", value);
          }
          setTimeArrived(value);
        }}
        onBlur={() => runValidationTasks("TimeArrived", TimeArrived)}
        errorMessage={errors.TimeArrived?.errorMessage}
        hasError={errors.TimeArrived?.hasError}
        {...getOverrideProps(overrides, "TimeArrived")}
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
              Name,
              Email,
              TimeslotFrom,
              TimeslotTo,
              TimeLeft,
              TimeArrived,
              Date: value,
              Table,
              Orders,
              Prepaid,
              TotalSpent,
              CafeOrderID,
              Adults,
              Children,
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
        label="Table"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Table}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              TimeslotFrom,
              TimeslotTo,
              TimeLeft,
              TimeArrived,
              Date,
              Table: value,
              Orders,
              Prepaid,
              TotalSpent,
              CafeOrderID,
              Adults,
              Children,
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
      <TextField
        label="Orders"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Orders}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              TimeslotFrom,
              TimeslotTo,
              TimeLeft,
              TimeArrived,
              Date,
              Table,
              Orders: value,
              Prepaid,
              TotalSpent,
              CafeOrderID,
              Adults,
              Children,
            };
            const result = onChange(modelFields);
            value = result?.Orders ?? value;
          }
          if (errors.Orders?.hasError) {
            runValidationTasks("Orders", value);
          }
          setOrders(value);
        }}
        onBlur={() => runValidationTasks("Orders", Orders)}
        errorMessage={errors.Orders?.errorMessage}
        hasError={errors.Orders?.hasError}
        {...getOverrideProps(overrides, "Orders")}
      ></TextField>
      <SwitchField
        label="Prepaid"
        defaultChecked={false}
        isDisabled={false}
        isChecked={Prepaid}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              TimeslotFrom,
              TimeslotTo,
              TimeLeft,
              TimeArrived,
              Date,
              Table,
              Orders,
              Prepaid: value,
              TotalSpent,
              CafeOrderID,
              Adults,
              Children,
            };
            const result = onChange(modelFields);
            value = result?.Prepaid ?? value;
          }
          if (errors.Prepaid?.hasError) {
            runValidationTasks("Prepaid", value);
          }
          setPrepaid(value);
        }}
        onBlur={() => runValidationTasks("Prepaid", Prepaid)}
        errorMessage={errors.Prepaid?.errorMessage}
        hasError={errors.Prepaid?.hasError}
        {...getOverrideProps(overrides, "Prepaid")}
      ></SwitchField>
      <TextField
        label="Total spent"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={TotalSpent}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              TimeslotFrom,
              TimeslotTo,
              TimeLeft,
              TimeArrived,
              Date,
              Table,
              Orders,
              Prepaid,
              TotalSpent: value,
              CafeOrderID,
              Adults,
              Children,
            };
            const result = onChange(modelFields);
            value = result?.TotalSpent ?? value;
          }
          if (errors.TotalSpent?.hasError) {
            runValidationTasks("TotalSpent", value);
          }
          setTotalSpent(value);
        }}
        onBlur={() => runValidationTasks("TotalSpent", TotalSpent)}
        errorMessage={errors.TotalSpent?.errorMessage}
        hasError={errors.TotalSpent?.hasError}
        {...getOverrideProps(overrides, "TotalSpent")}
      ></TextField>
      <TextField
        label="Cafe order id"
        isRequired={false}
        isReadOnly={false}
        value={CafeOrderID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              TimeslotFrom,
              TimeslotTo,
              TimeLeft,
              TimeArrived,
              Date,
              Table,
              Orders,
              Prepaid,
              TotalSpent,
              CafeOrderID: value,
              Adults,
              Children,
            };
            const result = onChange(modelFields);
            value = result?.CafeOrderID ?? value;
          }
          if (errors.CafeOrderID?.hasError) {
            runValidationTasks("CafeOrderID", value);
          }
          setCafeOrderID(value);
        }}
        onBlur={() => runValidationTasks("CafeOrderID", CafeOrderID)}
        errorMessage={errors.CafeOrderID?.errorMessage}
        hasError={errors.CafeOrderID?.hasError}
        {...getOverrideProps(overrides, "CafeOrderID")}
      ></TextField>
      <TextField
        label="Adults"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Adults}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              TimeslotFrom,
              TimeslotTo,
              TimeLeft,
              TimeArrived,
              Date,
              Table,
              Orders,
              Prepaid,
              TotalSpent,
              CafeOrderID,
              Adults: value,
              Children,
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
        label="Children"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Children}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              TimeslotFrom,
              TimeslotTo,
              TimeLeft,
              TimeArrived,
              Date,
              Table,
              Orders,
              Prepaid,
              TotalSpent,
              CafeOrderID,
              Adults,
              Children: value,
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
