import customAxios from "../lib/customAxios";

export default async function fetchSearchSuggestions(name: string) {
  try {
    const result = await customAxios.get(`/?name=${name}`);
    return result.data;
  } catch (error) {
    if (error instanceof Error) {
      window.alert(error.message);
    }
  }
}
