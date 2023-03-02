import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'filtro'
})

export class FilterPipe implements PipeTransform{

  transform(array:any[], filtrador:string) {
    if(filtrador==='')
      return array;

    //Poner todo a minúsculas para que no importe como se ha escrito
    filtrador=filtrador.toLocaleLowerCase();  

    //Devolver array ya filtrado
    return array.filter((item)=>{
      return item.nombre.toLowerCase().includes(filtrador);
    });
  
  }
}
