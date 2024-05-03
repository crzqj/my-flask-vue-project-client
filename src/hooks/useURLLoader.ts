import { ref } from "vue";
import axios from "axios";

export default function useURLLoader<T>(url: string) {
  const result = ref<T | null>(null);
  const loading = ref(false);
  const loaded = ref(false);
  const error = ref<unknown>(null); // 修改此行

  const fetchData = async () => {
    loading.value = true;
    try {
      const response = await axios.get(url);
      result.value = response.data;
      loaded.value = true;
    } catch (err) {
      error.value = err; // 修改此行
    }
    loading.value = false;
  };

  fetchData(); // Fetch data when hook is first called

  return { result, loading, loaded, error, fetchData };
}
