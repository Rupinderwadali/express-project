

function define(obj, name, value) {
    Object.defineProperty(obj, name, {
        value:        value,
        enumerable:   true,
        writable:     false,
        configurable: false
    });
}


exports.responseStatus = {};
define(exports.responseStatus, "SOME_ERROR", 0);
define(exports.responseStatus, "PARAMETER_MISSING", 1);
define(exports.responseStatus, "INVALID_ACCESS_TOKEN",2);
define(exports.responseStatus, "SUCCESS", 4);
define(exports.responseStatus, "NOT_ACTIVE", 5);
define(exports.responseStatus, "ACTIVE", 6);
define(exports.responseStatus, "EMAIL_EXISTS", 7);
define(exports.responseStatus, "ERROR_IN_EXECUTION", 8);
define(exports.responseStatus, "NOT_SUPER", 9);
define(exports.responseStatus, "ADMIN_ADDED", 10);
define(exports.responseStatus, "INVALID_EMAIL", 11);
define(exports.responseStatus, "ADMIN_ACTIVATED",12);
define(exports.responseStatus, "ADMIN_DEACTIVATED",13);
define(exports.responseStatus, "NOT_REG",14);
define(exports.responseStatus, "SECTION_UPDATED",15);
define(exports.responseStatus, "NO_ADMIN_FOUND",16);
define(exports.responseStatus, "COUNTRY_CANT_BE_DELETED",21);

exports.responseMessage = {};
define(exports.responseMessage, "INVALID_SECTION_ID", "SECTION ID IS NOT VALID" );
define(exports.responseMessage, "NOT_ACTIVE", "This user is not active" );
define(exports.responseMessage, "LOGGED_IN", "User successfully logged in" );
define(exports.responseMessage, "PARAMETER_MISSING", "Some parameter missing" );
define(exports.responseMessage, "EMAIL_EXISTS", "This email already exists" );
define(exports.responseMessage, "ERROR_IN_EXECUTION", "Something went wrong" );
define(exports.responseMessage, "NOT_SUPER", "Not a super admin user" );
define(exports.responseMessage, "ADMIN_ADDED", "Admin successfully added" );
define(exports.responseMessage, "INVALID_EMAIL", "User email is not valid" );
define(exports.responseMessage, "INVALID_ACCESS_TOKEN","You are logged in on some other machine, please log in back");
define(exports.responseMessage, "ADMIN_ACTIVATED","Admin activated successfully");
define(exports.responseMessage, "ADMIN_DEACTIVATED","Admin de-activated successfully");
define(exports.responseMessage, "NOT_REG","Admin not registered with us");
define(exports.responseMessage, "SECTION_UPDATED","Sections updated successfully");
define(exports.responseMessage, "NO_ADMIN_FOUND","No admin found");
define(exports.responseMessage, "ALL_REG_ADMIN","All reg admin");
define(exports.responseMessage, "ADMIN_DATA","sub admin data");
define(exports.responseMessage, "INCORRECT_CREDENTIALS","Your email or password is incorrect");
define(exports.responseMessage, "NO_ASSIGNED_SECTION","Please asssign atleast one section before activation");
define(exports.responseMessage, "NO_DATA_FOUND","No data found");
define(exports.responseMessage, "FILTER_DATA","Filtered data");
define(exports.responseMessage, "INVALID_PASS","Password is not valid");
define(exports.responseMessage, "EMAIL_NOT_EXISTS","This email is not registered");

define(exports.responseMessage, "SUCCESS","Success");
define(exports.responseMessage, "NEW_PASSWORD","New password has been sent successfully on your email id");
define(exports.responseMessage, "CURRENCY_ADDED","Currency added");
define(exports.responseMessage, "CURRENCY_EDITED","Currency edited");
define(exports.responseMessage, "CURRENCY_DELETED","Currency deleted");
define(exports.responseMessage, "CURRENCY_MADE_DEFAULT","Currency default");
define(exports.responseMessage, "CATEGORY_ADDED","Category added successfully");
define(exports.responseMessage, "CATEGORY_UPDATED","Category updated successfully");
define(exports.responseMessage, "SUB_CATEGORY_ADDED"," Sub category added successfully");
define(exports.responseMessage, "SUB_CATEGORY_UPDATED","Sub category updated successfully");



define(exports.responseMessage, "DUPLICATE_PRODUCT_PRICING","Discount Price is already added in the similar date range");


define(exports.responseMessage, "ADD_LANGUAGE", "Language added successfully");
define(exports.responseMessage, "GET_LANGUAGE", "List of languages");
define(exports.responseMessage, "DEFUALT_LANGUAGE", "Default Language Changed Successfully");



define(exports.responseMessage, "COUNTRY_CANT_BE_DELETED","This Country cannot be deleted");
define(exports.responseMessage, "COUNTRY_ADDED", "Country Added Successfully");
define(exports.responseMessage, "LIST_OF_COUNTRIES", "List of Countries");
define(exports.responseMessage, "COUNTRY_MADE_LIVE", "Country made live successfully");
define(exports.responseMessage, "COUNTRY_IS_NOT_MADE_LIVE", "Country made unlive successfully");
define(exports.responseMessage, "COUNTRY_DELETED", "Country deleted successfully");
define(exports.responseMessage, "COUNTRY_NAME_CHANGED", "Country name changed successfully");





define(exports.responseMessage, "CITY_DELETED", "City deleted successfully");
define(exports.responseMessage, "ADD_CITY", "City added successfully");
define(exports.responseMessage, "LIST_OF_CITIES", "List of Cities");
define(exports.responseMessage, "CITY_MADE_LIVE", "City made live successfully");
define(exports.responseMessage, "CITY_IS_NOT_MADE_LIVE", "City made unlive successfully");
define(exports.responseMessage, "ALL_CITIES_OF_COUNTRY_DELETED", "All cities of a country deleted successfully");
define(exports.responseMessage, "CITY_NAME_CHANGED", "City name changed successfully");





define(exports.responseMessage, "ADD_ZONE", "Zone added successfully");
define(exports.responseMessage, "ZONE_DELETED", "Zone deleted successfully");
define(exports.responseMessage, "ZONE_MADE_LIVE", "Zone made live successfully");
define(exports.responseMessage, "ZONE_IS_NOT_MADE_LIVE", "Zone made unlive successfully");
define(exports.responseMessage, "LIST_OF_ZONES", "List of Zones");
define(exports.responseMessage, "ZONE_NAME_CHANGED", "Zone name changed successfully");



define(exports.responseMessage, "ADD_AREA", "Area added successfully");
define(exports.responseMessage, "AREA_DELETED", "Area deleted successfully");
define(exports.responseMessage, "AREA_MADE_LIVE", "Area made live successfully");
define(exports.responseMessage, "AREA_MADE_LIVE", "Area made live successfully");
define(exports.responseMessage, "AREA_IS_NOT_MADE_LIVE", "Area made unlive successfully");
define(exports.responseMessage, "AREA_NAME_CHANGED", "Area name changed successfully");
define(exports.responseMessage, "LIST_OF_AREAS", "List of Areas");


define(exports.responseMessage, "LIST_CATEGORIES", "List of Categories");
define(exports.responseMessage, "DELETE_CATEGORY", "Category deleted successfully");
define(exports.responseMessage, "CATEGORY_MADE_LIVE", "Category made live successfully");
define(exports.responseMessage, "CATEGORY_NOT_MADE_LIVE", "Category made unlive successfully");


define(exports.responseMessage, "LIST_SUB_CATEGORIES", "List of detailed sub categories");
define(exports.responseMessage, "LIST_DETAILED_SUB_CATEGORIES", "List of sub categories");
define(exports.responseMessage, "LIST_CATEGORIES_NAMES_WITH_IDS", "List of Category names with ids ");

define(exports.responseMessage, "LIST_SUB_CATEGORIES_NAMES_WITH_IDS", "List of Sub Category names with ids ");

define(exports.responseMessage, "DELETE_DUMP_DATA", "Dump Data of this supplier deleted successfully");

define(exports.responseMessage, "SUPPLIER_REG","Registration Completed");
define(exports.responseMessage, "BRANCH_EMAIL_ALREADY_REGISTERED","This email is already registered");

define(exports.responseMessage, "NO_SECTION_ASSIGNED","This user cant be made active as no section is assigned yet");


exports.pushNotificationStatus = {};
define(exports.pushNotificationStatus, "ORDER_ACCEPTED", 1);
define(exports.pushNotificationStatus, "ORDER_REJECTED", 2);
define(exports.pushNotificationStatus, "ORDER_DELIVERED", 3);
define(exports.pushNotificationStatus, "ORDER_TRACKED", 4);
define(exports.pushNotificationStatus, "SYSTEM_PUSH", 5);
define(exports.pushNotificationStatus, "BROADCASTING_PUSH", 6);
define(exports.pushNotificationStatus, "LOYALITY_ORDER_REJECTED", 7);
define(exports.pushNotificationStatus, "ORDER_GENARTED", 8);




exports.pushNotificationMessage = {};
define(exports.pushNotificationMessage, "ORDER_ACCEPTED_ENGLISH", "Your order has been accepted by the supplier");
define(exports.pushNotificationMessage, "ORDER_ACCEPTED_ARABIC", "تم قبول طلبك من قبل المورد");
define(exports.pushNotificationMessage, "ORDER_REJECTED_ENGLISH", "Sorry,Your order has been declined by the supplier");
define(exports.pushNotificationMessage, "ORDER_REJECTED_ARABIC", "عذرا، تم رفض طلبك من قبل المورد");
define(exports.pushNotificationMessage, "ORDER_DELIVERED_ENGLISH","Your order is delivered");
define(exports.pushNotificationMessage, "ORDER_DELIVERED_ARABIC","يتم تسليم طلبك");
define(exports.pushNotificationMessage, "ORDER_TRACKED_ENGLISH","Your Tracked order updated");
define(exports.pushNotificationMessage, "ORDER_TRACKED_ARABIC","أجل مجنزرة محدثا");
define(exports.pushNotificationMessage, "BROADCASTING_PUSH_ENGLISH","Hey there is offer for you");
define(exports.pushNotificationMessage, "BROADCASTING_PUSH_ARABIC","مهلا هناك عرض لك");
define(exports.pushNotificationMessage, "LOYALITY_ORDER_REJECTED_ENGLISH","Your loyality points is not enough for that order");
define(exports.pushNotificationMessage, "LOYALITY_ORDER_REJECTED_ARABIC","نقاط الولاء ليست كافية ل هذا النظام");
define(exports.pushNotificationMessage, "ORDER_GENARTED_ENGLISH","placed a new order");
