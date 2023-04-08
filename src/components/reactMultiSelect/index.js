/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { useEffect } from "react";
import Select from "react-select";
import axios from "../../axios";

const index = ({ data, selected, editValue }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selectedOption) => {
    setSelectedOptions(selectedOption);
  };


  console.log(selectedOptions);

  useEffect(() => {
    if (editValue) {
      const API = async () => {
        const { data } = await axios.get("/lab/all");

        const filteredData = data.data.filter((long) =>
          editValue.some((short) => short.id === long.id)
        );

        const getName = filteredData.map((i) => {
          return {
            label: i.name,
            value: i.id,
          };
        });

        setSelectedOptions(getName);
      };
      API();
    }
  }, [selected, editValue]);

  useEffect(() => {
    const getselectedID = selectedOptions.map((i) => {
      return { id: i.value };
    });
    selected(getselectedID);
  }, [selectedOptions]);

  return (
    <div>
      <Select
        isMulti
        options={data}
        value={selectedOptions}
        onChange={handleChange}
        styles={{
          control: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "#FC916A" : "black",
            background: state.isSelected ? "#fc916a3a" : "white",
            padding: 3,
            paddingLeft: 5,
            borderRadius: "7px",
          }),
        }}
      />
    </div>
  );
};

export default index;
