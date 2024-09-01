import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { ingredientsSelector } from '../../services/slices/burger/ingredients-slice';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Preloader } from '@ui';

export const IngredientDetails: FC = () => {
  const ingredientData = useSelector(ingredientsSelector).find(
    (ingredient) => ingredient._id === useParams().id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
