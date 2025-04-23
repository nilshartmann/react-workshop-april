import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import Hello from "./Hello.tsx";
import { z } from "zod";

// type League = {
//   id: string;
//   name: string;
// };

const League = z.object({
  id: z.string(),
  name: z.string()
});

type League = z.infer<typeof League>


function saveLeague(l: League) {}


test("Hello World", async () => {
  const response: unknown = {id: "1", name: "BL 1"};
  const result = League.parse(response);
  saveLeague(result);
  expect(result).toEqual({id: "1", name: "BL 1"})
});
