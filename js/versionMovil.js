


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
     $('body').addClass('active')

     //Funcionalidad de las flechas
     breadcrumbs_funcionality(json)


     //}

    
}


async function breadcrumbs_funcionality(json) {

    let arrows;
    let aux = ['a','div','span']
    let breadcrumbs_array = []
    let backgroundPosition;
    
    $('.box-breadcrumbs').each((index,value)=> {
    breadcrumbs_array.push(value)
    })

    $('.box-breadcrumbs').on('click', function(event) {
       event.preventDefault();
       event.isPropagationStopped();
     
       arrows = this;
       backgroundPosition = Number($(arrows).attr('id').replace('bread-','')) -1;

      if ($('body').hasClass('active')) {
       //agregar la clase activa a la flecha selecionada
       if ( $(arrows).hasClass('box-breadcrumbs-active') === false ) {
            
          //quitar la clase activa y agregarla a la selecionada
          $('.box-breadcrumbs').each((index,value)=> {

            //si el href es igual al selecionado se le agrega la clase active
            if ($(value).find('a').attr('href') === $(arrows).find('a').attr('href') ) {
           
            //agregar el fondo de color para la primer flecha  
            ($(value).find('a').attr('href') === '#home')?  $(value).find('a').css({
            'background-color': 'gainsboro'
            }):false 
            $(arrows).addClass('box-breadcrumbs-active')
            
            $//('body,html').css('background-position-x', ''+10*backgroundPosition+'%')

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

          svgPaint(json)

       }

      } 

    })
}
