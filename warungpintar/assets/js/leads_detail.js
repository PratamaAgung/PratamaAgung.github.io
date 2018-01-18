$(document).ready(function() { 
    $('body').bootstrapMaterialDesign(); 

    var id = parseInt(getIdFromUrl());
    authUser();

    var leads_data = setDataFromFirebase(id);
});

function initMap(lat, lng) {
    var defaultLat = lat;
    var defaultLng = lng;

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: defaultLat, lng: defaultLng},
        zoom: 13,
        mapTypeId: 'roadmap'
    });

    var position = new google.maps.LatLng(defaultLat, defaultLng);
    var marker = new google.maps.Marker({
        map: map,
        position: position
    });
}

function authUser(){
    firebase.auth().onAuthStateChanged(function(user){
        if(user == null) {
            window.location.href = "login.html";
        }
    });
}

function setDataFromFirebase(id){
    var db = firebase.database();
    var ret;
    var lat, lng;
    db.ref('/data').orderByChild("id").equalTo(id).once('value').then(function(snapshot){
        snapshot.forEach(function(child){
            ret = child.val();
        });

        console.log(ret);
        initMap(ret.location.lat, ret.location.long);
        $('#id').text(ret.id);
        $('#lokasi').text(ret.Lokasi);
        $('#lat').text(ret.location.lat);
        $('#lng').text(ret.location.long);
        $('#cp').text(ret.CP);
        $('#tipe').text(ret.tipe_warung);
        $('#peluang').text(ret.peluang_keberhasilan);
        $('#next').text(ret.status);
        $('#keterangan').text(ret.keterangan);
        $('#harga').text(ret.harga_sewa);        
    });
}

function getIdFromUrl(){
    var url = new URL(window.location.href);
    var id = url.searchParams.get('id')
    if (id == null || id == "") window.location.href = 'leads_list.html';
    return id;
}

function logout(){
    firebase.auth().signOut().then(function(){
        window.location.href = 'login.html';
    });
}