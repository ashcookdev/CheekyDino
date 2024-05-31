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
  Text,
  TextAreaField,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { Admin } from "../models";
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
export default function AdminCreateForm(props) {
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
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
    Sunday: "",
    TableData: "",
    SessionPriceList: "",
    AdultPrice: "",
    CalculationCode: "",
    PartyPriceList: "",
    UpdateURL: "",
    ClosedDates: [],
    PartyTimeslots: "",
    DefaultSlots: "",
  };
  const [Monday, setMonday] = React.useState(initialValues.Monday);
  const [Tuesday, setTuesday] = React.useState(initialValues.Tuesday);
  const [Wednesday, setWednesday] = React.useState(initialValues.Wednesday);
  const [Thursday, setThursday] = React.useState(initialValues.Thursday);
  const [Friday, setFriday] = React.useState(initialValues.Friday);
  const [Saturday, setSaturday] = React.useState(initialValues.Saturday);
  const [Sunday, setSunday] = React.useState(initialValues.Sunday);
  const [TableData, setTableData] = React.useState(initialValues.TableData);
  const [SessionPriceList, setSessionPriceList] = React.useState(
    initialValues.SessionPriceList
  );
  const [AdultPrice, setAdultPrice] = React.useState(initialValues.AdultPrice);
  const [CalculationCode, setCalculationCode] = React.useState(
    initialValues.CalculationCode
  );
  const [PartyPriceList, setPartyPriceList] = React.useState(
    initialValues.PartyPriceList
  );
  const [UpdateURL, setUpdateURL] = React.useState(initialValues.UpdateURL);
  const [ClosedDates, setClosedDates] = React.useState(
    initialValues.ClosedDates
  );
  const [PartyTimeslots, setPartyTimeslots] = React.useState(
    initialValues.PartyTimeslots
  );
  const [DefaultSlots, setDefaultSlots] = React.useState(
    initialValues.DefaultSlots
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setMonday(initialValues.Monday);
    setTuesday(initialValues.Tuesday);
    setWednesday(initialValues.Wednesday);
    setThursday(initialValues.Thursday);
    setFriday(initialValues.Friday);
    setSaturday(initialValues.Saturday);
    setSunday(initialValues.Sunday);
    setTableData(initialValues.TableData);
    setSessionPriceList(initialValues.SessionPriceList);
    setAdultPrice(initialValues.AdultPrice);
    setCalculationCode(initialValues.CalculationCode);
    setPartyPriceList(initialValues.PartyPriceList);
    setUpdateURL(initialValues.UpdateURL);
    setClosedDates(initialValues.ClosedDates);
    setCurrentClosedDatesValue("");
    setPartyTimeslots(initialValues.PartyTimeslots);
    setDefaultSlots(initialValues.DefaultSlots);
    setErrors({});
  };
  const [currentClosedDatesValue, setCurrentClosedDatesValue] =
    React.useState("");
  const ClosedDatesRef = React.createRef();
  const validations = {
    Monday: [{ type: "JSON" }],
    Tuesday: [{ type: "JSON" }],
    Wednesday: [{ type: "JSON" }],
    Thursday: [{ type: "JSON" }],
    Friday: [{ type: "JSON" }],
    Saturday: [{ type: "JSON" }],
    Sunday: [{ type: "JSON" }],
    TableData: [{ type: "JSON" }],
    SessionPriceList: [{ type: "JSON" }],
    AdultPrice: [],
    CalculationCode: [{ type: "JSON" }],
    PartyPriceList: [{ type: "JSON" }],
    UpdateURL: [],
    ClosedDates: [],
    PartyTimeslots: [{ type: "JSON" }],
    DefaultSlots: [{ type: "JSON" }],
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
          Monday,
          Tuesday,
          Wednesday,
          Thursday,
          Friday,
          Saturday,
          Sunday,
          TableData,
          SessionPriceList,
          AdultPrice,
          CalculationCode,
          PartyPriceList,
          UpdateURL,
          ClosedDates,
          PartyTimeslots,
          DefaultSlots,
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
          await DataStore.save(new Admin(modelFields));
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
      {...getOverrideProps(overrides, "AdminCreateForm")}
      {...rest}
    >
      <TextAreaField
        label="Monday"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday: value,
              Tuesday,
              Wednesday,
              Thursday,
              Friday,
              Saturday,
              Sunday,
              TableData,
              SessionPriceList,
              AdultPrice,
              CalculationCode,
              PartyPriceList,
              UpdateURL,
              ClosedDates,
              PartyTimeslots,
              DefaultSlots,
            };
            const result = onChange(modelFields);
            value = result?.Monday ?? value;
          }
          if (errors.Monday?.hasError) {
            runValidationTasks("Monday", value);
          }
          setMonday(value);
        }}
        onBlur={() => runValidationTasks("Monday", Monday)}
        errorMessage={errors.Monday?.errorMessage}
        hasError={errors.Monday?.hasError}
        {...getOverrideProps(overrides, "Monday")}
      ></TextAreaField>
      <TextAreaField
        label="Tuesday"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday,
              Tuesday: value,
              Wednesday,
              Thursday,
              Friday,
              Saturday,
              Sunday,
              TableData,
              SessionPriceList,
              AdultPrice,
              CalculationCode,
              PartyPriceList,
              UpdateURL,
              ClosedDates,
              PartyTimeslots,
              DefaultSlots,
            };
            const result = onChange(modelFields);
            value = result?.Tuesday ?? value;
          }
          if (errors.Tuesday?.hasError) {
            runValidationTasks("Tuesday", value);
          }
          setTuesday(value);
        }}
        onBlur={() => runValidationTasks("Tuesday", Tuesday)}
        errorMessage={errors.Tuesday?.errorMessage}
        hasError={errors.Tuesday?.hasError}
        {...getOverrideProps(overrides, "Tuesday")}
      ></TextAreaField>
      <TextAreaField
        label="Wednesday"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday,
              Tuesday,
              Wednesday: value,
              Thursday,
              Friday,
              Saturday,
              Sunday,
              TableData,
              SessionPriceList,
              AdultPrice,
              CalculationCode,
              PartyPriceList,
              UpdateURL,
              ClosedDates,
              PartyTimeslots,
              DefaultSlots,
            };
            const result = onChange(modelFields);
            value = result?.Wednesday ?? value;
          }
          if (errors.Wednesday?.hasError) {
            runValidationTasks("Wednesday", value);
          }
          setWednesday(value);
        }}
        onBlur={() => runValidationTasks("Wednesday", Wednesday)}
        errorMessage={errors.Wednesday?.errorMessage}
        hasError={errors.Wednesday?.hasError}
        {...getOverrideProps(overrides, "Wednesday")}
      ></TextAreaField>
      <TextAreaField
        label="Thursday"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday,
              Tuesday,
              Wednesday,
              Thursday: value,
              Friday,
              Saturday,
              Sunday,
              TableData,
              SessionPriceList,
              AdultPrice,
              CalculationCode,
              PartyPriceList,
              UpdateURL,
              ClosedDates,
              PartyTimeslots,
              DefaultSlots,
            };
            const result = onChange(modelFields);
            value = result?.Thursday ?? value;
          }
          if (errors.Thursday?.hasError) {
            runValidationTasks("Thursday", value);
          }
          setThursday(value);
        }}
        onBlur={() => runValidationTasks("Thursday", Thursday)}
        errorMessage={errors.Thursday?.errorMessage}
        hasError={errors.Thursday?.hasError}
        {...getOverrideProps(overrides, "Thursday")}
      ></TextAreaField>
      <TextAreaField
        label="Friday"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday,
              Tuesday,
              Wednesday,
              Thursday,
              Friday: value,
              Saturday,
              Sunday,
              TableData,
              SessionPriceList,
              AdultPrice,
              CalculationCode,
              PartyPriceList,
              UpdateURL,
              ClosedDates,
              PartyTimeslots,
              DefaultSlots,
            };
            const result = onChange(modelFields);
            value = result?.Friday ?? value;
          }
          if (errors.Friday?.hasError) {
            runValidationTasks("Friday", value);
          }
          setFriday(value);
        }}
        onBlur={() => runValidationTasks("Friday", Friday)}
        errorMessage={errors.Friday?.errorMessage}
        hasError={errors.Friday?.hasError}
        {...getOverrideProps(overrides, "Friday")}
      ></TextAreaField>
      <TextAreaField
        label="Saturday"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday,
              Tuesday,
              Wednesday,
              Thursday,
              Friday,
              Saturday: value,
              Sunday,
              TableData,
              SessionPriceList,
              AdultPrice,
              CalculationCode,
              PartyPriceList,
              UpdateURL,
              ClosedDates,
              PartyTimeslots,
              DefaultSlots,
            };
            const result = onChange(modelFields);
            value = result?.Saturday ?? value;
          }
          if (errors.Saturday?.hasError) {
            runValidationTasks("Saturday", value);
          }
          setSaturday(value);
        }}
        onBlur={() => runValidationTasks("Saturday", Saturday)}
        errorMessage={errors.Saturday?.errorMessage}
        hasError={errors.Saturday?.hasError}
        {...getOverrideProps(overrides, "Saturday")}
      ></TextAreaField>
      <TextAreaField
        label="Sunday"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday,
              Tuesday,
              Wednesday,
              Thursday,
              Friday,
              Saturday,
              Sunday: value,
              TableData,
              SessionPriceList,
              AdultPrice,
              CalculationCode,
              PartyPriceList,
              UpdateURL,
              ClosedDates,
              PartyTimeslots,
              DefaultSlots,
            };
            const result = onChange(modelFields);
            value = result?.Sunday ?? value;
          }
          if (errors.Sunday?.hasError) {
            runValidationTasks("Sunday", value);
          }
          setSunday(value);
        }}
        onBlur={() => runValidationTasks("Sunday", Sunday)}
        errorMessage={errors.Sunday?.errorMessage}
        hasError={errors.Sunday?.hasError}
        {...getOverrideProps(overrides, "Sunday")}
      ></TextAreaField>
      <TextAreaField
        label="Table data"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday,
              Tuesday,
              Wednesday,
              Thursday,
              Friday,
              Saturday,
              Sunday,
              TableData: value,
              SessionPriceList,
              AdultPrice,
              CalculationCode,
              PartyPriceList,
              UpdateURL,
              ClosedDates,
              PartyTimeslots,
              DefaultSlots,
            };
            const result = onChange(modelFields);
            value = result?.TableData ?? value;
          }
          if (errors.TableData?.hasError) {
            runValidationTasks("TableData", value);
          }
          setTableData(value);
        }}
        onBlur={() => runValidationTasks("TableData", TableData)}
        errorMessage={errors.TableData?.errorMessage}
        hasError={errors.TableData?.hasError}
        {...getOverrideProps(overrides, "TableData")}
      ></TextAreaField>
      <TextAreaField
        label="Session price list"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday,
              Tuesday,
              Wednesday,
              Thursday,
              Friday,
              Saturday,
              Sunday,
              TableData,
              SessionPriceList: value,
              AdultPrice,
              CalculationCode,
              PartyPriceList,
              UpdateURL,
              ClosedDates,
              PartyTimeslots,
              DefaultSlots,
            };
            const result = onChange(modelFields);
            value = result?.SessionPriceList ?? value;
          }
          if (errors.SessionPriceList?.hasError) {
            runValidationTasks("SessionPriceList", value);
          }
          setSessionPriceList(value);
        }}
        onBlur={() => runValidationTasks("SessionPriceList", SessionPriceList)}
        errorMessage={errors.SessionPriceList?.errorMessage}
        hasError={errors.SessionPriceList?.hasError}
        {...getOverrideProps(overrides, "SessionPriceList")}
      ></TextAreaField>
      <TextField
        label="Adult price"
        isRequired={false}
        isReadOnly={false}
        value={AdultPrice}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday,
              Tuesday,
              Wednesday,
              Thursday,
              Friday,
              Saturday,
              Sunday,
              TableData,
              SessionPriceList,
              AdultPrice: value,
              CalculationCode,
              PartyPriceList,
              UpdateURL,
              ClosedDates,
              PartyTimeslots,
              DefaultSlots,
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
      <TextAreaField
        label="Calculation code"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday,
              Tuesday,
              Wednesday,
              Thursday,
              Friday,
              Saturday,
              Sunday,
              TableData,
              SessionPriceList,
              AdultPrice,
              CalculationCode: value,
              PartyPriceList,
              UpdateURL,
              ClosedDates,
              PartyTimeslots,
              DefaultSlots,
            };
            const result = onChange(modelFields);
            value = result?.CalculationCode ?? value;
          }
          if (errors.CalculationCode?.hasError) {
            runValidationTasks("CalculationCode", value);
          }
          setCalculationCode(value);
        }}
        onBlur={() => runValidationTasks("CalculationCode", CalculationCode)}
        errorMessage={errors.CalculationCode?.errorMessage}
        hasError={errors.CalculationCode?.hasError}
        {...getOverrideProps(overrides, "CalculationCode")}
      ></TextAreaField>
      <TextAreaField
        label="Party price list"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday,
              Tuesday,
              Wednesday,
              Thursday,
              Friday,
              Saturday,
              Sunday,
              TableData,
              SessionPriceList,
              AdultPrice,
              CalculationCode,
              PartyPriceList: value,
              UpdateURL,
              ClosedDates,
              PartyTimeslots,
              DefaultSlots,
            };
            const result = onChange(modelFields);
            value = result?.PartyPriceList ?? value;
          }
          if (errors.PartyPriceList?.hasError) {
            runValidationTasks("PartyPriceList", value);
          }
          setPartyPriceList(value);
        }}
        onBlur={() => runValidationTasks("PartyPriceList", PartyPriceList)}
        errorMessage={errors.PartyPriceList?.errorMessage}
        hasError={errors.PartyPriceList?.hasError}
        {...getOverrideProps(overrides, "PartyPriceList")}
      ></TextAreaField>
      <TextField
        label="Update url"
        isRequired={false}
        isReadOnly={false}
        value={UpdateURL}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday,
              Tuesday,
              Wednesday,
              Thursday,
              Friday,
              Saturday,
              Sunday,
              TableData,
              SessionPriceList,
              AdultPrice,
              CalculationCode,
              PartyPriceList,
              UpdateURL: value,
              ClosedDates,
              PartyTimeslots,
              DefaultSlots,
            };
            const result = onChange(modelFields);
            value = result?.UpdateURL ?? value;
          }
          if (errors.UpdateURL?.hasError) {
            runValidationTasks("UpdateURL", value);
          }
          setUpdateURL(value);
        }}
        onBlur={() => runValidationTasks("UpdateURL", UpdateURL)}
        errorMessage={errors.UpdateURL?.errorMessage}
        hasError={errors.UpdateURL?.hasError}
        {...getOverrideProps(overrides, "UpdateURL")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              Monday,
              Tuesday,
              Wednesday,
              Thursday,
              Friday,
              Saturday,
              Sunday,
              TableData,
              SessionPriceList,
              AdultPrice,
              CalculationCode,
              PartyPriceList,
              UpdateURL,
              ClosedDates: values,
              PartyTimeslots,
              DefaultSlots,
            };
            const result = onChange(modelFields);
            values = result?.ClosedDates ?? values;
          }
          setClosedDates(values);
          setCurrentClosedDatesValue("");
        }}
        currentFieldValue={currentClosedDatesValue}
        label={"Closed dates"}
        items={ClosedDates}
        hasError={errors?.ClosedDates?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("ClosedDates", currentClosedDatesValue)
        }
        errorMessage={errors?.ClosedDates?.errorMessage}
        setFieldValue={setCurrentClosedDatesValue}
        inputFieldRef={ClosedDatesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Closed dates"
          isRequired={false}
          isReadOnly={false}
          type="date"
          value={currentClosedDatesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.ClosedDates?.hasError) {
              runValidationTasks("ClosedDates", value);
            }
            setCurrentClosedDatesValue(value);
          }}
          onBlur={() =>
            runValidationTasks("ClosedDates", currentClosedDatesValue)
          }
          errorMessage={errors.ClosedDates?.errorMessage}
          hasError={errors.ClosedDates?.hasError}
          ref={ClosedDatesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "ClosedDates")}
        ></TextField>
      </ArrayField>
      <TextAreaField
        label="Party timeslots"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday,
              Tuesday,
              Wednesday,
              Thursday,
              Friday,
              Saturday,
              Sunday,
              TableData,
              SessionPriceList,
              AdultPrice,
              CalculationCode,
              PartyPriceList,
              UpdateURL,
              ClosedDates,
              PartyTimeslots: value,
              DefaultSlots,
            };
            const result = onChange(modelFields);
            value = result?.PartyTimeslots ?? value;
          }
          if (errors.PartyTimeslots?.hasError) {
            runValidationTasks("PartyTimeslots", value);
          }
          setPartyTimeslots(value);
        }}
        onBlur={() => runValidationTasks("PartyTimeslots", PartyTimeslots)}
        errorMessage={errors.PartyTimeslots?.errorMessage}
        hasError={errors.PartyTimeslots?.hasError}
        {...getOverrideProps(overrides, "PartyTimeslots")}
      ></TextAreaField>
      <TextAreaField
        label="Default slots"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Monday,
              Tuesday,
              Wednesday,
              Thursday,
              Friday,
              Saturday,
              Sunday,
              TableData,
              SessionPriceList,
              AdultPrice,
              CalculationCode,
              PartyPriceList,
              UpdateURL,
              ClosedDates,
              PartyTimeslots,
              DefaultSlots: value,
            };
            const result = onChange(modelFields);
            value = result?.DefaultSlots ?? value;
          }
          if (errors.DefaultSlots?.hasError) {
            runValidationTasks("DefaultSlots", value);
          }
          setDefaultSlots(value);
        }}
        onBlur={() => runValidationTasks("DefaultSlots", DefaultSlots)}
        errorMessage={errors.DefaultSlots?.errorMessage}
        hasError={errors.DefaultSlots?.hasError}
        {...getOverrideProps(overrides, "DefaultSlots")}
      ></TextAreaField>
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
