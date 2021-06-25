import { defaultContext } from "./config/context";
import { H5PContext } from "./config/H5PContext";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  decorators: [
    (Story) => (
      <H5PContext.Provider value={defaultContext}>
        <Story />
      </H5PContext.Provider>
    ),
  ],
}