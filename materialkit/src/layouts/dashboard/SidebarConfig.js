import { Icon } from '@iconify/react';
import home from '@iconify/icons-eva/home-fill';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/log-in-fill';
import folderFill from '@iconify/icons-eva/layout-fill';
import activityFill from '@iconify/icons-eva/layers-fill';
import listOutline from '@iconify/icons-eva/list-outline';
import Settings from '@iconify/icons-eva/settings-2-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Home',
    path: '/dashboard/home',
    icon: getIcon(home)
  },
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Vendor Projects',
    path: '/dashboard/VendorProjects',
    icon: getIcon(folderFill),
    // collapse submenu
    children: [
      {
        title: 'Overview',
        path: '/dashboard/VendorProjectsOverview',
        icon: getIcon(shoppingBagFill)
      },
      {
        title: 'Insights',
        path: '/dashboard/VendorProjectsInsights',
        icon: getIcon(shoppingBagFill)
      },
      {
        title: 'Milestones',
        path: '/dashboard/VendorProjectsMilestones',
        icon: getIcon(fileTextFill)
      }
    ]
  },
  {
    title: 'Mobitel Projects',
    path: '/dashboard/MobitelProjects',
    icon: getIcon(activityFill),
    // collapse submenu
    children: [
      {
        title: 'Overview',
        path: '/dashboard/MobitelProjectsOverview',
        icon: getIcon(fileTextFill)
      },
      {
        title: 'Insights',
        path: '/dashboard/MobitelProjectsInsights',
        icon: getIcon(fileTextFill)
      },
      {
        title: 'Milestones',
        path: '/dashboard/MobitelProjectsMilestones',
        icon: getIcon(fileTextFill)
      },
      {
        title: 'Finance',
        path: '/dashboard/MobitelProjectsFinance',
        icon: getIcon(fileTextFill)
      },
      {
        title: 'Sub Projects',
        path: '/dashboard/MobitelProjects/SubProjects',
        icon: getIcon(fileTextFill)
      },
      {
        title: 'Site Engineers',
        path: '/dashboard/MobitelProjects/SiteEngineers',
        icon: getIcon(fileTextFill)
      }
    ]
  },
  {
    title: 'Databases',
    path: '/dashboard/databases',
    icon: getIcon(listOutline),
    children: [
      {
        title: 'Vendor Projects',
        path: '/dashboard/DatabasesVendorProjects',
        icon: getIcon(lockFill)
      },
      {
        title: 'Mobitel Projects',
        path: '/dashboard/DatabasesMobitelProjects',
        icon: getIcon(personAddFill)
      },
      {
        title: 'Upload Files',
        path: '/dashboard/DatabasesUploadProjectFiles',
        icon: getIcon(personAddFill)
      }
    ]
  },
  // {
  //   title: 'Tasks',
  //   path: '/dashboard/tasks',
  //   icon: getIcon(fileTextFill),
  //   children: [
  //     {
  //       title: 'Data Grid',
  //       path: '/dashboard/TasksTestDatagrid',
  //       icon: getIcon(lockFill)
  //     },
  //     {
  //       title: 'Other',
  //       path: '/dashboard/app',
  //       icon: getIcon(personAddFill)
  //     }
  //   ]
  // },
  // {
  //   title: 'Addnew',
  //   path: '/dashboard/addnew',
  //   icon: getIcon(fileAddFill),
  //   children: [
  //     {
  //       title: 'Addnew',
  //       path: '/dashboard/app',
  //       icon: getIcon(lockFill)
  //     },
  //     {
  //       title: 'Addnew',
  //       path: '/dashboard/app',
  //       icon: getIcon(personAddFill)
  //     }
  //   ]
  // },

  {
    title: 'Material Return',
    path: '/dashboard/Material',
    icon: getIcon(fileTextFill)
  },

  {
    title: 'Users',
    path: '/dashboard/Users',
    icon: getIcon(peopleFill),
    children: [
      {
        title: 'Register User',
        path: '/dashboard/Users/registerUser',
        icon: getIcon(lockFill)
      },
      {
        title: 'Users List',
        path: '/dashboard/Users/userList',
        icon: getIcon(personAddFill)
      }
    ]
  },
  {
    title: 'Settings',
    path: '/dashboard/settings',
    icon: getIcon(Settings)
  }
  // {
  //   title: 'Test DB 1',
  //   path: '/dashboard/TestDb1',
  //   icon: getIcon(shoppingBagFill)
  // },
  // {
  //   title: 'Addnew',
  //   path: '/dashboard/app',
  //   icon: getIcon(fileTextFill)
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon(lockFill)
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon(personAddFill)
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
