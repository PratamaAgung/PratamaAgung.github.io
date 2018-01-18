$(document).ready(function() { 
    $('body').bootstrapMaterialDesign(); 
});

function addSurvey(){
    location.href = "survey_form.html";
}

var app = angular.module('survey-app', []);
app.controller('survey-ctrl', function($scope){
    $scope.survey = [];

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
                    $scope.survey.push({
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
            $scope.survey.forEach(function(val){
                val.show = true;
            });
        } else {
            $scope.survey.forEach(function(val){
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

    $scope.getDetail = function(id) {
        window.location.href = "survey_detail.html?id=" + id;
    }
});