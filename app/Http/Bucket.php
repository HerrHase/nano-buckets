<?php

namespace App\Http;

use Rakit\Validation\Validator;
use App\Flight\FlightAbstract;

use App\Models\Bucket;
use Carbon\Carbon;

/**
 *
 *
 *
 *
 *  @author Björn Hase
 *  @link https://gitea.tentakelfabrik.de/mITSM/feedback GitHub Repository
 *
 *
 */
class Bucket extends FlightAbstract
{
    public function viewAction($id)
    {
        $this->app->render('bucket', [
            'id' => $id
        ]);
    }

    public function indexAction($id, $visibilty, $page)
    {
        $bucketStore = new Bucket();
        $publicBuckets = $bucketStore->findBy();

        $this->app->json([
            'publicBuckets' => $publicBuckets
        ]);
    }
}