<?php

namespace App\Models;

/**
 *  Store for Courses
 *
 *
 *  @author Björn Hase
 *  @link https://gitea.tentakelfabrik.de/mITSM/feedback GitHub Repository
 *
 */
class Bucket extends ModelAbstract
{
    // name of store
    protected $name = 'buckets';

    public function findByVisiblity($visiblity)
    {
        return $this->store->findBy(
            [ 'visiblity' => $visiblity ],
            [ 'created_at' => 'ASC' ],
            100
        );
    }
}