import { createAsyncThunk } from '@reduxjs/toolkit'
import { login, logout, register, verify } from '../services/auth.api'

export const registerThunk = createAsyncThunk(
  '/auth/register',
  async (data, { rejectWithValue }) => {
    try {
      return await register(data)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const loginThunk = createAsyncThunk(
  '/auth/login',
  async (data, { rejectWithValue }) => {
    try {
      return await login(data)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const logoutThunk = createAsyncThunk(
  '/auth/logout',
  async (data, { rejectWithValue }) => {
    try {
      return await logout(data)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const verifyThunk = createAsyncThunk(
  '/auth/verify-user',
  async (data, { rejectWithValue }) => {
    try {
      return await verify(data)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
