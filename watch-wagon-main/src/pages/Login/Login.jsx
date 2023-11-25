import React, { Component } from 'react';
import MovieApiService from '../../services/movieApi.service';
import './Login.css';
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators,
 } from "react-reactive-form";

const TextInput = ({ handler, touched, hasError, meta }) => (
  <div>
    <input type={meta.type} placeholder={`Enter ${meta.label}`} {...handler()}/>
    <span>
        {touched
        && hasError("required")
        && `${meta.label} is required`}
    </span>
  </div>  
)
export default class Login extends Component {
    loginForm = FormBuilder.group({
        email: ["", [Validators.required, Validators.email]],
        password: ["", Validators.required],
        rememberMe: false
    });
    handleReset=() => {
        this.loginForm.reset();
    }
    handleSubmit=async (e) => {
        e.preventDefault();
        if (await MovieApiService.login(this.loginForm.value)){
          window.location.href="/"
        }else{
          alert("Login inválido")
        }
        console.log("Form values", this.loginForm.value);
    }
    render() {
        return (
          <div className="container login-container">
          <div className="card login-card">
            <div className="card-header login-card-header">
              <h3 className="mb-0">Login</h3>
            </div>
            <div className="card-body login-card-body">
            <FieldGroup
                control={this.loginForm}
                render={({ get, invalid }) => (
                  <form onSubmit={this.handleSubmit}>

                    <FieldControl
                      name="email"
                      render={TextInput}
                      meta={{ label: "email", type: "email" }}
                    />

                    <FieldControl
                      name="password"
                      render={TextInput}
                      meta={{ label: "Password", type: "password" }}
                    />

                    <button
                      type="button"
                      onClick={this.handleReset}
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      disabled={invalid}
                    >
                      Submit
                    </button>
                  </form>
                )}
              />
            </div>
          </div>
        </div>
        );
    }
}