import { RootState } from "../store";
import { ExampleState } from "../types/example.type";

export const exampleSelector = (state: RootState): ExampleState => state.example;