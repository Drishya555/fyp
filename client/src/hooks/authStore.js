import Cookies from "js-cookie";

const AuthStore = {
  setUser: ({ userid, name, email, address, role, token }) => {
    Cookies.set(
      "user",
      JSON.stringify({ userid, name, email, address, role }),
      { expires: 7 }
    );

    Cookies.set("token", token, {
      expires: 7,
      secure: 'production', 
      sameSite: 'Strict', 
    });
  },

  getUser: () => {
    const user = Cookies.get("user");
    return user ? JSON.parse(user) : null;
  },


  getToken: () => {
    return Cookies.get("token") || null;
  },


  getUserId: () => {
    const user = Cookies.get("user");
    return user ? JSON.parse(user)._id : null;
  },

  removeUser: () => {
    Cookies.remove("user");
    Cookies.remove("token");
  },
};

export default AuthStore;
