import { action, makeObservable, observable } from "mobx";

interface User {
  firstName: string;
  lastName?: string;
  email: string;
}

class UserStore {
  user: User | undefined = {
    firstName: "Athithya",
    lastName: "Vidyarth",
    email: "avidyarth@gmail.com",
  };

  setUser = (user: User) => {
    this.user = user;
  };

  constructor() {
    makeObservable(this, {
      user: observable,
      setUser: action,
    });
  }
}

const userStore = new UserStore();

export default userStore;
