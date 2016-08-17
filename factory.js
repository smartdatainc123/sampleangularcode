/**
 * Factory for user module request
 * @access private
 * @return json
 * Created by sarvesh
 * Created Date 06-June-2016
 * @smartData Enterprises (I) Ltd
 */
app.factory('users', ['$resource', function($resource) {
        return{
            adminlogin: function(formData) {
                return $resource('/api/v1/users/adminlogin', {
                    save: {method: 'POST'}
                })
            },
            checkLogin: function() {
                return $resource('/api/v1/users/isUserAuthenticated')
            },
            signup: function(formData) {
                return $resource('/api/v1/users/registersubmit', {
                    save: {method: 'POST'}
                });
            },
            addUserProfile: function(formData) {
                //console.log(formData);
                return $resource('/api/v1/users/addUser', {
                    save: {method: 'POST'}
                });
            },
            ForgotPass: function(formData) {
                //console.log(formData);
                return $resource('/api/v1/users/forgotpass', {
                    save: {method: 'POST'}
                });
            },
            SubmitForgotPass: function(userId) {
                //console.log(formData);
                return $resource('/api/v1/users/submitforgotpass/' + userId, {
                    save: {method: 'POST'}
                });
            },
            submitAdminData: function(adminData) {
                return $resource('/api/v1/users/submitAdminData/', {
                    save: {method: 'POST'}

                });
            },
            updateUserProfile: function() {
                //console.log(formData);
                return $resource('/api/v1/users/updateUserProfile/', {
                    save: {method: 'POST'}
                });
            },
            logout: function() {
                return $resource('/api/v1/users/userLogout')
            },
            userActivate: function(userId) {
                return $resource('/api/v1/users/useractivate/' + userId)
            },
            getAdminData: function() {
                return $resource('/api/v1/users/getAdminData/')
            },
            getUserData: function(userId) {
                return $resource('/api/v1/users/getuserdata/' + userId)
            },
            changePassword: function() {
                //console.log(formData);
                return $resource('/api/v1/users/changePassword', {
                    save: {method: 'POST'}
                });
            },
            changeStatus: function() {
                //console.log(formData);
                return $resource('/api/v1/users/changeStatus', {
                    save: {method: 'POST'}
                });
            },
            getUserList: function() {
                return $resource('/api/v1/users/userList')
            },
            getUserListArray: function() {
                return $resource('/api/v1/users/getUserListArray')
            },
            deleteUser: function(userId) {
                return $resource('/api/v1/users/deleteUser/' + userId)
            },
            getDashboard: function() {
                return $resource('/api/v1/users/getDashboard')
            },
        }
    }]);

/**
 * Factory for group module request
 * @access private
 * @return json
 * Created by sarvesh
 * @smartData Enterprises (I) Ltd
 * Created Date 12-June-2016
 */
app.factory('groups', ['$resource', function($resource) {
        return{
            getGroupList: function(formData) {
                return $resource('/api/v1/users/getGroupList')
            },
            addGroup: function(groupData) {
                return $resource('/api/v1/users/addGroup', {
                    save: {method: 'POST'}
                });
            },
            deleteGroup: function(id) {
                return $resource('/api/v1/users/deleteGroup/' + id);
            },
            getUserEmail: function(userId) {
                return $resource('/api/v1/users/getUserEmail/' + userId)
            },
        }
    }]);

/**getScheduleList
 * Factory for payment module request
 * @access private
 * @return json
 * Created by sarvesh
 * @smartData Enterprises (I) Ltd
 * Created Date 15-June-2016
 */
app.factory('Payment', ['$resource', function($resource) {
        return{
            getusersTransaction: function() {
                return $resource('/api/v1/users/getusersTransaction');
            },
            deleteTransaction: function(id) {
                return $resource('/api/v1/users/deleteTransaction/' + id);
            },
            getTransactionByRange: function() {
                return $resource('/api/v1/users/getTransactionByRange', {
                    save: {method: 'POST'}
                });
            },
        }
    }]);




/**
 * Factory for Pages module request
 * @access private
 * @return json
 * Created by sarvesh
 * @smartData Enterprises (I) Ltd
 * Created Date 12-June-2016
 */
app.factory('Pages', ['$resource', function($resource) {
        return{
            getPageList: function() {
                return $resource('/api/v1/users/getPageList');
            },
            getPageInfoData: function(pageId) {
                return $resource('/api/v1/users/getPageInfoData/' + pageId);
            },
            updatepageInfo: function() {
                return $resource('/api/v1/users/updatepageInfo/', {
                    save: {method: 'POST'}
                });
            },
        }
    }]);

/**
 * Factory for Feedback module request
 * @access private
 * @return json
 * Created by kadir
 * @smartData Enterprises (I) Ltd
 * Created Date 20-July-2016
 */
app.factory('Feedback', ['$resource', function($resource) {
        return{
            getfeedbackList: function() {
                return $resource('/api/v1/users/getfeedbackList');
            },
            getfeedbackInfo: function(feedbackId) {
                return $resource('/api/v1/users/getfeedbackInfo/' + feedbackId);
            },
            updateFeedback: function() {
                return $resource('/api/v1/users/updateFeedback/', {
                    save: {method: 'POST'}
                });
            },
        }
    }]);

/**
 * Factory for system setting module request
 * @access private
 * @return json
 * Created by sarvesh
 * @smartData Enterprises (I) Ltd
 * Created Date 15-June-2016
 */
app.factory('Setting', ['$resource', function($resource) {
        return{
            getSettingData: function() {
                return $resource('/api/v1/users/getSettingData');
            },
            settingInfoUpdate: function() {
                return $resource('/api/v1/users/settingInfoUpdate', {
                    save: {method: 'POST'}
                });
            },
        }
    }]);

/**
 * Factory for Schedule  module request
 * @access private
 * @return json
 * Created by sarvesh
 * @smartData Enterprises (I) Ltd
 * Created Date 15-June-2016
 */
app.factory('Schedule', ['$resource', function($resource) {
        return{
            getScheduleList: function() {
                return $resource('/api/v1/users/getScheduleList')
            },
        }
    }]);

    /**
     * Factory for Calculation module request
     * @access private
     * @return json
     * Created by sarvesh
     * @smartData Enterprises (I) Ltd
     * Created Date 28-June-2016
     */
    app.factory('Calculation', ['$resource', function($resource) {
            return{
                getcalculationList: function() {
                    return $resource('/api/v1/users/getcalculationList')
                },
                getErrorOddList: function() {
                    return $resource('/api/v1/users/getErrorOddList')
                },
            }
        }]);

/**t
 * Factory for export data to excel format
 * @access private
 * @return json
 * Created by sarvesh
 * @smartData Enterprises (I) Ltd
 * Created Date 20-June-2016
 */
app.factory('Excel', function($window) {
    var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function(s) {
                return $window.btoa(unescape(encodeURIComponent(s)));
            },
            format = function(s, c) {
                return s.replace(/{(\w+)}/g, function(m, p) {
                    return c[p];
                })
            };
    return {
        tableToExcel: function(tableId, worksheetName) {
            var table = $(tableId),
                    ctx = {worksheet: worksheetName, table: table.html()},
            href = uri + base64(format(template, ctx));
            return href;
        }
    };
});
