import { afterAll, afterEach, beforeAll, expect, test, it, vi,describe } from "vitest";
import { render , screen} from "@testing-library/react";
import SettingsForm from "./SettingsForm.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "../create-query-client.ts";
import { userEvent } from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

function add(a: number, b: number) {
  return a + b;
}

// Test-Framework: https://vitest.dev/
//   (älter: Jest)
// Für React: React Testing Library: https://testing-library.com/docs/react-testing-library/intro/
//   (im Hintergrund: JSDOM)
//
// Mock Service Worker: https://mswjs.io/
//
// (experimental) Vitest Browser Mode: https://vitest.dev/guide/browser/


const handlers = [
  http.put("http://localhost:7100/api/users/1", async ({ request }) => {
    const requestBody = await request.json();
    console.log("REQUEST BODY", requestBody);
    return HttpResponse.json({});
  }),
];

const server = setupServer(...handlers);
// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

describe("SettingsForm", () => {
it("just works!", async () => {
  // expect(add(2,3)).toBe(5);

  const user = userEvent.setup();

  const onFormSavedMock = vi.fn();

  render(
    <QueryClientProvider client={createQueryClient()}>
      <SettingsForm onFormSaved={onFormSavedMock}/>
    </QueryClientProvider>,
  );

  // screen.debug();

  const nameTextField = screen.getByLabelText(/name/i);

  expect(nameTextField).toBeInTheDocument();
  expect(nameTextField).toHaveValue("Susi");
  const errorString = screen.queryByText(/Please enter a name/i);
  expect(errorString).toBeInTheDocument();

  expect(screen.getByRole("button", {name: /save/i})).toBeDisabled();

  await user.type(nameTextField, "Susi Müller");
  expect(errorString).not.toBeInTheDocument();

  // await user.tripleClick(screen.getByLabelText(/matches per league/i));
  await user.type(screen.getByLabelText(/matches per league/i), "4");

  screen.debug();

  expect(screen.getByRole("button", {name: /save/i})).toBeEnabled();

  await user.click(screen.getByRole("button", {name: /save/i}));

  // expect(screen.getByText(/ving failed Type/i)).toBeInTheDocument();

  expect(onFormSavedMock).toHaveBeenCalledWith("SusiSusi Müller");



})

});
