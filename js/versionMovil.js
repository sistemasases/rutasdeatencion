/**
* Management - Funcionalidad de la capa de informacion
* @author Cristian Duvan Machado Moquera
* @copyright 2021 Cristian Duvan Machado Mosquera <cristiankm4088@gmail.com>
* @license  http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
*/


function screenResponsiveWebDesing(json) {

  /*  VARIABLES  */
  let sizeScreenWidth = $(window).width()
  let sizeScreenHeigth = $(window).height()

  // if ( sizeScreenWidth <= 1050 &&  sizeScreenWidth < sizeScreenHeigth) {

  //mostrar el contenido de mayor informacion
  $('#mayorInformacion').on('click', (event) => {
    event.preventDefault();
    $('.content-info').animate({ height: '7.3em' })
    $('.content-info').css({
      'display': 'grid'
    })
  })

  //quitar la animacion del footer
  $('#close-footer').on('click', (event) => {
    event.preventDefault();
    $('.content-info').animate({ height: '0em' })
  })

  //mostrar el breadcumbs de inicio
  $('#bread-1').css('display', 'inline-block')
  $('.content-text-botton-box').css('display', 'none')
  $('.detonating-question-box').hide()
  $('body').addClass('active')

  //Funcionalidad de las flechas
  breadcrumbs_funcionality(json)


  //}


}


function breadcrumbs_funcionality(json) {

  //evento click en el breadcrumbs
  $('.arrow-7').on('click', function (event) {
    event.preventDefault();

    //variables
    sizeScreenWidthAux = $(window).width()
    sizeScreenHeigth = $(window).height()
    arrows = this;


    if (!$('#arrow-box-principality').hasClass('breadcrumbs-active-click')) {
      //sacar un numero al dar click en el brecumbs
      dimensionNav = $(this).parent()
      navsInDimension = dimensionNav.find('.arrow-7')
      index = navsInDimension.index(this)

      indexClick = index;

      //each de la clase arrow-7
      $('.arrow-7').each(function (index, value) {
        //colocar la clase activa si es igual al selecionado
        if (value === arrows) {
          $(value).find('.arrow-text').addClass('arrow-active')
          indexClick = index
        } else {
          $(value).find('.arrow-text').removeClass('arrow-active')
        }

        if (index > indexClick) {
          $(value).hide()
        }

      })

      //regresar estados a su estado original cuando se da click en el home
      if (index === 0) {
        $('#bread-1').addClass('box-breadcrumbs-active')
        $('.arrow-1').addClass('active')
        $('body').attr('title', 0)
        $('.box-title-1').css('display', 'none')
        $('.box-arrow').css('display', 'none')
        $('header').css('display', 'grid')
        svgPaint(json)

        //version de escritorio
        if (sizeScreenWidthAux > 500) {
          $('#svg-1-6').addClass('active-svg')
          $('#svg-1-6').css('right', '-50%')
        } else {

          //acomodar las flechas
          if (sizeScreenWidthAux > 375 && sizeScreenHeigth < 667) {
            $('#svg-1-6').addClass('active-svg')
            $('#svg-1-6').css('right', '-36%')
          }
          else if (sizeScreenWidthAux > 375 && sizeScreenHeigth > 667 || sizeScreenWidthAux < 376 && sizeScreenHeigth >= 667) {
            $('#svg-1-6').addClass('active-svg')
            $('#svg-1-6').css('right', '0%')
          }

        }

        $('#svg-1-6').addClass('active-svg-info')
        $('.svg-info-aux').each(function (index, value1) {
          $(value1).show()
        })

      }
      else {
        $('body').attr('title', index)
        let paramters = ($('#arrows-1').attr('title')).split(',')
        funcionalityRute(json, Number(paramters[0]), Number(paramters[1]), Number(paramters[2]), 1, index - 1, paramters[3])
      }

      /*  Funcionalidades para ambos casos */
      
      //dar clase activa al breadcrumbs 3 cuando se da clik en el breadcrumbs 4
      if ($(this).hasClass('arrow-4') ) {
        $('#breadcumbs-3').find('.arrow-text').addClass('arrow-active')
        $(this).hide()
      }

      console.log($(this).hasClass('arrow-4'), 'text de prueba')
      //Ocultar las cajas de texto
      $('.box-information').hide()
      $('.box-abc-dimension').hide()
      $('.box-button-dimension').hide()
      $('.box-information-dimension').hide()
      $('#escritorio-dimension-box').hide()


      //restaurar los estados de los botones de las cajas
      $('#enlaces').addClass('bandera-true')
      $('.boton-info').off('click')
      $(".content-text-botton-box").slideUp('slow');

      //ocultar el contenido de la dimension
      $('.boton-info').each(function (index, value) {
        if ($(value).hasClass('active')) {
          $(value).removeClass('active')
        }
      })

      //ocultar el contenido de la dimension
      $('.button-abc').each(function (index1, value) {
        $(value).removeClass('active-box-button-abc')
      })

      //ocultar el contenido de la dimension
      $('#text-abc-content').html('')
      $('.box-question-dimension').hide()
      $('.box-button-dimension-content').html('')
      $('.box-button-dimension-content').css('grid-template-rows', '15% 15% 15% 15% 15% 15% 15% 15% 15%')

      //acomodar la señalitica
      if (sizeScreenWidthAux <= 500) {

        $('.lienzo').each(function (index, value) {

          if ($(value).css('display') === 'none' && sizeScreenWidthAux > 375 && sizeScreenHeigth < 667) {
            console.log($(value).attr('id'), 'id')
            if ($(value).attr('id') === 'svg-1-6') {
              $(value).css('right', '-36%')
            } else {
              $(value).css('right', '0')

            }
          }

          if ($(value).css('display') === 'none' && sizeScreenWidthAux < 376 && sizeScreenHeigth <= 667 ||
            $(value).css('display') === 'none' && sizeScreenWidthAux > 375 && sizeScreenHeigth > 667 ||
            $(value).css('display') === 'none' && sizeScreenWidthAux < 375 && sizeScreenHeigth > 667) {
            if ($(value).attr('id') === 'svg-1-8') {
              $(value).css('right', '30%')
              if (sizeScreenWidthAux > 375 && sizeScreenHeigth > 667 || sizeScreenWidthAux < 376 && sizeScreenHeigth > 667) {
                $('#svg-1-8').addClass('active-svg')
                $(value).css('right', '60%')
              }
            } else {
              $(value).css('right', '0')
            }
          }


        })

      }
      else {

        $('.lienzo').each(function (index, value) {

          if ($(value).css('display') === 'none') {
            if ($(value).attr('id') === 'svg-1-6') {
              $(value).css('right', '-50%')
            } else {
              $(value).css('right', '-42%')

            }
          }

        })
      }

    }
  })

} 