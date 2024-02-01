/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { StockControl } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function StockControlCreateForm(props) {
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
    Name: "",
    Weight: "",
    Quantity: "",
    Price: "",
    PreVAT: "",
    Supplier: "",
    VAT: "",
    CurrentStockLevel: "",
    Cases: "",
    ProductId: "",
    NewPrice: "",
    NewVAT: "",
    UsedBy: "",
    MatchCode: "",
  };
  const [Name, setName] = React.useState(initialValues.Name);
  const [Weight, setWeight] = React.useState(initialValues.Weight);
  const [Quantity, setQuantity] = React.useState(initialValues.Quantity);
  const [Price, setPrice] = React.useState(initialValues.Price);
  const [PreVAT, setPreVAT] = React.useState(initialValues.PreVAT);
  const [Supplier, setSupplier] = React.useState(initialValues.Supplier);
  const [VAT, setVAT] = React.useState(initialValues.VAT);
  const [CurrentStockLevel, setCurrentStockLevel] = React.useState(
    initialValues.CurrentStockLevel
  );
  const [Cases, setCases] = React.useState(initialValues.Cases);
  const [ProductId, setProductId] = React.useState(initialValues.ProductId);
  const [NewPrice, setNewPrice] = React.useState(initialValues.NewPrice);
  const [NewVAT, setNewVAT] = React.useState(initialValues.NewVAT);
  const [UsedBy, setUsedBy] = React.useState(initialValues.UsedBy);
  const [MatchCode, setMatchCode] = React.useState(initialValues.MatchCode);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.Name);
    setWeight(initialValues.Weight);
    setQuantity(initialValues.Quantity);
    setPrice(initialValues.Price);
    setPreVAT(initialValues.PreVAT);
    setSupplier(initialValues.Supplier);
    setVAT(initialValues.VAT);
    setCurrentStockLevel(initialValues.CurrentStockLevel);
    setCases(initialValues.Cases);
    setProductId(initialValues.ProductId);
    setNewPrice(initialValues.NewPrice);
    setNewVAT(initialValues.NewVAT);
    setUsedBy(initialValues.UsedBy);
    setMatchCode(initialValues.MatchCode);
    setErrors({});
  };
  const validations = {
    Name: [],
    Weight: [],
    Quantity: [],
    Price: [],
    PreVAT: [],
    Supplier: [],
    VAT: [],
    CurrentStockLevel: [],
    Cases: [],
    ProductId: [],
    NewPrice: [],
    NewVAT: [],
    UsedBy: [],
    MatchCode: [],
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
          CurrentStockLevel,
          Cases,
          ProductId,
          NewPrice,
          NewVAT,
          UsedBy,
          MatchCode,
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
          await DataStore.save(new StockControl(modelFields));
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
      {...getOverrideProps(overrides, "StockControlCreateForm")}
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
              CurrentStockLevel,
              Cases,
              ProductId,
              NewPrice,
              NewVAT,
              UsedBy,
              MatchCode,
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
              CurrentStockLevel,
              Cases,
              ProductId,
              NewPrice,
              NewVAT,
              UsedBy,
              MatchCode,
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
              CurrentStockLevel,
              Cases,
              ProductId,
              NewPrice,
              NewVAT,
              UsedBy,
              MatchCode,
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
              CurrentStockLevel,
              Cases,
              ProductId,
              NewPrice,
              NewVAT,
              UsedBy,
              MatchCode,
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
              CurrentStockLevel,
              Cases,
              ProductId,
              NewPrice,
              NewVAT,
              UsedBy,
              MatchCode,
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
              CurrentStockLevel,
              Cases,
              ProductId,
              NewPrice,
              NewVAT,
              UsedBy,
              MatchCode,
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
              CurrentStockLevel,
              Cases,
              ProductId,
              NewPrice,
              NewVAT,
              UsedBy,
              MatchCode,
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
      <TextField
        label="Current stock level"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={CurrentStockLevel}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Weight,
              Quantity,
              Price,
              PreVAT,
              Supplier,
              VAT,
              CurrentStockLevel: value,
              Cases,
              ProductId,
              NewPrice,
              NewVAT,
              UsedBy,
              MatchCode,
            };
            const result = onChange(modelFields);
            value = result?.CurrentStockLevel ?? value;
          }
          if (errors.CurrentStockLevel?.hasError) {
            runValidationTasks("CurrentStockLevel", value);
          }
          setCurrentStockLevel(value);
        }}
        onBlur={() =>
          runValidationTasks("CurrentStockLevel", CurrentStockLevel)
        }
        errorMessage={errors.CurrentStockLevel?.errorMessage}
        hasError={errors.CurrentStockLevel?.hasError}
        {...getOverrideProps(overrides, "CurrentStockLevel")}
      ></TextField>
      <TextField
        label="Cases"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Cases}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              Weight,
              Quantity,
              Price,
              PreVAT,
              Supplier,
              VAT,
              CurrentStockLevel,
              Cases: value,
              ProductId,
              NewPrice,
              NewVAT,
              UsedBy,
              MatchCode,
            };
            const result = onChange(modelFields);
            value = result?.Cases ?? value;
          }
          if (errors.Cases?.hasError) {
            runValidationTasks("Cases", value);
          }
          setCases(value);
        }}
        onBlur={() => runValidationTasks("Cases", Cases)}
        errorMessage={errors.Cases?.errorMessage}
        hasError={errors.Cases?.hasError}
        {...getOverrideProps(overrides, "Cases")}
      ></TextField>
      <TextField
        label="Product id"
        isRequired={false}
        isReadOnly={false}
        value={ProductId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Weight,
              Quantity,
              Price,
              PreVAT,
              Supplier,
              VAT,
              CurrentStockLevel,
              Cases,
              ProductId: value,
              NewPrice,
              NewVAT,
              UsedBy,
              MatchCode,
            };
            const result = onChange(modelFields);
            value = result?.ProductId ?? value;
          }
          if (errors.ProductId?.hasError) {
            runValidationTasks("ProductId", value);
          }
          setProductId(value);
        }}
        onBlur={() => runValidationTasks("ProductId", ProductId)}
        errorMessage={errors.ProductId?.errorMessage}
        hasError={errors.ProductId?.hasError}
        {...getOverrideProps(overrides, "ProductId")}
      ></TextField>
      <TextField
        label="New price"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={NewPrice}
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
              VAT,
              CurrentStockLevel,
              Cases,
              ProductId,
              NewPrice: value,
              NewVAT,
              UsedBy,
              MatchCode,
            };
            const result = onChange(modelFields);
            value = result?.NewPrice ?? value;
          }
          if (errors.NewPrice?.hasError) {
            runValidationTasks("NewPrice", value);
          }
          setNewPrice(value);
        }}
        onBlur={() => runValidationTasks("NewPrice", NewPrice)}
        errorMessage={errors.NewPrice?.errorMessage}
        hasError={errors.NewPrice?.hasError}
        {...getOverrideProps(overrides, "NewPrice")}
      ></TextField>
      <TextField
        label="New vat"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={NewVAT}
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
              VAT,
              CurrentStockLevel,
              Cases,
              ProductId,
              NewPrice,
              NewVAT: value,
              UsedBy,
              MatchCode,
            };
            const result = onChange(modelFields);
            value = result?.NewVAT ?? value;
          }
          if (errors.NewVAT?.hasError) {
            runValidationTasks("NewVAT", value);
          }
          setNewVAT(value);
        }}
        onBlur={() => runValidationTasks("NewVAT", NewVAT)}
        errorMessage={errors.NewVAT?.errorMessage}
        hasError={errors.NewVAT?.hasError}
        {...getOverrideProps(overrides, "NewVAT")}
      ></TextField>
      <TextField
        label="Used by"
        isRequired={false}
        isReadOnly={false}
        value={UsedBy}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Weight,
              Quantity,
              Price,
              PreVAT,
              Supplier,
              VAT,
              CurrentStockLevel,
              Cases,
              ProductId,
              NewPrice,
              NewVAT,
              UsedBy: value,
              MatchCode,
            };
            const result = onChange(modelFields);
            value = result?.UsedBy ?? value;
          }
          if (errors.UsedBy?.hasError) {
            runValidationTasks("UsedBy", value);
          }
          setUsedBy(value);
        }}
        onBlur={() => runValidationTasks("UsedBy", UsedBy)}
        errorMessage={errors.UsedBy?.errorMessage}
        hasError={errors.UsedBy?.hasError}
        {...getOverrideProps(overrides, "UsedBy")}
      ></TextField>
      <TextField
        label="Match code"
        isRequired={false}
        isReadOnly={false}
        value={MatchCode}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Weight,
              Quantity,
              Price,
              PreVAT,
              Supplier,
              VAT,
              CurrentStockLevel,
              Cases,
              ProductId,
              NewPrice,
              NewVAT,
              UsedBy,
              MatchCode: value,
            };
            const result = onChange(modelFields);
            value = result?.MatchCode ?? value;
          }
          if (errors.MatchCode?.hasError) {
            runValidationTasks("MatchCode", value);
          }
          setMatchCode(value);
        }}
        onBlur={() => runValidationTasks("MatchCode", MatchCode)}
        errorMessage={errors.MatchCode?.errorMessage}
        hasError={errors.MatchCode?.hasError}
        {...getOverrideProps(overrides, "MatchCode")}
      ></TextField>
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
