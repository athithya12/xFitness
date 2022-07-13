import { action, makeObservable, observable } from "mobx";

class AuthStore {
  accessToken: string | undefined = undefined;
  loading: boolean = true;

  setAccessToken = (accessToken: string) => {
    console.log(`Access token: ${accessToken}`);
    this.accessToken = accessToken;
  };

  setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  constructor() {
    makeObservable(this, {
      accessToken: observable,
      loading: observable,
      setAccessToken: action,
      setLoading: action,
    });
  }
}

const authStore = new AuthStore();

export default authStore;
