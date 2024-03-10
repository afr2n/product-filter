export type ButtonType =
  | 'btn-primary'
  | 'btn-secondary'
  | 'btn-tertiary'
  | 'btn-destructive'
  | 'btn-confirmation'
  | 'btn-warning'

interface Props {
  btnText?: string
  extraClassName?: string
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | undefined
  buttonType?: ButtonType
  disabled?: boolean
  textClassName?: string
  dataTestId?: string
  type?: 'button' | 'submit' | 'reset'
}

export const CustomButton = ({
  btnText,
  onClick,
  extraClassName,
  textClassName = '',
  buttonType = 'btn-primary',
  disabled = false,
  dataTestId,
  type,
}: Props) => {
  const className = buttonType + ' ' + extraClassName

  return (
    <button
      onClick={onClick}
      data-testid={dataTestId}
      className={className}
      disabled={disabled}
      type={type}
    >
      <span className={`${textClassName} font-semibold `}>{btnText}</span>
    </button>
  )
}

export default CustomButton
