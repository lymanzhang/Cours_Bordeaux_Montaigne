// ----------------------------------------------
var canvas;
// Variable qui stocke le modèle 
var classifier;
// Image à traiter
var img;

// ----------------------------------------------
// Démarrage du sketch
function setup() 
{
	// Imprime dans la console la version de ml5.js
	console.log("ml5 version : "+ml5.version)
	// Création de l'élément canvas, taille 540 x 480 pixels
	canvas = createCanvas(540,480);
	canvas.drop(gotFile, dropped);
	// Création du modèle
	// Le deuxième paramètre est une fonction appelé lorsque le modèle est initialisé
	classifier = ml5.imageClassifier('MobileNet', modelLoaded);	
	// Fond du canvas
	background(220);
}

// ----------------------------------------------
// Dessin sur l'élément <canvas>
function draw() 
{
}

// ----------------------------------------------
function drawText(s,x,y)
{
	fill(0);
	rect(0,y-10,width,y+10);
	fill(255);
	text(s,x,y+10);
}

// ----------------------------------------------
// Fonction appelée lorsque le modèle a été chargé
// (peut prendre quelques secondes)
function modelLoaded()
{
	console.log("Modèle chargé !!");
}

// ----------------------------------------------
function imageReady()
{
	background(0);
	img.hide();
	imageFit(img);
	// On la fait passer à la moulinette avec la fonction classify
	classifier.classify(img, gotResults);
}

// ----------------------------------------------
function gotResults(error, results)
{
	if (error)
	{
		console.error(error);
	}
	else
	{
		console.log(results);	
		drawText(results[0].label,10,480-20);
	}
}

// ----------------------------------------------
// Fonction appelée lorsque le fichier est déposé
function dropped()
{
}

// ----------------------------------------------
// Fonction appelée lorsque le fichier déposé est disponible
function gotFile(file)
{
	img = createImg(file.data, imageReady);
//	image(img,0,0,width,height);
}

// ----------------------------------------------
function imageFit(img)
{
	let ratioCanvas = width / height;
	let ratioImage = img.width / img.height;
	let imgWidth, imgHeight;
	// Canvas en mode paysage
	if (ratioCanvas >= 1)
	{
		if (ratioImage<1)
		{
			imgHeight = height;
			imgWidth = ratioImage * img.width;
			image(img,0,0,imgWidth,imgHeight); 
		}
		else
		{
			imgWidth = width;
			imgHeight = imgWidth / ratioImage;
			image(img,0,0,imgWidth,imgHeight); 
		}
//		console.log("imageFit("+imgWidth+","+imgHeight+")");
	}
	// Mode portrait
	else
	{

	}
	
}
