import React from "react";

import "../styles/PaymentModeFilter.css";

const PaymentModeFilter = ({
   onFilterChange,
}) => {
  return (
    <>
    <div style={{marginBottom: "20px", marginTop: "20px"  }}>  
    
     <h2>Top Brands </h2>

      <div className="form-check text-start">
        <input
          className="form-check-input"
          type="checkbox"
          onChange={() => onFilterChange("DELL")}
        />
        <label className="form-check-label" htmlFor="filterEMI">
          Dell
        </label>
      </div>

      <div className="form-check text-start">
        <input
          className="form-check-input"
          type="checkbox"
          onChange={() => onFilterChange("HP")}
        />
        <label className="form-check-label" htmlFor="filterEMI">
          HP
        </label>
      </div>


      
      <div className="form-check text-start">
        <input
          className="form-check-input"
          type="checkbox"
          onChange={() => onFilterChange("LENOVO")}
        />
        <label className="form-check-label" htmlFor="filterEMI">
         Lenovo
        </label>
      </div>




      {/* <h2> Payemnt Mode </h2> */}




{/* 
      <div className="form-check text-start">
        <input
          className="form-check-input"
          type="checkbox"
          onChange={() => onFilterChange("EMI")}
        />

        <label className="form-check-label" htmlFor="inlineCheckbox1">
          EMI
        </label>
      </div>

       <div className="form-check text-start">
        <input
          className="form-check-input"
          type="checkbox"
          onChange={() => onFilterChange("PAID")}
        />
        <label className="form-check-label" htmlFor="filterEMI">
          PAID
        </label>
      </div>
 */}


      </div>
    </>
  );
};

export default PaymentModeFilter;
