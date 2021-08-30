


/* Funcionalidad de rutas de atencion svg */
async function rutesAttentionMovil(json) {
 
  let dimension,attetionAux , entity;


  $('body').attr('title',0)

  $('.arrows-lienzo').on('click' , function (event) {
      event.preventDefault();
      event.isPropagationStopped();

      let iterador = 1;

      //sacar un numero al dar click en la felchita
      dimensionNav = $(this).parent()
      navsInDimension = dimensionNav.find('.arrows-lienzo')
      index = navsInDimension.index(this)

      //sacar el numero de la capa actual
      let indexCap = $('body').attr('title')

    if ($('body').hasClass('active')) {

      //si esta activa la clase del brecumbs home, guarda el numero de la dimension precionada y activa la animacion
      if ($('#bread-1').hasClass('box-breadcrumbs-active')) { 
    
      dimension = index
      attetionAux = null
      animateBackground((index+1),false,1,dimension,json, Number(indexCap))
      }
      else {
      // guarda el index de la flecha en la capa 1
      if ( Number(indexCap) === 1) {
      attetionAux = index
      entity = 0
      }

     // guarda el index de la flecha en la capa 2
      if ( Number(indexCap) === 2 ) {
      entity = index
      }

      //inserta los nombres correpondientes a cada capa donde este
      funcionalityRute( json , dimension ,attetionAux , entity, iterador , Number(indexCap))
      }

    }
    
    //incrementar el numero de la capa de donde se encontraba
    $('body').attr('title', Number( ($('body').attr('title')))+1)

  })

}

/* animacion del personaje,ruta,fondo*/
function animateBackground(screen,bandAux,iterador, dimension , json , indexCap) {

  let sizeScreenWidth  = $(window).width()
  let sizeScreen = 0;
  let increase = 0;
  let increaseAux = 0;
  bandArrow = true
  endTime = true

  //evitar usar los escuchas mientras se hace la animacion
  $('body').removeClass('active')

  const timer = setInterval( function () {
   
   //si el tamaño de pantalla es superado habra acaba la animacion
   if (sizeScreen < sizeScreenWidth*screen) {
   $('body,html').css('background-position-x',''+ increase +'%')

   //animacion de la ruta
   if ( increaseAux <= 200 &&  bandArrow) {
   $('.lienzo').css('right', ''+ (increaseAux+10) +'%')
   }else if (increaseAux == 203) {
   increaseAux = -50;
   endTime  =  false
   bandArrow = false
   }else if (sizeScreen > (sizeScreenWidth*screen-84)) {
   endTime = true
   $('.lienzo').css('right', ''+ (increaseAux+7) +'%')
   }

   //incrementos de las variables de la animacion 
   if ( dimension != 'individual' && sizeScreenWidth  < 374
        || sizeScreenWidth >= 375) {
   sizeScreen += 10
   }else {
   sizeScreen += 8
   }

   if (endTime) {
   increaseAux += 7;
   }

   increase += iterador;

   }
   else {
     bandAux = true;
   }

  
   if(bandAux) {
    clearInterval(timer)
    bandAux = null
    sizeScreen = 0;
    increase = 0;
    increaseAux = 0;
    bandArrow = null
    endTime = null
    $('body').addClass('active')
    $('.detonating-question-box').show()
    funcionalityBrecumbs(screen)
    funcionalityRute(json , dimension , 0 , 0 , iterador , indexCap);
   
   }

  },100)

  return timer;


}


/* Quitar la clase activa en el brecumbs */
function funcionalityBrecumbs(number) {

  let aux = ['a','div','span']

       //quitar la clase activa  
      $('.box-breadcrumbs').each((index,value) => {

        if ( $(value).hasClass('box-breadcrumbs-active') ) {
           for (const i of aux) {
             $(value).find(i).removeClass('active')
             $('#bread-'+ (number+1) +'').find(i).addClass('active')
           }

           $(value).removeClass('box-breadcrumbs-active')
           $(value).find('a').attr('style',' ')


           $('#bread-'+ (number+1) +'').css('display','inline-block')
           $('#bread-'+ (number+1) +'').addClass('box-breadcrumbs-active')
        }

      })
}

/* poner y colocar los nodos de la dimension precionada  */
function funcionalityRute( json , dimension , attetionAux , entity, iterador, indexCap ) {

      json.then( function (value) {
      
      //recorrer la capas internas del json por dimension, a expecion de la capa mayor  
      try {

      objectJson = [Object.keys((Object.entries(value)[dimension])[1]),Object.keys(Object.entries((Object.entries(value)[dimension])[1])[attetionAux][1]),Object.keys((Object.entries(Object.entries((Object.entries(value)[dimension])[1])[attetionAux][1])[entity])[1])]

      }catch (err) {
       console.log('la instancia del json selecionada, esta vacia o le faltan componentes' ,err)
       objectJson = [Object.keys((Object.entries(value)[dimension])[1])]
      }     

      //insertar el texto de las llaves del json al svg
      for (const  attention of objectJson[indexCap] ) {
      $('#arrows-'+iterador+'').show()
      $('#arrows-'+iterador+' text').html(fitTextInSvg(attention,iterador))
      iterador++;
      }

      //apagar las felchas que no son utilizadas
      while (iterador < 8) {
      $('#arrows-'+iterador+'').hide()
      iterador++;
      }


      }).catch((err) => {
        
      console.log('ups, paso un error al insertar el texto' , err)

      });  
}


/* ajustar el texto que sale en las flechas */
function fitTextInSvg(text,index) {

  //si encuentra un caracter mayusculaa, agrega un espacios antes
  let textNew = ''
  for (const i of text) {
    if (i == i.toUpperCase() ) {
    textNew += ' ' + i
    }
    else {
    textNew += i
    }
  }
  
  //si el tamano de la palabra es mayor que 10 caracteres, se le reduce el tamano
  if (textNew.length > 10) {
  $('#arrows-'+index+' text').attr('font-size', '7')
  }

  return textNew.charAt(0).toUpperCase() + textNew.slice(1) 
  
}