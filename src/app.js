var icm = angular.module('icm', ["ui.router",'ui.bootstrap'])
    .run(
      [        '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {

        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ui-sref-active="active }"> will set the <li> // to active whenever
        // 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }]);

icm.config(function($stateProvider, $urlRouterProvider){
  
  // For any unmatched url, send to /route1
  $urlRouterProvider.otherwise("/berichten")
  
  $stateProvider
    .state('incidenten', {
        url: "/incidenten",
        templateUrl: "templates/incidenten.html",
        controller: 'IncidentCtrl'
    })
                
    .state('berichten', {
        url: "/berichten",
        templateUrl: "templates/berichten.html",
        controller: 'BerichtCtrl'
    })

    .state('kaart', {
        url: "/kaart",
        templateUrl: "templates/kaart.html"
    })

    .state('uitloggen', {
        url: "/uitloggen",
        templateUrl: "templates/uitloggen.html"
    })

    .state('help', {
        url: "/help",
        templateUrl: "templates/help.html"
    })
      
})


icm.factory('ProjectStore',function($rootScope) {
    var projectStore = core.projectStore();

    return {
        on: function(eventName, fn) {
            projectStore.on(eventName, function(data) {
                $rootScope.$apply(function() {
                    fn(data);
                });
            });
        }
    };
});
icm.controller('IncidentCtrl' , function($scope,ProjectStore){
    //ProjectStore.on('datachange',function(data) {
    core.projectStore().on('datachange',function(data) {
          $scope.projects = icm.projects();
    })

    $scope.projects = icm.projects();    

    $scope.setProject = function(project) {
        core.project(project.id());   
        
    }

});

/*
 * Item stuff
 */

icm.factory('ItemStore',function($rootScope) {
    var itemStore;
    if(core.project()) { 
        itemStore = core.project().itemStore();

        return {
            on: function(eventName, fn) {
                itemStore.on(eventName, function(data) {
                    $rootScope.$apply(function() {
                        fn(data);
                    });
                });
            }
        };
    }
    else {
        return {on: function(eventName, fn){}}
    }
});
icm.controller('BerichtCtrl' , function($scope,ItemStore){

    ItemStore.on('datachange',function(data) {
          $scope.items = icm.messages();
    })
    $scope.items = icm.messages();
       
   
});
