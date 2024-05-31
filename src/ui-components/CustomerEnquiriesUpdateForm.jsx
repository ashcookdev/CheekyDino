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
import { CustomerEnquiries } from "../models";
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
export default function CustomerEnquiriesUpdateForm(props) {
  const {
    id: idProp,
    customerEnquiries: customerEnquiriesModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    To: "",
    Content: "",
    Replied: false,
    From: "",
    Marketing: false,
    ToMarketing: [],
  };
  const [To, setTo] = React.useState(initialValues.To);
  const [Content, setContent] = React.useState(initialValues.Content);
  const [Replied, setReplied] = React.useState(initialValues.Replied);
  const [From, setFrom] = React.useState(initialValues.From);
  const [Marketing, setMarketing] = React.useState(initialValues.Marketing);
  const [ToMarketing, setToMarketing] = React.useState(
    initialValues.ToMarketing
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = customerEnquiriesRecord
      ? { ...initialValues, ...customerEnquiriesRecord }
      : initialValues;
    setTo(cleanValues.To);
    setContent(cleanValues.Content);
    setReplied(cleanValues.Replied);
    setFrom(cleanValues.From);
    setMarketing(cleanValues.Marketing);
    setToMarketing(cleanValues.ToMarketing ?? []);
    setCurrentToMarketingValue("");
    setErrors({});
  };
  const [customerEnquiriesRecord, setCustomerEnquiriesRecord] = React.useState(
    customerEnquiriesModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(CustomerEnquiries, idProp)
        : customerEnquiriesModelProp;
      setCustomerEnquiriesRecord(record);
    };
    queryData();
  }, [idProp, customerEnquiriesModelProp]);
  React.useEffect(resetStateValues, [customerEnquiriesRecord]);
  const [currentToMarketingValue, setCurrentToMarketingValue] =
    React.useState("");
  const ToMarketingRef = React.createRef();
  const validations = {
    To: [],
    Content: [],
    Replied: [],
    From: [],
    Marketing: [],
    ToMarketing: [],
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
          To,
          Content,
          Replied,
          From,
          Marketing,
          ToMarketing,
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
            CustomerEnquiries.copyOf(customerEnquiriesRecord, (updated) => {
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
      {...getOverrideProps(overrides, "CustomerEnquiriesUpdateForm")}
      {...rest}
    >
      <TextField
        label="To"
        isRequired={false}
        isReadOnly={false}
        value={To}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              To: value,
              Content,
              Replied,
              From,
              Marketing,
              ToMarketing,
            };
            const result = onChange(modelFields);
            value = result?.To ?? value;
          }
          if (errors.To?.hasError) {
            runValidationTasks("To", value);
          }
          setTo(value);
        }}
        onBlur={() => runValidationTasks("To", To)}
        errorMessage={errors.To?.errorMessage}
        hasError={errors.To?.hasError}
        {...getOverrideProps(overrides, "To")}
      ></TextField>
      <TextField
        label="Content"
        isRequired={false}
        isReadOnly={false}
        value={Content}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              To,
              Content: value,
              Replied,
              From,
              Marketing,
              ToMarketing,
            };
            const result = onChange(modelFields);
            value = result?.Content ?? value;
          }
          if (errors.Content?.hasError) {
            runValidationTasks("Content", value);
          }
          setContent(value);
        }}
        onBlur={() => runValidationTasks("Content", Content)}
        errorMessage={errors.Content?.errorMessage}
        hasError={errors.Content?.hasError}
        {...getOverrideProps(overrides, "Content")}
      ></TextField>
      <SwitchField
        label="Replied"
        defaultChecked={false}
        isDisabled={false}
        isChecked={Replied}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              To,
              Content,
              Replied: value,
              From,
              Marketing,
              ToMarketing,
            };
            const result = onChange(modelFields);
            value = result?.Replied ?? value;
          }
          if (errors.Replied?.hasError) {
            runValidationTasks("Replied", value);
          }
          setReplied(value);
        }}
        onBlur={() => runValidationTasks("Replied", Replied)}
        errorMessage={errors.Replied?.errorMessage}
        hasError={errors.Replied?.hasError}
        {...getOverrideProps(overrides, "Replied")}
      ></SwitchField>
      <TextField
        label="From"
        isRequired={false}
        isReadOnly={false}
        value={From}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              To,
              Content,
              Replied,
              From: value,
              Marketing,
              ToMarketing,
            };
            const result = onChange(modelFields);
            value = result?.From ?? value;
          }
          if (errors.From?.hasError) {
            runValidationTasks("From", value);
          }
          setFrom(value);
        }}
        onBlur={() => runValidationTasks("From", From)}
        errorMessage={errors.From?.errorMessage}
        hasError={errors.From?.hasError}
        {...getOverrideProps(overrides, "From")}
      ></TextField>
      <SwitchField
        label="Marketing"
        defaultChecked={false}
        isDisabled={false}
        isChecked={Marketing}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              To,
              Content,
              Replied,
              From,
              Marketing: value,
              ToMarketing,
            };
            const result = onChange(modelFields);
            value = result?.Marketing ?? value;
          }
          if (errors.Marketing?.hasError) {
            runValidationTasks("Marketing", value);
          }
          setMarketing(value);
        }}
        onBlur={() => runValidationTasks("Marketing", Marketing)}
        errorMessage={errors.Marketing?.errorMessage}
        hasError={errors.Marketing?.hasError}
        {...getOverrideProps(overrides, "Marketing")}
      ></SwitchField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              To,
              Content,
              Replied,
              From,
              Marketing,
              ToMarketing: values,
            };
            const result = onChange(modelFields);
            values = result?.ToMarketing ?? values;
          }
          setToMarketing(values);
          setCurrentToMarketingValue("");
        }}
        currentFieldValue={currentToMarketingValue}
        label={"To marketing"}
        items={ToMarketing}
        hasError={errors?.ToMarketing?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("ToMarketing", currentToMarketingValue)
        }
        errorMessage={errors?.ToMarketing?.errorMessage}
        setFieldValue={setCurrentToMarketingValue}
        inputFieldRef={ToMarketingRef}
        defaultFieldValue={""}
      >
        <TextField
          label="To marketing"
          isRequired={false}
          isReadOnly={false}
          value={currentToMarketingValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.ToMarketing?.hasError) {
              runValidationTasks("ToMarketing", value);
            }
            setCurrentToMarketingValue(value);
          }}
          onBlur={() =>
            runValidationTasks("ToMarketing", currentToMarketingValue)
          }
          errorMessage={errors.ToMarketing?.errorMessage}
          hasError={errors.ToMarketing?.hasError}
          ref={ToMarketingRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "ToMarketing")}
        ></TextField>
      </ArrayField>
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
          isDisabled={!(idProp || customerEnquiriesModelProp)}
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
              !(idProp || customerEnquiriesModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
