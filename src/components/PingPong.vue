<template>
  <div class="container">
    <button type="button" class="btn btn-primary">{{ msg }}</button>
  </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'PingPong',
    data() {
      return {
        msg: '',
      };
    },
    methods: {
      getMessage() {
        const path = 'http://10.15.101.99:5002/ping';
        axios.get(path)
          .then((res) => {
            this.msg = res.data;
          })
          .catch((error) => {
  
            console.error(error);
          });
      },
    },
    created() {
      this.getMessage();
    },
  };
  </script>