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

    const isPasswordValid = ( password ) => {
        return password.length < 8;
    }

    const isEmailValid = ( email ) => {
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        return email.match( emailRegex );
    }

  return {
    formData,
    onInputChange,
    isPasswordValid,
    isEmailValid
  }
}
