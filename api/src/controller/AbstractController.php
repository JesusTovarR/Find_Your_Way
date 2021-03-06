<?php

namespace api\controller;


use Interop\Container\ContainerInterface;
use \Psr\Http\Message\ResponseInterface as Response;

abstract class AbstractController
{
    protected $container;

    /**
     * APIController constructor.
     * @param $container
     */
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function json_success(Response $response, $code, $content){
        $response = $response->withStatus($code)
            ->withHeader('Content-Type', 'application/json;charset=utf8');
        $response->getBody()->write($content);
        return $response;
    }

    public function json_error(Response $response, $code, $content  = "Error processing request"){
        $response = $response->withStatus($code)
            ->withHeader('Content-Type', 'application/json;charset=utf8');
        $response->getBody()->write(json_encode(["error"=>$content]));
        return $response;
    }


}
