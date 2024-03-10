import { UseFormRegister, FieldValues } from 'react-hook-form'
import { MultiValue } from 'react-select'

export type FormRegister = UseFormRegister<FieldValues>
export type SelectOptionType = {
  label: string
  value: string
  type?: string
  validValueInput?: string
}

export type MultiValueOptions = MultiValue<
  { label: string; value: string } | undefined
>
