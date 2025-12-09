import express from "express";
import fetch from "node-fetch";
import fs from "fs/promises";

const app = express();
app.use(express.json());

async function loadApiProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("API retornou erro.");
    const data = await response.json();
    return data.map(item => ({
      id: item.id,
      name: item.title,
      price: item.price,
      source: "api"
    }));
  } catch (error) {
    console.log("Falha ao carregar API externa:", error.message);
    return null;
  }
}

async function loadLocalProducts() {
  try {
    const file = await fs.readFile("local-products.json", "utf8");
    const data = JSON.parse(file);
    return data.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      source: "local"
    }));
  } catch (error) {
    console.log("Falha ao carregar arquivo local:", error.message);
    return null;
  }
}

async function getProducts() {
  const apiProducts = await loadApiProducts();
  const localProducts = await loadLocalProducts();

  if (!apiProducts && !localProducts) {
    return { error: "Nenhuma fonte de dados disponível" };
  }

  if (apiProducts && !localProducts) return apiProducts.sort((a, b) => a.id - b.id);
  if (!apiProducts && localProducts) return localProducts.sort((a, b) => a.id - b.id);

  const finalList = [...apiProducts, ...localProducts];
  return finalList.sort((a, b) => a.id - b.id);
}

app.get("/products", async (req, res) => {
  const response = await getProducts();
  res.json(response);
});

const PORT = 29095;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});