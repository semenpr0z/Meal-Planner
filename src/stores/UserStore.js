import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: null,
    userOrders: [],
    userDataOnChange: null,
    passwordOnCheck: "",
    email: "",
    password: "",
    first_name: "",
    date_of_birth: "",
    sex: "",
  }),
  actions: {
    async changeUser(user) {
      this.user = await user;
      this.userDataOnChange = Object.assign({}, this.user);
    },
    async loadOrders(orders) {
      this.userOrders = orders;
    },
    logOut() {
      (this.user = null), (this.userDataOnChange = null);
    },
  },
});
