import { useState, useEffect } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import CryptoJS from 'react-native-crypto-js';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Home from './pages/Home';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Unauthorized from './pages/Unauthorized';
import Databases from './pages/Databases';
import VendorProjectsInsightsHome from './pages/VendorProjectsInsights';
import VendorProjectsInsights from './components/_dashboard/Insights/AllVendorInsights/AllVendorProjectsInsights';
import HuaweiProjectsInsights from './components/_dashboard/Insights/HuaweiInsights/HuaweiProjectsInsights';
import ZTEProjectsInsights from './components/_dashboard/Insights/ZTE Insights/ZTEProjectsInsights';
import Tasks from './pages/Tasks';
import Other from './pages/Other';
import Addnew from './pages/Addnew';
import MobitelProjectsOverview from './pages/MobitelProjectsOverview';
import MobitelSubProjects from './pages/MobitelSubProjects';
import MobitelProjectsFinance from './pages/MobitelProjectsFinance';
import MobitelProjectsInsights from './pages/MobitelProjectsInsights';
import MobitelProjectsSiteEngineers from './pages/MobitelProjectsSiteEngineers';
import VendorProjectsOverview from './pages/VendorProjectsOverview';
import AllVendorProjectsOverview from './components/_dashboard/VendorProjectsOverview/AllVendors/AllVendorProjectsOverview';
import VendorProjectsOverviewHuawei from './components/_dashboard/VendorProjectsOverview/HuaweiOverview/VendorProjectsOverviewHuawei';
import VendorProjectsOverviewZTE from './components/_dashboard/VendorProjectsOverview/ZTEOverview/VendorProjectsOverviewZTE';
import VendorProjectsMilestones from './pages/VendorProjectsMilestones';
import VendorProjectsMilestonesAll from './components/_dashboard/VendorProjectsMilestones/AllVendorProjects/AllVendorProjectsMilestones';
import VendorProjectsMilestonesHuawei from './components/_dashboard/VendorProjectsMilestones/HuaweiProjects/HuaweiProjectsMilestones';
import VendorProjectsMilestonesZTE from './components/_dashboard/VendorProjectsMilestones/ZTEProjects/ZTEProjectsMilestones';
import VendorProjectsDatabase from './pages/VendorProjectsDatabase';
import VendorProjectsDatabaseAll from './components/_dashboard/VendorProjectDatabase/AllVendors/AllVendorsDatabases';
import VendorProjectsDatabaseAllProjectsViewOnly from './components/_dashboard/VendorProjectDatabase/AllVendorProjectsDatabasesView/AllVendorsDatabases';
import VendorProjectsDatabaseHuawei from './components/_dashboard/VendorProjectDatabase/Huawei/VendorsDatabasesHuawei';
// vendor prjects All vendor projects pending tasks
import DatabasesVendorProjectsAllVendorPendingTasks from './components/_dashboard/VendorProjectDatabase/AllVendors/PendingTasks/PendingTasksHome/VendorDatabasesPendingTasksHome';
import DatabasesVendorProjectsPendingVendorProjectsHODetails from './components/_dashboard/VendorProjectDatabase/AllVendors/PendingTasks/HODetails/HODetailsPage';
import DatabasesVendorProjectsPendingVendorProjectsAssign from './components/_dashboard/VendorProjectDatabase/AllVendors/PendingTasks/Assign/AssignPage';
import DatabasesVendorProjectsPendingVendorProjectsTeamAllocation from './components/_dashboard/VendorProjectDatabase/AllVendors/PendingTasks/TeamAllocation/TeamAllocationPage';
import DatabasesVendorProjectsPendingVendorProjectsDependencies from './components/_dashboard/VendorProjectDatabase/AllVendors/PendingTasks/Dependencies/DependenciesPage';
import DatabasesVendorProjectsPendingVendorProjectsPRPO from './components/_dashboard/VendorProjectDatabase/AllVendors/PendingTasks/PRPOProgress/PRPOProgressPage';
import DatabasesVendorProjectsPendingVendorProjectsLogistics from './components/_dashboard/VendorProjectDatabase/AllVendors/PendingTasks/Logistics/LogisticsPage';
import DatabasesVendorProjectsPendingVendorProjectsImplementation from './components/_dashboard/VendorProjectDatabase/AllVendors/PendingTasks/Implementation/ImplementationPage';
import DatabasesVendorProjectsPendingVendorProjectsAcceptance from './components/_dashboard/VendorProjectDatabase/AllVendors/PendingTasks/Acceptance/AcceptancePage';
import DatabasesVendorProjectsPendingVendorProjectsPayment from './components/_dashboard/VendorProjectDatabase/AllVendors/PendingTasks/Payment/PaymentPage';
// vendor projects Huawei vendor projects pending tasks
import DatabasesVendorProjectsHuaweiPendingTasks from './components/_dashboard/VendorProjectDatabase/Huawei/PendingTasks/PendingTasksHome/VendorDatabasesPendingTasksHome';
import DatabasesVendorProjectsPendingHuaweiProjectsHODetails from './components/_dashboard/VendorProjectDatabase/Huawei/PendingTasks/HODetails/HODetailsPage';
import DatabasesVendorProjectsPendingHuaweiProjectsAssign from './components/_dashboard/VendorProjectDatabase/Huawei/PendingTasks/Assign/AssignPage';
import DatabasesVendorProjectsPendingHuaweiProjectsTeamAllocation from './components/_dashboard/VendorProjectDatabase/Huawei/PendingTasks/TeamAllocation/TeamAllocationPage';
import DatabasesVendorProjectsPendingHuaweiProjectsDependencies from './components/_dashboard/VendorProjectDatabase/Huawei/PendingTasks/Dependencies/DependenciesPage';
import DatabasesVendorProjectsPendingHuaweiProjectsPRPO from './components/_dashboard/VendorProjectDatabase/Huawei/PendingTasks/PRPOProgress/PRPOProgressPage';
import DatabasesVendorProjectsPendingHuaweiProjectsLogistics from './components/_dashboard/VendorProjectDatabase/Huawei/PendingTasks/Logistics/LogisticsPage';
import DatabasesVendorProjectsPendingHuaweiProjectsImplementation from './components/_dashboard/VendorProjectDatabase/Huawei/PendingTasks/Implementation/ImplementationPage';
import DatabasesVendorProjectsPendingHuaweiProjectsAcceptance from './components/_dashboard/VendorProjectDatabase/Huawei/PendingTasks/Acceptance/AcceptancePage';
import DatabasesVendorProjectsPendingHuaweiProjectsPayment from './components/_dashboard/VendorProjectDatabase/Huawei/PendingTasks/Payment/PaymentPage';
// vendor projects ZTE vendor projects pending tasks
import DatabasesVendorProjectsZTEPendingTasks from './components/_dashboard/VendorProjectDatabase/ZTE/PendingTasks/PendingTasksHome/VendorDatabasesPendingTasksHome';
import DatabasesVendorProjectsPendingZTEProjectsHODetails from './components/_dashboard/VendorProjectDatabase/ZTE/PendingTasks/HODetails/HODetailsPage';
import DatabasesVendorProjectsPendingZTEProjectsAssign from './components/_dashboard/VendorProjectDatabase/ZTE/PendingTasks/Assign/AssignPage';
import DatabasesVendorProjectsPendingZTEProjectsTeamAllocation from './components/_dashboard/VendorProjectDatabase/ZTE/PendingTasks/TeamAllocation/TeamAllocationPage';
import DatabasesVendorProjectsPendingZTEProjectsDependencies from './components/_dashboard/VendorProjectDatabase/ZTE/PendingTasks/Dependencies/DependenciesPage';
import DatabasesVendorProjectsPendingZTEProjectsPRPO from './components/_dashboard/VendorProjectDatabase/ZTE/PendingTasks/PRPOProgress/PRPOProgressPage';
import DatabasesVendorProjectsPendingZTEProjectsLogistics from './components/_dashboard/VendorProjectDatabase/ZTE/PendingTasks/Logistics/LogisticsPage';
import DatabasesVendorProjectsPendingZTEProjectsImplementation from './components/_dashboard/VendorProjectDatabase/ZTE/PendingTasks/Implementation/ImplementationPage';
import DatabasesVendorProjectsPendingZTEProjectsAcceptance from './components/_dashboard/VendorProjectDatabase/ZTE/PendingTasks/Acceptance/AcceptancePage';
import DatabasesVendorProjectsPendingZTEProjectsPayment from './components/_dashboard/VendorProjectDatabase/ZTE/PendingTasks/Payment/PaymentPage';
// vendor projects ZTE projects
import VendorProjectsDatabaseZTE from './components/_dashboard/VendorProjectDatabase/ZTE/VendorsDatabasesZTE';
import DatabasesFileUpload from './pages/DatabasesFileUpload';
import VendorProjectsDatabasesFileUpload from './components/_dashboard/DatabasesFilesUploads/VendorProjects/VendorProjectsDatabasesFileUpload';
import MobitelProjectsDatabasesFileUpload from './components/_dashboard/DatabasesFilesUploads/MobitelProjects/MobitelProjectsDatabasesFileUpload';
import MobitelProjectsDatabasesExcelEdit from './components/_dashboard/DatabasesFilesUploads/ExcellEditMobitelProjects/MobitelProjectsDatabasesExcelEdit';
import VendorProjectsDatabasesExcelEdit from './components/_dashboard/DatabasesFilesUploads/ExcellEditVendorProjects/VendorProjectsDatabasesExcelEdit';
import MobitelProjectsMilestones from './pages/MobitelProjectsMilestones';
import MobitelProjectsDatabase from './pages/MobitelProjectsDatabase';
// Mobitel Databases
import DatabasesMobitelProjectsAllMobitelProjects from './components/_dashboard/MobitelProjectDatabase/AllMobitelProjects/AllMobitelProjectsPage';
import DatabasesMobitelProjectsAllMobitelScopeData from './components/_dashboard/MobitelProjectDatabase/AllMobitelProjects/AllMobitelScopeData';
import DatabasesMobitelProjectsAllMobitelHandoverData from './components/_dashboard/MobitelProjectDatabase/AllMobitelProjects/AllMobitelHandoverData';
import DatabasesMobitelProjectsAllMobitelPatPassData from './components/_dashboard/MobitelProjectDatabase/AllMobitelProjects/AllMobitelPatPassData';
import DatabasesMobitelProjectsAllMobitelOnAirData from './components/_dashboard/MobitelProjectDatabase/AllMobitelProjects/AllMobitelOnAirData';
import DatabasesMobitelProjectsAllMobitelHoldData from './components/_dashboard/MobitelProjectDatabase/AllMobitelProjects/AllMobitelHoldData';
import DatabasesMobitelProjectsPendingMobitelProjects from './components/_dashboard/MobitelProjectDatabase/PendingTasks/PendingTasksHome/MobitelDatabasesPendingTasksHome';
import DatabasesMobitelProjectsPendingMobitelProjectsHODetails from './components/_dashboard/MobitelProjectDatabase/PendingTasks/HODetails/HODetailsPage';
import DatabasesMobitelProjectsPendingMobitelProjectsAssign from './components/_dashboard/MobitelProjectDatabase/PendingTasks/Assign/AssignPage';
import DatabasesMobitelProjectsPendingMobitelProjectsTeamAllocation from './components/_dashboard/MobitelProjectDatabase/PendingTasks/TeamAllocation/TeamAllocationPage';
import DatabasesMobitelProjectsPendingMobitelProjectsDependencies from './components/_dashboard/MobitelProjectDatabase/PendingTasks/Dependencies/DependenciesPage';
import DatabasesMobitelProjectsPendingMobitelProjectsPRPO from './components/_dashboard/MobitelProjectDatabase/PendingTasks/PRPOProgress/PRPOProgressPage';
import DatabasesMobitelProjectsPendingMobitelProjectsLogistics from './components/_dashboard/MobitelProjectDatabase/PendingTasks/Logistics/LogisticsPage';
import DatabasesMobitelProjectsPendingMobitelProjectsImplementation from './components/_dashboard/MobitelProjectDatabase/PendingTasks/Implementation/ImplementationPage';
import DatabasesMobitelProjectsPendingMobitelProjectsAcceptance from './components/_dashboard/MobitelProjectDatabase/PendingTasks/Acceptance/AcceptancePage';
import DatabasesMobitelProjectsPendingMobitelProjectsPayment from './components/_dashboard/MobitelProjectDatabase/PendingTasks/Payment/PaymentPage';
import DatabasesMobitelProjectsAllMobitelProjectsViewOnly from './components/_dashboard/MobitelProjectDatabase/ViewOnlyMobitelDatabase/ViewOnlyMobitelProjectsPage';

// Users
import RegisterUsers from './pages/RegisterUsers';
import UserList from './pages/UserList';
import UserProfile from './pages/UserProfile';
import TestDb1 from './pages/TestDb1';
import TestDb1CreatePost from './pages/TestDb1CreatePost';
import TestDb1ViewPost from './pages/TestDb1ViewPost';
import EditDetailsVOT from './components/_dashboard/VendorProjectsOverview/EditDetails';
import AddNewVendorProject from './components/_dashboard/VendorProjectDatabase/AllVendors/AddNewVendorProject';
import AddNewHuaweiVendorProject from './components/_dashboard/VendorProjectDatabase/Huawei/AddNewVendorProject';
import AddNewZTEVendorProject from './components/_dashboard/VendorProjectDatabase/ZTE/AddNewVendorProject';
// Edit vendor projects database by forms
import EditAllVendorProjectsDatabase from './components/_dashboard/VendorProjectDatabase/AllVendors/EditAllVendorProjectsDatabase';
import EditProjectHODetails from './components/_dashboard/VendorProjectDatabase/AllVendors/PendingTasks/HODetails/EditProjectHODetails';
import EditProjectAssign from './components/_dashboard/VendorProjectDatabase/AllVendors/PendingTasks/Assign/EditProjectAssign';
import EditTeamAllocation from './components/_dashboard/VendorProjectDatabase/AllVendors/PendingTasks/TeamAllocation/EditTeamAllocation';
import EditProjectDependencies from './components/_dashboard/VendorProjectDatabase/AllVendors/PendingTasks/Dependencies/EditProjectDependencies';
import EditPRPOProgress from './components/_dashboard/VendorProjectDatabase/AllVendors/PendingTasks/PRPOProgress/EditPRPOProgress';
import EditProjectLogistics from './components/_dashboard/VendorProjectDatabase/AllVendors/PendingTasks/Logistics/EditProjectLogistics';
import EditImplementation from './components/_dashboard/VendorProjectDatabase/AllVendors/PendingTasks/Implementation/EditProjectImplementation';
import EditProjectAcceptance from './components/_dashboard/VendorProjectDatabase/AllVendors/PendingTasks/Acceptance/EditProjectAcceptance';
import EditProjectPayment from './components/_dashboard/VendorProjectDatabase/AllVendors/PendingTasks/Payment/EditProjectPayment';
// Edit Huawei projects database by forms
import EditHuaweiVendorProjectsDatabase from './components/_dashboard/VendorProjectDatabase/Huawei/EditAllVendorProjectsDatabase';
import EditHuaweiProjectHODetails from './components/_dashboard/VendorProjectDatabase/Huawei/PendingTasks/HODetails/EditProjectHODetails';
import EditHuaweiProjectAssign from './components/_dashboard/VendorProjectDatabase/Huawei/PendingTasks/Assign/EditProjectAssign';
import EditHuaweiTeamAllocation from './components/_dashboard/VendorProjectDatabase/Huawei/PendingTasks/TeamAllocation/EditTeamAllocation';
import EditHuaweiProjectDependencies from './components/_dashboard/VendorProjectDatabase/Huawei/PendingTasks/Dependencies/EditProjectDependencies';
import EditHuaweiPRPOProgress from './components/_dashboard/VendorProjectDatabase/Huawei/PendingTasks/PRPOProgress/EditPRPOProgress';
import EditHuaweiProjectLogistics from './components/_dashboard/VendorProjectDatabase/Huawei/PendingTasks/Logistics/EditProjectLogistics';
import EditHuaweiImplementation from './components/_dashboard/VendorProjectDatabase/Huawei/PendingTasks/Implementation/EditProjectImplementation';
import EditHuaweiProjectAcceptance from './components/_dashboard/VendorProjectDatabase/Huawei/PendingTasks/Acceptance/EditProjectAcceptance';
import EditHuaweiProjectPayment from './components/_dashboard/VendorProjectDatabase/Huawei/PendingTasks/Payment/EditProjectPayment';
// Edit ZTE projects database by forms
import EditZTEVendorProjectsDatabase from './components/_dashboard/VendorProjectDatabase/ZTE/EditZTEProjectsDatabase';
import EditZTEProjectHODetails from './components/_dashboard/VendorProjectDatabase/ZTE/PendingTasks/HODetails/EditProjectHODetails';
import EditZTEProjectAssign from './components/_dashboard/VendorProjectDatabase/ZTE/PendingTasks/Assign/EditProjectAssign';
import EditZTETeamAllocation from './components/_dashboard/VendorProjectDatabase/ZTE/PendingTasks/TeamAllocation/EditTeamAllocation';
import EditZTEProjectDependencies from './components/_dashboard/VendorProjectDatabase/ZTE/PendingTasks/Dependencies/EditProjectDependencies';
import EditZTEPRPOProgress from './components/_dashboard/VendorProjectDatabase/ZTE/PendingTasks/PRPOProgress/EditPRPOProgress';
import EditZTEProjectLogistics from './components/_dashboard/VendorProjectDatabase/ZTE/PendingTasks/Logistics/EditProjectLogistics';
import EditZTEImplementation from './components/_dashboard/VendorProjectDatabase/ZTE/PendingTasks/Implementation/EditProjectImplementation';
import EditZTEProjectAcceptance from './components/_dashboard/VendorProjectDatabase/ZTE/PendingTasks/Acceptance/EditProjectAcceptance';
import EditZTEProjectPayment from './components/_dashboard/VendorProjectDatabase/ZTE/PendingTasks/Payment/EditProjectPayment';
// Edit ZTE Vendor Projects Database
import AddNewMobitelProject from './components/_dashboard/MobitelProjectDatabase/AllMobitelProjects/AddNewMobitelProject';
import EditMobitelProject from './components/_dashboard/MobitelProjectDatabase/AllMobitelProjects/EditMobitelProject';
import EditMobitelProjectHandover from './components/_dashboard/MobitelProjectDatabase/PendingTasks/HODetails/EditMobitelProjectHODetails';
import EditMobitelProjectWorkAllocation from './components/_dashboard/MobitelProjectDatabase/PendingTasks/Assign/EditMobitelProjectAssign';
import EditMobitelProjectTeamAllocation from './components/_dashboard/MobitelProjectDatabase/PendingTasks/TeamAllocation/EditMobitelProjectTeamAllocation';
import EditMobitelProjectDependencies from './components/_dashboard/MobitelProjectDatabase/PendingTasks/Dependencies/EditMobitelProjectDependencies';
import EditMobitelProjectLogistic from './components/_dashboard/MobitelProjectDatabase/PendingTasks/Logistics/EditMobitelProjectLogistics';
import EditMobitelProjectPRPOProgress from './components/_dashboard/MobitelProjectDatabase/PendingTasks/PRPOProgress/EditMobitelProjectPRPOProgress';
import EditMobitelProjectImplementation from './components/_dashboard/MobitelProjectDatabase/PendingTasks/Implementation/EditMobitelProjectImplementation';
import EditMobitelProjectAcceptance from './components/_dashboard/MobitelProjectDatabase/PendingTasks/Acceptance/EditMobitelProjectAcceptance';
import EditMobitelProjectPayment from './components/_dashboard/MobitelProjectDatabase/PendingTasks/Payment/EditMobitelProjectPayment';
import EditDetailsMOT from './components/_dashboard/MobitelProjectsOverview/EditDetails';
import TestDatagrid from './pages/TestDatagrid';
import Settings from './pages/Settings';
import SettingsVendorProjectsHome from './components/_dashboard/Settings/VendorProjects/VendorProjectsSetingsHome';
import SettingsMobitelProjectsHome from './components/_dashboard/Settings/MobitelProjects/MobitelProjectsSetingsHome';
import SettingsMobitelProjectsSiteEngineers from './components/_dashboard/Settings/MobitelProjects/SiteEngineers/MobitelProjectsSettingsSiteEngineers';
import SettingsMobitelProjectsSpecialTag from './components/_dashboard/Settings/MobitelProjects/SpecialTag/MobitelProjectsSettingsSpecialTag';
import SettingsMobitelProjectsDependency from './components/_dashboard/Settings/MobitelProjects/Dependency/MobitelProjectsSettingsDependency';
import SettingsMobitelProjectsSiteStatus from './components/_dashboard/Settings/MobitelProjects/SiteStatus/MobitelProjectsSettingSiteStatus';
import SettingsMobitelProjectsResponsible from './components/_dashboard/Settings/MobitelProjects/Responsible/MobitelProjectsSettingsResponsible';
import SettingsMobitelProjectsScope from './components/_dashboard/Settings/MobitelProjects/Scope/MobitelProjectsSettingsScope';
import SettingsMobitelProjectsNewRAT from './components/_dashboard/Settings/MobitelProjects/New_RAT/MobitelProjectsSettingsNew_RAT';
import SettingsMobitelProjectsSubContractor from './components/_dashboard/Settings/MobitelProjects/Sub_Contractor/MobitelProjectsSettingsSub_Contractor';

// Admin matiriyal
import Material from './pages/Material';
import MobitelSiteEngineersDayPlan from './pages/MobitelSiteEngineersDayPlan';

export default function Router() {
  const [userRole, setUserRole] = useState('Admin');

  useEffect(() => {
    const secret = 'AuH8e#?y!E87nyVh';
    const encryptedData = localStorage.getItem('encInf');

    if (encryptedData && typeof encryptedData !== 'undefined') {
      const decData = CryptoJS.AES.decrypt(encryptedData, secret);
      if (decData) {
        const decInfo = decData.toString(CryptoJS.enc.Utf8);
        if (decData) {
          const jsonDecInfo = JSON.parse(decInfo);
          setUserRole(jsonDecInfo.adminLevel);
        }
      }
    }
  }, []);

  return useRoutes([
    { path: '/', element: <Login />, children: [{ path: 'login', element: <Login /> }] },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },

        // Admin mod
        {
          path: 'app',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <DashboardApp />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'databases',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <Databases />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },

        {
          path: 'Material',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <Material />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },

        {
          path: 'MobitelSiteEngineersDayPlan',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <MobitelSiteEngineersDayPlan />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },

        // Admin mod vendor
        {
          path: 'VendorProjectsOverview',
          element:
            userRole === 'Admin' ||
            userRole === 'Moderator' ||
            userRole === 'Vendor - Huawei' ||
            userRole === 'Vendor - ZTE' ? (
              <VendorProjectsOverview />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'VendorProjectsOverviewAll',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <AllVendorProjectsOverview />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'VendorProjectsOverviewHuawei',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <VendorProjectsOverviewHuawei />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'VendorProjectsOverviewZTE',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <VendorProjectsOverviewZTE />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'VendorProjectsOverview/EditDetails/:id',
          element:
            userRole === 'Admin' ||
            userRole === 'Moderator' ||
            userRole === 'Vendor - Huawei' ||
            userRole === 'Vendor - ZTE' ? (
              <EditDetailsVOT />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'VendorProjectsInsights',
          element:
            userRole === 'Admin' ||
            userRole === 'Moderator' ||
            userRole === 'Vendor - Huawei' ||
            userRole === 'Vendor - ZTE' ? (
              <VendorProjectsInsightsHome />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'VendorProjectsInsightsAll',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <VendorProjectsInsights />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'VendorProjectsInsightsHuawei',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <HuaweiProjectsInsights />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'VendorProjectsInsightsZTE',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <ZTEProjectsInsights />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'VendorProjectsMilestones',
          element:
            userRole === 'Admin' ||
            userRole === 'Moderator' ||
            userRole === 'Vendor - Huawei' ||
            userRole === 'Vendor - ZTE' ? (
              <VendorProjectsMilestones />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'VendorProjectsMilestonesAll',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <VendorProjectsMilestonesAll />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'VendorProjectsMilestonesHuawei',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <VendorProjectsMilestonesHuawei />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'VendorProjectsMilestonesZTE',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <VendorProjectsMilestonesZTE />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects',
          element:
            userRole === 'Admin' ||
            userRole === 'Moderator' ||
            userRole === 'Vendor - Huawei' ||
            userRole === 'Vendor - ZTE' ? (
              <VendorProjectsDatabase />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsAll',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <VendorProjectsDatabaseAll />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsAll/ViewOnly',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'View Only' ? (
              <VendorProjectsDatabaseAllProjectsViewOnly />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsAll/PendingTasks/Home',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <DatabasesVendorProjectsAllVendorPendingTasks />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsAll/PendingTasks/Handover',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <DatabasesVendorProjectsPendingVendorProjectsHODetails />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsAll/PendingTasks/WorkAllocation',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <DatabasesVendorProjectsPendingVendorProjectsAssign />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsAll/PendingTasks/TeamAllocation',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <DatabasesVendorProjectsPendingVendorProjectsTeamAllocation />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsAll/PendingTasks/Dependencies',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <DatabasesVendorProjectsPendingVendorProjectsDependencies />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsAll/PendingTasks/PRPOProgress',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <DatabasesVendorProjectsPendingVendorProjectsPRPO />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsAll/PendingTasks/Logistics',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <DatabasesVendorProjectsPendingVendorProjectsLogistics />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsAll/PendingTasks/Implementation',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <DatabasesVendorProjectsPendingVendorProjectsImplementation />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsAll/PendingTasks/Acceptance',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <DatabasesVendorProjectsPendingVendorProjectsAcceptance />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsAll/PendingTasks/Payment',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <DatabasesVendorProjectsPendingVendorProjectsPayment />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsHuawei/PendingTasks/Home',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <DatabasesVendorProjectsHuaweiPendingTasks />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsHuawei/PendingTasks/Handover',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <DatabasesVendorProjectsPendingHuaweiProjectsHODetails />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsHuawei/PendingTasks/WorkAllocation',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <DatabasesVendorProjectsPendingHuaweiProjectsAssign />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsHuawei/PendingTasks/TeamAllocation',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <DatabasesVendorProjectsPendingHuaweiProjectsTeamAllocation />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsHuawei/PendingTasks/Dependencies',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <DatabasesVendorProjectsPendingHuaweiProjectsDependencies />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsHuawei/PendingTasks/PRPOProgress',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <DatabasesVendorProjectsPendingHuaweiProjectsPRPO />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsHuawei/PendingTasks/Logistics',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <DatabasesVendorProjectsPendingHuaweiProjectsLogistics />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsHuawei/PendingTasks/Implementation',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <DatabasesVendorProjectsPendingHuaweiProjectsImplementation />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsHuawei/PendingTasks/Acceptance',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <DatabasesVendorProjectsPendingHuaweiProjectsAcceptance />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsHuawei/PendingTasks/Payment',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <DatabasesVendorProjectsPendingHuaweiProjectsPayment />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsZTE/PendingTasks/Home',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <DatabasesVendorProjectsZTEPendingTasks />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsZTE/PendingTasks/Handover',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <DatabasesVendorProjectsPendingZTEProjectsHODetails />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsZTE/PendingTasks/WorkAllocation',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <DatabasesVendorProjectsPendingZTEProjectsAssign />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsZTE/PendingTasks/TeamAllocation',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <DatabasesVendorProjectsPendingZTEProjectsTeamAllocation />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsZTE/PendingTasks/Dependencies',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <DatabasesVendorProjectsPendingZTEProjectsDependencies />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsZTE/PendingTasks/PRPOProgress',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <DatabasesVendorProjectsPendingZTEProjectsPRPO />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsZTE/PendingTasks/Logistics',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <DatabasesVendorProjectsPendingZTEProjectsLogistics />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsZTE/PendingTasks/Implementation',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <DatabasesVendorProjectsPendingZTEProjectsImplementation />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsZTE/PendingTasks/Acceptance',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <DatabasesVendorProjectsPendingZTEProjectsAcceptance />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsZTE/PendingTasks/Payment',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <DatabasesVendorProjectsPendingZTEProjectsPayment />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsHuawei',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <VendorProjectsDatabaseHuawei />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjectsZTE',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <VendorProjectsDatabaseZTE />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/AddNew',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <AddNewVendorProject />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/AddNew/Huawei',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <AddNewHuaweiVendorProject />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/AddNew/ZTE',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <AddNewZTEVendorProject />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesUploadProjectFiles',
          element:
            userRole === 'Admin' ||
            userRole === 'Moderator' ||
            userRole === 'Editor' ||
            userRole === 'Vendor - Huawei' ||
            userRole === 'Vendor - ZTE' ? (
              <DatabasesFileUpload />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesUploadProjectFiles/VendorProjects',
          element:
            userRole === 'Admin' ||
            userRole === 'Moderator' ||
            userRole === 'Vendor - Huawei' ||
            userRole === 'Vendor - ZTE' ? (
              <VendorProjectsDatabasesFileUpload />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesUploadProjectFiles/VendorProjects/ExcelEdit',
          element:
            userRole === 'Admin' ||
            userRole === 'Moderator' ||
            userRole === 'Vendor - Huawei' ||
            userRole === 'Vendor - ZTE' ? (
              <VendorProjectsDatabasesExcelEdit />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/AllProjects/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor' ? (
              <EditAllVendorProjectsDatabase />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/AllHandover/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <EditProjectHODetails />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/AllWorkAllocation/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <EditProjectAssign />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/AllTeamAllocation/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <EditTeamAllocation />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/AllDependencies/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <EditProjectDependencies />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/AllPRPOProgress/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <EditPRPOProgress />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/AllLogistics/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <EditProjectLogistics />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/AllImplementation/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <EditImplementation />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/AllAcceptance/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <EditProjectAcceptance />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/AllPayment/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' ? (
              <EditProjectPayment />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/HuaweiProjects/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <EditHuaweiVendorProjectsDatabase />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/Huawei/Handover/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <EditHuaweiProjectHODetails />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/Huawei/WorkAllocation/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <EditHuaweiProjectAssign />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/Huawei/TeamAllocation/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <EditHuaweiTeamAllocation />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/Huawei/Dependencies/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <EditHuaweiProjectDependencies />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/Huawei/PRPOProgress/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <EditHuaweiPRPOProgress />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/Huawei/Logistics/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <EditHuaweiProjectLogistics />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/Huawei/Implementation/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <EditHuaweiImplementation />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/Huawei/Acceptance/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <EditHuaweiProjectAcceptance />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/Huawei/Payment/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - Huawei' ? (
              <EditHuaweiProjectPayment />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/ZTEProjects/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <EditZTEVendorProjectsDatabase />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/ZTE/Handover/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <EditZTEProjectHODetails />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/ZTE/Assign/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <EditZTEProjectAssign />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/ZTE/TeamAllocation/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <EditZTETeamAllocation />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/ZTE/Dependencies/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <EditZTEProjectDependencies />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/ZTE/PRPOProgress/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <EditZTEPRPOProgress />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/ZTE/Logistics/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <EditZTEProjectLogistics />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/ZTE/Implementation/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <EditZTEImplementation />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/ZTE/Acceptance/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <EditZTEProjectAcceptance />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesVendorProjects/ZTE/Payment/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Vendor - ZTE' ? (
              <EditZTEProjectPayment />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        // Admin mod
        {
          path: 'MobitelProjectsOverview',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <MobitelProjectsOverview />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'MobitelProjectsOverview/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <EditDetailsMOT />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'MobitelProjectsInsights',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <MobitelProjectsInsights />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'MobitelProjectsMilestones',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <MobitelProjectsMilestones />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'MobitelProjectsFinance',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <MobitelProjectsFinance />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'MobitelProjects/SubProjects',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <MobitelSubProjects />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'MobitelProjects/SiteEngineers',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <MobitelProjectsSiteEngineers />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        // Admin mod editor
        {
          path: 'DatabasesMobitelProjects',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <MobitelProjectsDatabase />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesMobitelProjects/AllMobitelProjects',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <DatabasesMobitelProjectsAllMobitelProjects />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },

        {
          path: 'DatabasesMobitelProjects/PendingMobitelTasks',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <DatabasesMobitelProjectsPendingMobitelProjects />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesMobitelProjects/PendingMobitelTasks/HandoverDetails',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <DatabasesMobitelProjectsPendingMobitelProjectsHODetails />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesMobitelProjects/PendingMobitelTasks/WorkAllocation',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <DatabasesMobitelProjectsPendingMobitelProjectsAssign />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesMobitelProjects/PendingMobitelTasks/TeamAllocation',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <DatabasesMobitelProjectsPendingMobitelProjectsTeamAllocation />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesMobitelProjects/PendingMobitelTasks/Dependencies',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <DatabasesMobitelProjectsPendingMobitelProjectsDependencies />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesMobitelProjects/PendingMobitelTasks/PRPO',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <DatabasesMobitelProjectsPendingMobitelProjectsPRPO />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesMobitelProjects/PendingMobitelTasks/Logistics',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <DatabasesMobitelProjectsPendingMobitelProjectsLogistics />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesMobitelProjects/PendingMobitelTasks/Implementation',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <DatabasesMobitelProjectsPendingMobitelProjectsImplementation />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesMobitelProjects/PendingMobitelTasks/Acceptance',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <DatabasesMobitelProjectsPendingMobitelProjectsAcceptance />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesMobitelProjects/PendingMobitelTasks/Payment',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <DatabasesMobitelProjectsPendingMobitelProjectsPayment />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesMobitelProjects/AddNew',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <AddNewMobitelProject />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesMobitelProjects/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <EditMobitelProject />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesMobitelProjects/Handover/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <EditMobitelProjectHandover />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesMobitelProjects/WorkAllocation/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <EditMobitelProjectWorkAllocation />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesMobitelProjects/TeamAllocation/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <EditMobitelProjectTeamAllocation />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesMobitelProjects/Dependencies/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <EditMobitelProjectDependencies />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesMobitelProjects/PRPOProgress/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <EditMobitelProjectPRPOProgress />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesMobitelProjects/Logistic/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <EditMobitelProjectLogistic />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesMobitelProjects/Implementation/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <EditMobitelProjectImplementation />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesMobitelProjects/Acceptance/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <EditMobitelProjectAcceptance />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesMobitelProjects/Payment/Edit/:id',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <EditMobitelProjectPayment />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesMobitelProjects/AllMobitelProjects/ViewOnly',
          element:
            userRole === 'Admin' ||
            userRole === 'Moderator' ||
            userRole === 'Editor' ||
            userRole === 'View Only' ? (
              <DatabasesMobitelProjectsAllMobitelProjectsViewOnly />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesUploadProjectFiles/MobitelProjects',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <MobitelProjectsDatabasesFileUpload />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'DatabasesUploadProjectFiles/MobitelProjects/ExcelEdit',
          element:
            userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
              <MobitelProjectsDatabasesExcelEdit />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        { path: 'home', element: <Home /> },
        { path: 'tasks', element: <Tasks /> },
        { path: 'userProfile', element: <UserProfile /> },
        { path: 'TestDb1', element: <TestDb1 /> },
        { path: 'TestDb1/addpost', element: <TestDb1CreatePost /> },
        { path: 'TestDb1/post/:id', element: <TestDb1ViewPost /> },
        { path: 'other', element: <Other /> },
        { path: 'addnew', element: <Addnew /> },
        { path: 'user', element: <User /> },
        { path: 'blog', element: <Blog /> },
        { path: 'TasksTestDatagrid', element: <TestDatagrid /> },
        // Admin
        {
          path: 'Users/registerUser',
          element: userRole === 'Admin' ? <RegisterUsers /> : <Navigate to="/unauthorized" />
        },
        {
          path: 'Users/userList',
          element: userRole === 'Admin' ? <UserList /> : <Navigate to="/unauthorized" />
        },
        {
          path: 'settings',
          element: userRole === 'Admin' ? <Settings /> : <Navigate to="/unauthorized" />
        },
        {
          path: 'settings/VendorProjects',
          element:
            userRole === 'Admin' ? <SettingsVendorProjectsHome /> : <Navigate to="/unauthorized" />
        },
        {
          path: 'settings/MobitelProjects',
          element:
            userRole === 'Admin' ? <SettingsMobitelProjectsHome /> : <Navigate to="/unauthorized" />
        },
        {
          path: 'settings/MobitelProjects/SiteEngineers',
          element:
            userRole === 'Admin' ? (
              <SettingsMobitelProjectsSiteEngineers />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'settings/MobitelProjects/SpecialTag',
          element:
            userRole === 'Admin' ? (
              <SettingsMobitelProjectsSpecialTag />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'settings/MobitelProjects/Dependency',
          element:
            userRole === 'Admin' ? (
              <SettingsMobitelProjectsDependency />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'settings/MobitelProjects/SiteStatus',
          element:
            userRole === 'Admin' ? (
              <SettingsMobitelProjectsSiteStatus />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'settings/MobitelProjects/Responsible',
          element:
            userRole === 'Admin' ? (
              <SettingsMobitelProjectsResponsible />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'settings/MobitelProjects/Scope',
          element:
            userRole === 'Admin' ? (
              <SettingsMobitelProjectsScope />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'settings/MobitelProjects/NewRAT',
          element:
            userRole === 'Admin' ? (
              <SettingsMobitelProjectsNewRAT />
            ) : (
              <Navigate to="/unauthorized" />
            )
        },
        {
          path: 'settings/MobitelProjects/SubCon',
          element:
            userRole === 'Admin' ? (
              <SettingsMobitelProjectsSubContractor />
            ) : (
              <Navigate to="/unauthorized" />
            )
        }
      ]
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'user', element: <User /> },
        { path: 'product category', element: <Tasks /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: 'unauthorized', element: <Unauthorized /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: 'DatabasesMobitelProjects/AllMobitelScopeData',
      element:
        userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
          <DatabasesMobitelProjectsAllMobitelScopeData />
        ) : (
          <Navigate to="/unauthorized" />
        )
    },
    {
      path: 'DatabasesMobitelProjects/AllMobitelHandoverData',
      element:
        userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
          <DatabasesMobitelProjectsAllMobitelHandoverData />
        ) : (
          <Navigate to="/unauthorized" />
        )
    },
    {
      path: 'DatabasesMobitelProjects/AllMobitelPatPassData',
      element:
        userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
          <DatabasesMobitelProjectsAllMobitelPatPassData />
        ) : (
          <Navigate to="/unauthorized" />
        )
    },
    {
      path: 'DatabasesMobitelProjects/AllMobitelOnAirData',
      element:
        userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
          <DatabasesMobitelProjectsAllMobitelOnAirData />
        ) : (
          <Navigate to="/unauthorized" />
        )
    },
    {
      path: 'DatabasesMobitelProjects/AllMobitelHoldData',
      element:
        userRole === 'Admin' || userRole === 'Moderator' || userRole === 'Editor' ? (
          <DatabasesMobitelProjectsAllMobitelHoldData />
        ) : (
          <Navigate to="/unauthorized" />
        )
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
