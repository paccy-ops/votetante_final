import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { Useform, Form } from './Useform';
import Controls from '../../controls/Controls'

// const GenderItem = [
//   { id: 'male', title: 'male' },
//   { id: 'female', title: 'Female' },
//   { id: 'other', title: 'Other' },
// ];
const initialValues = {
  id: 0,
  name: '',
  email: '',
  location: '',
  isAdmin: false,
  isCandidate: false,
};

const EmployeesForm = (props) => {
  const { addOrEdit, recordForEdit } = props;
  const validate = (fieldsValues = values) => {
    let temp = { ...errors };
    if ('name' in fieldsValues)
      temp.name = fieldsValues.name ? '' : 'This field is required.';
    if ('email' in fieldsValues)
      temp.email = /$^|.+@.+..+/.test(fieldsValues.email)
        ? ''
        : 'Email is not field';
    // if ('mobile' in fieldsValues)
    //   temp.mobile =
    //     fieldsValues.mobile.length > 9 ? '' : 'Minimum 10 numbers required';
    // if ('departmentId' in fieldsValues)
    //   temp.departmentId =
    //     fieldsValues.departmentId.length !== 0 ? '' : 'This field is required';
    setErrors({
      ...temp,
    });
    if (fieldsValues === values)
      return Object.values(temp).every((x) => x === '');
  };
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = Useform(initialValues, true, validate);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };
  useEffect(() => {
    if (recordForEdit !== null) {
      setValues({
        ...recordForEdit,
      });
    }
  }, [recordForEdit, setValues]);
  return (
    <Form style={{marginTop:'120px',marginLeft:'20%'}} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name='fullName'
            label='Full name'
            value={values.name}
            error={errors.name}
            onChange={handleInputChange}
          />
          <Controls.Input
            label='Email'
            name='email'
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
        
          <Controls.Input
            label='Address'
            name='location'
            value={values.location}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
         
          
          
          <Controls.CheckBox
            name='isAdmin'
            label='Admin '
            value={values.isAdmin}
            onChange={handleInputChange}
          />

           
          <Controls.CheckBox
            name='isCandidate'
            label='Candidate'
            value={values.isCandidate}
            onChange={handleInputChange}
          />

          <div>
            <Controls.Button type='submit' text='Submit' />
            <Controls.Button onClick={resetForm} color='default' text='Reset' />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default EmployeesForm;
