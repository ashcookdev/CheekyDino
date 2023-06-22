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
import { Session } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function SessionUpdateForm(props) {
  const {
    id: idProp,
    session: sessionModelProp,
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
    BookedArrivalTime: "",
    Date: "",
    Paid: false,
    Table: "",
    TimeLeftBranch: "",
    TimeArrrived: "",
    BookedExitTime: "",
    AmountSpent: "",
    TableOrders: "",
  };
  const [Name, setName] = React.useState(initialValues.Name);
  const [BookedArrivalTime, setBookedArrivalTime] = React.useState(
    initialValues.BookedArrivalTime
  );
  const [Date, setDate] = React.useState(initialValues.Date);
  const [Paid, setPaid] = React.useState(initialValues.Paid);
  const [Table, setTable] = React.useState(initialValues.Table);
  const [TimeLeftBranch, setTimeLeftBranch] = React.useState(
    initialValues.TimeLeftBranch
  );
  const [TimeArrrived, setTimeArrrived] = React.useState(
    initialValues.TimeArrrived
  );
  const [BookedExitTime, setBookedExitTime] = React.useState(
    initialValues.BookedExitTime
  );
  const [AmountSpent, setAmountSpent] = React.useState(
    initialValues.AmountSpent
  );
  const [TableOrders, setTableOrders] = React.useState(
    initialValues.TableOrders
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = sessionRecord
      ? { ...initialValues, ...sessionRecord }
      : initialValues;
    setName(cleanValues.Name);
    setBookedArrivalTime(cleanValues.BookedArrivalTime);
    setDate(cleanValues.Date);
    setPaid(cleanValues.Paid);
    setTable(cleanValues.Table);
    setTimeLeftBranch(cleanValues.TimeLeftBranch);
    setTimeArrrived(cleanValues.TimeArrrived);
    setBookedExitTime(cleanValues.BookedExitTime);
    setAmountSpent(cleanValues.AmountSpent);
    setTableOrders(cleanValues.TableOrders);
    setErrors({});
  };
  const [sessionRecord, setSessionRecord] = React.useState(sessionModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Session, idProp)
        : sessionModelProp;
      setSessionRecord(record);
    };
    queryData();
  }, [idProp, sessionModelProp]);
  React.useEffect(resetStateValues, [sessionRecord]);
  const validations = {
    Name: [],
    BookedArrivalTime: [],
    Date: [],
    Paid: [],
    Table: [],
    TimeLeftBranch: [],
    TimeArrrived: [],
    BookedExitTime: [],
    AmountSpent: [],
    TableOrders: [],
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
          BookedArrivalTime,
          Date,
          Paid,
          Table,
          TimeLeftBranch,
          TimeArrrived,
          BookedExitTime,
          AmountSpent,
          TableOrders,
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
            Session.copyOf(sessionRecord, (updated) => {
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
      {...getOverrideProps(overrides, "SessionUpdateForm")}
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
              BookedArrivalTime,
              Date,
              Paid,
              Table,
              TimeLeftBranch,
              TimeArrrived,
              BookedExitTime,
              AmountSpent,
              TableOrders,
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
        label="Booked arrival time"
        isRequired={false}
        isReadOnly={false}
        value={BookedArrivalTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              BookedArrivalTime: value,
              Date,
              Paid,
              Table,
              TimeLeftBranch,
              TimeArrrived,
              BookedExitTime,
              AmountSpent,
              TableOrders,
            };
            const result = onChange(modelFields);
            value = result?.BookedArrivalTime ?? value;
          }
          if (errors.BookedArrivalTime?.hasError) {
            runValidationTasks("BookedArrivalTime", value);
          }
          setBookedArrivalTime(value);
        }}
        onBlur={() =>
          runValidationTasks("BookedArrivalTime", BookedArrivalTime)
        }
        errorMessage={errors.BookedArrivalTime?.errorMessage}
        hasError={errors.BookedArrivalTime?.hasError}
        {...getOverrideProps(overrides, "BookedArrivalTime")}
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
              BookedArrivalTime,
              Date: value,
              Paid,
              Table,
              TimeLeftBranch,
              TimeArrrived,
              BookedExitTime,
              AmountSpent,
              TableOrders,
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
      <SwitchField
        label="Paid"
        defaultChecked={false}
        isDisabled={false}
        isChecked={Paid}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Name,
              BookedArrivalTime,
              Date,
              Paid: value,
              Table,
              TimeLeftBranch,
              TimeArrrived,
              BookedExitTime,
              AmountSpent,
              TableOrders,
            };
            const result = onChange(modelFields);
            value = result?.Paid ?? value;
          }
          if (errors.Paid?.hasError) {
            runValidationTasks("Paid", value);
          }
          setPaid(value);
        }}
        onBlur={() => runValidationTasks("Paid", Paid)}
        errorMessage={errors.Paid?.errorMessage}
        hasError={errors.Paid?.hasError}
        {...getOverrideProps(overrides, "Paid")}
      ></SwitchField>
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
              BookedArrivalTime,
              Date,
              Paid,
              Table: value,
              TimeLeftBranch,
              TimeArrrived,
              BookedExitTime,
              AmountSpent,
              TableOrders,
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
        label="Time left branch"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={TimeLeftBranch}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              BookedArrivalTime,
              Date,
              Paid,
              Table,
              TimeLeftBranch: value,
              TimeArrrived,
              BookedExitTime,
              AmountSpent,
              TableOrders,
            };
            const result = onChange(modelFields);
            value = result?.TimeLeftBranch ?? value;
          }
          if (errors.TimeLeftBranch?.hasError) {
            runValidationTasks("TimeLeftBranch", value);
          }
          setTimeLeftBranch(value);
        }}
        onBlur={() => runValidationTasks("TimeLeftBranch", TimeLeftBranch)}
        errorMessage={errors.TimeLeftBranch?.errorMessage}
        hasError={errors.TimeLeftBranch?.hasError}
        {...getOverrideProps(overrides, "TimeLeftBranch")}
      ></TextField>
      <TextField
        label="Time arrrived"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={TimeArrrived}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              BookedArrivalTime,
              Date,
              Paid,
              Table,
              TimeLeftBranch,
              TimeArrrived: value,
              BookedExitTime,
              AmountSpent,
              TableOrders,
            };
            const result = onChange(modelFields);
            value = result?.TimeArrrived ?? value;
          }
          if (errors.TimeArrrived?.hasError) {
            runValidationTasks("TimeArrrived", value);
          }
          setTimeArrrived(value);
        }}
        onBlur={() => runValidationTasks("TimeArrrived", TimeArrrived)}
        errorMessage={errors.TimeArrrived?.errorMessage}
        hasError={errors.TimeArrrived?.hasError}
        {...getOverrideProps(overrides, "TimeArrrived")}
      ></TextField>
      <TextField
        label="Booked exit time"
        isRequired={false}
        isReadOnly={false}
        value={BookedExitTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              BookedArrivalTime,
              Date,
              Paid,
              Table,
              TimeLeftBranch,
              TimeArrrived,
              BookedExitTime: value,
              AmountSpent,
              TableOrders,
            };
            const result = onChange(modelFields);
            value = result?.BookedExitTime ?? value;
          }
          if (errors.BookedExitTime?.hasError) {
            runValidationTasks("BookedExitTime", value);
          }
          setBookedExitTime(value);
        }}
        onBlur={() => runValidationTasks("BookedExitTime", BookedExitTime)}
        errorMessage={errors.BookedExitTime?.errorMessage}
        hasError={errors.BookedExitTime?.hasError}
        {...getOverrideProps(overrides, "BookedExitTime")}
      ></TextField>
      <TextField
        label="Amount spent"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={AmountSpent}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              BookedArrivalTime,
              Date,
              Paid,
              Table,
              TimeLeftBranch,
              TimeArrrived,
              BookedExitTime,
              AmountSpent: value,
              TableOrders,
            };
            const result = onChange(modelFields);
            value = result?.AmountSpent ?? value;
          }
          if (errors.AmountSpent?.hasError) {
            runValidationTasks("AmountSpent", value);
          }
          setAmountSpent(value);
        }}
        onBlur={() => runValidationTasks("AmountSpent", AmountSpent)}
        errorMessage={errors.AmountSpent?.errorMessage}
        hasError={errors.AmountSpent?.hasError}
        {...getOverrideProps(overrides, "AmountSpent")}
      ></TextField>
      <TextField
        label="Table orders"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={TableOrders}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              BookedArrivalTime,
              Date,
              Paid,
              Table,
              TimeLeftBranch,
              TimeArrrived,
              BookedExitTime,
              AmountSpent,
              TableOrders: value,
            };
            const result = onChange(modelFields);
            value = result?.TableOrders ?? value;
          }
          if (errors.TableOrders?.hasError) {
            runValidationTasks("TableOrders", value);
          }
          setTableOrders(value);
        }}
        onBlur={() => runValidationTasks("TableOrders", TableOrders)}
        errorMessage={errors.TableOrders?.errorMessage}
        hasError={errors.TableOrders?.hasError}
        {...getOverrideProps(overrides, "TableOrders")}
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
          isDisabled={!(idProp || sessionModelProp)}
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
              !(idProp || sessionModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
