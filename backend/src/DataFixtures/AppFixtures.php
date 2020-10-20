<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    public function load(ObjectManager $manager): void
    {
        $this->loadUsers($manager);
	}

	private function loadUsers(ObjectManager $manager): void
    {
        $userAdmin = new User();
        $userAdmin->setName('tony');
        $userAdmin->setSurname('master');
        $userAdmin->setUsername('tony_admin');
        $userAdmin->setEmail('tony_admin@symfony.com');
        $userAdmin->setRoles(['ROLE_ADMIN']);
        $encodedPassword = $this->passwordEncoder->encodePassword($userAdmin, 'admin');
        $userAdmin->setPassword($encodedPassword);
        $manager->persist($userAdmin);

        $manager->flush();
    }
}
