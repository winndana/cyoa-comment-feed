import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node'
import '@testing-library/jest-dom';
import App from './App';

const server = setupServer(
  rest.get('http://localhost:3001/getComments', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([{name: "Harry", message:"Hello", created:"Wed, 04 May 2022 20:51:34 GMT"}]),
    )
  })
);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("API call", () => {
  it("returns data correctly", async () => {
    server.use(
      rest.get('http://localhost:3001/getComments', (_, res, ctx) => {
        return res(ctx.json([{name: "Harry", message:"Testing testing", created:"Wed, 04 May 2022 20:51:34 GMT"}]))
      }),
    )
    render(<App />);
    const singleComment = await waitFor(() => screen.findByTestId('single-comment'));
    expect(singleComment).toBeInTheDocument();

    expect(screen.getByText('Testing testing')).toBeInTheDocument();
})});

describe("Renders App", () => {
it("contains sub components", async () => {
  render(<App />);

  expect(screen.getByTestId("loading")).toHaveTextContent("Loading");

  const formContainer = await waitFor(() => screen.findByTestId('form-container'));
  expect(formContainer).toBeInTheDocument();

  const commentFeed = await waitFor(() => screen.findByTestId('comment-feed-container'));
  expect(commentFeed).toBeInTheDocument();

  const submitButton = await waitFor(() => screen.findByTestId('submit-comment'));
  expect(submitButton).toBeInTheDocument();
})});

describe("Submit comment", () => {
  it("should respond to click event", async () => {
    render(<App />);

    fireEvent.click(screen.getByTestId('submit-comment'));
    
    expect(await waitFor(() => screen.findByTestId('submit-comment'))).toBeDisabled();
  })
})