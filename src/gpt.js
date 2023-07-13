import axios from "axios";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import { systemData } from "./system.js";
dotenv.config();
console.log(process.env.OPENAI_API_KEY);
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const generateImage = async (prompt, messages) => {
  const newPro = `A first person view in the style of detailed fantasy art: ${prompt}`;
  const response = await openai.createImage({
    prompt: newPro,
    n: 1,
    size: "1024x1024",
  });
  const imageUrl = response.data.data[0].url;
  console.log(imageUrl);

  return imageUrl;
};
export const fetchContent = async (prompt) => {
  const messages = [
    {
      role: "system",
      content: systemData,
    },
    {
      role: "user",
      content: prompt,
    },
  ];

  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  };

  const body = {
    model: "gpt-3.5-turbo",
    messages,
  };

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: apiUrl,
    headers,
    data: JSON.stringify(body),
  };

  const res = await axios(config);
  console.log(res.data.choices, "-------------");
  return res;
};
