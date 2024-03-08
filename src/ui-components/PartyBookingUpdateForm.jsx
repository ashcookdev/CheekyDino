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
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { PartyBooking } from "../models";
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
    SweetConesSelected: false,
    CharacterSelected: "",
    BearVoiceRecorders: false,
    PartyFoodPrepared: "",
    PartyHostAssigned: "",
    PartyChildMumArrived: "",
    PartyFoodTimeDue: "",
    PartyFinish: "",
    partybookingID: "",
    PartyFoodComplete: false,
    LeftBranch: false,
    CurrentGuests: "",
    LeftBranchTime: "",
    Table: "",
    PartyFoodDelivered: false,
    AmountPaid: "",
    PartyAdultFoodChoices: [],
    Email: "",
    Telephone: "",
    CalibrateStock: false,
    Payments: [],
    Utd: false,
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
  const [partybookingID, setPartybookingID] = React.useState(
    initialValues.partybookingID
  );
  const [PartyFoodComplete, setPartyFoodComplete] = React.useState(
    initialValues.PartyFoodComplete
  );
  const [LeftBranch, setLeftBranch] = React.useState(initialValues.LeftBranch);
  const [CurrentGuests, setCurrentGuests] = React.useState(
    initialValues.CurrentGuests
  );
  const [LeftBranchTime, setLeftBranchTime] = React.useState(
    initialValues.LeftBranchTime
  );
  const [Table, setTable] = React.useState(initialValues.Table);
  const [PartyFoodDelivered, setPartyFoodDelivered] = React.useState(
    initialValues.PartyFoodDelivered
  );
  const [AmountPaid, setAmountPaid] = React.useState(initialValues.AmountPaid);
  const [PartyAdultFoodChoices, setPartyAdultFoodChoices] = React.useState(
    initialValues.PartyAdultFoodChoices
  );
  const [Email, setEmail] = React.useState(initialValues.Email);
  const [Telephone, setTelephone] = React.useState(initialValues.Telephone);
  const [CalibrateStock, setCalibrateStock] = React.useState(
    initialValues.CalibrateStock
  );
  const [Payments, setPayments] = React.useState(initialValues.Payments);
  const [Utd, setUtd] = React.useState(initialValues.Utd);
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
    setSweetConesSelected(cleanValues.SweetConesSelected);
    setCharacterSelected(cleanValues.CharacterSelected);
    setBearVoiceRecorders(cleanValues.BearVoiceRecorders);
    setPartyFoodPrepared(cleanValues.PartyFoodPrepared);
    setPartyHostAssigned(cleanValues.PartyHostAssigned);
    setPartyChildMumArrived(cleanValues.PartyChildMumArrived);
    setPartyFoodTimeDue(cleanValues.PartyFoodTimeDue);
    setPartyFinish(cleanValues.PartyFinish);
    setPartybookingID(cleanValues.partybookingID);
    setPartyFoodComplete(cleanValues.PartyFoodComplete);
    setLeftBranch(cleanValues.LeftBranch);
    setCurrentGuests(cleanValues.CurrentGuests);
    setLeftBranchTime(cleanValues.LeftBranchTime);
    setTable(cleanValues.Table);
    setPartyFoodDelivered(cleanValues.PartyFoodDelivered);
    setAmountPaid(cleanValues.AmountPaid);
    setPartyAdultFoodChoices(cleanValues.PartyAdultFoodChoices ?? []);
    setCurrentPartyAdultFoodChoicesValue("");
    setEmail(cleanValues.Email);
    setTelephone(cleanValues.Telephone);
    setCalibrateStock(cleanValues.CalibrateStock);
    setPayments(cleanValues.Payments ?? []);
    setCurrentPaymentsValue("");
    setUtd(cleanValues.Utd);
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
  const [
    currentPartyAdultFoodChoicesValue,
    setCurrentPartyAdultFoodChoicesValue,
  ] = React.useState("");
  const PartyAdultFoodChoicesRef = React.createRef();
  const [currentPaymentsValue, setCurrentPaymentsValue] = React.useState("");
  const PaymentsRef = React.createRef();
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
    SweetConesSelected: [],
    CharacterSelected: [],
    BearVoiceRecorders: [],
    PartyFoodPrepared: [],
    PartyHostAssigned: [],
    PartyChildMumArrived: [],
    PartyFoodTimeDue: [],
    PartyFinish: [],
    partybookingID: [],
    PartyFoodComplete: [],
    LeftBranch: [],
    CurrentGuests: [],
    LeftBranchTime: [],
    Table: [],
    PartyFoodDelivered: [],
    AmountPaid: [],
    PartyAdultFoodChoices: [],
    Email: [],
    Telephone: [],
    CalibrateStock: [],
    Payments: [],
    Utd: [],
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
          SweetConesSelected,
          CharacterSelected,
          BearVoiceRecorders,
          PartyFoodPrepared,
          PartyHostAssigned,
          PartyChildMumArrived,
          PartyFoodTimeDue,
          PartyFinish,
          partybookingID,
          PartyFoodComplete,
          LeftBranch,
          CurrentGuests,
          LeftBranchTime,
          Table,
          PartyFoodDelivered,
          AmountPaid,
          PartyAdultFoodChoices,
          Email,
          Telephone,
          CalibrateStock,
          Payments,
          Utd,
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
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
              SweetConesSelected: value,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
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
              SweetConesSelected,
              CharacterSelected: value,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders: value,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared: value,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned: value,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived: value,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue: value,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish: value,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
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
      <TextField
        label="Partybooking id"
        isRequired={false}
        isReadOnly={false}
        value={partybookingID}
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID: value,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
            };
            const result = onChange(modelFields);
            value = result?.partybookingID ?? value;
          }
          if (errors.partybookingID?.hasError) {
            runValidationTasks("partybookingID", value);
          }
          setPartybookingID(value);
        }}
        onBlur={() => runValidationTasks("partybookingID", partybookingID)}
        errorMessage={errors.partybookingID?.errorMessage}
        hasError={errors.partybookingID?.hasError}
        {...getOverrideProps(overrides, "partybookingID")}
      ></TextField>
      <SwitchField
        label="Party food complete"
        defaultChecked={false}
        isDisabled={false}
        isChecked={PartyFoodComplete}
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete: value,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
            };
            const result = onChange(modelFields);
            value = result?.PartyFoodComplete ?? value;
          }
          if (errors.PartyFoodComplete?.hasError) {
            runValidationTasks("PartyFoodComplete", value);
          }
          setPartyFoodComplete(value);
        }}
        onBlur={() =>
          runValidationTasks("PartyFoodComplete", PartyFoodComplete)
        }
        errorMessage={errors.PartyFoodComplete?.errorMessage}
        hasError={errors.PartyFoodComplete?.hasError}
        {...getOverrideProps(overrides, "PartyFoodComplete")}
      ></SwitchField>
      <SwitchField
        label="Left branch"
        defaultChecked={false}
        isDisabled={false}
        isChecked={LeftBranch}
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch: value,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
            };
            const result = onChange(modelFields);
            value = result?.LeftBranch ?? value;
          }
          if (errors.LeftBranch?.hasError) {
            runValidationTasks("LeftBranch", value);
          }
          setLeftBranch(value);
        }}
        onBlur={() => runValidationTasks("LeftBranch", LeftBranch)}
        errorMessage={errors.LeftBranch?.errorMessage}
        hasError={errors.LeftBranch?.hasError}
        {...getOverrideProps(overrides, "LeftBranch")}
      ></SwitchField>
      <TextField
        label="Current guests"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={CurrentGuests}
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests: value,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
            };
            const result = onChange(modelFields);
            value = result?.CurrentGuests ?? value;
          }
          if (errors.CurrentGuests?.hasError) {
            runValidationTasks("CurrentGuests", value);
          }
          setCurrentGuests(value);
        }}
        onBlur={() => runValidationTasks("CurrentGuests", CurrentGuests)}
        errorMessage={errors.CurrentGuests?.errorMessage}
        hasError={errors.CurrentGuests?.hasError}
        {...getOverrideProps(overrides, "CurrentGuests")}
      ></TextField>
      <TextField
        label="Left branch time"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={LeftBranchTime}
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime: value,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
            };
            const result = onChange(modelFields);
            value = result?.LeftBranchTime ?? value;
          }
          if (errors.LeftBranchTime?.hasError) {
            runValidationTasks("LeftBranchTime", value);
          }
          setLeftBranchTime(value);
        }}
        onBlur={() => runValidationTasks("LeftBranchTime", LeftBranchTime)}
        errorMessage={errors.LeftBranchTime?.errorMessage}
        hasError={errors.LeftBranchTime?.hasError}
        {...getOverrideProps(overrides, "LeftBranchTime")}
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
              PartyType,
              ChildName,
              ChildAge,
              PartyDate,
              PartyTime,
              NoOfChildren,
              ThirdPartyContactedDate,
              FoodOptionSelected,
              Total,
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table: value,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
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
      <SwitchField
        label="Party food delivered"
        defaultChecked={false}
        isDisabled={false}
        isChecked={PartyFoodDelivered}
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered: value,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
            };
            const result = onChange(modelFields);
            value = result?.PartyFoodDelivered ?? value;
          }
          if (errors.PartyFoodDelivered?.hasError) {
            runValidationTasks("PartyFoodDelivered", value);
          }
          setPartyFoodDelivered(value);
        }}
        onBlur={() =>
          runValidationTasks("PartyFoodDelivered", PartyFoodDelivered)
        }
        errorMessage={errors.PartyFoodDelivered?.errorMessage}
        hasError={errors.PartyFoodDelivered?.hasError}
        {...getOverrideProps(overrides, "PartyFoodDelivered")}
      ></SwitchField>
      <TextField
        label="Amount paid"
        isRequired={false}
        isReadOnly={false}
        value={AmountPaid}
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid: value,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
            };
            const result = onChange(modelFields);
            value = result?.AmountPaid ?? value;
          }
          if (errors.AmountPaid?.hasError) {
            runValidationTasks("AmountPaid", value);
          }
          setAmountPaid(value);
        }}
        onBlur={() => runValidationTasks("AmountPaid", AmountPaid)}
        errorMessage={errors.AmountPaid?.errorMessage}
        hasError={errors.AmountPaid?.hasError}
        {...getOverrideProps(overrides, "AmountPaid")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices: values,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
            };
            const result = onChange(modelFields);
            values = result?.PartyAdultFoodChoices ?? values;
          }
          setPartyAdultFoodChoices(values);
          setCurrentPartyAdultFoodChoicesValue("");
        }}
        currentFieldValue={currentPartyAdultFoodChoicesValue}
        label={"Party adult food choices"}
        items={PartyAdultFoodChoices}
        hasError={errors?.PartyAdultFoodChoices?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "PartyAdultFoodChoices",
            currentPartyAdultFoodChoicesValue
          )
        }
        errorMessage={errors?.PartyAdultFoodChoices?.errorMessage}
        setFieldValue={setCurrentPartyAdultFoodChoicesValue}
        inputFieldRef={PartyAdultFoodChoicesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Party adult food choices"
          isRequired={false}
          isReadOnly={false}
          value={currentPartyAdultFoodChoicesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.PartyAdultFoodChoices?.hasError) {
              runValidationTasks("PartyAdultFoodChoices", value);
            }
            setCurrentPartyAdultFoodChoicesValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "PartyAdultFoodChoices",
              currentPartyAdultFoodChoicesValue
            )
          }
          errorMessage={errors.PartyAdultFoodChoices?.errorMessage}
          hasError={errors.PartyAdultFoodChoices?.hasError}
          ref={PartyAdultFoodChoicesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "PartyAdultFoodChoices")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={Email}
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email: value,
              Telephone,
              CalibrateStock,
              Payments,
              Utd,
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
              PartyType,
              ChildName,
              ChildAge,
              PartyDate,
              PartyTime,
              NoOfChildren,
              ThirdPartyContactedDate,
              FoodOptionSelected,
              Total,
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone: value,
              CalibrateStock,
              Payments,
              Utd,
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
        label="Calibrate stock"
        defaultChecked={false}
        isDisabled={false}
        isChecked={CalibrateStock}
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock: value,
              Payments,
              Utd,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments: values,
              Utd,
            };
            const result = onChange(modelFields);
            values = result?.Payments ?? values;
          }
          setPayments(values);
          setCurrentPaymentsValue("");
        }}
        currentFieldValue={currentPaymentsValue}
        label={"Payments"}
        items={Payments}
        hasError={errors?.Payments?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Payments", currentPaymentsValue)
        }
        errorMessage={errors?.Payments?.errorMessage}
        setFieldValue={setCurrentPaymentsValue}
        inputFieldRef={PaymentsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Payments"
          isRequired={false}
          isReadOnly={false}
          value={currentPaymentsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Payments?.hasError) {
              runValidationTasks("Payments", value);
            }
            setCurrentPaymentsValue(value);
          }}
          onBlur={() => runValidationTasks("Payments", currentPaymentsValue)}
          errorMessage={errors.Payments?.errorMessage}
          hasError={errors.Payments?.hasError}
          ref={PaymentsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Payments")}
        ></TextField>
      </ArrayField>
      <SwitchField
        label="Utd"
        defaultChecked={false}
        isDisabled={false}
        isChecked={Utd}
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
              SweetConesSelected,
              CharacterSelected,
              BearVoiceRecorders,
              PartyFoodPrepared,
              PartyHostAssigned,
              PartyChildMumArrived,
              PartyFoodTimeDue,
              PartyFinish,
              partybookingID,
              PartyFoodComplete,
              LeftBranch,
              CurrentGuests,
              LeftBranchTime,
              Table,
              PartyFoodDelivered,
              AmountPaid,
              PartyAdultFoodChoices,
              Email,
              Telephone,
              CalibrateStock,
              Payments,
              Utd: value,
            };
            const result = onChange(modelFields);
            value = result?.Utd ?? value;
          }
          if (errors.Utd?.hasError) {
            runValidationTasks("Utd", value);
          }
          setUtd(value);
        }}
        onBlur={() => runValidationTasks("Utd", Utd)}
        errorMessage={errors.Utd?.errorMessage}
        hasError={errors.Utd?.hasError}
        {...getOverrideProps(overrides, "Utd")}
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
