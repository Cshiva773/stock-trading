import axios from "axios"

const TOKEN = "cgc4811r01qispgnol20cgc4811r01qispgnol2g"

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN
  }
})