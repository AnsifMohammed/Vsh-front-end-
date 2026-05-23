

// Badge Component
const Badge = ({
  // Content props
  children,
  text,
  label,
  
  // Icon props
  icon,
  iconPosition = 'left', // 'left', 'right', 'only'
  
  // Dot indicator
  dot = false,
  dotPosition = 'left', // 'left', 'right'
  dotColor = 'current',
  dotPulse = false,
  
  // Close/Remove button
  closable = false,
  onClose,
  
  // Styling props
  className = '',
  textClassName = '',
  iconClassName = '',
  
  // Variant styles
  variant = 'primary', // 'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'dark', 'light', 'gold', 'gradient'
  
  // Size variants
  size = 'medium', // 'xs', 'small', 'medium', 'large', 'xl'
  
  // Shape variants
  rounded = 'full', // 'none', 'sm', 'md', 'lg', 'full', 'pill'
  
  // Style types
  type = 'solid', // 'solid', 'outline', 'soft', 'ghost', 'glass'
  
  // Border
  bordered = false,
  borderColor,
  
  // Shadow
  shadow = false,
  
  // Uppercase text
  uppercase = false,
  
  // Animations
  animate = false,
  pulse = false,
  bounce = false,
  
  // Positioning (for absolute positioned badges)
  position, // 'top-right', 'top-left', 'bottom-right', 'bottom-left'
  
  // Count/Number badge
  count,
  maxCount = 99,
  showZero = false,
  
  // Interactive
  clickable = false,
  onClick,
  
  // Additional props
  ...rest
}) => {
  // Size classes
  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    small: 'px-2 py-0.5 text-badge',
    medium: 'px-2.5 py-1 text-badge-alt',
    large: 'px-3 py-1.5 text-body-small',
    xl: 'px-4 py-2 text-body'
  };

  // Icon size classes
  const iconSizeClasses = {
    xs: 'w-2.5 h-2.5',
    small: 'w-3 h-3',
    medium: 'w-3.5 h-3.5',
    large: 'w-4 h-4',
    xl: 'w-5 h-5'
  };

  // Rounded classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
    pill: 'rounded-full'
  };

  // Variant classes for solid type
  const solidVariantClasses = {
    primary: 'bg-[var(--color-primary)] text-white',
    secondary: 'bg-gray-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    danger: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    dark: 'bg-gray-900 text-white',
    light: 'bg-gray-200 text-gray-800',
    gold: 'bg-[var(--color-gold)] text-white',
    gradient: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
  };

  // Variant classes for outline type
  const outlineVariantClasses = {
    primary: 'border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent',
    secondary: 'border-gray-500 text-gray-500 bg-transparent',
    success: 'border-green-500 text-green-500 bg-transparent',
    warning: 'border-yellow-500 text-yellow-500 bg-transparent',
    danger: 'border-red-500 text-red-500 bg-transparent',
    info: 'border-blue-500 text-blue-500 bg-transparent',
    dark: 'border-gray-900 text-gray-900 bg-transparent',
    light: 'border-gray-300 text-gray-600 bg-transparent',
    gold: 'border-[var(--color-gold)] text-[var(--color-gold)] bg-transparent',
    gradient: 'border-purple-500 text-purple-500 bg-transparent'
  };

  // Variant classes for soft type
  const softVariantClasses = {
    primary: 'bg-purple-100 text-[var(--color-primary)]',
    secondary: 'bg-gray-100 text-gray-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    dark: 'bg-gray-200 text-gray-900',
    light: 'bg-gray-50 text-gray-600',
    gold: 'bg-yellow-100 text-[var(--color-gold)]',
    gradient: 'bg-purple-100 text-purple-700'
  };

  // Variant classes for ghost type
  const ghostVariantClasses = {
    primary: 'text-[var(--color-primary)] bg-transparent hover:bg-purple-50',
    secondary: 'text-gray-600 bg-transparent hover:bg-gray-50',
    success: 'text-green-600 bg-transparent hover:bg-green-50',
    warning: 'text-yellow-600 bg-transparent hover:bg-yellow-50',
    danger: 'text-red-600 bg-transparent hover:bg-red-50',
    info: 'text-blue-600 bg-transparent hover:bg-blue-50',
    dark: 'text-gray-900 bg-transparent hover:bg-gray-100',
    light: 'text-gray-500 bg-transparent hover:bg-gray-50',
    gold: 'text-[var(--color-gold)] bg-transparent hover:bg-yellow-50',
    gradient: 'text-purple-600 bg-transparent hover:bg-purple-50'
  };

  // Variant classes for glass type
  const glassVariantClasses = {
    primary: 'bg-purple-500/20 backdrop-blur-sm text-[var(--color-primary)] border border-purple-500/30',
    secondary: 'bg-gray-500/20 backdrop-blur-sm text-gray-700 border border-gray-500/30',
    success: 'bg-green-500/20 backdrop-blur-sm text-green-700 border border-green-500/30',
    warning: 'bg-yellow-500/20 backdrop-blur-sm text-yellow-700 border border-yellow-500/30',
    danger: 'bg-red-500/20 backdrop-blur-sm text-red-700 border border-red-500/30',
    info: 'bg-blue-500/20 backdrop-blur-sm text-blue-700 border border-blue-500/30',
    dark: 'bg-gray-900/20 backdrop-blur-sm text-gray-900 border border-gray-900/30',
    light: 'bg-gray-200/20 backdrop-blur-sm text-gray-600 border border-gray-200/30',
    gold: 'bg-yellow-500/20 backdrop-blur-sm text-[var(--color-gold)] border border-yellow-500/30',
    gradient: 'bg-purple-500/20 backdrop-blur-sm text-purple-700 border border-purple-500/30'
  };

  // Get variant classes based on type
  const getVariantClasses = () => {
    switch (type) {
      case 'outline':
        return `${outlineVariantClasses[variant]} border-2`;
      case 'soft':
        return softVariantClasses[variant];
      case 'ghost':
        return ghostVariantClasses[variant];
      case 'glass':
        return glassVariantClasses[variant];
      default:
        return solidVariantClasses[variant];
    }
  };

  // Position classes for absolute positioned badges
  const positionClasses = {
    'top-right': 'absolute -top-1 -right-1',
    'top-left': 'absolute -top-1 -left-1',
    'bottom-right': 'absolute -bottom-1 -right-1',
    'bottom-left': 'absolute -bottom-1 -left-1'
  };

  // Animation classes
  const animationClasses = () => {
    if (pulse) return 'animate-pulse';
    if (bounce) return 'animate-bounce';
    if (animate) return 'transition-all duration-300 hover:scale-110';
    return '';
  };

  // Handle click
  const handleClick = (e) => {
    if (clickable && onClick) {
      onClick(e);
    }
  };

  // Handle close
  const handleClose = (e) => {
    e.stopPropagation();
    if (onClose) {
      onClose(e);
    }
  };

  // Render content
  const renderContent = () => {
    // If count is provided
    if (count !== undefined) {
      if (count === 0 && !showZero) return null;
      const displayCount = count > maxCount ? `${maxCount}+` : count;
      return displayCount;
    }

    // If icon only
    if (iconPosition === 'only' && icon) {
      return <span className={`${iconSizeClasses[size]} ${iconClassName}`}>{icon}</span>;
    }

    // Regular content with icon and text
    return (
      <>
        {dot && dotPosition === 'left' && (
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${dotPulse ? 'animate-pulse' : ''}`} 
                style={{ backgroundColor: dotColor === 'current' ? 'currentColor' : dotColor }} />
        )}
        
        {icon && iconPosition === 'left' && (
          <span className={`${iconSizeClasses[size]} ${iconClassName}`}>{icon}</span>
        )}
        
        <span className={textClassName}>
          {children || text || label}
        </span>
        
        {icon && iconPosition === 'right' && (
          <span className={`${iconSizeClasses[size]} ${iconClassName}`}>{icon}</span>
        )}
        
        {dot && dotPosition === 'right' && (
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${dotPulse ? 'animate-pulse' : ''}`} 
                style={{ backgroundColor: dotColor === 'current' ? 'currentColor' : dotColor }} />
        )}
        
        {closable && (
          <button
            onClick={handleClose}
            className="ml-1 hover:opacity-70 transition-opacity"
            aria-label="Close"
          >
            <svg className={iconSizeClasses[size]} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </>
    );
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center gap-1.5
        font-medium
        ${sizeClasses[size]}
        ${roundedClasses[rounded]}
        ${getVariantClasses()}
        ${shadow ? 'shadow-md' : ''}
        ${bordered && borderColor ? `border-2 border-${borderColor}` : ''}
        ${uppercase ? 'uppercase' : ''}
        ${animationClasses()}
        ${clickable ? 'cursor-pointer hover:opacity-80' : ''}
        ${position ? positionClasses[position] : ''}
        ${className}
      `}
      onClick={handleClick}
      {...rest}
    >
      {renderContent()}
    </span>
  );
};

export default Badge;