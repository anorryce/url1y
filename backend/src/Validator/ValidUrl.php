<?php
namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class ValidUrl extends Constraint
{
    public $message = 'The string "%string%" is not an active url.';
}