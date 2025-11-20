import { useState } from "react";

const EmailScreen = ({ email, onSubmit }) => {
  const [value, setValue] = useState(email || "");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    if (!form.checkValidity()) {
      setError("Please enter a valid email address.");
      form.reportValidity();
      return;
    }

    setError("");
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label className="field-label" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        className="input"
        type="email"
        required
        placeholder="you@example.com"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {error && <div className="error-text">{error}</div>}

      <div className="button-row">
        <button type="submit" className="button-primary">
          Continue
        </button>
      </div>
    </form>
  );
};
export default EmailScreen;
