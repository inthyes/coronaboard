// const axios = require("axios")
const { subDays } = require("date-fns")
const { format, utcToZonedTime } = require("date-fns-tz")
const _ = require("lodash")
const ApiClient = require("./api-client")
const path = require("path")
const fs = require("fs-extra")
const { getYouTubeVideosByKeyword } = require("./youtube")

const countryInfo = require("../../tools/downloaded/countryInfo.json")
const notice = require("../../tools/downloaded/notice.json")

async function getDataSource() {
  const countryByCc = _.keyBy(countryInfo, "cc")

  const apiClient = new ApiClient()

  const allGlobalStats = await apiClient.getAllGlobalStats()

  const groupedByDate = _.groupBy(allGlobalStats, "date")

  const globalStats = generateGlobalStats(groupedByDate)

  const globalChartDataByCc = generateGlobalChartDataByCc(groupedByDate)

  const youtubeVideos = await getYouTubeVideosByKeyword("코로나 19")

  // const koreaTestChartData = generateKoreaTestChartData(allGlobalStats)

  // const { byAge, bySex } = await apiClient.getByAgeAndBySex()

  // Object.keys(globalChartDataByCc).forEach(cc => {
  //   const genPath = path.join(process.cwd(), `static/generated/${cc}.json`)
  //   fs.outputFileSync(genPath, JSON.stringify(globalChartDataByCc[cc]))
  // })

  return {
    lastUpdated: Date.now(), // 데이터를 만든 현재 시간 기록
    globalStats,
    countryByCc,
    notice: notice.filter(x => !x.hidden),
    youtubeVideos,
    // koreaTestChartData,
    // koreaBySexChartData: bySex,
    // koreaByAgeChartData: byAge,
  }
}
function generateGlobalStats(groupedByDate) {
  // const now = new Date();
  const now = new Date("2021-06-05")
  const timeZone = "Asia/Seoul"
  const today = format(utcToZonedTime(now, timeZone), "yyyy-MM-dd")
  const yesterday = format(
    utcToZonedTime(subDays(now, 1), timeZone),
    "yyyy-MM-dd"
  )

  if (!groupedByDate[today]) {
    throw new Error("Data for today is missing")
  }

  return createGlobalStatWithPrevField(
    groupedByDate[today],
    groupedByDate[yesterday]
  )
}

function createGlobalStatWithPrevField(todayStats, yesterdayStats) {
  const yesterdayStatsByCc = _.keyBy(yesterdayStats, "cc")

  const globalStatWithPrev = todayStats.map(todayStat => {
    const cc = todayStat.cc
    const yesterdayStat = yesterdayStatsByCc[cc]

    if (yesterdayStat) {
      return {
        ...todayStat,
        confirmedPrev: yesterdayStat.confirmed || 0,
        deathPrev: yesterdayStat.death || 0,
        negativePrev: yesterdayStat.negative || 0,
        releasedPrev: yesterdayStat.released || 0,
        testedPrev: yesterdayStat.tested || 0,
      }
    }
    return todayStat
  })
  return globalStatWithPrev
}

function generateGlobalChartDataByCc(groupedByDate) {
  // 국가 코드를 필드 이름으로 하여 차트 데이터를 저장해둘 객체 선언
  const chartDataByCc = {}
  // 모든 키값(날짜)를 불러와서 날짜순으로 정렬
  const dates = Object.keys(groupedByDate).sort()
  for (const date of dates) {
    const countriesDataForOneDay = groupedByDate[date]
    for (const countryData of countriesDataForOneDay) {
      const cc = countryData.cc
      // 특정 국가의 차트 데이터를 나타내는 객체가 아직 정의되지 않았다면 기본 형태로 생성
      if (!chartDataByCc[cc]) {
        chartDataByCc[cc] = {
          date: [],
          confirmed: [],
          confirmedAcc: [],
          death: [],
          deathAcc: [],
          released: [],
          releasedAcc: [],
        }
      }

      appendToChartData(chartDataByCc[cc], countryData, date)
    }

    // 날짜별로 모든 국가에대한 합산 데이터를 global 이라는 키값을 이용하여 저장
    if (!chartDataByCc["global"]) {
      chartDataByCc["global"] = {
        date: [],
        confirmed: [],
        confirmedAcc: [],
        death: [],
        deathAcc: [],
        released: [],
        releasedAcc: [],
      }
    }

    const countryDataSum = countriesDataForOneDay.reduce(
      (sum, x) => ({
        confirmed: sum.confirmed + x.confirmed,
        death: sum.death + x.death,
        released: sum.released + (x.released || 0), // release 데이터가 없는 국가들이 존재
      }),
      { confirmed: 0, death: 0, released: 0 }
    )

    appendToChartData(chartDataByCc["global"], countryDataSum, date)
  }

  return chartDataByCc
}

function appendToChartData(chartData, countryData, date) {
  if (chartData.date.length === 0) {
    chartData.confirmed.push(countryData.confirmed)
    chartData.death.push(countryData.death)
    chartData.released.push(countryData.released)
  } else {
    const confirmedIncrement =
      countryData.confirmed - _.last(chartData.confirmedAcc) || 0
    chartData.confirmed.push(confirmedIncrement)

    const deathIncrement = countryData.death - _.last(chartData.deathAcc) || 0
    chartData.death.push(deathIncrement)

    const releasedIncrement =
      countryData.released - _.last(chartData.releasedAcc) || 0
    chartData.released.push(releasedIncrement)
  }

  chartData.confirmedAcc.push(countryData.confirmed)
  chartData.deathAcc.push(countryData.death)
  chartData.releasedAcc.push(countryData.released)

  chartData.date.push(date)
}

function generateKoreaTestChartData(allGlobalStats) {
  const krData = allGlobalStats.filter(x => x.cc === "KR")

  return {
    date: krData.map(x => x.date),
    confirmedRate: krData.map(x => x.confirmed / (x.confirmed + x.negative)),
    confirmed: krData.map(x => x.confirmed),
    negative: krData.map(x => x.negative),
    testing: krData.map(x => x.testing),
  }
}

module.exports = {
  getDataSource,
}
