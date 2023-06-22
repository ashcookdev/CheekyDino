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
import { PartyGuests } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function PartyGuestsUpdateForm(props) {
  const {
    id: idProp,
    partyGuests: partyGuestsModelProp,
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
    FoodOption: "",
    Allergies: "",
    ContactInfoEmail: "",
    Arrived: "",
    SweetConeColour: "",
    TeddyTasticBear: "",
    Completed: false,
  };
  const [ChildName, setChildName] = React.useState(initialValues.ChildName);
  const [FoodOption, setFoodOption] = React.useState(initialValues.FoodOption);
  const [Allergies, setAllergies] = React.useState(initialValues.Allergies);
  const [ContactInfoEmail, setContactInfoEmail] = React.useState(
    initialValues.ContactInfoEmail
  );
  const [Arrived, setArrived] = React.useState(initialValues.Arrived);
  const [SweetConeColour, setSweetConeColour] = React.useState(
    initialValues.SweetConeColour
  );
  const [TeddyTasticBear, setTeddyTasticBear] = React.useState(
    initialValues.TeddyTasticBear
  );
  const [Completed, setCompleted] = React.useState(initialValues.Completed);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = partyGuestsRecord
      ? { ...initialValues, ...partyGuestsRecord }
      : initialValues;
    setChildName(cleanValues.ChildName);
    setFoodOption(cleanValues.FoodOption);
    setAllergies(cleanValues.Allergies);
    setContactInfoEmail(cleanValues.ContactInfoEmail);
    setArrived(cleanValues.Arrived);
    setSweetConeColour(cleanValues.SweetConeColour);
    setTeddyTasticBear(cleanValues.TeddyTasticBear);
    setCompleted(cleanValues.Completed);
    setErrors({});
  };
  const [partyGuestsRecord, setPartyGuestsRecord] =
    React.useState(partyGuestsModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(PartyGuests, idProp)
        : partyGuestsModelProp;
      setPartyGuestsRecord(record);
    };
    queryData();
  }, [idProp, partyGuestsModelProp]);
  React.useEffect(resetStateValues, [partyGuestsRecord]);
  const validations = {
    ChildName: [],
    FoodOption: [{ type: "Required" }],
    Allergies: [],
    ContactInfoEmail: [],
    Arrived: [],
    SweetConeColour: [],
    TeddyTasticBear: [],
    Completed: [],
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
          FoodOption,
          Allergies,
          ContactInfoEmail,
          Arrived,
          SweetConeColour,
          TeddyTasticBear,
          Completed,
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
            PartyGuests.copyOf(partyGuestsRecord, (updated) => {
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
      {...getOverrideProps(overrides, "PartyGuestsUpdateForm")}
      {...rest}
    >
      <TextField
        label="Child name"
        isRequired={false}
        isReadOnly={false}
        value={ChildName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ChildName: value,
              FoodOption,
              Allergies,
              ContactInfoEmail,
              Arrived,
              SweetConeColour,
              TeddyTasticBear,
              Completed,
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
        label="Food option"
        isRequired={true}
        isReadOnly={false}
        value={FoodOption}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ChildName,
              FoodOption: value,
              Allergies,
              ContactInfoEmail,
              Arrived,
              SweetConeColour,
              TeddyTasticBear,
              Completed,
            };
            const result = onChange(modelFields);
            value = result?.FoodOption ?? value;
          }
          if (errors.FoodOption?.hasError) {
            runValidationTasks("FoodOption", value);
          }
          setFoodOption(value);
        }}
        onBlur={() => runValidationTasks("FoodOption", FoodOption)}
        errorMessage={errors.FoodOption?.errorMessage}
        hasError={errors.FoodOption?.hasError}
        {...getOverrideProps(overrides, "FoodOption")}
      ></TextField>
      <TextField
        label="Allergies"
        isRequired={false}
        isReadOnly={false}
        value={Allergies}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ChildName,
              FoodOption,
              Allergies: value,
              ContactInfoEmail,
              Arrived,
              SweetConeColour,
              TeddyTasticBear,
              Completed,
            };
            const result = onChange(modelFields);
            value = result?.Allergies ?? value;
          }
          if (errors.Allergies?.hasError) {
            runValidationTasks("Allergies", value);
          }
          setAllergies(value);
        }}
        onBlur={() => runValidationTasks("Allergies", Allergies)}
        errorMessage={errors.Allergies?.errorMessage}
        hasError={errors.Allergies?.hasError}
        {...getOverrideProps(overrides, "Allergies")}
      ></TextField>
      <TextField
        label="Contact info email"
        isRequired={false}
        isReadOnly={false}
        value={ContactInfoEmail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ChildName,
              FoodOption,
              Allergies,
              ContactInfoEmail: value,
              Arrived,
              SweetConeColour,
              TeddyTasticBear,
              Completed,
            };
            const result = onChange(modelFields);
            value = result?.ContactInfoEmail ?? value;
          }
          if (errors.ContactInfoEmail?.hasError) {
            runValidationTasks("ContactInfoEmail", value);
          }
          setContactInfoEmail(value);
        }}
        onBlur={() => runValidationTasks("ContactInfoEmail", ContactInfoEmail)}
        errorMessage={errors.ContactInfoEmail?.errorMessage}
        hasError={errors.ContactInfoEmail?.hasError}
        {...getOverrideProps(overrides, "ContactInfoEmail")}
      ></TextField>
      <TextField
        label="Arrived"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={Arrived}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ChildName,
              FoodOption,
              Allergies,
              ContactInfoEmail,
              Arrived: value,
              SweetConeColour,
              TeddyTasticBear,
              Completed,
            };
            const result = onChange(modelFields);
            value = result?.Arrived ?? value;
          }
          if (errors.Arrived?.hasError) {
            runValidationTasks("Arrived", value);
          }
          setArrived(value);
        }}
        onBlur={() => runValidationTasks("Arrived", Arrived)}
        errorMessage={errors.Arrived?.errorMessage}
        hasError={errors.Arrived?.hasError}
        {...getOverrideProps(overrides, "Arrived")}
      ></TextField>
      <TextField
        label="Sweet cone colour"
        isRequired={false}
        isReadOnly={false}
        value={SweetConeColour}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ChildName,
              FoodOption,
              Allergies,
              ContactInfoEmail,
              Arrived,
              SweetConeColour: value,
              TeddyTasticBear,
              Completed,
            };
            const result = onChange(modelFields);
            value = result?.SweetConeColour ?? value;
          }
          if (errors.SweetConeColour?.hasError) {
            runValidationTasks("SweetConeColour", value);
          }
          setSweetConeColour(value);
        }}
        onBlur={() => runValidationTasks("SweetConeColour", SweetConeColour)}
        errorMessage={errors.SweetConeColour?.errorMessage}
        hasError={errors.SweetConeColour?.hasError}
        {...getOverrideProps(overrides, "SweetConeColour")}
      ></TextField>
      <TextField
        label="Teddy tastic bear"
        isRequired={false}
        isReadOnly={false}
        value={TeddyTasticBear}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ChildName,
              FoodOption,
              Allergies,
              ContactInfoEmail,
              Arrived,
              SweetConeColour,
              TeddyTasticBear: value,
              Completed,
            };
            const result = onChange(modelFields);
            value = result?.TeddyTasticBear ?? value;
          }
          if (errors.TeddyTasticBear?.hasError) {
            runValidationTasks("TeddyTasticBear", value);
          }
          setTeddyTasticBear(value);
        }}
        onBlur={() => runValidationTasks("TeddyTasticBear", TeddyTasticBear)}
        errorMessage={errors.TeddyTasticBear?.errorMessage}
        hasError={errors.TeddyTasticBear?.hasError}
        {...getOverrideProps(overrides, "TeddyTasticBear")}
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
              ChildName,
              FoodOption,
              Allergies,
              ContactInfoEmail,
              Arrived,
              SweetConeColour,
              TeddyTasticBear,
              Completed: value,
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
          isDisabled={!(idProp || partyGuestsModelProp)}
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
              !(idProp || partyGuestsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
