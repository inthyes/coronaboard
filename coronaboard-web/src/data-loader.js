const axios = require("axios")
const { subDays } = require("date-fns")
const { format, utcToZonedTime } = require("date-fns-tz")
const _ = require("lodash")

const countryInfo = require("../tools/downloaded/countryInfo.json")

async function getDataSource() {
  const countryByCc = _.keyBy(countryInfo, "cc")
  const globalStats = await generateGlobalStats()

  return {
    countryByCc,
    globalStats,
  }
}

async function generateGlobalStats() {
  const apiClient = axios.create({
    baseURL: "http://localhost:8080",
  })

  const response = await apiClient.get("global-stats")
  const groupedByDate = _.groupBy(response.data.result, "date")

  const now = new Date("2021-06-05")
}

module.exports = {
  getDataSource,
}
