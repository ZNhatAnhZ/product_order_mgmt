import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import styled from 'styled-components';
import {ProductSchema} from '../../schemas/ProductSchema.js';
import {FormInput} from '../common/FormInput.jsx';
import {FormTextarea} from '../common/FormTextarea.jsx';
import {FormSelect} from '../common/FormSelect.jsx';
import {Button} from "@mui/material";

const FormContainer = styled.div`
    padding: 2em;
`;

const FormDiv = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 30em;
    gap: 1rem;
`;

const ImagePreview = styled.img`
    max-width: 15em;
    max-height: 15em;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 1em;
    justify-content: flex-end;
`;

export const ProductForm = ({onSubmit, isSubmitting = false, onCancel, initialData}) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors, isValid},
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(ProductSchema),
        defaultValues: initialData
    });
    const watchedImage = watch('image');
    const watchedDescription = watch('description');
    const statusOptions = [
        {value: 'active', label: 'Active', default: !initialData || initialData?.status === 'active'},
        {value: 'inactive', label: 'Inactive', default: initialData?.status === 'inactive'}
    ];
    return (
        <FormContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormDiv>
                    <FormInput
                        label="Product Name"
                        name="name"
                        placeholder="Enter product name"
                        required={true}
                        error={errors.name?.message}
                        {...register('name')}
                    />
                    <FormTextarea
                        label="Description"
                        name="description"
                        placeholder="Enter product description"
                        required={true}
                        maxLength={500}
                        value={watchedDescription || ''}
                        error={errors.description?.message}
                        {...register('description')}
                    />
                    <FormInput
                        label="Price ($)"
                        name="price"
                        step="0.01"
                        type="number"
                        placeholder="0.00"
                        required={true}
                        error={errors.price?.message}
                        {...register('price')}
                    />
                    <FormInput
                        label="Stock Quantity"
                        name="stock"
                        type="number"
                        placeholder="0"
                        required={true}
                        error={errors.stock?.message}
                        {...register('stock')}
                    />
                    <FormInput
                        label="Image URL"
                        name="image"
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        required={true}
                        error={errors.image?.message}
                        {...register('image')}
                    />
                    {watchedImage && (<ImagePreview src={watchedImage}/>)}
                    <FormSelect
                        label="Status"
                        name="status"
                        type="radio"
                        options={statusOptions}
                        error={errors.status?.message}
                        {...register('status')}
                    />
                </FormDiv>
                <ButtonContainer>
                    <Button onClick={() => onCancel()} disabled={isSubmitting}>Cancel</Button>
                    {initialData ? (
                        <Button type='submit' disabled={!isValid || isSubmitting} loading={isSubmitting}>Update Product</Button>
                    ) : (
                        <Button type='submit' disabled={!isValid || isSubmitting} loading={isSubmitting}>Create Product</Button>
                    )}
                </ButtonContainer>
            </form>
        </FormContainer>
    );
};
