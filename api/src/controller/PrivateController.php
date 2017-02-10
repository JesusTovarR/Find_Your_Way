<?php

namespace api\controller;

use api\model\Lieu;
use api\model\Partie;
use api\model\Chemin;
use api\util\Util;
use api\controller\AbstractController;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PrivateController extends AbstractController
{

    public function __construct($var)
    {
        $this->container = $var;
    }

    public function addLieu(Request $request, Response $response, $args){
      $lieu = new Lieu;
      if(isset($request->getParsedBody()['lat']) &&
         isset($request->getParsedBody()['lng']) &&
         isset($request->getParsedBody()['indication']) &&
         isset($request->getParsedBody()['description'])){
           $lieu->nom_lieu = filter_var($request->getParsedBody()['nom_lieu'], FILTER_SANITIZE_STRING);
           $lieu->lat = filter_var($request->getParsedBody()['lat'], FILTER_SANITIZE_NUMBER_FLOAT);
           $lieu->lng = filter_var($request->getParsedBody()['lng'], FILTER_SANITIZE_NUMBER_FLOAT);
           $lieu->indication = filter_var($request->getParsedBody()['indication'], FILTER_SANITIZE_STRING);
           $lieu->description = filter_var($request->getParsedBody()['description'], FILTER_SANITIZE_STRING);
           $lieu->dest_finale = 0;
           $lieu->save();
           $response = $this->json_success($response, 201, $lieu->toJson());
      }else{
         $response = $this->json_error($response, 500, "erreur lors de la creation de la ressource");
      }
      return $response;
    }


    public function addIndice(Request $request, Response $response, $args){
      $lieu = Lieu::select()->where('id', '=', $args['id'])->firstOrFail();
      $indice = filter_var($request->getParsedBody()['indice'], FILTER_SANITIZE_STRING);
      if($lieu->indice1 == ''){
        $lieu->indice1 = $indice;
      }elseif($lieu->indice2 == ''){
        $lieu->indice2 = $indice;
      }elseif($lieu->indice3 == ''){
        $lieu->indice3 = $indice;
      }elseif($lieu->indice4 == ''){
        $lieu->indice4 = $indice;
      }elseif($lieu->indice5 == ''){
        $lieu->indice5 = $indice;
        $lieu->dest_finale = 1;
      }else{
        $lieu->dest_finale = 1;
        $lieu->save();
        $response = $this->json_error($response, 500, "supprimer un indice pour en ajouter un nouveau");
        return $response;
      }
      $lieu->save();
      $lieu->dest_finale = $lieu->isDestFinale();
      $lieu->save();
      $response = $this->json_success($response, 201, $lieu->toJson());
      return $response;
    }

    //modification d'un indice
    public function modifierLieu(Request $request, Response $response, $args){
try{
        $lieu = Lieu::select()->where('id','=',$args['id'])->firstOrFail();
        $lieu->nom_lieu = filter_var($request->getParsedBody()['nom_lieu'], FILTER_SANITIZE_STRING);
        $lieu->lat = filter_var($request->getParsedBody()['lat'], FILTER_SANITIZE_STRING);
        $lieu->lng = filter_var($request->getParsedBody()['lng'], FILTER_SANITIZE_STRING);
        $lieu->indication = filter_var($request->getParsedBody()['indication'], FILTER_SANITIZE_STRING);
        $lieu->description = filter_var($request->getParsedBody()['description'], FILTER_SANITIZE_STRING);
        $lieu->image = filter_var($request->getParsedBody()['image'], FILTER_SANITIZE_STRING);
        $lieu->indice1 = filter_var($request->getParsedBody()['indice1'], FILTER_SANITIZE_STRING);
        $lieu->indice2 = filter_var($request->getParsedBody()['indice2'], FILTER_SANITIZE_STRING);
        $lieu->indice3 = filter_var($request->getParsedBody()['indice3'], FILTER_SANITIZE_STRING);
        $lieu->indice4 = filter_var($request->getParsedBody()['indice4'], FILTER_SANITIZE_STRING);
        $lieu->indice5 = filter_var($request->getParsedBody()['indice5'], FILTER_SANITIZE_STRING);
        $lieu->save();
        $response = $this->json_success($response, 201, $lieu->toJson());
      }catch(ModelNotFoundException $e) {
          $response = $response->withStatus(404)->withHeader('Content-type', 'application/json');
          $errorMessage = ["error" => "id not found" ];
          $response->getBody()->write(json_encode($errorMessage));
      }
        return $response;
    }


    //suppression d'un lieu lieu/{id}/deleteLieu
    public function deleteLieu(Request $request, Response $response, $args){

      try{
      //je supprime un chemin
      $chemin = Chemin::select()->where('id_dest_finale','=',$args['id'])
        ->orWhere('id_lieu1','=',$args['id'])
        ->orWhere('id_lieu2','=',$args['id'])
        ->orWhere('id_lieu3','=',$args['id'])
        ->orWhere('id_lieu4','=',$args['id'])
        ->orWhere('id_lieu5','=',$args['id'])->get();

      //je supprime donc une partie en supprimant mon chemin plus haut
      foreach($chemin as $value){
        $partie = Partie::select()->where('id_chemin','=',$value->id)->firstOrFail();
        $partie->delete();
        $value->delete();
      }

      //enfin, je supprime un lieu
      $lieu = Lieu::select()->where('id','=',$args['id'])->firstOrFail();
      $lieu->delete();

      $response = $this->json_success($response, 201, "deletion done");
      return $response;
    }catch(ModelNotFoundException $e) {
        $response = $response->withStatus(404)->withHeader('Content-type', 'application/json');
        $errorMessage = ["error" => "id not found" ];
        $response->getBody()->write(json_encode($errorMessage));
    }
  }

  public function adminLieu(Request $request, Response $response, $args){
    $lieux = Lieu::select()->get();
    $tabLieux = $lieux->toArray();
   return $this->container->view->render($response, 'lieux.html.twig',  ['tabLieux' => $tabLieux]);
  }

  public function renderFormLieu(Request $request, Response $response, $args){
    $lieu = Lieu::select()->where('id', '=', $args['id'])->firstOrFail();
    $lieu = $lieu->toArray();
    return $this->container->view->render($response, 'lieu.html.twig',  ['lieu' => $lieu]);
  }

  // formulaire pour l'ajout d'un lieu
  public function renderFormAjoutLieu(Request $request, Response $response, $args){
    return $this->container->view->render($response, 'ajoutLieu.html.twig');
  }
}
