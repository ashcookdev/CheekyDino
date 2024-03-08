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
import { HomeCookedCollection } from "../models";
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
export default function HomeCookedCollectionUpdateForm(props) {
  const {
    id: idProp,
    homeCookedCollection: homeCookedCollectionModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    CreatedTime: "",
    CreatedDate: "",
    Total: "",
    DrinkItems: [],
    HotItems: [],
    CollectionTime: "",
    Completed: false,
    Delieved: false,
    Name: "",
    Notes: "",
    Kitchen: false,
    KitchenMenuId: [],
    Email: "",
    Telephone: "",
    Prepaid: false,
    PaymentAuth: "",
  };
  const [CreatedTime, setCreatedTime] = React.useState(
    initialValues.CreatedTime
  );
  const [CreatedDate, setCreatedDate] = React.useState(
    initialValues.CreatedDate
  );
  const [Total, setTotal] = React.useState(initialValues.Total);
  const [DrinkItems, setDrinkItems] = React.useState(initialValues.DrinkItems);
  const [HotItems, setHotItems] = React.useState(initialValues.HotItems);
  const [CollectionTime, setCollectionTime] = React.useState(
    initialValues.CollectionTime
  );
  const [Completed, setCompleted] = React.useState(initialValues.Completed);
  const [Delieved, setDelieved] = React.useState(initialValues.Delieved);
  const [Name, setName] = React.useState(initialValues.Name);
  const [Notes, setNotes] = React.useState(initialValues.Notes);
  const [Kitchen, setKitchen] = React.useState(initialValues.Kitchen);
  const [KitchenMenuId, setKitchenMenuId] = React.useState(
    initialValues.KitchenMenuId
  );
  const [Email, setEmail] = React.useState(initialValues.Email);
  const [Telephone, setTelephone] = React.useState(initialValues.Telephone);
  const [Prepaid, setPrepaid] = React.useState(initialValues.Prepaid);
  const [PaymentAuth, setPaymentAuth] = React.useState(
    initialValues.PaymentAuth
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = homeCookedCollectionRecord
      ? { ...initialValues, ...homeCookedCollectionRecord }
      : initialValues;
    setCreatedTime(cleanValues.CreatedTime);
    setCreatedDate(cleanValues.CreatedDate);
    setTotal(cleanValues.Total);
    setDrinkItems(cleanValues.DrinkItems ?? []);
    setCurrentDrinkItemsValue("");
    setHotItems(cleanValues.HotItems ?? []);
    setCurrentHotItemsValue("");
    setCollectionTime(cleanValues.CollectionTime);
    setCompleted(cleanValues.Completed);
    setDelieved(cleanValues.Delieved);
    setName(cleanValues.Name);
    setNotes(cleanValues.Notes);
    setKitchen(cleanValues.Kitchen);
    setKitchenMenuId(cleanValues.KitchenMenuId ?? []);
    setCurrentKitchenMenuIdValue("");
    setEmail(cleanValues.Email);
    setTelephone(cleanValues.Telephone);
    setPrepaid(cleanValues.Prepaid);
    setPaymentAuth(cleanValues.PaymentAuth);
    setErrors({});
  };
  const [homeCookedCollectionRecord, setHomeCookedCollectionRecord] =
    React.useState(homeCookedCollectionModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(HomeCookedCollection, idProp)
        : homeCookedCollectionModelProp;
      setHomeCookedCollectionRecord(record);
    };
    queryData();
  }, [idProp, homeCookedCollectionModelProp]);
  React.useEffect(resetStateValues, [homeCookedCollectionRecord]);
  const [currentDrinkItemsValue, setCurrentDrinkItemsValue] =
    React.useState("");
  const DrinkItemsRef = React.createRef();
  const [currentHotItemsValue, setCurrentHotItemsValue] = React.useState("");
  const HotItemsRef = React.createRef();
  const [currentKitchenMenuIdValue, setCurrentKitchenMenuIdValue] =
    React.useState("");
  const KitchenMenuIdRef = React.createRef();
  const validations = {
    CreatedTime: [],
    CreatedDate: [],
    Total: [],
    DrinkItems: [],
    HotItems: [],
    CollectionTime: [],
    Completed: [],
    Delieved: [],
    Name: [],
    Notes: [],
    Kitchen: [],
    KitchenMenuId: [],
    Email: [],
    Telephone: [],
    Prepaid: [],
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
          CreatedTime,
          CreatedDate,
          Total,
          DrinkItems,
          HotItems,
          CollectionTime,
          Completed,
          Delieved,
          Name,
          Notes,
          Kitchen,
          KitchenMenuId,
          Email,
          Telephone,
          Prepaid,
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
            HomeCookedCollection.copyOf(
              homeCookedCollectionRecord,
              (updated) => {
                Object.assign(updated, modelFields);
              }
            )
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
      {...getOverrideProps(overrides, "HomeCookedCollectionUpdateForm")}
      {...rest}
    >
      <TextField
        label="Created time"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={CreatedTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              CreatedTime: value,
              CreatedDate,
              Total,
              DrinkItems,
              HotItems,
              CollectionTime,
              Completed,
              Delieved,
              Name,
              Notes,
              Kitchen,
              KitchenMenuId,
              Email,
              Telephone,
              Prepaid,
              PaymentAuth,
            };
            const result = onChange(modelFields);
            value = result?.CreatedTime ?? value;
          }
          if (errors.CreatedTime?.hasError) {
            runValidationTasks("CreatedTime", value);
          }
          setCreatedTime(value);
        }}
        onBlur={() => runValidationTasks("CreatedTime", CreatedTime)}
        errorMessage={errors.CreatedTime?.errorMessage}
        hasError={errors.CreatedTime?.hasError}
        {...getOverrideProps(overrides, "CreatedTime")}
      ></TextField>
      <TextField
        label="Created date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={CreatedDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              CreatedTime,
              CreatedDate: value,
              Total,
              DrinkItems,
              HotItems,
              CollectionTime,
              Completed,
              Delieved,
              Name,
              Notes,
              Kitchen,
              KitchenMenuId,
              Email,
              Telephone,
              Prepaid,
              PaymentAuth,
            };
            const result = onChange(modelFields);
            value = result?.CreatedDate ?? value;
          }
          if (errors.CreatedDate?.hasError) {
            runValidationTasks("CreatedDate", value);
          }
          setCreatedDate(value);
        }}
        onBlur={() => runValidationTasks("CreatedDate", CreatedDate)}
        errorMessage={errors.CreatedDate?.errorMessage}
        hasError={errors.CreatedDate?.hasError}
        {...getOverrideProps(overrides, "CreatedDate")}
      ></TextField>
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
              CreatedTime,
              CreatedDate,
              Total: value,
              DrinkItems,
              HotItems,
              CollectionTime,
              Completed,
              Delieved,
              Name,
              Notes,
              Kitchen,
              KitchenMenuId,
              Email,
              Telephone,
              Prepaid,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              CreatedTime,
              CreatedDate,
              Total,
              DrinkItems: values,
              HotItems,
              CollectionTime,
              Completed,
              Delieved,
              Name,
              Notes,
              Kitchen,
              KitchenMenuId,
              Email,
              Telephone,
              Prepaid,
              PaymentAuth,
            };
            const result = onChange(modelFields);
            values = result?.DrinkItems ?? values;
          }
          setDrinkItems(values);
          setCurrentDrinkItemsValue("");
        }}
        currentFieldValue={currentDrinkItemsValue}
        label={"Drink items"}
        items={DrinkItems}
        hasError={errors?.DrinkItems?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("DrinkItems", currentDrinkItemsValue)
        }
        errorMessage={errors?.DrinkItems?.errorMessage}
        setFieldValue={setCurrentDrinkItemsValue}
        inputFieldRef={DrinkItemsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Drink items"
          isRequired={false}
          isReadOnly={false}
          value={currentDrinkItemsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.DrinkItems?.hasError) {
              runValidationTasks("DrinkItems", value);
            }
            setCurrentDrinkItemsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("DrinkItems", currentDrinkItemsValue)
          }
          errorMessage={errors.DrinkItems?.errorMessage}
          hasError={errors.DrinkItems?.hasError}
          ref={DrinkItemsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "DrinkItems")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              CreatedTime,
              CreatedDate,
              Total,
              DrinkItems,
              HotItems: values,
              CollectionTime,
              Completed,
              Delieved,
              Name,
              Notes,
              Kitchen,
              KitchenMenuId,
              Email,
              Telephone,
              Prepaid,
              PaymentAuth,
            };
            const result = onChange(modelFields);
            values = result?.HotItems ?? values;
          }
          setHotItems(values);
          setCurrentHotItemsValue("");
        }}
        currentFieldValue={currentHotItemsValue}
        label={"Hot items"}
        items={HotItems}
        hasError={errors?.HotItems?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("HotItems", currentHotItemsValue)
        }
        errorMessage={errors?.HotItems?.errorMessage}
        setFieldValue={setCurrentHotItemsValue}
        inputFieldRef={HotItemsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Hot items"
          isRequired={false}
          isReadOnly={false}
          value={currentHotItemsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.HotItems?.hasError) {
              runValidationTasks("HotItems", value);
            }
            setCurrentHotItemsValue(value);
          }}
          onBlur={() => runValidationTasks("HotItems", currentHotItemsValue)}
          errorMessage={errors.HotItems?.errorMessage}
          hasError={errors.HotItems?.hasError}
          ref={HotItemsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "HotItems")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Collection time"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={CollectionTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              CreatedTime,
              CreatedDate,
              Total,
              DrinkItems,
              HotItems,
              CollectionTime: value,
              Completed,
              Delieved,
              Name,
              Notes,
              Kitchen,
              KitchenMenuId,
              Email,
              Telephone,
              Prepaid,
              PaymentAuth,
            };
            const result = onChange(modelFields);
            value = result?.CollectionTime ?? value;
          }
          if (errors.CollectionTime?.hasError) {
            runValidationTasks("CollectionTime", value);
          }
          setCollectionTime(value);
        }}
        onBlur={() => runValidationTasks("CollectionTime", CollectionTime)}
        errorMessage={errors.CollectionTime?.errorMessage}
        hasError={errors.CollectionTime?.hasError}
        {...getOverrideProps(overrides, "CollectionTime")}
      ></TextField>
      <SwitchField
        label="Completed"
        defaultChecked={false}
        isDisabled={false}
        isChecked={Completed}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              CreatedTime,
              CreatedDate,
              Total,
              DrinkItems,
              HotItems,
              CollectionTime,
              Completed: value,
              Delieved,
              Name,
              Notes,
              Kitchen,
              KitchenMenuId,
              Email,
              Telephone,
              Prepaid,
              PaymentAuth,
            };
            const result = onChange(modelFields);
            value = result?.Completed ?? value;
          }
          if (errors.Completed?.hasError) {
            runValidationTasks("Completed", value);
          }
          setCompleted(value);
        }}
        onBlur={() => runValidationTasks("Completed", Completed)}
        errorMessage={errors.Completed?.errorMessage}
        hasError={errors.Completed?.hasError}
        {...getOverrideProps(overrides, "Completed")}
      ></SwitchField>
      <SwitchField
        label="Delieved"
        defaultChecked={false}
        isDisabled={false}
        isChecked={Delieved}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              CreatedTime,
              CreatedDate,
              Total,
              DrinkItems,
              HotItems,
              CollectionTime,
              Completed,
              Delieved: value,
              Name,
              Notes,
              Kitchen,
              KitchenMenuId,
              Email,
              Telephone,
              Prepaid,
              PaymentAuth,
            };
            const result = onChange(modelFields);
            value = result?.Delieved ?? value;
          }
          if (errors.Delieved?.hasError) {
            runValidationTasks("Delieved", value);
          }
          setDelieved(value);
        }}
        onBlur={() => runValidationTasks("Delieved", Delieved)}
        errorMessage={errors.Delieved?.errorMessage}
        hasError={errors.Delieved?.hasError}
        {...getOverrideProps(overrides, "Delieved")}
      ></SwitchField>
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={Name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              CreatedTime,
              CreatedDate,
              Total,
              DrinkItems,
              HotItems,
              CollectionTime,
              Completed,
              Delieved,
              Name: value,
              Notes,
              Kitchen,
              KitchenMenuId,
              Email,
              Telephone,
              Prepaid,
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
        label="Notes"
        isRequired={false}
        isReadOnly={false}
        value={Notes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              CreatedTime,
              CreatedDate,
              Total,
              DrinkItems,
              HotItems,
              CollectionTime,
              Completed,
              Delieved,
              Name,
              Notes: value,
              Kitchen,
              KitchenMenuId,
              Email,
              Telephone,
              Prepaid,
              PaymentAuth,
            };
            const result = onChange(modelFields);
            value = result?.Notes ?? value;
          }
          if (errors.Notes?.hasError) {
            runValidationTasks("Notes", value);
          }
          setNotes(value);
        }}
        onBlur={() => runValidationTasks("Notes", Notes)}
        errorMessage={errors.Notes?.errorMessage}
        hasError={errors.Notes?.hasError}
        {...getOverrideProps(overrides, "Notes")}
      ></TextField>
      <SwitchField
        label="Kitchen"
        defaultChecked={false}
        isDisabled={false}
        isChecked={Kitchen}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              CreatedTime,
              CreatedDate,
              Total,
              DrinkItems,
              HotItems,
              CollectionTime,
              Completed,
              Delieved,
              Name,
              Notes,
              Kitchen: value,
              KitchenMenuId,
              Email,
              Telephone,
              Prepaid,
              PaymentAuth,
            };
            const result = onChange(modelFields);
            value = result?.Kitchen ?? value;
          }
          if (errors.Kitchen?.hasError) {
            runValidationTasks("Kitchen", value);
          }
          setKitchen(value);
        }}
        onBlur={() => runValidationTasks("Kitchen", Kitchen)}
        errorMessage={errors.Kitchen?.errorMessage}
        hasError={errors.Kitchen?.hasError}
        {...getOverrideProps(overrides, "Kitchen")}
      ></SwitchField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              CreatedTime,
              CreatedDate,
              Total,
              DrinkItems,
              HotItems,
              CollectionTime,
              Completed,
              Delieved,
              Name,
              Notes,
              Kitchen,
              KitchenMenuId: values,
              Email,
              Telephone,
              Prepaid,
              PaymentAuth,
            };
            const result = onChange(modelFields);
            values = result?.KitchenMenuId ?? values;
          }
          setKitchenMenuId(values);
          setCurrentKitchenMenuIdValue("");
        }}
        currentFieldValue={currentKitchenMenuIdValue}
        label={"Kitchen menu id"}
        items={KitchenMenuId}
        hasError={errors?.KitchenMenuId?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("KitchenMenuId", currentKitchenMenuIdValue)
        }
        errorMessage={errors?.KitchenMenuId?.errorMessage}
        setFieldValue={setCurrentKitchenMenuIdValue}
        inputFieldRef={KitchenMenuIdRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Kitchen menu id"
          isRequired={false}
          isReadOnly={false}
          value={currentKitchenMenuIdValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.KitchenMenuId?.hasError) {
              runValidationTasks("KitchenMenuId", value);
            }
            setCurrentKitchenMenuIdValue(value);
          }}
          onBlur={() =>
            runValidationTasks("KitchenMenuId", currentKitchenMenuIdValue)
          }
          errorMessage={errors.KitchenMenuId?.errorMessage}
          hasError={errors.KitchenMenuId?.hasError}
          ref={KitchenMenuIdRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "KitchenMenuId")}
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
              CreatedTime,
              CreatedDate,
              Total,
              DrinkItems,
              HotItems,
              CollectionTime,
              Completed,
              Delieved,
              Name,
              Notes,
              Kitchen,
              KitchenMenuId,
              Email: value,
              Telephone,
              Prepaid,
              PaymentAuth,
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
              CreatedTime,
              CreatedDate,
              Total,
              DrinkItems,
              HotItems,
              CollectionTime,
              Completed,
              Delieved,
              Name,
              Notes,
              Kitchen,
              KitchenMenuId,
              Email,
              Telephone: value,
              Prepaid,
              PaymentAuth,
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
        label="Prepaid"
        defaultChecked={false}
        isDisabled={false}
        isChecked={Prepaid}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              CreatedTime,
              CreatedDate,
              Total,
              DrinkItems,
              HotItems,
              CollectionTime,
              Completed,
              Delieved,
              Name,
              Notes,
              Kitchen,
              KitchenMenuId,
              Email,
              Telephone,
              Prepaid: value,
              PaymentAuth,
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
        label="Payment auth"
        isRequired={false}
        isReadOnly={false}
        value={PaymentAuth}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              CreatedTime,
              CreatedDate,
              Total,
              DrinkItems,
              HotItems,
              CollectionTime,
              Completed,
              Delieved,
              Name,
              Notes,
              Kitchen,
              KitchenMenuId,
              Email,
              Telephone,
              Prepaid,
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
          isDisabled={!(idProp || homeCookedCollectionModelProp)}
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
              !(idProp || homeCookedCollectionModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
