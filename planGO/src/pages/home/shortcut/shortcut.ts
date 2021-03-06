import { Component, Input, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { TabsPage } from '../../vote/tabs'
import { MyFriendsPage } from '../../my-friends/my-friends'
import { NewPollPage } from '../../newPoll/newPoll'
import { ListPage } from '../../list/list'
import { AuthService } from '../../../shared/services/auth-service'
import { FriendService } from '../../../shared/services/friend-service'

@Component({
  selector: 'page-shortcut',
  templateUrl: 'shortcut.html'
})

export class Shortcut implements OnInit {

  @Input() pageName: string;
  @Input() image: string;
  @Input() id: string;


  constructor(public navCtrl: NavController,
    public authService: AuthService,
    private platform: Platform,
    public friendService: FriendService,
    private alertCtrl: AlertController) { }

  ngOnInit() {

  }

  goTo(page) {
    if (page == 'Mis votaciones') {
      this.navCtrl.push(TabsPage);

    } else if (page == 'Nueva encuesta') {

      this.authService.getUser().subscribe(user => {

        this.friendService.getMyFriends(user._id).subscribe(friends => {
          if (friends) {

            let alert = this.alertCtrl.create();
            alert.setTitle('Seleccione el tipo de encuesta');

            alert.addInput({
              type: 'radio',
              label: 'Texto',
              value: 'texto',
              checked: true
            });

            alert.addInput({
              type: 'radio',
              label: 'Fecha',
              value: 'fecha'
            });

            alert.addButton('Cancel');
            alert.addButton({
              text: 'OK',
              handler: data => {
                this.navCtrl.push(NewPollPage, {
                  'type': data
                })
              }
            });
            alert.present();

          } else {
            let alert = this.alertCtrl.create({
              title: 'Aviso',
              subTitle: 'Antes de crear una encuesta, tienes que añadir a tus amigos',
              buttons: [
                {
                  text: 'OK'
                }
              ]
            });
            alert.present();
          }

        })
      })

    } else if (page == 'Mis encuestas') {
      this.navCtrl.push(ListPage);
    } else if (page == 'Mis amigos') {
      this.navCtrl.push(MyFriendsPage);
    }
  }

}