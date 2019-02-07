import React, { Component } from 'react';
import './styles.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Search from '../containers/SearchContainer';

class FormikForm extends Component {
  handleSubmit = (values, { 
      props = this.props, 
      setSubmitting 
    }) => {
 
    //process form submission here
    //done submitting, set submitting to false
    setSubmitting(false);
    return;
  };

  render() {
    return (
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          rePassword: '',
          phone: '',
          day: '',
          month: '',
          year: '',
          country: '',
          city: ''
        }}
        validate={values => {
          let errors = {};

          // check for required
          for (let key in values) {
            if (!values[key]) {
              errors[key] = `${key} is required`;
            }
          }

          // check for username length
          if (values.username && values.username.length < 6) {
            errors.username = 'username must be at least 6 characters long';
          }

          // check for valid email
          if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'invalid email address';
          }

          // check for strong password
          if (values.password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i.test(values.password)) {
            errors.password = `
              password must contain at least 1 lowercase alphabetical character\n
              password must contain at least 1 uppercase alphabetical character\n
              password must contain at least 1 numeric character\n
              password must contain at least one special character\n
              password must be at least 8 characters long\n
            `;
          }

          if (values.rePassword && values.rePassword !== values.password) {
            errors.rePassword = 'password again must be equal to password';
          }

          return errors;
        }}
        onSubmit={this.handleSubmit}
        render={formProps => {
          return (
            <Form>
              <Field 
                type="text" 
                name="username" 
                placeholder="Username" 
                autoComplete="off" 
              /> 
              <ErrorMessage name="username" className="error" component="span" />
              
              <Field 
                type="text" 
                name="email" 
                placeholder="Email Address" 
                autoComplete="off" 
              /> 
              <ErrorMessage name="email" className="error" component="span" />
              
              <Field 
                type="password" 
                name="password" 
                placeholder="Passsword" 
                autoComplete="off" 
              /> 
              <ErrorMessage name="password" className="error" component="span" />

              <Field 
                type="password" 
                name="rePassword" 
                placeholder="Password again" 
                autoComplete="off" 
              /> 
              <ErrorMessage name="rePassword" className="error" component="span" />

              <div className="flex">
                <div>
                  <Field 
                    component="select"
                    name="day" 
                    placeholder="Day" 
                  >
                    <option value="">Day</option>
                    {Array.from(Array(31).keys()).map(item => (
                      <option key={item} value={item + 1}>{item + 1}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="day" className="error" component="span" />
                </div>
                <div>
                  <Field 
                    component="select"
                    name="month" 
                    placeholder="Month" 
                  >
                    <option value="">Month</option>
                    {Array.from(Array(12).keys()).map(item => (
                      <option key={item} value={item + 1}>{item + 1}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="month" className="error" component="span" />
                </div>
                <div>
                  <Field 
                    component="select"
                    name="year" 
                    placeholder="Year" 
                  >
                    <option value="">Year</option>
                    {Array.from(Array(101).keys()).reverse().map(item => (
                      <option key={item} value={item + 1919}>{item + 1919}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="year" className="error" component="span" />
                </div>
              </div>

              <Field 
                component={Search}
                name="country" 
                placeholder="Country" 
              />

              <button 
                type="submit" 
                disabled={formProps.isSubmitting}>
                  Register Form
              </button>
            </Form>
          );
        }}
      />
    );
  }
}

export default FormikForm;
