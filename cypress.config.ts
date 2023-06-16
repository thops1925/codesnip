import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'zaaaua',
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
