import React, { useState } from 'react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  isDarkMode: boolean;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, onSubmit, isDarkMode }) => {
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Reset error state on each submission
    setIsError(false);
    
    // Instead of directly calling onSubmit, we can wrap it to handle the error state
    try {
      onSubmit(password);
    } catch {
      setIsError(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className={`${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} p-6 shadow-lg`}>
        <h2 className="text-2xl font-bold mb-4">This post is locked. Enter a password.</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsError(false); // Clear error when user types
            }}
            placeholder="Enter password"
            className={`w-full p-2 mb-2 border rounded ${isDarkMode ? 'text-white bg-black' : 'bg-white text-black'}`}
          />
          {isError && (
            <p className="text-red-500 text-sm mb-4">Incorrect password. Please try again.</p>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className={`mr-2 px-4 py-2 ${isDarkMode ? 'bg-black hover:bg-white hover:text-black' : 'bg-white hover:bg-black hover:text-white'}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;