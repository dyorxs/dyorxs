import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileState } from 'state/types'
import getProfile, { GetProfileResponse } from './getProfile'

const initialState: ProfileState = {
  isInitialized: false,
  isLoading: true,
  hasRegistered: false,
  data: null,
  connectionError: null,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profileFetchStart: (state) => {
      state.isLoading = true
    },
    profileFetchSucceeded: (state, action: PayloadAction<GetProfileResponse>) => {
      const { profile, hasRegistered } = action.payload

      return {
        isInitialized: true,
        isLoading: false,
        hasRegistered,
        data: profile,
        connectionError: null,
      }
    },
    profileFetchFailed: (state) => {
      state.isLoading = false
      state.isInitialized = true
    },
    addPoints: (state, action: PayloadAction<number>) => {
      state.data.points += action.payload
    },
    setConnectionError: (state, action: PayloadAction<{ error: any }>) => {
      state.connectionError = action.payload.error
    },
  },
})

// Actions
export const { profileFetchStart, profileFetchSucceeded, profileFetchFailed, addPoints, setConnectionError } =
  profileSlice.actions

// Thunks
export const fetchProfile = (address: string) => async (dispatch) => {
  try {
    dispatch(profileFetchStart())
    const response = await getProfile(address)
    dispatch(profileFetchSucceeded(response))
  } catch (error) {
    dispatch(profileFetchFailed())
  }
}

export default profileSlice.reducer
