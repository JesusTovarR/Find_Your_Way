angular.module('app').controller('LieuController', ['$scope', '$rootScope', '$timeout', '$http', 'LieuFactory',
    function ($scope, $rootScope, $timeout, $http, LieuFactory) {
        $rootScope.in1 = true;
        $rootScope.in2 = true;
        $rootScope.in3 = true;
        $rootScope.in4 = true;
        $rootScope.in5 = true;
        $rootScope.destFinal1 = true;
        $rootScope.destFinal2 = true;
        $rootScope.destFinal3 = true;
        $rootScope.destFinal4 = true;
        $rootScope.destFinal5 = true;
        $scope.fini = true;
        $rootScope.niveau = 1;
        $scope.nextLevel = "Redemarrer";

        $scope.regle = false;
        $scope.button = true;
        $scope.regle1 = false;
        $scope.regle2 = true;
        $scope.regle3 = true;
        $scope.regle4 = true;
        $scope.regle5 = true;
        $scope.regle6 = true;
        $scope.disNext = false;
        $scope.disBack = true;
        $scope.reglesIndications = true;
        $scope.indicationsRegles = true;
        $scope.indicationsRegles2 = true;
        $rootScope.gameOver = true;
        $rootScope.trouver = true;
        $rootScope.carte = false;

        $scope.counter = 90;
        $scope.ritme = 1000;
        var stopped;


        $rootScope.newGame = function () {

            LieuFactory.newPartie().then(function (response) {
                $rootScope.partie = response.data;
                $scope.indications();
                $scope.coordonee();
                $scope.chemin();
                $scope.indices();
                $scope.destinationFinal();
                $scope.lieux();
                $rootScope.in1 = false;
                $scope.regle = true;
                $scope.button = false;
                $scope.reglesIndications = true;
                $scope.indicationsRegles = false;
                $scope.indicationsRegles2 = false;
                $scope.countdown();
            }, function (error) {
                console.log('error');
            });
        };

        $scope.countdown = function () {
            stopped = $timeout(function () {
                $scope.counter--;
                if ($rootScope.acierto_dest_finale === true) {
                    $rootScope.trouver = true;
                    $scope.fini = false;
                    $scope.indicationsRegles2 = true;
                    if ($rootScope.niveau <= 4) {
                        $rootScope.niveau = $rootScope.niveau + 1;
                    } else if ($rootScope.niveau >= 5) {
                        $rootScope.niveau = 1;
                    }
                    $scope.nextLevel = "Niveau suivant"
                } else if ($scope.counter === 0) {
                    $scope.stop();
                    $rootScope.gameOver = false;
                    $scope.indicationsRegles = true;
                    $scope.indicationsRegles2 = true;
                    $rootScope.niveau = 1;
                    $rootScope.carte = true;
                    $scope.nextLevel = "Redemarrer";
                } else if ($rootScope.cont_click_dest_final === 5) {
                    $scope.stop();
                    $rootScope.gameOver = false;
                    $scope.indicationsRegles = true;
                    $scope.indicationsRegles2 = true;
                    $rootScope.niveau = 1;
                    $rootScope.carte = true;
                    $scope.nextLevel = "Redemarrer";
                } else {
                    $scope.countdown();
                }
            }, $scope.ritme);
        };

        $scope.stop = function () {
            $timeout.cancel(stopped);

        }

        $scope.indications = function () {
            LieuFactory.indications($scope.partie.id, $scope.partie.token).then(function (response) {

                $scope.indication = response.data;
                return $scope.indication;

            }, function (error) {
                console.log('error');
            });
        };

        $scope.coordonee = function () {
            LieuFactory.coordonee($scope.partie.id, $scope.partie.token).then(function (response) {

                $rootScope.coordonees = response.data;
                console.log($rootScope.coordonees);

            }, function (error) {
                console.log('error');
            });
        };


        $scope.chemin = function () {
            LieuFactory.chemin($scope.partie.id, $scope.partie.token).then(function (response) {

                // console.log( $scope.chemin=response.data);
                return $scope.cheminData = response.data;

            }, function (error) {
                console.log('error');
            });
        };

        $scope.indices = function () {
            LieuFactory.indices($scope.partie.id, $scope.partie.token).then(function (response) {

                return $scope.indicesData = response.data;

            }, function (error) {
                console.log('error');
            });
        };

        $scope.destinationFinal = function () {
            LieuFactory.destinationFinal($scope.partie.id, $scope.partie.token).then(function (response) {

                $rootScope.destinationFinal = response.data;

            }, function (error) {
                console.log('error');
            });
        };

        $scope.lieux = function () {
            LieuFactory.lieux($scope.partie.id, $scope.partie.token).then(function (response) {

                return $scope.lieu = response.data;

            }, function (error) {
                console.log('error');
            });
        };

        $scope.regles = function () {
            if ($scope.reglesIndications === true) {
                $scope.reglesIndications = false;
            }
        };


        $scope.next = function () {
            if ($scope.regle1 === false) {
                $scope.regle1 = true;
                $scope.regle2 = false;
                $scope.disBack = false;
            } else if ($scope.regle2 === false) {
                $scope.regle2 = true;
                $scope.regle3 = false;
            } else if ($scope.regle3 === false) {
                $scope.regle3 = true;
                $scope.regle4 = false;
            } else if ($scope.regle4 === false) {
                $scope.regle4 = true;
                $scope.regle5 = false;
            } else if ($scope.regle5 === false) {
                $scope.regle5 = true;
                $scope.regle6 = false;
                $scope.disNext = true;
            }
        };

        $scope.back = function () {
            if ($scope.regle2 === false) {
                $scope.regle2 = true;
                $scope.regle1 = false;
                $scope.disBack = true;
            } else if ($scope.regle3 === false) {
                $scope.regle3 = true;
                $scope.regle2 = false;
            } else if ($scope.regle4 === false) {
                $scope.regle4 = true;
                $scope.regle3 = false;
            } else if ($scope.regle5 === false) {
                $scope.regle5 = true;
                $scope.regle4 = false;
            } else if ($scope.regle6 === false) {
                $scope.regle6 = true;
                $scope.regle5 = false;
                $scope.disNext = false;
            }
        };

        $rootScope.again = function () {

            $scope.stop();
            $rootScope.partie = null;
            $scope.indication = null;
            $rootScope.coordonees = null;
            $scope.indicesData = null;
            $scope.cheminData = null;
            $rootScope.destinationFinal = null;
            $scope.lieu = null;
            $rootScope.in1 = true;
            $rootScope.in2 = true;
            $rootScope.in3 = true;
            $rootScope.in4 = true;
            $rootScope.in5 = true;
            $rootScope.destFinal1 = true;
            $rootScope.destFinal2 = true;
            $rootScope.destFinal3 = true;
            $rootScope.destFinal4 = true;
            $rootScope.destFinal5 = true;
            $scope.fini = true;

            $scope.regle = true;
            $scope.button = true;
            $scope.regle1 = false;
            $scope.regle2 = true;
            $scope.regle3 = true;
            $scope.regle4 = true;
            $scope.regle5 = true;
            $scope.regle6 = true;
            $scope.disNext = false;
            $scope.disBack = true;
            $scope.reglesIndications = true;
            $scope.indicationsRegles = true;
            $scope.indicationsRegles2 = true;
            $rootScope.gameOver = true;
            $rootScope.trouver = true;
            $rootScope.carte = false;
            $rootScope.score = 0;
            $scope.nextLevel = "Redemarrer";
            if ($rootScope.niveau === 1) {
                $scope.counter = 90;
            } else if ($rootScope.niveau === 2) {
                $scope.counter = 80;
            } else if ($rootScope.niveau === 3) {
                $scope.counter = 70;
            } else if ($rootScope.niveau === 4) {
                $scope.counter = 50;
            } else if ($rootScope.niveau === 5) {
                $scope.counter = 30;
            }
            $scope.ritme = 1000;
            $scope.newGame();
        };
    }
]);
