import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FireServiceProvider } from 'src/providers/api-service/fire-service';
import { GlobalServiceService } from '../global-service.service';
import { Categoria } from '../modelo/Categoria';
import { Producto } from '../modelo/Producto';

@Component({
  selector: 'app-update-prod',
  templateUrl: './update-prod.component.html',
  styleUrls: ['./update-prod.component.scss']
})
export class UpdateProdComponent implements OnInit {

  producto: Producto = new Producto();
  productoNuevo: Producto = new Producto();


  imageFile!: File;
  imageFileName!: string;
  lastFileName!: string;

  categorias:Array<Categoria>= new Array<Categoria>();

  categoriaProducto:Array<Producto>= new Array<Producto>();
  ultimoId:number=0

  sub:any;

  private controlSubido:boolean=false;


  constructor(private firebaseService: FireServiceProvider,
    private route: ActivatedRoute,
    private router: Router,
    private globalService:GlobalServiceService) { }

  ngOnInit(): void {

    if(!this.globalService.usuarioGlobal.administrador){
      this.router.navigate(['/home']);
    }

    this.sub=this.route.params.subscribe(params=>{
      this.producto=Producto.createFromJsonObject(params)

      if(this.producto.id!=undefined){
        this.productoNuevo=this.producto;
      }
    })
  
  }

  ngOnDestroy(){
    if(!this.controlSubido){
      this.firebaseService.removeFile(this.productoNuevo.imagen)
      .then(()=>{

      }).catch((error)=>{
        console.log(error)
      })
    }
  }


  onSubmit() {
    this.getCategoria()
    
  }


  imageOnChange(event: any) {
    this.imageFile = event.target.files.item(0);
    var extension = this.imageFile.name.substr(
      this.imageFile.name.lastIndexOf('.') + 1
    );
    //doy al nombre del fichero un número aleatorio
    //le pongo al nombre también la extensión del fichero
    this.imageFileName = `${new Date().getTime()}.${extension}`;
    this.productoNuevo.imagen = '';
    if (this.imageFile.type.split('/')[0] === 'image') {
      this.firebaseService
        .uploadImage(this.imageFile, this.imageFileName)
        .then((downloadUrl: any) => {
          this.firebaseService
            .removeFile(this.lastFileName)
            .then(() => { })
            .catch((error: string) => { });
          this.productoNuevo.imagen = downloadUrl;
          this.lastFileName = downloadUrl;

        })
        .catch((error) => { });
    } else {
      alert('El fichero no es una imagen')
    }
  } //end imageOnChange

  deshabilitar(){
    if (this.productoNuevo.nombre == '') return true;
    if (this.productoNuevo.categoria == null) return true;
    if (this.productoNuevo.instrumento == '') return true;
    if (this.productoNuevo.descripcion == '') return true;
    if (this.productoNuevo.precio<5) return true;
    if(this.productoNuevo.stock<1) return true;
    if(this.productoNuevo.imagen =='') return true;

    return false;
  }

  getCategoria(){
    //Obtengo todas las categorias
    this.firebaseService.getCategorias()
    .then((data)=>{
      this.categorias=data

      this.categorias.forEach((data)=>{
        data.productos.forEach((p)=>{

          //Obtengo el ultimo id
          if(this.ultimoId<parseInt(p.id.split('-')[1])){
            this.ultimoId=parseInt(p.id.split('-')[1])
          }
            
          //Recojo solo la categoria que me interesa
          if(p.categoria==this.productoNuevo.categoria){
            this.categoriaProducto.push(p);
          }
        })
       })
    
      
     
      this.insertarProducto(this.productoNuevo,this.categoriaProducto)

    })
  }


  insertarProducto(producto:Producto,array:Array<Producto>){
    if(this.producto.id!=undefined){
      //Actualizar
      for(let inx=0; inx<array.length; inx++){
        if(this.producto.id==array[inx].id){


          //Cambio el producto
          delete array[inx];
          array[inx]=producto;
          
          //Si la imagen ha sido modificada, borro la anterior
          if(producto.imagen!=this.producto.imagen){
            this.firebaseService.removeFile(this.producto.imagen)
            .then(()=>{

            }).catch((error)=>{
              console.log(error)
            });
          }
    
    
          //Creo la categoria para actualizarla
          let categoria= new Categoria()
          categoria.id=producto.categoria;
          categoria.nombre=producto.categoria;
          categoria.productos=array

          console.log(categoria)
    
          //Actualizo la categoria
          this.firebaseService.modificarCategoria(categoria)
          .then(()=>{
            this.controlSubido=true;
            this.router.navigate(['/home'])
          }).catch((error:string)=>{
            console.log(error)
          })
        }
      }
      
    }else{
      //Insertar

       //Si es para insertar un nuevo objeto, le añado el id
     
        if(this.ultimoId<100){
          producto.id='P-0'+(this.ultimoId+1);
        }else{
          producto.id='P-'+(this.ultimoId+1);
        }
       
      array.push(producto)

      //Creo la categoría para modificarla
      let categoria= new Categoria()
      categoria.id=producto.categoria;
      categoria.nombre=producto.categoria;
      categoria.productos=array

      //Modifico la categoria con el nuevo articulo
      this.firebaseService.modificarCategoria(categoria)
      .then(()=>{
        this.controlSubido=true;
        this.router.navigate(['/home'])
      }).catch((error:string)=>{
        console.log(error)
      })
      
    }
    
    
  }


}
