-- Cities
INSERT INTO city (id, name, state) VALUES (1, 'Jaipur', 'Rajasthan');
INSERT INTO city (id, name, state) VALUES (2, 'Delhi', 'Delhi');

-- Services
INSERT INTO service_entity (id, name) VALUES (1, 'Cab Booking');
INSERT INTO service_entity (id, name) VALUES (2, 'Hotel Reservation');
INSERT INTO service_entity (id, name) VALUES (3, 'Sightseeing');
INSERT INTO service_entity (id, name) VALUES (4, 'Flights');

-- City-Service Mappings (Join Table)
INSERT INTO city_service (city_id, service_id) VALUES (1, 1);
INSERT INTO city_service (city_id, service_id) VALUES (1, 2);
INSERT INTO city_service (city_id, service_id) VALUES (1, 3);
INSERT INTO city_service (city_id, service_id) VALUES (2, 1); -- Cab Booking also in Delhi
INSERT INTO city_service (city_id, service_id) VALUES (2, 4);
