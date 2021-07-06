//не привильно оформил получение данных из json и плохо, что users.users. ...

export default {
    state: {
        // лучше избегать изменения типа
        // использовать в качестве начальных данных пустой массив
        users: null,
    },
    mutations: {
        updatePerson(state, user) {
            state.users = user;
        },
        pushNewPerson(state, user) {
            // лучше переписать состояние [...state.users.users, user]
            state.users.users.push(user);
        },
        deletePerson(state, user) {
            // не хочу использовать map, я лучше напишу проще о понятнее
            const index = state.users.users.findIndex(elem => elem.id === user.id);
            const before = state.users.users.slice(0, index);
            const after = state.users.users.slice(index + 1);

            state.users.users = [...before, ...after];
        },
        editUser(state, user) {
            // тут можно было вызвать deletePerson и оставить state.users.users = [...before, user,...after];
            // но лучше так не дать, да дубликация кода, но если потом при редактирование нужно будет проверять
            // права пользователя (дупистим могут быть проблемы)

            // Чтобы уменьшить повторение кода можно три следующие строки вынести в функцию
            // и использовать здесь и в deletePerson
            // Еще лучше все это делать в actions, оставляя в мутациях только изменение state
            const index = state.users.users.findIndex(elem => elem.id === user.id);
            const before = state.users.users.slice(0, index);
            const after = state.users.users.slice(index + 1);

            state.users.users = [...before, user, ...after];
        }
    },
    actions: {
        async getAllPerson(content) {
            const userData = require('../../db/users.json');
            // https://vuex.vuejs.org/ru/guide/mutations.html#%D0%BC%D1%83%D1%82%D0%B0%D1%86%D0%B8%D0%B8-%D0%B4%D0%BE%D0%BB%D0%B6%D0%BD%D1%8B-%D0%B1%D1%8B%D1%82%D1%8C-%D1%81%D0%B8%D0%BD%D1%85%D1%80%D0%BE%D0%BD%D0%BD%D1%8B%D0%BC%D0%B8
            // Во Vuex мутации — это синхронные транзакции
            // require загрузить json, это синхронная операция здесь. Так что в целом делать getAllPerson асинхронной в этом случае бессмысленно
            await content.commit('updatePerson', userData);
        },
        // тут была имея в контекте еще прокидывать название мутации, но мне кажется это костьльно
        // лучше сделать надежнее и + в будующем мы привяжемся к одной функции и будет не так просто с нее слесть
        // если захотим изменить некоторый функционал
        delPerson(state, content) {
            state.commit('deletePerson', content);
        },
        editPerson(state, content) {
            state.commit('editUser', content);
        },
        addNewPerson(state, content) {
            state.commit('pushNewPerson', content);
        }
    },
    getters: {
        postAllPerson(state) {
            return state.users;
        },
    },
};