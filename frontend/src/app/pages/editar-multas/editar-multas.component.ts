import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  selector: 'app-editar-multas',
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
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, // ou outro local
  ],
  templateUrl: './editar-multas.component.html',
  styleUrls: ['./editar-multas.component.css']
})
export class EditarMultasComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private multasService: MultasService,
    private dialogRef: MatDialogRef<EditarMultasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Multa
  ) {
    this.form = this.fb.group({
      numeroAIT: [data.numeroAIT, Validators.required],
      dataInfracao: [data.dataInfracao, Validators.required],
      codigoInfracao: [data.codigoInfracao, Validators.required],
      descricaoInfracao: [data.descricaoInfracao, Validators.required],
      placaVeiculo: [data.placaVeiculo, Validators.required]
    });
  }

  onSave(): void {
    if (this.form.valid) {
      const updatedMulta = { ...this.data, ...this.form.value };
      this.multasService.atualizarMulta(updatedMulta).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

export interface Multa {
  id: string;
  numeroAIT: string;
  dataInfracao: string;
  codigoInfracao: string;
  descricaoInfracao: string;
  placaVeiculo: string;
  permiteEdicao: boolean;
}
