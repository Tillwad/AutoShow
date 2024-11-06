import React from "react";
import { observer } from "mobx-react";
import UserStore from "./stores/UserStore";
import LoginForm from "./LoginForm";
import App from "../App";
import CarShow from "../CarShow";

class Login extends React.Component {
  async componentDidMount() {
    try {
      let res = await fetch("/isLoggedIn", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
        UserStore.colors = result.colors;
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
        UserStore.colors = "#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000";
      }
    } catch (e) {
      UserStore.isLoggedIn = false;
      UserStore.loading = false;
      UserStore.colors = "#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000";
    }
  }

  async doLogout() {
    try {
      let res = await fetch("/logout", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = "";
        UserStore.colors = "#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000";
      }
    } catch (e) {
      console.log(e);
    }
  }

  async doSave() {
    try {
      let res = await fetch("/save", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: UserStore.username,
          colors: UserStore.colors,
        })
      });

      let result = await res.json();
      console.log(result.success)
      if (result && result.success) {
        alert(result.msg)
      }
      else {
        alert('Something went wrong')
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (UserStore.loading) {
      return (
        <div className="logingIn">
          <div className="container">Loading, please wait..</div>
        </div>
      );
    } else {
      if (UserStore.isLoggedIn) {
        return (
          <div className="loggedIn">
            <App login={true}/>
            <button className='logout ghost' onClick={() => this.doLogout()}>Logout</button>
            <button className='save ghost' onClick={() => this.doSave()}>Save</button>
          </div>
        );
      }

      return (
        <div className="Login">
            <LoginForm />
        </div>
      );
    }
  }
}

export default observer(Login);
