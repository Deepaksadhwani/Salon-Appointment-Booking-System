export const SERVER_URL = "http://localhost:3000/api/v1";

export const TOKEN = localStorage.getItem("token");
export const HEADERDATA = {
  headers: {
    authentication: `Bearer ${TOKEN}`,
  },
};