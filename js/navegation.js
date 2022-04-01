/**
* Management - Funcionalidad de la capa de informacion
* @author Cristian Duvan Machado Moquera
* @copyright 2021 Cristian Duvan Machado Mosquera <cristiankm4088@gmail.com>
* @license  http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
*/

$(function () {

  /*     variables       */
  let sizeScreenWidth = $(window).width()
  //obtener la informacion del json
  const json = getJson();


  /* fin de las varibles */

  //activar las funciones en paralelo
  Promise.all([screenResponsiveWebDesing(json), svgPaint(json), rutesAttentionMovil(json),info_dimension(json),event_click_div()])
 
  if (sizeScreenWidth <= 500) {
    
    $('#title-brecumbs-aux').removeClass('title-aux-escritorio')
    $('.arrow-7').each(function (index, value) {
       console.log(index,value)
       $(value).removeClass('border-escritorio')
    })
   
  }
  else {
    $('#box-dimension-question').hide()
  }
  

   $('#box-dimension-routes').show()
  /* EVENTOS CLICK  */


});




/* Pinta la capa mayor que corresponde a los nombres de las dimensiones */
function svgPaint(json) {

  let i = 0;
  //apagar el svg de 8 banderitas
  $('#svg-1-8').hide();
  $('#svg-1-6').show();
  
  json.then(function (event) {

    let iterador = Object.keys(event).length
    console.log(Object.values(event), 'iterador')
    for (const dimension of Object.values(event)) {
      //incrementos
      iterador++;
      i++;
      //activar la flecha 
      $('#arrow-' + i).show()
      //ocultar flechas 
      $('#arrow-' + iterador).hide()
      //insertar el texto correspiente de la flecha
      $('#arrow-' + i + '').find('text').each(function (index, value) {
        if (index == 0 && dimension.tipoTitulo != 2) {
          $(value).show()
          $(value).html((dimension.name).toUpperCase())
          $(value).attr('title', 1)
        }
        else if (index > 0 && index < 3 && dimension.tipoTitulo == 2) {
          $(value).show()
          $(value).html((dimension.name).split(',')[index-1].toUpperCase())
          $(value).attr('title', 1)
        } 
        else {
          $(value).hide()
          $(value).attr('title', 0)
        }
      })

    }
    //liberar memoria 
    iterador = null
    i = null
  }).catch((err) => {

    console.log('ups, paso un error al insertar el texto', err)

  });

}

//pruebas del json de la nueva version
function getJsonNew(json) {

  json.then((value) => {
    
    console.log(Object.values(Object.values(((Object.entries(((((Object.values(value)[0]).TiposDeAtencion)[2]).sedes)[0].Entidades))[1][1]).Atenciones)))
    //console.log( (Object.values(value)[0]) )

  }).catch((err) => {
    console.log('ups, paso un error al insertar el texto', err)
  })

}

/* Peticion local al servidor donde se aloja el json  */
async function getJson() {

  const answer = await fetch('dataBase/data.json');

  if (!answer.ok) {

    let error = "Error 404. dataBase Json, no found";
    console.log("hey")
    throw new Error(error);

  }
  else {

    const objectJson = answer.json();
    return objectJson;

  }


}











