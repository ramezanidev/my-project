import axios from "axios";

const useApi = (newBaseURL?: string, config = {}) => {
  const baseURL = newBaseURL ?? "https://stage.achareh.ir/api/karfarmas/";
  const api = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Ng==",
    },
    ...config,
  });
  return api;
};

export { useApi, useApi as default };
