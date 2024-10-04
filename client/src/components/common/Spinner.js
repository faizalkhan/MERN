import { Spinner } from "react-bootstrap";

export const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center my-auto">
      <Spinner animation="border" className="my-3" />
    </div>
  );
};
