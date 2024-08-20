import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);

  const image = screen.getByAltText("My profile pic");

  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });

  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);

  const bio = screen.getByText(
    /Front-end developer passionate about crafting engaging user experiences/i
  );

  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);

  expect(screen.getByLabelText(/name:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email:/i)).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);

  expect(screen.getByLabelText(/coding/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/music/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/traveling/i)).toBeInTheDocument();
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);

  expect(screen.getByLabelText(/coding/i)).not.toBeChecked();
  expect(screen.getByLabelText(/music/i)).not.toBeChecked();
  expect(screen.getByLabelText(/traveling/i)).not.toBeChecked();
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />);

  userEvent.type(screen.getByLabelText(/name:/i), "John Doe");
  userEvent.type(screen.getByLabelText(/email:/i), "john@example.com");

  expect(screen.getByLabelText(/name:/i)).toHaveValue("John Doe");
  expect(screen.getByLabelText(/email:/i)).toHaveValue("john@example.com");
});

test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />);

  userEvent.click(screen.getByLabelText(/coding/i));
  expect(screen.getByLabelText(/coding/i)).toBeChecked();

  userEvent.click(screen.getByLabelText(/music/i));
  expect(screen.getByLabelText(/music/i)).toBeChecked();

  userEvent.click(screen.getByLabelText(/music/i)); // Uncheck music
  expect(screen.getByLabelText(/music/i)).not.toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />);

  userEvent.type(screen.getByLabelText(/name:/i), "John Doe");
  userEvent.type(screen.getByLabelText(/email:/i), "john@example.com");
  userEvent.click(screen.getByLabelText(/coding/i));

  userEvent.click(screen.getByText(/submit/i));

  expect(screen.getByText(/form submitted successfully!/i)).toBeInTheDocument();
  expect(screen.getByText(/name: john doe/i)).toBeInTheDocument();
  expect(screen.getByText(/email: john@example.com/i)).toBeInTheDocument();
  expect(screen.getByText(/interests: coding/i)).toBeInTheDocument();
});