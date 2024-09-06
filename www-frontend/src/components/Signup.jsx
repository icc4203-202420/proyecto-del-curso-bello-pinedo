import { useState } from 'react';
import axiosInstance from './PageElements/axiosInstance.jsx';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, CssBaseline, ThemeProvider, createTheme, Typography } from '@mui/material';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: {
      main: '#666666',  // Example for primary color (green)
    },
    secondary: {
      main: '#FF5722',  // Example for secondary color (orange)
    },
    background: {
      default: '#1E1E1E',  // Light background color
    },
    text: {
      primary: '#111111',  // Custom text color
    }
  },
});

const validationSchema = yup.object({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  handle: yup.string().required('Handle is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .matches(/^.{6,}$/, 'The password must be at least 6 characters')
    .required('Password is required'),
  password_confirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

function SignupForm({ setCurrentUser }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '70px 0' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ width: '100%', maxWidth: '400px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <Typography variant="h4" sx={{ color: '#f5c000', mb: 2, textAlign: 'center' }}>
            Sign Up
          </Typography>
          <Formik
            initialValues={{ first_name: '', last_name: '', handle: '', email: '', password: '', password_confirmation: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, isValid, validateForm }) => {
              validateForm().then(errors => {
                if (Object.keys(errors).length) {
                  alert('Please correct the errors before submitting.');
                } else {
                  alert('User created successfully'); 
                  const user = {"user": values}
                  axiosInstance.post('/signup', user)
                  .then(() => {
                    navigate('/login');
                  })
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#f5c000', // Border color
                    },
                    '&:hover fieldset': {
                      borderColor: '#e0b002', // Border color on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#d4a000', // Border color when focused
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#f5c000', // Label color
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#d4a000', // Label color when focused
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#000000', // Text color
                  },
                }}
                InputLabelProps={{
                  style: { color: '#f5c000' }, // Initial label color
                }}
                InputProps={{
                  style: { color: '#f5c000' }, // Initial text color
                }}
              />
              <ErrorMessage name="first_name" component="div" />
              <Field
                as={TextField}
                name="last_name"
                type="text"
                label="Last Name"
                fullWidth
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#f5c000', // Border color
                    },
                    '&:hover fieldset': {
                      borderColor: '#e0b002', // Border color on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#d4a000', // Border color when focused
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#f5c000', // Label color
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#d4a000', // Label color when focused
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#000000', // Text color
                  },
                }}
                InputLabelProps={{
                  style: { color: '#f5c000' }, // Initial label color
                }}
                InputProps={{
                  style: { color: '#f5c000' }, // Initial text color
                }}
              />
              <ErrorMessage name="last_name" component="div" />
              <Field
                as={TextField}
                name="handle"
                type="text"
                label="Handle"
                fullWidth
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#f5c000', // Border color
                    },
                    '&:hover fieldset': {
                      borderColor: '#e0b002', // Border color on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#d4a000', // Border color when focused
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#f5c000', // Label color
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#d4a000', // Label color when focused
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#000000', // Text color
                  },
                }}
                InputLabelProps={{
                  style: { color: '#f5c000' }, // Initial label color
                }}
                InputProps={{
                  style: { color: '#f5c000' }, // Initial text color
                }}
              />
              <ErrorMessage name="handle" component="div" />
              <Field
                as={TextField}
                name="email"
                type="email"
                label="Enter Email"
                fullWidth
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#f5c000', // Border color
                    },
                    '&:hover fieldset': {
                      borderColor: '#e0b002', // Border color on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#d4a000', // Border color when focused
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#f5c000', // Label color
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#d4a000', // Label color when focused
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#000000', // Text color
                  },
                }}
                InputLabelProps={{
                  style: { color: '#f5c000' }, // Initial label color
                }}
                InputProps={{
                  style: { color: '#f5c000' }, // Initial text color
                }}
              />
              <ErrorMessage name="email" component="div" />
              <Field
                as={TextField}
                name="password"
                type="password"
                label="Enter Password"
                fullWidth
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#f5c000', // Border color
                    },
                    '&:hover fieldset': {
                      borderColor: '#e0b002', // Border color on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#d4a000', // Border color when focused
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#f5c000', // Label color
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#d4a000', // Label color when focused
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#000000', // Text color
                  },
                }}
                InputLabelProps={{
                  style: { color: '#f5c000' }, // Initial label color
                }}
                InputProps={{
                  style: { color: '#f5c000' }, // Initial text color
                }}
              />
              <ErrorMessage name="password" component="div" />
              <Field
                as={TextField}
                name="password_confirmation"
                type="password"
                label="Confirm Password"
                fullWidth
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#f5c000', // Border color
                    },
                    '&:hover fieldset': {
                      borderColor: '#e0b002', // Border color on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#d4a000', // Border color when focused
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#f5c000', // Label color
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#d4a000', // Label color when focused
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#000000', // Text color
                  },
                }}
                InputLabelProps={{
                  style: { color: '#f5c000' }, // Initial label color
                }}
                InputProps={{
                  style: { color: '#f5c000' }, // Initial text color
                }}
              />
              <ErrorMessage name="password_confirmation" component="div" />
              <Button type="submit" sx={{ backgroundColor: '#f5c000', '&:hover': { backgroundColor: '#e0b002' }, mt: 2 }} variant="contained" fullWidth>
                Sign Up
              </Button>
            </Form>
          </Formik>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default SignupForm;