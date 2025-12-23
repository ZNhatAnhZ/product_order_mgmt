import * as yup from 'yup';

export const ProductSchema = yup.object({
    name: yup
        .string()
        .required('Name is required')
        .trim()
        .max(100, 'Name must be at most 100 characters'),
    description: yup
        .string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters')
        .max(500, 'Description must be at most 500 characters'),
    price: yup
        .number()
        .required('Price is required')
        .min(0.01, 'Price must be at least $0.01')
        .max(999999, 'Price must be at most $999,999')
        .transform((value, originalValue) => {
            return originalValue === '' ? undefined : value;
        }),
    stock: yup
        .number()
        .required('Stock is required')
        .integer('Stock must be a whole number')
        .min(0, 'Stock cannot be negative')
        .transform((value, originalValue) => {
            return originalValue === '' ? undefined : value;
        }),
    image: yup
        .string()
        .required('Image URL is required')
        .url('Please enter a valid URL'),
    status: yup
        .string()
        .oneOf(['active', 'inactive'], 'Status must be either Active or Inactive')
        .default('active'),
});
