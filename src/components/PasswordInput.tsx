import { useId, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { MAX_PASSWORD_LENGTH } from '@/constants/auth';
import '@/styles/password-field.css';

type PasswordInputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    autoComplete?: string;
    minLength?: number;
    maxLength?: number;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    showToggle?: boolean;
};

export function PasswordInput({
    value,
    onChange,
    placeholder = 'Password',
    autoComplete,
    minLength,
    maxLength = MAX_PASSWORD_LENGTH,
    disabled = false,
    required = false,
    className = 'input',
    showToggle = true
}: PasswordInputProps) {
    const inputId = useId();
    const [visible, setVisible] = useState(false);

    const input = (
        <input
            id={inputId}
            className={`${className}${showToggle ? ' passwordFieldInput' : ''}`}
            type={showToggle && visible ? 'text' : 'password'}
            placeholder={placeholder}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            maxLength={maxLength}
            minLength={minLength}
            autoComplete={autoComplete}
            disabled={disabled}
            required={required}
        />
    );

    if (!showToggle) {
        return input;
    }

    return (
        <div className="passwordFieldWrap">
            {input}
            <button
                type="button"
                className="passwordFieldToggle"
                onClick={() => setVisible((prev) => !prev)}
                disabled={disabled}
                aria-label={visible ? 'Hide password' : 'Show password'}
                aria-pressed={visible}
                aria-controls={inputId}
                title={visible ? 'Hide password' : 'Show password'}
            >
                {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
        </div>
    );
}
