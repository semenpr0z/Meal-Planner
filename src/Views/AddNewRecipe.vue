<script>
import RecipesDataService from '@/services/RecipesDataService'

export default {
    data() {
        return {
            recipe: {
                "name": "Ароматные кексы с ликером",
                "image": "https://www.povarenok.ru/data/cache/2021jan/15/50/2821371_67078-300x0.jpg",
                "link": "https://www.povarenok.ru/recipes/show/169900/",
                "ingredients": [
                    {
                        "name": "Мука пшеничная",
                        "id": 1,
                        "amount": "190 г"
                    }
                ],
                "properties": {
                    "calorific": "277.6 Ккал",
                    "time": 15,
                    "complexity": "сложная",
                    "protein": "2.1 г",
                    "fats": "5.2 г",
                    "carbohydrates": "30.5 г"
                },
                "recipe": [
                    {
                        "text": "Соединим сухие компоненты муку и разрыхлитель",
                        "id": 1
                    }
                ]
            },
            password: ''
        }
    },
    methods: {
        addNewIngredient(event) {
            event.preventDefault();
            this.recipe.ingredients.push({
                'name': '',
                'amount': '',
                'id': this.recipe.ingredients.length + 1
            })
        },
        deleteLastIngredient(event) {
            event.preventDefault();
            this.recipe.ingredients.pop()
        },
        addNewStep(event) {
            event.preventDefault();
            this.recipe.recipe.push({ 'text': '', 'id': this.recipe.recipe.length + 1 })
        },
        deleteLastStep(event) {
            event.preventDefault();
            this.recipe.recipe.pop()
        },
        sendRecipe(event) {
            event.preventDefault();
            if (this.password === "mealplanner2023") {
                console.log(this.recipe)
                RecipesDataService.createOne(this.recipe)
            } else {
                alert("Брат, введи пароль")
            }
        }
    }
}
</script>

<template>
    <main class="main">
        <h1>Форма для добавления рецептов на сайт</h1>
        <p>Cоблюдаем стандарты сокращений, пробел между числом и словом, все параметры на 100 г блюда, все примеры записи в
            самих вводных полях их надо
            удалить и вписать свои данные, заполняем максимально внимательно, чтобы потом не исправлять ошибки в самой базе.
            Все вольности изложения мыслей автора рецепта убираем и переписываем чуть более официально
        </p>
        <form class="form">
            <label class="input-label" for="name">Название рецепта<input type="text" id="name"
                    v-model="recipe.name"></label>
            <label class="input-label" for="img">Ссылка на картинку(в конце рецепта кликаете на картинку и вас перебросит на
                страницу картинки(нужна ссылка этой страницы))<input type="text" id="img" v-model="recipe.image"></label>
            <label class="input-label" for="link">Ссылка на сам рецепт<input type="text" id="link"
                    v-model="recipe.link"></label>
            <label class="input-label" for="calorific">Калорийность<input type="text" id="calorific"
                    v-model="recipe.properties.calorific"></label>
            <label class="input-label" for="time">Время приготовления<input type="number" id="time"
                    v-model="recipe.properties.time"></label>
            <label class="input-label" for="complexity">Сложность (маленькими буквами)<input type="text" id="complexity"
                    v-model="recipe.properties.complexity"></label>
            <label class="input-label" for="protein">Белки<input type="text" id="protein"
                    v-model="recipe.properties.protein"></label>
            <label class="input-label" for="fats">Жиры<input type="text" id="fats" v-model="recipe.properties.fats"></label>
            <label class="input-label" for="carbohydrates">Углеводы <input type="text" id="carbohydrates"
                    v-model="recipe.properties.carbohydrates"></label>
            <div class="input-list">
                <h2>Список ингредиентов</h2>
                <div v-for="ingredient in  recipe.ingredients ">
                    <label class="input-label"> Название ингредиента (примеры в самом вводном поле) <input type="text"
                            v-model="ingredient.name"> </label>
                    <label class=" input-label">Количество<input type="text" v-model="ingredient.amount"></label>
                </div>
                <button @click="addNewIngredient">Добавить ингредиент</button>
                <button @click="deleteLastIngredient">Удалить последний ингредиент</button>
            </div>
            <div class="input-list">
                <h2>Шаги рецепта</h2>
                <div v-for="step in  recipe.recipe ">
                    <label class="input-label"> Название ингредиента (примеры в самом вводном поле) <textarea
                            v-model="step.text"></textarea> </label>
                </div>
                <button @click="addNewStep">Добавить шаг</button>
                <button @click="deleteLastStep">Удалить последний шаг</button>
            </div>
            <label class="password" for="password">Пароль<input type="password" id="password" v-model="password"></label>
            <button @click="sendRecipe" class="btn">Отправить рецепт</button>
        </form>
    </main>
</template>

<style lang='scss' scoped>
.main {
    text-align: center;
}

.form {
    width: 100%;
    max-width: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;

    .input {
        &-label {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        &-list {
            padding-top: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
    }

    .password {
        margin-top: 50px;
    }

    .btn {

        padding: 5px 10px;
        width: 100%;
    }
}
</style>