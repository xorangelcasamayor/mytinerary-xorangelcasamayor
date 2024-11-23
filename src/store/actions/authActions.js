import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const setUser = createAction("setUser", (datos) => {
  return {
    payload: datos,
  };
});

const logout = createAction("logout");

const login = createAsyncThunk("login", async ({ email, password }) => {
  const credentials = {
    email: email,
    password: password,
  };
  const response = await axios.post("http://localhost:8080/api/auth/signin", credentials);
  localStorage.setItem("token", response.data.token);
  return response.data;
});


const loginWithGoogle = createAsyncThunk("loginWithGoogle", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://localhost:8080/api/auth/signin/google");
    localStorage.setItem("token", response.data.token);

    return response.data; 
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Error al iniciar sesión con Google");
  }
});

const register = createAsyncThunk(
  "register",
  async ({ name, lastName, email, password, country, photoUrl }, { rejectWithValue }) => {
    const userData = { name, lastName, email, password, country, photoUrl };

    try {
      const response = await axios.post("http://localhost:8080/api/users/register", userData);
      localStorage.setItem("token", response.data.token); 
      return response.data; 
    } catch (error) {
     
      return rejectWithValue(error.response?.data?.message || "Error al registrar el usuario");
    }
  }
);

export { login, setUser, logout, loginWithGoogle,register };


