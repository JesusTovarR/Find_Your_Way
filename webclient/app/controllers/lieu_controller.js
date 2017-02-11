
angular.module('app').controller('LieuController', ['$scope', '$rootScope','$timeout', '$http', 'LieuFactory',
    function($scope, $rootScope, $timeout, $http, LieuFactory){
        $rootScope.in1=true;
        $rootScope.in2=true;
        $rootScope.in3=true;
        $rootScope.in4=true;
        $rootScope.in5=true;
        $rootScope.destFinal1=true;
        $rootScope.destFinal2=true;
        $rootScope.destFinal3=true;
        $rootScope.destFinal4=true;
        $rootScope.destFinal5=true;

        $scope.regle=false;
        $scope.regle1=false;
        $scope.regle2=true;
        $scope.regle3=true;
        $scope.regle4=true;
        $scope.regle5=true;
        $scope.regle6=true;
        $scope.disNext=false;
        $scope.disBack=true;
        $scope.reglesIndications=true;
        $scope.indicationsRegles=true;
        $scope.gameOver=true;
        $rootScope.redemarrer=false;

        $scope.counter = 90;
        var stopped;


        $rootScope.newGame = function () {

            LieuFactory.newPartie().then(function (response) {
                $rootScope.partie = response.data;
                $scope.indications();
                $scope.coordonees();
                $scope.chemin();
                $scope.indices();
                $scope.destinationFinal();
                $scope.lieux();
                $rootScope.in1=false;
                $scope.regle=true;
                $scope.reglesIndications=true;
                $scope.indicationsRegles=false;
                $scope.countdown();
            }, function (error) {
                console.log('error');
            });
        };

        $scope.countdown = function() {
            stopped = $timeout(function() {
                console.log($scope.counter);
                $scope.counter--;
                if($scope.counter===0){
                    $scope.stop();
                    $scope.gameOver=false;
                    $scope.indicationsRegles=true;
                }else{
                    $scope.countdown();
                }
            }, 1000);
        };

        $scope.stop = function(){
            $timeout.cancel(stopped);

        }

        $scope.indications = function (){
            LieuFactory.indications($scope.partie.id, $scope.partie.token).then(function (response){

                $scope.indication=response.data;
                return $scope.indication;

            },function (error) {
                console.log('error');
            });
        };

        $scope.coordonees = function (){
            LieuFactory.coordonees($scope.partie.id, $scope.partie.token).then(function (response){

                $rootScope.coordonees=response.data;
                console.log($rootScope.coordonees);

            },function (error) {
                console.log('error');
            });
        };


        $scope.chemin = function (){
            LieuFactory.chemin($scope.partie.id, $scope.partie.token).then(function (response){

                // console.log( $scope.chemin=response.data);
                return $scope.cheminData=response.data;

            },function (error) {
                console.log('error');
            });
        };

        $scope.indices = function (){
            LieuFactory.indices($scope.partie.id, $scope.partie.token).then(function (response){

                return $scope.indicesData=response.data;

            },function (error) {
                console.log('error');
            });
        };

        $scope.destinationFinal = function (){
            LieuFactory.destinationFinal($scope.partie.id, $scope.partie.token).then(function (response){

                    $rootScope.destinationFinal=response.data;

            },function (error) {
                console.log('error');
            });
        };

        $scope.lieux = function (){
            LieuFactory.lieux($scope.partie.id, $scope.partie.token).then(function (response){

                return $scope.lieu=response.data;

            },function (error) {
                console.log('error');
            });
        };

        $scope.regles = function (){
            if($scope.reglesIndications===true){
                $scope.reglesIndications=false;
            }
        };


        $scope.next = function (){
            if($scope.regle1===false){
                $scope.regle1=true;
                $scope.regle2=false;
                $scope.disBack=false;
            }else if($scope.regle2===false){
                $scope.regle2=true;
                $scope.regle3=false;
            }else if($scope.regle3===false){
                $scope.regle3=true;
                $scope.regle4=false;
            }else if($scope.regle4===false){
                $scope.regle4=true;
                $scope.regle5=false;
            }else if($scope.regle5===false){
                $scope.regle5=true;
                $scope.regle6=false;
                $scope.disNext=true;
            }
        };

        $scope.back = function (){
            if($scope.regle2===false){
                $scope.regle2=true;
                $scope.regle1=false;
                $scope.disBack=true;
            }else if($scope.regle3===false){
                $scope.regle3=true;
                $scope.regle2=false;
            }else if($scope.regle4===false){
                $scope.regle4=true;
                $scope.regle3=false;
            }else if($scope.regle5===false){
                $scope.regle5=true;
                $scope.regle4=false;
            }else if($scope.regle6===false){
                $scope.regle6=true;
                $scope.regle5=false;
                $scope.disNext=false;
            }
        };

        $scope.$watch($rootScope.redemarrer,function(newValue) {

            if (newValue===false) {
                return;
            }
            $rootScope.partie=null;
            $scope.indication=null;
            $rootScope.coordonees=null;
            $scope.indicesData=null;
            $scope.cheminData=null;
            $rootScope.destinationFinal=null;
            $scope.lieu=null;
            $rootScope.in1=true;
            $rootScope.in2=true;
            $rootScope.in3=true;
            $rootScope.in4=true;
            $rootScope.in5=true;
            $rootScope.destFinal1=true;
            $rootScope.destFinal2=true;
            $rootScope.destFinal3=true;
            $rootScope.destFinal4=true;
            $rootScope.destFinal5=true;

            $scope.regle=false;
            $scope.regle1=false;
            $scope.regle2=true;
            $scope.regle3=true;
            $scope.regle4=true;
            $scope.regle5=true;
            $scope.regle6=true;
            $scope.disNext=false;
            $scope.disBack=true;
            $scope.reglesIndications=true;
            $scope.indicationsRegles=true;
            $scope.gameOver=true;
            $scope.counter = 90;
            $rootScope.redemarrer=false;

        });
    }
]);
