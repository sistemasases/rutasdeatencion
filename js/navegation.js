

$(function() {
 
     /*     variables       */

     //obtener la informacion del json
     const json = getJson();


     /* fin de las varibles */

     //activar las funciones en paralelo
     Promise.all([screenResponsiveWebDesing(json),svgPaint(json) ,rutesAttentionMovil(json)])
    
     /* EVENTOS CLICK  */


});


/* Pinta la capa mayor que corresponde a los nombres de las dimensiones */
function svgPaint(json) {
  
  let i = 1;
  json.then( function(event) {

    let iterador = Object.keys(event).length
    
    for (const dimension of  Object.values(event) ) {
    //incrementos
    iterador++;
    i++;
    //activar la flecha 
    $('#arrow-'+i).show()
    //ocultar flechas 
    $('#arrow-'+iterador).hide()
    //insertar el texto correspiente de la felcha
    $('#arrow-'+i + ' text').html((dimension.name).toUpperCase())
    console.log(iterador)
    }
    //liberar memoria 
    iterador = null
    i = null
  }).catch((err) => {

      console.log('ups, paso un error al insertar el texto' , err)
      
  });

}


/* INSERTAR EL TEXTO DEL JSON A SU RESPECTIVO CAJON */
function get_information_about_attention(json,objectInsert,attention,nameEntity,about) {

    //variables internas   
    let dimension;
    let nameAttention;

    //obtener el nombre de la dimension presionada
    $('.dimension').each( (index,value)=> {
        
         if ( $(value).hasClass('active') ) {
         dimension = $(value).attr('title');
         console.log(dimension)
         }

    })

    //Insertar el texto 
    json.then( (value) => {

      // no olvidar colocar una restricion para la dimension individual
      nameAttention = (Object.keys(value[dimension][attention][nameEntity]))[0]
      $(objectInsert).html(value[dimension][attention][nameEntity][nameAttention][about])
      
    }).catch(  (err) => {

      console.log('ups, paso un error al insertar el texto' , err)
      
    });
   
}

//pruebas del json de la nueva version
function getJsonNew(json) {
    
  json.then( (value) => {

    console.log( Object.entries((Object.values(((Object.entries((Object.values(value)[0]).TiposDeAtencion))[1])[1]))[2]) ) 
    //console.log( (Object.values(value)[0]) )

  }).catch( (err) => {
    console.log('ups, paso un error al insertar el texto' , err)
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





