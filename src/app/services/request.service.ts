import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    master: any;

    constructor(private http: HttpClient, private router: Router, private notifier: NotifierService) {
    }
    showAlert(message: string, type: any) {
        this.notifier.notify(type, message);
    }

    async getAbogados(ciudad, especialidad) {
        let params = new HttpParams
        params = params.append("especialidad", especialidad);
        params = params.append("ciudad", ciudad)
        return new Promise((resolve) => {
            this.http
                .get(`${environment.apiUrl}/abogados`, { params })
                .subscribe(
                    (response: any) => {
                        resolve([true, response.data]);
                    },
                    (error: any) => {
                        console.log(error.status);
                        this.showAlert("Error al cargar información.", "error");

                        resolve([false]);
                    }
                );
        });

    }

    async getCiudades() {
        return new Promise((resolve) => {
            this.http
                .get(`${environment.apiUrl}/ciudades`)
                .subscribe(
                    (response: any) => {
                        resolve([true, response.data]);
                    },
                    (error: any) => {
                        console.log(error.status);
                        this.showAlert("Error al cargar información.", "error");

                        resolve([false]);
                    }
                );
        });

    }

    async getEspecialidades() {
        return new Promise((resolve) => {
            this.http
                .get(`${environment.apiUrl}/especialidades`)
                .subscribe(
                    (response: any) => {
                        resolve([true, response.data]);
                    },
                    (error: any) => {
                        console.log(error.status);
                        this.showAlert("Error al cargar información.", "error");

                        resolve([false]);
                    }
                );
        });

    }


    async getCalificacionesPorAbogado(id: any) {
        return new Promise(resolve => {
            this.http.get(`${environment.apiUrl}/abogados/${id}/calificaciones`).subscribe((response: any) => {
                resolve([true, response.data]);
            }, (error: any) => {
                error.status
                this.showAlert(error.error.mensaje, 'error');

                resolve(false);
            });
        });
    }

    async createCalificion(body) {
        return new Promise(resolve => {
            this.http.post(`${environment.apiUrl}/calificaciones`, body).subscribe((response: any) => {
                this.showAlert("Calificación enviada", 'success');
                resolve(true);
            }, (error: any) => {
                error.status
                this.showAlert(error.error.mensaje, 'error');
                resolve(false);
            });
        });
    }

    async getCitas() {
        return new Promise(resolve => {
            this.http.get(`${environment.apiUrl}/citas/1`).subscribe((response: any) => {
                resolve([true, response.data]);
            }, (error: any) => {
                error.status
                this.showAlert(error.error.mensaje, 'error');
                resolve(false);
            });
        });
    }

    async createCita(body: any) {
        return new Promise(resolve => {
            this.http.post(`${environment.apiUrl}/citas`, body,).subscribe((response: any) => {
                this.showAlert("Cita creada", 'success');
                resolve(true);
            }, (error: any) => {
                error.status
                this.showAlert(error.error.mensaje, 'error');
                resolve(false);
            });
        });
    }

    async deleteCita(id: string) {
        return new Promise(resolve => {
            this.http.delete(`${environment.apiUrl}/citas/${id}`,).subscribe((response: any) => {
                this.showAlert("Cita eliminada", 'success');
                resolve([true, response.data]);
            }, (error: any) => {
                error.status
                this.showAlert(error.error.mensaje, 'error');
                resolve([false])
            });
        })
    }
}