import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setRecipeDetails } from '@/redux/recipe-slice';

const useRecipeDetails = (recipeId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            if (recipeId) {
                try {
                    const response = await axios.get(`http://localhost:8000/api/v1/recipe/${recipeId}`);
                    if (response.data) {
                        dispatch(setRecipeDetails(response.data));
                    }
                } catch (error) {
                    console.error('Error fetching recipe details:', error);
                }
            }
        };

        fetchRecipeDetails();
    }, [recipeId, dispatch]);
};

export default useRecipeDetails;
