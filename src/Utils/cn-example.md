# Using the `cn` Utility

The `cn` utility function combines `clsx` and `tailwind-merge` to help you:
1. Conditionally apply classes
2. Merge Tailwind CSS classes properly (resolving conflicts)
3. Accept custom className props

## Import

```javascript
import { cn } from '../../Utils/cn';
```

## Basic Usage

### 1. Simple class merging
```javascript
<div className={cn('bg-red-500', 'text-white', 'p-4')}>
  Content
</div>
```

### 2. Conditional classes
```javascript
<div className={cn(
  'base-class',
  isActive && 'active-class',
  isDisabled && 'disabled-class'
)}>
  Content
</div>
```

### 3. With custom className prop
```javascript
const MyComponent = ({ className, children }) => {
  return (
    <div className={cn(
      'default-styles bg-blue-500 p-4',
      className // User can override/extend styles
    )}>
      {children}
    </div>
  );
};

// Usage:
<MyComponent className="bg-red-500 mt-4">
  The bg-red-500 will override bg-blue-500, and mt-4 will be added
</MyComponent>
```

### 4. Object syntax (from clsx)
```javascript
<div className={cn({
  'bg-blue-500': isPrimary,
  'bg-red-500': isDanger,
  'opacity-50': isDisabled
})}>
  Content
</div>
```

### 5. Array syntax
```javascript
<button className={cn([
  'base-button',
  variant === 'primary' && 'btn-primary',
  variant === 'secondary' && 'btn-secondary',
  size === 'large' && 'btn-lg',
  className
])}>
  Button
</button>
```

## Real-world Example

```javascript
import { cn } from '../../Utils/cn';

const Card = ({
  children,
  variant = 'default',
  className,
  elevated = false
}) => {
  return (
    <div className={cn(
      // Base styles
      'rounded-lg p-4 transition-all',
      // Variant styles
      {
        'bg-white text-gray-900': variant === 'default',
        'bg-blue-500 text-white': variant === 'primary',
        'bg-red-500 text-white': variant === 'danger',
      },
      // Conditional styles
      elevated && 'shadow-lg hover:shadow-xl',
      // Custom classes from props
      className
    )}>
      {children}
    </div>
  );
};

// Usage:
<Card variant="primary" elevated className="mt-4 border border-blue-600">
  Card content
</Card>
```

## Why Use `cn`?

### Without `cn`:
```javascript
// Problem: bg-blue-500 and bg-red-500 both apply (Tailwind conflict)
<div className={`bg-blue-500 ${error ? 'bg-red-500' : ''}`}>
  Content
</div>
```

### With `cn`:
```javascript
// Solution: tailwind-merge resolves the conflict, only bg-red-500 applies
<div className={cn('bg-blue-500', error && 'bg-red-500')}>
  Content
</div>
```

## Benefits

1. **Conflict Resolution**: Automatically handles Tailwind class conflicts
2. **Conditional Logic**: Clean syntax for conditional classes
3. **Type Safety**: Works well with TypeScript
4. **Flexibility**: Accepts strings, objects, arrays, and falsy values
5. **Prop Extension**: Easy to accept and merge custom className props
