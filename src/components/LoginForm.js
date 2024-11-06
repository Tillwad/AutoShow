import { set } from "mobx";
import React, { useState } from "react";
import App from "../App";
import UserStore from "./stores/UserStore";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      buttonDisabled: false
    };
  }

  setInputValue(property, val) {
    val = val.trim();
    if (val.length > 12 && property !== 'email') {
      return;
    }
    this.setState({
      [property]: val
    });
  }

  resetForm() {
    this.setState({
      username: "",
      email: "",
      password: "",
      buttonDisabled: false
    });
  }

  async doLogin() {
    UserStore.isLoggedIn = true;
    UserStore.username = 'Test';
    UserStore.colors = "#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000";

    if (!this.state.username) {
      alert('Not username Login');
      return;
    }
    if (!this.state.password) {
      alert('Not Password Login');
      return;
    }

    this.setState({
      buttonDisabled: true
    });

    try {
      let res = await fetch("/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });

      let result = await res.json();
      if (result && result.success) {
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
        UserStore.colors = result.colors;
      } else if (result && result.success === false) {
        this.resetForm();
        alert(result.msg);
      }
    } catch (e) {
      console.log(e);
      this.resetForm();
    }

  }

  async doRegister() {
    if (!this.state.username) {
      alert('Not username Register');
      return;
    }

    if (!this.state.password) {
      alert('Not password Register');
      return;
    }

    if (!this.state.email) {
      alert('Not email Register');
      return;
    }

    this.setState({
      buttonDisabled: true
    });

    try {
      let res = await fetch("/register", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
        })
      });

      let result = await res.json();
      if (result && result.success) {
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
        UserStore.colors = "#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000";
      } else if (result && result.success === false) {
        this.resetForm();
        alert(result.msg);
      }
    } catch (e) {
      console.log(e);
      this.resetForm();
    }
  }

  registerorlogin(active) {
    console.log(active);
    if (active === "login") {
      this.doLogin();
    }
    else if (active === "registation") {
      console.log('start registation!')
      this.doRegister();
    }
  }

  render() {
    return (
      <>
        <Form login={() => this.doLogin()} register={() => this.doRegister()} Value={(p, v) => this.setInputValue(p, v)} state={this.state}/>
        </>
    );
  }
}

function Form(props) {
  const [login, setLogin] = useState(false);

  return (
    <>  
      <App login={false}/>
      {login ? <><div className="wrapper">
            <div class="container" id="container" >
              <div class="form-container register-container">
                <form>
                  <h2 onClick={() => setLogin(!login)}>X</h2>
                  <h1>Register</h1>
                  <input type="text" placeholder="Username" value={props.state.username ? props.state.username : ''} onChange={(val) => {props.Value('username', val.target.value)}}/>
                  <input type="email" placeholder="Email" value={props.state.email ? props.state.email : ''} onChange={(val) => props.Value('email', val.target.value)}/>
                  <input type="password" placeholder="Password" value={props.state.password ? props.state.password : ''} onChange={(val) => props.Value('password', val.target.value)}/>
                  <button type="button" onClick={() => props.register()}>Register</button>
                </form>
              </div>
              <div class="form-container login-container">
                <form>
                  <h2 onClick={() => setLogin(!login)}>X</h2>
                  <h1>Login</h1>
                  <input type="text" placeholder="Username" value={props.state.username ? props.state.username : ''} onChange={(val) => props.Value('username', val.target.value)}/>
                  <input type="password" placeholder="Password" value={props.state.password ? props.state.password : ''} onChange={(val) => props.Value('password', val.target.value)}/>
                  <div class="content">
                    Remember Me
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <button type="button" onClick={() => props.login()}>Login</button>
                </form>
              </div >
              <div class="overlay-container">
                <div class="overlay">
                  <div class="overlay-panel overlay-left">
                    <button class="ghost" id="login" onClick={() => { document.getElementById("container").classList.remove("right-panel-active") }}>Login               </button>
                  </div>
                  <div class="overlay-panel overlay-right">
                    <button class="ghost" id="register" onClick={() => { document.getElementById("container").classList.add("right-panel-active") }}>Register</button>
                  </div>
                </div>
              </div>
            </div >
          </div>
          <div className="top" onClick={() => setLogin(!login)}></div>
          <div className="bottom" onClick={() => setLogin(!login)}></div></> : <button className='login ghost' onClick={() => setLogin(!login)}>Click To Login</button>}
    </>)
}

export default LoginForm;
