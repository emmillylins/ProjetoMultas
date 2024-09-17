import { Component, OnInit } from '@angular/core';
import { MultasService } from '../multas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multas-list',
  templateUrl: './multas-list.component.html',
  styleUrls: ['./multas-list.component.css']
})
export class MultasListComponent implements OnInit {
  multas: any[] = [];

  constructor(private multasService: MultasService, private router: Router) {}

  ngOnInit(): void {
    this.loadMultas();
  }

  loadMultas(): void {
    this.multasService.getMultas().subscribe(
      (data) => {
        this.multas = data;
      },
      (error) => {
        console.error('Erro ao carregar multas', error);
      }
    );
  }

  editarMulta(id: string): void {
    // Navega para o componente de edição, substitua 'edit' pela sua rota de edição
    this.router.navigate([`/edit/${id}`]);
  }

  deletarMulta(id: string): void {
    if (confirm('Tem certeza que deseja excluir esta multa?')) {
      this.multasService.deleteMulta(id).subscribe(
        () => {
          alert('Multa excluída com sucesso!');
          this.loadMultas(); // Recarregar a lista após exclusão
        },
        (error) => {
          console.error('Erro ao excluir multa', error);
        }
      );
    }
  }
}
