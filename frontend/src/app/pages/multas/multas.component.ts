import { Component, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MultasService } from '../../services/MultasService';
import { MatInputModule } from '@angular/material/input';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    yearLabel: 'YYYY',
    monthYearAriaLabel: 'Enter month and year',
    dateInputAriaLabel: 'Enter date',
  },
};

@Component({
  selector: 'app-multas',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  templateUrl: './multas.component.html',
  styleUrls: ['./multas.component.css']
})
export class MultasComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private multasService: MultasService,
    @Optional() private dialogRef?: MatDialogRef<MultasComponent>  // Faz com que o dialogRef seja opcional
  ) {
    this.form = this.fb.group({
      numeroAIT: ['', Validators.required],
      dataInfracao: ['', Validators.required],
      codigoInfracao: ['', Validators.required],
      descricaoInfracao: ['', Validators.required],
      placaVeiculo: ['', Validators.required]
    });
  }

  cadastrarMulta(): void {
    if (this.form.valid) {
      this.multasService.cadastrarMulta(this.form.value).subscribe(
        response => {
          console.log('Multa cadastrada com sucesso!', response);
          if (this.dialogRef) {
            this.dialogRef.close(true);  // Fechar o modal após o cadastro se estiver num diálogo
          }
        },
        error => {
          console.error('Erro ao cadastrar multa', error);
        }
      );
    }
  }

  onCancel(): void {
    if (this.dialogRef) {
      this.dialogRef.close();  // Fecha o modal sem salvar, se estiver num diálogo
    }
  }
}
