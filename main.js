/**
 * AngularJS Tutorial 1
 * @author Sarvesh Dwivedi <sarveshd@smartdatainc.net>
 */
/**
 * Main AngularJS Web Application
 */
var app = angular.module('prodiguLeagueApp', ['ngRoute', 'ngTable', 'ngResource', 'ngFileUpload', 'ngFlash',
    "ngSanitize", 'ngAnimate', 'ngTouch']);

/**
 * Configure the Routes
 */

app.factory('httpInterceptor', function($q, $rootScope, $location, Flash) {
    return {
        request: function(config) {
            $.blockUI();
            return config;
        },
        requestError: function(response) {
            $.unblockUI();
            return response
        },
        response: function(response) {
            $.unblockUI();
            return response
        },
        responseError: function(response) {
            $.unblockUI();
            return response
        }
    };
});
//app.constant('angularMomentConfig', {
//    timezone: 'America/Chicago' // e.g. 'Europe/London'
//});
//moment.tz.setDefault("America/Chicago");
app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        // ****************** Provide Support to IE **********************
        $httpProvider.defaults.cache = false;
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }
        // disable IE ajax request caching
        $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
        // **************************** End ******************************
        $httpProvider.interceptors.push('httpInterceptor');
        $routeProvider
                // Home
                .when("/", {
                    templateUrl: "templates/admin/elements/home.html",
                    controller: "UserCtrl"
                })
                .when("/pladmin", {
                    templateUrl: "templates/admin/elements/login.html",
                    controller: "UserCtrl"
                })
                .when("/dashboard", {
                    templateUrl: "templates/admin/elements/dashboard.html",
                    controller: "UserCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                .when("/profile", {
                    templateUrl: "templates/admin/elements/profile.html",
                    controller: "UserCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                .when("/editprofile", {
                    templateUrl: "templates/admin/elements/editadminprofile.html",
                    controller: "UserCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                .when("/edituserprofile/:id", {
                    templateUrl: "templates/admin/elements/edituserprofile.html",
                    controller: "UserCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                .when("/addUser", {
                    templateUrl: "templates/admin/elements/addUser.html",
                    controller: "UserCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                .when("/userlist", {
                    templateUrl: "templates/admin/elements/userlist.html",
                    controller: "UserCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                .when("/changepassword", {
                    templateUrl: "templates/admin/elements/changepassword.html",
                    controller: "UserCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                .when("/logout", {
                    controller: 'LogoutCtrl'
                })
                .when("/useractivate/:id", {
                    templateUrl: "templates/admin/elements/activation.html",
                    controller: 'UserCtrl'
                })
                .when("/forgotpassword", {
                    templateUrl: "templates/admin/elements/forgotpassword.html",
                    controller: 'UserCtrl'
                })
                .when("/forgotuserpassword/:id", {
                    templateUrl: "templates/admin/elements/forgotuserpassword.html",
                    controller: 'UserCtrl'
                })
                .when("/userSearchResult", {
                    templateUrl: "templates/admin/elements/userSearchResult.html",
                    controller: "UserCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                // GroupCtrl
                .when("/addGroup", {
                    templateUrl: "templates/admin/elements/addGroup.html",
                    controller: "GroupCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                .when("/grouplist", {
                    templateUrl: "templates/admin/elements/grouplist.html",
                    controller: "GroupCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                // PaymentCtrl
                .when("/usersTransaction", {
                    templateUrl: "templates/admin/elements/usersTransaction.html",
                    controller: "PaymentCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                .when("/usersTransactionSearchResult", {
                    templateUrl: "templates/admin/elements/usersTransactionSearchResult.html",
                    controller: "PaymentCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                // PickCtrl
                .when("/picklist", {
                    templateUrl: "templates/admin/elements/picklist.html",
                    controller: "PickCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                // PickCtrl
                .when("/setting", {
                    templateUrl: "templates/admin/elements/setting.html",
                    controller: "SettingCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                .when("/pickSearchResult", {
                    templateUrl: "templates/admin/elements/pickSearchResult.html",
                    controller: "PickCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })                

                // GameCtrl
                .when("/gamelist", {
                    templateUrl: "templates/admin/elements/gamelist.html",
                    controller: "GameCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                .when("/gameSearchResult", {
                    templateUrl: "templates/admin/elements/gameSearchResult.html",
                    controller: "GameCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                .when("/editGameInfo/:id", {
                    templateUrl: "templates/admin/elements/editgame.html",
                    controller: "GameCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                .when("/sportslist", {
                    templateUrl: "templates/admin/elements/sportslist.html",
                    controller: "GameCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                .when("/activeSports", {
                    templateUrl: "templates/admin/elements/activesports.html",
                    controller: "GameCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                .when("/gameMoneyLineOdds", {
                    templateUrl: "templates/admin/elements/gameMoneyLineOdds.html",
                    controller: "GameCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                .when("/gamePointsSpreadOdds", {
                    templateUrl: "templates/admin/elements/gamePointsSpreadOdds.html",
                    controller: "GameCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                .when("/gameSearchResult", {
                    templateUrl: "templates/admin/elements/gameSearchResult.html",
                    controller: "GameCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                .when("/gameMonelyLineSearchResult", {
                    templateUrl: "templates/admin/elements/gameMonelyLineSearchResult.html",
                    controller: "GameCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                .when("/gamePointSpreadSearchResult", {
                    templateUrl: "templates/admin/elements/gamePointSpreadSearchResult.html",
                    controller: "GameCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                // PageCTRl
                .when("/contentpages", {
                    templateUrl: "templates/admin/elements/contentpages.html",
                    controller: "PageCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                .when("/editpageInfo/:id", {
                    templateUrl: "templates/admin/elements/editpageInfo.html",
                    controller: "PageCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                //feedbackCtrl
                .when("/feedback", {
                    templateUrl: "templates/admin/elements/feedbackList.html",
                    controller: "feedbackCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                .when("/editFeedback/:id", {
                    templateUrl: "templates/admin/elements/feedbackStatus.html",
                    controller: "feedbackCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                .when("/scheduleList", {
                    templateUrl: "templates/admin/elements/scheduleList.html",
                    controller: "scheduleCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                // calculationsCtrl
                .when("/calculationList", {
                    templateUrl: "templates/admin/elements/usercalculations.html",
                    controller: "calculationsCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                .when("/gameErrorOddsList", {
                    templateUrl: "templates/admin/elements/gameErrorOdds.html",
                    controller: "calculationsCtrl",
                    resolve: {
                        isAuthenticated: isSessionExist()
                    }
                })
                .when("/404", {
                    templateUrl: "templates/admin/elements/404.html",
                    controller: "PageCtrl"
                })
                // else 404
                .otherwise({
                    redirectTo: '/404'
                });
    }]);

/**
 * Flash message setting
 * @access private
 * @return json
 * Created by sarvesh
 * Created Date 06-June-2016
 */
app.run(function($rootScope) {
    // initialize variables
    $rootScope.flash = {};
    $rootScope.flash.text = '';
    $rootScope.flash.type = '';
    $rootScope.flash.timeout = 5000;
    $rootScope.hasFlash = false;
});



/**
 * Directive to compare two field value(Confirm password value)
 * @access private
 * @return json
 * Created by sarvesh
 * Created Date 06-June-2016
 */
app.directive('compareTo', function() {
    return {
        require: "ngModel",
        scope: {
            compareTo: '='
        },
        link: function(scope, element, attrs, ctrl) {
            scope.$watch(function() {
                var combined;

                if (scope.compareTo || ctrl.$viewValue) {
                    combined = scope.compareTo + '_' + ctrl.$viewValue;
                }
                return combined;
            }, function(value) {
                if (value) {
                    ctrl.$parsers.unshift(function(viewValue) {
                        var origin = scope.compareTo;
                        if (origin !== viewValue) {
                            ctrl.$setValidity("compareTo", false);
                            return undefined;
                        } else {
                            ctrl.$setValidity("compareTo", true);
                            return viewValue;
                        }
                    });
                }
            });
        }
    };
});

app.directive("limitTo", [function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            var limit = parseInt(attrs.limitTo);
            angular.element(elem).on("keypress", function(e) {
                if (this.value.length == limit) e.preventDefault();
            });
        }
    }
}]);

app.directive('ckEditor', [function () {
    return {
        require: '?ngModel',
        restrict: 'C',
        link: function (scope, elm, attr, model) {
            var isReady = false;
            var data = [];
            var ck = CKEDITOR.replace(elm[0]);

            function setData() {
                if (!data.length) {
                    return;
                }

                var d = data.splice(0, 1);
                ck.setData(d[0] || '<span></span>', function () {
                    setData();
                    isReady = true;
                });
            }

            ck.on('instanceReady', function (e) {
                if (model) {
                    setData();
                }
            });

            elm.bind('$destroy', function () {
                ck.destroy(false);
            });

            if (model) {
                ck.on('change', function () {
                    scope.$apply(function () {
                        var data = ck.getData();
                        if (data == '<span></span>') {
                            data = null;
                        }
                        model.$setViewValue(data);
                    });
                });

                model.$render = function (value) {
                    if (model.$viewValue === undefined) {
                        model.$setViewValue(null);
                        model.$viewValue = null;
                    }

                    data.push(model.$viewValue);

                    if (isReady) {
                        isReady = false;
                        setData();
                    }
                };
            }

        }
    };
}]);

/**
 * Directive to check field required
 * @access private
 * @return json
 * Created by sarvesh
 * Created Date 06-June-2016
 */
app.directive('checkRequired', function() {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$validators.checkRequired = function(modelValue, viewValue) {
                var value = modelValue || viewValue;
                var match = scope.$eval(attrs.ngTrueValue) || true;
                return value && match === value;
            };
        }
    };
});

/**
 * Request to check whether session exist or not
 * @access private
 * @return json
 * Created by sarvesh
 * Created Date 06-June-2016
 */
var isSessionExist = function() {
    return ["$q", "$rootScope", "$location", '$http', function($q, $rootScope, $location, $http) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: "/api/v1/users/isUserAuthenticated",
            }).success(function(data) {
                if (data.status == 1000) {
                    $rootScope.isLoggedIn = true;
                    deferred.resolve(true);
                } else {
                    $rootScope.isLoggedIn = false;
                    $location.path("/pladmin");
                }
            })
                    .error(function(data) {
                        $("#loginErrMsg").html('<div class="alert alert-danger>Invalid username or password!!</div>');
                    });
            return deferred.promise;
        }];
};

/**
 * Filter to make first letter capital in string
 * @access private
 * @return json
 * Created by sarvesh
 * Created Date 06-June-2016
 */
app.filter('capitalize', function() {
    return function(input, scope) {
        if (input != null)
            input = input.toLowerCase();
        return input.substring(0, 1).toUpperCase() + input.substring(1);
    }
});

/**
 * Filter to make first letter capital in string
 * @access private
 * @return json
 * Created by sarvesh
 * Created Date 06-June-2016
 */

app.filter("rounded",function(){
    return function(val){
        return val.toFixed(2);
    }
});

/**
 * Filter to replace value from string
 * @access private
 * @return json
 * Created by sarvesh
 * Created Date 06-June-2016
 */
app.filter('replacechar', function() {
    return function(input, scope) {
        //console.log(input);
        if (input != null) {
            var stringVal = input.replace(/[^a-zA-Z ]/g, "");
            return stringVal.replace(/\s/g, "+");
        }

    }
});


/**
 * Directive to get location value from google api
 * @access private
 * @return json
 * Created by sarvesh
 * Created Date 06-June-2016
 */
app.directive('googleplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());
                });
            });
        }
    };
});
