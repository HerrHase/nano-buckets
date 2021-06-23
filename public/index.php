<?php

require __DIR__.'/../vendor/autoload.php';
require __DIR__.'/../app/bootstrap.php';

$app->route('GET /', array(new App\Controllers\Index, 'indexAction'));

$app->route('GET /api/bucket', array(new App\Controllers\Bucket, 'indexAction'));
$app->route('POST /api/bucket', array(new App\Controllers\Bucket, 'createAction'));
$app->route('POST /api/bucket/[:id]', array(new App\Controllers\Bucket, 'updateAction'));
$app->route('DELETE /api/bucket/[:id]', array(new App\Controllers\Bucket, 'destroyAction'));

$app->route('GET /api/note/:bucket_id', array(new App\Controllers\Note, 'indexAction'));

$app->start();
