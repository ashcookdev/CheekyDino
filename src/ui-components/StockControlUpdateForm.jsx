/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { StockControl } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function StockControlUpdateForm(props) {
  const {
    id: idProp,
    stockControl: stockControlModelProp,
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
    Weight: "",
    Quantity: "",
    Price: "",
    PreVAT: "",
    Supplier: "",
    VAT: "",
  };
  const [Name, setName] = React.useState(initialValues.Name);
  const [Weight, setWeight] = React.useState(initialValues.Weight);
  const [Quantity, setQuantity] = React.useState(initialValues.Quantity);
  const [Price, setPrice] = React.useState(initialValues.Price);
  const [PreVAT, setPreVAT] = React.useState(initialValues.PreVAT);
  const [Supplier, setSupplier] = React.useState(initialValues.Supplier);
  const [VAT, setVAT] = React.useState(initialValues.VAT);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = stockControlRecord
      ? { ...initialValues, ...stockControlRecord }
      : initialValues;
    setName(cleanValues.Name);
    setWeight(cleanValues.Weight);
    setQuantity(cleanValues.Quantity);
    setPrice(cleanValues.Price);
    setPreVAT(cleanValues.PreVAT);
    setSupplier(cleanValues.Supplier);
    setVAT(cleanValues.VAT);
    setErrors({});
  };
  const [stockControlRecord, setStockControlRecord] = React.useState(
    stockControlModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(StockControl, idProp)
        : stockControlModelProp;
      setStockControlRecord(record);
    };
    queryData();
  }, [idProp, stockControlModelProp]);
  React.useEffect(resetStateValues, [stockControlRecord]);
  const validations = {
    Name: [],
    Weight: [],
    Quantity: [],
    Price: [],
    PreVAT: [],
    Supplier: [],
    VAT: [],
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
          Weight,
          Quantity,
          Price,
          PreVAT,
          Supplier,
          VAT,
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
            StockControl.copyOf(stockControlRecord, (updated) => {
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
      {...getOverrideProps(overrides, "StockControlUpdateForm")}
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
              Weight,
              Quantity,
              Price,
              PreVAT,
              Supplier,
              VAT,
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
        label="Weight"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Weight}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Weight: value,
              Quantity,
              Price,
              PreVAT,
              Supplier,
              VAT,
            };
            const result = onChange(modelFields);
            value = result?.Weight ?? value;
          }
          if (errors.Weight?.hasError) {
            runValidationTasks("Weight", value);
          }
          setWeight(value);
        }}
        onBlur={() => runValidationTasks("Weight", Weight)}
        errorMessage={errors.Weight?.errorMessage}
        hasError={errors.Weight?.hasError}
        {...getOverrideProps(overrides, "Weight")}
      ></TextField>
      <TextField
        label="Quantity"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Quantity}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Weight,
              Quantity: value,
              Price,
              PreVAT,
              Supplier,
              VAT,
            };
            const result = onChange(modelFields);
            value = result?.Quantity ?? value;
          }
          if (errors.Quantity?.hasError) {
            runValidationTasks("Quantity", value);
          }
          setQuantity(value);
        }}
        onBlur={() => runValidationTasks("Quantity", Quantity)}
        errorMessage={errors.Quantity?.errorMessage}
        hasError={errors.Quantity?.hasError}
        {...getOverrideProps(overrides, "Quantity")}
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
              Weight,
              Quantity,
              Price: value,
              PreVAT,
              Supplier,
              VAT,
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
        label="Pre vat"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={PreVAT}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Weight,
              Quantity,
              Price,
              PreVAT: value,
              Supplier,
              VAT,
            };
            const result = onChange(modelFields);
            value = result?.PreVAT ?? value;
          }
          if (errors.PreVAT?.hasError) {
            runValidationTasks("PreVAT", value);
          }
          setPreVAT(value);
        }}
        onBlur={() => runValidationTasks("PreVAT", PreVAT)}
        errorMessage={errors.PreVAT?.errorMessage}
        hasError={errors.PreVAT?.hasError}
        {...getOverrideProps(overrides, "PreVAT")}
      ></TextField>
      <TextField
        label="Supplier"
        isRequired={false}
        isReadOnly={false}
        value={Supplier}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Weight,
              Quantity,
              Price,
              PreVAT,
              Supplier: value,
              VAT,
            };
            const result = onChange(modelFields);
            value = result?.Supplier ?? value;
          }
          if (errors.Supplier?.hasError) {
            runValidationTasks("Supplier", value);
          }
          setSupplier(value);
        }}
        onBlur={() => runValidationTasks("Supplier", Supplier)}
        errorMessage={errors.Supplier?.errorMessage}
        hasError={errors.Supplier?.hasError}
        {...getOverrideProps(overrides, "Supplier")}
      ></TextField>
      <TextField
        label="Vat"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={VAT}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Weight,
              Quantity,
              Price,
              PreVAT,
              Supplier,
              VAT: value,
            };
            const result = onChange(modelFields);
            value = result?.VAT ?? value;
          }
          if (errors.VAT?.hasError) {
            runValidationTasks("VAT", value);
          }
          setVAT(value);
        }}
        onBlur={() => runValidationTasks("VAT", VAT)}
        errorMessage={errors.VAT?.errorMessage}
        hasError={errors.VAT?.hasError}
        {...getOverrideProps(overrides, "VAT")}
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
          isDisabled={!(idProp || stockControlModelProp)}
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
              !(idProp || stockControlModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
