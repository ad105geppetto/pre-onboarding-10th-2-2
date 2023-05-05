import { IMoveProps } from "./utils.types";
import { CacheConfigType } from "./utils.types";
import { DATE_NAME } from "../constant";
import { CACHE_EXPIRE_TIME } from "../constant";
import { searchItem } from "../components/search/search.types";

export const isCacheExpired = (cacheResponse: Response) => {
  const fetchDate = new Date(cacheResponse.headers.get("fetch-date")!).getTime();
  const today = new Date().getTime();

  return today - fetchDate > CACHE_EXPIRE_TIME;
};

export const handleCache = async (
  cacheConfig: CacheConfigType,
  callback: (...args: any[]) => any
): Promise<searchItem[]> => {
  const { storageName, url } = cacheConfig;
  let fetchData;

  const cache = await caches.open(storageName);
  const cacheResponse = await cache.match(url);

  if (cacheResponse && !isCacheExpired(cacheResponse)) {
    fetchData = await cacheResponse.json();
  } else {
    console.info("calling api");
    fetchData = await callback();

    let newHeaders = new Headers(fetchData.headers);
    newHeaders.append(DATE_NAME, new Date().toISOString());

    await cache.put(
      url,
      new Response(JSON.stringify(fetchData), {
        headers: newHeaders,
      })
    );
  }

  return fetchData;
};

export const moveUp = (props: IMoveProps) => {
  if (props.searchRef.current === null) return;

  props.currentNumber--;

  if (props.currentNumber < 0) {
    props.currentNumber = props.searchSuggestions.length - 1;
  }

  props.searchRef.current.value = props.searchSuggestions[props.currentNumber].name;
  props.setSearchKeyword(props.searchSuggestions[props.currentNumber].name);
  props.numberRef.current = props.currentNumber;
};

export const moveDown = (props: IMoveProps) => {
  if (props.searchRef.current === null) return;

  props.currentNumber++;

  if (props.currentNumber > props.searchSuggestions.length - 1) {
    props.currentNumber = 0;
  }

  props.searchRef.current.value = props.searchSuggestions[props.currentNumber].name;
  props.setSearchKeyword(props.searchSuggestions[props.currentNumber].name);
  props.numberRef.current = props.currentNumber;
};
