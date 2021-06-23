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
class Home extends FlightAbstract
{
    public function indexAction()
    {
        

        $this->app->render('index', [

        ]);
    }
}