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
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .matches(/^.{6,}$/, 'The password must be at least 6 characters')
    .required('Password is required'),
});

function LoginForm({ setCurrentUser }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '70px 0' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ width: '100%', maxWidth: '400px', padding: '20px', backgroundColor: '#1E1E1E', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <Typography variant="h4" sx={{ color: '#f5c000', mb: 2, textAlign: 'center' }}>
            Log in
          </Typography>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, isValid, validateForm }) => {
              validateForm().then(errors => {
                if (Object.keys(errors).length) {
                  alert('Please correct the errors before submitting.');
                } else {
                  alert('Logged in'); 
                  const user = {"user": values}
                  axiosInstance.post('/login', user)
                  .then(response => {
                    const user = response.data.status.data.user;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    setCurrentUser(user);
                    navigate('/');
                  })
                }
                setSubmitting(false);
              });
            }}
          >
            <Form>
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
                    color: '#f5c000', // Text color
                  },
                }}
                InputLabelProps={{
                  style: { color: '#f5c000' }, // Initial label color
                }}
                InputProps={{
                  style: { color: '#f5c000' }, // Initial text color
                }}
              />
              <Typography color='#f5c000'>
              <ErrorMessage name="email" component="div"/>
              </Typography>
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
                    color: '#f5c000', // Text color
                  },
                }}
                InputLabelProps={{
                  style: { color: '#f5c000' }, // Initial label color
                }}
                InputProps={{
                  style: { color: '#f5c000' }, // Initial text color
                }}
              />
              <Typography color='#f5c000'>
              <ErrorMessage name="password" component="div" />
              </Typography>
              <Button type="submit" sx={{ backgroundColor: '#f5c000', '&:hover': { backgroundColor: '#e0b002' }, mt: 2 }} variant="contained" fullWidth>
                Log in
              </Button>
            </Form>
          </Formik>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default LoginForm;