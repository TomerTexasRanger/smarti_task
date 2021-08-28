import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { GuitarService } from 'src/app/services/guitar.service';
import { Guitar } from '../guitar.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-guitar-list',
  templateUrl: './guitar-list.component.html',
  styleUrls: ['./guitar-list.component.css'],
})
export class GuitarListComponent implements OnInit {
  constructor(private guitarService: GuitarService) {}
  guitars: any;
  form: FormGroup;
  search: FormGroup;
  data: any;
  getAllGuitars() {
    this.guitarService.getGuitars().subscribe((res) => {
      this.guitars = res;
    });
  }

  autoComplete() {
    if (this.search.value.search.length < 1) {
      document.querySelector('.autoCom').classList.remove('active');
      this.guitarService.getGuitars().subscribe((res) => (this.guitars = res));
      return;
    } else {
      this.guitarService
        .searchGuitars(this.search.value.search)
        .subscribe((res) => {
          this.data = res;
          if (this.data.length > 0) {
            let autoCom = document.querySelector('.autoCom');
            autoCom.classList.add('active');
            let options = document.querySelectorAll('.searchOption');
            options.forEach((option) => {
              option.addEventListener('click', () => {
                this.guitarService
                  .searchGuitars(option.innerHTML.split(' ')[0])
                  .subscribe((res) => {
                    this.guitars = res;
                    autoCom.classList.remove('active');
                  });
              });
            });
          }
        });
    }
  }
  searchQ() {
    console.log(this.search.value.search);

    this.guitarService
      .searchGuitars(this.search.value.search)
      .subscribe((res) => {
        this.guitars = res;
      });
  }

  addGuitar() {
    console.log(this.form);
    const formData = {
      company: this.form.value.company,
      model: this.form.value.model,
      year: this.form.value.year,
      price: this.form.value.price,
    };
    this.guitarService.addGuitar(formData).subscribe((res) => {
      console.log(res);
      this.getAllGuitars();
    });
  }

  deleteGuitar(id) {
    this.guitarService.removeGuitar(id).subscribe((res) => {
      console.log(res);
      this.getAllGuitars();
    });
  }

  ngOnInit(): void {
    this.getAllGuitars();
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
    this.search = new FormGroup({
      search: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)],
      }),
    });
  }
}
