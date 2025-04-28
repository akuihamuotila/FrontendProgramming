import { Training } from "../types";

const API_URL =
  "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings";

const fetchJson = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Virhe: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const getTrainings = async (): Promise<Training[]> => {
  const data = await fetchJson(API_URL);
  return data._embedded.trainings;
};

export const addTraining = async (training: Training): Promise<void> => {
  await fetchJson(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(training),
  });
};

export const deleteTraining = async (url: string): Promise<void> => {
  await fetchJson(url, { method: "DELETE" });
};
