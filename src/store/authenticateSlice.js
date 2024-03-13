import { createSlice } from "@reduxjs/toolkit";
import { phoneNumberValidate } from "../ultilities/phoneNumberValidate";

const authenticateInitialState = {
  nameIsValid: false,
  emailIsValid: false,
  passwordIsValid: false,
  phoneIsValid: false,
  nameIsTouched: true,
  emailIsTouched: true,
  passwordIsTouched: true,
  phoneIsTouched: true,
};

const authenticateSlice = createSlice({
  name: "authenticate",
  initialState: authenticateInitialState,
  reducers: {
    setNameIstouched(state) {
      state.nameIsTouched = true;
    },
    setEmailIsTouched(state) {
      state.emailIsTouched = true;
    },
    setPasswordIsTouched(state) {
      state.passwordIsTouched = true;
    },
    setPhoneIsTouched(state) {
      state.phoneIsTouched = true;
    },

    fullnameValidation(state, payload) {
      if (payload.payload.trim() !== "") {
        state.nameIsValid = true;
        state.nameIsTouched = false;
      } else {
        state.nameIsValid = false;
        state.nameIsTouched = false;
      }
    },
    emailValidation(state, payload) {
      if (payload.payload.includes("@")) {
        state.emailIsValid = true;
        state.emailIsTouched = false;
      } else {
        state.emailIsValid = false;
        state.emailIsTouched = false;
      }
    },
    passwordValidation(state, payload) {
      if (payload.payload.length > 8) {
        state.passwordIsValid = true;
        state.passwordIsTouched = false;
      } else {
        state.passwordIsValid = false;
        state.passwordIsTouched = false;
      }
    },
    phoneValidation(state, payload) {
      if (phoneNumberValidate(payload.payload)) {
        state.phoneIsValid = true;
        state.phoneIsTouched = false;
      } else {
        state.phoneIsValid = false;
        state.phoneIsTouched = false;
      }
    },
  },
});

export default authenticateSlice.reducer;

export const authenticateActions = authenticateSlice.actions;
