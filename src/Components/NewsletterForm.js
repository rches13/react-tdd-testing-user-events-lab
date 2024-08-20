import React, { useState } from "react";
import FormInput from "./FormInput";
import InterestCheckbox from "./InterestCheckbox";

function NewsletterForm() {// Add the NewsletterForm component
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState({
    Coding: false,
    Music: false,
    Traveling: false,
  });// Add the interests state
  const [message, setMessage] = useState("");// Add the message state

  const handleSubmit = (event) => {// Add the handleSubmit function
    event.preventDefault();
    const selectedInterests = Object.entries(interests)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    setMessage(
      `Form submitted successfully! Name: ${name}, Email: ${email}, Interests: ${selectedInterests.join(
        ", "
      )}`
    );
  };

  return (
    <div>
      <h2>Newsletter Signup</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name:"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          label="Email:"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <fieldset>
          <legend>Interests:</legend>
          <InterestCheckbox
            label="Coding"
            checked={interests.Coding}
            onChange={() =>
              setInterests((prev) => ({ ...prev, Coding: !prev.Coding }))
            }
          />
          <InterestCheckbox
            label="Music"
            checked={interests.Music}
            onChange={() =>
              setInterests((prev) => ({ ...prev, Music: !prev.Music }))
            }
          />
          <InterestCheckbox
            label="Traveling"
            checked={interests.Traveling}
            onChange={() =>
              setInterests((prev) => ({ ...prev, Traveling: !prev.Traveling }))
            }
          />
        </fieldset>
        <button type="submit">Submit</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default NewsletterForm;