import express from "express";
import { fetchContent, generateImage } from "./gpt.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
function getCaptionFromChatResponse(chatResponseObject) {
  const captionMatch = chatResponseObject.match(/Caption:(.*)(?:\n|$)/);
  if (!captionMatch) {
    throw new Error("No caption found");
  }
  return captionMatch[1].trim();
}
app.post("/", async (req, res) => {
  const { option = "a wizard enters a jungle" } = req.body;
  const result = await fetchContent(option);
  const x = result.data.choices[0].message.content;
  //   const gt = getCaptionFromChatResponse(x);
  //   const image = await generateImage(gt, result);
  //   console.log(result.data.choices, "image");
  //   res.json(result);
  res.send({ result: result.data.choices[0].message });
});

const port = 8000;

app.listen(port, () => {
  console.log(`Running on port:${port}`);
});
