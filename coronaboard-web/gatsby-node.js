// const getDataSource = require("./src/data-loader")

exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  // const dataSource = await getDataSource()

  const dataSource = require("./src/data-loader")

  createPage({
    path: "/",
    component: require.resolve("./src/templates/single-page.js"),
    context: { dataSource },
  })
}
