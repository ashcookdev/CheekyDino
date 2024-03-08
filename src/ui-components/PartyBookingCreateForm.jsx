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
export default function PartyBookingCreateForm(props) {
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
    ChildName: "",
    ChildAge: "",
    NoOfChildren: "",
    FoodOptionSelected: "",
    AdultHotFoodQty: "",
    AdultColdFoodQty: "",
    Total: "",
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
  const [ChildName, setChildName] = React.useState(initialValues.ChildName);
  const [ChildAge, setChildAge] = React.useState(initialValues.ChildAge);
  const [NoOfChildren, setNoOfChildren] = React.useState(
    initialValues.NoOfChildren
  );
  const [FoodOptionSelected, setFoodOptionSelected] = React.useState(
    initialValues.FoodOptionSelected
  );
  const [AdultHotFoodQty, setAdultHotFoodQty] = React.useState(
    initialValues.AdultHotFoodQty
  );
  const [AdultColdFoodQty, setAdultColdFoodQty] = React.useState(
    initialValues.AdultColdFoodQty
  );
  const [Total, setTotal] = React.useState(initialValues.Total);
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
    setChildName(initialValues.ChildName);
    setChildAge(initialValues.ChildAge);
    setNoOfChildren(initialValues.NoOfChildren);
    setFoodOptionSelected(initialValues.FoodOptionSelected);
    setAdultHotFoodQty(initialValues.AdultHotFoodQty);
    setAdultColdFoodQty(initialValues.AdultColdFoodQty);
    setTotal(initialValues.Total);
    setPartybookingID(initialValues.partybookingID);
    setPartyFoodComplete(initialValues.PartyFoodComplete);
    setLeftBranch(initialValues.LeftBranch);
    setCurrentGuests(initialValues.CurrentGuests);
    setLeftBranchTime(initialValues.LeftBranchTime);
    setTable(initialValues.Table);
    setPartyFoodDelivered(initialValues.PartyFoodDelivered);
    setAmountPaid(initialValues.AmountPaid);
    setPartyAdultFoodChoices(initialValues.PartyAdultFoodChoices);
    setCurrentPartyAdultFoodChoicesValue("");
    setEmail(initialValues.Email);
    setTelephone(initialValues.Telephone);
    setCalibrateStock(initialValues.CalibrateStock);
    setPayments(initialValues.Payments);
    setCurrentPaymentsValue("");
    setUtd(initialValues.Utd);
    setErrors({});
  };
  const [
    currentPartyAdultFoodChoicesValue,
    setCurrentPartyAdultFoodChoicesValue,
  ] = React.useState("");
  const PartyAdultFoodChoicesRef = React.createRef();
  const [currentPaymentsValue, setCurrentPaymentsValue] = React.useState("");
  const PaymentsRef = React.createRef();
  const validations = {
    ChildName: [{ type: "Required" }],
    ChildAge: [{ type: "Required" }],
    NoOfChildren: [{ type: "Required" }],
    FoodOptionSelected: [],
    AdultHotFoodQty: [],
    AdultColdFoodQty: [],
    Total: [{ type: "Required" }],
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
          ChildName,
          ChildAge,
          NoOfChildren,
          FoodOptionSelected,
          AdultHotFoodQty,
          AdultColdFoodQty,
          Total,
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
          const modelFieldsToSave = {
            ChildName: modelFields.ChildName,
            ChildAge: modelFields.ChildAge,
            NoOfChildren: modelFields.NoOfChildren,
            FoodOptionSelected: modelFields.FoodOptionSelected,
            Total: modelFields.Total,
            partybookingID: modelFields.partybookingID,
            PartyFoodComplete: modelFields.PartyFoodComplete,
            LeftBranch: modelFields.LeftBranch,
            CurrentGuests: modelFields.CurrentGuests,
            LeftBranchTime: modelFields.LeftBranchTime,
            Table: modelFields.Table,
            PartyFoodDelivered: modelFields.PartyFoodDelivered,
            AmountPaid: modelFields.AmountPaid,
            PartyAdultFoodChoices: modelFields.PartyAdultFoodChoices,
            Email: modelFields.Email,
            Telephone: modelFields.Telephone,
            CalibrateStock: modelFields.CalibrateStock,
            Payments: modelFields.Payments,
            Utd: modelFields.Utd,
          };
          await DataStore.save(new PartyBooking(modelFieldsToSave));
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
      {...getOverrideProps(overrides, "PartyBookingCreateForm")}
      {...rest}
    >
      <TextField
        label="Child name"
        isRequired={true}
        isReadOnly={false}
        value={ChildName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ChildName: value,
              ChildAge,
              NoOfChildren,
              FoodOptionSelected,
              AdultHotFoodQty,
              AdultColdFoodQty,
              Total,
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
              ChildName,
              ChildAge: value,
              NoOfChildren,
              FoodOptionSelected,
              AdultHotFoodQty,
              AdultColdFoodQty,
              Total,
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
              ChildName,
              ChildAge,
              NoOfChildren: value,
              FoodOptionSelected,
              AdultHotFoodQty,
              AdultColdFoodQty,
              Total,
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
      <TextField
        label="Food option selected"
        isRequired={false}
        isReadOnly={false}
        value={FoodOptionSelected}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ChildName,
              ChildAge,
              NoOfChildren,
              FoodOptionSelected: value,
              AdultHotFoodQty,
              AdultColdFoodQty,
              Total,
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
        label="Label"
        value={AdultHotFoodQty}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ChildName,
              ChildAge,
              NoOfChildren,
              FoodOptionSelected,
              AdultHotFoodQty: value,
              AdultColdFoodQty,
              Total,
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
        label="Label"
        value={AdultColdFoodQty}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ChildName,
              ChildAge,
              NoOfChildren,
              FoodOptionSelected,
              AdultHotFoodQty,
              AdultColdFoodQty: value,
              Total,
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
              ChildName,
              ChildAge,
              NoOfChildren,
              FoodOptionSelected,
              AdultHotFoodQty,
              AdultColdFoodQty,
              Total: value,
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
      <TextField
        label="Partybooking id"
        isRequired={false}
        isReadOnly={false}
        value={partybookingID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ChildName,
              ChildAge,
              NoOfChildren,
              FoodOptionSelected,
              AdultHotFoodQty,
              AdultColdFoodQty,
              Total,
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
              ChildName,
              ChildAge,
              NoOfChildren,
              FoodOptionSelected,
              AdultHotFoodQty,
              AdultColdFoodQty,
              Total,
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
              ChildName,
              ChildAge,
              NoOfChildren,
              FoodOptionSelected,
              AdultHotFoodQty,
              AdultColdFoodQty,
              Total,
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
              ChildName,
              ChildAge,
              NoOfChildren,
              FoodOptionSelected,
              AdultHotFoodQty,
              AdultColdFoodQty,
              Total,
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
              ChildName,
              ChildAge,
              NoOfChildren,
              FoodOptionSelected,
              AdultHotFoodQty,
              AdultColdFoodQty,
              Total,
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
              ChildName,
              ChildAge,
              NoOfChildren,
              FoodOptionSelected,
              AdultHotFoodQty,
              AdultColdFoodQty,
              Total,
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
              ChildName,
              ChildAge,
              NoOfChildren,
              FoodOptionSelected,
              AdultHotFoodQty,
              AdultColdFoodQty,
              Total,
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
              ChildName,
              ChildAge,
              NoOfChildren,
              FoodOptionSelected,
              AdultHotFoodQty,
              AdultColdFoodQty,
              Total,
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
              ChildName,
              ChildAge,
              NoOfChildren,
              FoodOptionSelected,
              AdultHotFoodQty,
              AdultColdFoodQty,
              Total,
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
              ChildName,
              ChildAge,
              NoOfChildren,
              FoodOptionSelected,
              AdultHotFoodQty,
              AdultColdFoodQty,
              Total,
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
              ChildName,
              ChildAge,
              NoOfChildren,
              FoodOptionSelected,
              AdultHotFoodQty,
              AdultColdFoodQty,
              Total,
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
              ChildName,
              ChildAge,
              NoOfChildren,
              FoodOptionSelected,
              AdultHotFoodQty,
              AdultColdFoodQty,
              Total,
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
              ChildName,
              ChildAge,
              NoOfChildren,
              FoodOptionSelected,
              AdultHotFoodQty,
              AdultColdFoodQty,
              Total,
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
              ChildName,
              ChildAge,
              NoOfChildren,
              FoodOptionSelected,
              AdultHotFoodQty,
              AdultColdFoodQty,
              Total,
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
