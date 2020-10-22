<?php

namespace App\Entity;

use App\Repository\UrlRepository;
use App\Validator\Constraints as AppAssert;

use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

use App\Utils\ShortUrlGenerator;

/**
 * @ORM\Entity(repositoryClass=UrlRepository::class)
 * @ORM\HasLifecycleCallbacks()
 * @UniqueEntity(fields={"long_url"}, message="This url was already created!")
 * @UniqueEntity(fields={"short_url"}, message="This short url is already taken!")
 */
class Url
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=2048, nullable=false, unique=true)
     * @AppAssert\ValidUrl
     */
    private $long_url;

    /**
     * @ORM\Column(type="string", length=2048, unique=true)
     */
    private $short_url;

    /**
     * @ORM\Column(type="boolean", options={"default": 0})
     */
    private $private;

    /**
     * @ORM\Column(type="datetime")
     */
    private $create_date;

    /**
     * @ORM\Column(type="datetime")
     */
    private $update_date;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLongUrl(): ?string
    {
        return $this->long_url;
    }

    public function setLongUrl(string $long_url): self
    {
        $this->long_url = $long_url;

        return $this;
    }

    public function getShortUrl(): ?string
    {
        return $this->short_url;
    }

    /**
     * @ORM\PrePersist
     */
    public function setShortUrl()
    {
        $shortUrlGenerator = new ShortUrlGenerator();
        $this->short_url = $shortUrlGenerator->generateShortUrl();

        return $this;
    }

    public function getPrivate(): ?bool
    {
        return $this->private;
    }

    public function setPrivate(bool $private): self
    {
        $this->private = $private;

        return $this;
    }

    public function getCreateDate(): ?\DateTimeInterface
    {
        return $this->create_date;
    }

    /**
     * @ORM\PrePersist
     */
    public function setCreateDate()
    {
        $this->create_date = new \DateTime();
    }

    public function getUpdateDate(): ?\DateTimeInterface
    {
        return $this->update_date;
    }

    /**
     * @ORM\PreUpdate
     */
    public function setUpdateDate()
    {
        $this->update_date = new \DateTime();
    }
}
