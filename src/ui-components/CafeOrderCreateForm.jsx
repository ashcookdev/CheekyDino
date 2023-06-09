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
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { CafeOrder } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
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
          <Button
            size="small"
            variation="link"
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function CafeOrderCreateForm(props) {
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
    CreatedTime: "",
    CreatedDate: "",
    Total: "",
    DrinkItems: [],
    HotItems: [],
    Table: "",
    Completed: false,
    Delieved: false,
    Sessionid: "",
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
  const [Table, setTable] = React.useState(initialValues.Table);
  const [Completed, setCompleted] = React.useState(initialValues.Completed);
  const [Delieved, setDelieved] = React.useState(initialValues.Delieved);
  const [Sessionid, setSessionid] = React.useState(initialValues.Sessionid);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setCreatedTime(initialValues.CreatedTime);
    setCreatedDate(initialValues.CreatedDate);
    setTotal(initialValues.Total);
    setDrinkItems(initialValues.DrinkItems);
    setCurrentDrinkItemsValue("");
    setHotItems(initialValues.HotItems);
    setCurrentHotItemsValue("");
    setTable(initialValues.Table);
    setCompleted(initialValues.Completed);
    setDelieved(initialValues.Delieved);
    setSessionid(initialValues.Sessionid);
    setErrors({});
  };
  const [currentDrinkItemsValue, setCurrentDrinkItemsValue] =
    React.useState("");
  const DrinkItemsRef = React.createRef();
  const [currentHotItemsValue, setCurrentHotItemsValue] = React.useState("");
  const HotItemsRef = React.createRef();
  const validations = {
    CreatedTime: [],
    CreatedDate: [],
    Total: [],
    DrinkItems: [],
    HotItems: [],
    Table: [],
    Completed: [],
    Delieved: [],
    Sessionid: [],
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
          Table,
          Completed,
          Delieved,
          Sessionid,
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
          await DataStore.save(new CafeOrder(modelFields));
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
      {...getOverrideProps(overrides, "CafeOrderCreateForm")}
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
              Table,
              Completed,
              Delieved,
              Sessionid,
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
              Table,
              Completed,
              Delieved,
              Sessionid,
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
              Table,
              Completed,
              Delieved,
              Sessionid,
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
              Table,
              Completed,
              Delieved,
              Sessionid,
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
              Table,
              Completed,
              Delieved,
              Sessionid,
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
              CreatedTime,
              CreatedDate,
              Total,
              DrinkItems,
              HotItems,
              Table: value,
              Completed,
              Delieved,
              Sessionid,
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
              Table,
              Completed: value,
              Delieved,
              Sessionid,
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
              Table,
              Completed,
              Delieved: value,
              Sessionid,
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
        label="Sessionid"
        isRequired={false}
        isReadOnly={false}
        value={Sessionid}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              CreatedTime,
              CreatedDate,
              Total,
              DrinkItems,
              HotItems,
              Table,
              Completed,
              Delieved,
              Sessionid: value,
            };
            const result = onChange(modelFields);
            value = result?.Sessionid ?? value;
          }
          if (errors.Sessionid?.hasError) {
            runValidationTasks("Sessionid", value);
          }
          setSessionid(value);
        }}
        onBlur={() => runValidationTasks("Sessionid", Sessionid)}
        errorMessage={errors.Sessionid?.errorMessage}
        hasError={errors.Sessionid?.hasError}
        {...getOverrideProps(overrides, "Sessionid")}
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
