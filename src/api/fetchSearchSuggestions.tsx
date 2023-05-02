import axios from "axios";

export default async function fetchSearchSuggestions(name: string) {
  try {
    const result = await axios.get(`/api/v1/search-conditions/?name=${name}`);
    return result.data;
  } catch (error) {
    if (error instanceof Error) {
      window.alert(error.message);
    }
  }
}
