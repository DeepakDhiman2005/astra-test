import React from "react";
import DatatableView from "components/common/DatatableView";
import { useState } from "react";
import { validateCreditors, validateField } from "./validation";
import Columns from "./columns";
import useFetchData from "common/customHooks/useFetchData";
import FilterData from "components/common/filterData";
import PreviewModal from "components/common/previewModal";
import UpsertCreditors from "./upsertCreditors";
import { toastify } from "common/helpers/toast";
import axios from "axios";

const ViewCreditors = () => {
  const [pending, setPending] = useState(true);
  const [modal, setModal] = useState(false);
  const [images, setImages] = useState([]);
  const [previewModal, setPreviewModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const initialValues = {
    amount: "",
    date: "",
    type: "",
    partyName: "",
    reference: "",
    desciption: "",
    referenceImage: "",
  };
  const [isCreditors, setIsCreditors] = useState(initialValues);

  const toggleModal = () => {
    setModal((prevModal) => !prevModal);
  };

  const togglePreviewModal = () => {
    setPreviewModal(!previewModal);
  };
  const [tableData, refreshData] = useFetchData(
    "https://jewellers-erp.onrender.com/chartOfAccount/liability",
    setPending,
    true,
    "Creditors"
  );
  console.log(tableData);
  const saveData = async () => {
    const newData = { ...isCreditors };

    if (isCreditors.receivedOrSent === "Own") {
      newData.partyName = "";
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        partyName: "",
      }));
    }
    const errors = validateCreditors(isCreditors);
    setValidationErrors(errors);

    // Check if there are no errors before proceeding
    if (Object.keys(errors).length === 0) {
      const updatedData = { liabilityType: "Creditors", ...newData };
      console.log(updatedData);

      const formData = new FormData();

      for (const key in updatedData) {
        const value = updatedData[key];
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }

      images.forEach((imageData) => {
        formData.append("referenceImage", imageData);
      });

      try {
        await axios
          .post(`https://aestraswift.ocpl.tech/jewellers/uploadLiability`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.status !== 200) return;
            toastify({ msg: response.data, type: "success" });
            setIsCreditors(initialValues);
            refreshData();
            toggleModal();
          })
          .catch((error) => {
            console.log("error1", error);
            if (error.response?.data) {
              console.log("Error fetching data:", error.response.data);
              toastify({ msg: error.response.data, type: "error" });
            } else {
              console.log("Error fetching data:", error.message);
              toastify({ msg: error.message, type: "error" });
            }
          });
      } catch (error) {
        console.log("Error fetching data:", error);
        if (error.response?.data) {
          // console.log("we are here")
          console.log("Error fetching data:", error.response.data);
          toastify({ msg: error.response.data, type: "error" });
        } else {
          // console.log("we are here1")

          console.log("Error fetching data:", error.message);
          toastify({ msg: error.message, type: "error" });
        }
      }
    }
  };

  const handlePreviewButton = (row) => {
    setSelectedRow(row);
    togglePreviewModal();
  };

  return (
    <>
      <FilterData setFilteredData={setFilteredData} tableData={tableData} />
      <DatatableView
        tableProps={{
          data: filteredData,
          columns: Columns(handlePreviewButton),
          loading: pending,
        }}
        handleSubmit={saveData}
        modalBody={
          <UpsertCreditors
            setImages={setImages}
            isCreditors={isCreditors}
            setIsCreditors={setIsCreditors}
            validationErrors={validationErrors}
            validateField={validateField}
            setValidationErrors={setValidationErrors}
          />
        }
        componentName="Creditor"
        isNewData={isCreditors}
        modal={modal}
        toggleModal={toggleModal}
        below={true}
      />
      <PreviewModal
        previewModal={previewModal}
        setPreviewModal={setPreviewModal}
        selectedRow={selectedRow}
        togglePreviewModal={togglePreviewModal}
      />
    </>
  );
};

export default ViewCreditors;
