<?php

// adding functions
require_once(__DIR__.'/Flight/Functions.php');

// adding env
$env = Dotenv\Dotenv::createImmutable(__DIR__.'/..');
$env->load();

// display all errors if debug is true
if (getenv('DEBUG') === true) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
}

// create app
$app = Flight::app();

// setting view path
$app->set('flight.views.path', __DIR__.'/../resources/views');

// adding blade for templates
Flight::register('view', 'Jenssegers\Blade\Blade', [ $app->get('flight.views.path'),  __DIR__.'/../storage/cache']);
Flight::map('render', function($view, $data) {
    echo Flight::view()->make($view, $data);
});

// setting path
$app->set('basePath', __DIR__.'/../');
$app->set('publicPath', __DIR__.'/../public');
$app->set('storagePath', __DIR__.'/../storage');
