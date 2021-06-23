<?php

namespace App\Models;

use SleekDB\Store;
use SleekDB\Query;

/**
 *  Abstract Class for Stores
 *
 *
 *  @author Björn Hase
 *  @link https://gitea.tentakelfabrik.de/mITSM/feedback GitHub Repository
 *
 */
class ModelAbstract
{
    // store of model
    public $store;

    // name of store
    protected $name;

    // configuration of store
    protected $configuration = [
        'auto_cache' => true,
        'cache_lifetime' => null,
        'timeout' => 120,
        'primary_key' => '_id',
        'search' => [
            'min_length' => 2,
            'mode' => 'or',
            'score_key' => 'scoreKey',
            'algorithm' => Query::SEARCH_ALGORITHM['hits']
        ]
    ];

    /**
     *
     *
     */
    public function __construct()
    {
        $this->store = new Store($this->name, __DIR__.'/../../storage/database', $this->configuration);
    }
}