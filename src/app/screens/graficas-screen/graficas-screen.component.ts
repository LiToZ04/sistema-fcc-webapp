import { AdministradoresService } from 'src/app/services/administradores.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

interface ChartDataset {
  data: number[];
  label: string;
  backgroundColor: string | string[];
}

@Component({
  selector: 'app-graficas-screen',
  templateUrl: './graficas-screen.component.html',
  styleUrls: ['./graficas-screen.component.scss'],
})

export class GraficasScreenComponent implements OnInit {

  public data:any = {};

  constructor(
    private administradoresService: AdministradoresService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.obtenerTotalUsuarios();
  }

  // Line Chart
  lineChartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data:[98, 34, 43, 54, 28, 74, 93],
        label: 'Registro de materias',
        backgroundColor: '#F88406'
      }
    ]
  }

  lineChartOption = {
    responsive:false
  }

  lineChartPlugins = [ DatalabelsPlugin ];

  // Pie Chart
  pieChartData: ChartData = {
    labels: ['Administradores', 'Maestros', 'Alumnos'],
    datasets: [
      {
        data: [], // Datos dinámicos irán aquí
        label: 'Registro de usuarios',
        backgroundColor: ['#FCFF44', '#F1C8F2', '#31E731'],
      },
    ],
  };

  pieChartOption = {
    responsive: true,
  };

  pieChartPlugins = [DatalabelsPlugin];

  // Doughnut Chart
  doughnutChartData: ChartData = {
    labels: ['Administradores', 'Maestros', 'Alumnos'],
    datasets: [
      {
        data: [], // Datos dinámicos irán aquí
        label: 'Registro de usuarios',
        backgroundColor: ['#F88406', '#FCFF44', '#31E7E7'],
      },
    ],
  };

  doughnutChartOption = {
    responsive: true,
  };

  doughnutChartPlugins = [DatalabelsPlugin];

  // Bar Chart
  barChartData: ChartData = {
    labels: ['Administradores', 'Maestros', 'Alumnos'],
    datasets: [
      {
        data: [], // This will hold dynamic data for user counts
        label: 'Registro de Usuarios',
        backgroundColor: ['#007bff', '#28a745', '#dc3545'],
      },
    ],
  };

  barChartOption = {
    responsive:false
  }

  barChartPlugins = [DatalabelsPlugin];

  obtenerTotalUsuarios() {
    this.administradoresService.getTotalUsuarios().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.updateChartData(data);
        this.cdr.detectChanges(); // Trigger change detection
      },
      error: (error) => {
        console.error('Error al obtener datos de usuarios', error);
      },
    });
  }

  updateChartData(data: any) {
    // Update data for all charts here
    this.pieChartData.datasets[0].data = [data.admins, data.maestros, data.alumnos];
    this.doughnutChartData.datasets[0].data = [data.admins, data.maestros, data.alumnos];
    this.barChartData.datasets[0].data = [data.admins, data.maestros, data.alumnos]; // Update bar chart data

    // Re-assign data to trigger chart updates
    this.pieChartData = { ...this.pieChartData };
    this.doughnutChartData = { ...this.doughnutChartData };
    this.barChartData = { ...this.barChartData };
    this.cdr.detectChanges(); // Ensure the chart updates reflect immediately
  }
}