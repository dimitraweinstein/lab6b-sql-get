const owls  = [
  {
    id: 1,
    name: 'Barn Owl',
    // image: '/barn-owl-.jpeg',
    note: 'Besides excellent vision, Barn Owls are extraordinarily sensitive to sound; their ability to locate prey by sound alone is the best of any animal ever tested.',
    // threats: 'Habitat loss, vehicle collisions',
    endangered: false,
    habitat: 'Grasslands, deserts, and agricultural fields',
    price: '600',
  }, {
    id: 2,
    name: 'Barred Owl',
    // image: '/barred-owl.jpeg',
    note: 'Barred Owls expanded their range dramatically in the 20th century to include western forests, where they now compete with Spotted Owls.',
    // threats: 'Deforestation',
    endangered: false,
    habitat: 'Mixed, mature forests',
    price: 400,
  }, {
    id: 3,
    name: 'Ferruginous Pygmy',
    // image: '/ferruginous-pygmy.jpeg',
    note: 'The Ferruginous Pygmy-Owl is one of the most widespread birds of the Neotropical lowlands; its range includes the southern tip of Texas and the south-central edge of Arizona.',
    // threats: 'Habitat loss, land conversion, and urbanization',
    endangered: true,
    habitat: 'Tropical dry forests',
    price: 1300,
  }, {
    id: 4,
    name: 'Great Horned Owl',
    // image: '/ferruginous-pygmy.jpeg',
    note: 'Great Horned Owls hunt Ospreys, Peregrine Falcons, and other types of owls, along with many other animals.',
    // threats: 'Habitat loss, land conversion, and urbanization',
    endangered: true,
    habitat: 'Wide variety of habitat, including forests and fields',
    price: 1500,
  }, {
    id: 5,
    name: 'Northern Hawk Owl',
    // image: '/ferruginous-pygmy.jpeg',
    note: 'Northern Hawk Owls can spot prey at distances up to half a mile away.',
    // threats: 'Habitat loss, land conversion, and urbanization',
    endangered: true,
    habitat: 'Boreal forests',
    price: 2000,
  }
];

const endangeredData = [
  {
    endangered: false
  }, {
    endangered: false
  }, {
    endangered: true
  }, {
    endangered: true
  }, {
    endangered: true
  }
];

module.exports = [
  endangeredData,
  owls
];
