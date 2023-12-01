import { Component } from "react";
import MovieApiService from "../../services/movieApi.service";
import { FieldControl, FieldGroup, FormBuilder, Validators } from "react-reactive-form";
import './Register.css';

const TextInput = ({ handler, touched, hasError, meta }) => (
    <div className="form-floating mb-3">
        <input className="form-control" type={meta.type} placeholder={`Insira ${meta.label}`} {...handler()}/>
        <label htmlFor={meta.label}>{meta.label}</label>
        <span className="text-danger">
            {touched
            && hasError("required")
            && `${meta.label} é obrigatório`}
        </span>
    </div>  
)

const ConfirmPassword = ({ handler, touched, hasError, meta }) => (
    <div className="form-floating mb-3">
        <input className="form-control" type={meta.type} placeholder={`Insira ${meta.label}`} {...handler()}/>
        <label htmlFor={meta.label}>{meta.label}</label>
        <span className="text-danger">
            {touched
            && hasError("required")
            && `Confirme a senha é obrigatório`}
            {touched
            && !hasError("password")
            && meta.password !== meta.confirmPassword
            && `Senhas não conferem`}
        </span>
    </div>
)

export default class Register extends Component
{
    state = {
        response: null,
        ok: null,
        loading: false
    }
    registerForm = FormBuilder.group({
        email: ["", [Validators.required, Validators.email]],
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required],
        username: ["", Validators.required]
    });

    async handleSubmit(event)
    {
        event.preventDefault();
        this.setState({loading: true});
        const response = await MovieApiService.register(this.registerForm.value);

        if (response.message === 'created') {
            this.setState({response: 'Usuário criado com sucesso!', ok: true});
            setTimeout(() => {
                window.location.href = "/login"
            }, 5000);
        } else {
            this.setState({response: response.error, ok: false});
        }
        this.setState({loading: false});
    }

    render()
    {
        return <>
        <div className="container login-container">
          <div className="card login-card">
            <div className="card-header login-card-header" style={{backgroundColor: '#FFC107', color: 'white'}}>
              <h3 className="h3 mb-0">Register</h3>
            </div>
            <div className="card-body login-card-body">
                { this.state.response ?
                <div className={(this.state.ok ? "alert-success" : "alert-danger") + " alert"}>{this.state.response}</div>
                :
                <></> 
                }
                <FieldGroup
                control={this.registerForm}
                render={({ get, invalid }) => (
                  <form onSubmit={(e) => this.handleSubmit(e)}>

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

                    <FieldControl
                      name="confirmPassword"
                      render={ConfirmPassword}
                      meta={{ label: "Confirme a senha", type: "password", password: get('password').value, confirmPassword: get('confirmPassword').value }}
                    />
                    
                    <FieldControl
                      name="username"
                      render={TextInput}
                      meta={{ label: "Nome de usuário", type: "text" }}
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
                <p>Ou <a href="/login">logar</a></p>
            </div>
        </div>
    </div>
    </>;
    }
}