import Location from './models/location';

export default function () {
  Location.count().exec((err, count) => {
    if (count > 2) {
      return;
    }

    const content1 = [
      {
        id: 1,
        image_title: 'The little mermaid',
        image_url: 'https://i.imgur.com/pMTdrYw.jpg',
      },
      {
        id: 2,
        image_title: 'HC andersen',
        image_url: 'https://i.imgur.com/KywTsGS.jpg',
      },
      {
        id: 3,
        image_title: 'Headless',
        image_url: 'https://i.imgur.com/aHUdgQU.jpg',
      },
    ];

    const content2 = [
      {
        id: 1,
        image_title: 'Lygten 16',
        image_url: 'https://i.imgur.com/0aJ6mor.jpg',
      },
      {
        id: 2,
        image_title: 'Lygten 37',
        image_url: 'https://i.imgur.com/xhjtAWG.jpg',
      },
      {
        id: 3,
        image_title: 'Guldbergsgade',
        image_url: 'https://i.imgur.com/cYZFoYe.jpg',
      },
    ];

    const content3 = [
      {
        id: 1,
        image_title: 'Christiania',
        image_url: 'https://i.imgur.com/X03xvJR.jpg',
      },
      {
        id: 2,
        image_title: 'Colorful',
        image_url: 'https://i.imgur.com/GtDGR99.jpg',
      },
      {
        id: 3,
        image_title: 'Police',
        image_url: 'https://i.imgur.com/6tr00Me.jpg',
      },
    ];

    const content4 = [
      {
        id: 1,
        image_title: 'Amalienborg Palace',
        image_url: 'https://i.imgur.com/m76PjKW.jpg',
      },
      {
        id: 2,
        image_title: 'Sorg',
        image_url: 'https://i.imgur.com/CtUKkqY.jpg',
      },
      {
        id: 3,
        image_title: 'Guards',
        image_url: 'https://i.imgur.com/ywhOh8n.jpg',
      },
    ];

    const content5 = [
      {
        id: 1,
        image_title: 'National museum',
        image_url: 'https://i.imgur.com/BaWGpfs.jpg',
      },
      {
        id: 2,
        image_title: 'Table',
        image_url: 'https://i.imgur.com/0iO7Rr1.jpg',
      },
      {
        id: 3,
        image_title: 'Stuff',
        image_url: 'https://i.imgur.com/XBVG3Sq.jpg',
      },
    ];

    const content6 = [
      {
        id: 1,
        image_title: 'Round tower day',
        image_url: 'https://i.imgur.com/vmXteBw.jpg',
      },
      {
        id: 2,
        image_title: 'Round tower night',
        image_url: 'https://i.imgur.com/5KvwzbD.jpg',
      },
      {
        id: 3,
        image_title: 'Old',
        image_url: 'https://i.imgur.com/G26vFBi.jpg',
      },
    ];

    const content7 = [
      {
        id: 1,
        image_title: 'Zoo',
        image_url: 'https://i.imgur.com/fReswZ4.jpg',
      },
      {
        id: 2,
        image_title: 'Panda',
        image_url: 'https://i.imgur.com/PPXEFHV.jpg',
      },
      {
        id: 3,
        image_title: 'Polar bear',
        image_url: 'https://i.imgur.com/SZVAhrr.jpg',
      },
    ];

    const content8 = [
      {
        id: 1,
        image_title: 'Tivoli',
        image_url: 'https://i.imgur.com/6yDQ3mN.jpg',
      },
      {
        id: 2,
        image_title: 'Resturent',
        image_url: 'https://i.imgur.com/co5ZXTu.jpg',
      },
      {
        id: 3,
        image_title: 'Rides',
        image_url: 'https://i.imgur.com/xeDpUmv.jpg',
      },
    ];

    const content9 = [
      {
        id: 1,
        image_title: 'Stroeget',
        image_url: 'https://i.imgur.com/NjOGNJV.jpg',
      },
      {
        id: 2,
        image_title: 'busy',
        image_url: 'https://i.imgur.com/bApmGF3.jpg',
      },
      {
        id: 3,
        image_title: 'Old',
        image_url: 'https://i.imgur.com/xZFRPKn.jpg',
      },
    ];

    const location1 = new Location({ author: 'Me', title: 'Little Mermaid', lon: 12.599297, lat: 55.692897, slug: 'hello-cph', cuid: 'cikqgkv4q01ck7453ualdn3hd', images: content1 });
    const location2 = new Location({ author: 'Me', title: 'KEA', lon: 12.537503, lat: 55.704006, slug: 'hello-cph', cuid: 'cikqgkv4q01ck7453ualdn3hf', images: content2 });
    const location3 = new Location({ author: 'Me', title: 'Christiania', lon: 12.600034, lat: 55.673444, slug: 'hello-cph', cuid: 'cikqgkv4q01ck7453ualdn3hh', images: content3 });
    const location4 = new Location({ author: 'Me', title: 'Amalienborg Palace', lon: 12.593052, lat: 55.684095, slug: 'hello-cph', cuid: 'cikqgkv4q01ck7453ualdn3hk', images: content4 });
    const location5 = new Location({ author: 'Me', title: 'National museum', lon: 12.574741, lat: 55.674678, slug: 'hello-cph', cuid: 'cikqgkv4q01ck7453ualdn3hm', images: content5 });
    const location6 = new Location({ author: 'Me', title: 'Round Tower', lon: 12.575751, lat: 55.681413, slug: 'hello-cph', cuid: 'cikqgkv4q01ck7453ualdn3ho', images: content6 });
    const location7 = new Location({ author: 'Me', title: 'Zoo', lon: 12.521390, lat: 55.672585, slug: 'hello-cph', cuid: 'cikqgkv4q01ck7453ualdn3hq', images: content7 });
    const location8 = new Location({ author: 'Me', title: 'Tivoli', lon: 12.568136, lat: 55.673690, slug: 'hello-cph', cuid: 'cikqgkv4q01ck7453ualdn3hs', images: content8 });
    const location9 = new Location({ author: 'Me', title: 'Strøget', lon: 12.576818, lat: 55.678738, slug: 'hello-cph', cuid: 'cikqgkv4q01ck7453ualdn3hu', images: content9 });

    Location.create([location1, location2, location3, location4, location5, location6, location7, location8, location9], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
