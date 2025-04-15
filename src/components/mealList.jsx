"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./mealList.module.css";

const MealList = () => {
    const url = "https://www.themealdb.com/api/json/v1/1/random.php";

    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                setLoading(true);
                const response = await axios.get(url);
                setMeals(response.data.meals); // Corrigido de setFilms para setMeals
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar receita na API");
                setError("Não foi possível carregar as receitas. Tente novamente mais tarde!");
                setLoading(false);
            }
        };

        fetchMeals();
    }, []);

    if (loading) {
        return <div className={styles.loading}>Carregando receitas...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.heading}>Receitas Aleatórias</h1>
            {meals.map((meal) => (
                <div key={meal.idMeal} className={styles.card}>
                    <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className={styles.thumbnail}
                    />
                    <div className={styles.details}>
                        <h2 className={styles.name}>{meal.strMeal}</h2>
                        <p>
                            <strong>Categoria:</strong> {meal.strCategory}
                        </p>
                        <p>
                            <strong>Origem:</strong> {meal.strArea}
                        </p>
                        <p className={styles.instructions}>
                            {meal.strInstructions.substring(0, 100)}...
                        </p>
                        <a
                            href={meal.strSource}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.button}
                        >
                            Ver Receita Completa
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MealList;