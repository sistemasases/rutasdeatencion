/**
* Management - Funcionalidad de la capa de informacion
* @author Cristian Duvan Machado Moquera
* @copyright 2021 Cristian Duvan Machado Mosquera <cristian.machado@correounivalle.edu.co>
* @license  http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
*/


/* Funcionalidad de rutas de atencion svg 
   TODO: Acomodar cuando la caminata es false y se pasa los parametros de la url a la funcion
*/
function rutesAttentionMovil(json) {

  let dimension, attetionAux, entity;
  let sizeScreenWidth = 376
  $('.arrow-1').addClass('active')
  $('body').attr('title', 0)

  $('.arrows-lienzo').on('click', function (event) {
    event.preventDefault();
    event.isPropagationStopped();

    //sacar el nombre de la señalitica
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

      if (valiate_params_url() !== '1111' && $('header').hasClass('active-url')) {
     
        //quitar la clase active-url del header
        $('header').removeClass('active-url')

        //variabes
        var params_url = get_params_url()
        var array_value_params = []

        for (key in params_url) {

          if (params_url[key] != null) {
            array_value_params.push(Number(params_url[key]))
          }
          else {
            array_value_params.push(0)
          }
         
        }
        

        array_value_params[indexCap] = index

        dimension = array_value_params[0]
        attetionAux = array_value_params[1]
        entity = array_value_params[2]
      }

      json.then(function (value) {
      //console.log( dimension, attetionAux, entity, (Number(indexCap) === 3)? index : 0 , indexCap , 'caminata','salida 87')
      if (get_name_dimension(value, dimension, attetionAux, entity, (Number(indexCap) === 3)? index : 0 , indexCap , 'caminata')) {
        if (sizeScreenWidthAux <= 500) {
          Promise.all([animateBackgroundNew(false, sizeScreenWidth, true, json, dimension, attetionAux, entity, indexCap),
          animateRuteNew(false, sizeScreenWidth, (index + 1), json, dimension, attetionAux, entity, indexCap, name, nameDimension), animateCharacterNew(json, dimension, attetionAux, entity, indexCap, sizeScreenWidth)])
        }
        else {

          Promise.all([animateCharacterNew(json, dimension, attetionAux, entity, indexCap, sizeScreenWidth), animateBackgroundNew(false, sizeScreenWidth, true, json, dimension, attetionAux, entity, indexCap), animateRuteNew(false, sizeScreenWidth, (index + 1), json, dimension, attetionAux, entity, indexCap, name, nameDimension)])

          //alert('La pantalla no es suficiente para la animacion')
        }
        console.log('entro pero que raro')
        //incrementar el numero de la capa de donde se encontraba 
        $('body').attr('title', Number(($('body').attr('title'))) + 1)
        $('#arrows-1').attr('title', dimension + ',' + attetionAux + ',' + entity + ',' + name)
      }
      else {

        if (Number(indexCap) === 3) {
        $('.arrow-3').removeClass('arrow-active')
        $('.arrow-3').find('.arrow-text').removeClass('arrow-active')
        $('.arrow-4').find('.arrow-text').addClass('arrow-active')
        $('.arrow-4').show()
        $('.arrow-4').find('.arrow-text').html(nameDimension)
        }


        if (sizeScreenWidthAux <= 500) {
          console.log(dimension, attetionAux, entity, index, 'salidad 89')
          funcionalityInfoContent(json, dimension, attetionAux, entity, (Number(indexCap) === 3)? index : 0 )
          funcionality_botton_text(json, dimension, attetionAux, entity, (Number(indexCap) === 3)? index : 0 )
        }
        else {
          console.log('entro pero que raro 25')
          funcioanlity_box_escritorio(json, dimension, attetionAux, entity, (Number(indexCap) === 3)? index : 0 )
        }


      }

      })

    }

  })

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

        //console.log($(`.${clasName}`).width(), 'Object.isSealed(value)', timeHideRute)
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
          //console.log(imgSequence, 'imgSequence', imgSequence - 1, 'imgSequence - 1')
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

    $('.title-dimension .title-aux-dimensio-content').html(`Dimension ${((Object.values(event)[dimension]).name).replace(',', ' ')}`)
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

  $('.box-x-dimension-aux , .box-x-dimension-end-aux').on('click', function (event) {
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
console.log('entre a la funcion')
  try {
    objectJson = [(Object.entries((Object.values(value)[dimension].TiposDeAtencion))), Object.entries((Object.entries((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux])[1].sedes), Object.entries(((Object.entries((Object.entries((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux])[1].sedes)[entity])[1]).Entidades)]
  } catch (err) {
    console.log('la instancia del json selecionada, esta vacia o le faltan componentes', err)
    objectJson = [(((Object.entries((Object.values(value)[dimension]).TiposDeAtencion)))), Object.entries((Object.entries((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux])[1].sedes)]
  }

  //-42% of right es para que se vea bien en el escritorio
  if (objectJson[indexCap].length > 5 && sizeScreenWidth11 > 500) {
    return '73,0.9,-42,-42'
  }
  //-48% of right es para que se vea bien en el escritorio
  else if (objectJson[indexCap].length < 5 && sizeScreenWidth11 > 500) {
    return '75,0.9,-48,-48'
  }
  //30% of right
  else if (objectJson[indexCap].length > 5 && sizeScreenWidth11 <= 375 && sizeScreenHeigth <= 667 ||
    objectJson[indexCap].length > 5 && sizeScreenWidth11 <= 500 && sizeScreenWidth11 > 375 && sizeScreenHeigth <= 800) {
    return `63,1.5,${($('#svg-1-6').css('display') !== 'none') ? '6' : '30'},30`
  }
  //54% of right
  else if (objectJson[indexCap].length > 5 && sizeScreenWidth11 <= 375 && sizeScreenHeigth > 667 ||
    objectJson[indexCap].length > 5 && sizeScreenWidth11 <= 500 && sizeScreenWidth11 > 375 && sizeScreenHeigth > 800) {
      
      return `58,1.6,${($('#svg-1-6').css('display') !== 'none') ? '6' : '54'},54`
  }
  //0% of right
  else {
    console.log('entre a la opcion de 0% de right')
    return `68,1.37,${($('#svg-1-6').css('display') !== 'none') ? '6' : get_increase_size(objectJson, indexCap, sizeScreenWidth11, sizeScreenHeigth)}`
  }

}


//funcion para acomodar el increase depeniendo de 2 facotores el tamaño de la pantalla y la señalitica
function get_increase_size(objectJson, indexCap, sizeScreenWidth11, sizeScreenHeigth) {

  //30% of right
  if (sizeScreenWidth11 <= 375 && sizeScreenHeigth <= 667 ||
    sizeScreenWidth11 <= 500 && sizeScreenWidth11 > 375 && sizeScreenHeigth <= 800) {
    return `${($('#svg-1-6').css('display') !== 'none') ? '6' : '30'}`
  }
  //54% of right
  else if (sizeScreenWidth11 <= 375 && sizeScreenHeigth > 667 ||
    sizeScreenWidth11 <= 500 && sizeScreenWidth11 > 375 && sizeScreenHeigth > 800) {
    return `${($('#svg-1-6').css('display') !== 'none') ? '6' : '54'}`
  }


}


/**
 * @method get_params_url
 * @description funcion para capturar los parametros de la url y retornarlos
 * @returns objecttype json
 */
function get_params_url() {

  //capturar los parametros de la url
  var url_string = window.location.href
  var url = new URL(url_string)
  var dm = url.searchParams.get("dm")
  var at = url.searchParams.get("at")
  var sd = url.searchParams.get("sd")
  var atx = url.searchParams.get("atx")

  console.log('dm', dm, 'at', at, 'sd', sd, 'atx', atx)

  //retornar los parametros de la url 
  return {
    dm: dm,
    at: at,
    sd: sd,
    atx: atx
  }

}

/**
 * @method valiate_params_url
 * @description funcion para verificar que los parametros de la url sean correctos
 * @returns 
 */
function valiate_params_url() {

  var params = get_params_url()
  var regexp = /^[0-7]{1}$/
  var index = ''

  //recorer los parametros de la url
  for (var key in params) {


    //validar que los parametros de la url sean correctos
    if (regexp.exec(params[key]) != null) {
      index += '0'
    }
    else {
      index += '1'
    }

  }

  //verficar el tipo de la url
  if (index === '0111' || index === '0011' || index === '0001' || index === '0000') {
    return index
  }
  else {
    return '1111'
  }

}

/**
 * @method carry_box_dimension
 * @description funcion para llevarlo a la dimension que seleciono el usuario
 * @returns 
 */
function carry_box_dimension(json) {


  json.then((value) => {

    var params_boolean = valiate_params_url()
    var sizeScreenWidth = $(window).width()
    var params = get_params_url()
    var array_value_params = []
    var index = 0
    var show_breadcrumb = 0


    //si el parametro de la url es correcto hacer el caminado
    if (params_boolean !== '1111') {

      //recorer los parametros de la url
      for (var key in params) {

        if (params[key] !== null) {
          array_value_params.push(Number(params[key]))
          index++
        } else {
          array_value_params.push(0)
        }

      }


      var permission_walk = get_name_dimension(value, array_value_params[0],  array_value_params[1],  array_value_params[2],  array_value_params[3], index - 1 , 'caminata')
      //las capas de la dimension inician en 1 por eso se resta 1
      show_breadcrumb = (permission_walk)? index - 1 : (index === 4)? index -1 : index - 2

     

      //pasar los paremtros a la dimension que seleciono el usuario
      $('body').attr('title', (index < 4)? (  (permission_walk)? index : index - 1 ) : 3)
      $('#bread-1').removeClass('box-breadcrumbs-active')
      $('#arrows-1').attr('title', array_value_params[0] + ',' + array_value_params[1] + ',' + array_value_params[2] + ',' + 'arrows-')
      
      console.log(index, show_breadcrumb , 'flores para sebas')

      //activar el brecumbs 
      for (var i = 0; i < ( (!permission_walk && index != 4)? index - 1 : index )  ; i++) {
        console.log('i', i)
        name_dimension = (get_name_dimension(value, array_value_params[0], array_value_params[1], array_value_params[2], array_value_params[3], show_breadcrumb,'name'))
        funcionalityBrecumbs(show_breadcrumb, (name_dimension).split(',')[((name_dimension).split(',')).length - 1].replace(',',' ').toUpperCase())
        show_breadcrumb--
      }

      //mostrar el brecumbs
      show_brecumbs()

      //ocultar que son las rutas
      $('#box-dimension-routes').hide()

      //quitar los signos de exclamacion de la señalitica
      $('.svg-info-aux').each(function (index, value1) {
        $(value1).hide()
      })

      //saber si el svg esta oculto
      if (index < 4) {

      if (size_object_senalitica(value, array_value_params, ( (permission_walk)?  index - 1: index - 2 ) ).length > 5) {
        $(`.lienzo`).css('right', `${get_time_multiplier(value, array_value_params[0], array_value_params[1], array_value_params[2], ( (permission_walk)?  index - 1: index - 2 )).split(',')[3]}%`)
      }

     }


      //añadir la clase activa al breadcrumbs
      add_class_active_brecumbs_params_url((!permission_walk && index != 4 )? index - 1 : index )

      //poner los nombres en las señaliticas
      funcionalityRute(json, array_value_params[0], array_value_params[1], array_value_params[2], 1, (index < 4)?  ( (permission_walk)? index - 1 : index - 2 ): 2 , 'arrows-')
      
      //si todos los paremetros son diferentes de null mostrar la caja
      if (!permission_walk) {   
          
         if (sizeScreenWidth <= 500) { 
          funcionalityInfoContent(json, array_value_params[0], array_value_params[1], array_value_params[2], array_value_params[3])
         }
         else {
          funcioanlity_box_escritorio(json, array_value_params[0], array_value_params[1], array_value_params[2], array_value_params[3] )
         }

      } 

      
      $('#arrow-box-principality').removeClass('breadcrumbs-active-click')
 
    }
    else {
      console.log('los parametros de la url no son incorrectos')
    }

  }).catch((error) => {

    console.log('error', error)

  })

}

/**
 * @method get_name_dimension
 * @description funcion para obtener el nombre de la dimension
 * @returns 
 */
function get_name_dimension(value, index, attention, sedes, entity, indexAux , key) {

  objectCap = {
    0: Object.values(value)[index][key],
    1: Object.values(Object.values(value)[index].TiposDeAtencion)[attention][key],
    2: Object.values(Object.values(Object.values(value)[index].TiposDeAtencion)[attention].sedes)[sedes][key],
    3: Object.values(Object.values(Object.values(Object.values(value)[index].TiposDeAtencion)[attention].sedes)[sedes].Entidades)[entity][key]
  }
  console.log('objectCap', objectCap[indexAux])
  return objectCap[indexAux]

}


/**
 * @method add_class_active_brecumbs_params_url
 * @description funcion para añadir la clase active al breadcrumbs
 * @returns 
 */
function add_class_active_brecumbs_params_url(indexUrlParams) {

  //each of jequry
  $('.arrow-7').each(function (index, element) {

    if (indexUrlParams === index) {
      $(element).find('.arrow-text').addClass('arrow-active')
      $(element).addClass('arrow-active')
    }else {
      $(element).find('.arrow-text').removeClass('arrow-active')
      $(element).removeClass('arrow-active')
    }

  })


}


/**
 * @method size_object_senalitica
 * @description funcion para saber el tamaño del objeto
 * @returns 
 */
function size_object_senalitica(value, array_value_params, indexAux) {
  
  //console de array_value_params
  console.log('array_value_params en size', array_value_params)

  //variables
  dimension = array_value_params[0]
  attention = array_value_params[1]
  entity = array_value_params[2]

  objectCap = {
    0: Object.entries((Object.values(value)[dimension].TiposDeAtencion)),
    1: Object.entries((Object.entries((Object.values(value)[dimension]).TiposDeAtencion)[attention])[1].sedes),
    2: Object.entries(((Object.entries((Object.entries((Object.values(value)[dimension]).TiposDeAtencion)[attention])[1].sedes)[entity])[1]).Entidades)
  }

  return objectCap[indexAux]

}


//(Object.values(((Object.entries(((((Object.values(value)[dimension]).TiposDeAtencion)[attetionAux]).sedes)[entity].Entidades))[index][1]).Atenciones)[0]).name
/**
 * @method get_info_box_senalitica
 * @description funcion para sacar el titulo y el contenido de la señalitica
 * @returns 
 */
function get_info_box_senalitica(value, dimension, attention, entity, indexAux) {

  objectCap = {
    0: Object.entries((Object.values(value)[dimension].TiposDeAtencion)),
    1: Object.entries((Object.entries((Object.values(value)[dimension]).TiposDeAtencion)[attention])[1].sedes),
    2: Object.entries(((Object.entries((Object.entries((Object.values(value)[dimension]).TiposDeAtencion)[attention])[1].sedes)[entity])[1]).Entidades)
  }

  return objectCap[indexAux]

}