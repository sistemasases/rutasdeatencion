




/* Funcionalidad de rutas de atencion svg */
async function rutesAttentionMovil(json) {
 
  let dimension,attetionAux;

  $('.arrows-lienzo').on('click' , function (event) {
      event.preventDefault();
      event.isPropagationStopped();


      let number = Number( $(this).attr('id').replace('arrows-','') )
      let iterador = 1;
    
    if ($('body').hasClass('active')) {

      if ($('#bread-1').hasClass('box-breadcrumbs-active')) { 
      dimension = $(this).find('text').text().toLowerCase() 
      attetionAux = null
      animateBackground(number,false,1,dimension,json)
      }
      else {
      attetionAux = $(this).find('text').text()
      attetionAux =  attetionAux.charAt(0).toLowerCase() + attetionAux.slice(1)
      funcionalityRute( json , false, dimension ,attetionAux , iterador);
      }

    }  
  })

}

/* animacion del personaje,ruta,fondo*/
function animateBackground(screen,bandAux,iterador, dimension , json) {

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
    funcionalityBrecumbs(screen)
    funcionalityRute(json ,true, dimension , null , iterador);
   
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
function funcionalityRute( json ,band , dimension , attetionAux , iterador ) {

      json.then( function (value) {
      
      if (band) {

      for (const attention of Object.keys(value[dimension]) ) {
      $('#arrows-'+iterador+'').show()
      let wordAttention = attention
      wordAttention = wordAttention.charAt(0).toUpperCase() +  wordAttention.slice(1);
      $('#arrows-'+iterador+' text').html(wordAttention)
      iterador++;

      }

      } 
      else { 
  
      for (const attention of Object.keys(value[dimension][attetionAux]) ) {
      $('#arrows-'+iterador+'').show()
      let wordAttention = attention
      wordAttention = wordAttention.charAt(0).toUpperCase() +  wordAttention.slice(1);
      $('#arrows-'+iterador+' text').html(wordAttention)
      iterador++;
      }

      }

      while (iterador < 8) {
      $('#arrows-'+iterador+'').hide()
      iterador++;
      }

      }).catch((err) => {
        
      console.log('ups, paso un error al insertar el texto' , err)

      });  
}