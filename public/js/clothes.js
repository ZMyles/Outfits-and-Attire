"use strict";

const clothes = {
  template: `
  <button ng-click"$ctrl.getClothes();">Get Outfits</button>
  <form ng-submit="$ctrl.postCloth($ctrl.newCloth);">
    <input type="text"  ng-model="$ctrl.newCloth.brand"placeholder="Brand">
    <input type="text" ng-submit="$ctrl.newCloth.shirt" placeholder="Shirt">
    <input type="text" ng-submit="$ctrl.newCloth.size"placeholder="Size">
    <button>Add Shirt</button>
  </form>
  <p ng-repeat="cloth in $ctrl.outFit track by $index">{{ cloth}}
    <button ng-click="$ctrl.deleteCloth($ctrl.outFit[$index].id);">X</button>
    <button ng-click="$ctrl.updateCloth($ctrl.outFit[$index].id);">Update</button>
  
  </p>
  `,
  controller: function($http) {
    const vm = this;
    vm.getClothes = () => {
    $http({
      url: "/api/shop/clothes",
      method:"GET"
    }).then((response) => {
      vm.outFit = response.data;
    })
  }
 vm.deleteCloth = function (index) {
   $http({
     url: "/api/shop/clothes/" + index,
     method: "DELETE"
   }).then(function(response) {
     vm.outFit = response.data;
   })
 }
 vm.updateCloth = (index, newCloth) => {
   $http ({
     url: "/api/shop/clothes/" + index,
     method: "PUT",
     data: newCloth
   }).then((response) => {
     vm.outFit = response.data
   });
 }
 vm.postCloth = (newCloth) => {
   $http({
     url: "api/shop/clothes",
     method: "POST",
     data: newCloth
   }).then((response) => {
     vm.outFit = response.data
   })
 };
}
}

angular.module("App")
       .component("clothes", clothes);