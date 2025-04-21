import "../src/index.css";

import type { Preview } from "@storybook/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterContextProvider } from "@tanstack/react-router";

import { createQueryClient } from "../src/create-query-client";
import { routeTree } from "../src/routeTree.gen";

const queryClient = createQueryClient();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (story) => {
      const router = createRouter(
        // @ts-ignore
        {
          routeTree,
          context: {
            queryClient: queryClient,
          },
        },
      );
      return (
        <QueryClientProvider client={queryClient}>
          <RouterContextProvider router={router}>
            {story()}
          </RouterContextProvider>
        </QueryClientProvider>
      );
    },
  ],
};

export default preview;
