/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { DailyFinancials } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function DailyFinancialsUpdateForm(props) {
  const {
    id: idProp,
    dailyFinancials: dailyFinancialsModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Gross: "",
    VATReturns: "",
    Net: "",
    Date: "",
  };
  const [Gross, setGross] = React.useState(initialValues.Gross);
  const [VATReturns, setVATReturns] = React.useState(initialValues.VATReturns);
  const [Net, setNet] = React.useState(initialValues.Net);
  const [Date, setDate] = React.useState(initialValues.Date);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = dailyFinancialsRecord
      ? { ...initialValues, ...dailyFinancialsRecord }
      : initialValues;
    setGross(cleanValues.Gross);
    setVATReturns(cleanValues.VATReturns);
    setNet(cleanValues.Net);
    setDate(cleanValues.Date);
    setErrors({});
  };
  const [dailyFinancialsRecord, setDailyFinancialsRecord] = React.useState(
    dailyFinancialsModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(DailyFinancials, idProp)
        : dailyFinancialsModelProp;
      setDailyFinancialsRecord(record);
    };
    queryData();
  }, [idProp, dailyFinancialsModelProp]);
  React.useEffect(resetStateValues, [dailyFinancialsRecord]);
  const validations = {
    Gross: [],
    VATReturns: [],
    Net: [],
    Date: [],
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
          Gross,
          VATReturns,
          Net,
          Date,
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
            DailyFinancials.copyOf(dailyFinancialsRecord, (updated) => {
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
      {...getOverrideProps(overrides, "DailyFinancialsUpdateForm")}
      {...rest}
    >
      <TextField
        label="Gross"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Gross}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Gross: value,
              VATReturns,
              Net,
              Date,
            };
            const result = onChange(modelFields);
            value = result?.Gross ?? value;
          }
          if (errors.Gross?.hasError) {
            runValidationTasks("Gross", value);
          }
          setGross(value);
        }}
        onBlur={() => runValidationTasks("Gross", Gross)}
        errorMessage={errors.Gross?.errorMessage}
        hasError={errors.Gross?.hasError}
        {...getOverrideProps(overrides, "Gross")}
      ></TextField>
      <TextField
        label="Vat returns"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={VATReturns}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Gross,
              VATReturns: value,
              Net,
              Date,
            };
            const result = onChange(modelFields);
            value = result?.VATReturns ?? value;
          }
          if (errors.VATReturns?.hasError) {
            runValidationTasks("VATReturns", value);
          }
          setVATReturns(value);
        }}
        onBlur={() => runValidationTasks("VATReturns", VATReturns)}
        errorMessage={errors.VATReturns?.errorMessage}
        hasError={errors.VATReturns?.hasError}
        {...getOverrideProps(overrides, "VATReturns")}
      ></TextField>
      <TextField
        label="Net"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Net}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Gross,
              VATReturns,
              Net: value,
              Date,
            };
            const result = onChange(modelFields);
            value = result?.Net ?? value;
          }
          if (errors.Net?.hasError) {
            runValidationTasks("Net", value);
          }
          setNet(value);
        }}
        onBlur={() => runValidationTasks("Net", Net)}
        errorMessage={errors.Net?.errorMessage}
        hasError={errors.Net?.hasError}
        {...getOverrideProps(overrides, "Net")}
      ></TextField>
      <TextField
        label="Date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={Date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Gross,
              VATReturns,
              Net,
              Date: value,
            };
            const result = onChange(modelFields);
            value = result?.Date ?? value;
          }
          if (errors.Date?.hasError) {
            runValidationTasks("Date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("Date", Date)}
        errorMessage={errors.Date?.errorMessage}
        hasError={errors.Date?.hasError}
        {...getOverrideProps(overrides, "Date")}
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
          isDisabled={!(idProp || dailyFinancialsModelProp)}
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
              !(idProp || dailyFinancialsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
