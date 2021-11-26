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

  $('body').attr('title', 0)

  $('.arrows-lienzo').on('click', function (event) {
    event.preventDefault();
    event.isPropagationStopped();

    //sacar el nombre de la senñalitica
    let name = ($(this).attr('id')).split('-')[0] + '-'


    //sacar un numero al dar click en la felchita
    dimensionNav = $(this).parent()
    navsInDimension = dimensionNav.find('.arrows-lienzo')
    index = navsInDimension.index(this)

    console.log(name, 'oe luna te amo', index)
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

      if (!$('#bread-4').hasClass('box-breadcrumbs-active')) {
        Promise.all([animateBackground(false, sizeScreenWidth),
        animateRute(false, sizeScreenWidth, (index + 1), json, dimension, attetionAux, entity, indexCap, name), animateCharacter(sizeScreenWidth)])

        //incrementar el numero de la capa de donde se encontraba
        $('body').attr('title', Number(($('body').attr('title'))) + 1)
        $('#arrows-1').attr('title', dimension + ',' + attetionAux + ',' + entity)
      }
      else {
        funcionalityInfoContent(json, dimension, attetionAux, entity, index)
        funcionality_botton_text(json, dimension, attetionAux, entity, index)
      }

    }

  })

}


/* animacion del fondo*/
function animateBackground(band, sizeScreenWidth) {

  //let sizeScreenWidth  = $(window).width()
  let sizeScreen = 0;
  let increase = 0;

  //evitar usar los escuchas mientras se hace la animacion
  $('body').removeClass('active')

  const timer = setInterval(function () {

    //si el tamaño de pantalla es superado habra acaba la animacion
    if (sizeScreen < sizeScreenWidth * 2) {
      $('body,html').css('background-position-x', '' + increase + '%')
      increase += 1;
      sizeScreen += 10;
    }
    else {
      band = true;
    }

    if (band) {
      clearInterval(timer)
      band = null
      sizeScreen = 0;
      increase = 0;
      $('body').addClass('active')
    }

  }, 80)

  return timer;

}


/* animacion de la ruta */
function animateRute(band, sizeScreenWidth, screen, json, dimension, attetionAux, entity, indexCap, nameArrow) {

  //variables locales
  let sizeScreen = 0;
  let increase = 0;
  let timeHideRute = ((sizeScreenWidth * 2) * 50) / 100;
  let timeShowRute = ((sizeScreenWidth * 2) * 79) / 100;
  bandAux = true
  bandBrecumbs = true

  var ruteAnimate = setInterval(function () {

    if (sizeScreen < sizeScreenWidth * 2) {

      //mover el svg hacia fuera de la pantalla
      if (sizeScreen <= timeHideRute) {
        $('.detonating-question-box').removeClass('on')
        //$('.detonating-question-box').fadeOut() 
        $('.lienzo').css('right', '' + increase + '%')
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
          funcionalityAskDetoting(indexCap)
          funcionalityBrecumbs(screen)
          funcionalityRute(json, dimension, attetionAux, entity, 1, indexCap, nameArrow);
        }

        //funcionalityRute(json , dimension , attetionAux , entity , 1 , indexCap );
        $('.lienzo').css('right', '' + increase + '%')
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

  }, 80)

  return ruteAnimate
}

/* Animacion del personaje */
function animateCharacter(sizeScreenWidth) {

  //variables
  let sizeScreen = 0;
  let timeSequence = 3
  let imgSequence = 1
  band = true
  killTimer = false


  var animateCharac = setInterval(function () {

    if (sizeScreen < sizeScreenWidth * 2) {

      //cambiar la imagen determinado tiempo  
      if (timeSequence == 4) {
        $('#personaje').find('img').attr('src', 'images/personaje/' + imgSequence + '.png')
        imgSequence++
        timeSequence = 1
      }

      //restablecer la imagen inicial finalizada la primer secuencia
      if (imgSequence > 6) {
        imgSequence = 1
      }

      //incrementos
      timeSequence++
      sizeScreen += 10
    }
    else {
      killTimer = true
      $('#personaje').find('img').attr('src', 'images/personaje/personaje.png')
    }

    if (killTimer) {
      clearInterval(animateCharac)
    }

  }, 80)

  return animateCharac

}


/* Quitar la clase activa en el brecumbs */
function funcionalityBrecumbs(indexArr) {

  let aux = ['a', 'div', 'span']
  let indexCap = Number($('body').attr('title'))

  //quitar la clase activa  
  if (indexCap < 4) {

    $('.box-breadcrumbs').each((index, value) => {

      if ($(value).hasClass('box-breadcrumbs-active')) {
        for (const i of aux) {
          $(value).find(i).removeClass('active')
          $('#bread-' + (indexCap + 1) + '').find(i).addClass('active')
        }

        $(value).removeClass('box-breadcrumbs-active')
        $(value).find('a').attr('style', ' ')

        titleBrecumbs(indexArr, indexCap)

        $('#bread-' + (indexCap + 1) + '').css('display', 'inline-block')
        $('#bread-' + (indexCap + 1) + '').addClass('box-breadcrumbs-active')

      }

    })

  }
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

    console.log(iterador, 'iterador', dimension)
    //insertar el texto de las llaves del json al svg
    for (const attention of objectJson[indexCap]) {
      $('#' + nameArrow + + iterador + '').show()
      console.log(attention[1].tipoTitulo)
      funcionality_title_text(nameArrow, iterador, attention[1], attention[1].tipoTitulo)
      //$('#' + nameArrow + + iterador + '').find('text').html(((attention[1].name).toUpperCase()).slice(0, 9))
      iterador++;
    }


    //apagar las felchas que no son utilizadas
    while (iterador < 9) {
      $('#arrow-' + iterador + '').hide()
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
    $('.title-content-info').find('.title-info').html((((Object.entries((((Object.entries((Object.entries((Object.values(value)[dimension].TiposDeAtencion))[attetionAux])[1].Entidades))[entity])[1]).Atenciones))[index])[1]).name)

    //insertar el contenido
    $('.content-text-info').find('.content-text').html((((Object.entries((((Object.entries((Object.entries((Object.values(value)[dimension].TiposDeAtencion))[attetionAux])[1].Entidades))[entity])[1]).Atenciones))[index])[1]).descripcion)


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

  $('.boton-info').on('click', function (event) {
    event.preventDefault();
    event.isPropagationStopped();

    botonPress = this

    //quitar la clase cuando se esta activada y se vuelve undir de nuevo
    if ($(botonPress).hasClass('active')) {
      band = false
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
      $('.content-text-botton-box').find('.content-text-botton').html((((Object.entries((((Object.entries((Object.entries((Object.values(value)[dimension].TiposDeAtencion))[attetionAux])[1].Entidades))[entity])[1]).Atenciones))[index])[1])[accioneBotton[indexBotton]])

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


    //bajar y subir
    if (band) {
      $(".content-text-botton-box").slideDown('slow');
      $(this).addClass('active')
    }
    else {
      band = true
      $(".content-text-botton-box").slideUp('slow');
      $(this).removeClass('active')
      $('.content-text-botton-box').find('.content-text-botton').html('hola')
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
        } else {
          $(value).hide()
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
        } else {
          $(value).hide()
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
        } else {
          $(value).hide()
        }

      })
      return text
  }

  //$('#'+ nameArrow + + iterador + ' text').html( ((attention[1].name).toUpperCase()).slice(0, 9))
}