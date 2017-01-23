(function() {
  'use strict';

  angular.module('MenuApp')

  .config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home if no other URL matches
  $urlRouterProvider.otherwise('/');

  // Set up UI states
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'src/templates/home.template.html'
    })

    .state('categories', {
      url: '/categories',
      templateUrl: 'src/templates/categories.template.html',
      controller: 'CategoriesController as catCtrl',
      resolve:{
        categories: ['MenuData',
          function (MenuData) {
            return MenuData.getAllCategories()
              .then(function (list) {
                return list;
              });
          }]
      }
    })

    .state('items',{
      url: '/items/{categoryShortName}',
      templateUrl: 'src/templates/items.template.html',
      controller: 'ItemsController as itemsCtrl',
      resolve:{
        items: ['$stateParams', 'MenuData',
          function ($stateParams,MenuData) {
            return MenuData.getItemsForCategory($stateParams.categoryShortName)
              .then(function (list) {
                return list;
              });
          }]
      }
    });
}


}());
