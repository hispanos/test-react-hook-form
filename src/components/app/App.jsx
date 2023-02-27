import React from 'react'
import { useForm } from 'react-hook-form'
import './style.css'

const App = () => {

    const { register, handleSubmit, watch, formState: {errors} } = useForm({
        defaultValues: {
            quantity: 1
        }
    });

    const hasIVA = watch('hasIVA');

    const onSubmit = (data) => {
        console.log(data);
    }

    const validatePrice = (value) => {
        if ( !value.length || value.length < 3) {
            return "El precio debe tener mínimo 3 caracteres"
        }
        return true;
    }

    return (
        <>
            <h1>Formularios</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder='Nombre'
                    {...register('name', {
                        required: {
                            value: true,
                            message: 'El nombre es requerido'
                        }
                    })}
                />
                {
                    errors.name && <span className='error'>{errors.name.message}</span>
                }
                <input
                    type="text"
                    placeholder='Precio'
                    {...register('price', {
                        required: "El predio es requerido",
                        validate: validatePrice
                    })}
                />
                {
                    errors.price && <span className='error'>{errors.price.message}</span>
                }
                <input
                    type="text"
                    placeholder='Cantidad'
                    {...register('quantity')}
                />
                <select
                    {...register('hasIVA')}
                >
                    <option value="">El producto lleva IVA?</option>
                    <option value="1">Lleva IVA</option>
                    <option value="0">Excento</option>
                </select>
                {
                    hasIVA === '1' ?
                        <input
                            type="text"
                            placeholder='% IVA'
                            {...register('iva')}
                        />
                        :
                        <></>
                }
                <button
                    type='submit'>
                    Guardar
                </button>
            </form>
        </>
    )
}

export default App