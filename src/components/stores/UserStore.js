import { extendObservable } from "mobx";

class UserStore {
  constructor() {
    extendObservable(this, {
      loading: true,
      isLoggedIn: false,
      username: "",
      colors: "#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000"
    });
  }
}
export default new UserStore();