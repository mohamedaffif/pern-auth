import axios from "axios";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await axios.post("http://localhost:5000/api/register", data);

  return response.data;
}
