<?php

namespace App\Flight;

use Flight;

/**
 * abstract FlightAbstract get instance of flight engine
 *
 *  
 * @author Björn Hase
 * @license http://opensource.org/licenses/MIT The MIT License
 *
 */
abstract class FlightAbstract
{
    /** object of flight */
    protected $app;

    /**
     *  getting object of flight
     *
     */
    public function __construct()
    {
        $this->app = Flight::app();
    }
}
