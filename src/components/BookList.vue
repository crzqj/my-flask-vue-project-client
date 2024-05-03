<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Books</h1>
        <hr><br><br>
        <AlertInfo :message="message" v-if="showMessage"></AlertInfo>
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
                  <button type="button" class="btn btn-warning btn-sm" @click="toggleEditBookModal(book)">Update</button>
                  <button type="button" class="btn btn-danger btn-sm" @click="toggleConfirmDeleteModal(book)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-if="loading">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
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

    <!-- edit book modal -->
<div
  ref="editBookModal"
  class="modal fade"
  :class="{ show: activeEditBookModal, 'd-block': activeEditBookModal }"
  tabindex="-1"
  role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Update</h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
          @click="toggleEditBookModal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="editBookTitle" class="form-label">Title:</label>
            <input
              type="text"
              class="form-control"
              id="editBookTitle"
              v-model="editBookForm.title"
              placeholder="Enter title">
          </div>
          <div class="mb-3">
            <label for="editBookAuthor" class="form-label">Author:</label>
            <input
              type="text"
              class="form-control"
              id="editBookAuthor"
              v-model="editBookForm.author"
              placeholder="Enter author">
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="editBookRead"
              v-model="editBookForm.read">
            <label class="form-check-label" for="editBookRead">Read?</label>
          </div>
          <div class="btn-group" role="group">
            <button
              type="button"
              class="btn btn-primary btn-sm"
              @click="handleEditSubmit">
              Submit
            </button>
            <button
              type="button"
              class="btn btn-danger btn-sm"
              @click="handleEditCancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
<div v-if="activeEditBookModal" class="modal-backdrop fade show"></div>
<div
    ref="confirmDeleteModal"
    class="modal fade"
    :class="{ show: activeConfirmDeleteModal, 'd-block': activeConfirmDeleteModal }"
    tabindex="-1"
    role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirm Delete</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="toggleConfirmDeleteModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Are you sure you want to delete "{{ editBookForm.title }}"?
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger"
            @click="confirmDelete(editBookForm)">
            Delete
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="toggleConfirmDeleteModal">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="activeConfirmDeleteModal" class="modal-backdrop fade show"></div>
  </div>
</template>

  


  
<script lang="ts" setup>
import { defineProps, ref, onMounted } from 'vue';
import useURLLoader from '../hooks/useURLLoader';
import axios from 'axios';
import AlertInfo from '../components/AlertInfo.vue';

interface Book {
  author: string;
  read: boolean;
  title: string;
  id: string;
}

interface BookResult {
  books: Array<{
    author: string;
    read: boolean;
    title: string;
    id: string;
  }>;
  status: string;
}
interface Payload {
  title: string;
  author: string;
  read: boolean;
}

// export default defineComponent({
// setup() {
    // 使用ref创建响应式数据
    const activeAddBookModal = ref(false);
    const activeEditBookModal = ref(false);
    const activeConfirmDeleteModal = ref(false);

    const addBookForm = ref({
      title: '',
      author: '',
      read: false,
    });
    const editBookForm = ref({
      id: '',
      title: '',
      author: '',
      read: false,
    })
    const showMessage = ref(false);
    const message = ref('Hello World!');
    // 初始化自定义钩子useURLLoader
    const { result, loading, loaded, error, fetchData} = useURLLoader<BookResult>('http://10.15.101.99:5000/books');
    
    // 使用axios发送POST请求添加书籍
    const addBook = (payload: Payload) => {
      const path = 'http://10.15.101.99:5000/books';
      axios.post(path, payload)
        .then(() => {
          fetchData();   // 添加书籍后，重新获取数据
          message.value = 'Add book successfully!';
          showMessage.value = true;
          //设置一个3秒的延迟后关闭消息框
          setTimeout(() => {
            showMessage.value = false;
            message.value = '';
            }, 3000);
        })
        .catch((error) => {
          message.value = error.message;
          showMessage.value = true;
          console.error(error);
        });
    };

    // 更新书籍
    const updateBook = (payload: Payload, bookID: string) => {
      const path = 'http://10.15.101.99:5000/books/'+bookID;
      axios.put(path, payload)
        .then(() => {
          fetchData();   // 更新书籍后，重新获取数据
          message.value = 'update book successfully!';
          showMessage.value = true;
          //设置一个3秒的延迟后关闭消息框
          setTimeout(() => {
            showMessage.value = false;
            message.value = '';
            }, 3000);
        })
        .catch((error) => {
          message.value = error.message;
          showMessage.value = true;
          console.error(error);
        });
    };

    //处理删除书籍
    const toggleConfirmDeleteModal = (book: Book) => {
      activeConfirmDeleteModal.value = !activeConfirmDeleteModal.value;
      editBookForm.value = {
        id: book.id,
        title: book.title,
        author: book.author,
        read: book.read,
      };
    }
    // 删除书籍
    const confirmDelete = (book: Book) => {
      const path = 'http://10.15.101.99:5000/books/'+book.id;
      axios.delete(path)
        .then(() => {
          fetchData();   // 更新书籍后，重新获取数据
          message.value = 'delete book successfully!';
          showMessage.value = true;
          //设置一个3秒的延迟后关闭消息框
          setTimeout(() => {
            showMessage.value = false;
            message.value = '';
            }, 3000);
        })
        .catch((error) => {
          message.value = error.message;
          showMessage.value = true;
          console.error(error);
        });
        activeConfirmDeleteModal.value = false;
    };

    // 重置表单数据
    const initForm = () => {
      addBookForm.value = { title: '', author: '', read: false };
    };
    const handleAddReset = () => {
      // 清空表单
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
    
    // 处理编辑书籍表单的提交
    const handleEditSubmit = () => {
      const payload = {
        title: editBookForm.value.title,
        author: editBookForm.value.author,
        read: editBookForm.value.read,
      };
      updateBook(payload, editBookForm.value.id);
      activeEditBookModal.value = false;
    };

    const handleEditCancel = () => {
      activeEditBookModal.value = false;
    }

    const toggleEditBookModal= (book: Book) => {
      if (book) {
        editBookForm.value = {
          id: book.id,
          title: book.title,
          author: book.author,
          read: book.read,
      };
      activeEditBookModal.value = !activeEditBookModal.value;
    }
  }
        
    // return {
    //     result,
    //     loading,
    //     loaded,
    //     error,       
    //     activeAddBookModal,
    //     addBookForm,
    //     addBook,
    //     handleAddSubmit,
    //     handleAddReset,
    //     // initForm,
    //     toggleAddBookModal,
    //     AlertInfo,
    // };
// },
// });
</script>