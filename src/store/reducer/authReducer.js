import { createReducer } from "@reduxjs/toolkit";
import { login, setUser, logout } from "../actions/authActions";


let savedUser = null;
try {
  const userFromStorage = localStorage.getItem("user");
  savedUser = userFromStorage ? JSON.parse(userFromStorage) : null;
} catch (e) {
  console.error("Error al parsear el usuario desde localStorage", e);
  savedUser = null; 
}

const savedToken = localStorage.getItem("token");


const initialState = {
  loading: false,
  error: null,
  user: savedUser, 
  token: savedToken, 
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.fulfilled, (state, action) => {
      console.log("Login exitoso:", action.payload);

      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
      state.token = action.payload.token;

     
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    })
    .addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.user = null;
      state.token = null;
    })
    .addCase(login.rejected, (state, action) => {
      console.log("Error en el login:", action.error.message);
      localStorage.removeItem("token");
            
      state.loading = false;
      state.error = action.error.message;
      state.user = null;
      state.token = null;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    })
    .addCase(logout, (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      state.user = null;
      state.token = null;
      state.error = null;
    });
});

export default authReducer;
