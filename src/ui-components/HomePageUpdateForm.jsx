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
import { HomePage } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function HomePageUpdateForm(props) {
  const {
    id: idProp,
    homePage: homePageModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    TopSectionTitle: "",
    TopSectionPic: "",
    TopSectionWriting: "",
    EventTitle: "",
    EventPic: "",
    EventWriting: "",
    EventTwoTitle: "",
    EventTwoPic: "",
    EventTwoWriting: "",
    EventThreeTitle: "",
    EventThreePic: "",
    EventThreeWriting: "",
    EventOneButton: false,
    EventTwoButton: false,
    EventThreeButton: false,
  };
  const [TopSectionTitle, setTopSectionTitle] = React.useState(
    initialValues.TopSectionTitle
  );
  const [TopSectionPic, setTopSectionPic] = React.useState(
    initialValues.TopSectionPic
  );
  const [TopSectionWriting, setTopSectionWriting] = React.useState(
    initialValues.TopSectionWriting
  );
  const [EventTitle, setEventTitle] = React.useState(initialValues.EventTitle);
  const [EventPic, setEventPic] = React.useState(initialValues.EventPic);
  const [EventWriting, setEventWriting] = React.useState(
    initialValues.EventWriting
  );
  const [EventTwoTitle, setEventTwoTitle] = React.useState(
    initialValues.EventTwoTitle
  );
  const [EventTwoPic, setEventTwoPic] = React.useState(
    initialValues.EventTwoPic
  );
  const [EventTwoWriting, setEventTwoWriting] = React.useState(
    initialValues.EventTwoWriting
  );
  const [EventThreeTitle, setEventThreeTitle] = React.useState(
    initialValues.EventThreeTitle
  );
  const [EventThreePic, setEventThreePic] = React.useState(
    initialValues.EventThreePic
  );
  const [EventThreeWriting, setEventThreeWriting] = React.useState(
    initialValues.EventThreeWriting
  );
  const [EventOneButton, setEventOneButton] = React.useState(
    initialValues.EventOneButton
  );
  const [EventTwoButton, setEventTwoButton] = React.useState(
    initialValues.EventTwoButton
  );
  const [EventThreeButton, setEventThreeButton] = React.useState(
    initialValues.EventThreeButton
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = homePageRecord
      ? { ...initialValues, ...homePageRecord }
      : initialValues;
    setTopSectionTitle(cleanValues.TopSectionTitle);
    setTopSectionPic(cleanValues.TopSectionPic);
    setTopSectionWriting(cleanValues.TopSectionWriting);
    setEventTitle(cleanValues.EventTitle);
    setEventPic(cleanValues.EventPic);
    setEventWriting(cleanValues.EventWriting);
    setEventTwoTitle(cleanValues.EventTwoTitle);
    setEventTwoPic(cleanValues.EventTwoPic);
    setEventTwoWriting(cleanValues.EventTwoWriting);
    setEventThreeTitle(cleanValues.EventThreeTitle);
    setEventThreePic(cleanValues.EventThreePic);
    setEventThreeWriting(cleanValues.EventThreeWriting);
    setEventOneButton(cleanValues.EventOneButton);
    setEventTwoButton(cleanValues.EventTwoButton);
    setEventThreeButton(cleanValues.EventThreeButton);
    setErrors({});
  };
  const [homePageRecord, setHomePageRecord] = React.useState(homePageModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(HomePage, idProp)
        : homePageModelProp;
      setHomePageRecord(record);
    };
    queryData();
  }, [idProp, homePageModelProp]);
  React.useEffect(resetStateValues, [homePageRecord]);
  const validations = {
    TopSectionTitle: [],
    TopSectionPic: [],
    TopSectionWriting: [],
    EventTitle: [],
    EventPic: [],
    EventWriting: [],
    EventTwoTitle: [],
    EventTwoPic: [],
    EventTwoWriting: [],
    EventThreeTitle: [],
    EventThreePic: [],
    EventThreeWriting: [],
    EventOneButton: [],
    EventTwoButton: [],
    EventThreeButton: [],
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
          TopSectionTitle,
          TopSectionPic,
          TopSectionWriting,
          EventTitle,
          EventPic,
          EventWriting,
          EventTwoTitle,
          EventTwoPic,
          EventTwoWriting,
          EventThreeTitle,
          EventThreePic,
          EventThreeWriting,
          EventOneButton,
          EventTwoButton,
          EventThreeButton,
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
            HomePage.copyOf(homePageRecord, (updated) => {
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
      {...getOverrideProps(overrides, "HomePageUpdateForm")}
      {...rest}
    >
      <TextField
        label="Top section title"
        isRequired={false}
        isReadOnly={false}
        value={TopSectionTitle}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              TopSectionTitle: value,
              TopSectionPic,
              TopSectionWriting,
              EventTitle,
              EventPic,
              EventWriting,
              EventTwoTitle,
              EventTwoPic,
              EventTwoWriting,
              EventThreeTitle,
              EventThreePic,
              EventThreeWriting,
              EventOneButton,
              EventTwoButton,
              EventThreeButton,
            };
            const result = onChange(modelFields);
            value = result?.TopSectionTitle ?? value;
          }
          if (errors.TopSectionTitle?.hasError) {
            runValidationTasks("TopSectionTitle", value);
          }
          setTopSectionTitle(value);
        }}
        onBlur={() => runValidationTasks("TopSectionTitle", TopSectionTitle)}
        errorMessage={errors.TopSectionTitle?.errorMessage}
        hasError={errors.TopSectionTitle?.hasError}
        {...getOverrideProps(overrides, "TopSectionTitle")}
      ></TextField>
      <TextField
        label="Top section pic"
        isRequired={false}
        isReadOnly={false}
        value={TopSectionPic}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              TopSectionTitle,
              TopSectionPic: value,
              TopSectionWriting,
              EventTitle,
              EventPic,
              EventWriting,
              EventTwoTitle,
              EventTwoPic,
              EventTwoWriting,
              EventThreeTitle,
              EventThreePic,
              EventThreeWriting,
              EventOneButton,
              EventTwoButton,
              EventThreeButton,
            };
            const result = onChange(modelFields);
            value = result?.TopSectionPic ?? value;
          }
          if (errors.TopSectionPic?.hasError) {
            runValidationTasks("TopSectionPic", value);
          }
          setTopSectionPic(value);
        }}
        onBlur={() => runValidationTasks("TopSectionPic", TopSectionPic)}
        errorMessage={errors.TopSectionPic?.errorMessage}
        hasError={errors.TopSectionPic?.hasError}
        {...getOverrideProps(overrides, "TopSectionPic")}
      ></TextField>
      <TextField
        label="Top section writing"
        isRequired={false}
        isReadOnly={false}
        value={TopSectionWriting}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              TopSectionTitle,
              TopSectionPic,
              TopSectionWriting: value,
              EventTitle,
              EventPic,
              EventWriting,
              EventTwoTitle,
              EventTwoPic,
              EventTwoWriting,
              EventThreeTitle,
              EventThreePic,
              EventThreeWriting,
              EventOneButton,
              EventTwoButton,
              EventThreeButton,
            };
            const result = onChange(modelFields);
            value = result?.TopSectionWriting ?? value;
          }
          if (errors.TopSectionWriting?.hasError) {
            runValidationTasks("TopSectionWriting", value);
          }
          setTopSectionWriting(value);
        }}
        onBlur={() =>
          runValidationTasks("TopSectionWriting", TopSectionWriting)
        }
        errorMessage={errors.TopSectionWriting?.errorMessage}
        hasError={errors.TopSectionWriting?.hasError}
        {...getOverrideProps(overrides, "TopSectionWriting")}
      ></TextField>
      <TextField
        label="Event title"
        isRequired={false}
        isReadOnly={false}
        value={EventTitle}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              TopSectionTitle,
              TopSectionPic,
              TopSectionWriting,
              EventTitle: value,
              EventPic,
              EventWriting,
              EventTwoTitle,
              EventTwoPic,
              EventTwoWriting,
              EventThreeTitle,
              EventThreePic,
              EventThreeWriting,
              EventOneButton,
              EventTwoButton,
              EventThreeButton,
            };
            const result = onChange(modelFields);
            value = result?.EventTitle ?? value;
          }
          if (errors.EventTitle?.hasError) {
            runValidationTasks("EventTitle", value);
          }
          setEventTitle(value);
        }}
        onBlur={() => runValidationTasks("EventTitle", EventTitle)}
        errorMessage={errors.EventTitle?.errorMessage}
        hasError={errors.EventTitle?.hasError}
        {...getOverrideProps(overrides, "EventTitle")}
      ></TextField>
      <TextField
        label="Event pic"
        isRequired={false}
        isReadOnly={false}
        value={EventPic}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              TopSectionTitle,
              TopSectionPic,
              TopSectionWriting,
              EventTitle,
              EventPic: value,
              EventWriting,
              EventTwoTitle,
              EventTwoPic,
              EventTwoWriting,
              EventThreeTitle,
              EventThreePic,
              EventThreeWriting,
              EventOneButton,
              EventTwoButton,
              EventThreeButton,
            };
            const result = onChange(modelFields);
            value = result?.EventPic ?? value;
          }
          if (errors.EventPic?.hasError) {
            runValidationTasks("EventPic", value);
          }
          setEventPic(value);
        }}
        onBlur={() => runValidationTasks("EventPic", EventPic)}
        errorMessage={errors.EventPic?.errorMessage}
        hasError={errors.EventPic?.hasError}
        {...getOverrideProps(overrides, "EventPic")}
      ></TextField>
      <TextField
        label="Event writing"
        isRequired={false}
        isReadOnly={false}
        value={EventWriting}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              TopSectionTitle,
              TopSectionPic,
              TopSectionWriting,
              EventTitle,
              EventPic,
              EventWriting: value,
              EventTwoTitle,
              EventTwoPic,
              EventTwoWriting,
              EventThreeTitle,
              EventThreePic,
              EventThreeWriting,
              EventOneButton,
              EventTwoButton,
              EventThreeButton,
            };
            const result = onChange(modelFields);
            value = result?.EventWriting ?? value;
          }
          if (errors.EventWriting?.hasError) {
            runValidationTasks("EventWriting", value);
          }
          setEventWriting(value);
        }}
        onBlur={() => runValidationTasks("EventWriting", EventWriting)}
        errorMessage={errors.EventWriting?.errorMessage}
        hasError={errors.EventWriting?.hasError}
        {...getOverrideProps(overrides, "EventWriting")}
      ></TextField>
      <TextField
        label="Event two title"
        isRequired={false}
        isReadOnly={false}
        value={EventTwoTitle}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              TopSectionTitle,
              TopSectionPic,
              TopSectionWriting,
              EventTitle,
              EventPic,
              EventWriting,
              EventTwoTitle: value,
              EventTwoPic,
              EventTwoWriting,
              EventThreeTitle,
              EventThreePic,
              EventThreeWriting,
              EventOneButton,
              EventTwoButton,
              EventThreeButton,
            };
            const result = onChange(modelFields);
            value = result?.EventTwoTitle ?? value;
          }
          if (errors.EventTwoTitle?.hasError) {
            runValidationTasks("EventTwoTitle", value);
          }
          setEventTwoTitle(value);
        }}
        onBlur={() => runValidationTasks("EventTwoTitle", EventTwoTitle)}
        errorMessage={errors.EventTwoTitle?.errorMessage}
        hasError={errors.EventTwoTitle?.hasError}
        {...getOverrideProps(overrides, "EventTwoTitle")}
      ></TextField>
      <TextField
        label="Event two pic"
        isRequired={false}
        isReadOnly={false}
        value={EventTwoPic}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              TopSectionTitle,
              TopSectionPic,
              TopSectionWriting,
              EventTitle,
              EventPic,
              EventWriting,
              EventTwoTitle,
              EventTwoPic: value,
              EventTwoWriting,
              EventThreeTitle,
              EventThreePic,
              EventThreeWriting,
              EventOneButton,
              EventTwoButton,
              EventThreeButton,
            };
            const result = onChange(modelFields);
            value = result?.EventTwoPic ?? value;
          }
          if (errors.EventTwoPic?.hasError) {
            runValidationTasks("EventTwoPic", value);
          }
          setEventTwoPic(value);
        }}
        onBlur={() => runValidationTasks("EventTwoPic", EventTwoPic)}
        errorMessage={errors.EventTwoPic?.errorMessage}
        hasError={errors.EventTwoPic?.hasError}
        {...getOverrideProps(overrides, "EventTwoPic")}
      ></TextField>
      <TextField
        label="Event two writing"
        isRequired={false}
        isReadOnly={false}
        value={EventTwoWriting}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              TopSectionTitle,
              TopSectionPic,
              TopSectionWriting,
              EventTitle,
              EventPic,
              EventWriting,
              EventTwoTitle,
              EventTwoPic,
              EventTwoWriting: value,
              EventThreeTitle,
              EventThreePic,
              EventThreeWriting,
              EventOneButton,
              EventTwoButton,
              EventThreeButton,
            };
            const result = onChange(modelFields);
            value = result?.EventTwoWriting ?? value;
          }
          if (errors.EventTwoWriting?.hasError) {
            runValidationTasks("EventTwoWriting", value);
          }
          setEventTwoWriting(value);
        }}
        onBlur={() => runValidationTasks("EventTwoWriting", EventTwoWriting)}
        errorMessage={errors.EventTwoWriting?.errorMessage}
        hasError={errors.EventTwoWriting?.hasError}
        {...getOverrideProps(overrides, "EventTwoWriting")}
      ></TextField>
      <TextField
        label="Event three title"
        isRequired={false}
        isReadOnly={false}
        value={EventThreeTitle}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              TopSectionTitle,
              TopSectionPic,
              TopSectionWriting,
              EventTitle,
              EventPic,
              EventWriting,
              EventTwoTitle,
              EventTwoPic,
              EventTwoWriting,
              EventThreeTitle: value,
              EventThreePic,
              EventThreeWriting,
              EventOneButton,
              EventTwoButton,
              EventThreeButton,
            };
            const result = onChange(modelFields);
            value = result?.EventThreeTitle ?? value;
          }
          if (errors.EventThreeTitle?.hasError) {
            runValidationTasks("EventThreeTitle", value);
          }
          setEventThreeTitle(value);
        }}
        onBlur={() => runValidationTasks("EventThreeTitle", EventThreeTitle)}
        errorMessage={errors.EventThreeTitle?.errorMessage}
        hasError={errors.EventThreeTitle?.hasError}
        {...getOverrideProps(overrides, "EventThreeTitle")}
      ></TextField>
      <TextField
        label="Event three pic"
        isRequired={false}
        isReadOnly={false}
        value={EventThreePic}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              TopSectionTitle,
              TopSectionPic,
              TopSectionWriting,
              EventTitle,
              EventPic,
              EventWriting,
              EventTwoTitle,
              EventTwoPic,
              EventTwoWriting,
              EventThreeTitle,
              EventThreePic: value,
              EventThreeWriting,
              EventOneButton,
              EventTwoButton,
              EventThreeButton,
            };
            const result = onChange(modelFields);
            value = result?.EventThreePic ?? value;
          }
          if (errors.EventThreePic?.hasError) {
            runValidationTasks("EventThreePic", value);
          }
          setEventThreePic(value);
        }}
        onBlur={() => runValidationTasks("EventThreePic", EventThreePic)}
        errorMessage={errors.EventThreePic?.errorMessage}
        hasError={errors.EventThreePic?.hasError}
        {...getOverrideProps(overrides, "EventThreePic")}
      ></TextField>
      <TextField
        label="Event three writing"
        isRequired={false}
        isReadOnly={false}
        value={EventThreeWriting}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              TopSectionTitle,
              TopSectionPic,
              TopSectionWriting,
              EventTitle,
              EventPic,
              EventWriting,
              EventTwoTitle,
              EventTwoPic,
              EventTwoWriting,
              EventThreeTitle,
              EventThreePic,
              EventThreeWriting: value,
              EventOneButton,
              EventTwoButton,
              EventThreeButton,
            };
            const result = onChange(modelFields);
            value = result?.EventThreeWriting ?? value;
          }
          if (errors.EventThreeWriting?.hasError) {
            runValidationTasks("EventThreeWriting", value);
          }
          setEventThreeWriting(value);
        }}
        onBlur={() =>
          runValidationTasks("EventThreeWriting", EventThreeWriting)
        }
        errorMessage={errors.EventThreeWriting?.errorMessage}
        hasError={errors.EventThreeWriting?.hasError}
        {...getOverrideProps(overrides, "EventThreeWriting")}
      ></TextField>
      <SwitchField
        label="Event one button"
        defaultChecked={false}
        isDisabled={false}
        isChecked={EventOneButton}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              TopSectionTitle,
              TopSectionPic,
              TopSectionWriting,
              EventTitle,
              EventPic,
              EventWriting,
              EventTwoTitle,
              EventTwoPic,
              EventTwoWriting,
              EventThreeTitle,
              EventThreePic,
              EventThreeWriting,
              EventOneButton: value,
              EventTwoButton,
              EventThreeButton,
            };
            const result = onChange(modelFields);
            value = result?.EventOneButton ?? value;
          }
          if (errors.EventOneButton?.hasError) {
            runValidationTasks("EventOneButton", value);
          }
          setEventOneButton(value);
        }}
        onBlur={() => runValidationTasks("EventOneButton", EventOneButton)}
        errorMessage={errors.EventOneButton?.errorMessage}
        hasError={errors.EventOneButton?.hasError}
        {...getOverrideProps(overrides, "EventOneButton")}
      ></SwitchField>
      <SwitchField
        label="Event two button"
        defaultChecked={false}
        isDisabled={false}
        isChecked={EventTwoButton}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              TopSectionTitle,
              TopSectionPic,
              TopSectionWriting,
              EventTitle,
              EventPic,
              EventWriting,
              EventTwoTitle,
              EventTwoPic,
              EventTwoWriting,
              EventThreeTitle,
              EventThreePic,
              EventThreeWriting,
              EventOneButton,
              EventTwoButton: value,
              EventThreeButton,
            };
            const result = onChange(modelFields);
            value = result?.EventTwoButton ?? value;
          }
          if (errors.EventTwoButton?.hasError) {
            runValidationTasks("EventTwoButton", value);
          }
          setEventTwoButton(value);
        }}
        onBlur={() => runValidationTasks("EventTwoButton", EventTwoButton)}
        errorMessage={errors.EventTwoButton?.errorMessage}
        hasError={errors.EventTwoButton?.hasError}
        {...getOverrideProps(overrides, "EventTwoButton")}
      ></SwitchField>
      <SwitchField
        label="Event three button"
        defaultChecked={false}
        isDisabled={false}
        isChecked={EventThreeButton}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              TopSectionTitle,
              TopSectionPic,
              TopSectionWriting,
              EventTitle,
              EventPic,
              EventWriting,
              EventTwoTitle,
              EventTwoPic,
              EventTwoWriting,
              EventThreeTitle,
              EventThreePic,
              EventThreeWriting,
              EventOneButton,
              EventTwoButton,
              EventThreeButton: value,
            };
            const result = onChange(modelFields);
            value = result?.EventThreeButton ?? value;
          }
          if (errors.EventThreeButton?.hasError) {
            runValidationTasks("EventThreeButton", value);
          }
          setEventThreeButton(value);
        }}
        onBlur={() => runValidationTasks("EventThreeButton", EventThreeButton)}
        errorMessage={errors.EventThreeButton?.errorMessage}
        hasError={errors.EventThreeButton?.hasError}
        {...getOverrideProps(overrides, "EventThreeButton")}
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
          isDisabled={!(idProp || homePageModelProp)}
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
              !(idProp || homePageModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
