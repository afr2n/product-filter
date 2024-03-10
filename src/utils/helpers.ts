const operatorsTable = [
  { type: 'string', operators: ['equals', 'any', 'none', 'in', 'contains'] },
  {
    type: 'number',
    operators: ['equals', 'greater_than', 'less_than', 'any', 'none', 'in'],
  },
  { type: 'enumerated', operators: ['equals', 'any', 'none', 'in'] },
]

const validInputType = [
  {
    type: 'input',
    operators: ['equals', 'greater_than', 'less_than', 'contains'],
  },
  { type: 'noValueInput', operators: ['none', 'any'] },
  { type: 'multiSelect', operators: ['in'] },
]

export const getPropertyTypesForOperator = (operator: string) => {
  const propertyTypes = []
  for (const entry of operatorsTable) {
    if (entry.operators.includes(operator)) {
      propertyTypes.push(entry.type)
    }
  }
  return propertyTypes
}
export const getValueInputForOperator = (operator: string) => {
  for (const item of validInputType) {
    if (item.operators.includes(operator)) {
      return item.type
    }
  }
  return null
}

export const generateSlug = (str: string) => {
  return str
    .toLowerCase() // Convert the string to lowercase
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '') // Remove special characters
    .replace(/\-\-+/g, '-') // Replace multiple hyphens with a single hyphen
    .replace(/^-+/, '') // Trim hyphens from the start of the string
    .replace(/-+$/, '') // Trim hyphens from the end of the string
}
