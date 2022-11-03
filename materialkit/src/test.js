let reqQuery = [];
if ( !ProjectName && !Special_Tag) {
    reqQuery = {};
} else if (ProjectName && ProjectName === 'All Mobitel Projects' && !Special_Tag) {
    reqQuery = {};
} else if (ProjectName && ProjectName !== 'All Mobitel Projects' && !Special_Tag) {
    reqQuery = { ProjectName };
} else if (Special_Tag && Special_Tag === 'All Sub Projects' && !ProjectName) {
    reqQuery = {};
} else if (Special_Tag && Special_Tag !== 'All Sub Projects' && !ProjectName) {
    reqQuery = { Special_Tag };
} else if (ProjectName === 'All Mobitel Projects' && Special_Tag === 'All Sub Projects') {
    reqQuery = {};
} else if (ProjectName === 'All Mobitel Projects' && Special_Tag !== 'All Sub Projects') {
    reqQuery = { Special_Tag };
} else if (Special_Tag === 'All Sub Projects' && ProjectName !== 'All Mobitel Projects') {
    reqQuery = { ProjectName };
} else if (ProjectName !== 'All Mobitel Projects' && Special_Tag !== 'All Sub Projects') {
    reqQuery = { ...req.query };
}