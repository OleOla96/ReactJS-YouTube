import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './button.module.scss';

const cb = classNames.bind(styles);

export default function Button({
  to,
  href,
  primary = false,
  warning = false,
  danger = false,
  outline = false,
  text = false,
  rounded = false,
  circle = false,
  disabled = false,
  submit = false,
  small = false,
  large = false,
  children,
  className,
  leftIcon,
  centerIcon,
  rightIcon,
  onClick,
  ...passProps
}) {
  let Comp = 'button';
  const props = {
    onClick,
    ...passProps,
  };
  // Remove event listener when btn is disabled
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key];
      }
    });
  }

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }

  const classes = cb('wrapper', {
    [className]: className,
    primary,
    warning,
    danger,
    outline,
    text,
    disabled,
    submit,
    rounded,
    circle,
    small,
    large,
  });

  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cb('icon')}>{leftIcon}</span>}
      {centerIcon && <span className={cb('icon', 'center')}>{centerIcon}</span>}
      <span className={cb('title')}>{children}</span>
      {rightIcon && <span className={cb('icon')}>{rightIcon}</span>}
    </Comp>
  );
}

Button.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  primary: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool,
  outline: PropTypes.bool,
  text: PropTypes.bool,
  rounded: PropTypes.bool,
  circle: PropTypes.bool,
  disabled: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  leftIcon: PropTypes.node,
  centerIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  onClick: PropTypes.func,
};
