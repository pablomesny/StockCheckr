import { useState } from "react";

export const useForm = ( initialState = {} ) => {

    const [ formData, setFormData ] = useState( initialState );

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormData({
            ...formData,
            [ name ]: value
        })
    }

  return {
    formData,
    onInputChange
  }
}
