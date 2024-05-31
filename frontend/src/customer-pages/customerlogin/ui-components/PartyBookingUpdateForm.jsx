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
import { PartyBooking } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function PartyBookingUpdateForm(props) {
  const {
    id: idProp,
    partyBooking: partyBookingModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    PartyType: "",
    ChildName: "",
    ChildAge: "",
    PartyDate: "",
    PartyTime: "",
    NoOfChildren: "",
    ThirdPartyContactedDate: false,
    FoodOptionSelected: "",
    Total: "",
    AdultHotFoodQty: "",
    AdultColdFoodQty: "",
    SweetConesSelected: false,
    CharacterSelected: "",
    BearVoiceRecorders: false,
    PartyFoodPrepared: "",
    PartyHostAssigned: "",
    PartyChildMumArrived: "",
    PartyFoodTimeDue: "",
    PartyFinish: "",
  };
  const [PartyType, setPartyType] = React.useState(initialValues.PartyType);
  const [ChildName, setChildName] = React.useState(initialValues.ChildName);
  const [ChildAge, setChildAge] = React.useState(initialValues.ChildAge);
  const [PartyDate, setPartyDate] = React.useState(initialValues.PartyDate);
  const [PartyTime, setPartyTime] = React.useState(initialValues.PartyTime);
  const [NoOfChildren, setNoOfChildren] = React.useState(
    initialValues.NoOfChildren
  );
  const [ThirdPartyContactedDate, setThirdPartyContactedDate] = React.useState(
    initialValues.ThirdPartyContactedDate
  );
  const [FoodOptionSelected, setFoodOptionSelected] = React.useState(
    initialValues.FoodOptionSelected
  );
  const [Total, setTotal] = React.useState(initialValues.Total);
  const [AdultHotFoodQty, setAdultHotFoodQty] = React.useState(
    initialValues.AdultHotFoodQty
  );
  const [AdultColdFoodQty, setAdultColdFoodQty] = React.useState(
    initialValues.AdultColdFoodQty
  );
  const [SweetConesSelected, setSweetConesSelected] = React.useState(
    initialValues.SweetConesSelected
  );
  const [CharacterSelected, setCharacterSelected] = React.useState(
    initialValues.CharacterSelected
  );
  const [BearVoiceRecorders, setBearVoiceRecorders] = React.useState(
    initialValues.BearVoiceRecorders
  );
  const [PartyFoodPrepared, setPartyFoodPrepared] = React.useState(
    initialValues.PartyFoodPrepared
  );
  const [PartyHostAssigned, setPartyHostAssigned] = React.useState(
    initialValues.PartyHostAssigned
  );
  const [PartyChildMumArrived, setPartyChildMumArrived] = React.useState(
    initialValues.PartyChildMumArrived
  );
  const [PartyFoodTimeDue, setPartyFoodTimeDue] = React.useState(
    initialValues.PartyFoodTimeDue
  );
  const [PartyFinish, setPartyFinish] = React.useState(
    initialValues.PartyFinish
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = partyBookingRecord
      ? { ...initialValues, ...partyBookingRecord }
      : initialValues;
    setPartyType(cleanValues.PartyType);
    setChildName(cleanValues.ChildName);
    setChildAge(cleanValues.ChildAge);
    setPartyDate(cleanValues.PartyDate);
    setPartyTime(cleanValues.PartyTime);
    setNoOfChildren(cleanValues.NoOfChildren);
    setThirdPartyContactedDate(cleanValues.ThirdPartyContactedDate);
    setFoodOptionSelected(cleanValues.FoodOptionSelected);
    setTotal(cleanValues.Total);
    setAdultHotFoodQty(cleanValues.AdultHotFoodQty);
    setAdultColdFoodQty(cleanValues.AdultColdFoodQty);
    setSweetConesSelected(cleanValues.SweetConesSelected);
    setCharacterSelected(cleanValues.CharacterSelected);
    setBearVoiceRecorders(cleanValues.BearVoiceRecorders);
    setPartyFoodPrepared(cleanValues.PartyFoodPrepared);
    setPartyHostAssigned(cleanValues.PartyHostAssigned);
    setPartyChildMumArrived(cleanValues.PartyChildMumArrived);
    setPartyFoodTimeDue(cleanValues.PartyFoodTimeDue);
    setPartyFinish(cleanValues.PartyFinish);
    setErrors({});
  };
  const [partyBookingRecord, setPartyBookingRecord] = React.useState(
    partyBookingModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(PartyBooking, idProp)
        : partyBookingModelProp;
      setPartyBookingRecord(record);
    };
    queryData();
  }, [idProp, partyBookingModelProp]);
  React.useEffect(resetStateValues, [partyBookingRecord]);
  const validations = {
    PartyType: [{ type: "Required" }],
    ChildName: [{ type: "Required" }],
    ChildAge: [{ type: "Required" }],
    PartyDate: [{ type: "Required" }],
    PartyTime: [{ type: "Required" }],
    NoOfChildren: [{ type: "Required" }],
    ThirdPartyContactedDate: [],
    FoodOptionSelected: [],
    Total: [{ type: "Required" }],
    AdultHotFoodQty: [],
    AdultColdFoodQty: [],
    SweetConesSelected: [],
    CharacterSelected: [],
    BearVoiceRecorders: [],
    PartyFoodPrepared: [],
    PartyHostAssigned: [],
    PartyChildMumArrived: [],
    PartyFoodTimeDue: [],
    PartyFinish: [],
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
          PartyType,
          ChildName,
          ChildAge,
          PartyDate,
          PartyTime,
          NoOfChildren,
          ThirdPartyContactedDate,
          FoodOptionSelected,
          Total,
          AdultHotFoodQty,
          AdultColdFoodQty,
          SweetConesSelected,
          CharacterSelected,
          BearVoiceRecorders,
          PartyFoodPrepared,
          PartyHostAssigned,
          PartyChildMumArrived,
          PartyFoodTimeDue,
          PartyFinish,
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
            PartyBooking.copyOf(partyBookingRecord, (updated) => {
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
      {...getOverrideProps(overrides, "PartyBookingUpdateForm")}
      {...rest}
    >
      <TextField
        label="Party type"
        isRequired={true}
        isReadOnly={false}
        value={PartyType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              PartyType: value,
              ChildName,
              ChildAge,
              PartyDate,
              PartyTime,
              NoOfChildren,
              ThirdPartyContactedDate,
              FoodOptionSelected,
              Total,
              AdultHotFoodQty,
              AdultColdFoodQty,
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
            };
            const result = onChange(modelFields);
            value = result?.PartyType ?? value;
          }
          if (errors.PartyType?.hasError) {
            runValidationTasks("PartyType", value);
          }
          setPartyType(value);
        }}
        onBlur={() => runValidationTasks("PartyType", PartyType)}
        errorMessage={errors.PartyType?.errorMessage}
        hasError={errors.PartyType?.hasError}
        {...getOverrideProps(overrides, "PartyType")}
      ></TextField>
      <TextField
        label="Child name"
        isRequired={true}
        isReadOnly={false}
        value={ChildName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              PartyType,
              ChildName: value,
              ChildAge,
              PartyDate,
              PartyTime,
              NoOfChildren,
              ThirdPartyContactedDate,
              FoodOptionSelected,
              Total,
              AdultHotFoodQty,
              AdultColdFoodQty,
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
            };
            const result = onChange(modelFields);
            value = result?.ChildName ?? value;
          }
          if (errors.ChildName?.hasError) {
            runValidationTasks("ChildName", value);
          }
          setChildName(value);
        }}
        onBlur={() => runValidationTasks("ChildName", ChildName)}
        errorMessage={errors.ChildName?.errorMessage}
        hasError={errors.ChildName?.hasError}
        {...getOverrideProps(overrides, "ChildName")}
      ></TextField>
      <TextField
        label="Child age"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={ChildAge}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              PartyType,
              ChildName,
              ChildAge: value,
              PartyDate,
              PartyTime,
              NoOfChildren,
              ThirdPartyContactedDate,
              FoodOptionSelected,
              Total,
              AdultHotFoodQty,
              AdultColdFoodQty,
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
            };
            const result = onChange(modelFields);
            value = result?.ChildAge ?? value;
          }
          if (errors.ChildAge?.hasError) {
            runValidationTasks("ChildAge", value);
          }
          setChildAge(value);
        }}
        onBlur={() => runValidationTasks("ChildAge", ChildAge)}
        errorMessage={errors.ChildAge?.errorMessage}
        hasError={errors.ChildAge?.hasError}
        {...getOverrideProps(overrides, "ChildAge")}
      ></TextField>
      <TextField
        label="Party date"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={PartyDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              PartyType,
              ChildName,
              ChildAge,
              PartyDate: value,
              PartyTime,
              NoOfChildren,
              ThirdPartyContactedDate,
              FoodOptionSelected,
              Total,
              AdultHotFoodQty,
              AdultColdFoodQty,
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
            };
            const result = onChange(modelFields);
            value = result?.PartyDate ?? value;
          }
          if (errors.PartyDate?.hasError) {
            runValidationTasks("PartyDate", value);
          }
          setPartyDate(value);
        }}
        onBlur={() => runValidationTasks("PartyDate", PartyDate)}
        errorMessage={errors.PartyDate?.errorMessage}
        hasError={errors.PartyDate?.hasError}
        {...getOverrideProps(overrides, "PartyDate")}
      ></TextField>
      <TextField
        label="Party time"
        isRequired={true}
        isReadOnly={false}
        type="time"
        value={PartyTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              PartyType,
              ChildName,
              ChildAge,
              PartyDate,
              PartyTime: value,
              NoOfChildren,
              ThirdPartyContactedDate,
              FoodOptionSelected,
              Total,
              AdultHotFoodQty,
              AdultColdFoodQty,
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
            };
            const result = onChange(modelFields);
            value = result?.PartyTime ?? value;
          }
          if (errors.PartyTime?.hasError) {
            runValidationTasks("PartyTime", value);
          }
          setPartyTime(value);
        }}
        onBlur={() => runValidationTasks("PartyTime", PartyTime)}
        errorMessage={errors.PartyTime?.errorMessage}
        hasError={errors.PartyTime?.hasError}
        {...getOverrideProps(overrides, "PartyTime")}
      ></TextField>
      <TextField
        label="No of children"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={NoOfChildren}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              PartyType,
              ChildName,
              ChildAge,
              PartyDate,
              PartyTime,
              NoOfChildren: value,
              ThirdPartyContactedDate,
              FoodOptionSelected,
              Total,
              AdultHotFoodQty,
              AdultColdFoodQty,
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
            };
            const result = onChange(modelFields);
            value = result?.NoOfChildren ?? value;
          }
          if (errors.NoOfChildren?.hasError) {
            runValidationTasks("NoOfChildren", value);
          }
          setNoOfChildren(value);
        }}
        onBlur={() => runValidationTasks("NoOfChildren", NoOfChildren)}
        errorMessage={errors.NoOfChildren?.errorMessage}
        hasError={errors.NoOfChildren?.hasError}
        {...getOverrideProps(overrides, "NoOfChildren")}
      ></TextField>
      <SwitchField
        label="Third party contacted date"
        defaultChecked={false}
        isDisabled={false}
        isChecked={ThirdPartyContactedDate}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              PartyType,
              ChildName,
              ChildAge,
              PartyDate,
              PartyTime,
              NoOfChildren,
              ThirdPartyContactedDate: value,
              FoodOptionSelected,
              Total,
              AdultHotFoodQty,
              AdultColdFoodQty,
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
            };
            const result = onChange(modelFields);
            value = result?.ThirdPartyContactedDate ?? value;
          }
          if (errors.ThirdPartyContactedDate?.hasError) {
            runValidationTasks("ThirdPartyContactedDate", value);
          }
          setThirdPartyContactedDate(value);
        }}
        onBlur={() =>
          runValidationTasks("ThirdPartyContactedDate", ThirdPartyContactedDate)
        }
        errorMessage={errors.ThirdPartyContactedDate?.errorMessage}
        hasError={errors.ThirdPartyContactedDate?.hasError}
        {...getOverrideProps(overrides, "ThirdPartyContactedDate")}
      ></SwitchField>
      <TextField
        label="Food option selected"
        isRequired={false}
        isReadOnly={false}
        value={FoodOptionSelected}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              PartyType,
              ChildName,
              ChildAge,
              PartyDate,
              PartyTime,
              NoOfChildren,
              ThirdPartyContactedDate,
              FoodOptionSelected: value,
              Total,
              AdultHotFoodQty,
              AdultColdFoodQty,
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
            };
            const result = onChange(modelFields);
            value = result?.FoodOptionSelected ?? value;
          }
          if (errors.FoodOptionSelected?.hasError) {
            runValidationTasks("FoodOptionSelected", value);
          }
          setFoodOptionSelected(value);
        }}
        onBlur={() =>
          runValidationTasks("FoodOptionSelected", FoodOptionSelected)
        }
        errorMessage={errors.FoodOptionSelected?.errorMessage}
        hasError={errors.FoodOptionSelected?.hasError}
        {...getOverrideProps(overrides, "FoodOptionSelected")}
      ></TextField>
      <TextField
        label="Total"
        isRequired={true}
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
              PartyType,
              ChildName,
              ChildAge,
              PartyDate,
              PartyTime,
              NoOfChildren,
              ThirdPartyContactedDate,
              FoodOptionSelected,
              Total: value,
              AdultHotFoodQty,
              AdultColdFoodQty,
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
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
        label="Adult hot food qty"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={AdultHotFoodQty}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              PartyType,
              ChildName,
              ChildAge,
              PartyDate,
              PartyTime,
              NoOfChildren,
              ThirdPartyContactedDate,
              FoodOptionSelected,
              Total,
              AdultHotFoodQty: value,
              AdultColdFoodQty,
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
            };
            const result = onChange(modelFields);
            value = result?.AdultHotFoodQty ?? value;
          }
          if (errors.AdultHotFoodQty?.hasError) {
            runValidationTasks("AdultHotFoodQty", value);
          }
          setAdultHotFoodQty(value);
        }}
        onBlur={() => runValidationTasks("AdultHotFoodQty", AdultHotFoodQty)}
        errorMessage={errors.AdultHotFoodQty?.errorMessage}
        hasError={errors.AdultHotFoodQty?.hasError}
        {...getOverrideProps(overrides, "AdultHotFoodQty")}
      ></TextField>
      <TextField
        label="Adult cold food qty"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={AdultColdFoodQty}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              PartyType,
              ChildName,
              ChildAge,
              PartyDate,
              PartyTime,
              NoOfChildren,
              ThirdPartyContactedDate,
              FoodOptionSelected,
              Total,
              AdultHotFoodQty,
              AdultColdFoodQty: value,
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
            };
            const result = onChange(modelFields);
            value = result?.AdultColdFoodQty ?? value;
          }
          if (errors.AdultColdFoodQty?.hasError) {
            runValidationTasks("AdultColdFoodQty", value);
          }
          setAdultColdFoodQty(value);
        }}
        onBlur={() => runValidationTasks("AdultColdFoodQty", AdultColdFoodQty)}
        errorMessage={errors.AdultColdFoodQty?.errorMessage}
        hasError={errors.AdultColdFoodQty?.hasError}
        {...getOverrideProps(overrides, "AdultColdFoodQty")}
      ></TextField>
      <SwitchField
        label="Sweet cones selected"
        defaultChecked={false}
        isDisabled={false}
        isChecked={SweetConesSelected}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              PartyType,
              ChildName,
              ChildAge,
              PartyDate,
              PartyTime,
              NoOfChildren,
              ThirdPartyContactedDate,
              FoodOptionSelected,
              Total,
              AdultHotFoodQty,
              AdultColdFoodQty,
              SweetConesSelected: value,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
            };
            const result = onChange(modelFields);
            value = result?.SweetConesSelected ?? value;
          }
          if (errors.SweetConesSelected?.hasError) {
            runValidationTasks("SweetConesSelected", value);
          }
          setSweetConesSelected(value);
        }}
        onBlur={() =>
          runValidationTasks("SweetConesSelected", SweetConesSelected)
        }
        errorMessage={errors.SweetConesSelected?.errorMessage}
        hasError={errors.SweetConesSelected?.hasError}
        {...getOverrideProps(overrides, "SweetConesSelected")}
      ></SwitchField>
      <TextField
        label="Character selected"
        isRequired={false}
        isReadOnly={false}
        value={CharacterSelected}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              PartyType,
              ChildName,
              ChildAge,
              PartyDate,
              PartyTime,
              NoOfChildren,
              ThirdPartyContactedDate,
              FoodOptionSelected,
              Total,
              AdultHotFoodQty,
              AdultColdFoodQty,
              SweetConesSelected,
              CharacterSelected: value,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
            };
            const result = onChange(modelFields);
            value = result?.CharacterSelected ?? value;
          }
          if (errors.CharacterSelected?.hasError) {
            runValidationTasks("CharacterSelected", value);
          }
          setCharacterSelected(value);
        }}
        onBlur={() =>
          runValidationTasks("CharacterSelected", CharacterSelected)
        }
        errorMessage={errors.CharacterSelected?.errorMessage}
        hasError={errors.CharacterSelected?.hasError}
        {...getOverrideProps(overrides, "CharacterSelected")}
      ></TextField>
      <SwitchField
        label="Bear voice recorders"
        defaultChecked={false}
        isDisabled={false}
        isChecked={BearVoiceRecorders}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              PartyType,
              ChildName,
              ChildAge,
              PartyDate,
              PartyTime,
              NoOfChildren,
              ThirdPartyContactedDate,
              FoodOptionSelected,
              Total,
              AdultHotFoodQty,
              AdultColdFoodQty,
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders: value,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
            };
            const result = onChange(modelFields);
            value = result?.BearVoiceRecorders ?? value;
          }
          if (errors.BearVoiceRecorders?.hasError) {
            runValidationTasks("BearVoiceRecorders", value);
          }
          setBearVoiceRecorders(value);
        }}
        onBlur={() =>
          runValidationTasks("BearVoiceRecorders", BearVoiceRecorders)
        }
        errorMessage={errors.BearVoiceRecorders?.errorMessage}
        hasError={errors.BearVoiceRecorders?.hasError}
        {...getOverrideProps(overrides, "BearVoiceRecorders")}
      ></SwitchField>
      <TextField
        label="Party food prepared"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={PartyFoodPrepared}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              PartyType,
              ChildName,
              ChildAge,
              PartyDate,
              PartyTime,
              NoOfChildren,
              ThirdPartyContactedDate,
              FoodOptionSelected,
              Total,
              AdultHotFoodQty,
              AdultColdFoodQty,
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared: value,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
            };
            const result = onChange(modelFields);
            value = result?.PartyFoodPrepared ?? value;
          }
          if (errors.PartyFoodPrepared?.hasError) {
            runValidationTasks("PartyFoodPrepared", value);
          }
          setPartyFoodPrepared(value);
        }}
        onBlur={() =>
          runValidationTasks("PartyFoodPrepared", PartyFoodPrepared)
        }
        errorMessage={errors.PartyFoodPrepared?.errorMessage}
        hasError={errors.PartyFoodPrepared?.hasError}
        {...getOverrideProps(overrides, "PartyFoodPrepared")}
      ></TextField>
      <TextField
        label="Party host assigned"
        isRequired={false}
        isReadOnly={false}
        value={PartyHostAssigned}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              PartyType,
              ChildName,
              ChildAge,
              PartyDate,
              PartyTime,
              NoOfChildren,
              ThirdPartyContactedDate,
              FoodOptionSelected,
              Total,
              AdultHotFoodQty,
              AdultColdFoodQty,
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned: value,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
            };
            const result = onChange(modelFields);
            value = result?.PartyHostAssigned ?? value;
          }
          if (errors.PartyHostAssigned?.hasError) {
            runValidationTasks("PartyHostAssigned", value);
          }
          setPartyHostAssigned(value);
        }}
        onBlur={() =>
          runValidationTasks("PartyHostAssigned", PartyHostAssigned)
        }
        errorMessage={errors.PartyHostAssigned?.errorMessage}
        hasError={errors.PartyHostAssigned?.hasError}
        {...getOverrideProps(overrides, "PartyHostAssigned")}
      ></TextField>
      <TextField
        label="Party child mum arrived"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={PartyChildMumArrived}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              PartyType,
              ChildName,
              ChildAge,
              PartyDate,
              PartyTime,
              NoOfChildren,
              ThirdPartyContactedDate,
              FoodOptionSelected,
              Total,
              AdultHotFoodQty,
              AdultColdFoodQty,
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived: value,
              PartyFoodTimeDue,
              PartyFinish,
            };
            const result = onChange(modelFields);
            value = result?.PartyChildMumArrived ?? value;
          }
          if (errors.PartyChildMumArrived?.hasError) {
            runValidationTasks("PartyChildMumArrived", value);
          }
          setPartyChildMumArrived(value);
        }}
        onBlur={() =>
          runValidationTasks("PartyChildMumArrived", PartyChildMumArrived)
        }
        errorMessage={errors.PartyChildMumArrived?.errorMessage}
        hasError={errors.PartyChildMumArrived?.hasError}
        {...getOverrideProps(overrides, "PartyChildMumArrived")}
      ></TextField>
      <TextField
        label="Party food time due"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={PartyFoodTimeDue}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              PartyType,
              ChildName,
              ChildAge,
              PartyDate,
              PartyTime,
              NoOfChildren,
              ThirdPartyContactedDate,
              FoodOptionSelected,
              Total,
              AdultHotFoodQty,
              AdultColdFoodQty,
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue: value,
              PartyFinish,
            };
            const result = onChange(modelFields);
            value = result?.PartyFoodTimeDue ?? value;
          }
          if (errors.PartyFoodTimeDue?.hasError) {
            runValidationTasks("PartyFoodTimeDue", value);
          }
          setPartyFoodTimeDue(value);
        }}
        onBlur={() => runValidationTasks("PartyFoodTimeDue", PartyFoodTimeDue)}
        errorMessage={errors.PartyFoodTimeDue?.errorMessage}
        hasError={errors.PartyFoodTimeDue?.hasError}
        {...getOverrideProps(overrides, "PartyFoodTimeDue")}
      ></TextField>
      <TextField
        label="Party finish"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={PartyFinish}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              PartyType,
              ChildName,
              ChildAge,
              PartyDate,
              PartyTime,
              NoOfChildren,
              ThirdPartyContactedDate,
              FoodOptionSelected,
              Total,
              AdultHotFoodQty,
              AdultColdFoodQty,
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish: value,
            };
            const result = onChange(modelFields);
            value = result?.PartyFinish ?? value;
          }
          if (errors.PartyFinish?.hasError) {
            runValidationTasks("PartyFinish", value);
          }
          setPartyFinish(value);
        }}
        onBlur={() => runValidationTasks("PartyFinish", PartyFinish)}
        errorMessage={errors.PartyFinish?.errorMessage}
        hasError={errors.PartyFinish?.hasError}
        {...getOverrideProps(overrides, "PartyFinish")}
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
          isDisabled={!(idProp || partyBookingModelProp)}
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
              !(idProp || partyBookingModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
