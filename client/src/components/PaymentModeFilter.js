import React from "react";

import "../styles/PaymentModeFilter.css";

const PaymentModeFilter = ({
  filterEMI,
  filterCOD,
  filterPAID,
  onFilterChange,
}) => {
  return (
    <>
    <div style={{marginBottom: "20px", marginTop: "20px"  }}>  
      <div class="form-check form-check-inline">
        <input
          className="form-check-input"
          type="checkbox"
          onChange={() => onFilterChange("EMI")}
        />

        <label class="form-check-label" for="inlineCheckbox1">
          EMI
        </label>
      </div>

      <div class="form-check form-check-inline">
        <input
          className="form-check-input"
          type="checkbox"
          onChange={() => onFilterChange("COD")}
        />
        <label className="form-check-label" htmlFor="filterEMI">
          COD
        </label>
      </div>

      <div class="form-check form-check-inline">
        <input
          className="form-check-input"
          type="checkbox"
          onChange={() => onFilterChange("PAID")}
        />
        <label className="form-check-label" htmlFor="filterEMI">
          PAID
        </label>
      </div>
      </div>
    </>
  );
};

export default PaymentModeFilter;
