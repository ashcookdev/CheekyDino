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
  SwitchField,
  Text,
  TextAreaField,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { Sessions } from "../models";
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
    Adults: "",
    Children: "",
    Arrived: false,
    LeftCenter: false,
    ExtraTables: "",
    Telephone: "",
    orderid: [],
    Staff: "",
    CustomerbookingID: "",
    Event: false,
    EventID: "",
    EventName: "",
    PaymentAuth: "",
    PaymentMethod: "",
    EntranceFee: "",
    CleanTable: false,
    ChildData: "",
    TableCleaned: false,
    AcceptedTerms: false,
    EmailSubscription: false,
    CarReg: "",
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
  const [Adults, setAdults] = React.useState(initialValues.Adults);
  const [Children, setChildren] = React.useState(initialValues.Children);
  const [Arrived, setArrived] = React.useState(initialValues.Arrived);
  const [LeftCenter, setLeftCenter] = React.useState(initialValues.LeftCenter);
  const [ExtraTables, setExtraTables] = React.useState(
    initialValues.ExtraTables
  );
  const [Telephone, setTelephone] = React.useState(initialValues.Telephone);
  const [orderid, setOrderid] = React.useState(initialValues.orderid);
  const [Staff, setStaff] = React.useState(initialValues.Staff);
  const [CustomerbookingID, setCustomerbookingID] = React.useState(
    initialValues.CustomerbookingID
  );
  const [Event, setEvent] = React.useState(initialValues.Event);
  const [EventID, setEventID] = React.useState(initialValues.EventID);
  const [EventName, setEventName] = React.useState(initialValues.EventName);
  const [PaymentAuth, setPaymentAuth] = React.useState(
    initialValues.PaymentAuth
  );
  const [PaymentMethod, setPaymentMethod] = React.useState(
    initialValues.PaymentMethod
  );
  const [EntranceFee, setEntranceFee] = React.useState(
    initialValues.EntranceFee
  );
  const [CleanTable, setCleanTable] = React.useState(initialValues.CleanTable);
  const [ChildData, setChildData] = React.useState(initialValues.ChildData);
  const [TableCleaned, setTableCleaned] = React.useState(
    initialValues.TableCleaned
  );
  const [AcceptedTerms, setAcceptedTerms] = React.useState(
    initialValues.AcceptedTerms
  );
  const [EmailSubscription, setEmailSubscription] = React.useState(
    initialValues.EmailSubscription
  );
  const [CarReg, setCarReg] = React.useState(initialValues.CarReg);
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
    setAdults(initialValues.Adults);
    setChildren(initialValues.Children);
    setArrived(initialValues.Arrived);
    setLeftCenter(initialValues.LeftCenter);
    setExtraTables(initialValues.ExtraTables);
    setTelephone(initialValues.Telephone);
    setOrderid(initialValues.orderid);
    setCurrentOrderidValue("");
    setStaff(initialValues.Staff);
    setCustomerbookingID(initialValues.CustomerbookingID);
    setEvent(initialValues.Event);
    setEventID(initialValues.EventID);
    setEventName(initialValues.EventName);
    setPaymentAuth(initialValues.PaymentAuth);
    setPaymentMethod(initialValues.PaymentMethod);
    setEntranceFee(initialValues.EntranceFee);
    setCleanTable(initialValues.CleanTable);
    setChildData(initialValues.ChildData);
    setTableCleaned(initialValues.TableCleaned);
    setAcceptedTerms(initialValues.AcceptedTerms);
    setEmailSubscription(initialValues.EmailSubscription);
    setCarReg(initialValues.CarReg);
    setErrors({});
  };
  const [currentOrderidValue, setCurrentOrderidValue] = React.useState("");
  const orderidRef = React.createRef();
  const validations = {
    Name: [],
    Email: [],
    TimeslotFrom: [],
    TimeslotTo: [],
    TimeLeft: [],
    TimeArrived: [],
    Date: [],
    Table: [],
    Orders: [],
    Prepaid: [],
    TotalSpent: [],
    Adults: [],
    Children: [],
    Arrived: [],
    LeftCenter: [],
    ExtraTables: [],
    Telephone: [],
    orderid: [],
    Staff: [],
    CustomerbookingID: [],
    Event: [],
    EventID: [],
    EventName: [],
    PaymentAuth: [],
    PaymentMethod: [],
    EntranceFee: [],
    CleanTable: [],
    ChildData: [{ type: "JSON" }],
    TableCleaned: [],
    AcceptedTerms: [],
    EmailSubscription: [],
    CarReg: [],
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
          Adults,
          Children,
          Arrived,
          LeftCenter,
          ExtraTables,
          Telephone,
          orderid,
          Staff,
          CustomerbookingID,
          Event,
          EventID,
          EventName,
          PaymentAuth,
          PaymentMethod,
          EntranceFee,
          CleanTable,
          ChildData,
          TableCleaned,
          AcceptedTerms,
          EmailSubscription,
          CarReg,
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
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
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
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
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
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
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
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
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
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
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
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
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
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
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
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
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
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
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
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
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
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
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
              Adults: value,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
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
              Adults,
              Children: value,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
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
      <SwitchField
        label="Arrived"
        defaultChecked={false}
        isDisabled={false}
        isChecked={Arrived}
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
              Prepaid,
              TotalSpent,
              Adults,
              Children,
              Arrived: value,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
            };
            const result = onChange(modelFields);
            value = result?.Arrived ?? value;
          }
          if (errors.Arrived?.hasError) {
            runValidationTasks("Arrived", value);
          }
          setArrived(value);
        }}
        onBlur={() => runValidationTasks("Arrived", Arrived)}
        errorMessage={errors.Arrived?.errorMessage}
        hasError={errors.Arrived?.hasError}
        {...getOverrideProps(overrides, "Arrived")}
      ></SwitchField>
      <SwitchField
        label="Left center"
        defaultChecked={false}
        isDisabled={false}
        isChecked={LeftCenter}
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
              Prepaid,
              TotalSpent,
              Adults,
              Children,
              Arrived,
              LeftCenter: value,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
            };
            const result = onChange(modelFields);
            value = result?.LeftCenter ?? value;
          }
          if (errors.LeftCenter?.hasError) {
            runValidationTasks("LeftCenter", value);
          }
          setLeftCenter(value);
        }}
        onBlur={() => runValidationTasks("LeftCenter", LeftCenter)}
        errorMessage={errors.LeftCenter?.errorMessage}
        hasError={errors.LeftCenter?.hasError}
        {...getOverrideProps(overrides, "LeftCenter")}
      ></SwitchField>
      <TextField
        label="Extra tables"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={ExtraTables}
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
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables: value,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
            };
            const result = onChange(modelFields);
            value = result?.ExtraTables ?? value;
          }
          if (errors.ExtraTables?.hasError) {
            runValidationTasks("ExtraTables", value);
          }
          setExtraTables(value);
        }}
        onBlur={() => runValidationTasks("ExtraTables", ExtraTables)}
        errorMessage={errors.ExtraTables?.errorMessage}
        hasError={errors.ExtraTables?.hasError}
        {...getOverrideProps(overrides, "ExtraTables")}
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
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone: value,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
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
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid: values,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
            };
            const result = onChange(modelFields);
            values = result?.orderid ?? values;
          }
          setOrderid(values);
          setCurrentOrderidValue("");
        }}
        currentFieldValue={currentOrderidValue}
        label={"Orderid"}
        items={orderid}
        hasError={errors?.orderid?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("orderid", currentOrderidValue)
        }
        errorMessage={errors?.orderid?.errorMessage}
        setFieldValue={setCurrentOrderidValue}
        inputFieldRef={orderidRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Orderid"
          isRequired={false}
          isReadOnly={false}
          value={currentOrderidValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.orderid?.hasError) {
              runValidationTasks("orderid", value);
            }
            setCurrentOrderidValue(value);
          }}
          onBlur={() => runValidationTasks("orderid", currentOrderidValue)}
          errorMessage={errors.orderid?.errorMessage}
          hasError={errors.orderid?.hasError}
          ref={orderidRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "orderid")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Staff"
        isRequired={false}
        isReadOnly={false}
        value={Staff}
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
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff: value,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
            };
            const result = onChange(modelFields);
            value = result?.Staff ?? value;
          }
          if (errors.Staff?.hasError) {
            runValidationTasks("Staff", value);
          }
          setStaff(value);
        }}
        onBlur={() => runValidationTasks("Staff", Staff)}
        errorMessage={errors.Staff?.errorMessage}
        hasError={errors.Staff?.hasError}
        {...getOverrideProps(overrides, "Staff")}
      ></TextField>
      <TextField
        label="Customerbooking id"
        isRequired={false}
        isReadOnly={false}
        value={CustomerbookingID}
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
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID: value,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
            };
            const result = onChange(modelFields);
            value = result?.CustomerbookingID ?? value;
          }
          if (errors.CustomerbookingID?.hasError) {
            runValidationTasks("CustomerbookingID", value);
          }
          setCustomerbookingID(value);
        }}
        onBlur={() =>
          runValidationTasks("CustomerbookingID", CustomerbookingID)
        }
        errorMessage={errors.CustomerbookingID?.errorMessage}
        hasError={errors.CustomerbookingID?.hasError}
        {...getOverrideProps(overrides, "CustomerbookingID")}
      ></TextField>
      <SwitchField
        label="Event"
        defaultChecked={false}
        isDisabled={false}
        isChecked={Event}
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
              Prepaid,
              TotalSpent,
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event: value,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
            };
            const result = onChange(modelFields);
            value = result?.Event ?? value;
          }
          if (errors.Event?.hasError) {
            runValidationTasks("Event", value);
          }
          setEvent(value);
        }}
        onBlur={() => runValidationTasks("Event", Event)}
        errorMessage={errors.Event?.errorMessage}
        hasError={errors.Event?.hasError}
        {...getOverrideProps(overrides, "Event")}
      ></SwitchField>
      <TextField
        label="Event id"
        isRequired={false}
        isReadOnly={false}
        value={EventID}
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
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID: value,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
            };
            const result = onChange(modelFields);
            value = result?.EventID ?? value;
          }
          if (errors.EventID?.hasError) {
            runValidationTasks("EventID", value);
          }
          setEventID(value);
        }}
        onBlur={() => runValidationTasks("EventID", EventID)}
        errorMessage={errors.EventID?.errorMessage}
        hasError={errors.EventID?.hasError}
        {...getOverrideProps(overrides, "EventID")}
      ></TextField>
      <TextField
        label="Event name"
        isRequired={false}
        isReadOnly={false}
        value={EventName}
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
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName: value,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
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
        label="Payment auth"
        isRequired={false}
        isReadOnly={false}
        value={PaymentAuth}
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
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth: value,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
            };
            const result = onChange(modelFields);
            value = result?.PaymentAuth ?? value;
          }
          if (errors.PaymentAuth?.hasError) {
            runValidationTasks("PaymentAuth", value);
          }
          setPaymentAuth(value);
        }}
        onBlur={() => runValidationTasks("PaymentAuth", PaymentAuth)}
        errorMessage={errors.PaymentAuth?.errorMessage}
        hasError={errors.PaymentAuth?.hasError}
        {...getOverrideProps(overrides, "PaymentAuth")}
      ></TextField>
      <TextField
        label="Payment method"
        isRequired={false}
        isReadOnly={false}
        value={PaymentMethod}
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
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod: value,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
            };
            const result = onChange(modelFields);
            value = result?.PaymentMethod ?? value;
          }
          if (errors.PaymentMethod?.hasError) {
            runValidationTasks("PaymentMethod", value);
          }
          setPaymentMethod(value);
        }}
        onBlur={() => runValidationTasks("PaymentMethod", PaymentMethod)}
        errorMessage={errors.PaymentMethod?.errorMessage}
        hasError={errors.PaymentMethod?.hasError}
        {...getOverrideProps(overrides, "PaymentMethod")}
      ></TextField>
      <TextField
        label="Entrance fee"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={EntranceFee}
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
              TotalSpent,
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee: value,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
            };
            const result = onChange(modelFields);
            value = result?.EntranceFee ?? value;
          }
          if (errors.EntranceFee?.hasError) {
            runValidationTasks("EntranceFee", value);
          }
          setEntranceFee(value);
        }}
        onBlur={() => runValidationTasks("EntranceFee", EntranceFee)}
        errorMessage={errors.EntranceFee?.errorMessage}
        hasError={errors.EntranceFee?.hasError}
        {...getOverrideProps(overrides, "EntranceFee")}
      ></TextField>
      <SwitchField
        label="Clean table"
        defaultChecked={false}
        isDisabled={false}
        isChecked={CleanTable}
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
              Prepaid,
              TotalSpent,
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable: value,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
            };
            const result = onChange(modelFields);
            value = result?.CleanTable ?? value;
          }
          if (errors.CleanTable?.hasError) {
            runValidationTasks("CleanTable", value);
          }
          setCleanTable(value);
        }}
        onBlur={() => runValidationTasks("CleanTable", CleanTable)}
        errorMessage={errors.CleanTable?.errorMessage}
        hasError={errors.CleanTable?.hasError}
        {...getOverrideProps(overrides, "CleanTable")}
      ></SwitchField>
      <TextAreaField
        label="Child data"
        isRequired={false}
        isReadOnly={false}
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
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData: value,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
            };
            const result = onChange(modelFields);
            value = result?.ChildData ?? value;
          }
          if (errors.ChildData?.hasError) {
            runValidationTasks("ChildData", value);
          }
          setChildData(value);
        }}
        onBlur={() => runValidationTasks("ChildData", ChildData)}
        errorMessage={errors.ChildData?.errorMessage}
        hasError={errors.ChildData?.hasError}
        {...getOverrideProps(overrides, "ChildData")}
      ></TextAreaField>
      <SwitchField
        label="Table cleaned"
        defaultChecked={false}
        isDisabled={false}
        isChecked={TableCleaned}
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
              Prepaid,
              TotalSpent,
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned: value,
              AcceptedTerms,
              EmailSubscription,
              CarReg,
            };
            const result = onChange(modelFields);
            value = result?.TableCleaned ?? value;
          }
          if (errors.TableCleaned?.hasError) {
            runValidationTasks("TableCleaned", value);
          }
          setTableCleaned(value);
        }}
        onBlur={() => runValidationTasks("TableCleaned", TableCleaned)}
        errorMessage={errors.TableCleaned?.errorMessage}
        hasError={errors.TableCleaned?.hasError}
        {...getOverrideProps(overrides, "TableCleaned")}
      ></SwitchField>
      <SwitchField
        label="Accepted terms"
        defaultChecked={false}
        isDisabled={false}
        isChecked={AcceptedTerms}
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
              Prepaid,
              TotalSpent,
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms: value,
              EmailSubscription,
              CarReg,
            };
            const result = onChange(modelFields);
            value = result?.AcceptedTerms ?? value;
          }
          if (errors.AcceptedTerms?.hasError) {
            runValidationTasks("AcceptedTerms", value);
          }
          setAcceptedTerms(value);
        }}
        onBlur={() => runValidationTasks("AcceptedTerms", AcceptedTerms)}
        errorMessage={errors.AcceptedTerms?.errorMessage}
        hasError={errors.AcceptedTerms?.hasError}
        {...getOverrideProps(overrides, "AcceptedTerms")}
      ></SwitchField>
      <SwitchField
        label="Email subscription"
        defaultChecked={false}
        isDisabled={false}
        isChecked={EmailSubscription}
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
              Prepaid,
              TotalSpent,
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription: value,
              CarReg,
            };
            const result = onChange(modelFields);
            value = result?.EmailSubscription ?? value;
          }
          if (errors.EmailSubscription?.hasError) {
            runValidationTasks("EmailSubscription", value);
          }
          setEmailSubscription(value);
        }}
        onBlur={() =>
          runValidationTasks("EmailSubscription", EmailSubscription)
        }
        errorMessage={errors.EmailSubscription?.errorMessage}
        hasError={errors.EmailSubscription?.hasError}
        {...getOverrideProps(overrides, "EmailSubscription")}
      ></SwitchField>
      <TextField
        label="Car reg"
        isRequired={false}
        isReadOnly={false}
        value={CarReg}
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
              Adults,
              Children,
              Arrived,
              LeftCenter,
              ExtraTables,
              Telephone,
              orderid,
              Staff,
              CustomerbookingID,
              Event,
              EventID,
              EventName,
              PaymentAuth,
              PaymentMethod,
              EntranceFee,
              CleanTable,
              ChildData,
              TableCleaned,
              AcceptedTerms,
              EmailSubscription,
              CarReg: value,
            };
            const result = onChange(modelFields);
            value = result?.CarReg ?? value;
          }
          if (errors.CarReg?.hasError) {
            runValidationTasks("CarReg", value);
          }
          setCarReg(value);
        }}
        onBlur={() => runValidationTasks("CarReg", CarReg)}
        errorMessage={errors.CarReg?.errorMessage}
        hasError={errors.CarReg?.hasError}
        {...getOverrideProps(overrides, "CarReg")}
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
