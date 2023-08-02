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
import { KidsMenu } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function KidsMenuUpdateForm(props) {
  const {
    id: idProp,
    kidsMenu: kidsMenuModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Name: "",
    Price: "",
    Description: "",
    Beans: false,
    Notes: "",
    Kitchen: false,
    imageSrc: "",
  };
  const [Name, setName] = React.useState(initialValues.Name);
  const [Price, setPrice] = React.useState(initialValues.Price);
  const [Description, setDescription] = React.useState(
    initialValues.Description
  );
  const [Beans, setBeans] = React.useState(initialValues.Beans);
  const [Notes, setNotes] = React.useState(initialValues.Notes);
  const [Kitchen, setKitchen] = React.useState(initialValues.Kitchen);
  const [imageSrc, setImageSrc] = React.useState(initialValues.imageSrc);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = kidsMenuRecord
      ? { ...initialValues, ...kidsMenuRecord }
      : initialValues;
    setName(cleanValues.Name);
    setPrice(cleanValues.Price);
    setDescription(cleanValues.Description);
    setBeans(cleanValues.Beans);
    setNotes(cleanValues.Notes);
    setKitchen(cleanValues.Kitchen);
    setImageSrc(cleanValues.imageSrc);
    setErrors({});
  };
  const [kidsMenuRecord, setKidsMenuRecord] = React.useState(kidsMenuModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(KidsMenu, idProp)
        : kidsMenuModelProp;
      setKidsMenuRecord(record);
    };
    queryData();
  }, [idProp, kidsMenuModelProp]);
  React.useEffect(resetStateValues, [kidsMenuRecord]);
  const validations = {
    Name: [],
    Price: [],
    Description: [],
    Beans: [],
    Notes: [],
    Kitchen: [],
    imageSrc: [],
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
          Name,
          Price,
          Description,
          Beans,
          Notes,
          Kitchen,
          imageSrc,
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
            KidsMenu.copyOf(kidsMenuRecord, (updated) => {
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
      {...getOverrideProps(overrides, "KidsMenuUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={Name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name: value,
              Price,
              Description,
              Beans,
              Notes,
              Kitchen,
              imageSrc,
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
        label="Price"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Price}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Price: value,
              Description,
              Beans,
              Notes,
              Kitchen,
              imageSrc,
            };
            const result = onChange(modelFields);
            value = result?.Price ?? value;
          }
          if (errors.Price?.hasError) {
            runValidationTasks("Price", value);
          }
          setPrice(value);
        }}
        onBlur={() => runValidationTasks("Price", Price)}
        errorMessage={errors.Price?.errorMessage}
        hasError={errors.Price?.hasError}
        {...getOverrideProps(overrides, "Price")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={Description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Price,
              Description: value,
              Beans,
              Notes,
              Kitchen,
              imageSrc,
            };
            const result = onChange(modelFields);
            value = result?.Description ?? value;
          }
          if (errors.Description?.hasError) {
            runValidationTasks("Description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("Description", Description)}
        errorMessage={errors.Description?.errorMessage}
        hasError={errors.Description?.hasError}
        {...getOverrideProps(overrides, "Description")}
      ></TextField>
      <SwitchField
        label="Beans"
        defaultChecked={false}
        isDisabled={false}
        isChecked={Beans}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Name,
              Price,
              Description,
              Beans: value,
              Notes,
              Kitchen,
              imageSrc,
            };
            const result = onChange(modelFields);
            value = result?.Beans ?? value;
          }
          if (errors.Beans?.hasError) {
            runValidationTasks("Beans", value);
          }
          setBeans(value);
        }}
        onBlur={() => runValidationTasks("Beans", Beans)}
        errorMessage={errors.Beans?.errorMessage}
        hasError={errors.Beans?.hasError}
        {...getOverrideProps(overrides, "Beans")}
      ></SwitchField>
      <TextField
        label="Notes"
        isRequired={false}
        isReadOnly={false}
        value={Notes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Price,
              Description,
              Beans,
              Notes: value,
              Kitchen,
              imageSrc,
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
              Name,
              Price,
              Description,
              Beans,
              Notes,
              Kitchen: value,
              imageSrc,
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
      <TextField
        label="Image src"
        isRequired={false}
        isReadOnly={false}
        value={imageSrc}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Price,
              Description,
              Beans,
              Notes,
              Kitchen,
              imageSrc: value,
            };
            const result = onChange(modelFields);
            value = result?.imageSrc ?? value;
          }
          if (errors.imageSrc?.hasError) {
            runValidationTasks("imageSrc", value);
          }
          setImageSrc(value);
        }}
        onBlur={() => runValidationTasks("imageSrc", imageSrc)}
        errorMessage={errors.imageSrc?.errorMessage}
        hasError={errors.imageSrc?.hasError}
        {...getOverrideProps(overrides, "imageSrc")}
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
          isDisabled={!(idProp || kidsMenuModelProp)}
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
              !(idProp || kidsMenuModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
