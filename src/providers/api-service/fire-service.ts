import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Categoria } from 'src/app/modelo/Categoria';
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

    uploadPdfDocument(file: File, name: string): Promise<string> {
        var promise: Promise<string> = new Promise<string>((resolve, reject) => {
            //Se comprueba que el tipo del fichero pertenece a un tipo pdf
            if (file.type !== 'application/pdf') {
                reject("El fichero no es de tipo pdf");
            }
            //se calcula el path dentro del storage de firebase
            //se guarda dentro de una carpeta avatar
            //el nombre del fichero es igual al id del usuario precedido de la hora dada por getTime 
            const fileStoragePath = `repertorio/${name}`;

            // Image reference
            const pdfRef = this.afStorage.ref(fileStoragePath);

            // File upload task
            this.afStorage.upload(fileStoragePath, file)
                .then((data) => {
                    pdfRef.getDownloadURL().subscribe(resp => {
                        resolve(resp);
                    });
                })
                .catch((error) => {
                    reject(error);
                });
        });
        return (promise);
    }//end uploadPdfDocument

    uploadImage(file: File, name: string): Promise<string> {
        var promise: Promise<string> = new Promise<string>((resolve, reject) => {
            //Se comprueba que el tipo del fichero pertenece a un tipo imagen
            if (file.type.split('/')[0] !== 'image') {
                reject("El fichero no es de tipo imagen");
            }
            //se calcula el path dentro del storage de firebase
            const fileStoragePath = `imagenesNoticias/${name}`;

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

    //==============
    //| Getters TR |
    //==============

    getUsuariosTR(): any {
        return (this.angularFirestore.collection('Usuarios').snapshotChanges());
    }

    getCategoriasTR(): any {
        return (this.angularFirestore.collection('Categoria').snapshotChanges());
    }



//======================================================================================

    //===========
    //| Deletes |
    //===========

    eliminarUsuario(usuario: Usuario, valor:boolean): Promise<Boolean> {
        let promise = new Promise<Boolean>((resolve, reject) => {
            this.angularFirestore.collection('Usuarios').doc(usuario.id).delete().then(
                (data: any) => { 
                    if(valor){
                    //Email para eliminar de la autenticación de Firebase
                    let usu={
                        emailBorrar: usuario.email,
                        fechaBorrado: new Date()
                    }
                   this.angularFirestore.collection('UsuariosBorrados').add(usu)

                }
                    resolve(true);
                }
            )
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_eliminar_usuario


    eliminarCategoria(categoria: Categoria): Promise<Boolean> {
        let promise = new Promise<Boolean>((resolve, reject) => {
            this.angularFirestore.collection('Categorias').doc(categoria.id).delete().then(
                (data: any) => { 
                    resolve(true);
                }
            )
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_eliminar_noticia


//======================================================================================

    //===========
    //| Updates |
    //===========

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
    }//end_modificar_usuario

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


    insertarCategoria(datosNuevoCategoria: Categoria): Promise<Categoria> {
        let promise = new Promise<Categoria>((resolve, reject) => {
            datosNuevoCategoria.id = this.angularFirestore.collection("Categorias").ref.doc().id;
            this.angularFirestore.collection("Categorias").doc(datosNuevoCategoria.id).set(JSON.parse(JSON.stringify(datosNuevoCategoria)))
                .then(() => {
                    resolve(datosNuevoCategoria);
                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_insertarNoticia

    


}//end_class