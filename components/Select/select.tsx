"use client";
import React from "react";
import styles from "./select.module.scss";
import ReactSelect, { type DropdownIndicatorProps, components, OptionProps } from 'react-select'
import { ShevronDown } from "./shevronDown"
import { ShevronUp } from "./shevronUp";
import { ChartType } from "@/types/periodChartData";

interface IOption {
  value: ChartType;
  label: string;
}

export default function Select(props: {
  chartType: ChartType;
  setChartType: React.Dispatch<
    React.SetStateAction<ChartType>
  >;
}) {
  const options: IOption[] = [
    { value: "monthly", label: "За последний месяц" },
    { value: "yearly", label: "За последний год" },
    { value: "half-yearly", label: "За последние 6 месяцев" },
  ];

  const findLabelByValue = (
    value: ChartType,
  ): string => {
    const foundOption = options.find(
      (option) => option.value === value,
    ) as IOption;

    return foundOption.label;
  };

  const defaultValue: IOption = { value: props.chartType, label: findLabelByValue(props.chartType) };

  const handleOnChange = (option: unknown) => {
    if (!option) return null;

    props.setChartType((option as IOption).value);
  }

  const DropdownIndicator: React.FC<DropdownIndicatorProps> = props => {
    return (
      <components.DropdownIndicator {...{ ...props, className: styles.dropdownIndicator }}>
        {props.selectProps.menuIsOpen ? <ShevronDown /> : <ShevronUp />}
      </components.DropdownIndicator>
    );
  };

  const Option: React.FC<OptionProps> = (props) =>
    !props.isSelected ? (
      <components.Option {...props} />
    ) : null;

  return (
    <ReactSelect
      classNames={{
        container: () => styles.container,
        control: () => styles.control,
        singleValue: () => styles.singleValue,
        indicatorSeparator: () => styles.indicatorSeparator,
        menu: () => styles.menu,
        option: () => styles.option,
        dropdownIndicator: () => styles.dropdownIndicator,
      }}
      defaultValue={defaultValue}
      options={options}
      isSearchable={false}
      onChange={handleOnChange}
      components={{
        DropdownIndicator,
        Option,
      }}
    />
  );
}