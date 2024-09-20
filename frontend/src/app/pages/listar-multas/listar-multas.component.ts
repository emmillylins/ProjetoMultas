import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'; // Importar o módulo MatButtonModule
import { MultasService } from '../../services/MultasService';
import { AuthService } from '../../services/AuthService';
import { EditarMultasComponent } from '../editar-multas/editar-multas.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MultasComponent } from '../multas/multas.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar-multas',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule 
  ],
  templateUrl: './listar-multas.component.html',
  styleUrls: ['./listar-multas.component.css']
})
export class ListarMultasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'numeroAIT', 'dataInfracao', 'horaInfracao', 'codigoInfracao', 'descricaoInfracao', 'placaVeiculo', 'actions'];
  multas = new MatTableDataSource<Multa>([]);
  isAdmin = false;

  constructor(
    private multasService: MultasService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregarMultas();
    this.verificarTipoUsuario();
  }

  carregarMultas(): void {
    this.multasService.getMultas().subscribe({
      next: (response: any) => { 
        if (response.success) {
          this.multas.data = response.data.map((multa: Multa) => ({
            ...multa,
            dataInfracao: new Date(multa.dataInfracao)
          }));
        } else {
          alert(response);
          console.error('Erro ao carregar multas', response);
        }
      },
      error: (err: any) => { 
        console.error('Erro ao carregar multas:', err);
        if (err.status === 403) {
          localStorage.clear();
          this.router.navigate(['']);
        }
      }
    });
  }  
  
  excluirMulta(id: string): void {
    if (this.isAdmin && confirm('Tem certeza de que deseja excluir esta multa?')) {
      this.multasService.excluirMulta(id).subscribe({
        next: () => {
          this.carregarMultas();
        },
        error: err => {
          this.matSnackBar.open('Não foi possível excluir a multa. Tente novamente mais tarde.', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          });
        }
      });
    } else if (!this.isAdmin) {
      alert('Ação não permitida. Apenas administradores podem excluir multas.');

    }
  }
  
  atualizarMulta(multa: Multa): void {
    if (this.isAdmin) {
      const dialogRef = this.dialog.open(EditarMultasComponent, {
        width: '600px',
        data: multa
      });
  
      dialogRef.afterClosed().subscribe({
        next: result => {
          if (result) {
            this.carregarMultas(); // Recarregar a lista após a edição
          }
        },
        error: (err) => {
          if (err.status === 400) {
            alert(err.error.errors);
          }
          else {
            this.matSnackBar.open('Erro ao realizar atualização. Tente novamente.', 'Close', {
              duration: 5000,
              horizontalPosition: 'center',
            });
          }
        }
      });
    } else {
      alert('Ação não permitida. Apenas administradores podem editar multas.');
    }
  }  

  adicionarMulta(): void {
    const dialogRef = this.dialog.open(MultasComponent, {
      width: '600px',
    });
  
    dialogRef.afterClosed().subscribe({
      next: result => {
        console.log('insert:', result)
        if (result) {
          this.carregarMultas(); // Recarregar a lista de multas após o cadastro
        }
        else {
          alert('Erro ao cadastrar nova multa.')
        }
      },
      error: (err) => {
        if (err.status === 400) {
          alert(err.error.errors);
        }
        else {
          this.matSnackBar.open('Erro ao realizar cadastro. Tente novamente.', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          });
        }
      }
    });
  }  

  verificarTipoUsuario(): void {
    const tipoUsuario = this.authService.getTipoUsuario();
    this.isAdmin = tipoUsuario === 1;
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