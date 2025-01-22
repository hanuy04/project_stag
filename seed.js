const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

async function main() {
    // Seed roles
    const roles = await seedRoles();

    // Seed room categories
    const categories = await seedRoomCategories();

    // Seed rooms
    const rooms = await seedRooms(categories);

    // Seed users
    const users = await seedUsers(roles, rooms);

    // Seed facilities
    const facilities = await seedFacilities(rooms);

    // Seed room_facilities
    const roomFacilities = await seedRoomFacilities(rooms, facilities);

    // Seed complains
    await seedComplains(users, roomFacilities);

    // Seed reservations
    await seedReservations(users, rooms);

    // Seed settings
    await seedSettings();
}

async function seedRoles() {
    const roleData = [
        { role_id: '0', role_name: 'sarpras' },
        { role_id: '1', role_name: 'teacher' },
        { role_id: '2', role_name: 'osis' },
        { role_id: '3', role_name: 'student' },
    ];

    return Promise.all(
        roleData.map(role => prisma.roles.create({ data: role }))
    );
}

async function seedRoomCategories() {
    const categories = [];
    for (let i = 0; i < 20; i++) {
        categories.push(await prisma.room_categories.create({
            data: {
                room_category: faker.string.uuid(), // Generate unique ID
            }
        }));
    }
    return categories;
}

async function seedRooms(categories) {
    return Promise.all(
        Array.from({ length: 20 }, (_, i) => prisma.rooms.create({
            data: {
                room_id: faker.string.uuid(),
                room_name: `RM-${faker.number.int({ min: 100, max: 999 })}`, // Format lebih realistis
                room_capacity: faker.number.int({ min: 20, max: 50 }),
                room_category: categories[i % categories.length].room_category,
                is_class: faker.datatype.boolean(),
            }
        }))
    );
}

async function seedUsers(roles, rooms) {
    return Promise.all(
        Array.from({ length: 20 }, (_, i) => prisma.users.create({
            data: {
                username: faker.internet.userName().slice(0, 20), // Pastikan tidak melebihi length column
                password: faker.internet.password(),
                name: faker.person.fullName(),
                role_id: roles[i % roles.length].role_id,
                kelas: i % 4 === 0 ? rooms[i % rooms.length].room_id : null,
                no_absen: i % 4 === 0 ? faker.number.int({ min: 1, max: 40 }) : null,
            }
        }))
    );
}

async function seedFacilities(rooms) {
    return Promise.all(
        Array.from({ length: 20 }, (_, i) => prisma.facilities.create({
            data: {
                facility_id: faker.string.uuid(),
                facility_name: faker.commerce.productName().slice(0, 100), // Sesuaikan dengan panjang column
                facility_description: faker.lorem.sentence(),
                facility_qty: faker.number.int({ min: 5, max: 20 }),
                room_id: rooms[i % rooms.length].room_id,
            }
        }))
    );
}

async function seedRoomFacilities(rooms, facilities) {
    return Promise.all(
        Array.from({ length: 20 }, (_, i) => prisma.room_facilities.create({
            data: {
                room_facilities_id: faker.string.uuid(),
                room_id: rooms[i % rooms.length].room_id,
                facility_id: facilities[i % facilities.length].facility_id,
                qty: faker.number.int({ min: 1, max: 10 }),
                condition: faker.helpers.arrayElement(['good', 'fair', 'poor']),
            }
        }))
    );
}

async function seedComplains(users, roomFacilities) {
    return Promise.all(
        Array.from({ length: 20 }, (_, i) => prisma.complains.create({
            data: {
                complain_id: faker.string.uuid(),
                username: users[i % users.length].username,
                classroom_facilities_id: roomFacilities[i % roomFacilities.length].room_facilities_id,
                complaint: faker.lorem.words(5),
                description: faker.lorem.paragraph(),
                lampiran: faker.image.url(),
                status: faker.helpers.arrayElement(['resolved', 'still_resolving', 'unresolved']), // Sesuaikan dengan enum
            }
        }))
    );
}

async function seedReservations(users, rooms) {
    const reservations = [];
    for (let i = 0; i < 20; i++) {
        const startDate = faker.date.soon({ days: 7 });
        const endDate = new Date(startDate.getTime() + faker.number.int({ min: 1, max: 4 }) * 60 * 60 * 1000);

        // Pastikan nilai status_guru sesuai dengan enum
        const statusGuru = faker.helpers.arrayElement(['pending', 'rejected', 'approved']);

        reservations.push(prisma.reservations.create({
            data: {
                reservation_id: faker.string.uuid(),
                username: users[i % users.length].username,
                room_id: rooms[i % rooms.length].room_id,
                start_time: startDate,
                end_time: endDate,
                purpose: faker.lorem.sentence(),
                status_sarpras: faker.helpers.arrayElement(['pending', 'approved', 'rejected', 'cancelled']),
                status_guru: statusGuru, // Gunakan nilai yang valid
                teacher_assistant: i % 4 === 0 ? users[(i + 1) % users.length].username : null,
                description: faker.lorem.paragraph(),
            }
        }));
    }
    return Promise.all(reservations);
}

async function seedSettings() {
    return Promise.all(
        Array.from({ length: 20 }, () => prisma.settings.create({
            data: {
                day: faker.date.weekday(),
                booking: faker.datatype.boolean(),
                booking_start: new Date(0, 0, 0, faker.number.int({ min: 0, max: 23 }), faker.number.int({ min: 0, max: 59 })), // Generate time only
                booking_end: new Date(0, 0, 0, faker.number.int({ min: 0, max: 23 }), faker.number.int({ min: 0, max: 59 })),
                active: faker.datatype.boolean(),
                reservation_start: new Date(0, 0, 0, faker.number.int({ min: 0, max: 23 }), faker.number.int({ min: 0, max: 59 })),
                reservation_end: new Date(0, 0, 0, faker.number.int({ min: 0, max: 23 }), faker.number.int({ min: 0, max: 59 })),
                conditional_time: new Date(0, 0, 0, faker.number.int({ min: 0, max: 23 }), faker.number.int({ min: 0, max: 59 })),
                accompanying_teacher: faker.datatype.boolean(),
            }
        }))
    );
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });