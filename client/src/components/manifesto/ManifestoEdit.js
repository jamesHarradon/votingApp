import React from "react";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAmendManifestoMutation } from "../../services/manifesto";

export default function EditManifestoForm({ id, toast, section, setSection, setEditClick }) {

    const [ amendManifesto ] = useAmendManifestoMutation();
    
    const handleEdit = async (data) => {
        try {
            const obj = {id: id, body: data};
            await amendManifesto(obj);
            console.log(obj);
            setSection(null);
            setEditClick(false);
            toast('Manifesto edited!')
        } catch (error) {
            console.log(error)
        }
    }

    let formSchema;

    if (section === 'who') {
        formSchema = Yup.object().shape({
            who: Yup.string()
            .max(1000)
            .required('Section is required')
        })
    }

    if (section === 'what') {
        formSchema = Yup.object().shape({
            what: Yup.string()
            .max(1000)
            .required('Section is required')
        })
    }

    if (section === 'why') {
        formSchema = Yup.object().shape({
            why: Yup.string()
            .max(1000)
            .required('Section is required')
        })
    }

    const formOptions = {resolver: yupResolver(formSchema)};
    const { register, handleSubmit, formState:{ errors } } = useForm(formOptions);

    return (
        <div className='modal-container'>
            <div className='modal manifesto-modal'>
                <div className='close' onClick={() => {setSection(null); setEditClick(false);}}>+</div>
                <h2>Edit Manifesto</h2><br></br>
            
                <form onSubmit={handleSubmit(handleEdit)}>
                    <div className='add-form-fields'>
                        
                        {section === 'who' && 
                            <>
                            <textarea type='text' id='who' name='who' rows='10' cols='50' placeholder="Who am I?" {...register('who')} className={`form-control ${errors.who ? 'is-invalid' : ''}`}></textarea>
                            <div className='invalid-feedback'>{errors.who?.message}</div>
                            </>
                        }

                        {section === 'what' &&
                            <>
                            <textarea type='text' id='what' name='what' rows='10' cols='50' placeholder="What do I want to achieve?" {...register('what')} className={`form-control ${errors.what ? 'is-invalid' : ''}`} ></textarea>
                            <div className='invalid-feedback'>{errors.what?.message}</div>
                            </>
                        }
                        
                        {section === 'why' &&
                            <>
                            <textarea type='why' id='why' name='why' rows='10' cols='50' placeholder="Why vote for me?" {...register('why')} className={`form-control ${errors.why ? 'is-invalid' : ''}`} ></textarea>
                            <div className='invalid-feedback'>{errors.why?.message}</div>
                            </>
                        }

                    </div>
                    <button type='submit' className='submit'>Submit</button>  
                </form>
            </div>
        </div>
    )
}