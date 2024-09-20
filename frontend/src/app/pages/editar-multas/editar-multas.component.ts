import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MultasService } from '../../services/MultasService';
import { MatInputModule } from '@angular/material/input';
import moment from 'moment';

// Definir o formato de data personalizado
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',  // Ajustado para o formato correto
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    yearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
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
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, // Locale ajustado para Português Brasileiro
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
      // Formatar a data para o formato correto exigido pelo input datetime-local
      dataInfracao: [moment(data.dataInfracao).format('YYYY-MM-DDTHH:mm'), Validators.required],
      codigoInfracao: [data.codigoInfracao, Validators.required],
      descricaoInfracao: [data.descricaoInfracao, Validators.required],
      placaVeiculo: [data.placaVeiculo, Validators.required]
    });
  }

  onSave(): void {
    if (this.form.valid) {
      // Preparar o objeto com a multa atualizada e formatar a data
      const updatedMulta = { 
        ...this.data, 
        ...this.form.value, 
        dataInfracao: moment(this.form.value.dataInfracao).format('YYYY-MM-DDTHH:mm:ss') // Formatar de volta para o backend
      };
  
      // Chamar o serviço para atualizar a multa
      this.multasService.atualizarMulta(updatedMulta).subscribe({
        next: () => {
          // Caso de sucesso
          this.dialogRef.close(true);
        },
        error: (err) => {
          // Caso de erro
          console.error('Erro ao atualizar a multa:', err);
        }
      });
    }
  }  

  onCancel(): void {
    this.dialogRef.close();
  }
}

// Interface para representar uma Multa
export interface Multa {
  id: string;
  numeroAIT: string;
  dataInfracao: string; // Deve ser uma string, pois a data será formatada
  codigoInfracao: string;
  descricaoInfracao: string;
  placaVeiculo: string;
  permiteEdicao: boolean;
}
