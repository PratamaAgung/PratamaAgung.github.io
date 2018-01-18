$(document).ready(function() { 
    $('body').bootstrapMaterialDesign(); 

    $("#start").change(function(){
        $("#end").attr("min", $("#start").val());
    });

    $("#end").change(function(){
        $("#start").attr("max", $("#end").val());
    });
});

var app = angular.module('schedule-app', []);
app.controller('schedule-ctrl', function($scope){
    $scope.db = null;

    $scope.jadwal = [];

    $scope.startDate = null;

    $scope.endDate = null;

    $scope.searchInput = null;
    
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
                    console.log(child.val());
                    $scope.jadwal.push({
                        data : child.val(),
                        show : true
                    })
                });
            });
        });
    }

    $scope.setDateRange = function(){
        var start, end;
        if($scope.startDate != null){
            start = new Date($scope.startDate);
        } else {
            start = new Date(1900, 1, 1);
        }
        if ($scope.endDate != null){
            end = new Date($scope.endDate);
        } else {
            end = new Date(2100, 1, 1);
        }
        $scope.jadwal.forEach(function(val){
            if(val.data.timestamp >= start.getTime()/1000 && val.data.timestamp <= end.getTime()/1000){
                val.show = true;
            } else {
                val.show = false;
            }
        });
    }

    $scope.search = function(){
        if ($scope.searchInput == null || $scope.searchInput == ""){
            $scope.jadwal.forEach(function(val){
                val.show = true;
            });
        } else {
            $scope.jadwal.forEach(function(val){
                // console.log(val.data.lokasi);
                if(val.data.lokasi.toLowerCase().indexOf($scope.searchInput) >= 0){
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
        $scope.orderByField = 'data.lokasi';
        $scope.reverseOrder = false;
    }

    $scope.orderByLokasiDesc = function() {
        $scope.orderByField = 'data.lokasi';
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
});

