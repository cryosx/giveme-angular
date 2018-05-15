import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  latitude: any;
  longitude: any;

  iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

  markerTypes = [
    {
      text: 'Parking', value: 'parking_lot_maps.png'
    }
    // ,
    // {
    //   text: "Library", value: "library_maps.png"
    // },
    // {
    //   text: "Information", value: "info-i_maps.png"
    // }
  ];

  selectedMarkerType = 'parking_lot_maps.png';

  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId)
  }

  setCenter() {
    this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));

    const location = new google.maps.LatLng(this.latitude, this.longitude);

    const marker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: 'Got you!'
    });

    marker.addListener('click', this.simpleMarkerHandler);

    marker.addListener('click', () => {
      this.markerHandler(marker);
    });
  }

  simpleMarkerHandler() {
    alert('Simple Component\'s function...');
  }

  markerHandler(marker: google.maps.Marker) {
    alert('Marker\'s Title: ' + marker.getTitle());
  }

  showCustomMarker() {


    this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));

    const location = new google.maps.LatLng(this.latitude, this.longitude);

    console.log(`selected marker: ${this.selectedMarkerType}`);

    const marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: this.iconBase + this.selectedMarkerType,
      title: 'Got you!'
    });

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
