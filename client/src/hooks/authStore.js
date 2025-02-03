import Cookies from "js-cookie";

const AuthStore = {
  setUser: ({ name, email, address, role }) => {
    Cookies.set("user", JSON.stringify({ name, email, address, role }), { expires: 7 });
  },

  getUser: () => {
    const user = Cookies.get("user");
    return user ? JSON.parse(user) : null;
  },

  removeUser: () => {
    Cookies.remove("user");
  },
};

export default AuthStore;
