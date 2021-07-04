//не привильно оформил получение данных из json и плохо, что users.users. ...

export default {
  state: {
    users: null,
  },
  mutations: {
    updatePerson(state, user) {
      state.users = user;
    },
    pushNewPerson(state, user) {
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
      const index = state.users.users.findIndex(elem => elem.id === user.id);
      const before = state.users.users.slice(0, index);
      const after = state.users.users.slice(index + 1);

      state.users.users = [...before, user,...after];
    }
  },
  actions: {
    async getAllPerson(content) {
      const userData = require('../../db/users.json');
      await content.commit('updatePerson', userData);
    },
    // тут была имея в контекте еще прокидывать название мутации, но мне кажется это костьльно
    // лучше сделать надежнее и + в будующем мы привяжемся к одной функции и будет не так просто с нее слесть
    // если захотим изменить некоторый функционал
    delPerson(state, content) {
      state.commit('deletePerson', content);
    },
    editPerson(state, content){
      state.commit('editUser', content);
    },
    addNewPerson(state, content){
      state.commit('pushNewPerson', content);
    }
  },
  getters: {
    postAllPerson(state) {
      return state.users;
    },
  },
};
