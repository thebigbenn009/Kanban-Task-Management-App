"use client"

import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import RemoveInput from '../RemoveInput'
import { createNewBoard } from '@/utils/actions'

const NewBoard = () => {
    const {register, control,handleSubmit, reset, formState:{errors}} = useForm({
       defaultValues:{
        boardName: "Tutorials",
        columns: [{ name: "Todo" }, { name: "Doing" }],
       }
    })

    const {fields, append, remove} = useFieldArray({
        name:"columns",
        control
    })
    const onSubmit = async (data:any) => {
       
        await createNewBoard(data)
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form new-board-form'>
        <div className="new-board">

        <h3>Add New Board</h3>
        </div>
        <div className="form-inputs-container">

        <label htmlFor="boardName">Board Name</label>
        <div className="mar-b">
        <input className='' id='boardName' type="text" {...register("boardName", {
        required:{
            value:true, 
            message:"cannot be empty"
        }
    })} placeholder='e.g. Web Design'/>
    {errors?.boardName && <span className='error'>{errors?.boardName?.message}</span>} 
        </div>
       
<div className='board-columns'>
    <label>Board Columns</label>
   

    {fields.map((field, index)=>{
        return <div key={field.id} className="add-column">
            <input type="text" {...register(`columns.${index}.name`, {
                required:{
                    value: true, 
                    message: "cannot be empty"
                }
            })}  />
              <span className='error'>{errors?.columns?.[index]?.name?.message}</span>
            <RemoveInput removeInput={()=>remove(index)}/>
        </div>
    })}
     <button type='button' onClick={()=>append({name :""})} className='btn btn-block btn-white'><strong>+</strong> Add New Column</button>
</div>
        </div>
<div className="form-btn-container">
   
    <button className='btn btn-block' type='submit'>Create new board</button>
</div>
      
    </form>
  )
}

export default NewBoard
