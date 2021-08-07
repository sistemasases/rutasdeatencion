


function screenResponsiveWebDesing() {

     /*  VARIABLES  */
     let sizeScreenWidth  = $(window).width()
     let sizeScreenHeigth = $(window).height()
     
     if ( sizeScreenWidth <= 1050 &&  sizeScreenWidth < sizeScreenHeigth) {

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

     }

    
}