import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuitarService } from 'src/app/services/guitar.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Guitar } from '../guitar.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
})
export class EditFormComponent implements OnInit {
  id: any;
  form: FormGroup;
  data: any;
  public guitar: Guitar;
  constructor(
    private route: ActivatedRoute,
    private guitarService: GuitarService,
    private location: Location
  ) {}

  goBack() {
    this.location.back();
  }

  getGuitar(id) {
    this.guitarService.getGuitarById(id).subscribe((res) => {
      this.data = res;
      console.log(this.data.company);
      this.guitar = {
        id: this.data.id,
        company: this.data.company,
        model: this.data.model,
        year: this.data.year,
        price: this.data.price,
      };
      this.form.setValue({
        company: this.guitar.company,
        model: this.guitar.model,
        year: this.guitar.year,
        price: this.guitar.price,
      });
    });
  }

  updateGuitar() {
    const formData = {
      company: this.form.value.company,
      model: this.form.value.model,
      year: this.form.value.year,
      price: this.form.value.price,
    };

    this.guitarService
      .updateGuitar(this.id, formData)
      .subscribe((res) => console.log(res));
    window.location.href = '/';
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getGuitar(this.id);
    this.form = new FormGroup({
      company: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      model: new FormControl(null, { validators: [Validators.required] }),
      year: new FormControl(null, { validators: [Validators.required] }),
      price: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }
}
