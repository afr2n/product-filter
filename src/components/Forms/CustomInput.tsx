import { FormRegister } from '@/types/forms'

type CustomInputProps = {
  register: FormRegister
  fieldName: string
  placeholder: string
  onChangeInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomInput = (props: CustomInputProps) => {
  const { register, fieldName, onChangeInput, placeholder } = props
  return (
    <input
      className="w-48 custom-input"
      {...register(fieldName)}
      onChange={onChangeInput}
      placeholder={placeholder}
    />
  )
}

export default CustomInput
