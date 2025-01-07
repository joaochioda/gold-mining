/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import { api } from "../services/token";
import { mutate } from "swr";

type FetcherParams = {
  method?: "GET" | "POST" | "PATCH" | "PATCH" | "DELETE";
  body?: any;
  credentials?: boolean;
};

const apiFetcher = (
  uri: string,
  { method = "GET", body, credentials }: FetcherParams = {}
) => {
  return api({
    url: uri,
    method,
    data: body,
    withCredentials: credentials,
  }).then((res) => res.data);
};

export function useRequest(
  uri: string,
  swrConfig = {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  }
) {
  return useSWR(uri, apiFetcher, swrConfig);
}

export function addMutation<T>(uri: string, newData: T) {
  mutate(
    uri,
    (currentData: any[] = []) => {
      return [...currentData, newData];
    },
    false
  );
}

export function editMutation<T>(uri: string, newData: T, id: string) {
  mutate(
    uri,
    (currentData: any[] = []) => {
      return currentData.map((data) =>
        data.id === id ? { ...data, ...newData } : data
      );
    },
    false
  );
}

export function forceMutate(uri: string) {
  mutate(uri);
}

export function deleteMutation(uri: string, id: string) {
  mutate(
    uri,
    (currentData: any[] = []) => {
      return currentData.filter((data) => data.id !== id);
    },
    false
  );
}

export function selectMutation(uri: string, id: string) {
  mutate(
    uri,
    (currentData: any[] = []) => {
      return currentData.map((data) =>
        data.id === id ? { ...data, selected: !data.selected } : data
      );
    },
    false
  );
}

export default function unSelectMutation(uri: string) {
  mutate(
    uri,
    (currentData: any[] = []) => {
      return currentData.map((data) => ({ ...data, selected: false }));
    },
    false
  );
}

export { apiFetcher };
