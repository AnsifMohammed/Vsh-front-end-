
import  {useState } from 'react';

// Card Component
const Card = ({
  // Content props
  children,
  header,
  title,
  subtitle,
  description,
  footer,
  image,
  imageAlt = '',
  imagePosition = 'top', // 'top', 'left', 'right', 'background'
  
  // Badge/Tag
  badge,
  badgePosition = 'top-right', // 'top-left', 'top-right', 'bottom-left', 'bottom-right'
  badgeVariant = 'primary',
  
  // Icon
  icon,
  iconPosition = 'header', // 'header', 'top', 'center'
  
  // Styling props
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  imageClassName = '',
  titleClassName = '',
  subtitleClassName = '',
  descriptionClassName = '',
  
  // Layout props
  variant = 'elevated', // 'elevated', 'outlined', 'filled', 'ghost'
  size = 'medium', // 'small', 'medium', 'large', 'full'
  rounded = 'lg', // 'none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'
  padding = 'default', // 'none', 'compact', 'default', 'comfortable', 'spacious'
  
  // Shadow and effects
  shadow = 'default', // 'none', 'sm', 'default', 'md', 'lg', 'xl'
  hover = true,
  hoverable = false,
  interactive = false,
  
  // Border
  bordered = false,
  borderColor = 'gray-200',
  
  // Background
  background = 'white',
  overlay = false,
  overlayOpacity = 50,
  
  // Image overlay (for background images)
  imageOverlay = false,
  imageOverlayColor = 'black',
  imageOverlayOpacity = 40,
  
  // Orientation
  orientation = 'vertical', // 'vertical', 'horizontal'
  
  // Click handler
  onClick,
  onMouseEnter,
  onMouseLeave,
  
  // Additional props
  loading = false,
  disabled = false,
  selected = false,
  
  ...rest
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Size classes
  const sizeClasses = {
    small: 'max-w-xs',
    medium: 'max-w-sm',
    large: 'max-w-md',
    full: 'w-full'
  };

  // Padding classes
  const paddingClasses = {
    none: 'p-0',
    compact: 'p-3',
    default: 'p-4',
    comfortable: 'p-6',
    spacious: 'p-8'
  };

  // Rounded classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full'
  };

  // Shadow classes
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    default: 'shadow',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  // Variant classes
  const variantClasses = {
    elevated: `bg-${background} ${shadowClasses[shadow]}`,
    outlined: `bg-${background} border-2 border-${borderColor}`,
    filled: `bg-gray-100`,
    ghost: 'bg-transparent'
  };

  // Hover effects
  const hoverClasses = hover ? 'transition-all duration-300' : '';
  const interactiveHover = interactive || hoverable ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1' : '';
  const selectedClasses = selected ? 'ring-2 ring-[var(--color-primary)] ring-offset-2' : '';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  // Badge position classes
  const badgePositionClasses = {
    'top-left': 'top-3 left-3',
    'top-right': 'top-3 right-3',
    'bottom-left': 'bottom-3 left-3',
    'bottom-right': 'bottom-3 right-3'
  };

  // Badge variant classes
  const badgeVariantClasses = {
    primary: 'bg-[var(--color-primary)] text-white',
    secondary: 'bg-gray-200 text-gray-800',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    danger: 'bg-red-500 text-white',
    gold: 'bg-[var(--color-gold)] text-white'
  };

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e) => {
    setIsHovered(false);
    onMouseLeave?.(e);
  };

  const renderImage = () => {
    if (!image) return null;

    if (imagePosition === 'background') {
      return (
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            className={`w-full h-full object-cover ${imageClassName}`}
          />
          {imageOverlay && (
            <div
              className={`absolute inset-0 bg-${imageOverlayColor}`}
              style={{ opacity: imageOverlayOpacity / 100 }}
            />
          )}
        </div>
      );
    }

    const imageElement = (
      <img
        src={image}
        alt={imageAlt}
        className={`w-full h-48 object-cover ${imageClassName}`}
      />
    );

    if (imagePosition === 'top') {
      return <div className="overflow-hidden rounded-t-lg">{imageElement}</div>;
    }

    return imageElement;
  };

  const renderBadge = () => {
    if (!badge) return null;

    return (
      <div className={`absolute ${badgePositionClasses[badgePosition]} z-10`}>
        <span className={`
          inline-flex items-center px-3 py-1 rounded-full text-badge font-medium
          ${badgeVariantClasses[badgeVariant]}
        `}>
          {badge}
        </span>
      </div>
    );
  };

  const renderIcon = () => {
    if (!icon) return null;

    const iconSizes = {
      small: 'w-8 h-8',
      medium: 'w-12 h-12',
      large: 'w-16 h-16'
    };

    if (iconPosition === 'center') {
      return (
        <div className="flex justify-center mb-4">
          <div className={`${iconSizes[size]} text-[var(--color-primary)]`}>
            {icon}
          </div>
        </div>
      );
    }

    return icon;
  };

  const cardContent = (
    <>
      {/* Background Image */}
      {imagePosition === 'background' && renderImage()}

      {/* Badge */}
      {renderBadge()}

      {/* Top Image */}
      {imagePosition === 'top' && renderImage()}

      {/* Content Wrapper */}
      <div className={`${imagePosition === 'background' ? 'relative z-10' : ''}`}>
        {/* Header */}
        {(header || (icon && iconPosition === 'header')) && (
          <div className={`${padding !== 'none' ? paddingClasses[padding] : 'p-4'} pb-0 ${headerClassName}`}>
            {icon && iconPosition === 'header' && renderIcon()}
            {header}
          </div>
        )}

        {/* Body */}
        <div className={`${padding !== 'none' ? paddingClasses[padding] : 'p-4'} ${bodyClassName}`}>
          {icon && iconPosition === 'center' && renderIcon()}
          
          {title && (
            <h3 className={`text-h4 font-semibold text-gray-900 mb-2 ${titleClassName}`}>
              {title}
            </h3>
          )}

          {subtitle && (
            <p className={`text-body-small text-gray-600 mb-3 ${subtitleClassName}`}>
              {subtitle}
            </p>
          )}

          {description && (
            <p className={`text-body text-gray-700 ${descriptionClassName}`}>
              {description}
            </p>
          )}

          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className={`${padding !== 'none' ? paddingClasses[padding] : 'p-4'} pt-0 ${footerClassName}`}>
            {footer}
          </div>
        )}
      </div>
    </>
  );

  if (loading) {
    return (
      <div className={`
        ${sizeClasses[size]}
        ${roundedClasses[rounded]}
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${className}
        animate-pulse
      `}>
        <div className="h-48 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
    );
  }

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${roundedClasses[rounded]}
        ${variantClasses[variant]}
        ${hoverClasses}
        ${interactiveHover}
        ${selectedClasses}
        ${disabledClasses}
        ${bordered ? `border-2 border-${borderColor}` : ''}
        ${imagePosition === 'background' ? 'relative' : ''}
        overflow-hidden
        ${className}
      `}
      onClick={!disabled ? onClick : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {cardContent}
    </div>
  );
};

export default Card;