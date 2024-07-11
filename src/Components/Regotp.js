import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import {Link} from "react-router-dom";


function Regotp(){
    const [seconds, setSeconds] = useState(60);

    useEffect(() => {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          clearInterval(interval);
        }
      }, 1000);
  
      return () => {
        clearInterval(interval);
      };
    }, [seconds]);
  
    const formik = useFormik({
      initialValues: {
        otp: '', // Initialize the formik values with the "otp" field
      },
      onSubmit: (values) => {
        console.log('Form submitted with OTP:', values.otp);
      },
      validate: (values) => {
        const errors = {};
        if (!/^\d{6}$/.test(values.otp)) {
          errors.otp = 'Must be a six-digit number';
        }
        return errors;
      },
    });
  
    useEffect(() => {
      if (seconds === 0) {
        formik.setFieldTouched('otp', true);
        formik.setFieldValue('otp', '', false);
        formik.setFieldError('otp', 'Timer has expired');
      }
    }, [seconds, formik]);
    return(
        <>
          <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed">
    <div
     className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
      <div className="d-flex align-items-center justify-content-center w-100">
        <div className="row justify-content-center w-100">
          <div className="col-md-8 col-lg-6 col-xxl-3">
            <div className="card mb-0">
              <div className="card-body">
                <Link to="/Dash" className="text-nowrap logo-img text-center d-block py-3 w-100">
                  <img src="../assets/images/logos/dark-logo.svg" width="180" alt=""/>
                </Link>
                <p className="text-center">Your Social Campaigns</p>
                <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                      <label htmlFor="otp" className="form-label">OTP</label>
                      <input type="text" autoComplete='off'
        value={formik.values.otp}
        onChange={formik.handleChange}
        disabled={seconds === 0 || formik.isSubmitting}  className="form-control" id="otp"/>
       {formik.errors.otp && formik.touched.otp ? ( <p className="alert alert-danger" role="alert">{formik.errors.otp}</p> ):null}
        <p className="text-center">{seconds} seconds remaining</p>
                    </div>
                    
                  
                  <button type="submit"  disabled={seconds === 0 || formik.isSubmitting} className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Submit</button>
                 
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
        </>
    );
};

export default Regotp;