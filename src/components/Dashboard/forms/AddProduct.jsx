import React, { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../redux/slices/authSlice";
import axios from "../../../api/axios";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string(),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be non-negative"),
  category: Yup.string().required("Category is required"),
  manufacturer: Yup.string(),
  image: Yup.mixed(),
});

const AddProduct = () => {
  const accessToken = useSelector(selectAccessToken);

  const initialValues = {
    name: "",
    description: "",
    price: 0,
    category: "",
    manufacturer: "",
    image: "",
  };

  const onSubmit = async (values, actions) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("category", values.category);
    formData.append("manufacturer", values.manufacturer);
    formData.append("image", values.image);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      // Create a new product in database after uploading the image to AWS S3
      await axios.post("/api/products/", formData, config);

      toast("Product added successfully");
      actions.resetForm({
        values: {
          ...initialValues,
          image: "",
        },
      });
    } catch (error) {
      console.error("Error creating product:", error.message);
    }
  };

  const {
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    isValid,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit,
  });

  const fileInputRef = useRef(null);

  return (
    <form onSubmit={handleSubmit} className="container p-5 h-75">
      <h2 className="h2 fw-bold mb-4 text-center text-primary">Product Form</h2>
      <div className="form-group mb-3">
        <label htmlFor="name" className="fw-bold mb-2 mx-1">
          Name:
        </label>
        <input
          autoComplete="off"
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-control ${
            touched.name && errors.name ? "is-invalid" : ""
          }`}
        />
        {touched.name && errors.name ? (
          <div className="invalid-feedback">{errors.name}</div>
        ) : null}
      </div>
      <div className="form-group mb-3">
        <label htmlFor="description" className="fw-bold mb-2 mx-1">
          Description:
        </label>
        <textarea
          autoComplete="off"
          as="textarea"
          name="description"
          id="description"
          placeholder="Description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-control ${
            touched.description && errors.description ? "is-invalid" : ""
          }`}
        />
        {touched.description && errors.description ? (
          <div className="invalid-feedback">{errors.description}</div>
        ) : null}
      </div>
      <div className="form-group mb-3">
        <label htmlFor="price" className="fw-bold mb-2 mx-1">
          Price:
        </label>
        <input
          autoComplete="off"
          type="number"
          name="price"
          id="price"
          placeholder="Price"
          value={values.price}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-control ${
            touched.price && errors.price ? "is-invalid" : ""
          }`}
        />
        {touched.price && errors.price ? (
          <div className="invalid-feedback">{errors.price}</div>
        ) : null}
      </div>
      <div className="form-group mb-3">
        <label htmlFor="category" className="fw-bold mb-2 mx-1">
          Category:
        </label>
        <input
          autoComplete="off"
          type="text"
          name="category"
          id="category"
          placeholder="Category"
          value={values.category}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-control ${
            touched.category && errors.category ? "is-invalid" : ""
          }`}
        />
        {touched.category && errors.category ? (
          <div className="invalid-feedback">{errors.category}</div>
        ) : null}
      </div>
      <div className="form-group mb-3">
        <label htmlFor="manufacturer" className="fw-bold mb-2 mx-1">
          Manufacturer:
        </label>
        <input
          autoComplete="off"
          type="text"
          name="manufacturer"
          id="manufacturer"
          placeholder="Manufacturer"
          value={values.manufacturer}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-control ${
            touched.manufacturer && errors.manufacturer ? "is-invalid" : ""
          }`}
        />
        {touched.manufacturer && errors.manufacturer ? (
          <div className="invalid-feedback">{errors.manufacturer}</div>
        ) : null}
      </div>
      <div className="form-group mb-3">
        <label htmlFor="image" className="fw-bold mb-2 mx-1">
          Image:
        </label>
        <input
          autoComplete="off"
          type="file"
          name="image"
          id="image"
          ref={fileInputRef}
          onChange={(e) => {
            setFieldValue("image", e.currentTarget.files[0]);
          }}
          onBlur={handleBlur}
          className={`form-control ${
            touched.image && errors.image ? "is-invalid" : ""
          }`}
        />
        {touched.image && errors.image ? (
          <div className="invalid-feedback">{errors.image}</div>
        ) : null}
      </div>
      <div className="form-group mb-3">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={!isValid}
          onClick={() => {
            fileInputRef.current.value = "";
          }}
        >
          Create Product
        </button>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </form>
  );
};

export default AddProduct;
