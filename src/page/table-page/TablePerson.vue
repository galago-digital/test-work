<template>
  <v-container>
    <v-card>
      <v-card-title>
        База пользователей
        <v-spacer></v-spacer>

        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Поиск"
            single-line
            hide-details
        />
      </v-card-title>
      <v-data-table
          :headers="headers"
          :items="person"
          :search="search"
          sort-by="id"
          :items-per-page="5"
          class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <router-link :to="{ name: 'form', params: { user: item }}">
            <v-icon
                small
                class="mr-2"
            >
              mdi-pencil
            </v-icon>
          </router-link>
          <v-icon
              small
              @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "tablePerson",
  computed: mapGetters(['postAllPerson']),

  mounted() {
    this.person = this.postAllPerson.users
  },

  data: () => ({
    search: '',
    headers: [
      {
        text: 'ФИО',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      {text: 'Уникальный номер', value: 'id'},
      {text: 'Дата рождения', value: 'date'},
      {text: 'Дистанции забега (км)', value: 'distance'},
      {text: 'Дата регистрации', value: 'dateRegistration'},
      {text: 'Email', value: 'email'},
      {text: 'Телефон', value: 'phone'},
      {text: 'Сумма (р)', value: 'payment'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    person: [],
  }),

  methods: {
    deleteItem(item) {
      this.delPerson(item);
      this.person = this.postAllPerson.users
    },
    ...mapActions(['delPerson']),
  },
}
</script>
