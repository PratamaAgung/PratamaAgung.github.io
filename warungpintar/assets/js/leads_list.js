$(document).ready(function() { 
    $('body').bootstrapMaterialDesign(); 
});

var app = angular.module('leads-list-app', []);
app.controller('leads-list-ctrl', function($scope){
    $scope.leads = [];
    
    $scope.searchInput = null;

    $scope.orderByField = 'data.id';

    $scope.reverseOrder = false;

    $scope.initFirebase = function(){
        var user_id;
        var user_email;
        var user_name;

        firebase.auth().onAuthStateChanged(function(user){
            if(user != null) {
                user_id = user.uid;
                user_email = user.email;
                user_name = user.displayName;
            } else {
                window.location.href = "login.html";
            }
        });

        db = firebase.database();

        db.ref('/data').once('value').then(function(snapshot){
            $scope.$apply(function(){
                snapshot.forEach(function(child){
                    $scope.leads.push({
                        data : child.val(),
                        show : true
                    })
                    console.log(child.val());
                });
            });
        });
    }

    $scope.search = function(){
        if ($scope.searchInput == null || $scope.searchInput == ""){
            $scope.leads.forEach(function(val){
                val.show = true;
            });
        } else {
            $scope.leads.forEach(function(val){
                if(val.data.Lokasi.toLowerCase().indexOf($scope.searchInput) >= 0){
                    val.show = true;
                } else {
                    val.show = false;
                }
            });
        }
    }

    $scope.logout = function(){
        firebase.auth().signOut().then(function(){
            window.location.href = 'login.html';
        });
    }

    $scope.orderByLokasiAsc = function() {
        $scope.orderByField = 'data.Lokasi';
        $scope.reverseOrder = false;
    }

    $scope.orderByLokasiDesc = function() {
        $scope.orderByField = 'data.Lokasi';
        $scope.reverseOrder = true;
    }

    $scope.orderByTanggalAsc = function() {
        $scope.orderByField = 'data.timestamp';
        $scope.reverseOrder = false;
    }

    $scope.orderByTanggalDesc = function() {
        $scope.orderByField = 'data.timestamp';
        $scope.reverseOrder = true;
    }

    $scope.getDetail = function(id){
        window.location.href = "leads_detail.html?id=" + id;
    }

    $scope.addLeads = function(){
        window.location.href = "leads_form.html";
    }
});

