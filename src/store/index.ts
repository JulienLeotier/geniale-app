import { IUser } from "@/api/models/api/user";

import { defineStore } from "pinia";

export const useStore = defineStore("api", {
  state: () => ({
    user: {
      id: 0,
      created_at: "",
      deleted_at: "",
      updated_at: "",
      username: "",
      email: "",
      phone: "",
      entity: [],
      email_checked: false,
      is_google_user: false,
    } as IUser,
  }),
  actions: {
    setToken(token: string | null) {
      if (!token) {
        localStorage.removeItem("token");
      } else {
        localStorage.setItem("token", token);
      }
    },
    setUser(user: IUser | null) {
      if (!user) {
        this.user = {
          id: 0,
          created_at: "",
          deleted_at: "",
          updated_at: "",
          username: "",
          email: "",
          phone: "",
          entity: [],
          email_checked: false,
          is_google_user: false,
        };
      } else {
        this.user = user;
      }
    },
  },
});
