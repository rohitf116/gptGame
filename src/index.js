import express from "express";
import { fetchContent, generateImage } from "./gpt.js";

const app = express();

app.use(express.json());
function getCaptionFromChatResponse(chatResponseObject) {
  const captionMatch = chatResponseObject.match(/Caption:(.*)(?:\n|$)/);
  if (!captionMatch) {
    throw new Error("No caption found");
  }
  return captionMatch[1].trim();
}
app.get("/", async (req, res) => {
  const { option = "a wizard enters a jungle" } = req.body;
  const result = await fetchContent(option);
  const gt = getCaptionFromChatResponse(result);
  const image = await generateImage(gt, result);
  console.log(image, "image");
  res.json({ content: result, image });
});

const port = 8000;

app.listen(port, () => {
  console.log(`Running on port:${port}`);
});
