// src/components/SignupForm.js
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import axiosInstance from './PageElements/axiosInstance';

const theme = createTheme();

const validationSchema = yup.object({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    handle: yup.string().required('Handle is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string()
      .matches(/^.{6,}$/, 'Password must be at least 6 characters')
      .required('Password is required'),
    password_confirmation: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation is required'),
  });

function SignupForm() {
    return (
    <>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Box
            sx={{
              width: '100%',
              maxHeight: '650px',
              maxWidth: '400px',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Formik
              initialValues={{
                first_name: '',
                last_name: '',
                handle: '',
                email: '',
                password: '',
                password_confirmation: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, validateForm }) => {
                validateForm().then(errors => {
                  if (Object.keys(errors).length) {
                    alert('Please correct the errors before submitting.');
                  } else {
                    alert(JSON.stringify(values, null, 2));
                    const user = {"user": values};
                    axiosInstance.post('http://localhost:3001/api/v1/signup', user);
                  }
                  setSubmitting(false);
                });
              }}
            >
              <Form>
                <Field
                  as={TextField}
                  name="first_name"
                  type="text"
                  label="First Name"
                  fullWidth
                  margin="normal"
                />
                <ErrorMessage name="first_name" component="div" />

                <Field
                  as={TextField}
                  name="last_name"
                  type="text"
                  label="Last Name"
                  fullWidth
                  margin="normal"
                />
                <ErrorMessage name="last_name" component="div" />

                <Field
                  as={TextField}
                  name="handle"
                  type="text"
                  label="Handle"
                  fullWidth
                  margin="normal"
                />
                <ErrorMessage name="handle" component="div" />

                <Field
                  as={TextField}
                  name="email"
                  type="text"
                  label="Email"
                  fullWidth
                  margin="normal"
                />
                <ErrorMessage name="email" component="div" />

                <Field
                  as={TextField}
                  name="password"
                  type="password"
                  label="Password"
                  fullWidth
                  margin="normal"
                />
                <ErrorMessage name="password" component="div" />

                <Field
                  as={TextField}
                  name="password_confirmation"
                  type="password"
                  label="Confirm Password"
                  fullWidth
                  margin="normal"
                />
                <ErrorMessage name="password_confirmation" component="div" />
        
                <Button type="submit" color="primary" variant="contained" fullWidth>
                  Submit
                </Button>
                <Button component={Link} to='/login' style={{ marginTop: '10px', width: '100%' }}>
                  Login
                </Button>
              </Form>
            </Formik>
          </Box>
        </Box>
      </ThemeProvider>
      </>
    ); 
}

export default SignupForm;
