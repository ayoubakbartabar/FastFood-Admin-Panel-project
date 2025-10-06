import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  fetchNavbarData,
  updateNavbarData,
} from "../../types/server/navbarApi";
import type { NavbarDataProps } from "../../types/server/navbarApi";
import "./NavbarPage.css";

// Validation schema: only allow valid URLs for logos
const NavbarSchema = Yup.object().shape({
  logo: Yup.array()
    .of(
      Yup.string()
        .url("Invalid URL") // Only valid URL is accepted
        .required("Logo URL is required")
    )
    .min(1, "At least one logo is required"),
  Menu: Yup.array().of(
    Yup.object().shape({
      id: Yup.number().required(),
      title: Yup.string().required("Menu title is required"),
      href: Yup.string().required("Menu href is required"),
    })
  ),
  Icon: Yup.array().of(
    Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string().required("Icon name is required"),
    })
  ),
});

const NavbarPage: React.FC = () => {
  const [initialValues, setInitialValues] = useState<NavbarDataProps | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // Fetch navbar data on component mount
  useEffect(() => {
    const getData = async () => {
      const data = await fetchNavbarData();
      if (data) setInitialValues(data);
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!initialValues) return <div>No navbar data found</div>;

  // Handle form submission
  const handleSubmit = async (
    values: NavbarDataProps,
    { setSubmitting }: any
  ) => {
    try {
      console.log("Submitting data:", values);
      await updateNavbarData(values); // PUT request to update navbar
      alert("Navbar updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update navbar!");
    }
    setSubmitting(false);
  };

  return (
    <div className="navbar-form">
      <h2>Edit Navbar</h2>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={NavbarSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form>
            {/* Logos Section */}
            <FieldArray name="logo">
              {({ push, remove }) => (
                <div className="form-group">
                  <label>Logos:</label>
                  {values.logo.map((url, idx) => (
                    <div key={idx} className="array-item">
                      {/* Display logo preview */}
                      {url && (
                        <img
                          src={url}
                          alt={`Logo ${idx}`}
                          className="logo-preview"
                        />
                      )}
                      {/* Input field for URL only */}
                      <Field
                        type="text"
                        name={`logo.${idx}`}
                        placeholder="https://example.com/logo.png"
                        className="new-product-input"
                      />
                      <button
                        type="button"
                        className="btn-remove"
                        onClick={() => remove(idx)}
                      >
                        Remove
                      </button>
                      <ErrorMessage
                        name={`logo.${idx}`}
                        component="div"
                        className="error"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn-add"
                    onClick={() => push("")}
                  >
                    Add Logo
                  </button>
                </div>
              )}
            </FieldArray>

            {/* Menu Items Section */}
            <FieldArray name="Menu">
              {({ push, remove }) => (
                <div className="form-group">
                  <label>Menu Items:</label>
                  {values.Menu.map((item, idx) => (
                    <div key={item.id} className="array-item">
                      <Field name={`Menu.${idx}.title`} placeholder="Title" />
                      <Field name={`Menu.${idx}.href`} placeholder="Href" />
                      <button
                        type="button"
                        className="btn-remove"
                        onClick={() => remove(idx)}
                      >
                        Remove
                      </button>
                      <ErrorMessage
                        name={`Menu.${idx}.title`}
                        component="div"
                        className="error"
                      />
                      <ErrorMessage
                        name={`Menu.${idx}.href`}
                        component="div"
                        className="error"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn-add"
                    onClick={() =>
                      push({ id: Date.now(), title: "", href: "" })
                    }
                  >
                    Add Menu
                  </button>
                </div>
              )}
            </FieldArray>

            {/* Icons Section */}
            <FieldArray name="Icon">
              {({ push, remove }) => (
                <div className="form-group">
                  <label>Icons:</label>
                  {values.Icon.map((icon, idx) => (
                    <div key={icon.id} className="array-item">
                      <Field
                        name={`Icon.${idx}.name`}
                        placeholder="Icon name"
                      />
                      <button
                        type="button"
                        className="btn-remove"
                        onClick={() => remove(idx)}
                      >
                        Remove
                      </button>
                      <ErrorMessage
                        name={`Icon.${idx}.name`}
                        component="div"
                        className="error"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn-add"
                    onClick={() => push({ id: Date.now(), name: "" })}
                  >
                    Add Icon
                  </button>
                </div>
              )}
            </FieldArray>

            {/* Submit button */}
            <button
              type="submit"
              className="btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NavbarPage;
