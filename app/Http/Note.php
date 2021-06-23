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
class Note extends FlightAbstract
{
    /**
     *
     *  @param  integer $id 
     *
     */
    public function viewAction($id)
    {
        $this->app->render('bucket', [
            'id' => $id
        ]);
    }

    public function indexAction($bucketId)
    {
        $noteStore = new Note();
        $notes = $noteStore->findBy();

        $this->app->json([
            'data' => $notes,
            'page' => $page
        ]);
    }

    public function createAction($bucketId)
    {
        $result = [
            'success' => false
        ];

        $noteStore = new Note();

        $this->app->json([
            'data' => $notes,
        ]);
    }
}