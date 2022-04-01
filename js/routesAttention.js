/**
* Management - Funcionalidad de la capa de informacion
* @author Cristian Duvan Machado Moquera
* @copyright 2021 Cristian Duvan Machado Mosquera <cristian.machado@correounivalle.edu.co>
* @license  http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
*/


/* Funcionalidad de rutas de atencion svg */
function rutesAttentionMovil(json) {

  let dimension, attetionAux, entity;
  let sizeScreenWidth = 376
  $('.arrow-1').addClass('active')
  $('body').attr('title', 0)

  $('.arrows-lienzo').on('click', function (event) {
    event.preventDefault();
    event.isPropagationStopped();

    //sacar el nombre de la senñalitica
    let regerxc = /^\s{10,50}$/
    let name = ($(this).attr('id')).split('-')[0] + '-'

    //calcular la dimension
    sizeScreenWidthAux = $(window).width()

    $(this).find('text').each(function (index, value) {

      if (regerxc.exec($(value).text()) === null) {
        if ($(value).attr('title') != 0) {
          nameDimension = $(value).text()
        }
      }

    });

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
      if (Number(indexCap) === 1) {
        attetionAux = index
        entity = 0
      }

      // guarda el index de la flecha en la capa 2
      if (Number(indexCap) === 2) {
        entity = index
      }

      console.log($('.arrow-3').hasClass('arrow-active'), 'comfirmalo', indexCap)
      if (Number(indexCap) < 3) {
        if (sizeScreenWidthAux <= 500) {
          Promise.all([animateBackgroundNew(false, sizeScreenWidth, true, json, dimension, attetionAux, entity, indexCap),
          animateRuteNew(false, sizeScreenWidth, (index + 1), json, dimension, attetionAux, entity, indexCap, name, nameDimension), animateCharacterNew(json, dimension, attetionAux, entity, indexCap, sizeScreenWidth)])
        }
        else {

          Promise.all([animateCharacterNew(json, dimension, attetionAux, entity, indexCap, sizeScreenWidth),animateBackgroundNew(false, sizeScreenWidth, true, json, dimension, attetionAux, entity, indexCap) , animateRuteNew(false, sizeScreenWidth, (index + 1), json, dimension, attetionAux, entity, indexCap, name, nameDimension)])

          //alert('La pantalla no es suficiente para la animacion')
        }
        console.log('entro pero que raro')
        //incrementar el numero de la capa de donde se encontraba 
        $('body').attr('title', Number(($('body').attr('title'))) + 1)
        $('#arrows-1').attr('title', dimension + ',' + attetionAux + ',' + entity + ',' + name)
      }
      else {
        $('.arrow-3').removeClass('arrow-active')
        $('.arrow-3').find('.arrow-text').removeClass('arrow-active')
        $('.arrow-4').find('.arrow-text').addClass('arrow-active')
        $('.arrow-4').show()
        $('.arrow-4').find('.arrow-text').html(nameDimension)


        if (sizeScreenWidthAux <= 500) {

          json.then(function (value) {
            if ((Object.values(((Object.entries(((((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux]).sedes)[entity].Entidades))[index][1]).Atenciones)[0]).tipoCaja == 2) {
              create_box_botton(json, dimension, attetionAux, entity, index)
            }
            else if ((Object.values(((Object.entries(((((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux]).sedes)[entity].Entidades))[index][1]).Atenciones)[0]).tipoCaja == 3) {
              create_box_botton_abc(json, dimension, attetionAux, entity, index)
            }
            else {
              funcionalityInfoContent(json, dimension, attetionAux, entity, index)
              funcionality_botton_text(json, dimension, attetionAux, entity, index)
            }
          })

        }
        else {
          console.log('entro pero que raro 25')
          funcioanlity_box_escritorio(json, dimension, attetionAux, entity, index)
        }

      }

    }

  })

}


/* animacion del fondo*/
function animateBackground(band, sizeScreenWidth, bandAux) {

  //let sizeScreenWidth  = $(window).width()
  let sizeScreen = 0;
  let increase = 0;
  let increasefg2 = 0;
  if (bandAux) {
    clasName = 'body,html'
  }
  else {
    clasName = 'body'
  }

  //evitar usar los escuchas mientras se hace la animacion
  $('body').removeClass('active')

  const timer = setInterval(function () {

    //si el tamaño de pantalla es superado habra acaba la animacion
    if (sizeScreen < sizeScreenWidth * 2) {
      $(`${clasName}`).css('background-position-x', '' + increase + '% , ' + (increasefg2) + '%,' + (increasefg2) + '%')
      increase += 1;
      sizeScreen += 10;
      increasefg2 += 2;
    }
    else {
      band = true;
    }

    if (band) {
      clearInterval(timer)
      band = null
      sizeScreen = 0;
      increasefg2 = 0;
      increase = 0;
      $('body').addClass('active')
    }

  }, 100)

  return timer;

}

/* animacion del fondo*/
function animateBackgroundNew(band, sizeScreenWidth, bandAux, json, dimension, attetionAux, entity, indexCap) {

  json.then(function (value) {
    //let sizeScreenWidth  = $(window).width()
    let sizeScreen = 0;
    let increase = 0;
    let timeMultiplier = Number((get_time_multiplier(value, dimension, attetionAux, entity, indexCap)).split(',')[1])
    let increasefg2 = 0;
    if (bandAux) {
      clasName = 'body,html'
    }
    else {
      clasName = 'body'
    }

    //evitar usar los escuchas mientras se hace la animacion
    $('body').removeClass('active')

    const timer = setInterval(function () {

      //si el tamaño de pantalla es superado habra acaba la animacion
      if (sizeScreen < sizeScreenWidth * timeMultiplier) {
        $(`${clasName}`).css('background-position-x', '' + increase + '% , ' + (increasefg2) + '%,' + (increasefg2) + '%')
        increase += 1;
        sizeScreen += 10;
        increasefg2 += 2;
      }
      else {
        band = true;
      }

      if (band) {
        clearInterval(timer)
        band = null
        sizeScreen = 0;
        increasefg2 = 0;
        increase = 0;
        $('body').addClass('active')
      }

    }, 100)

    return timer;
  })
}


/* animacion de la ruta */
function animateRute(band, sizeScreenWidth, screen, json, dimension, attetionAux, entity, indexCap, nameArrow, nameDimension) {


  json.then(function (value) {

    //variables locales
    let sizeScreen = 0;
    let increase = 0;
    let timeHideRute = ((sizeScreenWidth * 2) * 50) / 100;
    let timeShowRute = 0;
    let clasName = 'lienzo';
    bandAux = true
    bandBrecumbs = true
    sizeScreenWidth11 = $(window).width()
    sizeScreenHeigth = $(window).height()

    $('#arrow-box-principality').addClass('breadcrumbs-active-click')

    //recorrer la capas internas del json por dimension, a expecion de la capa mayor  
    try {
      objectJson = [(Object.entries((Object.values(value)[dimension].TiposDeAtencion))), Object.entries((Object.entries((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux])[1].sedes), Object.entries(((Object.entries((Object.entries((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux])[1].sedes)[entity])[1]).Entidades)]
    } catch (err) {
      console.log('la instancia del json selecionada, esta vacia o le faltan componentes', err)
      objectJson = [(((Object.entries((Object.values(value)[dimension]).TiposDeAtencion)))), Object.entries((Object.entries((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux])[1].sedes)]
    }

    //verificar si la dimension es la mayor y el ancho de la pantalla es mayor a 375
    if (objectJson[indexCap].length < 5 && sizeScreenWidth11 > 375 && sizeScreenHeigth < 667) {
      timeShowRute = ((sizeScreenWidth * 2) * 87) / 100;
      console.log('entro a la condicion 1')
    }
    else if (sizeScreenWidth11 > 375 && sizeScreenHeigth < 667) {
      timeShowRute = ((sizeScreenWidth * 2) * 79) / 100;
      console.log('entro a la condicion 2')
    }


    if (objectJson[indexCap].length > 5 && sizeScreenWidth11 < 376 && sizeScreenHeigth < 668) {
      timeShowRute = ((sizeScreenWidth * 2) * 73) / 100;
      console.log('entro a la condicion 5')
    }
    else if (sizeScreenWidth11 < 376 && sizeScreenHeigth < 668) {
      timeShowRute = ((sizeScreenWidth * 2) * 79) / 100;
      console.log('entro a la condicion 6')
    }

    //verificar si la dimension es la mayor y el ancho de la pantalla es mayor a 375
    if (objectJson[indexCap].length > 5 && sizeScreenWidth11 > 375 && sizeScreenHeigth > 668) {
      timeShowRute = ((sizeScreenWidth * 2) * 66) / 100;
      console.log('entro a la condicion 3')
    }
    else if (sizeScreenWidth11 > 375 && sizeScreenHeigth > 667) {
      timeShowRute = ((sizeScreenWidth * 2) * 79) / 100;
      console.log('entro a la condicion 4')
    }


    //verificar si la dimension es la mayor y el ancho de la pantalla es menor a 375
    if (objectJson[indexCap].length > 5 && sizeScreenWidth11 < 376 && sizeScreenHeigth > 668) {
      timeShowRute = ((sizeScreenWidth * 2) * 66) / 100;
      //console.log('entro a la condicion 3')
    }
    else if (sizeScreenWidth11 < 376 && sizeScreenHeigth > 668) {
      timeShowRute = ((sizeScreenWidth * 2) * 79) / 100;
      //alert('entre')
    }

    if ($('#svg-1-6').hasClass('active-svg-info')) {
      $('#svg-1-6').removeClass('active-svg-info')
      $('.svg-info-aux').each(function (index, value1) {
        $(value1).hide()
      })
    }

    if ($('#svg-1-6').hasClass('active-svg') && sizeScreenWidth11 > 375 && sizeScreenHeigth < 667) {
      $('#svg-1-6').removeClass('active-svg')

      increase = -36
      console.log('entro a la condicion 7')
    }


    if ($('#svg-1-8').css('display') != 'none' && $('#svg-1-8').hasClass('active-svg') && sizeScreenWidth11 > 375 && sizeScreenHeigth > 667) {
      $('#svg-1-8').removeClass('active-svg')
      increase = 60
      console.log('entro a la condicion 8')
    }

    if ($('#svg-1-6').css('display') === 'none' && $('#svg-1-8').css('display') != 'none' && $('#svg-1-8').hasClass('active-svg') && sizeScreenWidth11 > 375
      && sizeScreenHeigth > 667) {
      $('#svg-1-8').removeClass('active-svg')
      increase = 60
      console.log('entro a la condicion 9')
    }

    if ($('#svg-1-8').css('display') != 'none' && $('#svg-1-8').hasClass('active-svg') && sizeScreenWidth11 < 376 && sizeScreenHeigth > 667) {
      $('#svg-1-8').removeClass('active-svg')
      increase = 60
      console.log('entro a la condicion 8')
    }

    if ($('#svg-1-6').css('display') === 'none' && $('#svg-1-8').css('display') != 'none' && $('#svg-1-8').hasClass('active-svg') && sizeScreenWidth11 < 376
      && sizeScreenHeigth > 667) {
      $('#svg-1-8').removeClass('active-svg')
      increase = 60
      console.log('entro a la condicion 9')
    }


    var ruteAnimate = setInterval(function () {

      if (sizeScreen < sizeScreenWidth * 2) {

        //mover el svg hacia fuera de la pantalla
        if (sizeScreen <= timeHideRute) {
          $('.detonating-question-box').removeClass('on')
          //$('.detonating-question-box').fadeOut() 
          $(`.${clasName}`).css('right', '' + increase + '%')
          increase += 6;
        }

        //poner svg al inicio y actulizar su contenido
        if (sizeScreen > timeHideRute && bandAux) {
          bandAux = false
          increase = -90
        }

        //volver a mostrar el svg con los cambios nuevos
        if (sizeScreen >= timeShowRute) {
          if (bandBrecumbs) {
            bandBrecumbs = false
            //funcionalityAskDetoting(indexCap)
            funcionalityBrecumbs(indexCap, nameDimension)
            funcionalityRute(json, dimension, attetionAux, entity, 1, indexCap, nameArrow);
            show_brecumbs()
            //dimension_description(json, dimension)
            $('#arrow-box-principality').removeClass('breadcrumbs-active-click')
          }

          //funcionalityRute(json , dimension , attetionAux , entity , 1 , indexCap );
          $(`.${clasName}`).css('right', '' + increase + '%')
          console.log(increase, 'increase')
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

  })

}


/* animacion de la ruta */
function animateRuteNew(band, sizeScreenWidth, screen, json, dimension, attetionAux, entity, indexCap, nameArrow, nameDimension) {


  json.then(function (value) {

    //variables locales
    let sizeScreen = 0;
    let increase = Number((get_time_multiplier(value, dimension, attetionAux, entity, indexCap)).split(',')[2]);
    let timeHideRute = 0;
    let timeMultiplier = Number((get_time_multiplier(value, dimension, attetionAux, entity, indexCap)).split(',')[1])
    let porcentShowRute = Number((get_time_multiplier(value, dimension, attetionAux, entity, indexCap)).split(',')[0])
    let clasName = 'lienzo'
    bandAux = true
    bandBrecumbs = true

    $('#arrow-box-principality').addClass('breadcrumbs-active-click')

    if ($('#svg-1-6').hasClass('active-svg-info')) {
      $('#svg-1-6').removeClass('active-svg-info')
      $('.svg-info-aux').each(function (index, value1) {
        $(value1).hide()
      })
    }

    timeHideRute = ((sizeScreenWidth * timeMultiplier) * porcentShowRute) / 100;

    var ruteAnimate = setInterval(function () {

      if (sizeScreen < sizeScreenWidth * timeMultiplier) {

        //mover el svg hacia fuera de la pantalla
        if (sizeScreen <= timeHideRute) {
          $('.detonating-question-box').removeClass('on')
          console.log('entro a la condicion 1')
          $(`.${clasName}`).css('right', '' + increase + '%')
          increase += 6;
        }
        else {

          //poner svg al inicio y actulizar su contenido
          if (bandAux) {
            bandAux = false
            increase = -90
            funcionalityBrecumbs(indexCap, nameDimension)
            funcionalityRute(json, dimension, attetionAux, entity, 1, indexCap, nameArrow);
            show_brecumbs()
            $('#arrow-box-principality').removeClass('breadcrumbs-active-click')
          }

          //incrementar el movimiento del svg          
          $(`.${clasName}`).css('right', '' + increase + '%')
          increase += 6


        }

        console.log($(`.${clasName}`).width(), 'Object.isSealed(value)', timeHideRute)
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

  })

}


/* animacion de la ruta */
function animateRuteNewEscritorio(band, sizeScreenWidth, screen, json, dimension, attetionAux, entity, indexCap, nameArrow, nameDimension) {


  json.then(function (value) {

    //variables locales
    let sizeScreen = 0;
    let increase = 0;
    let timeHideRute = 0;
    let timeMultiplier = 1.4
    let porcentShowRute = 85
    let clasName = 'lienzo'
    bandAux = true
    bandBrecumbs = true

    $('#arrow-box-principality').addClass('breadcrumbs-active-click')

    if ($('#svg-1-6').hasClass('active-svg-info')) {
      $('#svg-1-6').removeClass('active-svg-info')
      $('.svg-info-aux').each(function (index, value1) {
        $(value1).hide()
      })
    }

    timeHideRute = ((sizeScreenWidth * timeMultiplier) * porcentShowRute) / 100;

    var ruteAnimate = setInterval(function () {

      if (sizeScreen < sizeScreenWidth * timeMultiplier) {

        //mover el svg hacia fuera de la pantalla
        if (sizeScreen <= timeHideRute) {
          $('.detonating-question-box').removeClass('on')
          console.log('entro a la condicion 1')
          $(`.${clasName}`).css('right', '' + increase + '%')
          increase += 6;
        }
        else {

          //poner svg al inicio y actulizar su contenido
          if (bandAux) {
            bandAux = false
            increase = -90
            funcionalityBrecumbs(indexCap, nameDimension)
            funcionalityRute(json, dimension, attetionAux, entity, 1, indexCap, nameArrow);
            show_brecumbs()
            $('#arrow-box-principality').removeClass('breadcrumbs-active-click')
          }

          //incrementar el movimiento del svg          
          $(`.${clasName}`).css('right', '' + increase + '%')
          increase += 6


        }

        console.log($(`.${clasName}`).width(), 'Object.isSealed(value)', timeHideRute)
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

  })

}


function animeteRuteEscritorio(band, sizeScreenWidth, screen, json, dimension, attetionAux, entity, indexCap, nameArrow, nameDimension) {

  json.then(function (value) {

    //variables locales
    let sizeScreen = 0;
    let increase = 0;
    let timeHideRute = ((sizeScreenWidth * 2) * 50) / 100;
    let timeShowRute = 0
    let clasName = 'lienzo'
    bandAux = true
    bandBrecumbs = true
    sizeScreenWidth11 = $(window).width()
    sizeScreenHeigth = $(window).height()

    $('#arrow-box-principality').addClass('breadcrumbs-active-click')

    //recorrer la capas internas del json por dimension, a expecion de la capa mayor  
    try {
      objectJson = [(Object.entries((Object.values(value)[dimension].TiposDeAtencion))), Object.entries((Object.entries((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux])[1].sedes), Object.entries(((Object.entries((Object.entries((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux])[1].sedes)[entity])[1]).Entidades)]
    } catch (err) {
      console.log('la instancia del json selecionada, esta vacia o le faltan componentes', err)
      objectJson = [(((Object.entries((Object.values(value)[dimension]).TiposDeAtencion)))), Object.entries((Object.entries((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux])[1].sedes)]
    }

    //verificar si la dimension es la mayor y el ancho de la pantalla es mayor a 375
    if (objectJson[indexCap].length < 5) {
      timeShowRute = ((sizeScreenWidth * 2) * 90) / 100;
    }
    else {
      timeShowRute = ((sizeScreenWidth * 2) * 89) / 100;
    }


    if ($('#svg-1-6').hasClass('active-svg-info')) {
      $('#svg-1-6').removeClass('active-svg-info')
      $('.svg-info-aux').each(function (index, value1) {
        $(value1).hide()
      })
    }

    if ($('#svg-1-6').hasClass('active-svg')) {
      $('#svg-1-6').removeClass('active-svg')
      increase = -50
    }


    var ruteAnimate = setInterval(function () {

      if (sizeScreen < sizeScreenWidth * 2) {

        //mover el svg hacia fuera de la pantalla
        if (sizeScreen <= timeHideRute) {
          $('.detonating-question-box').removeClass('on')
          //$('.detonating-question-box').fadeOut() 
          $(`.${clasName}`).css('right', '' + increase + '%')
          increase += 6;
        }

        //poner svg al inicio y actulizar su contenido
        if (sizeScreen > timeHideRute && bandAux) {
          bandAux = false
          increase = -90
        }

        //volver a mostrar el svg con los cambios nuevos
        if (sizeScreen >= timeShowRute) {
          if (bandBrecumbs) {
            bandBrecumbs = false
            //funcionalityAskDetoting(indexCap)
            funcionalityBrecumbs(indexCap, nameDimension)
            funcionalityRute(json, dimension, attetionAux, entity, 1, indexCap, nameArrow);
            show_brecumbs()
            //dimension_description(json, dimension)
            $('#arrow-box-principality').removeClass('breadcrumbs-active-click')
          }

          //funcionalityRute(json , dimension , attetionAux , entity , 1 , indexCap );
          $(`.${clasName}`).css('right', '' + increase + '%')
          console.log(increase, 'increase')
          increase += 6
        }

        sizeScreen += 10
      }
      else {
        band = true
      }

      if (band) {
        $('#svg-1-6').addClass('active-svg')
        clearInterval(ruteAnimate)
      }

    }, 100)


    return ruteAnimate

  })


}

/* Animacion del personaje */
function animateCharacter(sizeScreenWidth) {

  //variables
  let sizeScreen = 0;
  let timeSequence = 4
  let imgSequence = 0
  band = true
  killTimer = false


  var animateCharac = setInterval(function () {

    if (sizeScreen < sizeScreenWidth * 2) {

      //cambiar la imagen determinado tiempo  
      if (timeSequence == 4) {
        if ((imgSequence - 1) == 0) {
          $(`#personaje-caminata-${imgSequence + 7}`).addClass('features-personajes-off')
        }
        $(`#personaje-caminata-${imgSequence - 1}`).addClass('features-personajes-off')
        $(`#personaje-caminata-${imgSequence}`).removeClass('features-personajes-off')
        console.log(imgSequence, 'imgSequence', imgSequence - 1, 'imgSequence - 1')
        imgSequence++
        timeSequence = 1
      }

      //restablecer la imagen inicial finalizada la primer secuencia
      if (imgSequence > 8) {
        imgSequence = 1
      }

      //incrementos
      timeSequence++
      sizeScreen += 10
    }
    else {
      killTimer = true
    }

    if (killTimer) {
      //$(`#personaje-caminata-1`).removeClass('features-personajes-off')
      for (let i = 2; i < 9; i++) {
        $(`#personaje-caminata-${i}`).addClass('features-personajes-off')
      }
      clearInterval(animateCharac)
    }

  }, 100)

  return animateCharac

}

/* Animacion del personaje */
function animateCharacterNew(json, dimension, attetionAux, entity, indexCap, sizeScreenWidth) {

  json.then(function (value) {
    //variables
    let sizeScreen = 0;
    let timeSequence = 4
    let imgSequence = 0
    band = true
    killTimer = false
    let timeMultiplier = Number((get_time_multiplier(value, dimension, attetionAux, entity, indexCap)).split(',')[1])

    var animateCharac = setInterval(function () {

      if (sizeScreen < sizeScreenWidth * timeMultiplier) {

        //cambiar la imagen determinado tiempo  
        if (timeSequence == 4) {
          if ((imgSequence - 1) == 0) {
            $(`#personaje-caminata-${imgSequence + 7}`).addClass('features-personajes-off')
          }
          $(`#personaje-caminata-${imgSequence - 1}`).addClass('features-personajes-off')
          $(`#personaje-caminata-${imgSequence}`).removeClass('features-personajes-off')
          console.log(imgSequence, 'imgSequence', imgSequence - 1, 'imgSequence - 1')
          imgSequence++
          timeSequence = 1
        }

        //restablecer la imagen inicial finalizada la primer secuencia
        if (imgSequence > 8) {
          imgSequence = 1
        }

        //incrementos
        timeSequence++
        sizeScreen += 10
      }
      else {
        killTimer = true
      }

      if (killTimer) {
        $(`#personaje-caminata-1`).removeClass('features-personajes-off')
        for (let i = 2; i < 9; i++) {
          $(`#personaje-caminata-${i}`).addClass('features-personajes-off')
        }
        clearInterval(animateCharac)
      }

    }, 100)

    return animateCharac

  }).catch(function (error) {
    console.log(error)
  })

}


/* Quitar la clase activa en el brecumbs */
function funcionalityBrecumbs(indexArr, nameDimension) {

  $('.arrow-7').each(function (index, value) {

    if ((Number(indexArr) + 1) === index) {
      $(value).show()
      $(value).find('.arrow-text').addClass('arrow-active')
      $(value).addClass('arrow-active')
      $(value).find('.arrow-text').html(nameDimension.slice(0, 10))
    }
    else {
      $(value).removeClass('arrow-active')
      $(value).find('.arrow-text').removeClass('arrow-active')
    }

  })

}


/**
 * 
 * @method funcionalityRute
 * @desc poner y colocar los nodos de la dimension precionada
 * @param {*} json {json}
 * @param {*} dimension {number} 
 * @param {*} attetionAux {number}
 * @param {*} entity {number}
 * @param {*} iterador {number}
 * @param {*} indexCap  {number}
 * @param {*} nameArrow {string}
 */
function funcionalityRute(json, dimension, attetionAux, entity, iterador, indexCap, nameArrow) {

  json.then(function (value) {

    //recorrer la capas internas del json por dimension, a expecion de la capa mayor  
    try {
      objectJson = [(Object.entries((Object.values(value)[dimension].TiposDeAtencion))), Object.entries((Object.entries((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux])[1].sedes), Object.entries(((Object.entries((Object.entries((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux])[1].sedes)[entity])[1]).Entidades)]
    } catch (err) {
      console.log('la instancia del json selecionada, esta vacia o le faltan componentes', err)
      objectJson = [(((Object.entries((Object.values(value)[dimension]).TiposDeAtencion)))), Object.entries((Object.entries((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux])[1].sedes)]
    }

    //console.log(indexCap, 'indexCap', objectJson, 'OBJECT JSON')
    //insertar el texto de las llaves del json al svg
    for (const attention of objectJson[indexCap]) {
      console.log((objectJson[indexCap]).length, 'attention')

      if ((objectJson[indexCap]).length > 5) {
        $('#svg-1-8').show();
        $('#svg-1-6').hide();
        nameArrow = 'arrows-'
      }
      else {
        $('#svg-1-8').hide();
        $('#svg-1-6').show();
        nameArrow = 'arrow-'
      }

      $('#' + nameArrow + + iterador + '').show()

      funcionality_title_text(nameArrow, iterador, attention[1], attention[1].tipoTitulo)
      //$('#' + nameArrow + + iterador + '').find('text').html(((attention[1].name).toUpperCase()).slice(0, 9))
      iterador++;
    }


    //apagar las felchas que no son utilizadas
    while (iterador < 9) {
      $('#' + nameArrow + + iterador + '').hide()
      iterador++;
    }


  }).catch((err) => {

    console.log('ups, paso un error al insertar el texto', err)

  });
}



function funcionalityAskDetoting(index) {

  let text = ['atención', 'entidades', 'atenciones']
  $('.detonating-question-box').addClass('on')
  let count = 0
  //mostrar la pregunta
  var time = setInterval(function () {

    if (count > 3) {
      $('.detonating-question-box').removeClass('on')
    }

    if (!$('.detonating-question-box').hasClass('on')) {
      $('.detonating-question-box').fadeOut()
      clearInterval(time)
    }
    else {
      $('.detonating-question-box').show()
    }

    count++

  }, 1000)

  //insertar el texto dependiendo de la capa
  $('.detonating-question-box').find('.detonating-question-text').html(' ¿Qué tipo de ' + text[index] + ' estás buscando?')

  return time
}

function funcionalityInfoContent(json, dimension, attetionAux, entity, index) {

  json.then(function (value) {

    //mostrar caja texto
    $('#information').fadeIn()

    //ocultar
    $('#page-inicio').hide()
    $('.detonating-question-box').removeClass('on')
    $('.detonating-question-box').hide()

    //insertar el titulo
    $('.title-content-info').find('.title-info').html((Object.values(((Object.entries(((((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux]).sedes)[entity].Entidades))[index][1]).Atenciones)[0]).name)

    //insertar el contenido
    $('.content-text-info').find('.content-text').html((Object.values(((Object.entries(((((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux]).sedes)[entity].Entidades))[index][1]).Atenciones)[0]).descripcion)


  }).catch((err) => {

    console.log('ups, paso un error al insertar el texto', err)

  });
}

function titleBrecumbs(indexArr, indexCap) {

  //insertar el texto en brecumbs
  textBrecumbs = $('#arrows-' + indexArr + '').find('text').text()
  $('#bread-' + (indexCap + 1) + '').find('span').html(textBrecumbs.slice(0, 9))

}


//añadir el texto a los botones
function funcionality_botton_text(json, dimension, attetionAux, entity, index) {

  let accioneBotton = ['enlaces', 'quienLoHace', 'comoSeHace']
  band = true
  textEnlace = ""

  //activar clase que significa true
  $('#enlaces').addClass('bandera-true')

  $('.boton-info').on('click', function (event) {
    event.preventDefault();
    event.isPropagationStopped();

    botonPress = this


    //quitar la clase cuando esta activada y se vuelve undir de nuevo
    if ($(botonPress).hasClass('active')) {
      band = false
      $('#enlaces').removeClass('bandera-true')
    }

    //quitar clase activa
    $('.boton-info').each(function (index, value) {

      if ($(value).hasClass('active')) {
        $(value).removeClass('active')
      }

    })

    //sacar un numero al dar click en los botones 
    dimensionNav = $(this).parent()
    navsInDimension = dimensionNav.find('.boton-info')
    indexBotton = navsInDimension.index(this)

    //limpiar el texto que esta
    $('.content-text-botton').html('')

    json.then(function (value) {

      //insertar el contenido
      $('.content-text-botton-box').find('.content-text-botton').html((Object.values(((Object.entries(((((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux]).sedes)[entity].Entidades))[index][1]).Atenciones)[0])[accioneBotton[indexBotton]])

      //crear los botones para los enlaces
      if ($(botonPress).attr('id') === 'enlaces') {

        //hacer un vector de cada enlace
        for (const array_enlaces of $('.content-text-botton-box').find('.content-text-botton').text().split(',')) {
          textEnlace += '<li><a target="_blank" href="' + array_enlaces + '" >' + array_enlaces + '</a> </li>'
        }

        //insertar el vector con los enlaces organizado con la etiqueta a
        $('.content-text-botton-box').find('.content-text-botton').html('<ul style="color:gray">' + textEnlace + '</ul>')
        textEnlace = ''

      }

    }).catch((err) => {

      console.log('ups, paso un error al insertar el texto', err)

    });

    console.log(band, 'band')
    //bajar y subir
    if ($('#enlaces').hasClass('bandera-true')) {
      $(".content-text-botton-box").slideDown('slow');
      $(botonPress).addClass('active')
    }
    else {
      $('#enlaces').addClass('bandera-true')
      $(".content-text-botton-box").slideUp('slow');
      $(botonPress).removeClass('active')
      //$('.content-text-botton-box').find('.content-text-botton').html('hola')
    }


  })

}


/**
 * @method funcionality_title_text
 * @description funcion para identificar el tipo de titulo y asi isertarlo en los arrow
 * @param {*} nameArrow {string}
 * @param {*} iterador  {number}
 * @param {*} attention  {object}
 * @param {*} typeTittle  {number}
 * @returns 
 */
function funcionality_title_text(nameArrow, iterador, attention, typeTittle) {

  switch (typeTittle) {
    case 1:
      //insertar texto
      text = $('#' + nameArrow + iterador + '').find('text').each(function (index, value) {
        if (index == 0) {
          $(value).show()
          $(value).html(((attention.name).toUpperCase()).slice(0, 12))
          $(value).attr('title', typeTittle)
        } else {
          $(value).hide()
          $(value).attr('title', 0)
        }

      })
      return text
    case 2:
      //insertar texto
      longNames = attention.name.split(',')
      text = $('#' + nameArrow + iterador + '').find('text').each(function (index, value) {
        if (index > 0 && index < 3) {
          $(value).show()
          $(value).html(((longNames[index - 1]).toUpperCase()).slice(0, 12))
          $(value).attr('title', typeTittle)
        } else {
          $(value).hide()
          $(value).attr('title', 0)
        }

      })
      return text
    case 3:
      //insertar texto
      longNames = attention.name.split(',')
      text = $('#' + nameArrow + iterador + '').find('text').each(function (index, value) {
        if (index > 2 && index < 6) {
          $(value).show()
          $(value).html(((longNames[index - 3]).toUpperCase()).slice(0, 12))
          $(value).attr('title', typeTittle)
        } else {
          $(value).hide()
          $(value).attr('title', 0)
        }

      })
      return text
  }

  //$('#'+ nameArrow + + iterador + ' text').html( ((attention[1].name).toUpperCase()).slice(0, 9))
}


/* */
function create_box_botton(json, dimension, attetionAux, entity, typeBox) {

  //variables internas
  let iterador = 0;
  let countClick = 0;

  json.then((value) => {
    $('.box-button-dimension').show()
    //obtine el nombre de las sedes
    textKeys = Object.keys(Object.values(((Object.entries(((((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux]).sedes)[entity].Entidades))[typeBox][1]).Atenciones)[0])
    //obtiene el contenido de las sedes
    textValues = Object.values(Object.values(((Object.entries(((((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux]).sedes)[entity].Entidades))[typeBox][1]).Atenciones)[0])

    //crea el boton y le pone su correspondiente texto
    for (const nameSedes of textKeys) {
      if (iterador > 6) {
        $('.box-button-dimension-content').append('<div class="botton-sedes">' + nameSedes + '</div>')
      }
      iterador++;
    }

    //librear memoria
    iterador = null

    $('.botton-sedes').on('click', function (event) {
      event.preventDefault();

      var gridPorcent = '';
      bottonClick = null;
      click = this;

      //generar un numero unico para cada boton 
      dimensionNav = $(this).parent()
      navsInDimension = dimensionNav.find('.botton-sedes')
      index = navsInDimension.index(this)

      //quitar el texto agregado al boton
      $('#1').remove()


      if (!$(click).hasClass('botton-dimension-active')) {
        //each para agregar un boton mas debajo del clickiado
        $('.botton-sedes').each(function (indexAux, value) {

          if (index != indexAux) {
            $(value).removeClass('botton-dimension-active')
          }
          else {
            $(value).addClass('botton-dimension-active')
          }

          if (index == indexAux && indexAux != 8) {
            gridPorcent += '15% 85% '
            bottonClick = value
          }
          else if ((textKeys.length - 8) == indexAux) {
            index == 8 ? (gridPorcent += '15% 85%', bottonClick = value) : (gridPorcent += '15%')
            $('.box-button-dimension-content').css('grid-template-rows', gridPorcent)
            $(bottonClick).after('<div class="text-button-dimension" id="1"> ' + textValues[index + 7] + ' </div>')
          } else {
            gridPorcent += '15% '
          }

        });
      } else {
        $(click).removeClass('botton-dimension-active')
        $('.box-button-dimension-content').css('grid-template-rows', '15% 15% 15% 15% 15% 15% 15% 15% 15%')
      }
      console.log(gridPorcent, "end")

    })

  }).catch((err) => {
    console.log('ups, paso un error al insertar el texto', err)
  })

}


function show_brecumbs() {
  if ($('.arrow-1').hasClass('active')) {
    $('#bread-1').removeClass('box-breadcrumbs-active')
    $('.arrow-1').removeClass('active')
    $('header').hide()
    $('.box-title-1').css('display', 'grid')
    $('.box-arrow').css('display', 'grid')
  }
}


function create_box_botton_abc(json, dimension, attetionAux, entity, index) {

  let accioneBotton = ['enlaces', 'quienLoHace', 'comoSeHace']
  let accionAbc = ['a', 'b', 'c', 'd']
  json.then((value) => {

    //colocar la caja
    $('.box-abc-dimension').css('display', 'grid')

    //obtine el nombre de la caja
    $('.box-abc-title').html((Object.values(((Object.entries(((((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux]).sedes)[entity].Entidades))[index][1]).Atenciones)[0]).name)

    //obtiene el contenido de la caja
    $('#text-button-1').html((Object.values(((Object.entries(((((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux]).sedes)[entity].Entidades))[index][1]).Atenciones)[0]).descripcion)

    //crea el boton y le pone su correspondiente texto
    $('.button-abc').on('click', function (event) {
      click = this
      $('.button-abc').each(function (index1, value) {
        if (click === value) {
          $(value).addClass('active-box-button-abc')
        } else {
          $(value).removeClass('active-box-button-abc')
        }
      })
      //numero de botones
      numButtons = $(this).parent()
      //sacar un numero al dar click en la felchita
      dimensionNav = $(this).parent()
      navsInDimension = dimensionNav.find('.button-abc')
      indexAux = navsInDimension.index(this)


      if ($(numButtons[0]).attr('class') === 'box-button-abc-aux1') {

        $('#text-abc-content').html((Object.values(((Object.entries(((((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux]).sedes)[entity].Entidades))[index][1]).Atenciones)[0])[accioneBotton[indexAux]])

      }
      else {

        $('#text-abc-content').html((Object.values(((Object.entries(((((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux]).sedes)[entity].Entidades))[index][1]).Atenciones)[0])[accionAbc[indexAux]])

      }

    })
  }).catch((err) => {
    console.log('ups, paso un error al insertar el texto', err)
  })

}


function dimension_description(json, dimension) {


  $('#box-dimension-question').parent().show()
  $('#box-dimension-question').show()

  json.then((event) => {

    $('.title-dimension .title-aux-dimensio-content').html(`Dimension ${(Object.values(event)[dimension]).name}`)
    $('.content-dimension').html((Object.values(event)[dimension]).introduccion)

  }).catch((err) => {

    console.log('ups, paso un error al insertar el texto', err)

  });


}


function info_dimension(json) {

  $('.svg-info-aux').on('click', function (event) {

    //sacar un numero al dar click en el brecumbs
    dimensionNav = $(this).parent()
    navsInDimension = dimensionNav.find('.svg-info-aux')
    index = navsInDimension.index(this)
    dimension_description(json, index)

  })

}


function event_click_div() {


  $('section').on('click', function (event) {
    event.preventDefault()
    event.stopPropagation()

    if ($(this).attr('class') === 'box-information-dimension overlay') {
      $(this).hide()
    }
    else if ($(this).attr('class') === 'box-information overlay') {
      $(this).hide()
    }
    console.log($(this).attr('id'), 'hola')
    console.log($(this).attr('class'), 'no deberiaaparecer')

  })

  $('.box-x-dimension-aux').on('click', function (event) {
    $(this).parent().parent().parent().hide()
    $('#breadcumbs-3').find('.arrow-text').addClass('arrow-active')
    $('#breadcumbs-4').hide()
  })

  $('.box-x-dimension-aux-escritorio').on('click', function (event) {
    $('#escritorio-dimension-box').hide()
    $('.overlay').hide()
    $('#breadcumbs-3').find('.arrow-text').addClass('arrow-active')
    $('#breadcumbs-4').hide()
  })

}


function funcioanlity_box_escritorio(json, dimension, attetionAux, entity, index) {

  json.then(function (value) {
    console.log('entre a la funcion')
    $('#escritorio-dimension-box').show()
    $('#box-dimension-question').css('display', 'none')
    $('#box-dimension-routes').css('display', 'none')
    //$('.overlay').show()
    $('.title-escritorio-dimension').html((Object.values(((Object.entries(((((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux]).sedes)[entity].Entidades))[index][1]).Atenciones)[0]).name)
    $('.content-dimension').html((Object.values(((Object.entries(((((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux]).sedes)[entity].Entidades))[index][1]).Atenciones)[0]).descripcion)
  }).catch((err) => {

    console.log('ups, paso un error al insertar el texto', err)

  })

}


function get_time_multiplier(value, dimension, attetionAux, entity, indexCap) {

  sizeScreenWidth11 = $(window).width()
  sizeScreenHeigth = $(window).height()

  try {
    objectJson = [(Object.entries((Object.values(value)[dimension].TiposDeAtencion))), Object.entries((Object.entries((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux])[1].sedes), Object.entries(((Object.entries((Object.entries((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux])[1].sedes)[entity])[1]).Entidades)]
  } catch (err) {
    console.log('la instancia del json selecionada, esta vacia o le faltan componentes', err)
    objectJson = [(((Object.entries((Object.values(value)[dimension]).TiposDeAtencion)))), Object.entries((Object.entries((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux])[1].sedes)]
  }
  
  //-42% of right es para que se vea bien en el escritorio
  if (objectJson[indexCap].length > 5 && sizeScreenWidth11 > 500) {
    return '83,1.4,-42'
  }
  //-48% of right es para que se vea bien en el escritorio
  else if (objectJson[indexCap].length < 5 && sizeScreenWidth11 > 500) {
    return '85,1.4,-48'
  }
  //30% of right
  else if (objectJson[indexCap].length > 5 && sizeScreenWidth11 <= 375 && sizeScreenHeigth <= 667 ||
    objectJson[indexCap].length > 5 && sizeScreenWidth11 <= 500 && sizeScreenWidth11 > 375 && sizeScreenHeigth <= 800) {
    return `63,1.5,${ ($('#svg-1-6').css('display') !== 'none') ? '6' : '30' }`
  }
  //54% of right
  else if (objectJson[indexCap].length > 5 && sizeScreenWidth11 <= 375 && sizeScreenHeigth > 667 ||
    objectJson[indexCap].length > 5 && sizeScreenWidth11 <= 500 && sizeScreenWidth11 > 375 && sizeScreenHeigth > 800) {
    return `58,1.6,${ ($('#svg-1-6').css('display') !== 'none') ? '6' : '54' }`
  }
  //0% of right
  else {
    return `68,1.37,${ ($('#svg-1-6').css('display') !== 'none') ? '6' : get_increase_size(objectJson,indexCap,sizeScreenWidth11,sizeScreenHeigth) }`
  }

}


//funcion para acomodar el increase depeniendo de 2 facotores el tamaño de la pantalla y la señalitica
function get_increase_size(objectJson,indexCap,sizeScreenWidth11,sizeScreenHeigth) {
   
   //30% of right
   if (sizeScreenWidth11 <= 375 && sizeScreenHeigth <= 667 ||
       sizeScreenWidth11 <= 500 && sizeScreenWidth11 > 375 && sizeScreenHeigth <= 800) {
    return `${ ($('#svg-1-6').css('display') !== 'none') ? '6' : '30' }`
   }
   //54% of right
   else if (sizeScreenWidth11 <= 375 && sizeScreenHeigth > 667 ||
            sizeScreenWidth11 <= 500 && sizeScreenWidth11 > 375 && sizeScreenHeigth > 800) {
    return `${ ($('#svg-1-6').css('display') !== 'none') ? '6' : '54' }`
   }
  
   
}