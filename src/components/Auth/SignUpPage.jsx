import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase'; // Import the auth instance
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Signed in
      const user = userCredential.user;
      console.log("Signed up:", user);
      navigate('/login'); // Redirect to login or home
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
      console.error("Error signing up:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <p>Already have an account? <a href="/login">Log in</a></p>
    </div>
  );
};

export default SignupPage;