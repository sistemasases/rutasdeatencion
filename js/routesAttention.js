


/* Funcionalidad de rutas de atencion svg */
function rutesAttentionMovil(json) {
 
  let dimension,attetionAux , entity;
  let sizeScreenWidth  = 376

  $('body').attr('title',0)

  $('.arrows-lienzo').on('click' , function (event) {
      event.preventDefault();
      event.isPropagationStopped();

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
      attetionAux = 0
      entity = 0
      }
      
      // guarda el index de la flecha en la capa 1
      if ( Number(indexCap) === 1) {
      attetionAux = index
      entity = 0
      }

      // guarda el index de la flecha en la capa 2
      if ( Number(indexCap) === 2 ) {
      entity = index
      }

      if (!$('#bread-4').hasClass('box-breadcrumbs-active')) {
      Promise.all([ animateBackground(false,sizeScreenWidth) ,
      animateRute(false,sizeScreenWidth , (index+1) , json, dimension, attetionAux ,entity , indexCap)])
      
      //incrementar el numero de la capa de donde se encontraba
      $('body').attr('title', Number( ($('body').attr('title')))+1)
      $('#arrows-1').attr('title', dimension + ',' + attetionAux + ',' + entity)
      }
      else {
        funcionalityInfoContent( json , dimension , attetionAux , entity , index)
      }

    }
    

  })

}


/* animacion del fondo*/
function animateBackground(band,sizeScreenWidth) {

  //let sizeScreenWidth  = $(window).width()
  let sizeScreen = 0;
  let increase = 0;

  //evitar usar los escuchas mientras se hace la animacion
  $('body').removeClass('active')

  const timer = setInterval( function () {
   
   //si el tamaño de pantalla es superado habra acaba la animacion
   if (sizeScreen < sizeScreenWidth*2) {
   $('body,html').css('background-position-x',''+ increase +'%')
   increase += 1;
   sizeScreen += 10;
   }
   else {
   band = true;
   }

   if(band) {
    clearInterval(timer)
    band = null
    sizeScreen = 0;
    increase = 0;
    $('body').addClass('active')
   }
  
  },100)

  return timer;

}


/* animacion de la ruta */
function animateRute(band,sizeScreenWidth,screen,json,dimension, attetionAux,entity,indexCap) {

   //variables locales
   let sizeScreen = 0;
   let increase = 0;
   let timeHideRute = ((sizeScreenWidth*2)*50)/100;
   let timeShowRute = ((sizeScreenWidth*2)*79)/100;
   bandAux = true
   bandBrecumbs = true

   //apagar la preguntaa detonante
   $('.detonating-question-box').fadeIn()

   var ruteAnimate = setInterval( function () {
   
     if (sizeScreen < sizeScreenWidth*2) {
     
     //mover el svg hacia fuera de la pantalla
     if (sizeScreen <= timeHideRute) {
     $('.lienzo').css('right', ''+ increase +'%')
     increase += 6;
     }

     //poner svg al inicio y actulizar su contenido
     if (sizeScreen > timeHideRute && bandAux) {
     bandAux = false
     increase = -90
     }

     //volver a mostrar el svg con los cambios nuevos
     if (sizeScreen >= timeShowRute) {
     if ( bandBrecumbs ) {  
     bandBrecumbs = false  
     funcionalityAskDetoting(indexCap)
     funcionalityBrecumbs()
     }

     funcionalityRute(json , dimension , attetionAux , entity , 1 , indexCap);
     $('.lienzo').css('right', ''+ increase +'%')
     increase += 6
     }
     
     sizeScreen += 10
     }
     else {
     band = true
     }

     if (band) {
     clearInterval(ruteAnimate)
     }
     
   }, 100)

   return ruteAnimate
}

/* Quitar la clase activa en el brecumbs */
function funcionalityBrecumbs() {

  let aux = ['a','div','span']
  let indexCap = Number($('body').attr('title'))

       //quitar la clase activa  
      if (indexCap < 4) { 

      $('.box-breadcrumbs').each((index,value) => {

        if ( $(value).hasClass('box-breadcrumbs-active') ) {
           for (const i of aux) {
             $(value).find(i).removeClass('active')
             $('#bread-'+ (indexCap+1) +'').find(i).addClass('active')
           }

           $(value).removeClass('box-breadcrumbs-active')
           $(value).find('a').attr('style',' ')


           $('#bread-'+ (indexCap+1) +'').css('display','inline-block')
           $('#bread-'+ (indexCap+1) +'').addClass('box-breadcrumbs-active')
         
        }

      })
      
      }
}

/* poner y colocar los nodos de la dimension precionada  */
function funcionalityRute( json , dimension , attetionAux , entity, iterador, indexCap ) {

      json.then( function (value) {
      
      //recorrer la capas internas del json por dimension, a expecion de la capa mayor  
      try {

      objectJson = [(Object.entries((Object.values(value)[dimension].TiposDeAtencion))),Object.entries((Object.entries((Object.values(value)[dimension].TiposDeAtencion))[attetionAux])[1].Entidades),Object.entries((((Object.entries((Object.entries((Object.values(value)[dimension].TiposDeAtencion))[attetionAux])[1].Entidades))[entity])[1] ).Atenciones)]

      }catch (err) {
       console.log('la instancia del json selecionada, esta vacia o le faltan componentes' ,err)
       objectJson = [Object.keys((Object.entries(value)[dimension])[1])]
      }     

      //insertar el texto de las llaves del json al svg
      for (const  attention of objectJson[indexCap]) {
      $('#arrows-'+iterador+'').show()
      $('#arrows-'+iterador+' text').html(attention[1].name)
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

function funcionalityAskDetoting(index) {

  let text = ['atención', 'entidades' , 'atenciones']

  //mostrar la pregunta
  $('.detonating-question-box').fadeIn()
  //$('.detonating-question-box').delay(5000).fadeOut()
  
  //insertar el texto dependiendo de la capa
  $('.detonating-question-box').find('.detonating-question-text').html(' ¿Qué tipo de '+text[index]+' estás buscando?')
}

function funcionalityInfoContent( json , dimension , attetionAux , entity , index ) {

     json.then( function (value) {

     //mostrar caja texto
     $('#information').fadeIn()

     //ocultar
     $('#page-inicio').hide()
     $('.detonating-question-box').hide()

     //insertar el titulo
     $('.title-content-info').find('.title-info').html((((Object.entries((((Object.entries((Object.entries((Object.values(value)[dimension].TiposDeAtencion))[attetionAux])[1].Entidades))[entity])[1] ).Atenciones))[index])[1]).name)

     //insertar el contenido
     $('.content-text-info').find('.content-text').html((((Object.entries((((Object.entries((Object.entries((Object.values(value)[dimension].TiposDeAtencion))[attetionAux])[1].Entidades))[entity])[1] ).Atenciones))[index])[1]).descripcion)
     

     }).catch((err) => {
        
      console.log('ups, paso un error al insertar el texto' , err)
 
     });
}
