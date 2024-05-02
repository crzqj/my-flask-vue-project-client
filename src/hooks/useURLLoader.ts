import { ref } from 'vue'
import axios from 'axios'

// function useURLLoader<T>(url: string) {
//     const result = ref<T | null>(null)
//     const loading = ref(true)
//     const loaded = ref(false)
//     const error = ref(null)

//     axios.get(url).then((rawData) => {
//         loading.value = false
//         loaded.value = true
//         result.value = rawData.data
//     }).catch(e => {
//         error.value = e
//         loading.value = false
//     })

//     return {
//         result,
//         loading,
//         error,
//         loaded
//     }
// }

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