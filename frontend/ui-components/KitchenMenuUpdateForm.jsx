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
  TextAreaField,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { KitchenMenu } from "../models";
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
export default function KitchenMenuUpdateForm(props) {
  const {
    id: idProp,
    kitchenMenu: kitchenMenuModelProp,
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
    Notes: "",
    Kitchen: false,
    imageSrc: "",
    Prep: "",
    Ingredients: "",
    Snooze: false,
    Extras: [],
    Category: "",
    ExtrasPrice: [],
    ProfitMargin: "",
    PriceNoVAT: "",
    InStock: "",
  };
  const [Name, setName] = React.useState(initialValues.Name);
  const [Price, setPrice] = React.useState(initialValues.Price);
  const [Description, setDescription] = React.useState(
    initialValues.Description
  );
  const [Notes, setNotes] = React.useState(initialValues.Notes);
  const [Kitchen, setKitchen] = React.useState(initialValues.Kitchen);
  const [imageSrc, setImageSrc] = React.useState(initialValues.imageSrc);
  const [Prep, setPrep] = React.useState(initialValues.Prep);
  const [Ingredients, setIngredients] = React.useState(
    initialValues.Ingredients
  );
  const [Snooze, setSnooze] = React.useState(initialValues.Snooze);
  const [Extras, setExtras] = React.useState(initialValues.Extras);
  const [Category, setCategory] = React.useState(initialValues.Category);
  const [ExtrasPrice, setExtrasPrice] = React.useState(
    initialValues.ExtrasPrice
  );
  const [ProfitMargin, setProfitMargin] = React.useState(
    initialValues.ProfitMargin
  );
  const [PriceNoVAT, setPriceNoVAT] = React.useState(initialValues.PriceNoVAT);
  const [InStock, setInStock] = React.useState(initialValues.InStock);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = kitchenMenuRecord
      ? { ...initialValues, ...kitchenMenuRecord }
      : initialValues;
    setName(cleanValues.Name);
    setPrice(cleanValues.Price);
    setDescription(cleanValues.Description);
    setNotes(cleanValues.Notes);
    setKitchen(cleanValues.Kitchen);
    setImageSrc(cleanValues.imageSrc);
    setPrep(cleanValues.Prep);
    setIngredients(
      typeof cleanValues.Ingredients === "string" ||
        cleanValues.Ingredients === null
        ? cleanValues.Ingredients
        : JSON.stringify(cleanValues.Ingredients)
    );
    setSnooze(cleanValues.Snooze);
    setExtras(cleanValues.Extras ?? []);
    setCurrentExtrasValue("");
    setCategory(cleanValues.Category);
    setExtrasPrice(cleanValues.ExtrasPrice ?? []);
    setCurrentExtrasPriceValue("");
    setProfitMargin(cleanValues.ProfitMargin);
    setPriceNoVAT(cleanValues.PriceNoVAT);
    setInStock(cleanValues.InStock);
    setErrors({});
  };
  const [kitchenMenuRecord, setKitchenMenuRecord] =
    React.useState(kitchenMenuModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(KitchenMenu, idProp)
        : kitchenMenuModelProp;
      setKitchenMenuRecord(record);
    };
    queryData();
  }, [idProp, kitchenMenuModelProp]);
  React.useEffect(resetStateValues, [kitchenMenuRecord]);
  const [currentExtrasValue, setCurrentExtrasValue] = React.useState("");
  const ExtrasRef = React.createRef();
  const [currentExtrasPriceValue, setCurrentExtrasPriceValue] =
    React.useState("");
  const ExtrasPriceRef = React.createRef();
  const validations = {
    Name: [],
    Price: [],
    Description: [],
    Notes: [],
    Kitchen: [],
    imageSrc: [],
    Prep: [],
    Ingredients: [{ type: "JSON" }],
    Snooze: [],
    Extras: [],
    Category: [],
    ExtrasPrice: [],
    ProfitMargin: [],
    PriceNoVAT: [],
    InStock: [],
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
          Notes,
          Kitchen,
          imageSrc,
          Prep,
          Ingredients,
          Snooze,
          Extras,
          Category,
          ExtrasPrice,
          ProfitMargin,
          PriceNoVAT,
          InStock,
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
            KitchenMenu.copyOf(kitchenMenuRecord, (updated) => {
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
      {...getOverrideProps(overrides, "KitchenMenuUpdateForm")}
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
              Notes,
              Kitchen,
              imageSrc,
              Prep,
              Ingredients,
              Snooze,
              Extras,
              Category,
              ExtrasPrice,
              ProfitMargin,
              PriceNoVAT,
              InStock,
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
              Notes,
              Kitchen,
              imageSrc,
              Prep,
              Ingredients,
              Snooze,
              Extras,
              Category,
              ExtrasPrice,
              ProfitMargin,
              PriceNoVAT,
              InStock,
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
              Notes,
              Kitchen,
              imageSrc,
              Prep,
              Ingredients,
              Snooze,
              Extras,
              Category,
              ExtrasPrice,
              ProfitMargin,
              PriceNoVAT,
              InStock,
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
              Notes: value,
              Kitchen,
              imageSrc,
              Prep,
              Ingredients,
              Snooze,
              Extras,
              Category,
              ExtrasPrice,
              ProfitMargin,
              PriceNoVAT,
              InStock,
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
              Notes,
              Kitchen: value,
              imageSrc,
              Prep,
              Ingredients,
              Snooze,
              Extras,
              Category,
              ExtrasPrice,
              ProfitMargin,
              PriceNoVAT,
              InStock,
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
              Notes,
              Kitchen,
              imageSrc: value,
              Prep,
              Ingredients,
              Snooze,
              Extras,
              Category,
              ExtrasPrice,
              ProfitMargin,
              PriceNoVAT,
              InStock,
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
      <TextField
        label="Prep"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={Prep}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Price,
              Description,
              Notes,
              Kitchen,
              imageSrc,
              Prep: value,
              Ingredients,
              Snooze,
              Extras,
              Category,
              ExtrasPrice,
              ProfitMargin,
              PriceNoVAT,
              InStock,
            };
            const result = onChange(modelFields);
            value = result?.Prep ?? value;
          }
          if (errors.Prep?.hasError) {
            runValidationTasks("Prep", value);
          }
          setPrep(value);
        }}
        onBlur={() => runValidationTasks("Prep", Prep)}
        errorMessage={errors.Prep?.errorMessage}
        hasError={errors.Prep?.hasError}
        {...getOverrideProps(overrides, "Prep")}
      ></TextField>
      <TextAreaField
        label="Ingredients"
        isRequired={false}
        isReadOnly={false}
        value={Ingredients}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Price,
              Description,
              Notes,
              Kitchen,
              imageSrc,
              Prep,
              Ingredients: value,
              Snooze,
              Extras,
              Category,
              ExtrasPrice,
              ProfitMargin,
              PriceNoVAT,
              InStock,
            };
            const result = onChange(modelFields);
            value = result?.Ingredients ?? value;
          }
          if (errors.Ingredients?.hasError) {
            runValidationTasks("Ingredients", value);
          }
          setIngredients(value);
        }}
        onBlur={() => runValidationTasks("Ingredients", Ingredients)}
        errorMessage={errors.Ingredients?.errorMessage}
        hasError={errors.Ingredients?.hasError}
        {...getOverrideProps(overrides, "Ingredients")}
      ></TextAreaField>
      <SwitchField
        label="Snooze"
        defaultChecked={false}
        isDisabled={false}
        isChecked={Snooze}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Name,
              Price,
              Description,
              Notes,
              Kitchen,
              imageSrc,
              Prep,
              Ingredients,
              Snooze: value,
              Extras,
              Category,
              ExtrasPrice,
              ProfitMargin,
              PriceNoVAT,
              InStock,
            };
            const result = onChange(modelFields);
            value = result?.Snooze ?? value;
          }
          if (errors.Snooze?.hasError) {
            runValidationTasks("Snooze", value);
          }
          setSnooze(value);
        }}
        onBlur={() => runValidationTasks("Snooze", Snooze)}
        errorMessage={errors.Snooze?.errorMessage}
        hasError={errors.Snooze?.hasError}
        {...getOverrideProps(overrides, "Snooze")}
      ></SwitchField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              Name,
              Price,
              Description,
              Notes,
              Kitchen,
              imageSrc,
              Prep,
              Ingredients,
              Snooze,
              Extras: values,
              Category,
              ExtrasPrice,
              ProfitMargin,
              PriceNoVAT,
              InStock,
            };
            const result = onChange(modelFields);
            values = result?.Extras ?? values;
          }
          setExtras(values);
          setCurrentExtrasValue("");
        }}
        currentFieldValue={currentExtrasValue}
        label={"Extras"}
        items={Extras}
        hasError={errors?.Extras?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Extras", currentExtrasValue)
        }
        errorMessage={errors?.Extras?.errorMessage}
        setFieldValue={setCurrentExtrasValue}
        inputFieldRef={ExtrasRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Extras"
          isRequired={false}
          isReadOnly={false}
          value={currentExtrasValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Extras?.hasError) {
              runValidationTasks("Extras", value);
            }
            setCurrentExtrasValue(value);
          }}
          onBlur={() => runValidationTasks("Extras", currentExtrasValue)}
          errorMessage={errors.Extras?.errorMessage}
          hasError={errors.Extras?.hasError}
          ref={ExtrasRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Extras")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Category"
        isRequired={false}
        isReadOnly={false}
        value={Category}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Price,
              Description,
              Notes,
              Kitchen,
              imageSrc,
              Prep,
              Ingredients,
              Snooze,
              Extras,
              Category: value,
              ExtrasPrice,
              ProfitMargin,
              PriceNoVAT,
              InStock,
            };
            const result = onChange(modelFields);
            value = result?.Category ?? value;
          }
          if (errors.Category?.hasError) {
            runValidationTasks("Category", value);
          }
          setCategory(value);
        }}
        onBlur={() => runValidationTasks("Category", Category)}
        errorMessage={errors.Category?.errorMessage}
        hasError={errors.Category?.hasError}
        {...getOverrideProps(overrides, "Category")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              Name,
              Price,
              Description,
              Notes,
              Kitchen,
              imageSrc,
              Prep,
              Ingredients,
              Snooze,
              Extras,
              Category,
              ExtrasPrice: values,
              ProfitMargin,
              PriceNoVAT,
              InStock,
            };
            const result = onChange(modelFields);
            values = result?.ExtrasPrice ?? values;
          }
          setExtrasPrice(values);
          setCurrentExtrasPriceValue("");
        }}
        currentFieldValue={currentExtrasPriceValue}
        label={"Extras price"}
        items={ExtrasPrice}
        hasError={errors?.ExtrasPrice?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("ExtrasPrice", currentExtrasPriceValue)
        }
        errorMessage={errors?.ExtrasPrice?.errorMessage}
        setFieldValue={setCurrentExtrasPriceValue}
        inputFieldRef={ExtrasPriceRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Extras price"
          isRequired={false}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentExtrasPriceValue}
          onChange={(e) => {
            let value = isNaN(parseFloat(e.target.value))
              ? e.target.value
              : parseFloat(e.target.value);
            if (errors.ExtrasPrice?.hasError) {
              runValidationTasks("ExtrasPrice", value);
            }
            setCurrentExtrasPriceValue(value);
          }}
          onBlur={() =>
            runValidationTasks("ExtrasPrice", currentExtrasPriceValue)
          }
          errorMessage={errors.ExtrasPrice?.errorMessage}
          hasError={errors.ExtrasPrice?.hasError}
          ref={ExtrasPriceRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "ExtrasPrice")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Profit margin"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={ProfitMargin}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Price,
              Description,
              Notes,
              Kitchen,
              imageSrc,
              Prep,
              Ingredients,
              Snooze,
              Extras,
              Category,
              ExtrasPrice,
              ProfitMargin: value,
              PriceNoVAT,
              InStock,
            };
            const result = onChange(modelFields);
            value = result?.ProfitMargin ?? value;
          }
          if (errors.ProfitMargin?.hasError) {
            runValidationTasks("ProfitMargin", value);
          }
          setProfitMargin(value);
        }}
        onBlur={() => runValidationTasks("ProfitMargin", ProfitMargin)}
        errorMessage={errors.ProfitMargin?.errorMessage}
        hasError={errors.ProfitMargin?.hasError}
        {...getOverrideProps(overrides, "ProfitMargin")}
      ></TextField>
      <TextField
        label="Price no vat"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={PriceNoVAT}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Price,
              Description,
              Notes,
              Kitchen,
              imageSrc,
              Prep,
              Ingredients,
              Snooze,
              Extras,
              Category,
              ExtrasPrice,
              ProfitMargin,
              PriceNoVAT: value,
              InStock,
            };
            const result = onChange(modelFields);
            value = result?.PriceNoVAT ?? value;
          }
          if (errors.PriceNoVAT?.hasError) {
            runValidationTasks("PriceNoVAT", value);
          }
          setPriceNoVAT(value);
        }}
        onBlur={() => runValidationTasks("PriceNoVAT", PriceNoVAT)}
        errorMessage={errors.PriceNoVAT?.errorMessage}
        hasError={errors.PriceNoVAT?.hasError}
        {...getOverrideProps(overrides, "PriceNoVAT")}
      ></TextField>
      <TextField
        label="In stock"
        isRequired={false}
        isReadOnly={false}
        value={InStock}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Price,
              Description,
              Notes,
              Kitchen,
              imageSrc,
              Prep,
              Ingredients,
              Snooze,
              Extras,
              Category,
              ExtrasPrice,
              ProfitMargin,
              PriceNoVAT,
              InStock: value,
            };
            const result = onChange(modelFields);
            value = result?.InStock ?? value;
          }
          if (errors.InStock?.hasError) {
            runValidationTasks("InStock", value);
          }
          setInStock(value);
        }}
        onBlur={() => runValidationTasks("InStock", InStock)}
        errorMessage={errors.InStock?.errorMessage}
        hasError={errors.InStock?.hasError}
        {...getOverrideProps(overrides, "InStock")}
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
          isDisabled={!(idProp || kitchenMenuModelProp)}
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
              !(idProp || kitchenMenuModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
