import Cookies from "js-cookie";

const AuthStore = {
  setUser: ({ userid, name, email, address, role }) => {
    Cookies.set(
      "user",
      JSON.stringify({ userid, name, email, address, role }),
      { expires: 7 }
    );
  },

  getUser: () => {
    const user = Cookies.get("user");
    return user ? JSON.parse(user) : null;
  },

  getUserId: () => {
    const user = Cookies.get("user");
    return user ? JSON.parse(user)._id : null;
  },

  removeUser: () => {
    Cookies.remove("user");
  },
};

export default AuthStore;
