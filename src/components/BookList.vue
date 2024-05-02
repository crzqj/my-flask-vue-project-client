<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Books</h1>
        <hr><br><br>
        <button
          type="button"
          class="btn btn-success btn-sm"
          @click="toggleAddBookModal">
          Add Book
        </button>
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
          <tbody>
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
        </table>
      </div>
    </div>

    <!-- add new book modal -->
    <div
      ref="addBookModal"
      class="modal fade"
      :class="{ show: activeAddBookModal, 'd-block': activeAddBookModal }"
      tabindex="-1"
      role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add a new book</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="toggleAddBookModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="addBookTitle" class="form-label">Title:</label>
                <input
                  type="text"
                  class="form-control"
                  id="addBookTitle"
                  v-model="addBookForm.title"
                  placeholder="Enter title">
              </div>
              <div class="mb-3">
                <label for="addBookAuthor" class="form-label">Author:</label>
                <input
                  type="text"
                  class="form-control"
                  id="addBookAuthor"
                  v-model="addBookForm.author"
                  placeholder="Enter author">
              </div>
              <div class="mb-3 form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="addBookRead"
                  v-model="addBookForm.read">
                <label class="form-check-label" for="addBookRead">Read?</label>
              </div>
              <div class="btn-group" role="group">
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  @click="handleAddSubmit">
                  Submit
                </button>
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  @click="handleAddReset">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="activeAddBookModal" class="modal-backdrop fade show"></div>
  </div>
</template>

  


  
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import useURLLoader from '../hooks/useURLLoader';
import axios from 'axios';

interface BookResult {
  books: Array<{
    author: string;
    read: boolean;
    title: string;
  }>;
  status: string;
}
interface Payload {
  title: string;
  author: string;
  read: boolean;
}

export default defineComponent({
setup() {
    // 使用ref创建响应式数据
    const activeAddBookModal = ref(false);
    const addBookForm = ref({
      title: '',
      author: '',
      read: false, // 假设read是一个布尔值而非数组
    });
    // 初始化自定义钩子useURLLoader
    const { result, loading, loaded, error, fetchData} = useURLLoader<BookResult>('http://10.15.101.99:5000/books');

    // 使用axios发送POST请求添加书籍
    const addBook = (payload: Payload) => {
      const path = 'http://10.15.101.99:5000/books';
      axios.post(path, payload)
        .then(() => {
          fetchData();   // 添加书籍后，重新获取数据
        })
        .catch((error) => {
          console.error(error);
        });
    };
    // 重置表单数据
    const initForm = () => {
      addBookForm.value = { title: '', author: '', read: false };
    };
    const handleAddReset = () => {
      // 重置添加书籍模态框并清空表单
      activeAddBookModal.value = false;
      initForm();
    };
    // 切换添加书籍模态框的状态
    const toggleAddBookModal = () => {
      activeAddBookModal.value = !activeAddBookModal.value;
    };

    // 处理添加书籍表单的提交
    const handleAddSubmit = () => {
      toggleAddBookModal();
      const payload = {
        title: addBookForm.value.title,
        author: addBookForm.value.author,
        read: addBookForm.value.read,
      };
      addBook(payload);
      initForm();
    };
    
    return {
        result,
        loading,
        loaded,
        error,       
        activeAddBookModal,
        addBookForm,
        addBook,
        handleAddSubmit,
        handleAddReset,
        initForm,
        toggleAddBookModal,
    };
},
});
</script>