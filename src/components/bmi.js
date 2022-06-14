import React,{useState} from 'react';
import BmiCalculator from "./BmiCalculator";

const Bmi = () =>{
    const[bmiValue,setBmiValue] = useState(0);
    

   const getBmiClass = bmi =>{
    if(bmi >= 1 && bmi <= 18.5) return 'Underweight';
    if(bmi >=18.5 && bmi <=24.9) return 'Normal weight';
    if(bmi >=24.9 && bmi <=29.9) return 'Overweight';
    if(bmi >= 30) return 'Obese';
    

   }

   const bmiBackgroundColor = (bmi) => {
     
    if(bmi >= 1 && bmi <= 18.5) return '#f1c40f';
    if(bmi >=18.5 && bmi <=24.9) return '#16a085';
    if(bmi >=24.9 && bmi <=29.9) return '#e67e22';
    if(bmi >= 30) return '#e84118';

   }
  
   const bmiCategory = getBmiClass(bmiValue);

   let bmiClass = '';
   if(bmiValue > 0 && bmiCategory)
   {
    bmiClass = bmiCategory.split(' ')[0].toLowerCase();

   }
    return(
        <>
         <div className="calculator" style={{backgroundColor: bmiBackgroundColor(bmiValue) }}>
              <h3>Body Mass Index Calculator</h3>
              <div className="bmi-result-cont">
                 <div className="bmi-result">
                       <div className="bmi-result-num">

                       Body Mass Index (BMI) = {bmiValue}
                       </div>

                       <div className={`bmi-category ${bmiClass}`}>
                         {bmiCategory}
                       </div>
                 </div>
              </div>

              <BmiCalculator getBmiValue={setBmiValue}/>
         </div>
        </>
    );

}

export default Bmi;