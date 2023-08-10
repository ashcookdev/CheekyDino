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
import { Breakfast } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function BreakfastUpdateForm(props) {
  const {
    id: idProp,
    breakfast: breakfastModelProp,
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
    WhiteBread: false,
    BrownBread: false,
    Egg: "",
    Fried: false,
    Scrambled: false,
    Sausage: "",
    Bacon: "",
    HashBrown: "",
  };
  const [Name, setName] = React.useState(initialValues.Name);
  const [Price, setPrice] = React.useState(initialValues.Price);
  const [WhiteBread, setWhiteBread] = React.useState(initialValues.WhiteBread);
  const [BrownBread, setBrownBread] = React.useState(initialValues.BrownBread);
  const [Egg, setEgg] = React.useState(initialValues.Egg);
  const [Fried, setFried] = React.useState(initialValues.Fried);
  const [Scrambled, setScrambled] = React.useState(initialValues.Scrambled);
  const [Sausage, setSausage] = React.useState(initialValues.Sausage);
  const [Bacon, setBacon] = React.useState(initialValues.Bacon);
  const [HashBrown, setHashBrown] = React.useState(initialValues.HashBrown);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = breakfastRecord
      ? { ...initialValues, ...breakfastRecord }
      : initialValues;
    setName(cleanValues.Name);
    setPrice(cleanValues.Price);
    setWhiteBread(cleanValues.WhiteBread);
    setBrownBread(cleanValues.BrownBread);
    setEgg(cleanValues.Egg);
    setFried(cleanValues.Fried);
    setScrambled(cleanValues.Scrambled);
    setSausage(cleanValues.Sausage);
    setBacon(cleanValues.Bacon);
    setHashBrown(cleanValues.HashBrown);
    setErrors({});
  };
  const [breakfastRecord, setBreakfastRecord] =
    React.useState(breakfastModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Breakfast, idProp)
        : breakfastModelProp;
      setBreakfastRecord(record);
    };
    queryData();
  }, [idProp, breakfastModelProp]);
  React.useEffect(resetStateValues, [breakfastRecord]);
  const validations = {
    Name: [],
    Price: [],
    WhiteBread: [],
    BrownBread: [],
    Egg: [],
    Fried: [],
    Scrambled: [],
    Sausage: [],
    Bacon: [],
    HashBrown: [],
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
          WhiteBread,
          BrownBread,
          Egg,
          Fried,
          Scrambled,
          Sausage,
          Bacon,
          HashBrown,
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
            Breakfast.copyOf(breakfastRecord, (updated) => {
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
      {...getOverrideProps(overrides, "BreakfastUpdateForm")}
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
              WhiteBread,
              BrownBread,
              Egg,
              Fried,
              Scrambled,
              Sausage,
              Bacon,
              HashBrown,
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
              WhiteBread,
              BrownBread,
              Egg,
              Fried,
              Scrambled,
              Sausage,
              Bacon,
              HashBrown,
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
      <SwitchField
        label="White bread"
        defaultChecked={false}
        isDisabled={false}
        isChecked={WhiteBread}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Name,
              Price,
              WhiteBread: value,
              BrownBread,
              Egg,
              Fried,
              Scrambled,
              Sausage,
              Bacon,
              HashBrown,
            };
            const result = onChange(modelFields);
            value = result?.WhiteBread ?? value;
          }
          if (errors.WhiteBread?.hasError) {
            runValidationTasks("WhiteBread", value);
          }
          setWhiteBread(value);
        }}
        onBlur={() => runValidationTasks("WhiteBread", WhiteBread)}
        errorMessage={errors.WhiteBread?.errorMessage}
        hasError={errors.WhiteBread?.hasError}
        {...getOverrideProps(overrides, "WhiteBread")}
      ></SwitchField>
      <SwitchField
        label="Brown bread"
        defaultChecked={false}
        isDisabled={false}
        isChecked={BrownBread}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Name,
              Price,
              WhiteBread,
              BrownBread: value,
              Egg,
              Fried,
              Scrambled,
              Sausage,
              Bacon,
              HashBrown,
            };
            const result = onChange(modelFields);
            value = result?.BrownBread ?? value;
          }
          if (errors.BrownBread?.hasError) {
            runValidationTasks("BrownBread", value);
          }
          setBrownBread(value);
        }}
        onBlur={() => runValidationTasks("BrownBread", BrownBread)}
        errorMessage={errors.BrownBread?.errorMessage}
        hasError={errors.BrownBread?.hasError}
        {...getOverrideProps(overrides, "BrownBread")}
      ></SwitchField>
      <TextField
        label="Egg"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Egg}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Price,
              WhiteBread,
              BrownBread,
              Egg: value,
              Fried,
              Scrambled,
              Sausage,
              Bacon,
              HashBrown,
            };
            const result = onChange(modelFields);
            value = result?.Egg ?? value;
          }
          if (errors.Egg?.hasError) {
            runValidationTasks("Egg", value);
          }
          setEgg(value);
        }}
        onBlur={() => runValidationTasks("Egg", Egg)}
        errorMessage={errors.Egg?.errorMessage}
        hasError={errors.Egg?.hasError}
        {...getOverrideProps(overrides, "Egg")}
      ></TextField>
      <SwitchField
        label="Fried"
        defaultChecked={false}
        isDisabled={false}
        isChecked={Fried}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Name,
              Price,
              WhiteBread,
              BrownBread,
              Egg,
              Fried: value,
              Scrambled,
              Sausage,
              Bacon,
              HashBrown,
            };
            const result = onChange(modelFields);
            value = result?.Fried ?? value;
          }
          if (errors.Fried?.hasError) {
            runValidationTasks("Fried", value);
          }
          setFried(value);
        }}
        onBlur={() => runValidationTasks("Fried", Fried)}
        errorMessage={errors.Fried?.errorMessage}
        hasError={errors.Fried?.hasError}
        {...getOverrideProps(overrides, "Fried")}
      ></SwitchField>
      <SwitchField
        label="Scrambled"
        defaultChecked={false}
        isDisabled={false}
        isChecked={Scrambled}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Name,
              Price,
              WhiteBread,
              BrownBread,
              Egg,
              Fried,
              Scrambled: value,
              Sausage,
              Bacon,
              HashBrown,
            };
            const result = onChange(modelFields);
            value = result?.Scrambled ?? value;
          }
          if (errors.Scrambled?.hasError) {
            runValidationTasks("Scrambled", value);
          }
          setScrambled(value);
        }}
        onBlur={() => runValidationTasks("Scrambled", Scrambled)}
        errorMessage={errors.Scrambled?.errorMessage}
        hasError={errors.Scrambled?.hasError}
        {...getOverrideProps(overrides, "Scrambled")}
      ></SwitchField>
      <TextField
        label="Sausage"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Sausage}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Price,
              WhiteBread,
              BrownBread,
              Egg,
              Fried,
              Scrambled,
              Sausage: value,
              Bacon,
              HashBrown,
            };
            const result = onChange(modelFields);
            value = result?.Sausage ?? value;
          }
          if (errors.Sausage?.hasError) {
            runValidationTasks("Sausage", value);
          }
          setSausage(value);
        }}
        onBlur={() => runValidationTasks("Sausage", Sausage)}
        errorMessage={errors.Sausage?.errorMessage}
        hasError={errors.Sausage?.hasError}
        {...getOverrideProps(overrides, "Sausage")}
      ></TextField>
      <TextField
        label="Bacon"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Bacon}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Price,
              WhiteBread,
              BrownBread,
              Egg,
              Fried,
              Scrambled,
              Sausage,
              Bacon: value,
              HashBrown,
            };
            const result = onChange(modelFields);
            value = result?.Bacon ?? value;
          }
          if (errors.Bacon?.hasError) {
            runValidationTasks("Bacon", value);
          }
          setBacon(value);
        }}
        onBlur={() => runValidationTasks("Bacon", Bacon)}
        errorMessage={errors.Bacon?.errorMessage}
        hasError={errors.Bacon?.hasError}
        {...getOverrideProps(overrides, "Bacon")}
      ></TextField>
      <TextField
        label="Hash brown"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={HashBrown}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Price,
              WhiteBread,
              BrownBread,
              Egg,
              Fried,
              Scrambled,
              Sausage,
              Bacon,
              HashBrown: value,
            };
            const result = onChange(modelFields);
            value = result?.HashBrown ?? value;
          }
          if (errors.HashBrown?.hasError) {
            runValidationTasks("HashBrown", value);
          }
          setHashBrown(value);
        }}
        onBlur={() => runValidationTasks("HashBrown", HashBrown)}
        errorMessage={errors.HashBrown?.errorMessage}
        hasError={errors.HashBrown?.hasError}
        {...getOverrideProps(overrides, "HashBrown")}
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
          isDisabled={!(idProp || breakfastModelProp)}
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
              !(idProp || breakfastModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
