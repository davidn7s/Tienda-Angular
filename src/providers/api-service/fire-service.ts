import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Categoria } from 'src/app/modelo/Categoria';
import { Pedido } from 'src/app/modelo/Pedido';
import { Producto } from 'src/app/modelo/Producto';
 

import { Usuario } from '../../app/modelo/Usuario';

@Injectable()
export class FireServiceProvider {

    constructor(private angularFirestore: AngularFirestore,
        private afStorage: AngularFireStorage) {
    }




     //=============
    //| Ficheros  |
    //=============

    uploadImage(file: File, name: string): Promise<string> {
        var promise: Promise<string> = new Promise<string>((resolve, reject) => {
            //Se comprueba que el tipo del fichero pertenece a un tipo imagen
            if (file.type.split('/')[0] !== 'image') {
                reject("El fichero no es de tipo imagen");
            }
            //se calcula el path dentro del storage de firebase
            const fileStoragePath = `imagenesProductos/${name}`;

            // Image reference
            const imageRef = this.afStorage.ref(fileStoragePath);

            // File upload task
            this.afStorage.upload(fileStoragePath, file)
                .then((data) => {
                    imageRef.getDownloadURL().subscribe(resp => {
                        resolve(resp);
                    });
                })
                .catch((error) => {
                    reject(error);
                });
        });
        return (promise);
    }//end_uploadImage


    removeFile(fileUrl: string): Promise<string> {

        var promise: Promise<string> = new Promise<string>((resolve, reject) => {

            var imageRef = this.afStorage.refFromURL(fileUrl);

            imageRef.delete().subscribe(resp => {

                resolve(resp);

            },

                error => {

                    reject(error);

                });

        });

        return (promise);

    }//end_uploadImage

//======================================================================================

    //====================
    //| Objetos firebase |
    //====================

//======================================================================================

    //==============
    //| Getters By |
    //==============

    getUsuarioByEmail(email:string): Promise<Usuario> {
        let promise = new Promise<Usuario>((resolve, reject) => {
            const usuariosRef = this.angularFirestore.collection('Usuarios').ref;
            usuariosRef.where('email', '==', email).get()
                .then((data: any) => {

                    let usuario = new Usuario
                    data.forEach((element:any) => {
                        let usuarioJson = element.data();
                        usuario = Usuario.createFromJsonObject(usuarioJson);

                    });
                    resolve(usuario);
                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end get usuarios



    getCategorias(): Promise<Categoria[]> {
        let promise = new Promise<Categoria[]>((resolve, reject) => {
          const categoriaRef = this.angularFirestore.collection('Categorias');
          const snapshot = categoriaRef.get().toPromise()
            .then((data: any) => {
              let categorias = new Array<Categoria>();
              data.forEach((element:any) => {
                let categoriaJson = element.data();
                let categoria = Categoria.createFromJsonObject(categoriaJson);
                categorias.push(categoria);
              });
              resolve(categorias);
            })
            .catch((error: Error) => {
              reject(error.message);
            });
        });
        return promise;
      }






//======================================================================================

    //===========
    //| Updates |
    //===========


    modificarCategoria(nuevosDatosCategoria: Categoria): Promise<Categoria> {
        let promise = new Promise<Categoria>((resolve, reject) => {
            this.angularFirestore.collection("Categorias").doc(nuevosDatosCategoria.id).update(JSON.parse(JSON.stringify(nuevosDatosCategoria)))
                .then(() => {
                    resolve(nuevosDatosCategoria);
                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_modificar_categoria


    modificarUsuario(nuevosDatosUsuario: Usuario): Promise<Usuario> {
        let promise = new Promise<Usuario>((resolve, reject) => {
            this.angularFirestore.collection("Usuarios").doc(nuevosDatosUsuario.id).update(JSON.parse(JSON.stringify(nuevosDatosUsuario)))
                .then(() => {
                    resolve(nuevosDatosUsuario);
                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_modificar_noticia


   

//======================================================================================

    //===========
    //| Inserts |
    //===========

    insertarUsuario(datosNuevoUsuario: Usuario): Promise<Usuario> {
        let promise = new Promise<Usuario>((resolve, reject) => {
            datosNuevoUsuario.id = this.angularFirestore.collection("Usuarios").ref.doc().id;
            this.angularFirestore.collection("Usuarios").doc(datosNuevoUsuario.id).set(JSON.parse(JSON.stringify(datosNuevoUsuario)))
                .then(() => {
                    
                    resolve(datosNuevoUsuario);
                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_insertarUsuario



    insertarPedido(datosNuevoPedido: Pedido): Promise<Pedido> {
        let promise = new Promise<Pedido>((resolve, reject) => {
            datosNuevoPedido.id = this.angularFirestore.collection("Pedidos").ref.doc().id;
            this.angularFirestore.collection("Pedidos").doc(datosNuevoPedido.id).set(JSON.parse(JSON.stringify(datosNuevoPedido)))
                .then(() => {
                    resolve(datosNuevoPedido);
                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_insertarCategoria

    


}//end_class