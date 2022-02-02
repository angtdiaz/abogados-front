import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from 'app/services/request.service';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    constructor(private modalService: NgbModal, private requesteService: RequestService) { }


    ngOnInit() {
    }


}
