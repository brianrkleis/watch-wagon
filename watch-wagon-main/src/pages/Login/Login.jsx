import React, { Component } from 'react';
import MovieApiService from '../../services/movieApi.service';
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators,
 } from "react-reactive-form";
import './Login.css';

const TextInput = ({ handler, touched, hasError, meta }) => (
  <div className="form-floating">
    <input className="form-control mb-3" type={meta.type} placeholder={`Enter ${meta.label}`} {...handler()}/>
    <label htmlFor={meta.label}>{meta.label}</label>
    <span>
        {touched
        && hasError("required")
        && `${meta.label} is required`}
    </span>
  </div>  
)
export default class Login extends Component {

  state = {
    loading: false
  };

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
      this.setState({loading: true});
      if (await MovieApiService.login(this.loginForm.value)){
        window.location.href="/"
      }else{
        alert("Login inválido")
      }
      this.setState({loading: false});

  }

  render() {
    return (
      <div className="container login-container">
      <div className="card login-card">
        <div className="card-header text-white login-card-header" style={{backgroundColor: '#FFC107'}}>
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
                  meta={{ label: "E-mail", type: "email" }}
                />

                <FieldControl
                  name="password"
                  render={TextInput}
                  meta={{ label: "Senha", type: "password" }}
                />

                <div className="d-grid">
                  <button
                      type="submit"
                      disabled={invalid || this.state.loading}
                      className="btn" style={{backgroundColor: '#FFC107', color: 'white'}}
                    >
                    Logar
                  </button>
                  
                </div>
              </form>
            )}
          />
        </div>
        <div className="card-footer">
              <p>Ou <a href="/register">cadastre-se</a></p>
        </div>
      </div>
    </div>
    );
  }
}