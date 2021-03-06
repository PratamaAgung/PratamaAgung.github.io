$(document).ready(function() { 
    $('body').bootstrapMaterialDesign();

    authUser();
    var data = getDataFromUrl();
    initMap(data.lat, data.lng);
    $('#warung-id').val(data.id);
    $('#nama-tempat').val(data.lokasi);
    $('#latitude').val(data.lat);
    $('#longitude').val(data.lng);
});

function authUser(){
    firebase.auth().onAuthStateChanged(function(user){
        if(user == null) {
            window.location.href = "login.html";
        }
    });
}

function getDataFromUrl(){
    var url = new URL(window.location.href);
    var id = url.searchParams.get('id');
    var lokasi = url.searchParams.get('lokasi');
    var lat = url.searchParams.get('lat');
    var lng = url.searchParams.get('lng');
    return {
        id : id,
        lokasi : lokasi,
        lat : lat,
        lng : lng   
    };
}

var marker = false;
function initMap(defaultLat, defaultLng) {
    if (defaultLat == null || defaultLng == null){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                defaultLat = position.coords.latitude;
                defaultLng = position.coords.longitude;
                map.setCenter(new google.maps.LatLng(defaultLat, defaultLng));
            })
        }
    
        if (defaultLat == null || defaultLng == null){
            defaultLat = -6.17511;
            defaultLng = 106.8650395;
        }
    } 

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: defaultLat, lng: defaultLng},
        zoom: 13,
        mapTypeId: 'roadmap'
    });

    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
        return;
        }

        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
        if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
        }

        if (marker === false){
            marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                draggable: true
            }); 

            google.maps.event.addListener(marker, 'dragend', function(event){
                markLocation(marker);
            });  
        } else {
            marker.setPosition(place.geometry.location);
        }

        if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
        } else {
            bounds.extend(place.geometry.location);
        }
        });
        map.fitBounds(bounds);
        markLocation(marker);
    });

    google.maps.event.addListener(map, 'click', function(event) {                
        var clickedLocation = event.latLng;
        if(marker === false){
            marker = new google.maps.Marker({
                position: clickedLocation,
                map: map,
                draggable: true
            });
            google.maps.event.addListener(marker, 'dragend', function(event){
                markLocation(marker);
            });
        } else{
            marker.setPosition(clickedLocation);
        }
        markLocation(marker);
    });

    var markLocation = function(marker){
        var latitude = marker.getPosition().lat();
        var longitude = marker.getPosition().lng();

        $("#latitude").val(latitude);
        $("#longitude").val(longitude);
    };
}

function changeDaerah(value) {
    $('#other-daerah').attr("value", value);
}

function changeTipe(value) {
    $('#other-tipe').attr("value", value);
}

function changeLama(value) {
    $('#other-lama').attr("value", value);
}

function logout(){
    firebase.auth().signOut().then(function(){
        window.location.href = 'login.html';
    });
}

var nbUpload = 0;
var uploadedFile = [];
function uploadFile(){
    var file = document.getElementById('foto').files[0];
    var fileName = file.name.substring(0, file.name.lastIndexOf('.')); 
    var fileExt = file.name.substring(file.name.lastIndexOf('.'));
    var date = new Date();
    var fileNameStorage = fileName + date.getTime();

    nbUpload += 1;
    $('#uploaded-file').append(
        '<div class="card upload-template" id="upload-'+nbUpload+'">' + 
            '<div class="card-text">' + 
                '<i class="material-icons">&#xE2C6;</i> <span class="report"></span>' +
            '</div>' +
        '</div>'
    )

    var uploadTask = firebase.storage().ref().child("images/" + fileNameStorage + fileExt).put(file);
    uploadTask.on('state_changed', function(snapshot){
        var progress = parseInt((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        $('#upload-' + nbUpload + ' .report').text('uploading ' + progress + '%');
    }, function(error) {
        // Handle unsuccessful uploads
    }, function() {
        var downloadURL = uploadTask.snapshot.downloadURL;
        uploadedFile.push(downloadURL);
        console.log(uploadedFile);

        $('#upload-' + nbUpload + ' .report').text(file.name);
    });
}
