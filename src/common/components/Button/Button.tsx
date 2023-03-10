import React, { type ButtonHTMLAttributes, type DetailedHTMLProps, type FC } from 'react'
import s from './Button.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button: FC<DefaultButtonPropsType> = ({ className, children, ...restProps }) => {
  const resultClassName = `${s.button} ${className as string}`

  return (
    <button
      className={resultClassName}
      {...restProps}
    >
      {children}
    </button>
  )
}

export default Button
