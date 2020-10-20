<?php

namespace App\Controller;

use App\Entity\Url;

use App\Form\UrlType;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException ;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class UrlController extends AbstractController
{
    /**
     * @Route("/", name="url_create", methods="POST")
     * @return JsonResponse
     */
    public function create(Request $request, SerializerInterface $serializer): JsonResponse
    {
    	$em = $this->getDoctrine()->getManager();

    	$url = $em->getRepository(Url::class)
            ->findOneBy(['long_url'=>$request->request->get('long_url'),'private'=>0]);

        if(!$url){
	        $url = new Url();
	        $url->setPrivate(false);

	        $form = $this->createForm(UrlType::class, $url);
	        $form->handleRequest($request);

	        if ($form->isValid()) {
	            $em->persist($url);
	            $em->flush();
	        } else{
	        	throw new BadRequestHttpException(dump((string) $form->getErrors(true, false)));
	        }
        }

        return $this->view($url->getShortUrl(), $serializer);
    }

    /**
     * @Route("/view/{shortUrl}", name="url_view", methods="GET")
     * @param string $shortUrl
     * @param SerializerInterface $serializer
     * @return JsonResponse
     */
    public function view(string $shortUrl, SerializerInterface $serializer): JsonResponse
    {
        $url = $this->getDoctrine()
            ->getRepository(Url::class)
            ->findOneBy(['short_url'=>$shortUrl,'private'=>0]);

        if($url){
        	$serializedUrl = $serializer->serialize($url,'json');

        	return JsonResponse::fromJsonString($serializedUrl);
        }

    	throw new BadRequestHttpException('Could not find url with '.$shortUrl);
    }

    /**
     * @Route("/edit/{shortUrl}", name="url_edit", methods="PUT")
     * @param Request $request
     * @param string $shortUrl
     * @param SerializerInterface $serializer
     * @return JsonResponse
     */
    public function edit(Request $request, string $shortUrl, SerializerInterface $serializer): JsonResponse
    {
    	$em = $this->getDoctrine()->getManager();
        $url = $em->getRepository(Url::class)
            ->findOneBy(['short_url'=>$shortUrl,'private'=>0]);

        if($url){
        	$form = $this->createForm(UrlType::class, $url, ['method' => 'PUT']);
	        $form->handleRequest($request);

	        if ($form->isValid()) {
	            $em->persist($url);
	            $em->flush();

	            return $this->view($url->getShortUrl(), $serializer);
	        } else{
	        	throw new BadRequestHttpException(dump((string) $form->getErrors(true, false)));
	        }
        }

    	throw new BadRequestHttpException('Could not find url with '.$shortUrl);
    }

    /**
     * @Route("/delete/{shortUrl}", name="url_delete", methods="DELETE")
     * @param string $shortUrl
     * @param SerializerInterface $serializer
     * @return JsonResponse
     */
    public function delete(string $shortUrl, SerializerInterface $serializer): JsonResponse
    {
    	$em = $this->getDoctrine()->getManager();
        $url = $em->getRepository(Url::class)
            ->findOneBy(['short_url'=>$shortUrl,'private'=>0]);

        if(!$url){
        	throw new BadRequestHttpException('Could not find url with '.$shortUrl);
        }

    	$em->remove($url);
        $em->flush();

        return JsonResponse::fromJsonString($serializer->serialize('Url Deleted','json'));
    }

    /**
     * @Route("/{shortUrl}", name="url_redirect", methods="GET")
     */
    public function redirectUrl(string $shortUrl): Response
    {
        
        $url = $this->getDoctrine()
            ->getRepository(Url::class)
            ->findOneBy(['short_url'=>$shortUrl]);

        if($url){
        	return $this->redirect($url->getLongUrl());
        }

    	throw new BadRequestHttpException('Invalid Data');
    }
}
