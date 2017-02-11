<?php
/**
 * Created by PhpStorm.
 * User: marco
 * Date: 13/12/16
 * Time: 16:34
 */
use api\AppInit;

use api\controller\UtilisateurController;
use api\controller\LieuxController;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Illuminate\Database\Capsule\Manager as DB;
require_once '../vendor/autoload.php';
require_once '../src/middleware/mapi.php';


AppInit::bootEloquent('../conf/conf.ini');

$configuration = [
    'settings'=>[
        'displayErrorDetails'=>true,
        'production'=>false],
];

$configuration['notAllowedHandler'] = function ($c) {
    return function ($request, $response, $methods) use ($c) {
        return $c['response']
            ->withStatus(405)
            ->withHeader('Allow', implode(', ', $methods))
            ->withHeader('Content-type', 'application/json')
            ->write(json_encode(["Message"=>'Method must be one of: ' . implode(', ', $methods)]));
    };
};

$configuration['notFoundHandler'] = function ($c) {
    return function ($request, $response){
        return $response->withStatus(404)
           ->withHeader('Content-type', 'application/json')
            ->write(json_encode(["Message"=>'URI not found']));
    };
};

$c = new \Slim\Container($configuration);

$c['view'] = function($c){
  $view = new \Slim\Views\Twig(__DIR__.'/backoffice/templates');

   return $view;
};
$app = new Slim\App($c) ;

$app->add(function ($rq, $rs, $next) {
    $rs = $rs->withHeader('Content-Type', 'text/html');
    return $next($rq, $rs);
});

$app->add(function ($rq, $rs, $next){
    $origin = $rq->getHeader('origin');
    if(empty($origin)){
        $origin='*';
    }
    $rs=$rs->withHeader('Access-Control-Allow-Origin', $origin);
    return $next($rq, $rs);
});

//creer d'une partie
$app->get('/partie/new',
function(Request $req, Response $resp, $args){
  return (new LieuxController($this))->newGame($req, $resp, $args);
})->setName('newGame');

//obtenir un lieu avec son id
$app->get('/lieu/{id}',
function (Request $req, Response $resp, $args){
  return (new LieuxController($this))->getLieuById($req, $resp, $args);
})->setName('lieu');

//obtenir la collection de lieux
$app->get('/lieux',
  function (Request $req, Response $resp, $args){
    return (new LieuxController($this))->getLieux($req, $resp, $args);
  })->setName('getAllLieux');

  //retourne toutes les destinations finales possibles
  $app->get('/destFinales',
  function (Request $req, Response $resp, $args){
    return (new LieuxController($this))->getDestFinale($req, $resp, $args);
  })->setName('getDestFinale');

  //Obtenir les indications de chaque lieu pour une partie /game/id_partie/indications?token{}
  $app->get('/game/{id_partie}/indications',
  function (Request $req, Response $resp, $args){
    return (new LieuxController($this))->getIndications($req, $resp, $args);
  })->setName('indications')
    ->add('checkToken');

    //Obtenir les coordonees de chaque lieu pour une partie /game/id_partie/coordonnees?token{}
    $app->get('/game/{id_partie}/coordonees',
    function (Request $req, Response $resp, $args){
        return (new LieuxController($this))->getCoordonees($req, $resp, $args);
    })->setName('coordones')
    ->add('checkToken');

  // Obtenir tous les indices pour une destination finale
  $app->get('/indices/{id}',
  function (Request $req, Response $resp, $args){
    return (new LieuxController($this))->getIndices($req, $resp, $args);
  })->setName('indices');

  //obtenir un chemin
  $app->get('/game/{id_partie}/chemin',
  function  (Request $req, Response $resp, $args){
    return (new LieuxController($this))->getChemin($req, $resp, $args);
  })->setName('chemin')
    ->add('checkToken');

//obtenir la destination finale d'un chemin/d'une partie
  $app->get('/game/{id_partie}/destination',
  function  (Request $req, Response $resp, $args){
    return (new LieuxController($this))->getDestByChemin($req, $resp, $args);
  })->setName('destinationByChemin')
    ->add('checkToken');

// Obtenir tous les indices pour une destination finale indices/{id_partie}/indices?token=
$app->get('/game/{id_partie}/indices',
    function  (Request $req, Response $resp, $args){
        return (new LieuxController($this))->getDestIndicesByChemin($req, $resp, $args);
    })->setName('destinationIndicesByChemin')
    ->add('checkToken');

//retourner tous les utilisateurs
$app->get('/utilisateurs',
    function (Request $req, Response $resp, $args){
        return (new UtilisateurController($this))->getUrilisateurs($req, $resp, $args);
    })->setName('getUtilisateurs');

//retourne un utilisateur
$app->get('/utilisateurs/{id}',
    function (Request $req, Response $resp, $args){
        return (new UtilisateurController($this))->getUrilisateurById($req, $resp, $args);
    })->setName('getUtilisateurById');

    //ajout d'un nouvel utilisateur
    $app->post('/newUser',
      function(Request $req, Response $resp, $args){
        return (new UtilisateurController($this))->addUser($req, $resp, $args);
      })->setName('addUser');

    //formulaire pour ajouter un utilisateur
    $app->get('/admin/formAjoutUtilisateur',
    function(Request $req, Response $resp, $args){
      return (new UtilisateurController($this))->renderFormAjoutUtilisateur($req, $resp, $args);
    })->setName('renderFormAjoutUtilisateur');

    //authentification d'un user
      /*$app->get('/authentification',
      function (Request $req, Response $resp, $args){
        return (new UtilisateurController($this))->checkUser($req, $resp, $args);
      })->setName('checkUser');*/


//Obtenir les 5 lieux d'une partie /game/{id_partie}/lieux_partie?token={}
  $app->get('/game/{id_partie}/lieux_partie',
  function (Request $req, Response $resp, $args){
    return (new LieuxController($this))->getLieuxPartie($req, $resp, $args);
  })->setName('lieux_partie')
    ->add('checkToken');

//Obtenir la marge d’erreur possible entre le clic et les coordonnées d’une DF /game/{id_partie}/distanceDF?token=
    $app->get('/game/{id_partie}/distanceDF',
    function (Request $req, Response $resp, $args){
      return (new LieuxController($this))->getDistanceDF($req, $resp, $args);
    })->setName('distanceDF')
      ->add('checkToken');

$app->run();
