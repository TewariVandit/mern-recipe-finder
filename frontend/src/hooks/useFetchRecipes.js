import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setRecipes } from '@/redux/recipe-slice';

const useFetchRecipes = (ingredients) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRecipes = async () => {
            if (ingredients) {
                try {
                    const response = await axios.post('http://localhost:8000/api/v1/recipe/search', { selectedIngredients: ingredients });
                    if (response.data.matchedRecipes) {
                        dispatch(setRecipes(response.data.matchedRecipes));
                    }
                } catch (error) {
                    console.error('Error fetching recipes:', error);
                }
            }
        };

        fetchRecipes();
    }, [ingredients, dispatch]);
};

export default useFetchRecipes;
