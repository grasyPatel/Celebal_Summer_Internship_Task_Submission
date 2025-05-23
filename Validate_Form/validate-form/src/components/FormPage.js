import React from "react";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Eye, EyeOff, User, Mail, Phone, MapPin, FileText, Check } from "lucide-react";

const initialValue = {
  fName: "",
  lName: "",
  username: "",
  email: "",
  password: "",
  phoneCode: "+91",
  phoneNumber: "",
  country: "",
  city: "",
  pan: "",
  aadhar: "",
};

const countries = {
  India: ["Mumbai", "Delhi", "Bangalore"],
  USA: ["New York", "Los Angeles", "Chicago"],
  Canada: ["Toronto", "Vancouver", "Montreal"],
  Australia: ["Sydney", "Melbourne", "Brisbane"],
  Germany: ["Berlin", "Munich", "Frankfurt"],
  France: ["Paris", "Lyon", "Marseille"],
  Japan: ["Tokyo", "Osaka", "Kyoto"],
  Brazil: ["São Paulo", "Rio de Janeiro", "Brasília"],
  SouthAfrica: ["Johannesburg", "Cape Town", "Durban"],
  UnitedKingdom: ["London", "Manchester", "Birmingham"],
  Italy: ["Rome", "Milan", "Naples"],
  China: ["Beijing", "Shanghai", "Guangzhou"],
  Russia: ["Moscow", "Saint Petersburg", "Kazan"],
  Mexico: ["Mexico City", "Guadalajara", "Monterrey"],
  UAE: ["Dubai", "Abu Dhabi", "Sharjah"],
};
//for multi step styling in the form
const steps = [
  {
    id: 1,
    title: "Personal Info",
    icon: User,
    fields: ["fName", "lName", "username"]
  },
  {
    id: 2,
    title: "Account Details",
    icon: Mail,
    fields: ["email", "password"]
  },
  {
    id: 3,
    title: "Contact Info",
    icon: Phone,
    fields: ["phoneCode", "phoneNumber"]
  },
  {
    id: 4,
    title: "Location",
    icon: MapPin,
    fields: ["country", "city"]
  },
  {
    id: 5,
    title: "Documents",
    icon: FileText,
    fields: ["pan", "aadhar"]
  }
];

const FormPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };
   //Validating condition for the form
  const validate = useCallback(() => {
    let tempErrors = {};
    if (!formData.fName) tempErrors.fName = "First name is required";
    if (!formData.lName) tempErrors.lName = "Last name is required";
    if (!formData.username) tempErrors.username = "Username is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Please enter a valid email";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.password ){
      tempErrors.password = "Password is required";
    }else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{6,}$/.test(formData.password)) {
       tempErrors.password ="Password must be at least 6 characters, include one uppercase letter, one lowercase letter, one number, and one special character";
    } 
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber))
      tempErrors.phoneNumber = "Phone number must be 10 digits";
    if (!formData.country) tempErrors.country = "Country is required";
    if (!formData.city) tempErrors.city = "City is required";
    if (formData.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan))
      tempErrors.pan = "PAN must be in format: ABCDE1234F";
    if (formData.aadhar && !/^\d{12}$/.test(formData.aadhar))
      tempErrors.aadhar = "Aadhar must be 12 digits";
    return tempErrors;
  }, [formData]);

  useEffect(() => {
    setErrors(validate());
  }, [formData, validate]);

  const getStepErrors = (stepFields) => {
    return stepFields.some(field => errors[field] && touched[field]);
  };

  const isStepComplete = (stepFields) => {
    return stepFields.every(field => {
      if (field === 'pan' || field === 'aadhar') return true;
      return formData[field] && !errors[field];
    });
  };

  const canProceedToNext = () => {
    const currentStepData = steps.find(step => step.id === currentStep);
    return isStepComplete(currentStepData.fields);
  };

  const handleNext = () => {
    if (currentStep < steps.length && canProceedToNext()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErrors = validate();
    setErrors(tempErrors);
    
    if (Object.keys(tempErrors).length === 0) {
      setIsSubmitted(true);
     
      console.log("Form submitted:", formData);
    }
  };
//All the fields for the form to input with tailwind Css
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                name="fName"
                value={formData.fName}
                placeholder="Enter your first name"
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  touched.fName && errors.fName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {touched.fName && errors.fName && (
                <p className="text-red-500 text-sm mt-1">{errors.fName}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                name="lName"
                value={formData.lName}
                placeholder="Enter your last name"
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  touched.lName && errors.lName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {touched.lName && errors.lName && (
                <p className="text-red-500 text-sm mt-1">{errors.lName}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                name="username"
                value={formData.username}
                placeholder="Choose a username"
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  touched.username && errors.username ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {touched.username && errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  touched.email && errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  placeholder="Create a password"
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    touched.password && errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="flex gap-3">
                <select
                  name="phoneCode"
                  value={formData.phoneCode}
                  onChange={handleChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </select>
                <input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  placeholder="Enter phone number"
                  onChange={handleChange}
                  className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    touched.phoneNumber && errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {touched.phoneNumber && errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
              )}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  touched.country && errors.country ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Country</option>
                {Object.keys(countries).map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {touched.country && errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={!formData.country}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  touched.city && errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select City</option>
                {(countries[formData.country] || []).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {touched.city && errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number (Optional)</label>
              <input
                name="pan"
                value={formData.pan}
                placeholder="ABCDE1234F"
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  touched.pan && errors.pan ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {touched.pan && errors.pan && (
                <p className="text-red-500 text-sm mt-1">{errors.pan}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Number (Optional)</label>
              <input
                name="aadhar"
                value={formData.aadhar}
                placeholder="123456789012"
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  touched.aadhar && errors.aadhar ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {touched.aadhar && errors.aadhar && (
                <p className="text-red-500 text-sm mt-1">{errors.aadhar}</p>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
//On Submitting the form , documment section 
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Complete!</h2>
          <p className="text-gray-600">Thank you for registering. Your account has been created successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
     
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              const hasError = getStepErrors(step.fields);
              
              return (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isActive 
                        ? 'bg-blue-500 text-white' 
                        : hasError 
                          ? 'bg-red-100 text-red-600 border-2 border-red-300'
                          : 'bg-gray-200 text-gray-500'
                  }`}>
                    {isCompleted ? <Check size={20} /> : <Icon size={20} />}
                  </div>
                  <span className={`text-xs font-medium text-center ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`h-1 w-full mt-4 rounded ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

   
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {steps.find(step => step.id === currentStep)?.title}
            </h2>
            <p className="text-gray-600">Step {currentStep} of {steps.length}</p>
          </div>

          <div>
            <div className="mb-8">
              {renderStepContent()}
            </div>

        
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceedToNext()}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canProceedToNext()}
                  className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Check size={20} />
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;