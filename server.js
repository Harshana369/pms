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

app.get("/", (req, res, next) => {
  res.send("Api running");
});

// Connecting Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

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

// Error Handler Middleware
app.use(errorHandler);

app.use(vendorProjectsOverviewTableRoutes);
app.use(vendorProjectsOverviewData);
app.use(vendorProjectsDatabases);

app.use(mobitelProjectsDatabases);
app.use(mobitelProjectsOverviewTable);
app.use(mobitelProjectsDatabaseTable);
app.use(mobitelProjectsOverviewData);

app.use(vendorProjectsDatabaseTable);
app.use(vendorProjectsMilestonesRoutes);
app.use(userListGetRoutes);
app.use(siteEnginnersNamesList);
app.use(specialTagArray);
app.use(DependencyArray);
app.use(SiteStatusArray);
app.use(ResponsibleArrays);
app.use(ScopeArrays);
app.use(NewRATArrays);
app.use(SubConArrays);

app.use(vendorProjectsExcellUpload);
app.use(mobitelProjectsExcellUpload);
app.use(mobitelProjectsExcellEdit);
app.use(vendorProjectsExcellEdit);

app.use(vendorProjectsDatabasesColumnChartData);
app.use(mobitelProjectsDatabasesColumnChartData);

app.use(mobitelProjectsEngineersAnalysis);
app.use(mobitelProjectsSubProjects);
app.use(vendorProjectsSubProjects);

app.use(mobitelDatabasesPendingTasks);
app.use(vendorDatabasesPendingTasks);

app.use(mobitelProjectsLastUpdates);
app.use(vendorProjectsLastUpdates);

require("dotenv").config({ path: "./.env" });

app.use(materialProjectsDatabase);

app.use("/column", mobitelColumnHideShow);

// --------------------------------------------------------------------------

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/materialkit/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "materialkit", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

// --------------------------------------------------------------------------

const PORT = process.env.PORT || 8072;

const server = app.listen(PORT, () =>
  console.log(`Sever is up and running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
