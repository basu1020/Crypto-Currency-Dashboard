import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = []

// write a redux toolkit slice whose initial state is an array and that array is populated with an api such that the api is dependent on another state which can either be "A","B", "C", the default state is "A" but if this gets changed we need to fetch api according to this state and changing our main state accordingly

