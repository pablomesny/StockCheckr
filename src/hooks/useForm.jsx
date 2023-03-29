import { useState } from "react";

export const useForm = ( initialState = {} ) => {

    const [ formData, setFormData ] = useState( initialState );
    const [ isInputValid, setIsInputValid ] = useState({
        isPasswordValid: true,
        isEmailValid: true,
        doesPasswordsMatch: true
    });

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormData({
            ...formData,
            [ name ]: value
        })
    }

    const handleInputValidation = ({ target }) => {
        const { name, value } = target;

        if( name === 'email' ) {
            const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            setIsInputValid( (prev) => ({
                ...prev,
                isEmailValid: value.match( EMAIL_REGEXP )
            }));

            return;
        }

        if( name === 'password' ) {
            setIsInputValid( (prev) => ({
                ...prev,
                isPasswordValid: ( value.length >= 8 )
            }))

            return;
        }
    }

    const handlePasswordMatch = ( password, passwordCheck ) => {
        if( password !== passwordCheck ) {
            setIsInputValid({
                ...isInputValid,
                doesPasswordsMatch: false
            })

            return;
        }

        setIsInputValid({
            ...isInputValid,
            doesPasswordsMatch: true
        })
    }

  return {
    formData,
    isInputValid,
    onInputChange,
    handleInputValidation,
    handlePasswordMatch
  }
}
