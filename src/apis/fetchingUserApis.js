import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../Axios/AxiosService";

export const fetchingGetUsers = createAsyncThunk(
  "/fetching/users",
  async () => {
    const response = await axiosInstance.get("/posts");
    return response.data;
  }
);

export const fetchingAddUsers = createAsyncThunk(
  "add/users",
  async (newUser) => {
    const response = await axiosInstance.post("/posts", newUser);
    return response.data;
  }
);

export const fetchingUpdateUsers = createAsyncThunk(
  "update/users",
  async (updatedUser) => {
    const response = await axiosInstance.put(
      `/posts/${updatedUser.id}`,
      updatedUser
    );
    return response.data;
  }
);

export const fetchingDeleteUsers = createAsyncThunk(
  "delete/users",
  async (userId) => {
    const response = await axiosInstance.delete(`/posts/${userId}`);
    console.log("delete",response.data)
    return response.data;
  }
);
