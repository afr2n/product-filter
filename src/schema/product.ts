import * as Yup from 'yup'

// Define a schema for a single string value
const stringValueSchema = Yup.string().required()

// Define a schema for an array of string values
const arrayValueSchema = Yup.array().of(Yup.string()).required()

// Define the product filter schema using Yup.lazy() to conditionally apply validation
export const productFilterSchema = Yup.object({
  property: Yup.number().required(),
  propertyType: Yup.string().required(),
  operator: Yup.string().required(),
  propertyValue: Yup.lazy((value) =>
    Array.isArray(value) ? arrayValueSchema : stringValueSchema
  ),
}).noUnknown()

export type ProductFilterSchema = Yup.InferType<typeof productFilterSchema>
