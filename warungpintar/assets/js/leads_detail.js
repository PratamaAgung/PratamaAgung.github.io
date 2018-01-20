$(document).ready(function() { 
    $('body').bootstrapMaterialDesign(); 

    var id = parseInt(getIdFromUrl());
    authUser();

    var leads_data = setDataFromFirebase(id);
});

var id_leads;
var lokasi_leads;
var lat_leads;
var lng_leads;

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
    db.ref('/data').orderByChild("id").equalTo(id).once('value').then(function(snapshot){
        snapshot.forEach(function(child){
            ret = child.val();
        });

        console.log(ret);
        initMap(ret.location.lat, ret.location.long);
        id_leads = ret.id;
        $('#id').text(ret.id);
        lokasi_leads = ret.Lokasi;
        $('#lokasi').text(ret.Lokasi);
        lat_leads = ret.location.lat;
        $('#lat').text(ret.location.lat);
        lng_leads = ret.location.long;
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

function survey(){
    window.location.href = "survey_form.html?id=" + id_leads + "&lokasi=" + lokasi_leads + "&lat=" + lat_leads + "&lng=" + lng_leads;
}

function logout(){
    firebase.auth().signOut().then(function(){
        window.location.href = 'login.html';
    });
}