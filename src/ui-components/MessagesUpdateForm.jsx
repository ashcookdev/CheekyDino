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
import { Messages } from "../models";
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
export default function MessagesUpdateForm(props) {
  const {
    id: idProp,
    messages: messagesModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    content: "",
    createdAt: "",
    email: "",
    group: [],
    orderID: "",
    sessionID: "",
    partyID: "",
    delivered: false,
    FoodReady: false,
    FoodDelivered: false,
  };
  const [content, setContent] = React.useState(initialValues.content);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [email, setEmail] = React.useState(initialValues.email);
  const [group, setGroup] = React.useState(initialValues.group);
  const [orderID, setOrderID] = React.useState(initialValues.orderID);
  const [sessionID, setSessionID] = React.useState(initialValues.sessionID);
  const [partyID, setPartyID] = React.useState(initialValues.partyID);
  const [delivered, setDelivered] = React.useState(initialValues.delivered);
  const [FoodReady, setFoodReady] = React.useState(initialValues.FoodReady);
  const [FoodDelivered, setFoodDelivered] = React.useState(
    initialValues.FoodDelivered
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = messagesRecord
      ? { ...initialValues, ...messagesRecord }
      : initialValues;
    setContent(cleanValues.content);
    setCreatedAt(cleanValues.createdAt);
    setEmail(cleanValues.email);
    setGroup(cleanValues.group ?? []);
    setCurrentGroupValue("");
    setOrderID(cleanValues.orderID);
    setSessionID(cleanValues.sessionID);
    setPartyID(cleanValues.partyID);
    setDelivered(cleanValues.delivered);
    setFoodReady(cleanValues.FoodReady);
    setFoodDelivered(cleanValues.FoodDelivered);
    setErrors({});
  };
  const [messagesRecord, setMessagesRecord] = React.useState(messagesModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Messages, idProp)
        : messagesModelProp;
      setMessagesRecord(record);
    };
    queryData();
  }, [idProp, messagesModelProp]);
  React.useEffect(resetStateValues, [messagesRecord]);
  const [currentGroupValue, setCurrentGroupValue] = React.useState("");
  const groupRef = React.createRef();
  const validations = {
    content: [],
    createdAt: [],
    email: [],
    group: [],
    orderID: [],
    sessionID: [],
    partyID: [],
    delivered: [],
    FoodReady: [],
    FoodDelivered: [],
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
          content,
          createdAt,
          email,
          group,
          orderID,
          sessionID,
          partyID,
          delivered,
          FoodReady,
          FoodDelivered,
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
            Messages.copyOf(messagesRecord, (updated) => {
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
      {...getOverrideProps(overrides, "MessagesUpdateForm")}
      {...rest}
    >
      <TextField
        label="Content"
        isRequired={false}
        isReadOnly={false}
        value={content}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              content: value,
              createdAt,
              email,
              group,
              orderID,
              sessionID,
              partyID,
              delivered,
              FoodReady,
              FoodDelivered,
            };
            const result = onChange(modelFields);
            value = result?.content ?? value;
          }
          if (errors.content?.hasError) {
            runValidationTasks("content", value);
          }
          setContent(value);
        }}
        onBlur={() => runValidationTasks("content", content)}
        errorMessage={errors.content?.errorMessage}
        hasError={errors.content?.hasError}
        {...getOverrideProps(overrides, "content")}
      ></TextField>
      <TextField
        label="Created at"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={createdAt}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              content,
              createdAt: value,
              email,
              group,
              orderID,
              sessionID,
              partyID,
              delivered,
              FoodReady,
              FoodDelivered,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              content,
              createdAt,
              email: value,
              group,
              orderID,
              sessionID,
              partyID,
              delivered,
              FoodReady,
              FoodDelivered,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              content,
              createdAt,
              email,
              group: values,
              orderID,
              sessionID,
              partyID,
              delivered,
              FoodReady,
              FoodDelivered,
            };
            const result = onChange(modelFields);
            values = result?.group ?? values;
          }
          setGroup(values);
          setCurrentGroupValue("");
        }}
        currentFieldValue={currentGroupValue}
        label={"Group"}
        items={group}
        hasError={errors?.group?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("group", currentGroupValue)
        }
        errorMessage={errors?.group?.errorMessage}
        setFieldValue={setCurrentGroupValue}
        inputFieldRef={groupRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Group"
          isRequired={false}
          isReadOnly={false}
          value={currentGroupValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.group?.hasError) {
              runValidationTasks("group", value);
            }
            setCurrentGroupValue(value);
          }}
          onBlur={() => runValidationTasks("group", currentGroupValue)}
          errorMessage={errors.group?.errorMessage}
          hasError={errors.group?.hasError}
          ref={groupRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "group")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Order id"
        isRequired={false}
        isReadOnly={false}
        value={orderID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              content,
              createdAt,
              email,
              group,
              orderID: value,
              sessionID,
              partyID,
              delivered,
              FoodReady,
              FoodDelivered,
            };
            const result = onChange(modelFields);
            value = result?.orderID ?? value;
          }
          if (errors.orderID?.hasError) {
            runValidationTasks("orderID", value);
          }
          setOrderID(value);
        }}
        onBlur={() => runValidationTasks("orderID", orderID)}
        errorMessage={errors.orderID?.errorMessage}
        hasError={errors.orderID?.hasError}
        {...getOverrideProps(overrides, "orderID")}
      ></TextField>
      <TextField
        label="Session id"
        isRequired={false}
        isReadOnly={false}
        value={sessionID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              content,
              createdAt,
              email,
              group,
              orderID,
              sessionID: value,
              partyID,
              delivered,
              FoodReady,
              FoodDelivered,
            };
            const result = onChange(modelFields);
            value = result?.sessionID ?? value;
          }
          if (errors.sessionID?.hasError) {
            runValidationTasks("sessionID", value);
          }
          setSessionID(value);
        }}
        onBlur={() => runValidationTasks("sessionID", sessionID)}
        errorMessage={errors.sessionID?.errorMessage}
        hasError={errors.sessionID?.hasError}
        {...getOverrideProps(overrides, "sessionID")}
      ></TextField>
      <TextField
        label="Party id"
        isRequired={false}
        isReadOnly={false}
        value={partyID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              content,
              createdAt,
              email,
              group,
              orderID,
              sessionID,
              partyID: value,
              delivered,
              FoodReady,
              FoodDelivered,
            };
            const result = onChange(modelFields);
            value = result?.partyID ?? value;
          }
          if (errors.partyID?.hasError) {
            runValidationTasks("partyID", value);
          }
          setPartyID(value);
        }}
        onBlur={() => runValidationTasks("partyID", partyID)}
        errorMessage={errors.partyID?.errorMessage}
        hasError={errors.partyID?.hasError}
        {...getOverrideProps(overrides, "partyID")}
      ></TextField>
      <SwitchField
        label="Delivered"
        defaultChecked={false}
        isDisabled={false}
        isChecked={delivered}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              content,
              createdAt,
              email,
              group,
              orderID,
              sessionID,
              partyID,
              delivered: value,
              FoodReady,
              FoodDelivered,
            };
            const result = onChange(modelFields);
            value = result?.delivered ?? value;
          }
          if (errors.delivered?.hasError) {
            runValidationTasks("delivered", value);
          }
          setDelivered(value);
        }}
        onBlur={() => runValidationTasks("delivered", delivered)}
        errorMessage={errors.delivered?.errorMessage}
        hasError={errors.delivered?.hasError}
        {...getOverrideProps(overrides, "delivered")}
      ></SwitchField>
      <SwitchField
        label="Food ready"
        defaultChecked={false}
        isDisabled={false}
        isChecked={FoodReady}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              content,
              createdAt,
              email,
              group,
              orderID,
              sessionID,
              partyID,
              delivered,
              FoodReady: value,
              FoodDelivered,
            };
            const result = onChange(modelFields);
            value = result?.FoodReady ?? value;
          }
          if (errors.FoodReady?.hasError) {
            runValidationTasks("FoodReady", value);
          }
          setFoodReady(value);
        }}
        onBlur={() => runValidationTasks("FoodReady", FoodReady)}
        errorMessage={errors.FoodReady?.errorMessage}
        hasError={errors.FoodReady?.hasError}
        {...getOverrideProps(overrides, "FoodReady")}
      ></SwitchField>
      <SwitchField
        label="Food delivered"
        defaultChecked={false}
        isDisabled={false}
        isChecked={FoodDelivered}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              content,
              createdAt,
              email,
              group,
              orderID,
              sessionID,
              partyID,
              delivered,
              FoodReady,
              FoodDelivered: value,
            };
            const result = onChange(modelFields);
            value = result?.FoodDelivered ?? value;
          }
          if (errors.FoodDelivered?.hasError) {
            runValidationTasks("FoodDelivered", value);
          }
          setFoodDelivered(value);
        }}
        onBlur={() => runValidationTasks("FoodDelivered", FoodDelivered)}
        errorMessage={errors.FoodDelivered?.errorMessage}
        hasError={errors.FoodDelivered?.hasError}
        {...getOverrideProps(overrides, "FoodDelivered")}
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
          isDisabled={!(idProp || messagesModelProp)}
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
              !(idProp || messagesModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
