package com.globetripster.backend.controller;

import com.globetripster.backend.dto.ServiceDto;
import com.globetripster.backend.model.City;
import com.globetripster.backend.repository.CityRepository;

import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:5173")
public class ServiceController {

    private final CityRepository cityRepository;

    public ServiceController(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @GetMapping("/{cityName}")
    public List<ServiceDto> getServicesByCity(@PathVariable String cityName) {
        Optional<City> cityOpt = cityRepository.findByNameIgnoreCase(cityName);
        if (cityOpt.isEmpty()) {
            return List.of();
        }

        return cityOpt.get().getServices().stream()
                .map(service -> new ServiceDto(service.getName()))
                .collect(Collectors.toList());
    }
}
