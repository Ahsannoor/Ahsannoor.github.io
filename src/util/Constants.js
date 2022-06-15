//export const serverIP = "http://us2levisqms/US2_wage_portal/";
//export const serverIP = "http://us2levisqms/US2_SPTS/";
export const serverIP = "https://mail-parser-application.herokuapp.com/";
//export const serverIP = "http://192.168.88.214/US2_SPTS/";
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const login = "/userLogin.php";

// For View Cutreport
export const forViewgetOrdersFromCutReport =
  "CutReport/View CutReport/getOrdersFromCutreport.php";
export const forViewgetCutsForOrder =
  "CutReport/View CutReport/getCutsForOrderFromCutreport.php";
export const forViewgetBundlesForOrderCut =
  "CutReport/View CutReport/getBundlesForOrder,CutFromCutreport.php";

export const updateBundle =
  "CutReport/View CutReport/updateQuantityForItemID.php";

//For Upload Cutreport
export const getOrdersFromOracle =
  "CutReport/Upload CutReport/getOrdersFromOracle.php";
export const getCutReportFromOracleForOrder =
  "CutReport/Upload CutReport/fetchCutReportForOrderFromOracle.php";
export const uploadCutReport = "CutReport/Upload CutReport/uploadCutReport.php";

// Upload Operations
export const getAllOperationsFromOracle =
  "Operations/Upload Operations/getAllOperations.php";
export const uploadOperations =
  "Operations/Upload Operations/UploadOperations.php";

// Operations
export const getAllOperations = "Operations/getAllOperations.php";
export const getAllOperationsFromSql = "Operations/getAllOperationsFromSQL.php";
export const updateOperationInfo = "Operations/updateOperationInfo.php";

// Upload Machines
export const getAllMachinesFromOracle =
  "Machines/Upload Machines/getAllMachinesFromOracle.php";
export const uploadMachines = "Machines/Upload Machines/UploadMachines.php";
//Machines
export const getAllMachines = "Machines/getAllMachines.php";
export const updateMachineInfo = "Machines/updateMachineInfo.php";

//Upload workers
export const getAllWorkersFromOracle =
  "Workers/uploadWorkers/getAllWorkersFromOracle.php";
export const uploadWorkers = "Workers/uploadWorkers/UploadWorkers.php";

export const getAllUnits = "getAllUnits.php";
export const getAllSections = "getAllSections.php";

//Workers
export const getAllWorkers = "Workers/getAllWorkers.php";
export const updateWorkerInfo = "Workers/updateWorkerInfo.php";

//For Upload Style Bulletin
export const getOrdersForStyleBulletinFromOracle =
  "StyleBulletin/StyleBulletinUpload/getOrdersFromOracle.php";

export const getStyleBulletin =
  "StyleBulletin/StyleBulletinUpload/fetchStyleBulletinForOrderFromOracle.php";
export const uploadStyleBulletin =
  "StyleBulletin/StyleBulletinUpload/uploadStyleBuletin.php";

// For Cut Bundle Creation
export const getOrdersFromOracleForCutBundleCreation =
  "CutBundleCreation/getOrdersForBundleCreation.php";
export const createCutBundleForOrder =
  "CutBundleCreation/createCutBundleForOrder.php";
// Lines
export const getLinesForUnit = "getAllLinesForUnit.php";

export const addUser = "Users/createUser.php";
