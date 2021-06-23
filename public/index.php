<?php

require __DIR__.'/../vendor/autoload.php';
require __DIR__.'/../app/bootstrap.php';

$app->route('GET /', array(new App\Http\Home, 'homeAction'));

$app->route('GET /bucket/@id:[0-9]', array(new App\Http\Bucket, 'viewAction'));
$app->route('GET /bucket/@id:[0-9]', array(new App\Http\Bucket, 'indexAction'));
$app->route('POST /bucket', array(new App\Http\Bucket, 'createAction'));
$app->route('PUT /bucket/@id:[0-9]', array(new App\Http\Bucket, 'updateAction'));
$app->route('DELETE /bucket/@id:[0-9]', array(new App\Http\Bucket, 'destroyAction'));

$app->route('POST /note', array(new App\Http\Note, 'createAction'));
$app->route('PUT /note/@id:[0-9]', array(new App\Http\Note, 'updateAction'));
$app->route('DELETE /note/@id:[0-9]', array(new App\Http\Note, 'destroyAction'));

$app->start();
