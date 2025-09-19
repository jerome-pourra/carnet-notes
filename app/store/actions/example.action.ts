import { Dispatch } from "@reduxjs/toolkit";
import { EXAMPLE } from "./actions";

export const exampleAction = () => async (dispatch: Dispatch) => {
  dispatch({ type: EXAMPLE, payload: { text: "Hello world !" } });
};