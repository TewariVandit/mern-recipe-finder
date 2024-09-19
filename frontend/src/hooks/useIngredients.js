import { useState } from 'react';

const useIngredients = () => {
    const [ingredients, setIngredients] = useState({
        spices: [],
        vegetables: [],
        oil: [],
        Meat: [],
        DairyProducts: [],
        Pulses: [],
        Others: [],
    });
    const [error, setError] = useState('');

    const handleInputChange = (category, value) => {
        setIngredients((prev) => ({
            ...prev,
            [category]: value.split(',').map(item => item.trim()),
        }));
    };

    const validateIngredients = () => {
        if (Object.values(ingredients).flat().length === 0) {
            setError('Please enter at least one ingredient.');
            return false;
        }
        setError('');
        return true;
    };

    return { ingredients, handleInputChange, validateIngredients, error };
};

export default useIngredients;
