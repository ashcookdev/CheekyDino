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
import { PartyAdultFood } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function PartyAdultFoodCreateForm(props) {
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
    ChickenNugget: "",
    CocktailSausage: "",
    OnionRings: "",
    FishFingers: "",
    MozzarellaSticks: "",
    GarlicBread: "",
    GarlicMushrooms: "",
    TraySandwiches: "",
    PepperoniPizza: "",
    MargheritaPizza: "",
    BBQChickenPizza: "",
    VegPizza: "",
    AdultFoodComplete: false,
  };
  const [ChickenNugget, setChickenNugget] = React.useState(
    initialValues.ChickenNugget
  );
  const [CocktailSausage, setCocktailSausage] = React.useState(
    initialValues.CocktailSausage
  );
  const [OnionRings, setOnionRings] = React.useState(initialValues.OnionRings);
  const [FishFingers, setFishFingers] = React.useState(
    initialValues.FishFingers
  );
  const [MozzarellaSticks, setMozzarellaSticks] = React.useState(
    initialValues.MozzarellaSticks
  );
  const [GarlicBread, setGarlicBread] = React.useState(
    initialValues.GarlicBread
  );
  const [GarlicMushrooms, setGarlicMushrooms] = React.useState(
    initialValues.GarlicMushrooms
  );
  const [TraySandwiches, setTraySandwiches] = React.useState(
    initialValues.TraySandwiches
  );
  const [PepperoniPizza, setPepperoniPizza] = React.useState(
    initialValues.PepperoniPizza
  );
  const [MargheritaPizza, setMargheritaPizza] = React.useState(
    initialValues.MargheritaPizza
  );
  const [BBQChickenPizza, setBBQChickenPizza] = React.useState(
    initialValues.BBQChickenPizza
  );
  const [VegPizza, setVegPizza] = React.useState(initialValues.VegPizza);
  const [AdultFoodComplete, setAdultFoodComplete] = React.useState(
    initialValues.AdultFoodComplete
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setChickenNugget(initialValues.ChickenNugget);
    setCocktailSausage(initialValues.CocktailSausage);
    setOnionRings(initialValues.OnionRings);
    setFishFingers(initialValues.FishFingers);
    setMozzarellaSticks(initialValues.MozzarellaSticks);
    setGarlicBread(initialValues.GarlicBread);
    setGarlicMushrooms(initialValues.GarlicMushrooms);
    setTraySandwiches(initialValues.TraySandwiches);
    setPepperoniPizza(initialValues.PepperoniPizza);
    setMargheritaPizza(initialValues.MargheritaPizza);
    setBBQChickenPizza(initialValues.BBQChickenPizza);
    setVegPizza(initialValues.VegPizza);
    setAdultFoodComplete(initialValues.AdultFoodComplete);
    setErrors({});
  };
  const validations = {
    ChickenNugget: [],
    CocktailSausage: [],
    OnionRings: [],
    FishFingers: [],
    MozzarellaSticks: [],
    GarlicBread: [],
    GarlicMushrooms: [],
    TraySandwiches: [],
    PepperoniPizza: [],
    MargheritaPizza: [],
    BBQChickenPizza: [],
    VegPizza: [],
    AdultFoodComplete: [],
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
          ChickenNugget,
          CocktailSausage,
          OnionRings,
          FishFingers,
          MozzarellaSticks,
          GarlicBread,
          GarlicMushrooms,
          TraySandwiches,
          PepperoniPizza,
          MargheritaPizza,
          BBQChickenPizza,
          VegPizza,
          AdultFoodComplete,
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
          await DataStore.save(new PartyAdultFood(modelFields));
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
      {...getOverrideProps(overrides, "PartyAdultFoodCreateForm")}
      {...rest}
    >
      <TextField
        label="Chicken nugget"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={ChickenNugget}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ChickenNugget: value,
              CocktailSausage,
              OnionRings,
              FishFingers,
              MozzarellaSticks,
              GarlicBread,
              GarlicMushrooms,
              TraySandwiches,
              PepperoniPizza,
              MargheritaPizza,
              BBQChickenPizza,
              VegPizza,
              AdultFoodComplete,
            };
            const result = onChange(modelFields);
            value = result?.ChickenNugget ?? value;
          }
          if (errors.ChickenNugget?.hasError) {
            runValidationTasks("ChickenNugget", value);
          }
          setChickenNugget(value);
        }}
        onBlur={() => runValidationTasks("ChickenNugget", ChickenNugget)}
        errorMessage={errors.ChickenNugget?.errorMessage}
        hasError={errors.ChickenNugget?.hasError}
        {...getOverrideProps(overrides, "ChickenNugget")}
      ></TextField>
      <TextField
        label="Cocktail sausage"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={CocktailSausage}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ChickenNugget,
              CocktailSausage: value,
              OnionRings,
              FishFingers,
              MozzarellaSticks,
              GarlicBread,
              GarlicMushrooms,
              TraySandwiches,
              PepperoniPizza,
              MargheritaPizza,
              BBQChickenPizza,
              VegPizza,
              AdultFoodComplete,
            };
            const result = onChange(modelFields);
            value = result?.CocktailSausage ?? value;
          }
          if (errors.CocktailSausage?.hasError) {
            runValidationTasks("CocktailSausage", value);
          }
          setCocktailSausage(value);
        }}
        onBlur={() => runValidationTasks("CocktailSausage", CocktailSausage)}
        errorMessage={errors.CocktailSausage?.errorMessage}
        hasError={errors.CocktailSausage?.hasError}
        {...getOverrideProps(overrides, "CocktailSausage")}
      ></TextField>
      <TextField
        label="Onion rings"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={OnionRings}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ChickenNugget,
              CocktailSausage,
              OnionRings: value,
              FishFingers,
              MozzarellaSticks,
              GarlicBread,
              GarlicMushrooms,
              TraySandwiches,
              PepperoniPizza,
              MargheritaPizza,
              BBQChickenPizza,
              VegPizza,
              AdultFoodComplete,
            };
            const result = onChange(modelFields);
            value = result?.OnionRings ?? value;
          }
          if (errors.OnionRings?.hasError) {
            runValidationTasks("OnionRings", value);
          }
          setOnionRings(value);
        }}
        onBlur={() => runValidationTasks("OnionRings", OnionRings)}
        errorMessage={errors.OnionRings?.errorMessage}
        hasError={errors.OnionRings?.hasError}
        {...getOverrideProps(overrides, "OnionRings")}
      ></TextField>
      <TextField
        label="Fish fingers"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={FishFingers}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ChickenNugget,
              CocktailSausage,
              OnionRings,
              FishFingers: value,
              MozzarellaSticks,
              GarlicBread,
              GarlicMushrooms,
              TraySandwiches,
              PepperoniPizza,
              MargheritaPizza,
              BBQChickenPizza,
              VegPizza,
              AdultFoodComplete,
            };
            const result = onChange(modelFields);
            value = result?.FishFingers ?? value;
          }
          if (errors.FishFingers?.hasError) {
            runValidationTasks("FishFingers", value);
          }
          setFishFingers(value);
        }}
        onBlur={() => runValidationTasks("FishFingers", FishFingers)}
        errorMessage={errors.FishFingers?.errorMessage}
        hasError={errors.FishFingers?.hasError}
        {...getOverrideProps(overrides, "FishFingers")}
      ></TextField>
      <TextField
        label="Mozzarella sticks"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={MozzarellaSticks}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ChickenNugget,
              CocktailSausage,
              OnionRings,
              FishFingers,
              MozzarellaSticks: value,
              GarlicBread,
              GarlicMushrooms,
              TraySandwiches,
              PepperoniPizza,
              MargheritaPizza,
              BBQChickenPizza,
              VegPizza,
              AdultFoodComplete,
            };
            const result = onChange(modelFields);
            value = result?.MozzarellaSticks ?? value;
          }
          if (errors.MozzarellaSticks?.hasError) {
            runValidationTasks("MozzarellaSticks", value);
          }
          setMozzarellaSticks(value);
        }}
        onBlur={() => runValidationTasks("MozzarellaSticks", MozzarellaSticks)}
        errorMessage={errors.MozzarellaSticks?.errorMessage}
        hasError={errors.MozzarellaSticks?.hasError}
        {...getOverrideProps(overrides, "MozzarellaSticks")}
      ></TextField>
      <TextField
        label="Garlic bread"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={GarlicBread}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ChickenNugget,
              CocktailSausage,
              OnionRings,
              FishFingers,
              MozzarellaSticks,
              GarlicBread: value,
              GarlicMushrooms,
              TraySandwiches,
              PepperoniPizza,
              MargheritaPizza,
              BBQChickenPizza,
              VegPizza,
              AdultFoodComplete,
            };
            const result = onChange(modelFields);
            value = result?.GarlicBread ?? value;
          }
          if (errors.GarlicBread?.hasError) {
            runValidationTasks("GarlicBread", value);
          }
          setGarlicBread(value);
        }}
        onBlur={() => runValidationTasks("GarlicBread", GarlicBread)}
        errorMessage={errors.GarlicBread?.errorMessage}
        hasError={errors.GarlicBread?.hasError}
        {...getOverrideProps(overrides, "GarlicBread")}
      ></TextField>
      <TextField
        label="Garlic mushrooms"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={GarlicMushrooms}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ChickenNugget,
              CocktailSausage,
              OnionRings,
              FishFingers,
              MozzarellaSticks,
              GarlicBread,
              GarlicMushrooms: value,
              TraySandwiches,
              PepperoniPizza,
              MargheritaPizza,
              BBQChickenPizza,
              VegPizza,
              AdultFoodComplete,
            };
            const result = onChange(modelFields);
            value = result?.GarlicMushrooms ?? value;
          }
          if (errors.GarlicMushrooms?.hasError) {
            runValidationTasks("GarlicMushrooms", value);
          }
          setGarlicMushrooms(value);
        }}
        onBlur={() => runValidationTasks("GarlicMushrooms", GarlicMushrooms)}
        errorMessage={errors.GarlicMushrooms?.errorMessage}
        hasError={errors.GarlicMushrooms?.hasError}
        {...getOverrideProps(overrides, "GarlicMushrooms")}
      ></TextField>
      <TextField
        label="Tray sandwiches"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={TraySandwiches}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ChickenNugget,
              CocktailSausage,
              OnionRings,
              FishFingers,
              MozzarellaSticks,
              GarlicBread,
              GarlicMushrooms,
              TraySandwiches: value,
              PepperoniPizza,
              MargheritaPizza,
              BBQChickenPizza,
              VegPizza,
              AdultFoodComplete,
            };
            const result = onChange(modelFields);
            value = result?.TraySandwiches ?? value;
          }
          if (errors.TraySandwiches?.hasError) {
            runValidationTasks("TraySandwiches", value);
          }
          setTraySandwiches(value);
        }}
        onBlur={() => runValidationTasks("TraySandwiches", TraySandwiches)}
        errorMessage={errors.TraySandwiches?.errorMessage}
        hasError={errors.TraySandwiches?.hasError}
        {...getOverrideProps(overrides, "TraySandwiches")}
      ></TextField>
      <TextField
        label="Pepperoni pizza"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={PepperoniPizza}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ChickenNugget,
              CocktailSausage,
              OnionRings,
              FishFingers,
              MozzarellaSticks,
              GarlicBread,
              GarlicMushrooms,
              TraySandwiches,
              PepperoniPizza: value,
              MargheritaPizza,
              BBQChickenPizza,
              VegPizza,
              AdultFoodComplete,
            };
            const result = onChange(modelFields);
            value = result?.PepperoniPizza ?? value;
          }
          if (errors.PepperoniPizza?.hasError) {
            runValidationTasks("PepperoniPizza", value);
          }
          setPepperoniPizza(value);
        }}
        onBlur={() => runValidationTasks("PepperoniPizza", PepperoniPizza)}
        errorMessage={errors.PepperoniPizza?.errorMessage}
        hasError={errors.PepperoniPizza?.hasError}
        {...getOverrideProps(overrides, "PepperoniPizza")}
      ></TextField>
      <TextField
        label="Margherita pizza"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={MargheritaPizza}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ChickenNugget,
              CocktailSausage,
              OnionRings,
              FishFingers,
              MozzarellaSticks,
              GarlicBread,
              GarlicMushrooms,
              TraySandwiches,
              PepperoniPizza,
              MargheritaPizza: value,
              BBQChickenPizza,
              VegPizza,
              AdultFoodComplete,
            };
            const result = onChange(modelFields);
            value = result?.MargheritaPizza ?? value;
          }
          if (errors.MargheritaPizza?.hasError) {
            runValidationTasks("MargheritaPizza", value);
          }
          setMargheritaPizza(value);
        }}
        onBlur={() => runValidationTasks("MargheritaPizza", MargheritaPizza)}
        errorMessage={errors.MargheritaPizza?.errorMessage}
        hasError={errors.MargheritaPizza?.hasError}
        {...getOverrideProps(overrides, "MargheritaPizza")}
      ></TextField>
      <TextField
        label="Bbq chicken pizza"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={BBQChickenPizza}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ChickenNugget,
              CocktailSausage,
              OnionRings,
              FishFingers,
              MozzarellaSticks,
              GarlicBread,
              GarlicMushrooms,
              TraySandwiches,
              PepperoniPizza,
              MargheritaPizza,
              BBQChickenPizza: value,
              VegPizza,
              AdultFoodComplete,
            };
            const result = onChange(modelFields);
            value = result?.BBQChickenPizza ?? value;
          }
          if (errors.BBQChickenPizza?.hasError) {
            runValidationTasks("BBQChickenPizza", value);
          }
          setBBQChickenPizza(value);
        }}
        onBlur={() => runValidationTasks("BBQChickenPizza", BBQChickenPizza)}
        errorMessage={errors.BBQChickenPizza?.errorMessage}
        hasError={errors.BBQChickenPizza?.hasError}
        {...getOverrideProps(overrides, "BBQChickenPizza")}
      ></TextField>
      <TextField
        label="Veg pizza"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={VegPizza}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ChickenNugget,
              CocktailSausage,
              OnionRings,
              FishFingers,
              MozzarellaSticks,
              GarlicBread,
              GarlicMushrooms,
              TraySandwiches,
              PepperoniPizza,
              MargheritaPizza,
              BBQChickenPizza,
              VegPizza: value,
              AdultFoodComplete,
            };
            const result = onChange(modelFields);
            value = result?.VegPizza ?? value;
          }
          if (errors.VegPizza?.hasError) {
            runValidationTasks("VegPizza", value);
          }
          setVegPizza(value);
        }}
        onBlur={() => runValidationTasks("VegPizza", VegPizza)}
        errorMessage={errors.VegPizza?.errorMessage}
        hasError={errors.VegPizza?.hasError}
        {...getOverrideProps(overrides, "VegPizza")}
      ></TextField>
      <SwitchField
        label="Adult food complete"
        defaultChecked={false}
        isDisabled={false}
        isChecked={AdultFoodComplete}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              ChickenNugget,
              CocktailSausage,
              OnionRings,
              FishFingers,
              MozzarellaSticks,
              GarlicBread,
              GarlicMushrooms,
              TraySandwiches,
              PepperoniPizza,
              MargheritaPizza,
              BBQChickenPizza,
              VegPizza,
              AdultFoodComplete: value,
            };
            const result = onChange(modelFields);
            value = result?.AdultFoodComplete ?? value;
          }
          if (errors.AdultFoodComplete?.hasError) {
            runValidationTasks("AdultFoodComplete", value);
          }
          setAdultFoodComplete(value);
        }}
        onBlur={() =>
          runValidationTasks("AdultFoodComplete", AdultFoodComplete)
        }
        errorMessage={errors.AdultFoodComplete?.errorMessage}
        hasError={errors.AdultFoodComplete?.hasError}
        {...getOverrideProps(overrides, "AdultFoodComplete")}
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
