"use strict"
const accessories = {
  template: `
  <button ng-click="$ctrl.getAccessories();">Get Accessories</button>
  <form ng-submit="$ctrl.postAccessory($ctrl.newAccessory);">
    <input type="text" ng-model="$ctrl.newAccessory.brand" placeholder="Brand">
    <input type="text" ng-model="$ctrl.newAccessory.type" placeholder="Type">
    <input type="text" ng-model="$ctrl.newAccessory.material" placeholder="Material">
    <input type="text" ng-model="$ctrl.newAccessory.price" placeholder="Price">
    <button>Add Accessory</button>
  </form>
  <p ng-repeat="accessory in $ctrl.accessoriesList track by $index">{{ accessory }}
    <button ng-click="$ctrl.deleteAccessory($ctrl.accessoriesList[$index].id);">X</button>
    <button ng-click="$ctrl.updateAccessory($ctrl.accessoriesList[$index].id, $ctrl.newAccessory);">Update</button>
  </p>
  `,
  controller: function($http) {
    const vm = this;
    // get information from inputs
    vm.getAccessories = () => {
     $http({
        url: "/api/shop/accessories",
        method: "GET"                 
     }).then((response) => {
        vm.accessoriesList = response.data;         
     })
    }
    // removes information form Array
    vm.deleteAccessory = function (index) {
        $http({
            url: "/api/shop/accessories/" + index,
            method: "DELETE"
        }).then(function (response) {
            vm.accessoriesList = response.data;
        })                
    }
    // Edits item on Array through Inputs
    vm.updateAccessory = (index, newAccessory) => {
        $http({
            url: "/api/shop/accessories/" + index,
            method : "PUT",
            data: newAccessory                                
        }).then((response) => { 
            vm.accessoriesList = response.data                                          
        });                                                                
    }        

    //  creates a new post on the Array
    vm.postAccessory = (newAccessory) => {
        $http({
            url: "api/shop/accessories/",
            method: "POST",
            data: newAccessory                                                                                                                    
        }).then((response) => {
            vm.accessoriesList = response.data;                        
        });                
    }
  }
}

//links to the HTML
angular.module("App").component("accessories", accessories);