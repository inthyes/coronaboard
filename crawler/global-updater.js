const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const { format, utcToZonedTime } = require("date-fns-tz");
const GlobalCrawler = require("./global-crawler");

async function crawlAndUpdateGlobal(outputPath, apiClient) {
  let prevData = {};
  const domesticStatPath = path.join(outputPath, "domestic-stat.json");
  try {
    // 기존 크롤링한 값이 있으면 불러오기
    prevData = JSON.parse(fs.readFileSync(domesticStatPath, "utf-8"));
  } catch (e) {
    console.log("previous globalStat not found");
  }
  const globalCrawler = new GlobalCrawler();

  // 한국 시간대 기준으로 현재 시점의 날짜 생성
  const now = new Date();
  const timeZone = "Asia/seoul";
  const crawledDate = format(utcToZonedTime(now, timeZone), "yyyy-MM-dd");

  const newData = {
    crawledDate,
    globalStat: await globalCrawler.crawlStat(),
  };

  // 변경된 값이 없으면 아무것도 하지 않음
  if (_.isEqual(newData, prevData)) {
    console.log("globalStat has not been changed");
    return;
  }

  // 크롤링된 최신 값을 파일에 저장
  fs.writeFileSync(globalStatPath, JSON.stringify(newData));

  const newGlobalStat = newData.globalStat;

  const resp = await apiClient.findAllGlobalStat();
  const oldRows = resp.result.filter((x) => x.date === crawledDate);
  const oldGlobalStat = _.keyBy(oldRows, "cc");

  const updateRows = findUpdatedRows(newGlobalStat, oldGlobalStat);
  if (_.isEmpty(updatedRows)) {
    console.log("No updated globalStat rows");
    return;
  }

  for (const row of updateRows) {
    await apiClient.upsertGlobalStat({
      date: crawledDate,
      ...row,
    });
  }

  console.log("globalStat updated succssfully");
}

function findUpdatedRows(newRowsByCc, oldRowsByCc) {
  const updatedRows = [];
  for (const cc of Object.keys(newRowsByCc)) {
    const newRow = newRowsByCc[cc];
    const oldRow = oldRowsByCc[cc];

    if (cc === "KR" && oldRow) {
      continue;
    }

    if (isRowEqual(newRow, oldRow)) {
      continue;
    }

    updatedRows.push(newRow);
  }

  return updatedRows;
}

function isRowEqual(newRow, prevRow) {
  const colsToCompare = [
    "confirmed",
    "death",
    "released",
    "critical",
    "tested",
  ];

  if (!prevRow) {
    return false;
  }
  return colsToCompare.every((col) => newRow[col] === prevRow[col]);
}

module.exports = { crawlAndUpdateGlobal };
