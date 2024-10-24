import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCategory = createAsyncThunk(
  "category/getAllCategory",
  async () => {
    const response = await axios.get("http://localhost:3000/categories");
    const data = response.data;
    return data;
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (category) => {
    try {
      const response = await axios.post("http://localhost:3000/categories", {
        id: Math.random(),
        name: category.name,
        image: category.image,
        isShowHome: true,
      });
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/categories/${id}`
      );
      console.log(response);
      return id;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editCategory = createAsyncThunk(
  "category/editCategory",
  async ({ id, updatedCategory }) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/categories/${id}`,
        updatedCategory
      );
      return { id, ...response.data };
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateIsShowHomeStatus = createAsyncThunk(
  "category/updateIsShowHomeStatus",
  async (payload) => {
    const response = await axios.patch(
      `http://localhost:3000/categories/${payload.id}`,
      {
        isShowHome: payload.isShowHome,
      }
    );
    return response.data;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.category = action.payload;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.category.push(action.payload);
    });
    builder
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const indexCategory = state.category.findIndex(
          (category) => category.id === action.payload
        );
        state.category.splice(indexCategory, 1);
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        const index = state.category.findIndex(
          (category) => category.id === action.payload.id
        );
        if (index !== -1) {
          state.category[index] = action.payload;
        }
      })
      .addCase(updateIsShowHomeStatus.fulfilled, (state, action) => {
        const indexCategory = state.category.findIndex(
          (category) => category.id === action.payload.id
        );
        if (indexCategory !== -1) {
          state.category[indexCategory].isShowHome = action.payload.isShowHome;
        }
      });
  },
});

export default categorySlice.reducer;
