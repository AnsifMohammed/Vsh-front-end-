
import React, { useState } from 'react';

// FormInput Component
const FormInput = ({
  // Input props
  type = 'text',
  name,
  id,
  value,
  defaultValue,
  placeholder,
  disabled = false,
  required = false,
  readOnly = false,
  autoComplete,
  maxLength,
  min,
  max,
  step,
  pattern,
  
  // Label props
  label,
  labelClassName = '',
  showLabel = true,
  
  // Helper text
  helperText,
  helperClassName = '',
  
  // Error handling
  error,
  errorMessage,
  errorClassName = '',
  
  // Success state
  success = false,
  successMessage,
  
  // Icon props
  leftIcon,
  rightIcon,
  
  // Styling props
  className = '',
  inputClassName = '',
  containerClassName = '',
  wrapperClassName = '',
  
  // Size variants
  size = 'medium', // 'small', 'medium', 'large'
  
  // Variant styles
  variant = 'default', // 'default', 'outlined', 'filled', 'underlined'
  
  // Corner radius
  rounded = 'md', // 'none', 'sm', 'md', 'lg', 'full'
  
  // Event handlers
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  onClick,
  
  // Additional props
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Size classes
  const sizeClasses = {
    small: 'px-3 py-1.5 text-body-small',
    medium: 'px-4 py-2.5 text-body',
    large: 'px-5 py-3 text-body-large'
  };

  // Rounded classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  // Variant classes
  const variantClasses = {
    default: 'border border-gray-300 bg-white focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20',
    outlined: 'border-2 border-gray-300 bg-transparent focus:border-[var(--color-primary)]',
    filled: 'border-0 bg-gray-100 focus:bg-gray-200',
    underlined: 'border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus:border-[var(--color-primary)] px-0'
  };

  // State classes
  const getStateClasses = () => {
    if (disabled) return 'bg-gray-100 cursor-not-allowed opacity-60';
    if (error) return 'border-red-500 focus:border-red-500 focus:ring-red-500/20';
    if (success) return 'border-green-500 focus:border-green-500 focus:ring-green-500/20';
    return '';
  };

  // Icon wrapper size
  const iconSize = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6'
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const inputId = id || name;

  return (
    <div className={`w-full ${containerClassName}`}>
      {/* Label */}
      {label && showLabel && (
        <label
          htmlFor={inputId}
          className={`block text-label font-medium text-gray-700 mb-1.5 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Wrapper */}
      <div className={`relative ${wrapperClassName}`}>
        {/* Left Icon */}
        {leftIcon && (
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 ${iconSize[size]}`}>
            {leftIcon}
          </div>
        )}

        {/* Input Field */}
        <input
          type={type}
          name={name}
          id={inputId}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          autoComplete={autoComplete}
          maxLength={maxLength}
          min={min}
          max={max}
          step={step}
          pattern={pattern}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onClick={onClick}
          className={`
            w-full
            ${sizeClasses[size]}
            ${roundedClasses[rounded]}
            ${variantClasses[variant]}
            ${getStateClasses()}
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            transition-all duration-200
            outline-none
            placeholder:text-gray-400
            ${inputClassName}
            ${className}
          `}
          {...rest}
        />

        {/* Right Icon */}
        {rightIcon && (
          <div className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 ${iconSize[size]}`}>
            {rightIcon}
          </div>
        )}
      </div>

      {/* Helper Text */}
      {helperText && !error && !success && (
        <p className={`mt-1.5 text-body-small text-gray-500 ${helperClassName}`}>
          {helperText}
        </p>
      )}

      {/* Error Message */}
      {error && errorMessage && (
        <p className={`mt-1.5 text-body-small text-red-500 flex items-start gap-1 ${errorClassName}`}>
          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {errorMessage}
        </p>
      )}

      {/* Success Message */}
      {success && successMessage && (
        <p className={`mt-1.5 text-body-small text-green-500 flex items-start gap-1`}>
          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default FormInput;