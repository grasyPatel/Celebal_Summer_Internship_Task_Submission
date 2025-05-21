import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const initialValue = {
  fName: '',
  lName: '',
  username: '',
  email: '',
  password: '',
  phoneCode: '+91',
  phoneNumber: '',
  country: '',
  city: '',
  pan: '',
  aadhar: '',
};

const countries = {
  India: ['Mumbai', 'Delhi', 'Bangalore'],
  USA: ['New York', 'Los Angeles', 'Chicago'],
  Canada: ['Toronto', 'Vancouver', 'Montreal'],
  Australia: ['Sydney', 'Melbourne', 'Brisbane'],
  Germany: ['Berlin', 'Munich', 'Frankfurt'],
  France: ['Paris', 'Lyon', 'Marseille'],
  Japan: ['Tokyo', 'Osaka', 'Kyoto'],
  Brazil: ['São Paulo', 'Rio de Janeiro', 'Brasília'],
  SouthAfrica: ['Johannesburg', 'Cape Town', 'Durban'],
  UnitedKingdom: ['London', 'Manchester', 'Birmingham'],
  Italy: ['Rome', 'Milan', 'Naples'],
  China: ['Beijing', 'Shanghai', 'Guangzhou'],
  Russia: ['Moscow', 'Saint Petersburg', 'Kazan'],
  Mexico: ['Mexico City', 'Guadalajara', 'Monterrey'],
  UAE: ['Dubai', 'Abu Dhabi', 'Sharjah']
};

const FormInfo=()=>{
    const [formData, setFormData]=useState(initialValue);
    const [errors, setErrors]=useState({});
    const [touched, setTouched]=useState({});
    const [showPassword, setShowPassword]=useState(false);
    const navigate=useNavigate();

    const handleChanges=(e)=>{
        const {name, value}=e.target;
        setFormData(prev=>({...prev, [name]:value}));
        setTouched(prev=>({...prev,[name]:true}));
    };

    const validate=()=>{
        let tempErrors={};
    }
};




const FormPage = () => {
  return (
    <div>FormPage</div>
  )
}

export default FormPage