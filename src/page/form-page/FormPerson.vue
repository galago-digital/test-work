<template>
  <v-container>
    <template>
      <v-form v-model="valid">
        <v-container>
          <v-row class="mt-3 mb-3">
            <h1>{{ namePage }}</h1>
          </v-row>
          <v-row class="mt-3 mb-3">
            <h4>Дата записи {{ dateRegistration }}</h4>
          </v-row>
          <v-row>
            <v-col
                cols="12"
                md="4"
            >
              <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  label="ФИО"
                  required
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4"
            >
              <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="date"
                      label="День рождение:"
                      prepend-icon="mdi-calendar"
                      readonly
                      :rules="dateRules"
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date"
                    :active-picker.sync="activePicker"
                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col
                cols="12"
                md="4"
            >
              <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
              ></v-text-field>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
              <v-text-field
                  v-model="phone"
                  :rules="phoneRules"
                  label="Телефон"
                  v-mask="'# (###) ###-##-##'"
                  required
              ></v-text-field>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
              <v-select
                  :items="items"
                  label="Дистанция"
                  :rules="nameRules"
                  v-model="distance"
                  required
              ></v-select>
            </v-col>
            <v-col
                cols="12"
                md="4"
            >
              <v-text-field
                  v-model="payment"
                  :rules="nameRules"
                  label="Сумма взноса"
                  v-mask="'######################'"
                  required
              ></v-text-field>
            </v-col>
            <v-col
                class="my-2 px-1 d-flex justify-center"
                cols="12"
                md="12"
            >
              <v-btn
                  color="primary"
                  elevation="2"
                  class="ml-5 mr-5"
                  large
                  @click="saveNewPerson"
              >
                Отправить заявку
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </template>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

// по хорошему нужно было вынести в отдельный файл
// также вынес все бы все инпуты, селект DP в отдыльный компонент
// сейчас компонент и его нужно поразбивать
const STATECREATENEWPERSON = 'create';
const STATEEDITPERSON = 'edit';

export default {
  name: 'FormPerson',

  data: () => ({
    valid: false,
    namePage: 'Создание пользователя',
    stateForm: STATECREATENEWPERSON,

    name: '',
    nameRules: [
      v => !!v || 'Обязательное поле',
    ],

    phone: null,
    phoneRules: [
      v => !!v || 'Обязательное поле',
    ],

    email: '',
    emailRules: [
      v => !!v || 'Обязательное поле',
      v => /.+@.+/.test(v) || 'Не верный формат почты',
    ],

    activePicker: null,
    date: null,
    menu: false,
    dateRules: [
      v => !!v || 'Обязательное поле',
    ],

    items: [3, 5, 10],
    distance: '',

    payment: '',
    id: null,

    dateRegistration: null,
  }),
  computed: mapGetters(['postAllPerson']),
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    saveNewPerson() {
      if (!this.valid) {
        return false;
      }

      const person = {
        date: this.date,
        name: this.name,
        distance: this.distance,
        phone: this.phone,
        email: this.email,
        payment: this.payment,
        dateRegistration: this.dateRegistration
      };

      if (this.stateForm === STATECREATENEWPERSON) {
        let newId = 1;
        if (this.postAllPerson.users.length !== 0) {
          newId = this.postAllPerson.users[this.postAllPerson.users.length - 1].id + 1;
        }
        person.id = newId;
        this.addNewPerson(person);
      } else if (this.stateForm === STATEEDITPERSON) {
        person.id = this.id;
        this.editPerson(person);
      }

      this.exitPage();
      setTimeout(() => {
        this.date = '';
        this.name = '';
        this.distance = '';
        this.phone = '';
        this.email = '';
        this.payment = '';
        this.dateRegistration = '';
      }, 0);
    },
    exitPage() {
      this.$router.push({ name: 'table' });
    },
    ...mapActions(['editPerson']),
    ...mapActions(['addNewPerson']),
  },
  created() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    today = mm + '-' + dd + '-' + yyyy;
    this.dateRegistration = today;
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.user) {
        vm.namePage = 'Редактирование пользователя';
        vm.stateForm = STATEEDITPERSON;

        vm.id = to.params.user.id;
        vm.name = to.params.user.name;
        vm.distance = to.params.user.distance;
        vm.date = to.params.user.date;
        vm.email = to.params.user.email;
        vm.phone = to.params.user.phone;
        vm.payment = to.params.user.payment;
        vm.dateRegistration = to.params.user.dateRegistration;
      } else {
        vm.stateForm = STATECREATENEWPERSON;
      }
    });
  },
};
</script>
