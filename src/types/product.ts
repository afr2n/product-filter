export type PropertyValue = {
  property_id: number
  value: string
}

export type Property = {
  id: number
  name: string
  type: string
}

export type Operator = {
  text: string
  id: string
}
export type OperatorWithValidTypes = Operator & {
  validValueInput: string
  validPropertyType: string
}

export type Product = {
  id: number
  property_values: PropertyValue[]
}
