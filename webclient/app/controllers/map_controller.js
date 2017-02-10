/**
 * Created by dano on 07/02/17.
 */

angular.module('app').controller('MapController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

    var map;
    var myLatLng = {lat: 48.856577777778, lng: 2.3518277777778};
    var flightPlanCoordinates = [];
    var cont_lieu = 0;
    var cont_click=0;

    $scope.initMap = function () {

        flightPlanCoordinates = [];
        cont_lieu = 0;
        cont_click=0;
        $scope.score=0;

        map = new google.maps.Map(document.getElementById('map'), {
            center: myLatLng,
            zoom: 6
        });

        //var Init = new google.maps.LatLng(myLatLng.lat,myLatLng.lng);
        //flightPlanCoordinates.push(Init);

        /*var marker = new google.maps.Marker({
         position: Init,
         map: map,
         draggable: true,
         title: 'Hello World!'
         });
         */

        var infowindow = new google.maps.InfoWindow({
            content: '<img src="img/Tour_Eiffel.jpg" alt="Tour_Eiffel" width="100" height="180"/>'
        });

        /*
         marker.addListener('click', function() {
         infowindow.open(map, marker);
         });
         */

        map.addListener('click', function (e) {
            cont_click=cont_click+1;
            if(cont_click >= 3){
                //si da mas de dos clicks entonces la variable se vuelve false
                $rootScope.cont_click = false;
            }else{
                $rootScope.cont_click = true;
            }
            $scope.$apply(function(){
                $scope.placeMarkerAndPanTo(e.latLng, map);
            });
        });

        //metodo para medir las distancias
        // console.log('obteniendo con Google :' + google.maps.geometry.spherical.computeDistanceBetween () + ' metros');

    };

    $scope.placeMarkerAndPanTo = function (latLng, map) {

        if (typeof $rootScope.coordonees == 'undefined') {
            alert('Appuyer sur Demarrer pour commencer le jeu');
            return;
        }


        /**/
        /*
         for(var c in  $rootScope.coordonees){
         console.log($rootScope.coordonees[c]);
         ));
         }
         */

        var lieu = new google.maps.LatLng($rootScope.coordonees[cont_lieu]);
        var distance = google.maps.geometry.spherical.computeDistanceBetween(lieu, latLng);
        console.log(distance);


        if (flightPlanCoordinates.length <= 4) {
            $rootScope.acierto=false;
            if (distance < 10*$rootScope.partie.distanceDF) {

                if(distance >= 0 && distance <= 2*$rootScope.partie.distanceDF){
                   $scope.score=10;
                }else if(distance >= 2*$rootScope.partie.distanceDF && distance <= 4*$rootScope.partie.distanceDF){
                    $scope.score=8;
                }else if(distance >= 4*$rootScope.partie.distanceDF && distance <= 6*$rootScope.partie.distanceDF){
                    $scope.score=6;
                }else if(distance >= 6*$rootScope.partie.distanceDF && distance <= 8*$rootScope.partie.distanceDF){
                    $scope.score=3;
                }else if(distance >= 8*$rootScope.partie.distanceDF && distance <= 10*$rootScope.partie.distanceDF){
                    $scope.score=1;
                }

                console.log($scope.score);
                cont_lieu = cont_lieu + 1;
                console.log($rootScope.coordonees[cont_lieu]);


                //console.log(flightPlanCoordinates);

                var marker = new google.maps.Marker({
                    position: latLng,
                    animation: google.maps.Animation.DROP,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                    map: map
                });

                var infowindow = new google.maps.InfoWindow({
                    content: '<img src="img/Tour_Eiffel.jpg" alt="Tour_Eiffel" width="100" height="180"/>'
                });

                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                });

                flightPlanCoordinates.push(latLng);
                //cuando acierta la variable se vuelve true
                $rootScope.acierto = true;
                $scope.cambio($rootScope.acierto);
            }else{
                alert("Désolé, Réessaie!");
                $scope.cambio($rootScope.acierto);
            }

            var flightPath = new google.maps.Polyline({
                path: flightPlanCoordinates,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });
            flightPath.setMap(map);
            map.panTo(latLng);
        } else {
            alert("La partie est terminée");
        }
    };

    $scope.cambio=function(newValue) {
        if(newValue===true){
            if($rootScope.in1===false){
                $rootScope.in1=true;
                $rootScope.in2=false;
                $rootScope.in3=true;
                $rootScope.in4=true;
                $rootScope.in5=true;
               // $rootScope.destFinal1=true;
                if($rootScope.cont_click===true){
                    $rootScope.destFinal1=false;
                }else if($rootScope.cont_click===false){
                    $rootScope.destFinal1=true;
                }
            }else if($rootScope.in2===false){
                $rootScope.in1=true;
                $rootScope.in2=true;
                $rootScope.in3=false;
                $rootScope.in4=true;
                $rootScope.in5=true;
              //  $rootScope.destFinal2=true;
                if($rootScope.cont_click===true){
                    $rootScope.destFinal2=false;
                }else if($rootScope.cont_click===false){
                    $rootScope.destFinal2=true;
                }
            }else if($rootScope.in3===false){
                $rootScope.in1=true;
                $rootScope.in2=true;
                $rootScope.in3=true;
                $rootScope.in4=false;
                $rootScope.in5=true;
              //  $rootScope.destFinal3=true;
                if($rootScope.cont_click===true){
                    $rootScope.destFinal3=false;
                }else if($rootScope.cont_click===false){
                    $rootScope.destFinal3=true;
                }
            }else if($rootScope.in4===false){
                $rootScope.in1=true;
                $rootScope.in2=true;
                $rootScope.in3=true;
                $rootScope.in4=true;
                $rootScope.in5=false;
               // $rootScope.destFinal4=true;
                if($rootScope.cont_click===true){
                    $rootScope.destFinal4=false;
                }else if($rootScope.cont_click===false){
                    $rootScope.destFinal4=true;
                }
            }else if($rootScope.in5===false){
                $rootScope.in1=true;
                $rootScope.in2=true;
                $rootScope.in3=true;
                $rootScope.in4=true;
                $rootScope.in5=true;
               // $rootScope.destFinal5=true;
                if($rootScope.cont_click===true){
                    $rootScope.destFinal5=false;
                }else if($rootScope.cont_click===false){
                    $rootScope.destFinal5=true;
                }
            }
            cont_click=0;
        }else{
            return;
        }
    };

    $scope.initMap();

}]);