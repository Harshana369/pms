require("dotenv").config({ path: "./config.env" });
const path = require("path");
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());

// app.get("/", (req, res, next) => {
//   res.send("Api running");
// });

const authRouts = require("./routes/auth.js");
const privateRouts = require("./routes/private");
// Connecting Routes
app.use("/mpd/api", authRouts);
app.use("/mpd/api", privateRouts);

//Database blacks
require("./routes/csvDataBlackup.js");
require("./routes/jsonDataBlackup.js");

// Routes
const vendorProjectsOverviewTableRoutes = require("./routes/vendorProjectsOverviewTableRoutes.js");
const vendorProjectsOverviewData = require("./routes/VendorDatabaseTableRoutes/vendorProjectsOverviewDataRoutes.js");
const vendorProjectsDatabases = require("./routes/VendorDatabaseTableRoutes/vendorProjectsDatabasesRoutes.js");
const mobitelProjectsDatabases = require("./routes/MobitelDatabaseTableRoutes/mobitelProjectsDatabasesRoutes.js");

const mobitelProjectsOverviewTable = require("./routes/mobitelProjectsOverviewTableRoutes.js");
const mobitelProjectsOverviewData = require("./routes/MobitelDatabaseTableRoutes/mobitelProjectsOverviewDataRoutes.js");
const mobitelProjectsDatabaseTable = require("./routes/MobitelDatabaseTableRoutes/mobitelDatabaseTableRoutes.js");

const vendorProjectsDatabaseTable = require("./routes/VendorDatabaseTableRoutes/vendroDatabaseTableRoutes.js");
const vendorProjectsMilestonesRoutes = require("./routes/VendorDatabaseTableRoutes/vendorProjectsMilestonesRoutes.js");

const userListGetRoutes = require("./routes/AuthGetRoutes/AuthGetUsersRoutes.js");
const siteEnginnersNamesList = require("./routes/SettingsRoutes/siteEngineerNamesArrayRoutes.js");
const specialTagArray = require("./routes/SettingsRoutes/SpecialTagArrayRoutes.js");
const DependencyArray = require("./routes/SettingsRoutes/DependencyArrayRoutes.js");
const SiteStatusArray = require("./routes/SettingsRoutes/SiteStatusRoutes.js");
const ResponsibleArrays = require("./routes/SettingsRoutes/ResponsibleRoutes.js");
const ScopeArrays = require("./routes/SettingsRoutes/ScopeRoutes.js");
const NewRATArrays = require("./routes/SettingsRoutes/NewRatRoutes.js");
const SubConArrays = require("./routes/SettingsRoutes/SubContractorRoutes.js");

const vendorProjectsExcellUpload = require("./routes/VendorDatabaseTableRoutes/vendroDatabaseExcellUploadRoutes.js");
const mobitelProjectsExcellUpload = require("./routes/MobitelDatabaseTableRoutes/mobitelDatabaseExcellUploadRoutes.js");
const mobitelProjectsExcellEdit = require("./routes/MobitelDatabaseTableRoutes/mobitelDatabaseExcellEditRoutes.js");
const vendorProjectsExcellEdit = require("./routes/VendorDatabaseTableRoutes/vendorDatabaseExcellEditRoutes.js");

const vendorProjectsDatabasesColumnChartData = require("./routes/VendorDatabaseTableRoutes/vendorProjectsDatabasesColumnChartDataRoutes.js");
const mobitelProjectsDatabasesColumnChartData = require("./routes/MobitelDatabaseTableRoutes/mobitelDatabasesColumnChartDataRoutes.js");

const mobitelProjectsEngineersAnalysis = require("./routes/MobitelDatabaseTableRoutes/mobitelProjectsEngineersRoutes.js");
const mobitelProjectsSubProjects = require("./routes/MobitelDatabaseTableRoutes/mobitelProjectsSubProjects.js");
const vendorProjectsSubProjects = require("./routes/VendorDatabaseTableRoutes/vendorProjectsSubProjects.js");

const mobitelDatabasesPendingTasks = require("./routes/MobitelDatabaseTableRoutes/mobitelDatabasesPendingTasksRoutes.js");
const vendorDatabasesPendingTasks = require("./routes/VendorDatabaseTableRoutes/vendorDatabasesPendingTasksRoutes.js");

const mobitelProjectsLastUpdates = require("./routes/MobitelDatabaseTableRoutes/mobitelProjectsLastUpdatesRoutes.js");
const vendorProjectsLastUpdates = require("./routes/VendorDatabaseTableRoutes/vendorProjectsLastUpdatesRoutes.js");

const mobitelColumnHideShow = require("./routes/columnShowHide/mobitelDatabase.js");
const materialProjectsDatabase = require("./routes/MaterialDatabaseRoutes.js");
const MobitelEngineersDayPlan = require("./routes/MobitelDatabaseTableRoutes/MobitelEngineersDayPlan.js");
// Error Handler Middleware
app.use(errorHandler);

app.use("/mpd/api", vendorProjectsOverviewTableRoutes);
app.use("/mpd/api", vendorProjectsOverviewData);
app.use("/mpd/api", vendorProjectsDatabases);

app.use("/mpd/api", mobitelProjectsDatabases);
app.use("/mpd/api", mobitelProjectsOverviewTable);
app.use("/mpd/api", mobitelProjectsDatabaseTable);
app.use("/mpd/api", mobitelProjectsOverviewData);

app.use("/mpd/api", vendorProjectsDatabaseTable);
app.use("/mpd/api", vendorProjectsMilestonesRoutes);
app.use("/mpd/api", userListGetRoutes);
app.use("/mpd/api", siteEnginnersNamesList);
app.use("/mpd/api", specialTagArray);
app.use("/mpd/api", DependencyArray);
app.use("/mpd/api", SiteStatusArray);
app.use("/mpd/api", ResponsibleArrays);
app.use("/mpd/api", ScopeArrays);
app.use("/mpd/api", NewRATArrays);
app.use("/mpd/api", SubConArrays);

app.use("/mpd/api", vendorProjectsExcellUpload);
app.use("/mpd/api", mobitelProjectsExcellUpload);
app.use("/mpd/api", mobitelProjectsExcellEdit);
app.use("/mpd/api", vendorProjectsExcellEdit);

app.use("/mpd/api", vendorProjectsDatabasesColumnChartData);
app.use("/mpd/api", mobitelProjectsDatabasesColumnChartData);

app.use("/mpd/api", mobitelProjectsEngineersAnalysis);
app.use("/mpd/api", mobitelProjectsSubProjects);
app.use("/mpd/api", vendorProjectsSubProjects);

app.use("/mpd/api", mobitelDatabasesPendingTasks);
app.use("/mpd/api", vendorDatabasesPendingTasks);

app.use("/mpd/api", mobitelProjectsLastUpdates);
app.use("/mpd/api", vendorProjectsLastUpdates);
app.use("/mpd/api", MobitelEngineersDayPlan);

require("dotenv").config({ path: "./.env" });

app.use("/mpd/api", materialProjectsDatabase);

app.use("/mpd/api/column", mobitelColumnHideShow);

// --------------------------------------------------------------------------

app.use(express.static(path.join(__dirname, "/materialkit/build")));
app.get("/mpd", (req, res) =>
  res.sendFile(path.join(__dirname, "/materialkit/build/index.html"))
);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/materialkit/build")));
//   app.get("*", (req, res) =>
//     res.sendFile(path.join(__dirname, "/materialkit/build/index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running");
//   });
// }

// app.get("/mpd/api/mydata", (req, res) => console.log("ok"));

// --------------------------------------------------------------------------

const PORT = process.env.PORT || 8072;

const server = app.listen(PORT, () =>
  console.log(`Sever is up and running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
