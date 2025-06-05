function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// async function fetchAddress() {}
// now fetch Address is now middle ware action creator function
// the creatAsyncthunk  takes is action type name cant use get use fetch name and a callback function that would sit between dispatch and action
// const fetchAddress=createAsyncThunk('user/fetchAddress',async function (){})
//  createAsyncThunk produces 3 additional action types
// 1- pending 2- Fulfilled 3-rejected states

export const fetchAddress = createAsyncThunk('user/fetchAddress', async function () {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  // payload of the fulifield state
  return { position, address };
});

import { createAsyncThunk, createSlice, isFulfilled } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';
const initialState = {
  username: '',
  phone: '',
  status: 'idle',
  position: {},
  address: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.username = action.payload;
    },
  },
  // this complex way is used to connect the creatAsyncthink middle wate to our reducers // we use the function we created inside add Case
  extraReducers: (builder) =>
    // now handling 3 cases of pending fullfield errors
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.phone = action.payload.phone;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      }),
});

export const { updateName } = userSlice.actions;
export default userSlice.reducer;
