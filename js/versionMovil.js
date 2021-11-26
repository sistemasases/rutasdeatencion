/**
* Management - Funcionalidad de la capa de informacion
* @author Cristian Duvan Machado Moquera
* @copyright 2021 Cristian Duvan Machado Mosquera <cristiankm4088@gmail.com>
* @license  http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
*/


function screenResponsiveWebDesing(json) {

     /*  VARIABLES  */
     let sizeScreenWidth  = $(window).width()
     let sizeScreenHeigth = $(window).height()
     
    // if ( sizeScreenWidth <= 1050 &&  sizeScreenWidth < sizeScreenHeigth) {

     //mostrar el contenido de mayor informacion
     $('#mayorInformacion').on('click' , (event)=> {
       event.preventDefault();
       $('.content-info').animate({height: '7.3em'})
       $('.content-info').css({
        'display': 'grid'
       })
     })
     
     //quitar la animacion del footer
     $('#close-footer').on('click', (event) => {
      event.preventDefault();
      $('.content-info').animate({height: '0em'})
     })

     //mostrar el breadcumbs de inicio
     $('#bread-1').css('display','inline-block')
     $('.content-text-botton-box').css('display','none')
     $('.detonating-question-box').hide()
     $('body').addClass('active')

     //Funcionalidad de las flechas
     breadcrumbs_funcionality(json)


     //}

    
}


async function breadcrumbs_funcionality(json) {

    let arrows;
    let aux = ['a','div','span']
    let breadcrumbs_array = []
    
    $('.box-breadcrumbs').each((index,value)=> {
    breadcrumbs_array.push(value)
    })

    $('.box-breadcrumbs').on('click', function(event) {
       event.preventDefault();
       event.isPropagationStopped();
   
       arrows = this;

       //sacar un numero al dar click en el brecumbs
       dimensionNav = $(this).parent()
       navsInDimension = dimensionNav.find('.box-breadcrumbs')
       index = navsInDimension.index(this)

       $('.boton-info').each(function (index, value) {
           $(value).removeClass('active')
       })


       //
       $('#information').fadeOut()
       $('#page-inicio').show()
       $('.content-text-botton-box').css('display','none')
       $('.boton-info').off('click')

      if ($('body').hasClass('active')) {
       //agregar la clase activa a la flecha selecionada
       if ( $(arrows).hasClass('box-breadcrumbs-active') === false ) {
           
          //quitar la clase activa y agregarla a la selecionada
          $('.box-breadcrumbs').each((index,value)=> {

            //si el href es igual al selecionado se le agrega la clase active
            if ($(value).find('a').attr('href') === $(arrows).find('a').attr('href') ) {
           
            //agregar el fondo de color para la primer flecha  
            ($(value).find('a').attr('href') === '#home')?  $(value).find('a').css({
            'background-color': '#2271b3'
            }):false 
            $(arrows).addClass('box-breadcrumbs-active')
            
            //quitar las felchas que estan despues de la selecionada
            for (let i = 0 ; i < 3 ; i++) {
            $(breadcrumbs_array[(index+1)+i]).hide()
            $(arrows).find(aux[i]).addClass('active')
            }

            }
            else {

            //quitar la clase activa
            $(value).removeClass('box-breadcrumbs-active')
            $(value).find('a').attr('style',' ')

            for (let i = 0 ; i < 3 ; i++) {
            $(value).find(aux[i]).removeClass('active')
            }

            }

          })

          if ($(arrows).find('a').attr('href') == '#home') {
          $('body').attr('title', 0)
          $('.detonating-question-box').removeClass('on')
          $('.detonating-question-box').hide()
          svgPaint(json)
          }
          else {
          $('.detonating-question-box').removeClass('on')
          funcionalityAskDetoting(index-1)
          $('body').attr('title', index)  
          let paramters = ($('#arrows-1').attr('title')).split(',') 
          funcionalityRute(json, paramters[0] , paramters[1] , paramters[2] , 1 , index-1) 
          }

       }
      
      } 

    })
    
}

