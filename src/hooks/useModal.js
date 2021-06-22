import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'


export const useModal = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [values, setValues] = useState('');

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    const handleInputChange = (task) => {
        setValues({
            id: task.id,
            title: task.title,
            body: task.body,
            date: task.date
        });
    }

    const handleChange = ({ target }) => {
        setValues({
            ...values,
            [ target.name ]: target.value
        });
    }

    return [ isOpen, values, showModal, hideModal, handleInputChange, handleChange ];

}