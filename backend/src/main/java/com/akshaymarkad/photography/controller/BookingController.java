package com.akshaymarkad.photography.controller;

import com.akshaymarkad.photography.entity.Booking;
import com.akshaymarkad.photography.repository.BookingRepository;
import com.akshaymarkad.photography.util.ApiResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingRepository repo;

    @PostMapping
    public ResponseEntity<ApiResponse<String>> create(@Valid @RequestBody BookingRequest req) {
        Booking b = new Booking();
        b.setCustomerName(req.getName());
        b.setCustomerEmail(req.getEmail());
        b.setBookingDate(java.time.LocalDateTime.parse(req.getBookingDate()));
        // service linking omitted for simplicity
        repo.save(b);
        return ResponseEntity.ok(new ApiResponse<>(true, "Booking created", "ok"));
    }

    @Data
    static class BookingRequest {
        @NotBlank
        private String name;
        @Email
        private String email;
        @NotBlank
        private String bookingDate; // ISO string
        private Long serviceId;
    }
}
