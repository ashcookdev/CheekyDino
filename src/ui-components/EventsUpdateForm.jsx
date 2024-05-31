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
import { Events } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function EventsUpdateForm(props) {
  const {
    id: idProp,
    events: eventsModelProp,
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
    Description: "",
    Food: false,
    StartTime: "",
    Date: "",
    Tables: "",
    KidsPrice: "",
    Image: "",
    AdultMenu: "",
    KidsMenu: "",
    EndTime: "",
    AdultPrice: "",
    Price2: "",
    Price3: "",
    TicketsSold: "",
    CalibrateStock: false,
    Total: "",
    PaymentAuth: "",
  };
  const [Name, setName] = React.useState(initialValues.Name);
  const [Description, setDescription] = React.useState(
    initialValues.Description
  );
  const [Food, setFood] = React.useState(initialValues.Food);
  const [StartTime, setStartTime] = React.useState(initialValues.StartTime);
  const [Date, setDate] = React.useState(initialValues.Date);
  const [Tables, setTables] = React.useState(initialValues.Tables);
  const [KidsPrice, setKidsPrice] = React.useState(initialValues.KidsPrice);
  const [Image, setImage] = React.useState(initialValues.Image);
  const [AdultMenu, setAdultMenu] = React.useState(initialValues.AdultMenu);
  const [KidsMenu, setKidsMenu] = React.useState(initialValues.KidsMenu);
  const [EndTime, setEndTime] = React.useState(initialValues.EndTime);
  const [AdultPrice, setAdultPrice] = React.useState(initialValues.AdultPrice);
  const [Price2, setPrice2] = React.useState(initialValues.Price2);
  const [Price3, setPrice3] = React.useState(initialValues.Price3);
  const [TicketsSold, setTicketsSold] = React.useState(
    initialValues.TicketsSold
  );
  const [CalibrateStock, setCalibrateStock] = React.useState(
    initialValues.CalibrateStock
  );
  const [Total, setTotal] = React.useState(initialValues.Total);
  const [PaymentAuth, setPaymentAuth] = React.useState(
    initialValues.PaymentAuth
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = eventsRecord
      ? { ...initialValues, ...eventsRecord }
      : initialValues;
    setName(cleanValues.Name);
    setDescription(cleanValues.Description);
    setFood(cleanValues.Food);
    setStartTime(cleanValues.StartTime);
    setDate(cleanValues.Date);
    setTables(cleanValues.Tables);
    setKidsPrice(cleanValues.KidsPrice);
    setImage(cleanValues.Image);
    setAdultMenu(
      typeof cleanValues.AdultMenu === "string" ||
        cleanValues.AdultMenu === null
        ? cleanValues.AdultMenu
        : JSON.stringify(cleanValues.AdultMenu)
    );
    setKidsMenu(
      typeof cleanValues.KidsMenu === "string" || cleanValues.KidsMenu === null
        ? cleanValues.KidsMenu
        : JSON.stringify(cleanValues.KidsMenu)
    );
    setEndTime(cleanValues.EndTime);
    setAdultPrice(cleanValues.AdultPrice);
    setPrice2(cleanValues.Price2);
    setPrice3(cleanValues.Price3);
    setTicketsSold(cleanValues.TicketsSold);
    setCalibrateStock(cleanValues.CalibrateStock);
    setTotal(cleanValues.Total);
    setPaymentAuth(cleanValues.PaymentAuth);
    setErrors({});
  };
  const [eventsRecord, setEventsRecord] = React.useState(eventsModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Events, idProp)
        : eventsModelProp;
      setEventsRecord(record);
    };
    queryData();
  }, [idProp, eventsModelProp]);
  React.useEffect(resetStateValues, [eventsRecord]);
  const validations = {
    Name: [],
    Description: [],
    Food: [],
    StartTime: [],
    Date: [],
    Tables: [],
    KidsPrice: [],
    Image: [],
    AdultMenu: [{ type: "JSON" }],
    KidsMenu: [{ type: "JSON" }],
    EndTime: [],
    AdultPrice: [],
    Price2: [],
    Price3: [],
    TicketsSold: [],
    CalibrateStock: [],
    Total: [],
    PaymentAuth: [],
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
          Description,
          Food,
          StartTime,
          Date,
          Tables,
          KidsPrice,
          Image,
          AdultMenu,
          KidsMenu,
          EndTime,
          AdultPrice,
          Price2,
          Price3,
          TicketsSold,
          CalibrateStock,
          Total,
          PaymentAuth,
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
            Events.copyOf(eventsRecord, (updated) => {
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
      {...getOverrideProps(overrides, "EventsUpdateForm")}
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
              Description,
              Food,
              StartTime,
              Date,
              Tables,
              KidsPrice,
              Image,
              AdultMenu,
              KidsMenu,
              EndTime,
              AdultPrice,
              Price2,
              Price3,
              TicketsSold,
              CalibrateStock,
              Total,
              PaymentAuth,
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
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={Description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Description: value,
              Food,
              StartTime,
              Date,
              Tables,
              KidsPrice,
              Image,
              AdultMenu,
              KidsMenu,
              EndTime,
              AdultPrice,
              Price2,
              Price3,
              TicketsSold,
              CalibrateStock,
              Total,
              PaymentAuth,
            };
            const result = onChange(modelFields);
            value = result?.Description ?? value;
          }
          if (errors.Description?.hasError) {
            runValidationTasks("Description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("Description", Description)}
        errorMessage={errors.Description?.errorMessage}
        hasError={errors.Description?.hasError}
        {...getOverrideProps(overrides, "Description")}
      ></TextField>
      <SwitchField
        label="Food"
        defaultChecked={false}
        isDisabled={false}
        isChecked={Food}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Name,
              Description,
              Food: value,
              StartTime,
              Date,
              Tables,
              KidsPrice,
              Image,
              AdultMenu,
              KidsMenu,
              EndTime,
              AdultPrice,
              Price2,
              Price3,
              TicketsSold,
              CalibrateStock,
              Total,
              PaymentAuth,
            };
            const result = onChange(modelFields);
            value = result?.Food ?? value;
          }
          if (errors.Food?.hasError) {
            runValidationTasks("Food", value);
          }
          setFood(value);
        }}
        onBlur={() => runValidationTasks("Food", Food)}
        errorMessage={errors.Food?.errorMessage}
        hasError={errors.Food?.hasError}
        {...getOverrideProps(overrides, "Food")}
      ></SwitchField>
      <TextField
        label="Start time"
        isRequired={false}
        isReadOnly={false}
        value={StartTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Description,
              Food,
              StartTime: value,
              Date,
              Tables,
              KidsPrice,
              Image,
              AdultMenu,
              KidsMenu,
              EndTime,
              AdultPrice,
              Price2,
              Price3,
              TicketsSold,
              CalibrateStock,
              Total,
              PaymentAuth,
            };
            const result = onChange(modelFields);
            value = result?.StartTime ?? value;
          }
          if (errors.StartTime?.hasError) {
            runValidationTasks("StartTime", value);
          }
          setStartTime(value);
        }}
        onBlur={() => runValidationTasks("StartTime", StartTime)}
        errorMessage={errors.StartTime?.errorMessage}
        hasError={errors.StartTime?.hasError}
        {...getOverrideProps(overrides, "StartTime")}
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
              Description,
              Food,
              StartTime,
              Date: value,
              Tables,
              KidsPrice,
              Image,
              AdultMenu,
              KidsMenu,
              EndTime,
              AdultPrice,
              Price2,
              Price3,
              TicketsSold,
              CalibrateStock,
              Total,
              PaymentAuth,
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
        label="Tables"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Tables}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Description,
              Food,
              StartTime,
              Date,
              Tables: value,
              KidsPrice,
              Image,
              AdultMenu,
              KidsMenu,
              EndTime,
              AdultPrice,
              Price2,
              Price3,
              TicketsSold,
              CalibrateStock,
              Total,
              PaymentAuth,
            };
            const result = onChange(modelFields);
            value = result?.Tables ?? value;
          }
          if (errors.Tables?.hasError) {
            runValidationTasks("Tables", value);
          }
          setTables(value);
        }}
        onBlur={() => runValidationTasks("Tables", Tables)}
        errorMessage={errors.Tables?.errorMessage}
        hasError={errors.Tables?.hasError}
        {...getOverrideProps(overrides, "Tables")}
      ></TextField>
      <TextField
        label="Kids price"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={KidsPrice}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Description,
              Food,
              StartTime,
              Date,
              Tables,
              KidsPrice: value,
              Image,
              AdultMenu,
              KidsMenu,
              EndTime,
              AdultPrice,
              Price2,
              Price3,
              TicketsSold,
              CalibrateStock,
              Total,
              PaymentAuth,
            };
            const result = onChange(modelFields);
            value = result?.KidsPrice ?? value;
          }
          if (errors.KidsPrice?.hasError) {
            runValidationTasks("KidsPrice", value);
          }
          setKidsPrice(value);
        }}
        onBlur={() => runValidationTasks("KidsPrice", KidsPrice)}
        errorMessage={errors.KidsPrice?.errorMessage}
        hasError={errors.KidsPrice?.hasError}
        {...getOverrideProps(overrides, "KidsPrice")}
      ></TextField>
      <TextField
        label="Image"
        isRequired={false}
        isReadOnly={false}
        value={Image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Description,
              Food,
              StartTime,
              Date,
              Tables,
              KidsPrice,
              Image: value,
              AdultMenu,
              KidsMenu,
              EndTime,
              AdultPrice,
              Price2,
              Price3,
              TicketsSold,
              CalibrateStock,
              Total,
              PaymentAuth,
            };
            const result = onChange(modelFields);
            value = result?.Image ?? value;
          }
          if (errors.Image?.hasError) {
            runValidationTasks("Image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("Image", Image)}
        errorMessage={errors.Image?.errorMessage}
        hasError={errors.Image?.hasError}
        {...getOverrideProps(overrides, "Image")}
      ></TextField>
      <TextAreaField
        label="Adult menu"
        isRequired={false}
        isReadOnly={false}
        value={AdultMenu}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Description,
              Food,
              StartTime,
              Date,
              Tables,
              KidsPrice,
              Image,
              AdultMenu: value,
              KidsMenu,
              EndTime,
              AdultPrice,
              Price2,
              Price3,
              TicketsSold,
              CalibrateStock,
              Total,
              PaymentAuth,
            };
            const result = onChange(modelFields);
            value = result?.AdultMenu ?? value;
          }
          if (errors.AdultMenu?.hasError) {
            runValidationTasks("AdultMenu", value);
          }
          setAdultMenu(value);
        }}
        onBlur={() => runValidationTasks("AdultMenu", AdultMenu)}
        errorMessage={errors.AdultMenu?.errorMessage}
        hasError={errors.AdultMenu?.hasError}
        {...getOverrideProps(overrides, "AdultMenu")}
      ></TextAreaField>
      <TextAreaField
        label="Kids menu"
        isRequired={false}
        isReadOnly={false}
        value={KidsMenu}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Description,
              Food,
              StartTime,
              Date,
              Tables,
              KidsPrice,
              Image,
              AdultMenu,
              KidsMenu: value,
              EndTime,
              AdultPrice,
              Price2,
              Price3,
              TicketsSold,
              CalibrateStock,
              Total,
              PaymentAuth,
            };
            const result = onChange(modelFields);
            value = result?.KidsMenu ?? value;
          }
          if (errors.KidsMenu?.hasError) {
            runValidationTasks("KidsMenu", value);
          }
          setKidsMenu(value);
        }}
        onBlur={() => runValidationTasks("KidsMenu", KidsMenu)}
        errorMessage={errors.KidsMenu?.errorMessage}
        hasError={errors.KidsMenu?.hasError}
        {...getOverrideProps(overrides, "KidsMenu")}
      ></TextAreaField>
      <TextField
        label="End time"
        isRequired={false}
        isReadOnly={false}
        value={EndTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Description,
              Food,
              StartTime,
              Date,
              Tables,
              KidsPrice,
              Image,
              AdultMenu,
              KidsMenu,
              EndTime: value,
              AdultPrice,
              Price2,
              Price3,
              TicketsSold,
              CalibrateStock,
              Total,
              PaymentAuth,
            };
            const result = onChange(modelFields);
            value = result?.EndTime ?? value;
          }
          if (errors.EndTime?.hasError) {
            runValidationTasks("EndTime", value);
          }
          setEndTime(value);
        }}
        onBlur={() => runValidationTasks("EndTime", EndTime)}
        errorMessage={errors.EndTime?.errorMessage}
        hasError={errors.EndTime?.hasError}
        {...getOverrideProps(overrides, "EndTime")}
      ></TextField>
      <TextField
        label="Adult price"
        isRequired={false}
        isReadOnly={false}
        value={AdultPrice}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Description,
              Food,
              StartTime,
              Date,
              Tables,
              KidsPrice,
              Image,
              AdultMenu,
              KidsMenu,
              EndTime,
              AdultPrice: value,
              Price2,
              Price3,
              TicketsSold,
              CalibrateStock,
              Total,
              PaymentAuth,
            };
            const result = onChange(modelFields);
            value = result?.AdultPrice ?? value;
          }
          if (errors.AdultPrice?.hasError) {
            runValidationTasks("AdultPrice", value);
          }
          setAdultPrice(value);
        }}
        onBlur={() => runValidationTasks("AdultPrice", AdultPrice)}
        errorMessage={errors.AdultPrice?.errorMessage}
        hasError={errors.AdultPrice?.hasError}
        {...getOverrideProps(overrides, "AdultPrice")}
      ></TextField>
      <TextField
        label="Price2"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Price2}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Description,
              Food,
              StartTime,
              Date,
              Tables,
              KidsPrice,
              Image,
              AdultMenu,
              KidsMenu,
              EndTime,
              AdultPrice,
              Price2: value,
              Price3,
              TicketsSold,
              CalibrateStock,
              Total,
              PaymentAuth,
            };
            const result = onChange(modelFields);
            value = result?.Price2 ?? value;
          }
          if (errors.Price2?.hasError) {
            runValidationTasks("Price2", value);
          }
          setPrice2(value);
        }}
        onBlur={() => runValidationTasks("Price2", Price2)}
        errorMessage={errors.Price2?.errorMessage}
        hasError={errors.Price2?.hasError}
        {...getOverrideProps(overrides, "Price2")}
      ></TextField>
      <TextField
        label="Price3"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Price3}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Description,
              Food,
              StartTime,
              Date,
              Tables,
              KidsPrice,
              Image,
              AdultMenu,
              KidsMenu,
              EndTime,
              AdultPrice,
              Price2,
              Price3: value,
              TicketsSold,
              CalibrateStock,
              Total,
              PaymentAuth,
            };
            const result = onChange(modelFields);
            value = result?.Price3 ?? value;
          }
          if (errors.Price3?.hasError) {
            runValidationTasks("Price3", value);
          }
          setPrice3(value);
        }}
        onBlur={() => runValidationTasks("Price3", Price3)}
        errorMessage={errors.Price3?.errorMessage}
        hasError={errors.Price3?.hasError}
        {...getOverrideProps(overrides, "Price3")}
      ></TextField>
      <TextField
        label="Tickets sold"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={TicketsSold}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Description,
              Food,
              StartTime,
              Date,
              Tables,
              KidsPrice,
              Image,
              AdultMenu,
              KidsMenu,
              EndTime,
              AdultPrice,
              Price2,
              Price3,
              TicketsSold: value,
              CalibrateStock,
              Total,
              PaymentAuth,
            };
            const result = onChange(modelFields);
            value = result?.TicketsSold ?? value;
          }
          if (errors.TicketsSold?.hasError) {
            runValidationTasks("TicketsSold", value);
          }
          setTicketsSold(value);
        }}
        onBlur={() => runValidationTasks("TicketsSold", TicketsSold)}
        errorMessage={errors.TicketsSold?.errorMessage}
        hasError={errors.TicketsSold?.hasError}
        {...getOverrideProps(overrides, "TicketsSold")}
      ></TextField>
      <SwitchField
        label="Calibrate stock"
        defaultChecked={false}
        isDisabled={false}
        isChecked={CalibrateStock}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Name,
              Description,
              Food,
              StartTime,
              Date,
              Tables,
              KidsPrice,
              Image,
              AdultMenu,
              KidsMenu,
              EndTime,
              AdultPrice,
              Price2,
              Price3,
              TicketsSold,
              CalibrateStock: value,
              Total,
              PaymentAuth,
            };
            const result = onChange(modelFields);
            value = result?.CalibrateStock ?? value;
          }
          if (errors.CalibrateStock?.hasError) {
            runValidationTasks("CalibrateStock", value);
          }
          setCalibrateStock(value);
        }}
        onBlur={() => runValidationTasks("CalibrateStock", CalibrateStock)}
        errorMessage={errors.CalibrateStock?.errorMessage}
        hasError={errors.CalibrateStock?.hasError}
        {...getOverrideProps(overrides, "CalibrateStock")}
      ></SwitchField>
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
              Name,
              Description,
              Food,
              StartTime,
              Date,
              Tables,
              KidsPrice,
              Image,
              AdultMenu,
              KidsMenu,
              EndTime,
              AdultPrice,
              Price2,
              Price3,
              TicketsSold,
              CalibrateStock,
              Total: value,
              PaymentAuth,
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
        label="Payment auth"
        isRequired={false}
        isReadOnly={false}
        value={PaymentAuth}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Description,
              Food,
              StartTime,
              Date,
              Tables,
              KidsPrice,
              Image,
              AdultMenu,
              KidsMenu,
              EndTime,
              AdultPrice,
              Price2,
              Price3,
              TicketsSold,
              CalibrateStock,
              Total,
              PaymentAuth: value,
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
          isDisabled={!(idProp || eventsModelProp)}
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
              !(idProp || eventsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
