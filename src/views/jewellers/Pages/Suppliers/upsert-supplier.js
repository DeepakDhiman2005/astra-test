import { ThemeContext } from "common/context/themeContext";
import React from "react";
import { useContext } from "react";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";

const UpsertSupplier = ({
  isSupplier,
  setIsSupplier,
  validationErrors,
  validateField,
  setValidationErrors,
}) => {
  const { darkTheme } = useContext(ThemeContext);
  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    setIsSupplier((prevSupplier) => ({
      ...prevSupplier,
      [fieldName]: value,
    }));

    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };
  return (
    <Form>
      <Container>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`} htmlFor="name">
                Supplier Name:
              </label>
              <input
                id="name"
                className="form-control py-4 px-2"
                placeholder="Enter supplier name"
                type="text"
                value={isSupplier.name}
                onChange={(e) => handleInputChange(e, "name")}
              />
              {validationErrors.name && (
                <p className="text-danger">{validationErrors.name}</p>
              )}
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`} htmlFor="contact">
                Contact:
              </label>
              <input
                id="contact"
                className="form-control py-4 px-2"
                placeholder="Enter contact"
                type="text"
                value={isSupplier.contact}
                onChange={(e) => handleInputChange(e, "contact")}
              />
              {validationErrors.contact && (
                <p className="text-danger">{validationErrors.contact}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`} htmlFor="address">
                Address:
              </label>
              <input
                id="address"
                className="form-control py-4 px-2"
                placeholder="Enter address"
                type="text"
                value={isSupplier.address}
                onChange={(e) => handleInputChange(e, "address")}
              />
              {validationErrors.address && (
                <p className="text-danger">{validationErrors.address}</p>
              )}
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <label
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
                htmlFor="pincode"
              >
                Pincode:
              </label>
              <input
                id="pincode"
                className="form-control py-4 px-2"
                type="text"
                placeholder="Enter pincode"
                value={isSupplier.pincode}
                onChange={(e) => handleInputChange(e, "pincode")}
              />
              {validationErrors.pincode && (
                <p className="text-danger">{validationErrors.pincode}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
export default UpsertSupplier;
