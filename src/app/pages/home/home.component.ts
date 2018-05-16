import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

import { } from '@types/googlemaps';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  latitude: any;
  longitude: any;

  coords: Object;
  markers: google.maps.Marker[];

  iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

  constructor(private homeService: HomeService) {
    this.markers = [];
  }

  ngOnInit() {
    const mapOptions = {
      center: new google.maps.LatLng(21.3086887, -157.8106461),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      // gestureHandling: 'cooperative',
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapOptions);

    // this.map.addListener('center_changed', (event) => {

    //   console.log(event.lat());

    // });


    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(21.3086887, -157.8106461),
      draggable: true,
      animation: google.maps.Animation.DROP,
      title: 'Manoa Innovation Center!'
    });

    this.markers.push(marker);
    // To add the marker to the map, call setMap();
    marker.setMap(this.map);

    this.getTasks();

    this.map.addListener('click', (event) => {
      const { latLng } = event;
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(latLng.lat(), latLng.lng()),
        draggable: true,
        animation: google.maps.Animation.DROP,
      });
      this.markers.push(marker);
      console.log(this.markers);
      // To add the marker to the map, call setMap();
      marker.setMap(this.map);
    });

  }


  addMarker(event) {
    const { latLng } = event;
    // const marker = new google.maps.Marker({
    //   position: new google.maps.LatLng(latLng.lat(), latLng.lng()),
    //   draggable: true,
    //   animation: google.maps.Animation.DROP,
    // });
    // console.log(this.markers);
    // // To add the marker to the map, call setMap();
    // marker.setMap(this.map);
  }

  getTasks() {
    this.homeService.getTasks()
      .toPromise()
      .then(data => {
        console.log(data);
        console.log(this.map);
        Object.values(data).forEach(tasks => {
          const { lat, lng } = tasks.location;
          console.log(lat, lng);
          const marker = new google.maps.Marker({
            position: new google.maps.LatLng(21.3, -157.8),
            draggable: true,
            animation: google.maps.Animation.DROP,
          });

          this.markers.push(marker);
          // To add the marker to the map, call setMap();
          marker.setMap(this.map);
        });

      })
      .catch(err => { console.log(err); });
  }

}



// import { Component } from '@angular/core';


// @Component({
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss']
// })

// export class HomeComponent {
//   title: string;
//   lat: number;
//   lng: number;
//   zoom: number;
//   gestureHandling: string;
//   styles: Object[];
//   coords: Object;

//   constructor() {
//     this.title = 'My first AGM project';
//     this.lat = 21.3086887;
//     this.lng = -157.8106461;
//     this.zoom = 17;
//     this.gestureHandling = 'cooperative';
//     this.styles = [
//       { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
//       { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
//       { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
//       {
//         featureType: 'administrative.locality',
//         elementType: 'labels.text.fill',
//         stylers: [{ color: '#d59563' }]
//       },
//       {
//         featureType: 'poi',
//         elementType: 'labels.text.fill',
//         stylers: [{ color: '#d59563' }]
//       },
//       {
//         featureType: 'poi.park',
//         elementType: 'geometry',
//         stylers: [{ color: '#263c3f' }]
//       },
//       {
//         featureType: 'poi.park',
//         elementType: 'labels.text.fill',
//         stylers: [{ color: '#6b9a76' }]
//       },
//       {
//         featureType: 'road',
//         elementType: 'geometry',
//         stylers: [{ color: '#38414e' }]
//       },
//       {
//         featureType: 'road',
//         elementType: 'geometry.stroke',
//         stylers: [{ color: '#212a37' }]
//       },
//       {
//         featureType: 'road',
//         elementType: 'labels.text.fill',
//         stylers: [{ color: '#9ca5b3' }]
//       },
//       {
//         featureType: 'road.highway',
//         elementType: 'geometry',
//         stylers: [{ color: '#746855' }]
//       },
//       {
//         featureType: 'road.highway',
//         elementType: 'geometry.stroke',
//         stylers: [{ color: '#1f2835' }]
//       },
//       {
//         featureType: 'road.highway',
//         elementType: 'labels.text.fill',
//         stylers: [{ color: '#f3d19c' }]
//       },
//       {
//         featureType: 'transit',
//         elementType: 'geometry',
//         stylers: [{ color: '#2f3948' }]
//       },
//       {
//         featureType: 'transit.station',
//         elementType: 'labels.text.fill',
//         stylers: [{ color: '#d59563' }]
//       },
//       {
//         featureType: 'water',
//         elementType: 'geometry',
//         stylers: [{ color: '#17263c' }]
//       },
//       {
//         featureType: 'water',
//         elementType: 'labels.text.fill',
//         stylers: [{ color: '#515c6d' }]
//       },
//       {
//         featureType: 'water',
//         elementType: 'labels.text.stroke',
//         stylers: [{ color: '#17263c' }]
//       }
//     ];
//   }
//   onChooseLocation(event) {
//     // console.log(event);

//     this.coords = event;

//   }
// }
