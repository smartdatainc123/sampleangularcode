/**
 * Controls all other Pages
 * Created By Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 */
app.controller('PageCtrl', function($scope, $rootScope, $routeParams, $filter, ngTableParams, $location, $http, Flash, Pages) {

    $scope.getPageList = function() {
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 20,
            sorting: {
                joined: 'desc'
            }
        }, {
            getData: function($defer, params) {
                var page = params.page();
                var size = params.count();
                var url = '/api/v1/users/getPageList';
                var search = {
                    q: 'angular',
                    page: page,
                    per_page: size
                }
                $http.get(url, {params: search, headers: {'Content-Type': 'application/json'}})
                        .then(function(res) {
                            var filteredData = params.filter() ?
                                    $filter('filter')(res.data.responseData, params.filter()) : res.data.responseData;
                            var orderedData = params.sorting() ?
                                    $filter('orderBy')(filteredData, params.orderBy()) :
                                    filteredData;
                            params.total(res.data.responseData.total_count);
                            $defer.resolve(orderedData);
                        }, function(reason) {
                            $defer.reject();
                        });
            },
        });
    };

    $scope.getPageInfoData = function() {
        // use $.param jQuery function to serialize data from JSON
        var pageId = $routeParams.id;
        Pages.getPageInfoData(pageId).get(function(returndata) {
            if (returndata.status == 1000) {
                var message = returndata.message;
                Flash.create('success', message);
                $scope.pageDetails = returndata.responseData;
            } else {
                var message = returndata.message;
                Flash.create('danger', message);
            }
        });
    };

    $scope.updatepageInfo = function() {
        Pages.updatepageInfo().save($scope.pageDetails, function(returndata) {
            if (returndata.status == 1000) {
                var message = '<strong>Congratulation!</strong> ' + returndata.message;
                Flash.create('success', message);
                $location.path('/contentpages');
            } else {
                var message = returndata.message;
                Flash.create('danger', message);
            }
        });
    };


});

app.controller('feedbackCtrl', function($scope, $rootScope, $routeParams, $filter, ngTableParams, $location, $http, Flash, Feedback) {

    $scope.getfeedbackList = function() {
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 20,
            sorting: {
                createdAt: 'desc'
            }
        }, {
            getData: function($defer, params) {
                var page = params.page();
                var size = params.count();
                var url = '/api/v1/users/getfeedbackList';
                var search = {
                    q: 'angular',
                    page: page,
                    per_page: size
                }
                $http.get(url, {params: search, headers: {'Content-Type': 'application/json'}})
                        .then(function(res) {
                            var filteredData = params.filter() ?
                                    $filter('filter')(res.data.responseData, params.filter()) : res.data.responseData;
                            var orderedData = params.sorting() ?
                                    $filter('orderBy')(filteredData, params.orderBy()) :
                                    filteredData;
                            params.total(res.data.responseData.total_count);
                            $defer.resolve(orderedData);
                        }, function(reason) {
                            $defer.reject();
                        });
            },
        });
    };

    $scope.getfeedbackInfo = function() {
        // use $.param jQuery function to serialize data from JSON
        var feedbackId = $routeParams.id;
        Feedback.getfeedbackInfo(feedbackId).get(function(returndata) {
            if (returndata.status == 1000) {
                var message = returndata.message;
                Flash.create('success', message);
                $scope.feedbackInfo = returndata.responseData;
            } else {
                var message = returndata.message;
                Flash.create('danger', message);
            }
        });
    };

    $scope.updateFeedback = function() {
        console.log("FeedbackData-->", $scope.feedbackInfo);
        Feedback.updateFeedback().save($scope.feedbackInfo, function(returndata) {
            if (returndata.status == 1000) {
                var message = '<strong>Congratulation!</strong> ' + returndata.message;
                Flash.create('success', message);
                $location.path('/feedback');
            } else {
                var message = returndata.message;
                Flash.create('danger', message);
            }
        });
    };


});


/**
 * Controls all other user request
 */
app.controller("UserCtrl", function($scope, ngTableParams, $filter, $rootScope, $http, $location, $routeParams, users, Games, Flash, $route, Excel, $timeout) {
    $scope.checkLogin = function() {
        //console.log('Call checkLogin services');
        users.checkLogin().get(function(returndata) {
            if (returndata.status == 1000) {
                var message = 'Successfully Login';
                Flash.create('success', message);
                $location.path('/dashboard');
            } else {
                $location.path('/pladmin');
                $scope.PostDataResponse = '';
                $scope.ResponseDetails = returndata.message;
            }
        });
    };

    $scope.exportToExcel = function(tableId) { // ex: '#my-table'
        var exportHref = Excel.tableToExcel(tableId, 'sheet name');
        $timeout(function() {
            location.href = exportHref;
        }, 100); // trigger download
    }

    $scope.redirectToAdduser = function() {
        $location.path('addUser');
    }

    $scope.registerUser = function(formData) {
        //console.log('post data');
        users.signup().save($scope.formData, function(returndata) {
            if (returndata.status == 1000) {
                //$scope.PostDataResponse = returndata.message;
                $scope.ResponseRegDetails = '';
                var message = '<strong>Congratulation!</strong> ' + returndata.message;
                Flash.create('success', message);
            } else if (returndata.status == 1001) {
                $scope.ResponseRegDetails = '';
                var message = returndata.message;
                Flash.create('danger', message);
            } else {
                $scope.ResponseRegDetails = returndata.message;
            }
        });
    };

    $scope.addUserProfile = function(formData) {
        //console.log(formData);
        users.addUserProfile().save(formData, function(returndata) {
            if (returndata.status == 1000) {
                var message = '<strong>Congratulation!</strong> ' + returndata.message;
                Flash.create('success', message);
                $location.path('/userlist');
            } else if (returndata.status == 1001) {
                var message = returndata.message;
                Flash.create('danger', message);
            } else {
                $scope.ResponseRegDetails = returndata.message;
            }
        });
    };

    $scope.submitAdminData = function(adminData) {
        //console.log(adminData);
        users.submitAdminData().save($scope.adminData, function(returndata) {
            if (returndata.status == 1000) {
                var message = '<strong>Congratulation!</strong> ' + returndata.message;
                Flash.create('success', message);
            } else {
                $scope.ResponseDetails = returndata.message;
            }
        });
    };

    $scope.updateUserProfile = function(userData) {
        users.updateUserProfile().save($scope.userData, function(returndata) {
            if (returndata.status == 1000) {
                var message = '<strong>Congratulation!</strong> ' + returndata.message;
                Flash.create('success', message);
                $location.path('/userlist');
            } else {
                $scope.ResponseDetails = returndata.message;
            }
        });
    };

    $scope.ForgotPassword = function(formData) {
        users.ForgotPass().save($scope.formData, function(returndata) {
            if (returndata.status == 1000) {
                var message = '<strong>Congratulation!</strong> ' + returndata.message;
                Flash.create('success', message);
            } else {
                var message = returndata.message;
                Flash.create('danger', message);
            }
        });
    };

    $scope.SubmitForgotPass = function(formData) {
        var userId = $routeParams.id;
        //console.log('forgot data- ' + userId);
        users.SubmitForgotPass(userId).save($scope.formData, function(returndata) {
            if (returndata.status == 1000) {
                //$scope.PostDataResponse = returndata.message;
                $scope.ResponseDetails = '';
                var message = '<strong>Congratulation!</strong> ' + returndata.message;
                Flash.create('success', message);
            } else {
                $scope.ResponseDetails = returndata.message;
            }
        }
        );
    };

    $scope.adminlogin = function(formData) {
        //console.log(formData);
        // use $.param jQuery function to serialize data from JSON
        users.adminlogin().save($scope.formData, function(returndata) {
            if (returndata.status == 1000) {
                //$scope.PostDataResponse = returndata.message;
                $scope.ResponseDetails = '';
                var message = '<strong>Congratulation!</strong> ' + returndata.message;
                Flash.create('success', message);
                $location.path('/dashboard');
            } else {
                $scope.ResponseDetails = returndata.message;
            }
        });
    };

    $scope.useractivate = function() {
        // use $.param jQuery function to serialize data from JSON
        var userId = $routeParams.id;
        //console.log('User Id- ' + userId);
        users.userActivate(userId).get(function(returndata) {
            if (returndata.status == 1000) {
                //$scope.PostDataResponse = returndata.message;
                $scope.ResponseDetails = '';
                var message = '<strong>Congratulation!</strong> ' + returndata.message;
                Flash.create('success', message);
            } else {
                $scope.ResponseDetails = returndata.message;
            }
        });
    };

    $scope.getAdminData = function() {
        //console.log('Get user data');
        users.getAdminData().get(function(returndata) {
            if (returndata.status == 1000) {
                $scope.ResponseDetails = '';
                $rootScope.adminData = returndata.message;
            } else {
                $scope.ResponseDetails = returndata.message;
            }
        });
        // use $.param jQuery function to serialize data from JSON
    };

    $scope.getUserData = function() {
        var userId = $routeParams.id;
        //console.log(userId);
        users.getUserData(userId).get(function(returndata) {
            if (returndata.status == 1000) {
                $rootScope.userData = returndata.data;
            } else {
                $scope.ResponseDetails = returndata.message;
            }
        });
        // use $.param jQuery function to serialize data from JSON
    };

    $scope.sportsArray = function() {
        Games.ActiveSportsArray().get(function(returndata) {
            if (returndata.status == 1000) {
                //console.log(returndata.gameData);
                $scope.sportsList = returndata.data.sportsList;
            } else {
                var message = returndata.message;
                Flash.create('danger', message);
            }
        });
    };

    $scope.userlist = function() {
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 20,
            sorting: {
                joined: 'desc'
            }
        }, {
            getData: function($defer, params) {
                var page = params.page();
                var size = params.count();
                var url = '/api/v1/users/userList';
                var search = {
                    q: 'angular',
                    page: page,
                    per_page: size,
                }
                $http.get(url, {params: search, headers: {'Content-Type': 'application/json'}})
                        .then(function(res) {
                            $scope.activeSports = res.data.data.activeSports;
                            var filteredData = params.filter() ?
                                    $filter('filter')(res.data.data.userList, params.filter()) :
                                    res.data.data.userList;
                            var orderedData = params.sorting() ?
                                    $filter('orderBy')(filteredData, params.orderBy()) :
                                    filteredData;
                            params.total(res.data.data.total_count);
                            $defer.resolve(orderedData);
                        }, function(reason) {
                            $defer.reject();
                        });
            },
        });
    };

    $scope.searchUserByRange = function() {
        var range = angular.element($('#userDateRange')).val();
        var sportId = angular.element($('#sportsId')).val();
        console.log("user date Range-->", range);

        $http({
            withCredentials: false,
            method: 'post',
            data: "dateRange=" + range + "&sportId=" + sportId,
            url: '/api/v1/users/getUserbyRange',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
                .success(function(data, status, headers, config) {
                    if (data.status == 1000) {
                        var message = data.message;
                        Flash.create('success', message);
                        $rootScope.userStores = data.userResult;
                        $location.path('userSearchResult');
                    } else {
                        var message = data.message;
                        Flash.create('danger', message);
                        $rootScope.userStores = [];
                        $location.path('userSearchResult');
                    }
                })
                .error(function(data, status, header, config) {
                    var message = 'Something Went Wrong! please try again. Thank You';
                    Flash.create('danger', message);
                    $location.path('userSearchResult');
                });
    };

    $scope.changePassword = function(formData) {
        //console.log('Chaneg Password');
        users.changePassword().save($scope.formData, function(returndata) {
            if (returndata.status == 1000) {
                //$scope.PostDataResponse = returndata.message;
                $scope.ResponseDetails = '';
                var message = '<strong>Congratulation!</strong> ' + returndata.message;
                Flash.create('success', message);
            } else {
                var message = returndata.message;
                Flash.create('danger', message);
            }
        });
    };

    $scope.deleteUser = function(id) {
        //console.log(id);
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this user? You won't be able to revert this!",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "Yes, delete it!",
            confirmButtonColor: "#ec6c62",
            preConfirm: function() {
                return new Promise(function(resolve) {
                    swal.enableLoading();
                    users.deleteUser(id).get(function(returndata) {
                        if (returndata.status == 1000) {
                            swal("Deleted!", "User account has been deleted.", "success");
                            $route.reload();
                        } else {
                            swal("Oops", "We couldn't connect to the server!", "error");
                        }
                    });
                });
            },
        });
    };

    $scope.changestatus = function(status, userid) {
        //console.log('Changes status '+status+' and '+userid);
        var userdata = {
            status: status,
            userid: userid
        };
        users.changeStatus().save(userdata, function(returndata) {
            if (returndata.status == 1000) {
                if (status == 1) {
                    swal("Inactive", "User has been inactive.", "success");
                } else {
                    swal("Active", "User has been activated.", "success");
                }
                $route.reload();
            } else {
                swal("Oops", "We couldn't connect to the server!", "error");
            }
        });
    };

    $scope.getDashboard = function() {
        users.getDashboard().get(function(returndata) {
            if (returndata.status == 1000) {
                $rootScope.dashboard = returndata.dashboard;
            } else {
                $rootScope.dashboard = '';
            }
        });
    };
});


/**
 * Controls all group request
 */
app.controller("GroupCtrl", function($scope, ngTableParams, $filter, $rootScope, $http, $location, $routeParams, Flash, $route, groups, users) {
    $scope.getGroupList = function() {
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 20,
            sorting: {
                createdAt: 'desc'
            }
        }, {
            getData: function($defer, params) {
                var page = params.page();
                var size = params.count();
                var url = '/api/v1/users/getGroupList';
                var search = {
                    q: params.sortCase,
                    page: page,
                    per_page: size
                }
                $http.get(url, {params: search, headers: {'Content-Type': 'application/json'}})
                        .then(function(res) {
                            var filteredData = params.filter() ?
                                    $filter('filter')(res.data.data.groupList, params.filter()) :
                                    res.data.data.groupList;
                            var orderedData = params.sorting() ?
                                    $filter('orderBy')(filteredData, params.orderBy()) :
                                    filteredData;
                            params.total(res.data.data.total_count);
                            $defer.resolve(orderedData);
                        }, function(reason) {
                            $defer.reject();
                        });
            },
        });
    };

    $scope.userlistArray = function() {
        //console.log('Get user list');
        users.getUserListArray().get(function(returndata) {
            if (returndata.status == 1000) {
                $scope.userList = returndata.data;
            } else {
                $scope.ResponseDetails = returndata.message;
            }
        });
        // use $.param jQuery function to serialize data from JSON
    };


    $scope.addUserGroup = function(groupData) {
        //console.log(angular.element($('#email')).val());
        var formData = {
            email: angular.element($('#email')).val(),
            userId: groupData.userId,
            groupname: groupData.groupname
        }
        //console.log(formData);
        groups.addGroup().save(formData, function(returndata) {
            if (returndata.status == 1000) {
                var message = '<strong>Congratulation!</strong> ' + returndata.message;
                Flash.create('success', message);
                $location.path('/grouplist');
            } else {
                var message = returndata.message;
                Flash.create('danger', message);
            }
        });
    };

    $scope.deleteGroup = function(id) {

        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this group? You won't be able to revert this!",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "Yes, delete it!",
            confirmButtonColor: "#ec6c62",
            preConfirm: function() {
                return new Promise(function(resolve) {
                    swal.enableLoading();
                    groups.deleteGroup(id).get(function(returndata) {
                        if (returndata.status == 1000) {
                            swal("Deleted!", "Group has been deleted.", "success");
                            $route.reload();
                        } else {
                            swal("Oops", "We couldn't connect to the server!", "error");
                        }
                    });
                });
            },
        });
    };

    $scope.redirectToaddGroup = function() {
        $location.path('addGroup');
    }

    $scope.changeItem = function(userId) {
        //  console.log(userId);
        groups.getUserEmail(userId).get(function(returndata) {
            if (returndata.status == 1000) {
                $scope.email = returndata.groupData.email;
                console.log($scope.email);
            } else {
                $scope.ResponseDetails = returndata.message;
            }
        });
    };
});

/**
 * Controls all payment module request
 */
app.controller("PaymentCtrl", function($scope, $route, ngTableParams, $filter, $rootScope, $http, $location, $routeParams, Payment, Flash) {
    $scope.usersTransaction = function() {
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 20,
            sorting: {
                created: 'desc'
            }
        }, {
            getData: function($defer, params) {
                var page = params.page();
                var size = params.count();
                var url = '/api/v1/users/getusersTransaction';
                var search = {
                    q: 'angular',
                    page: page,
                    per_page: size
                }
                $http.get(url, {params: search, headers: {'Content-Type': 'application/json'}})
                        .then(function(res) {
                            var filteredData = params.filter() ?
                                    $filter('filter')(res.data.data.paymentRecord, params.filter()) :
                                    res.data.data.paymentRecord;
                            var orderedData = params.sorting() ?
                                    $filter('orderBy')(filteredData, params.orderBy()) :
                                    filteredData;
                            params.total(res.data.data.total_count);
                            $defer.resolve(orderedData);
                        }, function(reason) {
                            $defer.reject();
                        });
            },
        });
    };

    $scope.deleteTransaction = function(id) {
        //console.log(id);
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this transaction history? You won't be able to revert this!",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "Yes, delete it!",
            confirmButtonColor: "#ec6c62",
            preConfirm: function() {
                return new Promise(function(resolve) {
                    swal.enableLoading();
                    Payment.deleteTransaction(id).get(function(returndata) {
                        if (returndata.status == 1000) {
                            swal("Deleted!", "Transaction history has been deleted.", "success");
                            $route.reload();
                        } else {
                            swal("Oops", "We couldn't connect to the server!", "error");
                        }
                    });
                });
            },
        });
    };

    $scope.searchTransactionByRange = function() {
        var range = angular.element($('#paymentDateRange')).val();
        console.log("pick date Range-->", range);
        var gameInfo = {
            dateRange: range
        };
        $http({
            withCredentials: false,
            method: 'post',
            data: "dateRange=" + range,
            url: '/api/v1/users/getTransactionByRange',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
                .success(function(data, status, headers, config) {
                    if (data.status == 1000) {
                        $rootScope.transactionRecord = data.transactionResult;
                        var message = data.message;
                        Flash.create('success', message);

                        $location.path('usersTransactionSearchResult');
                    } else {
                        var message = data.message;
                        Flash.create('danger', message);
                        $rootScope.transactionRecord = [];
                        $location.path('usersTransactionSearchResult');
                    }
                })
                .error(function(data, status, header, config) {
                    var message = 'Something Went Wrong! please try again. Thank You';
                    Flash.create('danger', message);
                    $location.path('usersTransactionSearchResult');
                });
    };
});

/**
 * Controls all picks module request
 */
app.controller("PickCtrl", function($scope, $route, ngTableParams, $filter, $rootScope, $http, $location, $routeParams, Games, Picks, Flash) {

    $scope.sportsArray = function() {
        Games.ActiveSportsArray().get(function(returndata) {
            if (returndata.status == 1000) {
                //console.log(returndata.gameData);
                $scope.sportsList = returndata.data.sportsList;
            } else {
                var message = returndata.message;
                Flash.create('danger', message);
            }
        });
    };

    $scope.getPicksList = function(sportId) {
        console.log("getPicksList Id==>", sportId);
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 15,
            filter: {},
            sorting: {
                gameStartTime: 'desc'
            }
        }, {
            getData: function($defer, params) {
                var page = params.page();
                var size = params.count();
                var url = '/api/v1/users/getPicksList';
                var search = {
                    q: 'angular',
                    page: page,
                    per_page: size,
                    sportId: sportId,
                }
                $http.get(url, {params: search, headers: {'Content-Type': 'application/json'}})
                        .then(function(res) {
                            var filteredData = params.filter() ?
                                    $filter('filter')(res.data.data.pickList, params.filter()) :
                                    res.data.data.pickList;
                            var orderedData = params.sorting() ?
                                    $filter('orderBy')(filteredData, params.orderBy()) :
                                    filteredData;
                            params.total(res.data.data.total_count);
                            $defer.resolve(orderedData);
                        }, function(reason) {
                            $defer.reject();
                        });
            },
        });
    };

    $scope.searchPickByRange = function() {
        var range = angular.element($('#pickDateRange')).val();
        var sportId = angular.element($('#sportsId')).val();
        console.log("pick date Range-->", range);

        $http({
            withCredentials: false,
            method: 'post',
            data: "dateRange=" + range + "&sportId=" + sportId,
            url: '/api/v1/users/getPicksbyRange',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
                .success(function(data, status, headers, config) {
                    if (data.status == 1000) {
                        $rootScope.pickRecord = data.pickResult;
                        var message = data.message;
                        Flash.create('success', message);

                        $location.path('pickSearchResult');
                    } else {
                        var message = data.message;
                        Flash.create('danger', message);
                        $rootScope.pickRecord = [];
                        $location.path('pickSearchResult');
                    }
                })
                .error(function(data, status, header, config) {
                    var message = 'Something Went Wrong! please try again. Thank You';
                    Flash.create('danger', message);
                    $location.path('pickSearchResult');
                });
    };
});

/**
 * Controls all games module request
 */
app.controller("GameCtrl", function($scope, $route, ngTableParams, $filter, $rootScope, $http, $location, $routeParams, Games, Flash) {

    $scope.getSportsList = function() {
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 20,
            filter: {},
            sorting: {
                createdAt: 'desc'
            }
        }, {
            getData: function($defer, params) {
                var page = params.page();
                var size = params.count();
                var url = '/api/v1/users/getSportsList';
                var search = {
                    q: 'angular',
                    page: page,
                    per_page: size
                }
                $http.get(url, {params: search, headers: {'Content-Type': 'application/json'}})
                        .then(function(res) {
                            var filteredData = params.filter() ?
                                    $filter('filter')(res.data.data.sportsList, params.filter()) :
                                    res.data.data.sportsList;
                            var orderedData = params.sorting() ?
                                    $filter('orderBy')(filteredData, params.orderBy()) :
                                    filteredData;
                            params.total(res.data.data.total_count);
                            $defer.resolve(orderedData);
                        }, function(reason) {
                            $defer.reject();
                        });
            },
        });
    };

    $scope.sportsArray = function() {
        Games.ActiveSportsArray().get(function(returndata) {
            if (returndata.status == 1000) {
                //console.log(returndata.gameData);
                $scope.sportsList = returndata.data.sportsList;
            } else {
                var message = returndata.message;
                Flash.create('danger', message);
            }
        });
    }
    
    $scope.allSportsList = function() {
        Games.allSportsList().get(function(returndata) {
            if (returndata.status == 1000) {
                //console.log(returndata.gameData);
                $scope.sportsList = returndata.data.sportsList;
            } else {
                var message = returndata.message;
                Flash.create('danger', message);
            }
        });
    }

    $scope.getGameList = function() {
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 20,
            filter: {},
            sorting: {
                createdAt: 'desc'
            }
        }, {
            getData: function($defer, params) {
                var page = params.page();
                var size = params.count();
                var url = '/api/v1/users/getGameList';
                var search = {
                    q: 'angular',
                    page: page,
                    per_page: size
                }
                $http.get(url, {params: search, headers: {'Content-Type': 'application/json'}})
                        .then(function(res) {
                            var filteredData = params.filter() ?
                                    $filter('filter')(res.data.data.gameList, params.filter()) :
                                    res.data.data.gameList;
                            var orderedData = params.sorting() ?
                                    $filter('orderBy')(filteredData, params.orderBy()) :
                                    filteredData;
                            params.total(res.data.data.total_count);
                            $defer.resolve(orderedData);
                        }, function(reason) {
                            $defer.reject();
                        });
            },
        });
    };

    $scope.searchGamesByRange = function() {
        var range = angular.element($('#gameDateRange')).val();
        var sportId = angular.element($('#sportsId')).val();
        console.log("game date Range-->", range);

        $http({
            withCredentials: false,
            method: 'post',
            data: "dateRange=" + range + "&sportId=" + sportId,
            url: '/api/v1/users/getGamesbyRange',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
                .success(function(data, status, headers, config) {
                    if (data.status == 1000) {
                        var message = data.message;
                        Flash.create('success', message);
                        $rootScope.gameStores = data.gameResult.gameList;
                        $location.path('gameSearchResult');
                    } else {
                        var message = data.message;
                        Flash.create('danger', message);
                        $rootScope.gameStores = [];
                        $location.path('gameSearchResult');
                    }
                })
                .error(function(data, status, header, config) {
                    var message = 'Something Went Wrong! please try again. Thank You';
                    Flash.create('danger', message);
                    $location.path('gameSearchResult');
                });
    };


    $scope.getAdminGameData = function() {
        var gameId = $routeParams.id;
        Games.getAdminGameData(gameId).get(function(returndata) {
            if (returndata.status == 1000) {
                //console.log(returndata.gameData);
                $scope.gameData = returndata.gameData;
            } else {
                $scope.ResponseDetails = returndata.message;
            }
        });
        // use $.param jQuery function to serialize data from JSON
    };
    $scope.updateGameInfo = function() {
        Games.updateGameInfo().save($scope.gameData, function(returndata) {
            if (returndata.status == 1000) {
                var message = '<strong>Congratulation!</strong> ' + returndata.message;
                Flash.create('success', message);
                $location.path('/gamelist');
            } else {
                var message = returndata.message;
                Flash.create('danger', message);
            }
        });
    };
    $scope.activeSports = function(sportData) {
        console.log(sportData);
        Games.activeSports().save($scope.sportData, function(returndata) {
            if (returndata.status == 1000) {
                var message = '<strong>Congratulation!</strong> ' + returndata.message;
                Flash.create('success', message);
                $location.path('/sportslist');
            } else {
                var message = returndata.message;
                Flash.create('danger', message);
            }
        });
    };

    $scope.deactiveSports = function(sportData) {
        console.log(sportData);
        Games.deactiveSports().save($scope.sportData, function(returndata) {
            if (returndata.status == 1000) {
                var message = '<strong>Congratulation!</strong> ' + returndata.message;
                Flash.create('success', message);
                $location.path('/sportslist');
            } else {
                var message = returndata.message;
                Flash.create('danger', message);
            }
        });
    };  


    $scope.pullGameData = function() {
        Games.pullGameData().get(function(returndata) {
            if (returndata.status == 1000) {
                var message = '<strong>Congratulation!</strong> ' + returndata.message;
                Flash.create('success', message);
            } else {
                var message = returndata.message;
                Flash.create('danger', message);
            }
        });
    }

    $scope.pullGameResult = function() {
        Games.pullGameResult().get(function(returndata) {
            if (returndata.status == 1000) {
                var message = '<strong>Congratulation!</strong> ' + returndata.message;
                Flash.create('success', message);
            } else {
                var message = returndata.message;
                Flash.create('danger', message);
            }
        });
    }

    $scope.pullJsonOddsFrmAPi = function(sourceID) {
        //console.log(sourceID);
        if (sourceID) {
            Games.pullJsonOddsFrmAPi().save(sourceID, function(returndata) {
                if (returndata.status == 1000) {
                    var message = '<strong>Congratulation!</strong> ' + returndata.message;
                    Flash.create('success', message);
                    $route.reload();
                } else {
                    var message = returndata.message;
                    Flash.create('danger', message);
                }
            });
        } else {
            var message = 'Please select source id to be pulled odds from API';
            Flash.create('danger', message);
        }

    }

    $scope.redirectToactiveSports = function() {
        $location.path('activeSports');
    }

    $scope.getGameMoneyLineList = function() {
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 20,
            filter: {},
            sorting: {
                createdAt: 'desc'
            }
        }, {
            getData: function($defer, params) {
                var page = params.page();
                var size = params.count();
                var url = '/api/v1/users/getGameOddsList';
                var search = {
                    q: 'angular',
                    page: page,
                    per_page: size
                }
                $http.get(url, {params: search, headers: {'Content-Type': 'application/json'}})
                        .then(function(res) {
                            var filteredData = params.filter() ?
                                    $filter('filter')(res.data.data.oddsList, params.filter()) :
                                    res.data.data.oddsList;
                            var orderedData = params.sorting() ?
                                    $filter('orderBy')(filteredData, params.orderBy()) :
                                    filteredData;
                            params.total(res.data.data.total_count);
                            $defer.resolve(orderedData);
                        }, function(reason) {
                            $defer.reject();
                        });
            },
        });
    };
    $scope.getGameSpreadList = function() {
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 20,
            filter: {},
            sorting: {
                createdAt: 'desc'
            }
        }, {
            getData: function($defer, params) {
                var page = params.page();
                var size = params.count();
                var url = '/api/v1/users/getGameOddsList';
                var search = {
                    q: 'angular',
                    page: page,
                    per_page: size
                }
                $http.get(url, {params: search, headers: {'Content-Type': 'application/json'}})
                        .then(function(res) {
                            var filteredData = params.filter() ?
                                    $filter('filter')(res.data.data.oddsList, params.filter()) :
                                    res.data.data.oddsList;
                            var orderedData = params.sorting() ?
                                    $filter('orderBy')(filteredData, params.orderBy()) :
                                    filteredData;
                            params.total(res.data.data.total_count);
                            $defer.resolve(orderedData);
                        }, function(reason) {
                            $defer.reject();
                        });
            },
        });
    };
    $scope.redirectToPage = function(page) {
        $location.path(page);
    }

    $scope.editGameValue = function(id, type) {
//console.log("eventId-" + id);
        var url = '/api/v1/users/getGameInfo/';
        var gameInput = {
            id: id,
            type: type
        }
        $http.post(url, {params: gameInput, headers: {'Content-Type': 'application/json'}})
                .then(function(res) {
                    //console.log(res);
                    if (res.data.status == 1000) {
                        // console.log('if section');
                        $scope.gameInfo = res.data.gameInfo;
                        $scope.showTheForm = true;
                    } else {
                        // console.log('else section');
                        var message = res.data.message;
                        Flash.create('danger', message);
                        $scope.gameInfo = '';
                        $scope.showTheForm = false;
                    }

                });
    }

    $scope.updateGameOdds = function(gameInfo, type) {
        gameInfo.type = type;
        //console.log(gameInfo);
        Games.updateGameOdds().save($scope.gameInfo, function(returndata) {
            if (returndata.status == 1000) {
                var message = '<strong>Congratulation!</strong> ' + returndata.message;
                Flash.create('success', message);
                if (type == 'moneyLine') {
                    $location.path('/gameMoneyLineOdds');
                    $scope.showTheForm = false;
                } else {
                    $location.path('/gamePointsSpreadOdds');
                    $scope.showTheForm = false;
                }
            } else {
                var message = returndata.message;
                Flash.create('danger', message);
            }
        });
    };

    $scope.updateGameOddsByEventId = function(sportName, eventId) {
        //console.log(sportName + '-' + eventId)

        //console.log(gameInfo);
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to update this Game with default odds? If you update this game with default odds then you won't be able to revert current change!",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "Yes, update it!",
            confirmButtonColor: "#ec6c62",
            preConfirm: function() {
                return new Promise(function(resolve) {
                    swal.enableLoading();
                    var gameInfo = {
                        sportName: sportName,
                        eventId: eventId
                    };
                    // console.log(gameInfo);
                    Games.updateGameOddsByEventId().save(gameInfo, function(returndata) {
                        if (returndata.status == 1000) {
                            swal("Updated!", returndata.message, "success");
                            $route.reload();
                        } else {
                            swal("Oops", returndata.message, "error");
                        }
                    });
                });
            },
        });
    };

    $scope.cancelGameOdds = function() {
        $scope.showTheForm = false;
    };

    $scope.searchGamesMoneyLineByRange = function() {
        var range = angular.element($('#dateRange')).val();
        console.log(range);
        var gameInfo = {
            dateRange: range
        };

        $http({
            withCredentials: false,
            method: 'post',
            data: "dateRange=" + range,
            url: '/api/v1/users/searchGamesMoneyLineByRange',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
                .success(function(data, status, headers, config) {
                    if (data.status == 1000) {
                        var message = data.message;
                        Flash.create('success', message);
                        $rootScope.gamesMoneyLine = data.gameMoneyLineResult;
                        $location.path('gameMonelyLineSearchResult');
                    } else {
                        var message = data.message;
                        Flash.create('danger', message);
                        $rootScope.gamesMoneyLine = [];
                        $location.path('gameMonelyLineSearchResult');
                    }
                })
                .error(function(data, status, header, config) {
                    var message = 'Something Went Wrong! please try again. Thank You';
                    Flash.create('danger', message);
                    $location.path('gameMonelyLineSearchResult');
                });
    };

    $scope.searchGamesPointSpreadByRange = function() {
        var range = angular.element($('#dateRange')).val();
        console.log(range);
        var gameInfo = {
            dateRange: range
        };

        $http({
            withCredentials: false,
            method: 'post',
            data: "dateRange=" + range,
            url: '/api/v1/users/searchGamesPointSpreadByRange',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
                .success(function(data, status, headers, config) {
                    if (data.status == 1000) {
                        var message = data.message;
                        Flash.create('success', message);
                        $rootScope.gamePointSpreadResult = data.gamePointSpreadResult;
                        $location.path('gamePointSpreadSearchResult');
                    } else {
                        var message = data.message;
                        Flash.create('danger', message);
                        $rootScope.gamePointSpreadResult = [];
                        $location.path('gamePointSpreadSearchResult');
                    }
                })
                .error(function(data, status, header, config) {
                    var message = 'Something Went Wrong! please try again. Thank You';
                    Flash.create('danger', message);
                    $location.path('gamePointSpreadSearchResult');
                });
    };

    $scope.deleteGame = function(id) {
        //console.log('id', id);
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this Game? If you delete this game then all picks related to the games will be delete and you won't be able to revert this!",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "Yes, delete it!",
            confirmButtonColor: "#ec6c62",
            preConfirm: function() {
                return new Promise(function(resolve) {
                    swal.enableLoading();
                    Games.deleteGame(id).get(function(returndata) {
                        //console.log("returndata-->", returndata);
                        if (returndata.status == 1000) {
                            swal("Deleted!", "Game and it's related records has been deleted.", "success");
                            $route.reload();
                        } else if (returndata.status == 1001) {

                            swal("Deleted!", "Game and it's related records has been deleted.", "success");
                            $route.reload();
                        } else {
                            swal("Oops", "Somethings went wrong while deleting game so please try again.", "error");
                        }
                    });
                });
            },
        });
    };
    $scope.deleteOdds = function(id) {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this Game? and you won't be able to revert this!",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "Yes, delete it!",
            confirmButtonColor: "#ec6c62",
            preConfirm: function() {
                return new Promise(function(resolve) {
                    swal.enableLoading();
                    Games.deleteOdds(id).get(function(returndata) {
                        if (returndata.status == 1000) {
                            swal("Deleted!", "Game has been deleted.", "success");
                            $route.reload();
                        } else {
                            swal("Oops", "Somethings went wrong while deleting game so please try again.", "error");
                        }
                    });
                });
            },
        });
    }
    ;
});
/**
 * Controls all system setting module request
 */
app.controller("SettingCtrl", function($scope, $route, $rootScope, $http, $location, $routeParams, Setting, Flash) {
    $scope.getSettingData = function() {
        Setting.getSettingData().get(function(returndata) {
            if (returndata.status == 1000) {
                $scope.settingData = returndata.settingData;
            } else {
                $scope.ResponseDetails = returndata.message;
            }
        });
    };
    $scope.settingInfoUpdate = function() {
        Setting.settingInfoUpdate().save($scope.settingData, function(returndata) {
            if (returndata.status == 1000) {
                $scope.ResponseRegDetails = '';
                var message = '<strong>Congratulation!</strong> ' + returndata.message;
                Flash.create('success', message);
            } else if (returndata.status == 1002) {
                $scope.ResponseRegDetails = returndata.message;
            } else {
                $scope.ResponseRegDetails = '';
                var message = returndata.message;
                Flash.create('danger', message);
            }
        });
    };
});
/**
 * Controls logout request
 */
app.controller("LogoutCtrl", function($scope, $rootScope, $http, $location, $routeParams, users, Flash) {
    $scope.logout = function() {
        // use $.param jQuery function to serialize data from JSON
        //console.log('Logout function');
        users.logout().get(function(returndata) {
            if (returndata.status == 1000) {
                var message = 'You have logout successfully.';
                Flash.create('success', message);
                $rootScope.isLoggedIn = false;
                $location.path('/pladmin');
                //window.location.reload();
            }
        });
    };
});
/**
 * Controls all menu action
 */
app.controller("MenuCtrl", function($scope, $location) {
    $scope.menuClass = function(page) {
        var current = $location.path().substring(1);
        return page === current ? "active" : "";
    };
    $scope.redirectPreviosPage = function(page) {
        $location.path(page);
    };
});
/**
 * Controls all menu toggle action
 */
app.controller("ToggleCtrl", function($scope, $rootScope) {
    $rootScope.class = "";
    $rootScope.class1 = "";
    $scope.changeClass = function() {
        if ($scope.class === "display")
            $rootScope.class = "";
        else
            $rootScope.class = "display";
    };
    $scope.changeClass1 = function() {
        if ($scope.class1 === "menu-min")
            $rootScope.class1 = "";
        else
            $rootScope.class1 = "menu-min";
    };
});
/**
 * Google map api
 */
app.controller('GmapCtrl', function($scope) {
    $scope.gPlace;
});

app.controller('scheduleCtrl', function($scope, $rootScope, $routeParams, $filter, ngTableParams, $location, $http, Flash, Schedule) {

    $scope.getScheduleList = function() {
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 20,
            sorting: {
                createdAt: 'desc'
            }
        }, {
            getData: function($defer, params) {
                var page = params.page();
                var size = params.count();
                var url = '/api/v1/users/getScheduleList';
                var search = {
                    q: 'angular',
                    page: page,
                    per_page: size
                }
                $http.get(url, {params: search, headers: {'Content-Type': 'application/json'}})
                        .then(function(res) {
                            //console.log(res);
                            var filteredData = params.filter() ?
                                    $filter('filter')(res.data.responseData.scheduleData, params.filter()) : res.data.responseData.scheduleData;
                            var orderedData = params.sorting() ?
                                    $filter('orderBy')(filteredData, params.orderBy()) :
                                    filteredData;
                            params.total(res.data.responseData.total_count);
                            $defer.resolve(orderedData);
                        }, function(reason) {
                            $defer.reject();
                        });
            },
        });
    };

});

app.controller('calculationsCtrl', function($scope, $rootScope, $routeParams, $filter, ngTableParams, $location, $http, Flash, Calculation) {

    $scope.getcalculationList = function() {
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 20,
            sorting: {
                createdAt: 'desc'
            }
        }, {
            getData: function($defer, params) {
                var page = params.page();
                var size = params.count();
                var url = '/api/v1/users/getCalculationList';
                var search = {
                    q: 'angular',
                    page: page,
                    per_page: size
                }
                $http.get(url, {params: search, headers: {'Content-Type': 'application/json'}})
                        .then(function(res) {
                            console.log(res);
                            var filteredData = params.filter() ?
                                    $filter('filter')(res.data.responseData.calculationData, params.filter()) : res.data.responseData.calculationData;
                            var orderedData = params.sorting() ?
                                    $filter('orderBy')(filteredData, params.orderBy()) :
                                    filteredData;
                            params.total(res.data.responseData.total_count);
                            $defer.resolve(orderedData);
                        }, function(reason) {
                            $defer.reject();
                        });
            },
        });
    };

    $scope.getErrorOddList = function() {
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 20,
            sorting: {
                createdAt: 'desc'
            }
        }, {
            getData: function($defer, params) {
                var page = params.page();
                var size = params.count();
                var url = '/api/v1/users/getErrorOddList';
                var search = {
                    q: 'angular',
                    page: page,
                    per_page: size
                }
                $http.get(url, {params: search, headers: {'Content-Type': 'application/json'}})
                        .then(function(res) {
                            console.log(res);
                            var filteredData = params.filter() ?
                                    $filter('filter')(res.data.responseData.errorOddsData, params.filter()) : res.data.responseData.errorOddsData;
                            var orderedData = params.sorting() ?
                                    $filter('orderBy')(filteredData, params.orderBy()) :
                                    filteredData;
                            params.total(res.data.responseData.total_count);
                            $defer.resolve(orderedData);
                        }, function(reason) {
                            $defer.reject();
                        });
            },
        });
    };
    $scope.redirectToPage = function(page) {
        $location.path(page);
    }
});
