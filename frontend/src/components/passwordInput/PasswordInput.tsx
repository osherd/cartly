import { useState } from 'react';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai';

import './PasswordInput.scss';

interface PasswordInputProps {
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder,
  value,
  name,
  onChange,
  onPaste,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className='password'>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        name={name}
        required
        value={value}
        onChange={onChange}
        onPaste={onPaste}
      />
      <div className='icon' onClick={togglePassword}>
        {showPassword ? (
          <AiOutlineEyeInvisible size={20} />
        ) : (
          <AiOutlineEye size={20} />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
