<template>
    <div class="container">
      <div class="row">
        <div class="col-sm-10">
          <h1>Books</h1>
          <hr><br><br>
          <button type="button" class="btn btn-success btn-sm">Add Book</button>
          <br><br>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Read?</th>
                <th></th>
              </tr>
            </thead>
            <tbody v-if="loaded">
              <tr v-for="(book, index) in result?.books" :key="index">
                <td>{{ book.title }}</td>
                <td>{{ book.author }}</td>
                <td>
                  <span v-if="book.read">Yes</span>
                  <span v-else>No</span>
                </td>
                <td>
                  <div class="btn-group" role="group">
                    <button type="button" class="btn btn-warning btn-sm">Update</button>
                    <button type="button" class="btn btn-danger btn-sm">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <div class="d-flex justify-content-center align-items-center" style="min-height: 100px;">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  


  
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import useURLLoader from '../hooks/useURLLoader';

interface BookResult {
  books: Array<{
    author: string;
    read: boolean;
    title: string;
  }>;
  status: string;
}

export default defineComponent({
setup() {

    const { result, loading, loaded} = useURLLoader<BookResult>('http://10.15.101.99:5000/books');

    return {
        result,
        loading,
        loaded,
    };
},
});
</script>