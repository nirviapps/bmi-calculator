import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import FormInput from "./FormInput";

const BmiCalculator = (props) => {
  const { getBmiValue } = props;

  const [heightUnit, setHeightUnit] = useState("cm");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [unit, setUnit] = useState("Metric");
  const [count, setCount] = useState({
    heightCount: "0",
    inchesCount: "0",
    weightCount: "0",
  });

  // const[count,setCount]= useState({
  //    data:{
  //     heightCount:'0',
  //     inchesCount:'0',
  //     weightCount:'0'

  //    }
  // });

  // const{heightCount,inchesCount,weightCount} = count.data;

  const { heightCount, inchesCount, weightCount } = count;

  useEffect(() => {
    metricBMI(heightCount, weightCount);
    imperialBMI(heightCount, weightCount,inchesCount);
  }, [heightCount, weightCount]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    //   const {data} = count;

    //   setCount({
    //     data :{
    //       ...data,
    //       [name]:value
    //     }
    //    });

    setCount((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectTag = (e) => {
    setUnit(e.target.value);
    if (e.target.value === "Metric") {
      setHeightUnit("cm");
      setWeightUnit("kg");
    } else {
      setHeightUnit("ft");
      setWeightUnit("lbs");
    }
  };

  const metricBMI = (height, weight) => {
    if (height > 0 && weight > 0) {
      const heightToMeter = height / 100;
      const bmi = weight / (heightToMeter * heightToMeter);
      getBmiValue(Math.round(bmi));
    }
  };

  const imperialBMI = (height,weight,inches) =>{
    if(height > 0 && weight > 0 && inches > 0)
    {
      // 12 inches -> 1 foot 
      //convert feet to inches and add it to inches value
     const heightoInches = (height * 12) + parseInt(inches);
     const bmi = 703 * (weight / (heightoInches * heightoInches));
     getBmiValue(Math.round(bmi));
    }
  }
  const handleReset = (e) => {
    e.preventDefault();
    getBmiValue(0);
    setUnit("Metric");
    setCount({
      heightCount: "0",
      inchesCount: "0",
      weightCount: "0",
    });
    setHeightUnit("cm");
    setWeightUnit("kg");
  };
  return (
    <>
      <div className="bmi-inputs">
        <div className="input-fields">
          <div>
            <span className="label-unit">Unit</span>
            <div className="unit">
              <select
                name="unit"
                value={unit}
                className="form-control form-control-sm"
                onChange={handleSelectTag}
              >
                <option value="Metric">Metric</option>
                <option value="Imperial">Imperial</option>
              </select>
            </div>
          </div>

          <FormInput
            type="text"
            name="heightCount"
            title={`Height (${heightUnit})`}
            value={heightCount}
            onChange={onChangeInput}
          />
          {unit === "Imperial" ? (
            <FormInput
              type="text"
              name="inchesCount"
              title={` (in)`}
              value={inchesCount}
              onChange={onChangeInput}
            />
          ) : (
            ""
          )}

          <FormInput
            type="text"
            name="weightCount"
            title={`Weight (${weightUnit})`}
            value={weightCount}
            onChange={onChangeInput}
          />
        </div>

        <button onClick={handleReset} className="button" type="submit">
          Reset
        </button>
      </div>
    </>
  );
};

BmiCalculator.propTypes = {
  getBmiValue: PropTypes.func.isRequired,
};
export default BmiCalculator;
