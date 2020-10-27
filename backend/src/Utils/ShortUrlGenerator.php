<?php

namespace App\Utils;


class ShortUrlGenerator implements ShortUrlGeneratorInterface
{
	private $maxShortUrlLength;
	private $minShortUrlLength;

	public function __construct(){
		$this->maxShortUrlLength = 9;
		$this->minShortUrlLength = 5;
	}

	private function createUniqueRandomStringBetweenMaxAndMin(): string
	{
    	// TODO: Collision is possible with the following method
    	// of creating a random string between max and min values.
    	// As a backup this needs to be used with a check to see 
    	// if this is truly unique. If not unique, recreate.
    	$stringLength = rand($this->minShortUrlLength, $this->maxShortUrlLength);
		return substr(md5(uniqid(mt_rand(), true)), 0, $stringLength);
	}

    public function generateShortUrl()
    {
       	return $this->createUniqueRandomStringBetweenMaxAndMin();
    }
}
