import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from 'app/services/request.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styles: [`
    ngb-progressbar {
        margin-top: 5rem;
    }
    `]
})

export class ComponentsComponent implements OnInit {
    ciudad = ""
    ciudades = []
    especialidad = ""
    especialidades = []
    abogados = []
    citas = []
    cita: any = {}
    calificacion: any = {}
    abogado: any = {}
    abogado_id: number
    calif
    constructor(private modalService: NgbModal, private requestService: RequestService) { }

    ngOnInit() {
        this.getAbogados()
        this.getCiudades()
        this.getEspecialidades()
        this.getCitas()
    }

    async getAbogados() {
        const response = await this.requestService.getAbogados(this.ciudad, this.especialidad)
        if (response[0]) {
            this.abogados = response[1]
        }
        console.log(this.abogados)
    }

    async getCiudades() {
        const response = await this.requestService.getCiudades()
        if (response[0]) {
            this.ciudades = response[1]
        }

    }

    async getEspecialidades() {
        const response = await this.requestService.getEspecialidades()
        if (response[0]) {
            this.especialidades = response[1]
        }
    }



    calificar(modal, abogado_id) {
        if (abogado_id) {
            this.abogado_id = abogado_id
            this.modalService.open(modal);
        }

    }

    async crearCalificacion() {
        this.calificacion.usuario_id = 1
        this.calificacion.abogado_id = this.abogado_id
        const response = await this.requestService.createCalificion(this.calificacion)
        if (response) {
            Swal.fire({
                title: 'Calificación enviada',
                showCancelButton: true,
                confirmButtonColor: '#343a40',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
            })
        }
        this.modalService.dismissAll();
        this.calificacion = {}
    }

    async getCitas() {
        const response = await this.requestService.getCitas()
        if (response[0]) {
            console.log("hola")
            this.citas = response[1]
        }
        console.log(this.citas)
    }


    async deleteCita(id: any) {
        Swal.fire({
            title: '¿Seguro que desea eliminar esta cita?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#343a40',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.value) {
                const response = await this.requestService.deleteCita(id);
                if (response[0]) {
                    this.getCitas();
                }
            }
        });
    }

    async agendarCita() {
        const response = await this.requestService.createCita(this.cita)
        if (response) {
            this.modalService.dismissAll();
            this.getCitas();
        }

    }



    abrirAbogado(modal, abogado) {
        if (abogado) {
            this.abogado = abogado
            this.modalService.open(modal, { size: "lg" });
        }

    }
}
