import React from 'react'

const Validation = (formData) => {
   
    const errors = {};

    // Example validation rules
    // You can modify these rules based on your requirements
    Object.keys(formData).forEach((key) => {
        if (!formData[key]) {
            errors[key] = `${key} is required`;
        }
    });

    return errors;
   
   
    
   
}

export default Validation
