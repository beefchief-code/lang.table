const prisma = require("../prisma");

const seed = async (
  numRestaurants = 3,
  numCustomers = 5,
  numReservations = 8
) => {
  // TODO: this function

  //create 3 restaurants
  const restaurants = Array.from({ length: numRestaurants }, (_, i) => ({
    name: `Restaurant ${i + 1}`,
  }));
  await prisma.restaurant.createMany({ data: restaurants });

  //create 5 customers
  const customers = Array.from({ length: numCustomers }, (_, i) => ({
    name: `Customer ${i + 1}`,
    email: `customer${i + 1}@emal.com`,
  }));
  await prisma.customer.createMany({ data: customers });

  //create 8 reservations
  for (let i = 0; i < numReservations; i++) {
    //party size 1-3
    const partySize = 1 + Math.floor(Math.random() * 3);

    //array w/random customers
    const party = Array.from({ length: partySize }, () => ({
      id: 1 + Math.floor(Math.random() * numCustomers),
    }));
    //new res with rand restaurant
    await prisma.reservation.create({
      data: {
        date: new Date(Date.now()).toDateString(),
        restaurantId: 1 + Math.floor(Math.random() * numRestaurants),
        party: { connect: party },
      },
    });
  }
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
