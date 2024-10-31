import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAth from '../Container/OAth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/API/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if response is OK
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);
      navigate('/sign-in');

    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input
          type="text"
          placeholder='username'
          className='border-2 border-blue-800 rounded-lg p-4'
          id='username'
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder='email'
          className='border-2 border-blue-800 rounded-lg p-4'
          id='email'
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder='password'
          className='border-2 border-blue-800 rounded-lg p-4'
          id='password'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-green-500 text-black p-3 rounded-lg uppercase hover:opacity-100 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAth/>
      </form>
      <div className='flex gap-3 mt-5'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}