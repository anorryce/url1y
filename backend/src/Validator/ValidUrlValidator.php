<?php
namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

use Valitron\Validator as Valitron;

class ValidUrlValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint)
    {
        if (!$constraint instanceof ValidUrl) {
            throw new UnexpectedTypeException($constraint, ValidUrl::class);
        }

        // custom constraints should ignore null and empty values to allow
        // other constraints (NotBlank, NotNull, etc.) take care of that
        if (null === $value || '' === $value) {
            return;
        }

        if (!is_string($value)) {
            // throw this exception if your validator cannot handle the passed type so that it can be marked as invalid
            throw new UnexpectedValueException($value, 'string');
        }

    	$validator = new Valitron(['website'=>$value]);
    	$validator->rules(['urlActive'=>[['website']]]);
    	if(!$validator->validate()){
            $this->context->buildViolation($constraint->message)
                ->setParameter('%string%',$value)
                ->addViolation();
    	}
    }
}