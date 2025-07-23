package com.globetripster.backend;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;

import com.globetripster.backend.model.Aircraft;
import com.globetripster.backend.model.Airport;
import com.globetripster.backend.model.FlightResult;
import com.globetripster.backend.model.Route;
import com.globetripster.backend.repository.AircraftRepository;
import com.globetripster.backend.repository.AirportRepository;
import com.globetripster.backend.repository.FlightResultRepository;
import com.globetripster.backend.repository.RouteRepository;

@SpringBootApplication
@EntityScan("com.globetripster.backend.model")
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner seedData(
			AirportRepository airportRepository,
			AircraftRepository aircraftRepository,
			RouteRepository routeRepository,
			FlightResultRepository flightResultRepository,
			EntityManager entityManager) {
		return args -> {
			System.out.println("📦 Hibernate picked up these entities:");

			for (EntityType<?> entity : entityManager.getMetamodel().getEntities()) {
				System.out.println("✅ " + entity.getName());
			}

			// Seed Airports
			if (airportRepository.count() == 0) {
				Airport pune = new Airport("PNQ", "Pune Airport", "Pune", "India");
				Airport delhi = new Airport("DEL", "Indira Gandhi Intl", "Delhi", "India");
				airportRepository.saveAll(List.of(pune, delhi));
				System.out.println("✅ Airports seeded");
			}


			// Seed Aircraft
			if (aircraftRepository.count() == 0) {
				Aircraft a1 = new Aircraft("A320", "Airbus A320", 180, 2800.0);
				Aircraft a2 = new Aircraft("B737", "Boeing 737", 190, 3000.0);
				aircraftRepository.saveAll(List.of(a1, a2));
				System.out.println("✅ Aircrafts seeded");
			}

			// Seed Routes
			if (routeRepository.count() == 0) {
				Airport source = airportRepository.findByCode("PNQ").orElse(null);
				Airport destination = airportRepository.findByCode("DEL").orElse(null);
				if (source != null && destination != null) {
					Route route = new Route(source, destination, "LEISURE", 2.0, "Air India");
					routeRepository.save(route);
					System.out.println("✅ Route seeded");
				}
			}

			// Seed Flights
			if (flightResultRepository.count() == 0) {
				Aircraft aircraft = aircraftRepository.findById("A320").orElse(null);
				Route route = routeRepository.findById("1").orElse(null);
				Airport source = airportRepository.findByCode("PNQ").orElse(null);
				Airport destination = airportRepository.findByCode("DEL").orElse(null);
				if (aircraft != null && route != null && source != null && destination != null) {
					FlightResult flight = new FlightResult(
							"AI101",
							source,
							destination,
							LocalDateTime.now().plusDays(1),
							LocalDateTime.now().plusDays(1).plusHours(2),
							aircraft,
							180, // seat count, adjust as needed
							3500.0,
							"Air India");
					flightResultRepository.save(flight);
					System.out.println("✅ Flight seeded");
				}
			}
		};
	}
}