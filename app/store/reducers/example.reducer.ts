import { EXAMPLE } from "../actions/actions";
import { ExampleState } from "../types/example.type";

const authState: ExampleState = {
  text: null,
};

export const exampleReducer = (state = authState, action: any): ExampleState => {
  switch (action.type) {
    case EXAMPLE:
      return {
        ...state,
        text: action.payload.text,
      };
    default:
      return state;
  }
}