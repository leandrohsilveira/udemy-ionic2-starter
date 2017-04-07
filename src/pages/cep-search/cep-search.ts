import { Component, Input } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import { LoadingController, Loading, AlertController } from 'ionic-angular'
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';

import { Address } from '../../app/app.domain'
import { ConnectionService } from '../../providers/connection-service'

/*
  Generated class for the CepSearch page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cep-search',
  templateUrl: 'cep-search.html'
})
export class CepSearchPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private loadingCtrl: LoadingController,
    private connectionService: ConnectionService,
    private alertCtrl: AlertController) {}

  @Input()
  cep: string;

  address: Address;

  private loading: Loading;

  ionViewDidLoad() {
    console.debug('ionViewDidLoad CepSearchPage');
    
  }

  reset(): void {
    this.cep = null;
    this.address = null;
  }

  search(): void {
    console.debug(`Searching CEP for input: ${this.cep}`);
    this.loading = this.loadingCtrl.create({content: 'Fetching CEP...'});
    this.loading.present();
    this.connectionService.getCep(this.cep)
                           .subscribe((address: Address) => {
                              if(address.erro) {
                                 this.showAlert(() => 'CEP not found.')
                              } else {
                                console.debug(`CEP ${this.cep} fetched. Result:`, address)
                                this.address = address;
                              }
                           },
                           console.error,
                           () => this.loading.dismiss());
  }

  private showAlert(errorExtractor) {
    this.alertCtrl.create({title: 'Error', subTitle: errorExtractor(), buttons:['Close']}).present();
  }

}
