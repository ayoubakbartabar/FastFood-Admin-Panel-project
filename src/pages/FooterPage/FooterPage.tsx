import React, { useEffect, useState } from "react";
import {
  fetchFooterData,
  updateFooterData,
} from "../../types/server/footerApi";
import type {
  FooterDataProps,
  LinkItem,
  HourItem,
  SocialItem,
} from "../../types/server/footerApi";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./FooterPage.css";

// Yup validation
const FooterSchema = Yup.object().shape({
  company: Yup.object().shape({
    name: Yup.string().required("Company name is required"),
    description: Yup.string().required("Description is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  }),
  links: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required("Title required"),
      href: Yup.string().required("Href required"),
    })
  ),
  hours: Yup.array().of(
    Yup.object().shape({
      day: Yup.string().required("Day required"),
      time: Yup.string().required("Time required"),
    })
  ),
  newsletter: Yup.object().shape({
    placeholder: Yup.string().required("Placeholder required"),
    description: Yup.string().required("Description required"),
  }),
  social: Yup.array().of(
    Yup.object().shape({
      platform: Yup.string().required("Platform required"),
      href: Yup.string().required("Href required"),
    })
  ),
  copyright: Yup.string().required("Copyright required"),
});

const FooterPage: React.FC = () => {
  const [initialValues, setInitialValues] = useState<FooterDataProps | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchFooterData();
      if (result) setInitialValues(result);
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!initialValues) return <div>No footer data found</div>;

  const handleSubmit = async (
    values: FooterDataProps,
    { setSubmitting }: any
  ) => {
    try {
      await updateFooterData(values);
      alert("Footer updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update footer!");
    }
    setSubmitting(false);
  };

  return (
    <footer className="footer-form">
      <h2>Edit Footer</h2>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={FooterSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form>
            {/* Company Info */}
            <h3>Company Info</h3>
            <div className="form-group">
              <label>Name:</label>
              <Field type="text" name="company.name" />
              <ErrorMessage
                name="company.name"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <Field as="textarea" name="company.description" />
              <ErrorMessage
                name="company.description"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <Field type="text" name="company.address" />
              <ErrorMessage
                name="company.address"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <Field type="text" name="company.phone" />
              <ErrorMessage
                name="company.phone"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <Field type="email" name="company.email" />
              <ErrorMessage
                name="company.email"
                component="div"
                className="error"
              />
            </div>

            {/* Links */}
            <h3>Links</h3>
            <FieldArray name="links">
              {({ push, remove }) => (
                <div>
                  {values.links.map((link: LinkItem, idx: number) => (
                    <div key={link.id} className="form-array-item">
                      <Field name={`links[${idx}].title`} placeholder="Title" />
                      <Field name={`links[${idx}].href`} placeholder="Href" />
                      <button type="button" onClick={() => remove(idx)}>
                        Remove
                      </button>
                      <ErrorMessage
                        name={`links[${idx}].title`}
                        component="div"
                        className="error"
                      />
                      <ErrorMessage
                        name={`links[${idx}].href`}
                        component="div"
                        className="error"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({ id: Date.now(), title: "", href: "" })
                    }
                  >
                    Add Link
                  </button>
                </div>
              )}
            </FieldArray>

            {/* Hours */}
            <h3>Working Hours</h3>
            <FieldArray name="hours">
              {({ push, remove }) => (
                <div>
                  {values.hours.map((hour: HourItem, idx: number) => (
                    <div key={idx} className="form-array-item">
                      <Field name={`hours[${idx}].day`} placeholder="Day" />
                      <Field name={`hours[${idx}].time`} placeholder="Time" />
                      <button type="button" onClick={() => remove(idx)}>
                        Remove
                      </button>
                      <ErrorMessage
                        name={`hours[${idx}].day`}
                        component="div"
                        className="error"
                      />
                      <ErrorMessage
                        name={`hours[${idx}].time`}
                        component="div"
                        className="error"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ day: "", time: "" })}
                  >
                    Add Hour
                  </button>
                </div>
              )}
            </FieldArray>

            {/* Newsletter */}
            <h3>Newsletter</h3>
            <div className="form-group">
              <label>Placeholder:</label>
              <Field type="text" name="newsletter.placeholder" />
              <ErrorMessage
                name="newsletter.placeholder"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <Field as="textarea" name="newsletter.description" />
              <ErrorMessage
                name="newsletter.description"
                component="div"
                className="error"
              />
            </div>

            {/* Social */}
            <h3>Social</h3>
            <FieldArray name="social">
              {({ push, remove }) => (
                <div>
                  {values.social.map((s: SocialItem, idx: number) => (
                    <div key={s.id} className="form-array-item">
                      <Field
                        name={`social[${idx}].platform`}
                        placeholder="Platform"
                      />
                      <Field name={`social[${idx}].href`} placeholder="Href" />
                      <button type="button" onClick={() => remove(idx)}>
                        Remove
                      </button>
                      <ErrorMessage
                        name={`social[${idx}].platform`}
                        component="div"
                        className="error"
                      />
                      <ErrorMessage
                        name={`social[${idx}].href`}
                        component="div"
                        className="error"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({ id: Date.now(), platform: "", href: "" })
                    }
                  >
                    Add Social
                  </button>
                </div>
              )}
            </FieldArray>

            {/* Copyright */}
            <h3>Copyright</h3>
            <div className="form-group">
              <Field type="text" name="copyright" />
              <ErrorMessage
                name="copyright"
                component="div"
                className="error"
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </Form>
        )}
      </Formik>
    </footer>
  );
};

export default FooterPage;
